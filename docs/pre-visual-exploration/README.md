# Pre-visual exploration: every page of the prototype as it is now

A record of every page of the web prototype (`prototype/`) on 2026-10-26, taken before the visual exploration starts. Use it as the "before" picture: what pages exist, what's on each one, and how they look today on desktop and on a phone.

- **Code at this state:** commit `08834c2` (prototype change 15). No code was changed for this capture.
- **Screenshots:** `screenshots/desktop-1440/` (1440 px wide) and `screenshots/mobile-390/` (390 px wide). 28 full-page PNGs in each, with the same file names.
- **Capture log:** `screenshots/capture-log.json` lists each file's final URL, page height and main heading.

## How the screenshots were taken

- Taken with Playwright (headless Chromium) from the dev server at `localhost:5173`.
- Each page was opened in a fresh browser with its own test data, so the shots don't depend on each other:
  - **Logged out:** empty data, country set to United Kingdom.
  - **Logged in:** test user Sam Taylor with 3 past entries on ended promotions (one lost, one won a Pepsi Bucket Hat, one in a draw), so the progress tracker shows "1 entry away".
  - **Results:** the same user plus a win, a loss and a draw entry, so all three result pages can be opened directly.
  - **Onboarding:** a new Google sign-in with no country yet.
- Before each shot the page was scrolled to the bottom and back, so lazy images load.
- The prototype pretends today is 23 Oct 2026 (`prototype/src/data/config.ts`), so the same promotions are active or ended every time.

## Shared parts (on most pages)

| Part | What it looks like now |
| --- | --- |
| Navbar | JOY blue bar: JOY logo left; Home, Promotions, Brands (dropdown) centred, with a white underline on the current tab; Login + Register pills on the right, or "Hi Sam" with a menu when logged in. On phones: logo and a menu button. |
| Breadcrumb | Darker blue strip under the navbar, uppercase links, current page in bold. Not on the home, auth, country or 404 pages. |
| Newsletter band | "Stay up to date with your favorite brands": JOY blue band with dots, crosses and circle shapes, email field and white Subscribe pill. On content pages only, not on the task pages (entering a code, results, log in, register, onboarding, profile, change country). |
| Footer | JOY blue: JOY by PepsiCo logo bottom left, links (FAQ, Terms and Conditions, Privacy policy, Contact, Change Country), "©2025 PepsiCo, Inc". |

## Pages

