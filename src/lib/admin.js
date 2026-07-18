// UI-only convenience check for showing/hiding admin links and routes.
// Real enforcement lives in firestore.rules and functions/index.js — keep all three in sync.
const ADMIN_EMAILS = ['charicombe12@gmail.com'];

export function isAdminEmail(email) {
    return Boolean(email) && ADMIN_EMAILS.includes(email);
}
