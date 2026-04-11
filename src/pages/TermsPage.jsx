import React from 'react';
import { Link } from 'react-router-dom';
import LegalPageShell from '../components/LegalPageShell';

const P = ({ children }) => <p className="text-slate-700 dark:text-slate-300">{children}</p>;
const H2 = ({ children }) => (
    <h2 className="text-xl font-bold text-slate-900 dark:text-white scroll-mt-28 border-b border-emerald-100/80 dark:border-slate-700 pb-2">
        {children}
    </h2>
);
const Ul = ({ children }) => <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">{children}</ul>;
const Li = ({ children }) => <li>{children}</li>;

const TermsPage = () => {
    return (
        <LegalPageShell title="Terms of Use" lastUpdated="11 April 2026">
            <section className="space-y-4">
                <P>
                    These Terms of Use (“<strong>Terms</strong>”) govern your access to and use of Snout Scout’s mobile
                    applications, websites, and related services (the “<strong>Services</strong>”) operated by or on behalf of{' '}
                    <strong>Snout Scout</strong> (“<strong>we</strong>”, “<strong>us</strong>”, “<strong>our</strong>”). By
                    downloading, accessing, or using the Services, you agree to these Terms. If you do not agree, do not use the
                    Services.
                </P>
            </section>

            <section className="space-y-4">
                <H2>1. Eligibility</H2>
                <P>
                    You must be able to form a legally binding contract in your jurisdiction. If you use the Services on behalf of
                    a business (e.g. a grooming business on a Business plan), you represent that you have authority to bind that
                    organisation. The Services are not intended for children under 13 (or the minimum age in your country); see our
                    Privacy Policy for how we treat minors’ data.
                </P>
            </section>

            <section className="space-y-4">
                <H2>2. Accounts and security</H2>
                <P>
                    You are responsible for maintaining the confidentiality of your login credentials and for all activity under
                    your account. You must provide accurate information and keep it up to date. Notify us promptly at{' '}
                    <a href="mailto:support@snoutscout.com" className="font-medium text-[var(--color-primary)] underline dark:text-emerald-400">
                        support@snoutscout.com
                    </a>{' '}
                    if you suspect unauthorised access.
                </P>
            </section>

            <section className="space-y-4">
                <H2>3. The Services</H2>
                <P>
                    Snout Scout provides tools for pet owners and businesses, which may include pet profiles, health
                    logging, maps and discovery, messaging, QR identification features, lost-pet broadcasts, and
                    subscriptions (e.g. Basic, Pro, Business). Features may change; we may add, modify, or remove
                    functionality with reasonable notice where appropriate.
                </P>
            </section>

            <section className="space-y-4">
                <H2>4. Subscriptions and fees</H2>
                <P>
                    Paid plans are billed through the Apple App Store, Google Play, or other payment methods we make
                    available. Prices, renewal terms, and cancellation rights are shown at purchase and in the relevant
                    platform’s terms. Unless stated otherwise, subscriptions renew automatically until cancelled in your
                    account settings or the app store. Taxes may apply where required by law.
                </P>
            </section>

            <section className="space-y-4">
                <H2>5. Location and emergency features</H2>
                <P>
                    Some features rely on device location. You control location permissions in your device settings. Lost-pet
                    or radius alerts may share your pet’s information and location with other users as you explicitly initiate
                    within the app. You are responsible for the accuracy of what you share and for using these features lawfully
                    and considerately.
                </P>
            </section>

            <section className="space-y-4">
                <H2>6. Acceptable use</H2>
                <P>You agree not to:</P>
                <Ul>
                    <Li>use the Services for any unlawful purpose or in violation of third-party rights;</Li>
                    <Li>harass, abuse, defraud, or harm other users or animals;</Li>
                    <Li>upload malware, scrape or overload our systems, or attempt unauthorised access;</Li>
                    <Li>misrepresent your identity, your pet’s identity, or a business’s credentials;</Li>
                    <Li>reverse engineer or circumvent security or usage limits except where permitted by law;</Li>
                    <Li>use the Services to send spam or unsolicited bulk communications outside permitted in-app messaging.</Li>
                </Ul>
                <P>We may investigate and suspend or terminate accounts that breach these rules.</P>
            </section>

            <section className="space-y-4">
                <H2>7. User content and intellectual property</H2>
                <P>
                    You retain ownership of content you submit (e.g. photos, descriptions). You grant us a worldwide,
                    non-exclusive licence to host, store, process, display, and distribute that content solely to operate and
                    improve the Services—including showing it to other users when your settings or features (e.g. lost-pet
                    broadcast) require it.
                </P>
                <P>
                    The Snout Scout name, logo, branding, software, and materials we provide are owned by us or our licensors.
                    You may not copy or use them except as permitted by these Terms or with our written consent.
                </P>
            </section>

            <section className="space-y-4">
                <H2>8. Third-party services</H2>
                <P>
                    The Services may integrate maps, sign-in, payment, or analytics from third parties (e.g. Apple, Google,
                    Firebase). Those services are governed by their own terms and privacy policies. We are not responsible for
                    third-party services we do not control.
                </P>
            </section>

            <section className="space-y-4">
                <H2>9. Disclaimers</H2>
                <P>
                    The Services are provided “as is” and “as available” to the fullest extent permitted by law. We do not
                    guarantee uninterrupted or error-free operation. Maps, distances, and business listings are for information
                    only and may be inaccurate or outdated. <strong>Snout Scout is not a substitute for professional veterinary
                    advice, emergency services, or legal advice.</strong> Always contact a qualified professional in an emergency.
                </P>
            </section>

            <section className="space-y-4">
                <H2>10. Limitation of liability</H2>
                <P>
                    To the maximum extent permitted by applicable law, we and our affiliates, directors, and employees are not
                    liable for any indirect, incidental, special, consequential, or punitive damages, or for loss of profits,
                    data, or goodwill, arising from your use of the Services. Our total liability for any claim arising out of
                    these Terms or the Services is limited to the greater of (a) the amount you paid us for the Services in the
                    twelve months before the claim, or (b) one hundred pounds sterling (£100), except where liability cannot be
                    limited by law (such as death or personal injury caused by negligence, or fraud).
                </P>
            </section>

            <section className="space-y-4">
                <H2>11. Indemnity</H2>
                <P>
                    You will defend and indemnify us against claims, damages, losses, and expenses (including reasonable legal
                    fees) arising from your misuse of the Services, your content, or your breach of these Terms—except to the
                    extent caused by our wilful misconduct.
                </P>
            </section>

            <section className="space-y-4">
                <H2>12. Suspension and termination</H2>
                <P>
                    We may suspend or terminate your access if you violate these Terms, pose a security or legal risk, or where
                    we cease offering the Services. You may stop using the Services at any time. Provisions that by their nature
                    should survive (e.g. liability limits, indemnity, governing law) will survive termination.
                </P>
            </section>

            <section className="space-y-4">
                <H2>13. Privacy</H2>
                <P>
                    Our{' '}
                    <Link to="/privacy" className="font-medium text-[var(--color-primary)] underline dark:text-emerald-400">
                        Privacy Policy
                    </Link>{' '}
                    explains how we collect and use personal data. It forms part of your agreement with us.
                </P>
            </section>

            <section className="space-y-4">
                <H2>14. Changes to these Terms</H2>
                <P>
                    We may update these Terms from time to time. We will post the updated “Last updated” date. Continued use after
                    changes become effective constitutes acceptance, except where required law mandates a different process.
                </P>
            </section>

            <section className="space-y-4">
                <H2>15. Governing law and disputes</H2>
                <P>
                    These Terms are governed by the laws of <strong>England and Wales</strong>, without regard to conflict-of-law
                    rules. The courts of England and Wales have exclusive jurisdiction, subject to any mandatory rights you have as
                    a consumer in your country of residence.
                </P>
            </section>

            <section className="space-y-4">
                <H2>16. Apple App Store</H2>
                <P>
                    If you obtained the app from Apple, you acknowledge that Apple has no obligation to provide support for the
                    Services. Apple is not responsible for addressing claims relating to the app or your possession or use of it.
                    Apple and Apple’s subsidiaries are third-party beneficiaries of these Terms as they relate to your Apple
                    licence; upon your acceptance, Apple has the right to enforce these Terms against you.
                </P>
            </section>

            <section className="space-y-4">
                <H2>17. Contact</H2>
                <P>
                    Questions about these Terms:{' '}
                    <a href="mailto:legal@snoutscout.com" className="font-medium text-[var(--color-primary)] underline dark:text-emerald-400">
                        legal@snoutscout.com
                    </a>
                </P>
            </section>
        </LegalPageShell>
    );
};

export default TermsPage;