| # | File | Route | What's on the page |
| --- | --- | --- | --- |
| 01 | `01-home-logged-out.png` | `/` | Register hero ("Register to participate", yellow Register now pill, curved bottom edge) · How it works (3 blue circles: Snack, Play, Win) · Current promotions (2 large promotion bands in the brand colour, See all promotions) · "Creating Joy with every sip and every bite" with floating pack shots · newsletter · footer |
| 02 | `02-home-logged-in.png` | `/` | "Hi Sam," progress tracker (3 of 4 steps filled, gift icon, "1 entry away") · Suggested for you (2 active promotion cards, Enter) · Your entries (3 cards with Ended / You won badges, View) · newsletter · footer |
| 03 | `03-promotions.png` | `/promotions` | Promotion hero carousel · "All promotions" with Brand, Promotion type and Sort by dropdowns · 3-column card grid: active first, ended greyed and labelled |
| 04 | `04-promo-avengers-active.png` | `/promotions/avengers-doomsday` | Hero image with live-site ellipse curve · title band (dates, title, subtitle, yellow Participate here, register / log in line, share icons) · sticky section menu (Prizes, Steps, FAQs, Terms) · Prizes carousel (round images, 1 / 3) · How to take part (3 circles) · legal text · Contact (promotion) and Terms (promotion) links · Participate here banner · FAQ accordion · newsletter |
| 05 | `05-promo-doritos-wrap-active.png` | `/promotions/las-vegas-wrap` | Same layout as 04 in Doritos red; a draw promotion with one £100 prize |
| 06 | `06-promo-las-vegas-ended.png` | `/promotions/las-vegas` | Ended promotion: "The Promotion Has Ended" hero with See active promotions · prizes · steps · "Check out other promotions" with 2 promotion bands |
| 07 | `07-promo-terms.png` | `/promotions/avengers-doomsday/terms` | Breadcrumb, page title, long legal text |
| 08 | `08-participate-logged-out.png` | `/promotions/avengers-doomsday/participate` | Not logged in, so the site sends you to Log in (shows the Log in page with a note about why) |
| 09 | `09-participate-logged-in.png` | `/promotions/avengers-doomsday/participate` | Grey page, one centred column: promo strip ("You're entering", title, dates) · white card: Enter your code, where-to-find-the-code tip with pack image, code field, terms checkbox, Submit code · footer below the fold |
| 10 | `10-participate-loading.png` | same, after Submit | Same strip · "Calculating your instant results…" with 4 animated JOY shapes |
| 11 | `11-result-win.png` | `/promotions/avengers-doomsday/result/win` | Grey page, white card: confetti icon, Congratulations!, prize name and round prize image, draw reminder, code and date, "2 entries away" note, Return to homepage, See all my entries |
| 12 | `12-result-lose.png` | `/promotions/avengers-doomsday/result/lose` | Same card: Not this time, still in the draw for the holiday |
| 13 | `13-result-draw-entry.png` | `/promotions/las-vegas-wrap/result/draw` | Same card: You're in the draw!, What happens next |
| 14 | `14-brands.png` | `/brands` | "Our brands": 4 × 2 grid of logos, brand names and active-promotion counts, no borders |
| 15 | `15-brand-doritos.png` | `/brands/doritos` | Brand hero image · brand-colour band with welcome text and Visit brand website · Active promotions · Latest brand news (2 articles) · Want to know more · Ended promotions |
| 16 | `16-brand-rockstar.png` | `/brands/rockstar` | Same layout; "Coming soon ..." empty state for active promotions; Check out other brand promotions |
| 17 | `17-brand-pepsi.png` | `/brands/pepsi` | Same layout; no active promotions, 2 ended, plus other brand promotions |
| 18 | `18-faq.png` | `/faq` | Title, search box, FAQ grouped by topic (About Joy, Account and login, …) as accordions |
| 19 | `19-contact.png` | `/contact` | Contact form with Send message |
| 20 | `20-terms.png` | `/terms` | Site terms (placeholder text) |
| 21 | `21-privacy.png` | `/privacy` | Privacy policy (placeholder text) |
| 22 | `22-login.png` | `/login` | Grey page, white card: Log In, email field, Login with Joy account, Google / Facebook, Create a new account |
| 23 | `23-login-check-email.png` | `/login/check-email` | "Check your inbox" card with the magic-link message and Open the login link |
| 24 | `24-register.png` | `/register` | "Register here": 1. Account information, 2. Personal information, consents, Register |
| 25 | `25-onboarding.png` | `/onboarding` | "Almost there, Sam!" after a social sign-in: 1. Select country, 2. Terms & Conditions, Cancel / Finish |
| 26 | `26-profile.png` | `/profile` | Brand-pack banner · "Hello, Sam!" with side tabs (My details, My entries (3), Settings) · details form in a white card, Save |
| 27 | `27-change-country.png` | `/change-country` | "We want to give you content designed for you" with a grid of countries |
| 28 | `28-not-found.png` | any unknown route | "Page not found" with Go to homepage |

Compared with save state 1 (27 pages), this set adds `10-participate-loading.png`, so file numbers from 10 on are one higher.

## Things noticed while capturing (for the visual exploration)

Observations only. Nothing here has been changed.

- **Two ways to show a promotion.** Large brand-colour bands (logged-out home, ended promotion page, brand pages) and smaller cards with a status badge (Promotions page, logged-in home). The two don't share a style.
- **Heading styles vary between pages.** Promotion pages use all-caps headings ("THOUSANDS OF PRIZES", "HOW TO TAKE PART"), the Doritos page uses "Steps", the home page mixes a small "How it works" with a very large "Creating Joy with every sip and every bite".
- **Two page backgrounds.** Content pages are white. Task pages (entering a code, results, log in, register) are grey (`#F4F4F4`) with a white card in the middle.
- **Different button styles.** Yellow pills on blue (hero, Participate here), blue filled and outlined pills on white, white pills on brand colours, and text links in caps (See all promotions, Entry history).
- **Decoration.** Dots, crosses and circles appear on the logged-out hero, the progress tracker and the newsletter band, but not on the promotion title band.
- **Footer** says "©2025 PepsiCo, Inc" while the prototype's date is 2026.
