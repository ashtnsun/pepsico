# Save state 2 — "pre-testing" — 2026-10-27

The web prototype (`prototype/`) right before usability testing. What changed since save state 1 and why is in [`docs/prototype-iterations.md`](../../prototype-iterations.md#save-state-2--pre-testing--2026-10-27) (changes 1–62).

## How the screenshots were taken

- A dev server (`npm run dev`) ran the current code, and a Playwright script captured it in headless Chromium.
- Every page opens in a fresh browser with its own test data in `localStorage`. Pages are either logged out or logged in as test user "Sam Taylor" with 2 past entries (4 for the "reward ready" shot). Result pages add one win, lose or draw entry, so their reward bar shows 3 of 4. The onboarding shot uses a new Google user.
- The design config menu is on its defaults (Big track hero, Poster cards, Meter card progress bar). Reduced motion is on, so no shot catches something mid-animation.
- Shots are full page at 1440 px wide (`desktop-1440/`) and 390 px wide (`mobile-390/`). No shot has a page error or sideways scroll.
- Not captured: the "Calculating your results" loading screen, pop-ups, the moderator panel (Shift + M) and the config menu (C).

## Screenshots

Both folders have the same 32 files. **New** marks pages added since save state 1.

| File | Page |
| --- | --- |
| `01-home-logged-out.png` | Home, logged out |
| `02-home-logged-in.png` | Home, logged in, 2 of 4 entries |
| `03-home-logged-in-reward-ready.png` | Home, logged in, 4 entries: "Claim your reward" (**new**) |
| `04-promotions.png` | Promotions grid |
| `05-promo-avengers-active.png` | Avengers Doomsday promotion (JOY, active) |
| `06-promo-doritos-wrap-active.png` | Doritos & F1 wrap-up promotion (active) |
| `07-promo-7up-weekend-active.png` | 7UP "Lift your weekend" (placeholder, **new**) |
| `08-promo-lipton-bestea-active.png` | Lipton promotion (placeholder, **new**) |
| `09-promo-quaker-mornings-active.png` | Quaker promotion (placeholder, **new**) |
| `10-promo-las-vegas-ended.png` | Doritos & F1 Las Vegas (ended) |
| `11-promo-terms.png` | Promotion terms |
| `12-participate-logged-out.png` | Enter a code while logged out: sends you to Log in |
| `13-participate-logged-in.png` | Enter a code, logged in |
| `14-result-win.png` | Instant win result |
| `15-result-lose.png` | Lose result |
| `16-result-draw-entry.png` | "You're in the draw" result |
| `17-brands.png` | Brands index |
| `18-brand-doritos.png` | Doritos brand page |
| `19-brand-rockstar.png` | Rockstar brand page |
| `20-brand-pepsi.png` | Pepsi brand page |
| `21-brand-7up.png` | 7UP brand page (**new**) |
| `22-faq.png` | FAQ |
| `23-contact.png` | Contact |
| `24-terms.png` | Site terms |
| `25-privacy.png` | Privacy |
| `26-login.png` | Log in |
| `27-login-check-email.png` | "Check your email" (magic link) |
| `28-register.png` | Register |
| `29-onboarding.png` | Onboarding after Google sign-in |
| `30-profile.png` | Profile |
| `31-change-country.png` | Country picker |
| `32-not-found.png` | 404 page |
