// Shared reimbursement funnel constants.
//
// ⚠ FBA_RECOVERY_RATE and REPORT_ETA_HOURS are MIRRORED IN
// dragonrefunds-frontend/src/lib/refundsEstimate.ts, which drives the same
// estimate on the app's /sign-up page. The two must stay in agreement: a
// visitor quoted one figure by the calculator here and a different one after
// clicking through stops believing both. There is no shared home for them —
// this repo does not consume @ballisticbrands/frontend-shared — so changing
// one means changing the other by hand.

/**
 * Where every Dragon Refunds CTA sends the visitor. The estimate + capture
 * form now lives in the app itself (dragonrefunds-frontend, /sign-up), so
 * this is an absolute URL again rather than an on-site route.
 *
 * src/lib/attribution.js rewrites this href at click time to carry UTMs and
 * click ids across the subdomain boundary — so it must stay an <a href>,
 * not a programmatic redirect.
 *
 * CTAs on the DragonBot (non-refunds) surface point at the same app sign-up
 * but are wired separately via SIGNUP_URL in LandingV4.
 */
export const REFUNDS_CTA_URL = 'https://app.dragonrefunds.com/sign-up';

/** Share of gross annual FBA revenue that is typically recoverable. */
export const FBA_RECOVERY_RATE = 0.015;

/**
 * Hours from account connection to the exact, itemized report landing.
 *
 * This is a DELIVERY PROMISE, not a countdown to an expiring offer — it is
 * only true for as long as the audit really does land inside the window.
 * Nothing on the site should render it as a ticking clock: the clock can
 * only start once an account is connected, so a timer running before
 * sign-up counts down to nothing and resets on every page load.
 */
export const REPORT_ETA_HOURS = 4;
