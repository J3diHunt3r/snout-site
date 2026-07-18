import { httpsCallable } from 'firebase/functions';
import { getFirebaseFunctions } from '../lib/firebase';

/** Thrown when a contact message fails to send; `code` is stable for UI hints. */
export class ContactSendError extends Error {
    constructor(code, message) {
        super(message);
        this.name = 'ContactSendError';
        this.code = code;
    }
}

/**
 * Sends a contact form message via the `sendContactEmail` Cloud Function.
 * @param {{ name: string, email: string, message: string }} fields
 */
export async function sendContactMessage(fields) {
    const functions = getFirebaseFunctions();
    if (!functions) {
        throw new ContactSendError('NOT_CONFIGURED', 'Contact form is not configured.');
    }

    const sendContactEmail = httpsCallable(functions, 'sendContactEmail');
    try {
        await sendContactEmail(fields);
    } catch (e) {
        throw new ContactSendError(e?.code || 'UNKNOWN', e?.message || 'Failed to send message.');
    }
}
