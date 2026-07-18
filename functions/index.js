const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { initializeApp, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const Stripe = require('stripe');
const { Resend } = require('resend');

if (!getApps().length) {
    initializeApp();
}

const resendApiKey = defineSecret('RESEND_API_KEY');

// TODO: swap for a "from" address on a domain you've verified in Resend.
const CONTACT_FROM = 'Snout Scout <onboarding@resend.dev>';
const CONTACT_TO = 'carl@gardenrouteenterprises.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.sendContactEmail = onCall({ secrets: [resendApiKey] }, async (request) => {
    const { name, email, message } = request.data || {};

    if (typeof name !== 'string' || name.trim().length === 0 || name.length > 200) {
        throw new HttpsError('invalid-argument', 'Please provide a valid name.');
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
        throw new HttpsError('invalid-argument', 'Please provide a valid email address.');
    }
    if (typeof message !== 'string' || message.trim().length === 0 || message.length > 5000) {
        throw new HttpsError('invalid-argument', 'Please provide a message.');
    }

    const resend = new Resend(resendApiKey.value());

    const { error } = await resend.emails.send({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        reply_to: email,
        subject: `New contact form message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
        console.error('Resend failed to send contact email', error);
        throw new HttpsError('internal', 'Failed to send message. Please try again later.');
    }

    try {
        await getFirestore().collection('Leads').add({
            name,
            email,
            message,
            createdAt: FieldValue.serverTimestamp(),
        });
    } catch (e) {
        console.error('Failed to persist lead (email was still sent)', e);
    }

    return { success: true };
});

const stripeSecretKey = defineSecret('STRIPE_SECRET_KEY');
const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET');

// Maps Stripe Product IDs (from the Pro/Business Payment Links) to the
// `accountType` value written to the matching Users/{uid} doc.
const PRODUCT_TO_ACCOUNT_TYPE = {
    prod_UFGHLIuAA7kXz4: 'pro',
    prod_UFGPYgV0fgcc3t: 'business',
};

async function accountTypeForSession(stripe, sessionId) {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
        expand: ['data.price.product'],
    });
    for (const item of lineItems.data) {
        const productId = item.price?.product?.id || item.price?.product;
        if (PRODUCT_TO_ACCOUNT_TYPE[productId]) {
            return PRODUCT_TO_ACCOUNT_TYPE[productId];
        }
    }
    return null;
}

async function handleCheckoutCompleted(stripe, session) {
    const email = session.customer_details?.email || session.customer_email;
    if (!email) {
        console.error('checkout.session.completed with no customer email', session.id);
        return;
    }

    const accountType = await accountTypeForSession(stripe, session.id);
    if (!accountType) {
        console.error('Could not map checkout session to a known plan', session.id);
        return;
    }

    let userRecord;
    try {
        userRecord = await getAuth().getUserByEmail(email);
    } catch {
        console.error('No Firebase Auth user found for email from Stripe checkout', email);
        return;
    }

    // The mobile app's own checkout flow writes subscription details as a nested
    // `subscription` map (customer_id, status, is_pro, subscription_type, expires_at,
    // updated_at) rather than flat Users/{uid} fields — match that shape so both
    // platforms read a consistent structure regardless of which one created it.
    const stripeSubscription = await stripe.subscriptions.retrieve(session.subscription);
    const update = {
        accountType,
        isBusinessAccount: accountType === 'business',
        subscription: {
            customer_id: session.customer,
            subscription_id: session.subscription,
            status: stripeSubscription.status,
            is_pro: stripeSubscription.status === 'active' || stripeSubscription.status === 'trialing',
            // Only monthly plans exist today; revisit if yearly plans are added.
            subscription_type: `${accountType}_monthly`,
            expires_at: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
        },
    };

    await getFirestore().collection('Users').doc(userRecord.uid).set(update, { merge: true });
}

async function handleSubscriptionChange(subscription) {
    const db = getFirestore();
    let snap = await db.collection('Users')
        .where('subscription.customer_id', '==', subscription.customer)
        .limit(1)
        .get();

    if (snap.empty) {
        // Legacy fallback for any doc written before the nested `subscription` shape.
        snap = await db.collection('Users')
            .where('stripeCustomerId', '==', subscription.customer)
            .limit(1)
            .get();
    }

    if (snap.empty) {
        console.error('No user found for Stripe customer', subscription.customer);
        return;
    }

    const doc = snap.docs[0];
    const isActive = subscription.status === 'active' || subscription.status === 'trialing';
    const priorAccountType = doc.data().accountType;
    const update = {
        subscription: {
            customer_id: subscription.customer,
            subscription_id: subscription.id,
            status: subscription.status,
            is_pro: isActive,
            subscription_type: doc.data().subscription?.subscription_type
                || (priorAccountType ? `${priorAccountType}_monthly` : null),
            expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
        },
    };

    if (!isActive) {
        update.accountType = 'basic';
        if (priorAccountType === 'business') {
            update.isBusinessAccount = false;
        }
    }

    await doc.ref.set(update, { merge: true });
}

exports.stripeWebhook = onRequest(
    { secrets: [stripeSecretKey, stripeWebhookSecret] },
    async (req, res) => {
        const stripe = new Stripe(stripeSecretKey.value());

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody,
                req.headers['stripe-signature'],
                stripeWebhookSecret.value()
            );
        } catch (err) {
            console.error('Stripe webhook signature verification failed', err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        try {
            switch (event.type) {
                case 'checkout.session.completed':
                    await handleCheckoutCompleted(stripe, event.data.object);
                    break;
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    await handleSubscriptionChange(event.data.object);
                    break;
            }
            res.json({ received: true });
        } catch (err) {
            console.error('Error handling Stripe webhook event', event.type, err);
            res.status(500).send('Internal error');
        }
    }
);

const ALLOWED_RETURN_ORIGINS = [
    'https://www.snoutscout.info',
    'https://snoutscout.info',
    'http://localhost:5173',
];

exports.createBillingPortalSession = onCall({ secrets: [stripeSecretKey] }, async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'You must be signed in.');
    }

    const userSnap = await getFirestore().collection('Users').doc(request.auth.uid).get();
    const stripeCustomerId = userSnap.data()?.subscription?.customer_id || userSnap.data()?.stripeCustomerId;
    if (!stripeCustomerId) {
        throw new HttpsError('failed-precondition', 'No billing account found for this user yet.');
    }

    const requestedReturnUrl = request.data?.returnUrl;
    let returnUrl = 'https://www.snoutscout.info/account';
    if (typeof requestedReturnUrl === 'string') {
        try {
            const origin = new URL(requestedReturnUrl).origin;
            if (ALLOWED_RETURN_ORIGINS.includes(origin)) {
                returnUrl = requestedReturnUrl;
            }
        } catch {
            // ignore malformed URL, fall back to default
        }
    }

    const stripe = new Stripe(stripeSecretKey.value());
    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: returnUrl,
        });
        return { url: session.url };
    } catch (err) {
        console.error('Failed to create Stripe billing portal session', request.auth.uid, err);
        throw new HttpsError('internal', 'Failed to open billing portal.');
    }
});
