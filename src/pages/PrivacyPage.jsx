import React from 'react';
import LegalPageShell from '../components/LegalPageShell';

const P = ({ children }) => <p className="text-slate-700 dark:text-slate-300">{children}</p>;
const H2 = ({ children }) => (
    <h2 className="text-xl font-bold text-slate-900 dark:text-white scroll-mt-28 border-b border-emerald-100/80 dark:border-slate-700 pb-2">
        {children}
    </h2>
);
const Ul = ({ children }) => <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">{children}</ul>;
const Li = ({ children }) => <li>{children}</li>;

const PrivacyPage = () => {
    return (
        <LegalPageShell title="Privacy Policy" lastUpdated="11 April 2026">
            <section className="space-y-4">
                <P>
                    This Privacy Policy explains how <strong>Snout Scout</strong> (“Snout Scout”, “we”, “us”, “our”) collects,
                    uses, stores, and shares personal data when you use our mobile applications, websites, and related services
                    (together, the <strong>“Services”</strong>). We are committed to protecting your privacy and being transparent
                    about how we handle information, including data that Apple and app-store reviewers expect us to describe
                    clearly.
                </P>
                <P>
                    By using the Services, you acknowledge that you have read this policy. If you do not agree, please do not use
                    the Services.
                </P>
            </section>

            <section className="space-y-4">
                <H2>1. Who we are</H2>
                <P>
                    The Services are operated on behalf of Snout Scout                    . For data-protection enquiries, contact us at{' '}
                    <a href="mailto:privacy@snoutscout.com" className="font-medium text-[var(--color-primary)] underline dark:text-emerald-400">
                        privacy@snoutscout.com
                    </a>
                    .
                </P>
            </section>

            <section className="space-y-4">
                <H2>2. Scope</H2>
                <P>This policy applies to personal data processed through:</P>
                <Ul>
                    <Li>the Snout Scout mobile app(s) for iOS and Android;</Li>
                    <Li>our website(s) and marketing pages;</Li>
                    <Li>support, email, and in-app communications we operate.</Li>
                </Ul>
                <P>It does not apply to third-party websites or services that we link to but do not control.</P>
            </section>

            <section className="space-y-4">
                <H2>3. Data we collect</H2>
                <P>Depending on how you use the Services, we may process the following categories of data:</P>

                <p className="font-semibold text-slate-900 dark:text-white">3.1 Account and contact data</p>
                <Ul>
                    <Li>Email address, name or display name, and authentication identifiers (e.g. when you sign in with email or a third-party provider such as Google or Apple).</Li>
                    <Li>Profile details you choose to add (e.g. photo).</Li>
                </Ul>

                <p className="font-semibold text-slate-900 dark:text-white">3.2 Pet and care data</p>
                <Ul>
                    <Li>Pet names, photos, breed, age, medical notes, allergies, vaccination records, and similar information you enter to build a pet profile.</Li>
                    <Li>Identifiers such as QR codes or “snout” / biometric-style images you choose to upload for identification features, where offered.</Li>
                </Ul>

                <p className="font-semibold text-slate-900 dark:text-white">3.3 Location data</p>
                <Ul>
                    <Li>
                        <strong>Precise location</strong> (e.g. GPS) when you enable location permissions—for example to show nearby
                        vets or parks, to support lost-pet broadcasts, or to attach a location to an alert. You can disable
                        location in your device settings; some features will not work without it.
                    </Li>
                    <Li>
                        <strong>Approximate location</strong> derived from IP address or coarse signals when you use our website
                        or when precise location is unavailable.
                    </Li>
                </Ul>

                <p className="font-semibold text-slate-900 dark:text-white">3.4 Communications and community data</p>
                <Ul>
                    <Li>Messages you send through in-app messaging, reviews, or support channels.</Li>
                    <Li>Metadata such as timestamps and conversation participants.</Li>
                </Ul>

                <p className="font-semibold text-slate-900 dark:text-white">3.5 Transactions</p>
                <Ul>
                    <Li>
                        If you purchase a subscription or paid plan: payment status, plan tier (e.g. Basic, Pro, Business), and
                        transaction identifiers. Payment card processing is handled by Apple, Google, or other payment
                        processors; we do not store full card numbers on our servers.
                    </Li>
                </Ul>

                <p className="font-semibold text-slate-900 dark:text-white">3.6 Device and technical data</p>
                <Ul>
                    <Li>Device type, operating system, app version, language, IP address, and crash or diagnostics data to keep the Services secure and reliable.</Li>
                </Ul>

                <p className="font-semibold text-slate-900 dark:text-white">3.7 Usage analytics</p>
                <Ul>
                    <Li>
                        In-app events (e.g. screens viewed, features used) where we or our analytics partners process data in
                        line with this policy and your device settings.
                    </Li>
                </Ul>
            </section>

            <section className="space-y-4">
                <H2>4. How we use your data (purposes)</H2>
                <P>We use personal data only for specific purposes, including:</P>
                <Ul>
                    <Li>
                        <strong>Providing the Services:</strong> creating and managing your account, pet profiles, maps, bookings,
                        messaging, QR features, and lost-pet tools.
                    </Li>
                    <Li>
                        <strong>Safety and emergencies:</strong> sending lost-pet or radius alerts when you choose to broadcast,
                        and showing your pet’s information to other users as you direct within the app.
                    </Li>
                    <Li>
                        <strong>Personalisation:</strong> suggesting nearby places, content, or features relevant to you and your
                        pets.
                    </Li>
                    <Li>
                        <strong>Payments and plans:</strong> administering subscriptions (Basic, Pro, Business) and enforcing
                        entitlements.
                    </Li>
                    <Li>
                        <strong>Support:</strong> responding to questions and resolving issues.
                    </Li>
                    <Li>
                        <strong>Security and integrity:</strong> detecting abuse, fraud, and technical problems.
                    </Li>
                    <Li>
                        <strong>Legal compliance:</strong> meeting legal obligations and responding to lawful requests.
                    </Li>
                    <Li>
                        <strong>Improvement:</strong> understanding aggregate usage to improve the app (often using de-identified or
                        aggregated data where possible).
                    </Li>
                </Ul>
                <P>We do not sell your personal data in the conventional sense of selling lists to advertisers.</P>
            </section>

            <section className="space-y-4">
                <H2>5. Legal bases (UK / EEA users)</H2>
                <P>Where UK GDPR or EU GDPR applies, we rely on one or more of:</P>
                <Ul>
                    <Li>
                        <strong>Contract:</strong> processing necessary to provide the Services you request.
                    </Li>
                    <Li>
                        <strong>Legitimate interests:</strong> improving security, analytics at an appropriate level, and
                        marketing our own Services—balanced against your rights.
                    </Li>
                    <Li>
                        <strong>Consent:</strong> where required (e.g. certain notifications, optional analytics, or non-essential
                        cookies on the website)—which you may withdraw at any time.
                    </Li>
                    <Li>
                        <strong>Legal obligation:</strong> where the law requires us to process data.
                    </Li>
                </Ul>
            </section>

            <section className="space-y-4">
                <H2>6. Sharing and processors</H2>
                <P>We may share data with:</P>
                <Ul>
                    <Li>
                        <strong>Infrastructure and backend providers</strong> (e.g. Google Firebase / Firestore, Authentication,
                        Cloud Functions, hosting) to run the app and store data securely.
                    </Li>
                    <Li>
                        <strong>Apple and Google</strong> for in-app purchases, Sign in with Apple / Google, and platform services
                        subject to their policies.
                    </Li>
                    <Li>
                        <strong>Analytics or crash-reporting tools</strong> we configure to operate in a privacy-respecting way.
                    </Li>
                    <Li>
                        <strong>Professional advisers</strong> where required (lawyers, accountants) under confidentiality.
                    </Li>
                    <Li>
                        <strong>Authorities</strong> when we believe disclosure is required by law or to protect vital interests.
                    </Li>
                </Ul>
                <P>
                    We use written agreements with processors where required and limit access to what is necessary to provide
                    the Services.
                </P>
            </section>

            <section className="space-y-4">
                <H2>7. International transfers</H2>
                <P>
                    Your data may be processed in the United Kingdom, the European Economic Area, the United States, or other
                    countries where our providers operate. Where we transfer personal data outside the UK/EEA, we use appropriate
                    safeguards (such as standard contractual clauses) where required by law.
                </P>
            </section>

            <section className="space-y-4">
                <H2>8. Retention</H2>
                <P>
                    We keep personal data only as long as needed for the purposes above, including legal, accounting, or
                    reporting requirements. When data is no longer needed, we delete or anonymise it. Some backup copies may
                    persist for a limited period before being overwritten.
                </P>
            </section>

            <section className="space-y-4">
                <H2>9. Security</H2>
                <P>
                    We implement technical and organisational measures appropriate to the risk (encryption in transit, access
                    controls, secure development practices). No method of transmission over the internet is 100% secure; we cannot
                    guarantee absolute security.
                </P>
            </section>

            <section className="space-y-4">
                <H2>10. Your rights</H2>
                <P>Depending on your location, you may have the right to:</P>
                <Ul>
                    <Li>access a copy of your personal data;</Li>
                    <Li>rectify inaccurate data;</Li>
                    <Li>erase data in certain circumstances;</Li>
                    <Li>restrict or object to certain processing;</Li>
                    <Li>data portability for data you provided, where technically feasible;</Li>
                    <Li>withdraw consent where processing is consent-based;</Li>
                    <Li>lodge a complaint with a supervisory authority (in the UK, the ICO).</Li>
                </Ul>
                <P>
                    To exercise these rights, contact{' '}
                    <a href="mailto:privacy@snoutscout.com" className="font-medium text-[var(--color-primary)] underline dark:text-emerald-400">
                        privacy@snoutscout.com
                    </a>
                    . We may need to verify your identity.
                </P>
            </section>

            <section className="space-y-4">
                <H2>11. Children</H2>
                <P>
                    The Services are not directed at children under 13 (or the minimum age in your jurisdiction). We do not
                    knowingly collect personal data from children. If you believe we have, contact us and we will delete it.
                </P>
            </section>

            <section className="space-y-4">
                <H2>12. Cookies and similar technologies (website)</H2>
                <P>
                    Our website may use cookies or similar technologies for essential operation, preferences, and (if you
                    consent) analytics. You can control cookies through your browser settings and any cookie banner we provide.
                </P>
            </section>

            <section className="space-y-4">
                <H2>13. Apple App Store</H2>
                <P>
                    If you download Snout Scout from Apple’s App Store, your use is also subject to Apple’s applicable terms.
                    Apple is not responsible for the Services or this policy. Questions about personal data collected through the
                    app should be directed to us at the contact above—not to Apple.
                </P>
            </section>

            <section className="space-y-4">
                <H2>14. Changes</H2>
                <P>
                    We may update this policy from time to time. We will post the new version and update the “Last updated” date.
                    For material changes, we will provide additional notice as required by law or as we reasonably deem
                    appropriate (e.g. in-app notice).
                </P>
            </section>

            <section className="space-y-4">
                <H2>15. Contact</H2>
                <P>
                    Questions about this Privacy Policy:{' '}
                    <a href="mailto:privacy@snoutscout.com" className="font-medium text-[var(--color-primary)] underline dark:text-emerald-400">
                        privacy@snoutscout.com
                    </a>
                </P>
            </section>
        </LegalPageShell>
    );
};

export default PrivacyPage;
