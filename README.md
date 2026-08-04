# DragonRefunds-LP

Landing page for **DragonRefunds** — automated Amazon FBA reimbursement recovery.

- **Live:** https://dragonrefunds.com
- **Serves:** the `/refunds` feature LP from DragonBotLP, at the domain root.
- **Deploy:** GitHub Actions → GitHub Pages (auto-builds on push to `main`).

## Tracking IDs

| Tool | ID |
|------|----|
| Google Analytics (GA4) | `G-H3DKKWESYR` |
| Microsoft Clarity | `xpykdkfhjg` |
| Google Ads customer | `392-077-2611` (shared across all Dragon LP domains) |
| Meta Pixel (dataset) | `1030872029657370` — **DragonRefunds' own**, not DragonBot's |

> The Meta Pixel is deliberately a *separate dataset* from DragonBot's `881227664817776`.
> DragonBot's pixel was inherited when this repo was forked and removed in `535effd`;
> re-adding it would have been wrong. Both brands run the same shared code firing
> identical event names (`CompleteRegistration`, `ConnectSeller`), so a single dataset
> would make them separable only by URL filter. Same Business Portfolio, different dataset.

Snippets live in [`index.html`](index.html) `<head>`. Event mirroring (GA4 + Clarity + Meta)
and SPA route pageviews live in [`src/lib/track.js`](src/lib/track.js).

Campaign + tracking plan: `Dragon-marketing/META_ADS_DRAGONREFUNDS.md` and
`META_TRACKING_SETUP.md`.
