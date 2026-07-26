// Lightweight funnel tracking for the landing page.
//
// Fires GA4 events (via the gtag installed in index.html) and mirrors them as
// Clarity custom events so session recordings are tagged too. Safe no-op if
// either script is blocked / not yet loaded.
//
// Funnel step tracked here: `cta_click` — any click on a link to
// app.dragonrefunds.com (the sign-up destination). `sign_up` and
// `connect_amazon` fire in the app frontend, not here.

export function track(event, params = {}) {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', event, params);
    if (typeof window.clarity === 'function') window.clarity('event', event);
  } catch (_) {
    /* analytics must never break the page */
  }
}

// Install a single delegated click listener that fires `cta_click` whenever a
// user clicks any link pointing to app.dragonrefunds.com. Capture phase so it
// runs before navigation; gtag uses sendBeacon, so the event survives unload.
export function initCtaTracking() {
  document.addEventListener(
    'click',
    (e) => {
      const t = e.target;
      const a = t && t.closest ? t.closest('a[href]') : null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (!href.includes('app.dragonrefunds.com')) return;
      track('cta_click', {
        destination: href.split('?')[0],
        link_text: (a.textContent || '').trim().slice(0, 80),
        page_path: window.location.pathname,
      });
    },
    true,
  );
}
