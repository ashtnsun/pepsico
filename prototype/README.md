# JOY web prototype (usability testing)

An interactive prototype of the redesigned JOY site. It looks like the live site (joy-pepsico.eu/en-gb) and adds the structure and features from the team's wireframes. Everything a participant can try works end to end, with fake data saved in their browser.

## Run it

```bash
cd prototype
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in prototype/dist (works from any folder or static host)
```

## What works

| Area | What a participant can do |
| --- | --- |
| Home (logged out) | Hero carousel (register slide + active promotions), "How it works" (Snack, Play, Win), current promotions, brand content |
| Home (logged in) | "Hi Sam" progress tracker towards the next reward, suggested promotions, their entries with results |
| Promotions | Search, filter by status (All, Active, Ended) and brand; active and ended promotions in separate sections; ended cards are greyed out and labelled "Ended" |
| Promotion page | Hero, sticky section menu with a Participate button, steps, prizes carousel, FAQ accordion, promotion terms; ended promotions say so clearly and point to active ones |
| Enter a code | Log in or register first (then come straight back), enter a code, accept the terms, "Calculating your instant results…", then win, lose or "You're in the draw" |
| Rules | Wrong code format, a code that was already used, one entry per week (Avengers) or per person (Doritos wrap-up), ended promotions closed |
| Accounts | Register with validation, log in with the email "magic link" step, Google/Facebook sign-in with the country and terms onboarding, log out |
| Profile | Edit details, entry history with results, marketing preferences, delete profile |
| Brands | Brands menu and page, brand pages (Doritos has videos; Rockstar has no promotions, as on the live site) |
| Other | General FAQ with search, contact form, newsletter sign-up, country picker, mobile menu and layouts |

## Promotions in the prototype

The prototype pretends today is **23 October 2026**, so the same promotions are active in every session.

| Promotion | Status | How entering works | Test codes |
| --- | --- | --- | --- |
| Avengers Doomsday "Assemble your snacks" (JOY) | Active | Instant win + prize draw, 1 entry per week | `GB` + 5 or more letters/numbers, e.g. `GB7K2M9QX` |
| Doritos & F1® wrap-up "Win £100" | Active | Prize draw, 1 entry per person | `GBC` + 5 or more, e.g. `GBC48TT2KL` |
| Doritos & F1® Las Vegas, Pepsi Music, Walkers MAX × GDK, Pepsi × EA FC 25 | Ended | Can't be entered | — |

Each code works once.

## Moderator panel

Press **Shift + M** (or open the prototype with `?moderator` in the URL) to show a small dark panel. It is not part of the design. With it you can:

- log in as a test user with 3 entries ("1 entry away from your next reward") or with 0 entries;
- force the instant-win result: Random, Always win or Always lose;
- turn off the one-entry-per-week limit so a participant can repeat a task;
- jump to any page;
- reset all data before the next participant.

Data lives in the participant's browser only (`localStorage`), so each test device starts clean after a reset.

## Things that are placeholders

- **Reward rule:** "every 4 entries earns a bonus entry into the JOY monthly prize draw" is invented for the progress tracker. The team needs to define the real rule.
- **Font:** Inter instead of Galano Grotesque (not licensed).
- **Emails:** the login link and prize emails are simulated on screen.
- **Terms and privacy pages** are short summaries.

## Where things are

```
src/
  data/         promotions, brands, FAQ (copy and images from the live site), prototype date and reward rule
  state/        fake back end: accounts, entries, codes, newsletter (localStorage)
  components/   layout (navbar, breadcrumb, newsletter, footer), promo pieces, small UI parts
  pages/        one file per page or group of pages
  moderator/    the hidden moderator panel
  styles/       tokens.css (design-system tokens) and site.css (live-site values without a token)
public/images   real assets from the live site, captured 2026-10-23
public/media    two Doritos brand videos
```
