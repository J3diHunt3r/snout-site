import { httpsCallable } from 'firebase/functions';
import { getFirebaseFunctions } from '../lib/firebase';

/** Thrown when opening the billing portal fails; `code` is stable for UI hints. */
export class BillingPortalError extends Error {
    constructor(code, message) {
        super(message);
        this.name = 'BillingPortalError';
        this.code = code;
    }
}

/** Calls the `createBillingPortalSession` Cloud Function and returns the portal URL. */
export async function createBillingPortalUrl() {
    const functions = getFirebaseFunctions();
    if (!functions) {
        throw new BillingPortalError('NOT_CONFIGURED', 'Billing is not configured.');
    }

    const createSession = httpsCallable(functions, 'createBillingPortalSession');
    try {
        const result = await createSession({ returnUrl: `${window.location.origin}/account` });
        return result.data?.url;
    } catch (e) {
        throw new BillingPortalError(e?.code || 'UNKNOWN', e?.message || 'Failed to open billing portal.');
    }
}
