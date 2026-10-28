# Prototype iterations: changes, prompts and AI use

This file records every change to the web prototype (`prototype/`), the prompt that asked for it, why it was made, and how AI (Claude Code) was used. It is updated after **every** change, in every session. It is written so the team can explain the process later (for example in a final report or presentation).

- **Save states** are snapshots the user calls out ("save state 2"). Each one gets full-page screenshots in `docs/save-states/save-state-N/` and a summary here.
- **Changes** between save states are logged one entry per prompt, newest at the bottom.
- The detailed session diary is still `docs/process-log.md`; big decisions are still in `docs/decisions.md` (D-numbers). This file links to them instead of repeating them in full.

## How AI is used on this project

| Tool | What it did |
| --- | --- |
| Claude Code (Claude Opus, in the terminal) | Read the references, planned, wrote all prototype code, ran builds and browser tests, wrote the docs |
| Figma MCP | Read the design system file and the wireframes (read-only for the prototype) |
| Playwright MCP (browser automation) | Captured the live site, measured its styles, downloaded its images, tested the prototype end to end, took the screenshots in this file |

What people did: the user wrote every prompt, answered Claude's questions and made the decisions; a teammate passed the live site's bot check by hand so Claude could read it. Claude never got around the bot check on its own.

---

## Save state 1 — after Prompt 17 (web prototype built) — 2026-10-23

**Code at this state:** commit `549bfe3` ("prompt-17: web prototype for usability testing").
**Screenshots (taken 2026-10-26):** `docs/save-states/save-state-1/desktop-1440/` and `docs/save-states/save-state-1/mobile-390/` (27 pages each, full page). See the [screenshot list](#screenshots-in-save-state-1).

### Summary

One prompt (Prompt 17) turned the project from "build prototypes in Figma" into "build a working website for usability testing". Claude built a Vite + React + TypeScript site that looks like the live JOY site (joy-pepsico.eu/en-gb) and adds the structure and new features from the team's wireframes. All the main tasks work end to end with fake data saved in the browser: browsing and filtering promotions, registering, logging in, entering a code, seeing a win / lose / draw result, a progress tracker, and a profile with entry history. A hidden moderator panel (Shift + M) resets data between test participants and can force a win or a loss.

### How we got here (context before Prompt 17)

The prototype sits on top of the Phase 1 design system, built over Sessions 1–18 (2026-10-13 to 2026-10-16). Full details are in `docs/process-log.md`.

| Prompt | What it produced | Why it matters for the prototype |
| --- | --- | --- |
| 0 — Repo setup | Repo structure, `CLAUDE.md` rules, logging habit | Same rules and log format are used now |
| 0.5 — Live site capture | `references/live-site/`: full-page screenshots (desktop + mobile), all site CSS, measured styles | The prototype's look is copied from these captures |
| 1 — Audit | `docs/audit.md`: brand sheets, current site, wireframes compared | Chose which values became tokens |
| 2 — Tokens | `tokens/*.json`, 3 Figma variable collections (Primitives, Theme, Scale) | Copied into `prototype/src/styles/tokens.css` |
| 3 — Text styles | Display, Heading 1–3, Body L/M/S, Label, Caption | Type scale used in the prototype |
| 4–13 — Components | Button, Icon Button, Text Field, Accordion, Card, Badge, Breadcrumb, Pagination Dots in Figma | Rebuilt in React in `prototype/src/components/` |
| 14 — QA | `docs/qa-report.md` | Known issues carried forward (font licence, buttons on dark) |
| 15 — Make Kit docs | `guidelines/` (AI-readable component specs, `tokens.md`) | Source for `tokens.css` and component specs |
| 16 — Accordion hover, icons | `color/text/hover` token, Lucide icon set | Prototype uses `lucide-react` |

The plan up to Prompt 16 was to prototype the redesigned screens in Figma. Prompt 17 changed that: Figma prototypes can't handle real typing, validation and saved state (codes, entry limits, progress), which usability testing of the main tasks needs.

### Inputs and references Claude used

- **Live site captures:** `references/live-site/` (screenshots of home, promotions, promo pages, ended promo, brand page, brand picker, country picker, login, register, profile, pop-up, loading; CSS; `computed-styles.json`).
- **Live site itself** (https://www.joy-pepsico.eu/en-gb/), opened in the Playwright browser after a teammate passed the bot check. Used for exact measurements, copy, prize lists, FAQs, legal text, 119 images and 2 Doritos videos.
- **Wireframes** (Figma `IMEy8gioQJFpGIgb9qIUJe`): the 8 JOY frames (Home logged in / out, Onboarding, Promo Gallery, Promo Details, Promo Loading, Results win / lose, Brand). Used for structure and new features only, never for visuals. The Travel / Life Style template frames and the two "D/ PROMOTION LANDINGPAGE EU" frames were skipped.
- **Design system** (Figma `AJ0GKjFjDNvEsD4MfdyZaN`, `guidelines/`): tokens and component specs.
- **Project plan and documentation PDFs** in `references/`.

### The prompt (verbatim)

> new plan. Instead of building the prototypes directly in Figma itself using MCP, I want to build them out in the web, fully interactive. The main purpose of this is to enable those web prototypes to be used for usability testing. So try to use, or I will provide you the links for the current design system, the wireframes that we have for the redesigned screens, and the existing screenshots of all the of the existing site is already in the folder, in the references folder. I do want to make sure that these prototypes will keep the existing visual design as the current site, the wireframes are just references for the strucutre and new features. Let me know what the plan is and if you have any questions. Heres the design system:https://www.figma.com/design/AJ0GKjFjDNvEsD4MfdyZaN/AI-Assisted-Design-System?node-id=14-2&t=CPP3SOji1bFIJLJp-1 heres the wireframes: https://www.figma.com/design/IMEy8gioQJFpGIgb9qIUJe/Wireframes?node-id=0-1&t=HX5VeZ605s7yVkMn-1

Claude replied with a plan and 7 questions. The user answered:

> The wireframes are there for broad reference only, they are not visually polished or consistent. Make sure to follow the existing site visuals/how components/elements on the site look. The wireframes should only inform general concepts/ideas of what the stucture should look like. 1. use inter 2. use real images 3. yes 4. basically everything/major tasks, even thugh it's for usability testing, the major tasks/funcationlity of the site should be implemented 5. skip 6. dont worry about that 7. no skip

The exact wording of Claude's 7 questions wasn't saved. From the log: 1 = font (Inter, since Galano Grotesque isn't licensed), 2 = real images or placeholders, 4 = how much to build, 5 = the "D/ PROMOTION LANDINGPAGE EU" frames (skipped). Questions 3, 6 and 7 aren't recorded.

### Process (what Claude did, in order)

1. Read the 8 JOY wireframe frames in Figma (structure and screenshots).
2. Studied every live-site capture in `references/live-site/`, cut into tiles to see detail.
3. In the live site (unlocked by a teammate): listed pages and image links, downloaded 119 images and 2 videos, measured exact styles (navbar, breadcrumb, buttons, teaser cards, steps, prize band, FAQ, newsletter, footer, brand colors), and copied promotion copy, steps, prizes, legal text and FAQs.
4. Built `prototype/`: design-system tokens plus live-site values, data files, a fake back end in the browser, layout, promotion components, 15+ routes and the moderator panel.
5. Checked it: type check and build, screenshots compared with the live captures, a scripted end-to-end run, and mobile layouts at 390 px.
6. Added a "Prototype phase" section to `CLAUDE.md`, a pointer in `README.md`, decisions D36–D39 and a log entry.

### Decisions and why

| # | Decision | Why |
| --- | --- | --- |
| D36 | Look like the live site; JOY blue for buttons, links and navigation on every page; brand color only on promotion surfaces | The user wants test results to be about structure and features, not a new look |
| D37 | Vite + React + TypeScript, hash routing, fake data in `localStorage`, moderator panel | Participants need real typing, validation and saved state; no server keeps hosting free; moderators need a quick reset |
| D38 | Real live-site content; "today" fixed at 23 Oct 2026 | User chose real images; a fixed date makes every test session the same |
| D39 | New features from the wireframes (progress tracker, suggestions, filters, sticky section menu, code entry and results, onboarding, entry history) and code rules | The user wants the major tasks to work end to end. The reward rule is a placeholder |

Full text: `docs/decisions.md`.

### What the prototype does at this state

- Home logged out (hero carousel, how it works, promotions, brand content) and logged in ("Hi Sam" progress tracker, suggested promotions, your entries).
- Promotions list with search, status and brand filters; ended promotions greyed out and labelled.
- Promotion pages (hero, sticky section menu, steps, prizes, FAQ, terms); ended promotions point to active ones.
- Code entry: log in or register first, code format checks, used codes, entry limits, "Calculating your instant results…", then win, lose or "You're in the draw".
- Accounts: register with validation, magic-link login, Google / Facebook sign-in with onboarding, log out.
- Profile: edit details, entry history, preferences, delete profile.
- Brands menu and pages, FAQ with search, contact form, newsletter sign-up, country picker, mobile menu.

### Placeholders and open questions at this state

- The reward rule ("every 4 entries = bonus draw entry") is made up; the team needs to define it.
- Inter is used instead of Galano Grotesque (no licence).
- Hosting for tests isn't chosen; deploying puts real brand assets on a public URL, so confirm first.
- Not built: the "D/ PROMOTION LANDINGPAGE EU" frames, cookie banner, "terms updated" pop-up, other languages.

### Screenshots in save state 1

Taken from the running dev site with fixed test data (test user "Sam Taylor" for logged-in pages). The same 27 files are in both `desktop-1440/` (1440 px wide) and `mobile-390/` (390 px wide).

| File | Page |
| --- | --- |
| `01-home-logged-out.png` | Home, logged out |
| `02-home-logged-in.png` | Home, logged in, with progress tracker |
| `03-promotions.png` | Promotions list |
| `04-promo-avengers-active.png` | Avengers Doomsday promotion (active) |
| `05-promo-doritos-wrap-active.png` | Doritos & F1 wrap-up promotion (active) |
| `06-promo-las-vegas-ended.png` | Doritos & F1 Las Vegas (ended) |
| `07-promo-terms.png` | Promotion terms |
| `08-participate-logged-out.png` | Enter a code while logged out: sends you to Log in |
| `09-participate-logged-in.png` | Enter a code, logged in |
| `10-result-win.png` | Instant win result |
| `11-result-lose.png` | Lose result |
| `12-result-draw-entry.png` | "You're in the draw" result |
| `13-brands.png` | Brands index |
| `14-brand-doritos.png` | Doritos brand page |
| `15-brand-rockstar.png` | Rockstar brand page |
| `16-brand-pepsi.png` | Pepsi brand page |
| `17-faq.png` | FAQ |
| `18-contact.png` | Contact |
| `19-terms.png` | Site terms |
| `20-privacy.png` | Privacy |
| `21-login.png` | Log in |
| `22-login-check-email.png` | "Check your email" (magic link) |
| `23-register.png` | Register |
| `24-onboarding.png` | Onboarding after social sign-in |
| `25-profile.png` | Profile |
| `26-change-country.png` | Country picker |
| `27-not-found.png` | 404 page |

---

## Changes after save state 1

<!--
Add one entry per prompt, newest at the bottom. Template:

### Change N — <short title> — <YYYY-MM-DD>
- **Prompt (verbatim):** <the user's exact words>
- **What changed:** <pages / components / behaviour, in plain words>
- **Why:** <the user's reason, plus any reasoning Claude added; mark Claude's own suggestions as such>
- **How AI was used:** <what Claude did: read, built, tested; any tools used>
- **Files:** <files changed>
- **Checked by:** <build, screenshots, browser test>
- **Decision record:** <D-number in docs/decisions.md, if any>
-->

### Change 1 — Logged-out home clean-up: hero and merged sections — 2026-10-26

- **Prompt (verbatim):** Just move on, I will start making some iterations, feel free to ask any questions at any time for additional context as needed. The following changes will all be for the purpose of cleaning up the site to a point where I can precisely define all future features/changes. Right now there are just structural issues and sections that should exist. I'm just returning to a state of zero, where I can start working on the major changes from there. Starting on the non-logged in page, the curve on the hero should be accurate the current existing site, not to the wireframe curve. The hero should no longer be a carosel, it should just be the joy rewards register hero. Remove the Walekrs do us a flavor section. In the text section of the Creating Joy with every sip and every bite section, change it to this: "Joy is where you can enjoy all your favourite snacks and beverages in one place with all the classics you love & new flavors waiting to be discovered!" Remove the Joy is where you can enjoy all your favourite snacks and beverages in one place" section. We consoldiated these two sections because the information on them don't seem releveant enough to be two separate sections.
- **Goal of this round:** clean the site back to a "state zero" (fix structural problems, keep only sections that should exist), so later features and changes can be defined precisely.
- **What changed:**
  - **Hero curve:** the bottom curve now matches the live site. The live site cuts the hero with a wide ellipse (`clip-path: ellipse(200% 100% at 50% 0)` on mobile, `ellipse(120% 97% at 50% 0)` from 973 px, `ellipse(98% 97% at 50% 0)` from 1441 px), so the curve meets the page edges at an angle. Before, it was a rounded-corner shape (`border-radius: 50% 90px`) that turned vertical at the edges. On mobile, the extra curve on the hero image was removed too; the live site's mobile image is a plain rectangle.
  - **Hero:** the logged-out home shows only the JOY "Register to participate" hero. No promotion slides and no dots. Screen readers no longer hear it called a carousel.
  - **Removed:** the "Walkers Do Us A Flavour" block and the cyan "Joy is where you can enjoy…" band.
  - **Merged text:** the "Creating Joy with every sip and every bite" subtitle now reads the user's sentence word for word. Claude capped its width at 760 px so the longer sentence wraps onto two lines on desktop instead of running across the full page.
- **Why:** user's reasons: the hero should copy the existing site, not the wireframe; the two text sections didn't have enough relevant information to be separate, so they were consolidated. Claude's additions: the width cap (readability) and dropping the carousel labels for a single slide (accessibility).
- **How AI was used:** Claude measured the live curve in the saved live-site screenshot (`references/live-site/capture/home--desktop.png`, `home--mobile.png`) pixel by pixel, found the matching `clip-path` rules in the saved live CSS, made the edits, then checked them with Playwright screenshots at 375, 1425 and 1920 px. The new curve's drop from edge to centre matches the live site within about 2 px.
- **Files:** `prototype/src/pages/Home.tsx`, `prototype/src/components/promo/HeroCarousel.tsx`, `prototype/src/components/promo/promo.css`, `prototype/src/pages/pages.css`.
- **Side effects:** the curve fix is on the shared hero, so the Promotions page hero and the logged-in home carousel get the live-site curve too. The logged-in home still has the Walkers block and the cyan band (this change was for the logged-out page only).
- **Checked by:** `tsc --noEmit`; browser check that there is 1 slide, no dots, no Walkers block, no cyan band and the new text; screenshots compared with the live captures.
- **Decision record:** D40.
- **Note:** the new text says "flavors" (US spelling), as typed; the rest of the site uses UK spelling ("flavours").

### Change 2 — Register and onboarding forms: red asterisks, "Register with:", no breadcrumbs — 2026-10-26

- **Prompt (verbatim):** On the register screen form, for the required questions, make the asterixes red. Also for the agree to terms section, instead of (required) or (optional), make them use asterixes. This should also apply to the onboarding screen if a user chose facebook/google and they have to accept terms and fill country. Change "Log in with your favourite Social Media." to "Register with: " since social media doesn't necessarily represent google account, also it's not logging in with them, it's registering an account with them.
  Follow-up (same turn): Also remove the breadcrumbs bar for all the onboarding pages, it's unncessary.
- **What changed:**
  - **Red asterisks:** on Register, the `*` after E-mail, Name, Last Name and Country is now red (`--color-feedback-error`). On the social Onboarding step, the `*` after "1. Select country" and "2. Terms & Conditions" is red too.
  - **Consents:** the Terms and Privacy checkbox ends with a red `*` instead of "(required)". The two marketing checkboxes lost "(optional)" and have no mark, so the rule is the same as the fields above: asterisk = required, nothing = optional. Register and Onboarding share this checkbox list, so both changed.
  - **Social heading:** on Register, "Log in with your favourite Social Media." now reads "Register with:". The Login page keeps its own wording.
  - **Breadcrumbs removed** from Login, "Check your inbox", Register and the social Onboarding step.
- **Why:** user's reasons: a red asterisk is the familiar way to show a required field; "Social Media" doesn't fit a Google account, and on this page you register, not log in; breadcrumbs add nothing on these one-step pages. Claude's addition: none.
- **How AI was used:** Claude found the labels and consent text in `Auth.tsx`, added a small `Req` marker (one red `*`) used everywhere a required mark appears, typechecked, and took a headless Chromium screenshot of Register at 1440 px.
- **Files:** `prototype/src/pages/Auth.tsx`, `prototype/src/styles/site.css`.
- **Checked by:** `tsc --noEmit`; screenshot of `/register` (red asterisks, no breadcrumb, new heading, no "(required)/(optional)"). The Onboarding step uses the same `Req` marker and checkbox list but needs a social sign-in to reach, so it wasn't screenshotted.
- **Decision record:** none.
- **Open question:** the Login page still says "Log in with your favourite Social Media." Should it become "Log in with:" for the same reason? Its "E-mail*" asterisk is also still black.

### Change 3 — Login page: "Log in with:" and red asterisk — 2026-10-26

- **Prompt (verbatim):** yes
  (Answer to Claude's open question from Change 2: should Login also say "Log in with:" and use a red asterisk on E-mail?)
- **What changed:** on Login, "Log in with your favourite Social Media." now reads "Log in with:", and the `*` after E-mail is red, the same as on Register.
- **Why:** same reasons as Change 2: "Social Media" doesn't fit a Google account, and every required mark in the sign-in flow should look the same.
- **How AI was used:** Claude made the two edits in `Auth.tsx`, typechecked, and took a headless Chromium screenshot of `/login` at 1440 px.
- **Files:** `prototype/src/pages/Auth.tsx`.
- **Checked by:** `tsc --noEmit`; screenshot of `/login`.
- **Decision record:** none.

### Change 2 — "Creating Joy" text moved down among the packs — 2026-10-26

- **Prompt (verbatim):** Move the [pasted text: "Log in with your favourite Social Media."] and every bite text content section down, just to make the white space feel less awkward
  - The pasted text looks like a clipboard mix-up; Claude read it as the "Creating Joy with every sip and every bite" section.
- **What changed:** on desktop and tablet (768 px and up), the title and text now sit lower among the pack photos instead of above them. Before, there was about 240 px of empty white between the text and the Doritos pack (the live site has about 95 px). Now it's about 100 px at every width up to 1920 px. Mobile is unchanged.
- **Why:** user's reason: the white space looked awkward. It got worse in Change 1, because the longer merged text wraps onto two lines and pushes the text block up against the empty middle of the photo.
- **How it was done:** the pack photo is pulled up under the text by an amount that grows with the screen width (`margin-top: max(calc(100px - 27vw), -420px)`), and the text is drawn on top of it. Claude's additions: the photo ignores clicks, because at wide screens its transparent top overlaps the "See all promotions" button; and the pull stops at the 1920 px amount so ultra-wide screens don't push the packs into the section above.
- **How AI was used:** Claude compared the live capture with the prototype at 992, 1425 and 1920 px in Playwright, made the CSS change, and checked that the button can still be clicked at 992 to 2560 px.
- **Files:** `prototype/src/pages/pages.css`.
- **Checked by:** `tsc --noEmit`; Playwright screenshots at 992 / 1425 / 1920 px; click test on "See all promotions" at 992 / 1425 / 1920 / 2560 px.
- **Decision record:** none (layout fix).

### Change 3 — "Creating Joy" text nudged back up — 2026-10-26

- **Prompt (verbatim):** you moved it slightly too far down, move it back up slightly
- **What changed:** the "Creating Joy" text sits 40 px higher relative to the packs than in Change 2. The gap from the text to the Doritos pack is now about 140 px (Change 2: about 100 px; before Change 2: about 240 px). The cap for very wide screens moved from -420 px to -380 px to match.
- **Why:** user feedback: Change 2 went slightly too far.
- **How AI was used:** Claude changed one CSS value (`margin-top: max(calc(140px - 27vw), -380px)`) and checked it with a Playwright screenshot at 1425 px.
- **Files:** `prototype/src/pages/pages.css`.
- **Checked by:** Playwright screenshot at 1425 px.
- **Decision record:** none.

### Change 4 — Animated dots on the "Signing in..." screen — 2026-10-26

- **Prompt (verbatim):** On the loading screen after signin/login, add animations to the ... to show loading
- **What changed:** on the blue "Signing in..." screen after login or register, the three dots now take turns bouncing up and fading in, one after another, on a 1.2-second loop. People who turn on "reduce motion" on their device see still dots.
- **Why:** user's reason: still dots don't show that something is loading. Claude's addition: the reduce-motion fallback (accessibility), which matches the existing loading-shapes animation.
- **How AI was used:** Claude wrapped each dot in its own element in `SigningIn` and added a CSS keyframe animation with a small delay between dots. Screen readers still hear "Signing in", because the dots are hidden from them. The Playwright browser was busy in another session, so Claude checked the animation on a test page with headless Chromium, taking screenshots at two moments.
- **Files:** `prototype/src/pages/Auth.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc --noEmit`; two headless Chromium frames showing the dots at different heights and fades. Not yet watched live inside the app.
- **Decision record:** none.

### Change 5 — Bigger loading dots — 2026-10-26

- **Prompt (verbatim):** the dots are slightly too small
- **What changed:** the animated dots on the "Signing in..." screen are now 1.5× the text size. Their line height is set to 0, so the bigger dots don't make the card taller.
- **Why:** user's reason: the dots were too small to read as a loading animation.
- **How AI was used:** Claude added one CSS rule and checked two headless Chromium frames on a test page.
- **Files:** `prototype/src/pages/pages.css`.
- **Checked by:** two headless Chromium frames (bigger dots, still animating, card height unchanged).
- **Decision record:** none.

### Change 6 — Logged-in home ends after "Your entries" — 2026-10-26

- **Prompt (verbatim):** On the logged-in home page, remove all the sections between the Your entries section and the stay up to date with... footer
- **What changed:** the logged-in home page now ends with "Your entries". Removed below it: the promotion hero carousel, the "Walkers Do Us A Flavour." block, the "Creating Joy with every sip and every bite" pack photo block, and the cyan "Joy is where you can enjoy…" band. The logged-out home page is unchanged.
- **Why:** user's request.
- **How AI was used:** Claude removed the carousel and the `HomeContent` block from the logged-in branch of `Home.tsx`, then deleted the now-unused `HomeContent` function. Its CSS (`.content-card`, `.cyan-band`) is left in `pages.css` for now; nothing uses it.
- **Files:** `prototype/src/pages/Home.tsx`.
- **Checked by:** `tsc --noEmit`; Playwright full-page screenshot of the logged-in home at 1440 px (sections: progress tracker, Suggested for you, Your entries, then the newsletter footer).
- **Decision record:** none.

### Change 7 — "Home" tab in the navbar, tabs centred on the screen — 2026-10-26

- **Prompt (verbatim):** for the nav bar, add a Home tab to the left of promotions. This is so home is more visible/accessible instead of assuming that peoepl know to clikc the joy icon. Make sure the 3 tabs home,promos,brands are all centered in the screen.
- **What changed:** the navbar now reads Home · Promotions · Brands. Home is underlined only on the home page, not on every page. The three tabs are centred on the screen. Before, they were centred in the space between the logo and the Login/Register (or "Hi Sam") buttons, so they shifted when someone logged in. The mobile menu also gets a Home link at the top.
- **Why:** user's reason: Home should be easy to see and reach, instead of assuming people know the JOY logo goes home. Claude's addition: the Home link in the mobile menu, to keep the two menus the same.
- **How AI was used:** Claude added a `NavLink` with `end` (so it only matches `/`) to `Navbar.tsx`. In the CSS, the tab list is placed at 50% of the navbar and shifted back by half its own width. Then Claude measured the tab centre and the gaps to the logo and buttons at 992, 1200, 1440 and 1920 px, logged in and logged out, with Playwright.
- **Files:** `prototype/src/components/layout/Navbar.tsx`, `prototype/src/components/layout/layout.css`.
- **Checked by:** `tsc --noEmit`. Playwright: the tab centre matches the screen centre within 1 px at every width. The tightest spot is 992 px logged out, where the tabs end 15 px before the Login button (no overlap). Clicking Home goes to `/` and underlines Home. The mobile menu lists Home, Promotions, Brands.
- **Decision record:** none.

### Change 8 — Promotions page: heading above the filters; Brand, Promotion type and Sort — 2026-10-26

- **Prompt (verbatim):** On the promotions page: move active promos heading before the search/filters bar to make the search/filters bar feel more connected to active promos, instead they feel separate. on the search/filters bar, remove the search bar as it is not necessary for the promos to search by name. Remove the 2 active · 4 ended label as unnecessray. I want to be able to filter by Brand and Promotion Type. User should be able to sort by Reccomended, Newest, and Ending Soonest. Was thinking about filtering by entered/not entered? but not sure if necessary?
- **What changed:** under the carousel the page now reads "Active promotions", then a row of three dropdowns: **Brand**, **Promotion type** (Instant win / Prize draw) and, on the right, **Sort by** (Recommended / Newest / Ending soonest). A "Clear filters" link appears while a filter is on. Removed: the search box, the All / Active / Ended buttons, the brand chips and the "2 active · 4 ended" count. The filters only change the active promotions; "These promos are over:" below is unchanged (two shown, then "Load more +"). On phones, Brand and Promotion type sit side by side and Sort by goes underneath.
  - Recommended = the curated order, with promotions you haven't entered yet moved to the top. Newest = latest start date first. Ending soonest = nearest end date first.
  - The Brand and Promotion type lists only offer options that match at least one active promotion (today: JOY, Doritos; Instant win, Prize draw). Promotion type uses the existing `mechanic` field on each promotion.
- **Why:** user's reasons: the filters should feel part of the active promotions; searching by name isn't needed; the count wasn't useful. Claude's additions: the All / Active / Ended buttons were removed because, with the bar under the "Active promotions" heading, "Ended" would have hidden that heading and its own controls. The filters were scoped to active promotions for the same reason. No "Entered / Not entered" filter: there are only two active promotions, the cards already show an "Entered" badge, and Recommended already puts promotions you haven't entered first. Worth asking in testing whether people want it.
- **How AI was used:** Claude rewrote the filter part of `Promotions.tsx` using the site's existing `select.field__input` style, replaced the old search and chip CSS with a small `.listing-tools` layout, and tested it with Playwright.
- **Files:** `prototype/src/pages/Promotions.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc --noEmit`. Playwright at 1440 and 390 px: the dropdowns sit under the heading, lined up with the cards. Ending soonest and Newest both put "Win £100" (ends 25.11, started 27.09) first. Doritos shows one card. Doritos + Instant win shows "No active promotions match". Clear filters resets both filters, and the ended section stays at two cards throughout. No sideways scroll at 390 px.
- **Decision record:** none.

### Change 9 — Promotions page: one "All promotions" list, ended promotions last — 2026-10-26

- **Prompt (verbatim):** Rename the Active Promotions heading to All Promotions. Remove the "These promos are over section" The expired promos should go in the same list as the all promotions, the expried promos should always be at the end. The filter/sort functionality should be the applied/functional.
- **What changed:** the heading now reads "All promotions". The "These promos are over:" section and its "Load more +" button are gone. All six promotions are in one list, and ended ones always come after the active ones. Ended cards still look as before: greyed out, with the red "Ended" label and a "View promo" button. Brand, Promotion type and Sort by now apply to the whole list, ended promotions included. The Brand list now offers JOY, Doritos, Pepsi and Walkers. The empty message reads "No promotions match".
  - Sorting inside each group: **Recommended** shows active promotions in the curated order, with ones you haven't entered first; ended ones follow, most recently ended first. **Newest** puts the latest start date first in both groups. **Ending soonest** puts the nearest end date first among active promotions; ended ones follow, most recently ended first.
- **Why:** user's request. Claude's additions: "Load more" was removed because the full list is only six cards. For ended promotions, "Ending soonest" shows the most recently ended first, since oldest-first would bury the ones people are most likely to look for.
- **How AI was used:** Claude merged the two lists in `Promotions.tsx` into one filtered list that is split into active and ended, sorts each part, and joins them. Then Claude tested every sort and some filter combinations with Playwright.
- **Files:** `prototype/src/pages/Promotions.tsx`.
- **Checked by:** `tsc --noEmit`. Playwright at 1440 px: the only section heading is "All promotions". Ended cards come last under all three sorts. Pepsi shows its two ended promotions. Doritos + Instant win shows the ended Doritos & F1® promotion. Walkers + Prize draw shows "No promotions match". Checked with a full-page screenshot.
- **Decision record:** none.

### Change 10 — Promotions page as a 3-column card grid, same card as the home page — 2026-10-26

- **Prompt (verbatim):** The promo cards on this page should be put into a grid, each row should have 3 cards. Rows on home page should also be 3 cards per row instead of 4, in order to make the info on them more visible, and less cognitively demanding. These cards should be the same as the cards on the home page. Make sure they're linked to the same thing, becuase in the future I will want to edit/iterate on them, and would want changes to be put on both.
- **What changed:** the promotions page now shows its promotions as a grid of small cards instead of the big full-width teasers. It uses the same `PromoCard` component as the logged-in home ("Suggested for you", "Your entries"). The shared grid is now 3 cards per row on desktop, 2 on tablets (under 992 px) and 1 on phones (under 576 px). Before, it fitted as many 250 px cards as possible, which gave 4 per row at 1440 px. "Your entries" on the home page now shows the latest 3 entries instead of 4, so it fills exactly one row. The filter row is now lined up with the grid's edges.
  - On the promotions page, a promotion you've entered gets your latest entry passed to the card, so it shows the same "Entered" / "You won" badge and "View" button as in "Your entries". Ended cards show the red "Ended" badge and a greyed-out image.
  - **One place to edit:** the card is `prototype/src/components/promo/PromoCard.tsx` (styles `.pcard…` in `components/promo/promo.css`). The grid is `.card-grid` in the same CSS file. Changing either updates the home page, the promotions page and the "Try another promotion" row on the result page together.
- **Why:** user's reasons: 3 per row makes the information on each card easier to see and less demanding to scan, and a single shared card means future edits apply everywhere. Claude's additions: "Your entries" was cut to 3 so the row isn't 3 cards plus 1 left over. The result page's "Try another promotion" row also switches to 3 per row, because it uses the same grid.
- **How AI was used:** Claude reused the existing `PromoCard` and `.card-grid` rather than making a new card. The grid rule was changed in one place, and `Promotions.tsx` swapped `PromoTeaser` for `PromoCard`. Claude checked the layout with Playwright.
- **Files:** `prototype/src/pages/Promotions.tsx`, `prototype/src/pages/Home.tsx`, `prototype/src/pages/pages.css`, `prototype/src/components/promo/promo.css`.
- **Checked by:** `tsc --noEmit`. Playwright: the promotions grid has 3 columns at 1440 px, 2 at 900 px and 1 at 390 px, with all 6 cards and no sideways scroll. The filter row and the grid share the same left and right edges (167–1257 px at 1440). The logged-in home grid has 3 columns. Screenshots of both pages at 1440 px and of the promotions page at 390 px. The "Entered" card state on the promotions page wasn't clicked through (the test account had no entries).
- **Decision record:** none.

### Change 11 — All brands page: text matches the rest of the site, visible grid lines — 2026-10-26

- **Prompt (verbatim):** On the all brands page, make sure all the headings/text is consistent with the text on the rest of the site. The line border is also barely visible.
- **What changed:**
  - Brand names in the grid ("Doritos", "Rockstar", …) were 16 px body text. They now use the site's shared `.h3` style (20 px, semibold), the same as other headings inside lists, such as FAQ questions and empty-state titles. They're now real `<h2>` headings, so screen-reader users can jump between brands. Brand names turn JOY blue on hover, like the FAQ questions do.
  - "Our brands", the intro line, and the "No active promotions" counts already used the shared styles (`.h1`, `.page-head p`, 14 px secondary text like the date on promo cards), so they stay the same.
  - The grid lines were `--color-border-default` (`#EDEDED`, about 1.2:1 on white). They now use `--color-text-default` (`#333333`), the same colour as the FAQ accordion lines.
  - Mobile: the darker lines showed that the 2-column grid was about 80 px wider than a 390 px screen and that tiles in a row had different heights. Columns can now shrink (`minmax(0, 1fr)`), mobile tiles drop the square shape so each row lines up, logos get a fixed 96 px height, and tile text is centred.
- **Why:** user's request. Claude's addition: the mobile overflow fix, because the new lines made the broken grid visible.
- **How AI was used:** Claude compared the computed font sizes and weights on the brands page with the FAQ, promotions and home pages using Playwright, then reused existing shared classes instead of adding new type styles.
- **Files:** `prototype/src/pages/Brands.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc -b`. Playwright screenshots of `/brands` at 1440 and 390 px. Desktop: 4 × 2 grid with clearly visible lines; brand names are 20 px/600. Mobile: 2 columns inside the 16 px gutters, no sideways scroll, rows aligned, counts centred.
- **Decision record:** none.

### Change 12 — All brands page: no intro line, no grid lines — 2026-10-26

- **Prompt (verbatim):** Remove the Pick a brand to see its promotions and news. label. remove the table/borders on the brands
- **What changed:** the line "Pick a brand to see its promotions and news." under "Our brands" is gone. The lines around and between the brand tiles are gone (this undoes the darker lines from change 11). Brands now sit on plain white: logo, brand name, and active-promotion count. The layout (4 per row on desktop, 2 on phones), the brand-name style and the hover effects stay as they were.
- **Why:** user's request.
- **How AI was used:** Claude removed the paragraph from `Brands.tsx` and the border rules from `.brands-grid`, then checked the page with Playwright.
- **Files:** `prototype/src/pages/Brands.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc -b`. Playwright screenshots of `/brands` at 1440 and 390 px: no intro line, no borders, rows still evenly spaced, no sideways scroll on mobile.
- **Decision record:** none.

### Change 13 — Promotion pages: prizes first, T&C links under the legal text, live-site hero curve — 2026-10-26

- **Prompt (verbatim):** On all specific promo pages, change the order of the content sections so that it's Prizes first, then Steps, Participate here, FAQ. The Contact (promotion) Terms and conditions (promotion) should go under the [the promotion's legal text, pasted: "UK & ROI, 18+ only. Main Period: 08:00 – 20:00 daily between 20/07/26 – 27/09/26. … Promoter: Walkers Snacks Limited."] text section. Also the curve on the hero needs to be accurate to actual site. These reorderings are made to follow a more logical order for users, and moving the terms/contact higher/more logical placement to promote visibilty.
- **What changed:**
  - Every promotion page now runs: hero → section menu → **Prizes** → **Steps** (with the small legal text under them) → **Contact (promotion)** and **Terms and conditions (promotion)** links → **Participate here** banner → **FAQs**. Before, it was Steps → Participate here → Prizes → FAQs, with the two links at the very bottom.
  - The section menu under the hero follows the same order: Prizes, Steps, FAQs, Terms and conditions.
  - Promotions without steps (the ended Pepsi and Walkers ones) show Prizes, then the two links, then "Check out other promotions" (now with 40 px of space above it).
  - **Hero curve:** the bottom edge of the hero image was a rounded-corner shape (`border-radius: 50% 40px`), which is flat in the middle and drops sharply at the sides. The live site cuts the image with an ellipse instead (`clip-path: ellipse(…)` in its `style.css`, rule `.top-row .hero-image img`). The prototype now uses the same three ellipses and breakpoints: `200% 100%` on phones, `120% 97%` from 973 px (plus a 20 px band-coloured gap under the image, as on the live site) and `98% 97%` from 1441 px.
- **Why:** user's reasons: prizes before steps is a more logical reading order, and the contact and T&C links are easier to find right under the legal text than at the bottom of the page. The curve was copied from the live site's CSS rather than estimated.
- **How AI was used:** Claude reordered the sections in `PromoDetail.tsx`, then searched the captured live-site CSS (`references/live-site/css/`) for how the hero curve is drawn, found the `clip-path` ellipses, and confirmed them by tracing the curve's edge pixel by pixel in the live-site screenshots before copying them.
- **Files:** `prototype/src/pages/PromoDetail.tsx`, `prototype/src/components/promo/promo.css`.
- **Checked by:** `tsc -b`. Headless Chromium (the shared Playwright browser was in use by another session) on Avengers Doomsday, Doritos & F1® and an ended Pepsi promotion at 1920, 1440, 1425, 390 and 375 px: the section order and menu order are as above at every width, with no sideways scroll. The hero curve traced from the prototype matches the live capture exactly at 1920 px (edge 477 px → centre 554 px below the image top) and within 3 px at 1425 px (curve depth 37 px vs 38 px live).
- **Decision record:** none.

### Change 14 — Participate page: one centred column, footer below the fold — 2026-10-26

- **Prompt (verbatim):** On the participate screens, I want to change the layout of the page so that it's one main screen, not two side by side. I still want some info at the top to show the user what promo they're participating on, but the form should be centered on the screen. Also this section's height should be taller so that the footer isn't taking up so much of the page, footer shouldn't be visible until you scroll down to it.
  - Follow-up (verbatim): same for the loading screen, it should follow this new format
- **What changed:**
  - Before, the page had two halves: the promotion's logo, a big round image, the title and dates on the left in the brand colour, and the form on the right on grey. Now it's one grey section with a single column in the middle, 560 px wide.
  - At the top of the column there is a small strip in the promotion's colour with a small round image, "You're entering", the promotion title and its dates. The entry form card sits under it. The brand logo is no longer shown, because the round image already includes it.
  - The loading screen ("Calculating your instant results…" / "Submitting your entry…") and the "You've already entered" message use the same layout: same strip on top, card centred under it.
  - The section is now at least the height of the screen minus the navbar, so with the breadcrumb above it the footer always starts below the fold. On desktop the column is centred vertically. On phones it starts at the top, with 16 px side gutters.
- **Why:** user's request: one focused screen with the form centred, and the footer kept out of view while entering a code. Claude's addition: the promo strip uses the promotion's colour, which follows the rule that brand colour only fills promotion surfaces.
- **How AI was used:** Claude replaced the two-column grid in `Participate.tsx` and `pages.css` with one column and a new `.participate__promo` strip. It checked the form, loading and mobile layouts with Playwright, and caught and fixed a style rule that had stretched the calendar icon.
- **Files:** `prototype/src/pages/Participate.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc -b`. Playwright at 1440 × 900: the form, and after submitting a code the loading screen, both centred, with the footer starting at 941 px (below the 900 px screen). At 390 × 844 on a Doritos promotion: red strip, form fits the gutters, no sideways scroll, footer starts at 907 px (below the 844 px screen).
- **Decision record:** none.

### Change 15 — Result page: no "Try another promotion" section — 2026-10-26

- **Prompt (verbatim):** on the promo results page, remove the Try another promotion section
- **What changed:** the "Try another promotion" heading and the grid of promotion cards under the result card are gone. The result page now ends with the result card ("Return to homepage" and "See all my entries"), then the footer. This applies to all three outcomes (win, no win, entered into the draw).
- **Why:** user's request.
- **How AI was used:** Claude removed the section from `Result.tsx`, along with the code that picked which promotions to show and its now-unused imports, and deleted the two `.result__next` style rules from `pages.css`.
- **Files:** `prototype/src/pages/Result.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc -b`. Playwright at 1440 × 900 on a "Not this time" result for Avengers Doomsday: the result card shows as before, no "Try another promotion" text or card grid, and the footer follows the card's grey section.
- **Decision record:** none.

### Capture — Pre-visual exploration screenshots (no code change) — 2026-10-26

- **Prompt (verbatim):** document/screenshot all pages of the current dev site. This is pre-visual exploration.
- **What changed:** no prototype code changed. Full-page screenshots of every page (28 pages and states) at 1440 and 390 px, and a page inventory, are in `docs/pre-visual-exploration/`. It is the "before" record for the visual exploration, at commit `08834c2` (after change 15).
- **Why:** user's request, so the visual exploration has a documented starting point.
- **How AI was used:** Claude wrote a Playwright script that opens each page with its own test data and takes full-page shots, read each page's sections from the DOM, checked the screenshots, and wrote the inventory, including visual inconsistencies it noticed (two promotion styles, mixed heading styles, several button styles).
- **Files:** `docs/pre-visual-exploration/README.md`, `docs/pre-visual-exploration/screenshots/`.
- **Checked by:** capture log of final URL and heading for every shot; sample screenshots opened and checked.
- **Decision record:** none.

### Change 16 — Navbar and profile tabs: underlined text instead of an indicator bar — 2026-10-26

- **Prompt (verbatim):** On the nav menu, the hover on the tabs and the active tabs should be an underline on the text, instead of the indicator at the bottom. the active tab should also be bold. This should also apply to the profile page.
- **What changed:**
  - Navbar (desktop): the white 5 px bar along the bottom of the navbar is gone. Hovering a link (Home, Promotions, Brands) now underlines its text (2 px, 6 px below the text). The current page's link is underlined and bold (700 instead of 600). Brands also counts as current while its dropdown is open, as before.
  - Profile page tabs (My details, My entries, Settings): the pale blue background on the open tab and the grey background on hover are gone. Hovering a tab underlines its text. The open tab is underlined, bold and JOY blue. The icons are not underlined. With no background, the tabs no longer have side padding, so they line up with the heading above them.
  - Profile tabs on phones: they sit in a row with 24 px between them and wrap onto a second line when there isn't room (at 390 px, Settings goes on the second line), instead of being cut off.
- **Why:** user's request. Claude's addition: the phone wrapping. The three tabs are 337 px wide without gaps, wider than the 343 px row once gaps are added, so with no wrapping Settings was cut off at the edge.
- **How AI was used:** Claude replaced the `::after` bar in `layout.css` and the background highlights in `pages.css` with `text-decoration` rules, then checked the result in headless Chromium. The shared Playwright browser was in use by another session, and the app now uses hash URLs (`/#/profile`), which the screenshot script had to allow for.
- **Files:** `prototype/src/components/layout/layout.css`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc -b`. Headless Chromium at 1440 × 900: on Promotions, the hovered Home link and the current Promotions link are both underlined and Promotions is bold. On the profile page, the open "My details" tab is underlined, bold and blue, and the hovered "My entries" tab is underlined. At 390 × 844: the tabs wrap onto two lines and the page is 390 px wide (no sideways scroll).
- **Decision record:** none.

### Change 17 — Design config menu (C) with 5 home hero and 5 promotion card variants — 2026-10-26

- **Prompt (verbatim):** I want a config menu that opens with the hotkey 'c'. I want you to create 5 variants for the home hero that is more visually compelling, but keeps with the joy theme/branding, highlights the progress bar. I also want you to create 5 variants for the promo cards (grids/home page ones, not the wide ones). These should prioritize info heirarchy, keep joy theme, and also more visually impressive.
  - Follow-up (verbatim): The home heros should be taller than the current one as well.
- **What changed:**
  - **Design config menu.** Press **C** (or add `?config` to the URL) to open a small dark panel at the bottom left; press C or Esc to close it. It is ignored while typing in a field and when Ctrl, Shift, Alt or Cmd is held (so Ctrl + C still copies). It has two lists, "Home hero" and "Promotion cards", each with "Original" plus five variants and a one-line note. The choice is saved in this browser only (`joy-prototype-design`), separate from the test data, so "Reset all data" doesn't clear it. Buttons log in the test user with 0–4 entries, to see every progress state, and jump to Home or Promotions. Original is the default, so test sessions look the same as before unless a moderator picks a variant.
  - **Home hero variants** (logged-in home, replacing the progress tracker band). All are 600 px or taller on desktop (the original is about 335 px), use the JOY brand sheet colours (blue, dark blue, sky, green, purple, orange) and the live site's yellow, and the JOY plus-sign, dot-grid and ring shapes. Each has a yellow "Find a promotion" button that scrolls down to "Suggested for you".
    - **A · Reward ring:** greeting on the left; on the right a 400 px ring split into 4 parts that fill in yellow, with a gift and "3/4 entries" in the middle.
    - **B · Stamp card:** a slightly tilted white loyalty card with 4 stamp slots. Each entry "stamps" a slot (purple, orange, sky); the last slot is the gift. Shows which card you're on.
    - **C · Big track:** a large headline ("1 entry to your next reward") over a full-width, 32 px bar with moving stripes (sky to green to yellow), checkmarks at each entry, a "3 / 4" bubble and a big purple gift at the end.
    - **D · Bento dashboard:** a blue card with the greeting and a bar of 4 chunky segments, next to tiles for total entries (sky), prizes won (green) and the next reward (dark blue).
    - **E · Fill the can:** a drink can with the JOY logo that fills with liquid (with a moving wave and bubbles) as entries are made, with Entry 1–3 and Reward marks beside it.
    - Fill, stamp and bar animations play once when the page loads, and are switched off for people who ask for reduced motion. When a reward is unlocked (4, 8 … entries) every variant shows the full state.
  - **Promotion card variants** (home "Suggested for you" and "Your entries", and the Promotions grid; the wide teaser cards are unchanged). Each card shows, in this order: what the promotion is (brand, title), what you can win (or what you got, on entry cards), how long is left, and the action. Each adds information the original card didn't show: the top prize, instant win or prize draw, and days left. The whole card is now clickable (one link stretched over the card). Ended promotions are grey, as before.
    - **A · Poster:** the whole card in the brand colour, with the round art, a "Win: …" prize panel, days left and the promotion's own button colour.
    - **B · Ticket:** a ticket with a torn-off stub: art, title, a top-prize row with the prize picture, and on the stub a big "69 days left" with the button.
    - **C · Time bar:** the title sits on the brand-colour art; below, top prize, instant win or draw, and a bar showing how much of the promotion has passed between its start and end dates.
    - **D · Prize first:** the top prize picture on a brand-colour sunburst leads; the campaign art is a small circle in the corner. Chips for days left and instant win or draw. On a won entry it shows the prize won.
    - **E · Offset:** white card with a dark-blue outline and a solid shadow in the brand colour, the brand as a tag on the art, and a list of facts (prize, instant win or draw, days left and end date).
- **Why:** user's request, for the visual exploration. Claude's additions: "Original" kept as the default option so usability sessions aren't changed by accident; the 0–4 entries buttons, so every progress state can be compared; days under 15 shown in orange as "ending soon".
- **How AI was used:** Claude read the current tracker, card, tokens and the JOY brand sheet colours in `CLAUDE.md`, then wrote the menu, the variant components and their styles. It checked every variant with Playwright at 1440 and 390 px, and fixed what it saw: dot grids behind the heading text, a decoration behind "Hi Sam", an empty stretched prize panel on Poster, the end date shown twice on ended Time bar cards, the title running into the art on Time bar, and Prize first showing the top prize instead of the prize actually won.
- **Files:** new `prototype/src/state/design.tsx`, `prototype/src/moderator/ConfigPanel.tsx`, `prototype/src/components/promo/HeroVariants.tsx`, `hero-variants.css`, `CardVariants.tsx`, `card-variants.css`; changed `prototype/src/main.tsx`, `App.tsx`, `components/promo/ProgressTracker.tsx`, `components/promo/PromoCard.tsx`, `moderator/moderator.css`.
- **Checked by:** `tsc -b`. Playwright at 1440 × 900: each hero is 600–713 px tall; each card variant on the home page with 3 entries (2 suggested, 3 ended entries including a win). At 390 × 844: every hero and every card on Promotions fits with no sideways scroll. Menu: C opens it, C closes it, Ctrl + C doesn't; picking "C · Big track" and "B · Ticket" then "4 entries" showed the track hero in its unlocked state and 5 ticket cards.
- **Decision record:** none yet. The team picks a hero and a card after comparing them; the colours used are the JOY brand sheet colours, but the new combinations (sky, green and purple tiles, the sunburst) are design choices to review, not brand rules.

### Change 18 — Big track hero and Poster cards are the default; no button on Big track — 2026-10-26

- **Prompt (verbatim):** set the big track and poster to be default, on the big track hero, remove the find promo button
- **What changed:**
  - The logged-in home now shows the **C · Big track** hero, and the promotion cards on the home and Promotions pages are **A · Poster**, unless someone picks something else in the design config menu (C). "Original" is still in the menu for both, now described as "Previous …", and the two defaults are marked "Default." in their notes.
  - The yellow "Find a promotion" button is gone from the Big track hero. It now ends with the line "Every 4 entries earns a bonus entry into the JOY monthly prize draw." The hero stays 600 px tall on desktop. The other four hero variants keep their button.
  - The saved menu choice moved to a new browser storage key (`joy-prototype-design-v2`). Every browser that opened the prototype after change 17 had already saved "Original" for both, so without the new key those browsers would have kept showing the old design. Choices made in the menu before this change are reset once.
- **Why:** user's request. Claude's addition: the new storage key, so the new defaults actually show up on machines that already ran the prototype.
- **How AI was used:** Claude changed the defaults and storage key in `design.tsx`, removed the button and its now-unused footer styles from the Big track hero, and checked the home page with Playwright.
- **Files:** `prototype/src/state/design.tsx`, `prototype/src/components/promo/HeroVariants.tsx`, `prototype/src/components/promo/hero-variants.css`.
- **Checked by:** `tsc -b`. Playwright with the saved choice cleared and the test user at 3 entries: at 1440 × 900 the home shows the Big track hero (600 px tall, no buttons in it) and 5 Poster cards; at 390 × 844 the hero fits with no sideways scroll.
- **Decision record:** none.

### Change 19 — "Hi Sam" profile button: hover and active states — 2026-10-26

- **Prompt (verbatim):** On the hi same/profile button on the nav bar, add hover and active state
- **What changed:**
  - Hover: the "Hi Sam" text is underlined (2 px, 6 px below the text), the same as the Home, Promotions and Brands links since change 16. The person icon and arrow are not underlined.
  - Active: on the profile page (`/profile`), or while its dropdown menu is open, the text is underlined and bold (700 instead of 400). This matches how Brands counts as active while its menu is open.
  - The small arrow turns upside down while the menu is open, as the Brands arrow does.
- **Why:** user's request. Claude matched the existing navbar link styles so the whole bar behaves the same way. The flipping arrow was Claude's addition, copied from Brands.
- **How AI was used:** Claude added an `active` class in `Navbar.tsx` (on the profile route or with the menu open) and the hover/active rules in `layout.css`, then checked them in the browser with Playwright.
- **Files:** `prototype/src/components/layout/Navbar.tsx`, `prototype/src/components/layout/layout.css`.
- **Checked by:** `tsc -b`. Playwright at 1440 × 900 with the test user logged in, reading the computed styles: on Home with no hover, not underlined, weight 400. On hover, underlined. On `/profile`, underlined and 700. On Promotions with the menu open, underlined and 700, and the arrow is flipped. Screenshots of the hover and profile states checked.
- **Decision record:** none.

### Change 19 — Brands page: brand cards with each brand's own art — 2026-10-26

- **Prompt (verbatim):** on the all brands page, make visually better
- **What changed:**
  - The Brands page (`/brands`) was a plain grid of logos floating on white. Each brand is now a white card with rounded corners (20 px) and a soft shadow. The top of the card is the brand's own hero art from the live site (the phone crop already in `public/images/brands/`), and a 4 px line in the brand's band colour (the same colour as the "Welcome" band on its brand page) separates the art from the text.
  - Under the art: the brand name (bold) and its status. A brand with running promotions shows the green design-system "Active" badge ("1 active promotion"); the others say "No active promotions" in grey. A blue arrow sits on the right.
  - Hover (like the Poster promotion cards): the card lifts 6 px, its shadow takes the brand colour, the art zooms in slightly, the name turns JOY blue and the arrow moves right. Keyboard focus shows a dark outline. Movement is switched off for people who ask for reduced motion.
  - A short line under the heading: "Pick a brand to see its promotions and latest news."
  - Layout: 4 cards per row on desktop, 2 on tablets and phones. On phones the arrow is hidden and the badge reads "1 active" (screen readers still hear "1 active promotion").
  - The cards are now a list (`ul`/`li`), so screen readers announce "list, 8 items".
- **Why:** user's request. The live site's own hero art makes each brand recognisable at a glance and reuses real assets instead of new artwork. Claude's additions: Rockstar's art is a tall photo, so it is cropped lower (new optional `coverPosition` in `brands.ts`) to show the can and logo instead of cut-off headline text; Quaker and Popworks art end in a transparent curve, so the space under the curve is filled with the brand colour (otherwise a white gap showed above the colour line).
- **How AI was used:** Claude looked at the old page and a contact sheet of all 8 brand hero images, rewrote the Brands index markup and styles, and checked it with Playwright at 1440 and 390 px. It fixed what the first screenshots showed: the Rockstar crop, the white gap under the Quaker and Popworks curve, the badge wrapping onto two lines on phones and the intro line touching the screen edges.
- **Files:** `prototype/src/pages/Brands.tsx`, `prototype/src/pages/pages.css`, `prototype/src/data/brands.ts`.
- **Checked by:** `tsc -b`. Playwright at 1440 × 900 (4 × 2 grid, Doritos shows the Active badge) and 390 × 844 (2 columns, badge on one line, page 390 px wide with no sideways scroll).
- **Decision record:** none.

### Change 20 — Undo change 19 (brand cards) — 2026-10-26

- **Prompt (verbatim):** undo, I dont want cards
- **What changed:** the Brands page is back to how it was before change 19: the plain grid of brand logos with the name and active promotion count under each, and no intro line. The optional `coverPosition` field is removed from `brands.ts`.
- **Why:** user's request; they don't want cards on this page.
- **How AI was used:** Claude restored the three files from the commit before change 19 (`git checkout 3a3d11f~1 -- …`). The change 19 log entry stays, so the history shows what was tried.
- **Files:** `prototype/src/pages/Brands.tsx`, `prototype/src/pages/pages.css`, `prototype/src/data/brands.ts`.
- **Checked by:** `tsc -b`; `git diff 3a3d11f~1 -- prototype/src` is empty.
- **Decision record:** none.

### Change 21 — Brand page: "Promos from other brands" carousel instead of ended promotions — 2026-10-26

- **Prompt (verbatim):** On the individual brands page, instead of ended promos, make it a Promos from other Brands carosel with cards of the other active promos
- **What changed:**
  - The "Ended promotions" section at the bottom of each brand page (`/brands/:slug`) is gone. In its place, after "Want to know more about …?", is **"Promos from other brands"**: a sideways-scrolling row of every active promotion from the other brands.
  - The cards are the same promotion cards as the home and Promotions pages, so they follow the design config menu (C); by default that is A · Poster. If the logged-in user has entered one, the card shows it (Entered, You won), as on the Promotions page.
  - Same card widths as the card grids: 3 in view on desktop, 2 on tablets. On phones a card is 85% wide so the next one peeks in, which shows people they can swipe. Cards snap into place when scrolling.
  - Two round blue arrows (the live site's `round-arrow` style) sit next to the heading and move one card at a time. They only show when there are more cards than fit, and each greys out at its end.
  - The old "Check out other brand promotions:" list, which only showed on brands with no active promotion, is removed too, because the carousel now covers it on every brand page.
- **Why:** user's request. Claude's additions: removing the duplicate "Check out other brand promotions" list; arrows that hide when there's nothing to scroll; the peeking card on phones; extra space inside the row so card shadows and the hover lift aren't cut off.
- **Note for testing:** the prototype data has only 2 active promotions (JOY Avengers and Doritos Las Vegas Wrap). So a brand page shows 1 or 2 cards, and on desktop the arrows never appear. On phones, brands with 2 other promotions (Pepsi, Walkers and the others) scroll. Adding more fake active promotions would make it look fuller.
- **How AI was used:** Claude read the brand page, the card component and the existing carousel dots and arrows, then wrote a new `PromoCarousel` component and its styles. It checked the pages in a headless Chromium (the Playwright MCP browser was in use by another session).
- **Files:** new `prototype/src/components/promo/PromoCarousel.tsx`; changed `prototype/src/pages/Brands.tsx`, `prototype/src/components/promo/promo.css`.
- **Checked by:** `tsc -b`. Headless Chromium at 1440 × 900: Pepsi shows 2 cards (347 px each, same as the card grid) and Doritos shows 1, with no arrows and no ended section. At 390 × 844: Pepsi's row scrolls (659 px of content in 390), the arrows show, and "Next" moves it 269 px to the second card; Doritos shows 1 card with no arrows; the page is 390 px wide with no sideways scroll. Screenshots checked.
- **Decision record:** none.

### Change 20 — Promotion pages: visual redesign — 2026-10-26

- **Prompt (verbatim):** For the individual promo pages, redesign visually since the structure of the sections have been changed, try not to change too much of content, keep joy branding/style.
- **What changed:** same sections in the same order as change 13 (hero, section menu, prizes, steps, legal text and links, participate banner, FAQs), with the same copy. The layout and styling are new. JOY blue still marks actions and links, and the promotion colour still fills only promotion surfaces.
  - **Hero band:** the title, subtitle, "Participate here" button, account note and share links are now left-aligned. On the right, a white "at a glance" card lists **Time left** ("Ends in 69 days", with a bar showing how much of the promotion has passed and its start and end dates), **How you win** (instant win or prize draw, and the draw prize), **How often** (1 entry per week / per day / per person) and **Open to** (flags, "UK and Ireland, 18+"). These facts restate what was already in the dates, legal text and FAQs. The date line above the title moved into this card. On phones the card sits under the button.
  - **Ended promotions:** the whole hero (behind the curved art, the band and the card icons) turns neutral grey (#5E5E66, the same grey as ended promotion cards), and the card says "Dates · Ended". "Check out other promotions" now uses the standard promotion cards (Poster by default) instead of the wide teasers.
  - **Section menu:** pill tabs on a light grey track in sentence case. The section you're reading is filled JOY blue. The menu still sticks under the navbar with a "Participate here" button.
  - **Prizes:** the first prize is shown large in a spotlight panel ("Top prize", or "The prize" when there's only one), with an "Instant win" or "Prize draw" tag where the data says so. The other prizes are listed under "More prizes" in a 3-column grid, each with an "Instant win" tag where it applies. The 3-at-a-time carousel with arrows is gone, so every prize is visible at once.
  - **Steps:** the large brand circles are replaced by a numbered track. Each step has a number in the promotion colour, a dashed line to the next step, the pack art on a pale tint of the promotion colour, and the step text. On phones the track runs downwards.
  - **Legal text and links:** the legal text and the "Contact (promotion)" and "Terms and conditions (promotion)" links sit together in one light grey panel, with the links right under the text.
  - **Participate banner:** the same art and button, lined up with the content width.
  - **FAQs:** the heading, a short line ("Can't find your answer here? All FAQs cover your account, codes and prizes.") and an outline "Go to all FAQs" button are on the left and stay in view while scrolling. The questions are on the right as separate rounded boxes, and the open one has a blue outline. On phones they stack. The FAQ page itself is unchanged.
- **Why:** user's request: the sections were reordered in change 13 but still used the old live-site styling (big circles, a carousel, centred text everywhere). Claude's additions: the at-a-glance card, so the key rules (time left, how you win, entry limit, who can enter) don't have to be dug out of the legal text; prize tags only where the data supports them; the grey ended hero, following the research finding that ended promotions look like active ones. New copy is limited to the fact labels and the one FAQ line.
- **How AI was used:** Claude read the existing promotion page, its sections and the data, then rewrote the hero, prizes, steps and terms in `PromoSections.tsx` and `PromoDetail.tsx`, with the new styles in a new `promo-page.css`. It checked Avengers Doomsday, Doritos & F1 (wrap-up), Las Vegas (ended), Pepsi Music, Walkers GDK and Pepsi EA with Playwright at 1440 and 390 px. It fixed what the screenshots showed: the phone header art squashed (a rule removed by mistake was restored), a muddy red-grey ended band, a pink icon tint left on ended pages, and an empty half panel when there's only one prize (now a narrower, centred panel).
- **Files:** `prototype/src/pages/PromoDetail.tsx`, `prototype/src/components/promo/PromoSections.tsx`, new `prototype/src/components/promo/promo-page.css`, `prototype/src/components/promo/promo.css` (old hero band, section menu, prize band and FAQ rules removed; the home page's step circles are kept).
- **Checked by:** `tsc -b`. Playwright full-page screenshots of 6 promotions at 1440 and 390 px: no sideways scroll at either width (page width 1440 / 390). Scrolled screenshot: the section menu sticks under the navbar and highlights the current section.
- **Decision record:** none.

### Change 22 — "Promos from other brands": centred heading, wide teaser cards — 2026-10-26

- **Prompt (verbatim):** the promos from other brands heading should be centered, adn the card for the promo should be the wide variant
- **What changed:**
  - The heading "Promos from other brands" is centred, in the same style as the other section titles on the page ("Active promotions", "Latest Brand news").
  - Each slide is now the wide live-site promotion teaser (brand-colour card with the logo, dates, title, "Go to promo", share links and the big round image) instead of the small Poster card. It's the same teaser as under "Active promotions", so the two sections match. One teaser fills each slide, and it snaps into place when swiped.
  - Because the heading is centred, the arrows moved from beside the heading to below the slides: a round arrow on each side of the live-site carousel dots (grey dots, blue pill for the current slide). The dots follow the slide shown, whether it was reached by arrow, dot or swipe. With only one other promotion (e.g. on Doritos), there are no arrows or dots.
- **Why:** user's request. "Wide variant" was read as the wide teaser the page already uses, since the card design menu has no wide card. Claude's addition: arrows and dots underneath, because a centred heading leaves no place for arrows beside it.
- **How AI was used:** Claude rewrote `PromoCarousel` to show `PromoTeaser` slides and replaced its styles, then checked it in a headless Chromium.
- **Files:** `prototype/src/components/promo/PromoCarousel.tsx`, `prototype/src/components/promo/promo.css`.
- **Checked by:** `tsc -b`. Headless Chromium at 1440 × 900 and 390 × 844: heading centred; Pepsi shows 2 slides, and "Next" moves to the second one (scroll 1440 px or 390 px), lights the second dot and disables "Next"; scrolling back lights the first dot again. Doritos shows 1 slide with no controls. No sideways page scroll at either width. Screenshots checked.
- **Decision record:** none.

### Change 21 — Undo the promotion page redesign except FAQs and terms; brand-themed navbar, breadcrumb, newsletter and footer (experiment) — 2026-10-26

- **Prompt (verbatim):** undo those changes, keep the changes to the faq and the terms section. I want you to experiment with adapting the global elements like nav bars/footer with the brand theme as well
- **What changed:**
  - **Promotion pages:** change 20 is undone, except two parts. The hero band, section menu, prize band, steps and "Check out other promotions" are back to how they were after change 19. Kept from change 20: the legal text with the contact and T&C links in one light grey panel under the steps, and the two-column FAQs (heading, short line and "Go to all FAQs" on the left; questions as rounded boxes on the right).
  - **New in the design config menu (C): "Navbar and footer theme".** It applies on promotion pages (including participate, result and promotion T&Cs) and brand pages (`/brands/doritos` etc.). Other pages stay JOY blue. The brand colour is the promotion's hero colour, or the brand's "Welcome" band colour on brand pages.
    - **JOY blue:** the live site, unchanged.
    - **A · Brand colour (default):** the navbar, phone menu and footer are in the brand colour, with the breadcrumb and newsletter in a second shade of it. The newsletter band shows the brand's own shapes (Doritos triangles, Lipton dashes) instead of the JOY ones, or none if the brand has none.
    - **B · Brand top:** only the navbar and breadcrumb take the brand colour; the newsletter and footer stay JOY blue.
    - **C · Brand accent:** the navbar and footer stay JOY blue, with a 6 px brand stripe under the navbar and 8 px above the footer, and the breadcrumb in the brand colour.
    - In all three, a white chip with the brand logo sits next to the JOY logo ("JOY × Doritos") and links to the brand page. Multi-brand JOY promotions (Avengers) have no chip.
    - **Contrast:** text on each bar is white, or black where white fails 4.5:1 (7UP green, Lipton yellow). On those light brands the JOY logo turns black. The second shade is the brand colour with 22% black, or with 40% white on light brands, so yellow doesn't turn olive.
- **Why:** user's request, as an experiment. It departs from D36 (buttons, links and navigation stay JOY blue on every page), so "JOY blue" stays in the menu as the live-site option. Claude's additions: the co-brand logo chip, so the themed bars still say whose page it is; the automatic black text and logo on light brands; brand shapes in the newsletter.
- **How AI was used:** Claude restored `PromoDetail.tsx`, `PromoSections.tsx` and `promo.css` from before change 20 and re-applied only the terms and FAQ parts. It added a hook (`state/chrome.ts`) that works out the brand colour from the page address and picks readable text colours. The menu option lives in `design.tsx` and `ConfigPanel.tsx`, the layout sets the colours as CSS variables, and the variant styles are in `layout.css`. It checked all three variants with Playwright on Doritos, Pepsi Music, 7UP and Lipton pages at 1440 px. It fixed what the screenshots showed (dark text and bars on 7UP green). The last fix (lighter second shade and a black JOY logo on light brands, from the Lipton screenshot) was not screenshotted again: the run was stopped because the computer ran low on memory.
- **Files:** `prototype/src/pages/PromoDetail.tsx`, `prototype/src/components/promo/PromoSections.tsx`, `prototype/src/components/promo/promo.css` (change 20's `promo-page.css` deleted); new `prototype/src/state/chrome.ts`; changed `prototype/src/state/design.tsx`, `prototype/src/moderator/ConfigPanel.tsx`, `prototype/src/App.tsx`, `prototype/src/components/layout/Navbar.tsx`, `Footer.tsx`, `layout.css`.
- **Checked by:** `tsc -b`. Playwright full-page screenshots at 1440 px: Doritos & F1 and Pepsi Music with A, B and C, plus 7UP and Lipton brand pages. No sideways scroll on any of them.
- **Open:** the second shades are DERIVED and need approval. On light brands with A, the footer's JOY ribbon logo has white letters that are hard to read on yellow or green. Not yet checked at 390 px or with the light-brand fix.
- **Decision record:** none yet. Keeping a brand-themed navbar would replace D36.

### Change 24 — Brand-specific loading animation while results are calculated — 2026-10-27

- **Prompt (verbatim):** In the loading screen waiting from promo results, change the loading animation to a brand specific loading animation. (e.g. filling up soda for pepsi, or dumping a bag of chips for doritos) just examples, go with what makes the most sense.
- **What changed:** the four bouncing shapes on the "Calculating your instant results…" / "Submitting your entry…" panel are replaced by a short drawn animation for the promotion's brand. Each plays once in about 2.4 s and ends on its last frame just as the result page opens (at 2.6 s).
  - **Pepsi:** a soda fountain pours cola into a glass with a JOY blue outline; bubbles rise and a foam head settles at the top.
  - **Doritos:** a red Doritos-style bag wiggles, tips over and shakes out orange triangle chips, which land in a pile.
  - **Walkers:** a red crisp packet with a yellow badge puffs up, the top pops off and round crisps fly out in arcs on both sides.
  - **JOY and any other brand:** a JOY blue prize box with a yellow-green ribbon shakes, the lid pops up and confetti in the JOY palette bursts out. Avengers Doomsday (a multi-brand JOY promotion) uses this one.
  - With "reduce motion" switched on, the finished picture shows straight away, with no animation.
- **Why:** user's request. Pepsi and Doritos follow the user's examples. Walkers is also crisps, so it gets a different idea (a packet popping open) to stay distinct from Doritos. JOY gets a prize box because JOY is about rewards, and it's the fallback, so a new brand never shows a blank panel.
- **How AI was used:** Claude wrote a `BrandLoader` component with one inline SVG per brand and CSS keyframes. Flying chips, crisps and confetti share one helper that moves sideways at a steady speed while rising then falling, which draws an arc. Brand colours come from `data/promos.ts`, `data/brands.ts` and the JOY and Doritos brand sheets (Doritos red `#E31722`, orange `#FA7115`, dark `#030303`; Walkers red `#C4000A` and yellow `#FFE600`; JOY blue, purple, sky, green and orange). The cola, foam and crisp colours are only for the drawings and are not brand values.
- **Files:** new `prototype/src/components/promo/BrandLoader.tsx` and `brand-loader.css`; `prototype/src/pages/Participate.tsx` (uses `BrandLoader`); `prototype/src/pages/pages.css` (old `.loading-shapes` rules removed).
- **Checked by:** `tsc -b` and `npm run build`. Playwright: all four animations paused at 200, 700, 1100, 1500, 1900 and 2400 ms and screenshotted side by side. One fix came from this: the Walkers packet top came apart from the body during the puff, so the top now sits inside the packet group. The Doritos animation was also checked inside the real loading panel (Doritos & F1 promotion, 1500 ms). Every Pepsi and Walkers promotion has ended, so testers can only reach the Doritos and JOY animations right now.
- **Decision record:** none.

### Change 23 — Motion pass: page transitions, menus, accordion, carousel and hover states — 2026-10-27

- **Prompt (verbatim):** do a full page transition/animation/interaction pass over the site, make sure everything feels smooth, not jagged/instant.
- **What changed:**
  - **Shared motion values** in `site.css`: one easing (fast start, soft landing) and three speeds (0.15 s for hover colours, 0.25 s for menus and underlines, 0.4 s for pages and panels), so everything moves the same way. There are no motion tokens yet, so these live with the other site values.
  - **Page changes:** each new page fades up slightly instead of appearing all at once. Changing page now jumps to the top. Before, smooth scrolling made the new page glide up from wherever you had scrolled to on the old page, which looked jerky.
  - **Navbar:** the Brands dropdown, the user menu ("Hi Sam") and the phone menu fade and slide in and out instead of popping. The brand logos and phone menu items follow one after another. The menu and close icons turn into each other, and the chevrons rotate smoothly. Link underlines (navbar, footer, breadcrumb, profile tabs, "All brands") fade in on hover. On brand-themed pages, the navbar, newsletter and footer colours blend over when you move between pages.
  - **Hero carousel (home, promotions):** the chosen slide fades in on top of the last one, with no white flash between brand colours. Its text rises in line by line and the photo settles from a slight zoom. On phones, all slides now take the height of the tallest one, so the dots no longer jump.
  - **FAQ accordion (promotion pages and the FAQ page):** answers slide open and closed smoothly instead of appearing. The text fades in, and the boxes on promotion pages get a light blue border on hover.
  - **Prizes:** the next or previous prizes slide in from the side you clicked, one after another.
  - **Section menu:** shrinks smoothly when it sticks, and the "Participate here" button slides in. The underline on the current section fades between links.
  - **Cards and lists:** promotion cards rise in one after another, including after a filter or sort change on the promotions page. The original card and the wide teaser have a gentle hover lift or image zoom, like the other card designs. Rows in the entries table highlight on hover.
  - **Modal and toast:** the modal (delete profile, change country) fades and scales in, and now also fades out, including when you press its own buttons. The "link copied" toast slides up, then slides away instead of vanishing.
  - **Task flow:** on the participate page, the code form, the "Calculating…" card and "already entered" each rise in. On the result page, the icon pops in with a small bounce and the prize image follows. The "Signing in" screen fades in. Profile tabs fade between sections.
  - **Small feedback:** buttons and round arrows shrink slightly when pressed. Input borders, error messages, alerts and the newsletter confirmation fade in instead of switching on.
  - **Reduced motion:** with the system "reduce motion" setting on, every animation and transition is cut to an instant change (one rule at the end of `site.css`), and smooth scrolling is turned off.
- **Why:** the user's request. Most state changes (menus, accordion, carousel, prize pages, toasts, route changes) used to switch instantly. Claude's choices: one shared timing so everything feels consistent; movement kept small (8–14 px, at most 0.6 s) so testing sessions aren't slowed down; no scroll-triggered reveals, because they can hide content in full-page save-state screenshots.
- **How AI was used:** Claude read every component and stylesheet for existing transitions and instant state changes, then made the changes. Menus and accordion answers now stay in the page and are hidden with `visibility` when closed, so they can animate out but still can't be reached by Tab or a screen reader. The hero stacks its slides for the crossfade. The modal waits 0.2 s for its fade-out before closing. Claude checked everything with a headless Chromium script that measures each element in the middle of its animation and again at rest.
- **Files:** `prototype/src/styles/site.css`, `prototype/src/App.tsx`, `prototype/src/components/layout/Navbar.tsx`, `layout.css`, `prototype/src/components/ui/Accordion.tsx`, `Modal.tsx`, `Toast.tsx`, `ui.css`, `prototype/src/components/promo/HeroCarousel.tsx`, `PromoSections.tsx`, `promo.css`, `prototype/src/pages/Promotions.tsx`, `Profile.tsx`, `Auth.tsx`, `pages.css`.
- **Checked by:** `tsc -b` and `vite build`. Headless Chromium at 1440 × 900 and 390 × 844, measuring each item while it moves and again at rest:
  - **Hero:** halfway through the crossfade, the new slide is at 75 % with the old one still fully visible underneath; afterwards only 1 slide is visible.
  - **Brands menu:** opacity 0.35 while opening, then 1; 0.35 while closing, then hidden, and its links can't be tabbed to.
  - **Accordion:** panel height goes 0 → 53 → 66 px opening and 66 → 16 → 0 px closing.
  - **Prizes:** the items are part-way through their slide (15, 32 and 48 px).
  - **Toast:** slides in, gets `is-leaving`, then is removed.
  - **Modal:** the "OK" button plays the fade-out (opacity 0.26) before the modal is removed.
  - **Phone menu:** opens and closes the same way as the Brands menu.
  - **Other checks:**
    - Navigating from the bottom of the page lands at scroll 0 with the fade-up running.
    - Filtering re-runs the card animation.
    - With reduce motion on, the accordion still opens (66 px).
    - No sideways scroll at 390 px.
    - No console errors.
  - Screenshots of the hero, Brands menu, phone menu and phone hero were checked.
- **Decision record:** none.

### Change 24 — Page changes crossfade instead of fading up — 2026-10-27

- **Prompt (verbatim):** transitions between pages is very jagged, flashes the screen, and creates this gap above the breadcrumbs bar
- **What changed:** change 23's page animation is gone. It faded the whole new page in from transparent while moving it up 14 px. That caused the white flash (for a moment no page was visible) and the gap (the breadcrumb started 14 px below the navbar). Page changes now crossfade instead. The browser takes a picture of the old page, switches to the new one behind it, and blends the picture into the new page over 0.3 s. Nothing moves and the screen never goes blank. The navbar is pictured separately, so it stays in place; on brand-themed pages its colour blends. Browsers without this feature (View Transitions), and computers with "reduce motion" on, switch pages instantly, as before change 23. Every page still opens at the top.
- **Why:** the user's report. A crossfade is the only page transition that never shows an empty screen, because the old page stays visible until the new one has replaced it.
- **How AI was used:** Claude found the cause in its own change 23 (`.page-enter`, opacity 0 + translateY on the whole page). It replaced it with `useCrossfadeLocation` in `App.tsx`. The routes now show the address on screen, which follows the real address by one crossfade. The update runs inside `document.startViewTransition`, and the scroll reset happens before the new page is captured, so the old page doesn't flash at the top.
- **Files:** `prototype/src/App.tsx`, `prototype/src/styles/site.css`.
- **Checked by:** `tsc -b`. Headless Chromium at 1440 × 900:
  - From the promotions hero to a promotion page, and from the bottom of a promotion page via the footer to the FAQ: a transition is running 120 ms after the click. Screenshots taken partway through show the two pages blending, with no white frame.
  - After each change, the breadcrumb sits right under the navbar (top 75 px) and the page is at scroll 0.
  - The back button works.
  - At 390 px with reduce motion on, the page switches instantly, lands at the top, and the breadcrumb is at 75 px.
  - No console errors or warnings.
- **Decision record:** none.

### Change 25 — Brand theme for the page content on promotion and brand pages — 2026-10-27

- **Prompt (verbatim):** On the promos and brands pages, the individual company brands needs to apply fully the theme of the brand for the elements on the page.
- **What changed:** change 21 only coloured the navbar, breadcrumb, newsletter and footer. Now the content of promotion pages (including participate, result and promotion T&Cs) and brand pages takes the brand theme too. Before, buttons, links and menus there stayed JOY blue. It applies with config menu (C) options A, B and C. "JOY blue" still shows the live site.
  - **What follows the brand:** filled buttons (section menu "Participate here", campaign banner, "See all active promotions", "Visit brand website", form submit), outline buttons ("Go to all FAQs"), text links (contact and T&C links), the section menu links, underline and border, FAQ chevrons and open-box border, carousel dots and arrows, form focus borders, checkboxes, keyboard focus rings and the result-screen icon. The white Register and Subscribe buttons on the brand-coloured navbar and newsletter now use the brand's text colour.
  - **Doritos and Rockstar** use their Theme modes from the design system (`tokens.css`, from the brand sheets): black (`#030303`) buttons and links. On the red hero band and on the campaign banner, the button is a black pill with a white border. Hover and focus are Doritos red, or violet on Rockstar. As the sheets specify, these buttons don't change colour on hover; an underline shows the hover.
  - **Other brands (Pepsi, Walkers, 7UP, Lipton, Quaker, Popworks): DERIVED, needs approval.** Buttons are filled in the brand colour, with white or black text (whichever passes 4.5:1). Hover is 22% darker, or 12% darker on light brands. Text, links, outlines and focus rings use the brand colour, darkened in 5% steps until it passes 4.5:1 on white. 7UP green becomes `#00893B`. If that takes more than 40% black, they're black instead (Lipton yellow would turn olive). On a brand band, the button is white with that text colour.
  - **Kept as they were:** Walkers' own yellow "Visit brand website" button (from the live site). The other brands' promotions on a page ("Promos from other brands" carousel, "Check out other promotions") keep the JOY look, because they aren't this brand's. Multi-brand JOY promotions (Avengers) stay JOY.
  - The config menu section "Navbar and footer theme" is renamed "Brand theme" and says that A–C also theme the page.
- **Why:** user's request. It goes further than change 21 and away from D36 (buttons and links JOY blue on every page). Claude's choices: Doritos and Rockstar use the sourced Theme modes rather than a colour worked out from the brand colour. Text colours are darkened so links stay readable on white. Other brands' promotions keep JOY so the page doesn't suggest they belong to this brand.
- **How AI was used:** Claude traced every JOY-blue value used inside page content. Most come from `--site-blue` in `site.css`. It split that into `--site-blue` (button fill) and a new `--site-ink` (text, outlines and chevrons on white), so light brands can fill buttons in yellow or green but never colour text with them. `state/chrome.ts` now also returns a page theme for single-brand pages: `data-brand` for Doritos and Rockstar, or derived `--color-*` values. `App.tsx` puts that theme on `<main>`. One block in `site.css` points the site values at those tokens, and `data-brand="joy"` sends the other-brand sections back to JOY.
- **Files:** `prototype/src/state/chrome.ts`, `App.tsx`, `styles/site.css`, `components/layout/layout.css`, `components/promo/promo.css`, `card-variants.css`, `components/ui/ui.css`, `pages/pages.css`, `pages/Brands.tsx`, `pages/PromoDetail.tsx`, `state/design.tsx`, `moderator/ConfigPanel.tsx`.
- **Checked by:** `tsc -b` and `vite build`. Playwright at 1440 px with the default option A, reading computed colours and taking full-page screenshots:
  - **Doritos & F1:** buttons, links, section menu and FAQ in `#030303`. Hero and banner buttons are black with a white border. A first screenshot showed the banner button black on the black banner art; it was fixed and checked again.
  - **7UP:** green buttons with black text; links and outlines `#00893B`.
  - **Lipton:** yellow buttons with black text; black links.
  - **Walkers:** red; band button stays yellow.
  - **Rockstar:** black.
  - **Pepsi EA:** black; white hero button.
  - **Avengers:** no page theme; still JOY blue and yellow.
  - The other-brands carousel stays JOY on all of them.
  - Walkers at 390 px. No sideways scroll on any page.
  - Not screenshotted: the participate and result pages while logged in, and options B and C. They use the same tokens.
- **Decision record:** none yet. Together with change 21, keeping this would replace D36.

### Change 26 — Promotion and brand pages sit on the brand colour, no white sections — 2026-10-27

- **Prompt (verbatim):** The alternating white backgrounds on some of the pages doesn't look right, again for all the individual brand and promo pages, feels inconsistent, not fully in the actual brands theme
- **What changed:** on promotion pages (including participate, result and promotion T&Cs) and brand pages, the whole page now sits on the brand colour, from the navbar to the newsletter. Before, the brand-coloured bands took turns with white sections (section menu, steps, FAQs, active promotions, news, "Want to know more") and grey ones (participate and result backgrounds). This applies with options A, B and C in the config menu (C); "JOY blue" is unchanged.
  - **On the brand colour:** text is white, or black on light brands (7UP, Lipton). Buttons, links and outlines use the theme's "on dark background" set: for Doritos and Rockstar, black buttons with a white border and white links; for other brands, white buttons with brand-colour text and white (or black) links. Buttons don't change colour on hover; they get an underline, as the Doritos sheet specifies. Focus rings use the theme's colour for dark backgrounds (Doritos orange, Rockstar violet, white or black for the others).
  - **White cards on the brand colour:** FAQ boxes, the legal panel, the participate form, the result card and the promotion T&C text. Inside them, buttons and links use the theme's light-background set from change 25.
  - **Brand-colour blocks that would disappear on the brand colour** (step circles, this brand's teaser cards on its brand page, the "You're entering" strip on participate) now use the second shade (DERIVED, the same one as the breadcrumb and newsletter).
  - Other brands' promotions on the page (carousel, "Check out other promotions") still keep their own JOY look.
- **Why:** user's report. One background colour per page reads as one brand; white sections in between broke it up. Claude's choice: white cards rather than a light tint, so forms, FAQs and legal text stay as readable as before.
- **How AI was used:** Claude reorganised change 25's CSS into two sets of site values:
  - The page itself (`<main>`) uses the theme's dark-background tokens.
  - Card classes (`.pterms`, `.accordion__item`, `.panel`, `.result__card`, `.text-page`) switch back to the light-background tokens.
  - A new `--site-on-blue` holds the text colour on filled buttons, so it can differ between the two sets.
  - White buttons now always use the link token for their text.
  - Derived brands also get `--color-text-on-inverse` and `--color-border-focus-inverse` (white or black, whichever is readable).
  - `<main>` is now `display: flow-root`. A first screenshot showed a white strip under the T&C card: its bottom margin leaked outside `<main>`.
- **Files:** `prototype/src/styles/site.css`, `components/promo/promo.css`, `pages/pages.css`, `state/chrome.ts`.
- **Checked by:** `tsc -b` and `vite build`. Playwright at 1440 px, full-page screenshots: Doritos & F1, 7UP, Lipton, Rockstar, Pepsi EA (ended, with the other promotions), and the Doritos T&C page (the strip under the card measured 0 px after the fix). Also the Doritos participate page with a test account, which was then removed. No sideways scroll on any page. Not screenshotted: the result page and phone width. The result page uses the same card rules as the participate form.
- **Decision record:** none yet. With changes 21 and 25, keeping this would replace D36.

### Change 27 — Brand-colour page only for dark brands — 2026-10-27

- **Prompt (verbatim):** undo this change for the non-dark themed brands/promos
- **What changed:** change 26 (whole page on the brand colour, white cards, no white sections) now applies only to dark brands. These are brands whose colour is black or navy:
  - Rockstar, Pepsi and Quaker brand pages, plus Popworks;
  - the Pepsi promotions and Walkers' black "walkers-gdk" promotion, because promotion pages follow the promotion's hero colour.

  The colourful brands go back to change 25: white sections, with buttons, links and menus in the brand theme. These are Doritos red (brand page and both promotions), Walkers red (brand page), 7UP green and Lipton yellow.
- **Why:** user's request. Claude read "dark-themed" as black or near-black brands, which look like a dark mode when the whole page is in their colour. The rule is luminance under 0.05: black is 0, Quaker navy 0.02 and Popworks navy 0.03, while Doritos and Walkers red are 0.12–0.17. **Check:** if "non-dark" was meant to be only the light brands (7UP, Lipton), with Doritos and Walkers red keeping the full red page, that is a one-number change.
- **How AI was used:**
  - `state/chrome.ts` adds `canvas` to the page theme, true when the brand colour's luminance is under 0.05. `App.tsx` adds `data-page-canvas` to `<main>` when it is true.
  - In `site.css`, change 25's light-background set applies to every brand-themed page again. The brand-colour page set from change 26 applies only with `data-page-canvas`.
  - Change 26's rules in `promo.css` and `pages.css` (section menu, step circles, teaser cards, participate and result backgrounds, empty state, T&C card) now also need `data-page-canvas`.
- **Files:** `prototype/src/state/chrome.ts`, `App.tsx`, `styles/site.css`, `components/promo/promo.css`, `pages/pages.css`.
- **Checked by:** `tsc -b` and `vite build`. Playwright at 1440 px read the page background and button colours on 11 pages:
  - **White page:** Doritos & F1 and the Doritos, Walkers, 7UP and Lipton brand pages.
  - **Brand-colour page:** the Rockstar, Pepsi, Quaker and Popworks brand pages and Pepsi EA.
  - **Not themed:** Avengers.

  Full-page screenshots of Doritos & F1 (matches change 25) and Quaker (navy throughout).
- **Decision record:** none yet.

### Change 28 — White prizes section and a section menu in the breadcrumb colour on promotion pages — 2026-10-27

- **Prompt (verbatim):** For all the individual promo pages, chnage the background of the prizes section to be white, and change the secondary nav bar to be the same color as the breadcrumbs bar background color.
- **What changed:** on every promotion page:
  - **Prizes:** the section is now white instead of the brand colour, with dark text (`--color-text-default`). The previous/next arrows are filled buttons in the theme's button colour instead of white circles, which would vanish on white: JOY blue, Doritos black, Pepsi black. On dark brands that sit on the brand colour (change 27), the prizes section is a full-width white band.
  - **Section menu** (Prizes · Steps · FAQs · Terms and conditions): it now has the breadcrumb bar's background and text colour instead of white with a blue line. That is JOY dark blue `#0E38DF` with "JOY blue" or on Avengers, Doritos dark red with brand options A and B, Doritos red with C, and black on Pepsi. Links and the current-section underline are in the bar's text colour. When the menu sticks, its "Participate here" button uses the theme's dark-background style: white with blue text on JOY, a black pill with a white border on Doritos.
- **Why:** user's request.
- **How AI was used:** Claude moved the breadcrumb bar's colours into two variables (`--crumb-bg`, `--crumb-text`) on the page wrapper, with one value per brand-theme option in `layout.css`. The section menu reads the same variables, so it always matches the breadcrumb. The prize arrows now use the filled `round-arrow`, whose icon colour follows the theme (`--site-on-blue`) instead of fixed white.
- **Files:** `prototype/src/components/promo/promo.css`, `PromoSections.tsx`, `prototype/src/components/layout/layout.css`, `prototype/src/styles/site.css`.
- **Checked by:** `tsc -b` and `vite build`. Playwright at 1440 px compared the breadcrumb and section menu background colours on Doritos & F1, Pepsi EA and Avengers with each of the four config options (JOY blue, A, B, C). All 12 match, and the prizes are white with `#333` text on all of them. Screenshots: the Doritos and Pepsi EA prize sections, the Avengers section menu, and the stuck Doritos menu with its button.
- **Decision record:** none.

### Change 29 — Section menu: same look before and after it sticks, links follow the page order — 2026-10-27

- **Prompt (verbatim):** The secondar nav bar on the individual promo page needs to be the exact same as the one when it's made sticky, the transition needs to be seamless, right now the secondary nav changes and when the nav becomes sticky, theres a bounce that happens
  - Follow-up sent while Claude was working: "also secondary nav bar needs to update based on new strucutre of the promo pages"
- **What changed:**
  - **No change when it sticks:** the section menu under the promotion hero always has its compact sticky look: 14 px padding (10 px on phones), the soft shadow, and the "Participate here" button (or "Already entered"). Before, it was taller (31 px padding) until it stuck, then shrank and slid the button in. That moved the page underneath by about 34 px: the bounce.
  - **Links in page order:** Prizes · Steps · Terms and conditions · FAQs. Since change 21, the legal text with the T&C links sits under the steps, before the FAQs; the menu still listed Terms last. On ended promotions with other promotions to show, there is now also an "Other promotions" link to the "Check out other promotions" section. Links are only shown for sections the page has (Pepsi EA: Prizes · Terms and conditions · Other promotions).
  - **Jump position:** clicking a link stops the section 16 px under the stuck menu, measured from the menu's real height. Before it was a fixed 150 px. The current-section underline uses the same line.
- **Why:** user's request. Keeping one look is the only way sticking can't move anything. Claude's choices: the always-visible button means it now also shows just under the hero's own "Participate here" button; and an "Other promotions" link, because it is a section of the ended page.
- **How AI was used:** Claude found the cause in the `is-stuck` class: it changed padding and added the button, so the menu's height changed when it stuck. It removed the stuck state from `SectionNav` and the CSS.
- **Files:** `prototype/src/components/promo/PromoSections.tsx`, `promo.css`, `prototype/src/pages/PromoDetail.tsx`. The uncommitted brand-hero changes in `Brands.tsx` and `pages.css` aren't Claude's and are not part of this change.
- **Checked by:** `tsc -b` and `vite build`. Playwright on Doritos & F1 at 1440 px:
  - **Sticking:** scrolled in 10 px steps from 40 px before the stick point to 40 px after. The menu stayed 73 px tall the whole way, the prizes section's page position didn't change (1100 px), and the button was always there.
  - **Links:** clicking each one put Steps, Terms and conditions and FAQs 16 px under the menu, and each became the current link. Prizes sits right under the menu, because it is the next section.
  - **Pepsi EA (ended):** shows Prizes, Terms and conditions and Other promotions.
  - **Phone (390 px):** the menu is 73 px and there is no sideways scroll.
- **Decision record:** none.

### Change 30 — Brand page hero: the live site's curve — 2026-10-27

- **Prompt (verbatim):** the curve on all the individual brand pages hero needs to be fixed/made accurate
- **What changed:**
  - **Curve faces the right way:** the hero image itself now has the curved bottom edge, bulging down in the middle, with the band colour showing at the sides. Before, the band under it had a rounded top that bulged up over the image, so the curve was upside down.
  - **Same shape as the live site:** the image is cut by the live site's ellipses at its breakpoints: `ellipse(200% 100% at 50% 0)` on phones, `120% 97%` from 973 px (with 20 px of band colour under it), `98% 97%` from 1441 px. These are the same values the promotion hero already uses.
  - **Phone image keeps its shape:** under 768 px the phone hero (780 × 550, Rockstar 780 × 860, Lipton 780 × 680) is shown at its own size. Before, it was cut to the wide desktop shape (about 99 px tall at 390 px), which hid most of the image and the curve.
- **Why:** user's request. The live CSS (`references/live-site/css/…joypepsico__css__style.css`, `body.brand-doritos .grid-container.branding .top-row.branding .hero-image img`) clips the image and puts the brand colour behind it; the live captures (`references/live-site/brandpage.png`, `capture/brand-doritos--mobile.png`) show the result.
- **How AI was used:** Claude compared the prototype's brand page with the live capture, found the live clip-path rules for brand pages, and saw they match the promotion hero's. It moved the curve from the band to the image and gave the hero wrapper the band colour.
- **Files:** `prototype/src/pages/Brands.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc -b`. Playwright screenshots of the hero bottom on Doritos, Rockstar, Pepsi, Walkers and Lipton at 1440, 1920 and 390 px: the curve bulges down and the band colour fills the sides, as in the live capture. Rockstar and Lipton keep their taller desktop image. No sideways scroll on any of them. Not checked: the in-between 768–972 px range (it uses the phone curve on the desktop image, like the live site).
- **Decision record:** none.

### Change 31 — Promotion cards are clickable everywhere — 2026-10-27

- **Prompt (verbatim):** On the home and promos page promo cards in the grids, the card needs to be clickable everywhere on the card, right now only the button on the card is clickable
- **What changed:**
  - **Clicks anywhere on the card open the promotion:** every card design (Original and A–E in the config menu) now opens the promotion when you click its picture, text or empty space, not only the button.
  - **Why it failed before:** the five new card designs already stretched the button's link over the whole card with an invisible layer. But pressing a button runs the "small press" effect (`transform: scale(.97)`), and hovering the Poster's white button applied `filter: brightness(.94)`. Either one makes the button the box that the invisible layer is measured against. Mid-click the layer shrank back to the button, the mouse was let go outside the link, and the browser dropped the click. The Original card had no stretched link at all.
  - **Fix:** the Original card gets the same stretched link as the others, with a focus ring around the whole card. Buttons that cover a card no longer shrink when pressed or use a filter on hover. The Poster's white button still darkens on hover, now by mixing its background colour.
- **Why:** user's request. A whole-card target is easier to hit and is what people expect from a card.
- **How AI was used:** Claude tested clicks with Playwright and found that the link was on top everywhere but clicks still did not navigate. Clicking the button itself worked, which led to the press and hover styles on `.btn`.
- **Files:** `prototype/src/components/promo/promo.css`, `prototype/src/components/promo/card-variants.css`.
- **Checked by:** Playwright at 1440 px, all 6 card designs on Home and Promotions. Hit tests at 15 points per card (every card) all land on the link. Real mouse clicks at the top centre, left middle and bottom right of the first card all open the promotion page.
- **Decision record:** none.

### Change 32 — Brand logo in the navbar: no white bubble, always visible — 2026-10-27

- **Prompt (verbatim):** on the individal promo/brands pages, the logo of the brand in the main nav bar should not be in a white bubble, it should be slightly larger and no bubble at all
  - Follow-up during the same change: Make sure the brand logos are visible over their bakcgrounds, some of them you cant see like rockstar's text/logo
- **What changed:**
  - **No bubble:** the brand logo next to "JOY ×" sits straight on the brand-colour navbar. The white pill, its padding and its shadow are gone. It still grows slightly on hover.
  - **Larger:** logo height 36 → 48 px on desktop (max width 120 px), 30 → 38 px under 992 px.
  - **Visible on dark bars:** Rockstar (black wordmark on a black bar) and Quaker (navy wordmark on a navy bar) disappeared without the white bubble. Each now has a second logo file for the navbar, `logo-rockstar-on-dark.webp` and `logo-quaker-on-dark.webp`, where only the dark wordmark is recoloured white. Rockstar keeps its gold star; Quaker keeps its portrait (only the "QUAKER / EST 1877" part was changed). A new optional `logoOnBand` field on a brand picks this file; other brands keep their normal logo.
- **Why:** user's request. The Rockstar brand sheet allows only white text on Rockstar black, so a white wordmark follows it. The recoloured files are **DERIVED** from the live-site logos (not official brand assets) and need approval. The real white-logo artwork should replace them if the brands supply it.
- **How AI was used:** Claude took navbar screenshots of every brand page to find which logos disappeared without the bubble. It then made the white-wordmark versions with a canvas script (dark, grey pixels turn white; coloured pixels and transparency are kept).
- **Files:** `prototype/src/components/layout/layout.css`, `prototype/src/data/brands.ts`, `prototype/src/state/chrome.ts`, `prototype/public/images/brands/logo-rockstar-on-dark.webp`, `prototype/public/images/brands/logo-quaker-on-dark.webp`.
- **Checked by:** `tsc -b`. Playwright navbar screenshots at 1440 px of all 8 brand pages (Doritos, Rockstar, Pepsi, Walkers, 7UP, Lipton, Quaker, Popworks) and the Las Vegas (Doritos), Walkers GDK and Pepsi EA promotion pages (Walkers and Pepsi on black). Phone width (390 px): Doritos, 7UP, Rockstar, Quaker. Every logo is readable with no bubble. Rockstar and Popworks still look small, because their image files have a lot of empty space around the logo.
- **Decision record:** none.

### Change 33 — Promotion page: Participate banner fits the content width, terms at the bottom — 2026-10-27

- **Prompt (verbatim):** on the individal promo pages, make the participate here section/banner fit the content container width, right now it's wider than anything else in the page, feels unbalanced/awkawrd. [Image #1]. Also move the terms section to the very bottom of the page.
- **What changed:**
  - **Banner width:** the "Participate here" banner (`.cta-banner`) is now as wide as the other content blocks: 1130 px, centred (`--site-content`), with 20 px either side on smaller screens and 16 px on phones. Before, it ran almost edge to edge (25 px margins), wider than the FAQs and the legal box.
  - **Terms last:** the legal text with the contact and T&C links moved from between the steps and the banner to the very end of the page, after the FAQs (and after "Other promotions" on ended promotions). It now carries the bottom space (64 px, 48 px on phones) and has no extra top space when it follows the FAQs.
  - **Section menu order:** "Terms and conditions" moved to the end of the sticky section menu, so the links still follow the page order (change 29).
- **Why:** user's request. Every block on the page now shares the same left and right edges, and the long legal text no longer sits in the middle of the page between the steps and the call to action.
- **How AI was used:** Claude found the banner's margins in `promo.css`, gave it the same width rule as the FAQ and legal blocks, and moved the terms section in `PromoDetail.tsx`.
- **Files:** `prototype/src/components/promo/promo.css`, `prototype/src/pages/PromoDetail.tsx`.
- **Checked by:** `tsc --noEmit`. Playwright on the Avengers Doomsday page: at 1440 px the banner, FAQs and terms all measure x 147, width 1130; at 390 px all three are x 16, width 343, no sideways scroll. Screenshots show the banner lined up with the FAQ edges and the terms as the last block above the newsletter. Not checked: an ended promotion with "Other promotions".
- **Decision record:** none.

### Change 34 — Promotion page: one even gap between sections — 2026-10-27

- **Prompt (verbatim):** White space and gap between the sections on the individual promo pages needs to be auditted and fixed so that things are consistent and looks visually balanced
- **Audit (before):** each section had its own top and bottom space, and some were added together, so the visible space between one section's content and the next varied a lot. Desktop (1440 px) / phone (390 px), in px:

  | Between | Desktop | Phone |
  | --- | --- | --- |
  | Section menu → Prizes | 69 | 48 |
  | Prizes → Steps | 119 | 98 |
  | Steps → Participate banner | 40 | 24 |
  | Participate banner → FAQs | 120 | 80 |
  | FAQs → Terms | 88 | 64 |
  | Prizes → Other promotions (ended, dark brands) | 109 | 88 |
  | Other promotions → Terms | 78 | 72 |
  | Terms → Newsletter | 64 | 48 |

- **What changed:**
  - **One gap:** a new `--promo-gap` (`--spacing-80` on desktop and tablet, `--spacing-48` under 768 px) is the only space between sections. Each section (prizes, steps, Participate banner, FAQs, other promotions, terms) puts it above itself only; the terms box, now always last, also puts it below, before the newsletter.
  - **Prize band on dark-brand pages:** the white band keeps the gap inside it, above and below its content, so the space from the band's edge to the next heading matches.
  - **Other promotions:** its inline padding (40/48) became a `promo-others` class, and the last teaser card no longer adds its own 40 px under itself.
  - Spacing inside sections (heading to content, between cards, between steps) is unchanged.
- **Why:** user's request. A single gap gives the page an even rhythm, so no section looks crammed (the banner under the steps was 40 px) or stranded (the FAQs had 120 px above them).
- **How AI was used:** Claude measured the visible gap between every pair of sections with a Playwright script on all 6 promotions, found where the spacing came from in `promo.css`, and replaced the separate values with one shared one.
- **Files:** `prototype/src/components/promo/promo.css`, `prototype/src/pages/PromoDetail.tsx`.
- **Checked by:** `tsc --noEmit`. The same Playwright script after the fix, on all 6 promotions (active, ended, and the three dark-brand pages) at 1440, 900 and 390 px: every gap is 80 px (48 px on phones), no sideways scroll. Full-page screenshots of Avengers Doomsday (1440, 390) and Pepsi Music (1440) look even.
- **Decision record:** none.

### Change 35 — Promotion page: more space around the Participate banner — 2026-10-27

- **Prompt (verbatim):** maybe larger gap bewteen around the participate here banner
- **What changed:** the space above and below the "Participate here" banner is now 1.5 times the section gap from change 34: 120 px on desktop and tablet, 72 px on phones (was 80 / 48). It's a new `--promo-gap-wide`, worked out from `--promo-gap`, so the two stay in proportion. The section after the banner (FAQs, or the terms box when a promotion has no FAQs) starts after the wide gap. All other gaps stay at 80 / 48.
- **Why:** user's request. The banner is a call to action between two content sections. Extra space sets it apart, so it reads as its own moment instead of part of the steps or the FAQs.
- **How AI was used:** Claude added one derived variable and applied it to the banner and to whichever section follows it, then measured the result with Playwright.
- **Files:** `prototype/src/components/promo/promo.css`.
- **Checked by:** Playwright on Avengers Doomsday: steps → banner and banner → FAQs both 120 px at 1440 px and 72 px at 390 px. Screenshot at 1440 px shows equal space above and below the banner. Not checked: an active promotion without FAQs (the banner → terms rule).
- **Decision record:** none.

### Change 36 — No gradients on the promotion cards or the logged-in home hero — 2026-10-27

- **Prompt (verbatim):** ON the promo cards (small) get rid of the gradient on it. same with the logged in home page hero, the gradients feel/look ai-gen
- **What changed:**
  - **Promotion card (A · Poster, the default):** removed the overlay that put a white glow behind the art and darkened the bottom of the card. The card is now one flat brand colour.
  - **Logged-in home hero (C · Big track, the default):** the background is flat JOY blue instead of a blue-to-navy fade. The progress bar fill is solid JOY yellow instead of a sky-to-green-to-yellow fade with moving diagonal stripes and a glow. The fill still grows in when the page loads.
- **Why:** user's request. The gradients looked AI-made. The live site uses flat colour bands, so flat fills also match it better.
- **How AI was used:** Claude found which card and hero designs are the defaults, removed only their gradient rules in CSS, and checked the result in the browser with Playwright.
- **Files:** `prototype/src/components/promo/card-variants.css`, `prototype/src/components/promo/hero-variants.css`.
- **Checked by:** Playwright at 1440 px, logged in as the test user with 2 entries: the hero is flat blue with a solid yellow bar; the JOY and Doritos cards are flat brand colour (the card's `::before` overlay is gone). Not changed: the other card and hero designs in the config menu (press C) still have their own gradients.
- **Decision record:** none.

### Change 37 — Logged-in home hero: bigger "Hi Sam!" greeting — 2026-10-27

- **Prompt (verbatim):** in the logged in hero, the HI SAM is too small, maybe also change to Hi Sam! (case)
- **What changed:** in the logged-in home hero (C · Big track, the default), the greeting above the headline now reads "Hi Sam!" in sentence case instead of "HI SAM" in small spaced capitals. It is 36 px bold on desktop and tablet, 26 px on phones (was 14 px), still in JOY sky blue. It has its own class, `.hv-track__hello`, so the small "Your JOY rewards" labels on the other hero designs stay as they were.
- **Why:** user's request. At 14 px in capitals the greeting read like a small label and got lost next to the 64 px headline. Sentence case with an exclamation mark sounds friendlier, like a greeting.
- **How AI was used:** Claude found which hero was the default, gave its greeting a new style, and checked the size and text with a Playwright script.
- **Files:** `prototype/src/components/promo/HeroVariants.tsx`, `prototype/src/components/promo/hero-variants.css`.
- **Checked by:** Playwright at 1440 and 390 px, logged in as the test user with 2 entries: the text is "Hi Sam!", 36 px and 26 px, no uppercase. Screenshots at both widths show it reading clearly above the headline. Not changed: the "HI SAM" in the navbar (still capitals, like the other navbar links).
- **Decision record:** none.

### Change 38 — Logged-in home hero: darker blue so it stands apart from the navbar — 2026-10-27

- **Prompt (verbatim):** On the home logged in hero, the nav bar blends in with the hero, is there a way to be able to distinguish them
- **What changed:** the logged-in home hero (C · Big track, the default) is now the live site's darker blue, `--site-blue-dark` (#0E38DF), instead of JOY blue (#1443FF). The navbar stays JOY blue, so there is a clear edge where the hero starts. The hero is still one flat colour (change 36). The "Entry 3" dot that hasn't been reached yet now uses JOY blue, because the old darker blue would have disappeared into the new background.
- **Why:** user's request. Since change 36, the navbar and the hero were the same flat JOY blue, and the home page has no breadcrumb bar between them, so they read as one block. On every other page the breadcrumb bar in `--site-blue-dark` separates the navbar from the content. Using the same blue here follows a pattern the site already has instead of adding a new one.
- **Options considered (tried in the browser at 1440 px before choosing):** (1) darker site blue on the hero, chosen; (2) the brand sheet's dark navy #0A0F36 on the hero: the strongest contrast, but a much heavier look than the live site; (3) a thin white line and a shadow under the navbar: a smaller change, but it adds a shadow style the site doesn't use and the two blues still match.
- **How AI was used:** Claude rendered the three options with Playwright by injecting CSS, compared the screenshots, applied the one that follows the live site's existing pattern, and checked it again.
- **Files:** `prototype/src/components/promo/hero-variants.css`.
- **Checked by:** Playwright at 1440 and 390 px, logged in as the test user with 2 entries: navbar `rgb(20, 67, 255)`, hero `rgb(14, 56, 223)`. Screenshots at both widths show a visible edge under the navbar, and the progress dots, yellow bar and decorations are all still readable. Not changed: the other hero designs in the config menu.
- **Decision record:** none.

### Change 39 — Result page hierarchy and reward progress bar; participation pages on the brand colour — 2026-10-27

- **Prompt (verbatim):** ON the promo results page, work on the info heirarchy of the text. I also want to visually show the progress bar on it to show entries away from next reward. Also theres heavy ai-gen aesthetics, especially with the icon and the You're 3 entries... label. Also on all the participation pages, the background needs to be in theme, right now it's just grey.
- **What changed:**
  - **Result page order:** every outcome now reads in the same order: headline → the prize (or the draw) → what happens next → progress towards the next JOY reward → buttons → code and date (small, last).
    - **Won:** "You’ve won!", then the real prize picture with the prize name in large blue text, then "We’ve emailed you how to claim your prize. **Claim it within 14 days.**" The draw prize is a quieter line under it. Before, the prize name sat under a long paragraph and a divider.
    - **Lost:** "No win this time" (was "Not this time") and one short line. If the promotion has a draw, a line says in bold that you're still in it and when winners are picked.
    - **Entered (draw only):** "You’re in the draw!" with the prize in bold, then when the winner is picked.
  - **Removed the AI-looking parts:** the big icon in a pastel circle that popped in (party popper, frown, ticket) and the blue info box ("You’re 3 entries away…").
  - **Reward progress bar (new):** a section with a divider above it: a heading ("1 more entry to your next JOY reward", or "You’ve unlocked a JOY reward"), a "3 of 4" count, a bar with one segment per entry in the button colour, and one small line explaining the rule. The segment this entry filled grows in, so you can see the entry counted. It uses the theme's button colour, so it's JOY blue on JOY promotions and black on Doritos and Pepsi.
  - **Participation and result pages on the brand colour:** both pages now sit on the promotion's brand colour (JOY blue, Doritos red, Pepsi black, and so on) instead of grey, with the form or result on a white card. The promotion strip above the card ("You’re entering" / "Your result", art, name, dates) is now white text straight on the brand colour instead of a coloured box. The result page has the strip too, so both pages look like steps of the same flow.
- **Why:** user's request. The old result page gave the long paragraph and the prize the same weight, so the most important fact (what you won, or that you're still in the draw) didn't stand out. The reward progress was a sentence in an info box; a bar shows it at a glance and matches the home page tracker. The icon and the info box were generic UI-kit pieces that read as AI-made; a real prize picture is more specific. The grey background made the participation pages look like they left the promotion; the brand colour keeps them part of it, like the dark-brand promotion pages already did.
- **How AI was used:** Claude rewrote the result page layout and the progress section, moved the promotion strip into a shared component, changed the page backgrounds in CSS, and checked the result with Playwright screenshots.
- **Files:** `prototype/src/pages/Result.tsx`, `prototype/src/pages/Participate.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc --noEmit`. Playwright at 1440 and 390 px, logged in as the test user with 3 entries: won result on Avengers Doomsday (JOY blue page, prize picture, 3 of 4 bar), lost result on Las Vegas Wrap (red page, black bar and button, draw line), lost result on Pepsi Music (black page), and the Las Vegas Wrap entry form (red page, white card). No sideways scroll at either width. Not checked in the browser: the "entered" (draw only) result and the "reward unlocked" state (4th entry).
- **Decision record:** none.

### Change 40 — Promotion cards: prize label outlined, not filled — 2026-10-27

- **Prompt (verbatim):** dont make the container around the prize label fill
- **What changed:** on the promotion card (A · Poster, the default), the box around the prize line ("Win: …", "You won: …", "No instant win this time…") no longer has a see-through white fill. It has a thin white outline at 50% instead, with the same shape and spacing.
- **Why:** user's request. A filled, semi-transparent box is another generic AI-UI pattern (see changes 36 and 39). An outline still groups the prize line without adding a second shade to the card.
- **How AI was used:** Claude found the prize label rule for the default card, swapped the fill for an outline, and checked it with Playwright.
- **Files:** `prototype/src/components/promo/card-variants.css`.
- **Checked by:** Playwright at 1440 px on the Promotions page, logged in as the test user: computed background is transparent with a 1 px white 50% border; screenshot shows the outline reading clearly on the blue, red and grey (ended) cards. Not changed: the prize boxes on the other card designs in the config menu.
- **Decision record:** none.

### Change 40 — Promotion cards: titles and prize boxes line up across a row — 2026-10-27

- **Prompt (verbatim):** On the promo cards (small) the titles and prizes label should always be aligned with each other across cards, no matter if the title ends up being 2 lines
- **What changed:** in a card grid (Promotions page, logged-in home "Suggested" and "Your entries"), the cards in one row now share the same rows (CSS subgrid): top chips, picture, brand label, title, prize box, footer. A 2-line title makes the title row taller for every card in that row, so all titles start at the same height, all prize boxes start at the same height, and the time left and buttons line up at the bottom. Each prize box stays the height of its own text. Applies to the default card design (A · Poster) only. Outside a card grid the card looks the same as before.
- **Why:** user's request. When one title wrapped to 2 lines, its prize box and everything below moved down, so the row looked uneven and harder to scan.
- **How AI was used:** Claude chose CSS subgrid because it lines rows up for any title length, not just 2 lines (a fixed 2-line minimum height would break with 3 lines). It then measured where each title, prize box and footer starts with a Playwright script.
- **Files:** `prototype/src/components/promo/card-variants.css`.
- **Checked by:** `tsc --noEmit`. Playwright on the Promotions page at 1440, 900 and 390 px: in every row the titles, prize boxes and footers start at the same position, even where 1-line and 2-line titles share a row. No sideways scroll. A screenshot at 1440 px looks even. Not checked: the other card designs in the config menu (press C), which are unchanged.
- **Decision record:** none.

### Change 41 — Promotion cards: prize label back to its fill (undoes change 40) — 2026-10-27

- **Prompt (verbatim):** why did you restyle it? / hug text / hug text but fill width of the container
- **What changed:** the prize box on the promotion card (A · Poster) has its see-through white fill again and no outline. It is the full width of the card's content area, and its height fits the text (one or two lines). This is the same as before change 40.
- **Why:** change 40 misread "fill". The user asked for the box to fit its text, not for the background to be replaced with an outline. Claude should have asked before adding the outline.
- **How AI was used:** Claude restored the rule and measured the box in Playwright.
- **Files:** `prototype/src/components/promo/card-variants.css`.
- **Checked by:** Playwright on the Promotions page (1440 and 390 px) and the logged-in home page (1440 px): box width equals the card body's content width (303 of 347 px; 22 px padding each side), heights 40 px for one line and 60 px for two, background `rgba(255, 255, 255, 0.14)`, no border.
- **Decision record:** none.

### Change 42 — Profile page: banner no longer cuts logos in half — 2026-10-27

- **Prompt (verbatim):** On the profile page, the banner seems to be cutoff
- **What changed:** the banner image on the profile page is a square collage of brand logos, shown as a thin strip. The strip used to be cut from the middle of the image, which sliced the Walkers, 7up and Popworks logos in half on desktop. On screens wider than 575 px the strip now comes from the lower part of the image, where the Quaker and Doritos logos fit whole. The banner height also grows with the screen width (172 px at 1440, the live-site height), so the strip shows the same part of the image at any desktop width. On phones (575 px and narrower) it stays 172 px tall and centred, which already shows Walkers, Popworks and 7up whole.
- **Why:** user's request. A logo cut in half looks like a bug. The live site has the same problem (its 7up logo is cut), so the live site can't be matched here without copying the problem.
- **How AI was used:** Claude looked at the full image, measured where the logo rows sit, and picked a crop position and height rule that keep every visible logo whole from phone to wide desktop. It then checked the crop with Playwright screenshots.
- **Files:** `prototype/src/pages/pages.css`.
- **Checked by:** Playwright banner screenshots at 390, 600, 1024, 1440 and 1920 px, logged in as the test user: no logo is cut at any width.
- **Decision record:** none.

### Change 44 — Promotion page: the two "Already entered" buttons match — 2026-10-27

- **Prompt (verbatim):** on the doritos promo page, look at the two buttons, they are inconsistent with each other? why? fix this
- **What changed:** on a brand-themed promotion page (for example Doritos) after you have entered, the "Already entered" button in the section menu no longer has a black outline. It now looks the same as the one in the red band: grey fill, grey border, white text.
- **Why:** both buttons use the same disabled grey, but a brand-theme rule (`.page-main[data-page-theme] .btn--primary`, change 25) sets the border of every primary button to the brand's button border colour, black for Doritos. It was more specific than the disabled rule, so it won on the section-menu button (a primary button). The band button is a white button, so the rule never touched it. The theme rule now skips disabled buttons.
- **How AI was used:** Claude compared the computed styles of the two buttons, traced the black border to the theme rule, and checked the fix in Playwright.
- **Files:** `prototype/src/styles/site.css`.
- **Checked by:** Playwright at 1440 px on `#/promotions/las-vegas-wrap`, logged in with an entry already made: both buttons now have the same background, border and text colour (grey `#A7A7A7`, white text) and the same height (45 px). Screenshot matches. Still different on purpose: the band button is wider (wide padding, 240 px minimum) than the compact section-menu button, the same as the "Participate here" pair.
- **Decision record:** none.

### Change 44 — Promotion page: navbar hides while scrolling down, section menu takes its place — 2026-10-27

- **Prompt (verbatim):** On the individual promos pages, make the main nav bar collapse after scrolling past the secondary nav bar, the secondary nav should talk it's place. Only when user scrolls up, the main appears again.
- **What changed:**
  - On promotion pages, once the section menu (Prizes, Steps, FAQs…) reaches the navbar and sticks, scrolling down slides the navbar up out of view. The section menu then sticks to the very top of the window.
  - Scrolling up, even a little, slides the navbar back in, and the section menu moves back down under it. Above the section menu's place on the page, the navbar always shows.
  - The navbar stays put while one of its menus (Brands, user menu, mobile menu) is open, and comes back if a keyboard user tabs into it.
  - Section menu links leave room for the navbar only when jumping up the page (the navbar shows), not down (it hides), so the section heading lands just under the menu either way. The highlighted section follows the same rule.
  - Both moves animate over `--dur-base` (0.25 s). With reduced motion turned on, they happen instantly.
  - Other pages are unchanged: the flag is set only by the section menu and cleared when you leave the page.
- **Why:** user's request. On a long promotion page, the section menu and the Participate button are what people need while reading. Hiding the navbar frees 75 px (more on phones, where that's a big share of the screen), and scrolling up is the usual signal that someone wants to go elsewhere.
- **How AI was used:** Claude added scroll-direction tracking to the existing section menu component. It sets a `data-nav-hidden` flag on the page, and CSS moves the navbar and the menu. A Playwright script scrolled down, up and down again and clicked the menu links at 1440 and 390 px, and checked the navbar position, menu position and highlighted link at each step.
- **Files:** `prototype/src/components/promo/PromoSections.tsx`, `prototype/src/components/promo/promo.css`, `prototype/src/components/layout/layout.css`.
- **Checked by:** `tsc --noEmit`. Playwright on Avengers Doomsday at 1440 and 390 px: navbar visible at the top and before the menu sticks; hidden (header bottom 0, menu at 0) when scrolling down past it; visible again (menu at 75) after scrolling up 150 px; menu links land on the right section going down and up; no section highlighted at the top of the page (a bug in the first try, fixed). Screenshots of the hidden and shown states at 1440 px. Not checked: real touch scrolling on a phone, and the logged-in user menu.
- **Decision record:** none.

### Change 43 — Ended promotion pages: other promotions and terms on white — 2026-10-27

- **Prompt (verbatim):** On the ended promo pages, make the other promos and terms/conditions sections background color white, not the dark
- **What changed:** on an ended promotion page for a dark brand (Pepsi, and any other page that sits on the brand colour), the "Check out other promotions" section and the terms box now sit on a full-width white band instead of the dark brand colour. The terms box gets its light grey fill back (as on white pages), and its links use the dark-on-white colours. The hero, prizes and the rest of the page above stay on the brand colour. Pages that were already white (Doritos Las Vegas) look the same as before.
- **Why:** user's request. The teaser cards are bright brand colours of their own (JOY blue, Doritos red) and looked heavy on black; on white they read like the same cards elsewhere on the site.
- **How AI was used:** Claude wrapped the last two sections of the ended page in one container, added it to the existing list of white areas on dark-brand pages (so buttons and links switch to the light-background set), and checked the result with a Playwright script.
- **Files:** `prototype/src/pages/PromoDetail.tsx`, `prototype/src/components/promo/promo.css`, `prototype/src/styles/site.css`.
- **Checked by:** `tsc --noEmit`. Playwright at 1440 and 390 px on Pepsi Music, Walkers GDK and Doritos Las Vegas (ended): the band is white `rgb(255, 255, 255)` on the dark pages, the terms box is `rgb(244, 244, 244)`, the section title is `#333`, links are black, and there's no sideways scroll. Screenshots of the band look right at both widths.
- **Decision record:** none.

### Change 45 — Promotion page: no gap when the navbar hides (fixes change 44, navbar hides while scrolling down) — 2026-10-27

- **Prompt (verbatim):** the main nav bar when disappearing leaves a gap between the two, fix this, it should look seamless
- **What changed:** when the navbar slides up, the section menu now slides up by exactly the navbar's height (`--site-nav-height`) at the same speed and easing, so the two move as one. On scroll up, they slide back down together. Before, the menu's sticky position changed from under the navbar to the top of the window. The menu then came unstuck and scrolled up with the page, and the hero showed through between the leaving navbar and the menu.
- **Why:** user's request. A strip of page content flashing between the two bars looked broken. Moving them with one shared timing keeps them joined the whole way.
- **How AI was used:** Claude worked out that changing a sticky element's `top` makes it scroll with the page until it reaches the new position. It replaced that with a transform that matches the navbar's, then recorded the space between the navbar's bottom edge and the menu's top edge on every frame of the animation with Playwright.
- **Files:** `prototype/src/components/promo/promo.css`, `prototype/src/components/layout/layout.css`.
- **Checked by:** `tsc --noEmit`. Playwright on Avengers Doomsday at 1440 and 390 px, sampling every frame while the navbar slides out and back in: the space between navbar and menu is 0 px on every frame. End states: hidden, navbar and menu both at 0; shown, navbar bottom and menu top both at 75. Not checked: real touch scrolling on a phone.
- **Decision record:** none.

### Change 46 — Three placeholder active promotions for testing (7UP, Lipton, Quaker) — 2026-10-27

- **Prompt (verbatim):** For testing purposes only, add in 3 more placeholder active promos, try to use different brands that haven't been used before. Make sure they keep with Pepsi's theme, look realistic, and aligns with the current of all the existing promos.
- **What changed:**
  - Three new promotions, all active on the prototype's fixed date (23.10.2026), all UK & Ireland, codes start with GB. Each has hero, prizes, 3 steps, 4 FAQs and terms, like Avengers and the Doritos wrap-up.
    - **7UP "Lift your weekend"** (`#/promotions/7up-weekend`): instant win, once a day, plus a draw for a £1,000 weekend getaway. Ends 01.11.2026, so it shows the "Ends in 9 days" urgent state.
    - **Lipton "Find your bestea"** (`#/promotions/lipton-bestea`): prize draw only, once a week, for a spa day for two or a £50 gift card. Ties in with the Lipton "bestea" quiz on the brand page. Just started, 100 days left.
    - **Quaker "Power your mornings"** (`#/promotions/quaker-mornings`): instant win, once a week, plus a draw for £1,000. 58 days left.
  - Artwork comes from each brand's live-site hero and logo. 7UP and Lipton use their brand hero as the promotion header. A script made the rest: square card art with the headline, round prize images (blurred brand art plus a headline, in the style of the live-site "£100" and festival prizes), step 1 pack logos, a generic "BEST BEFORE / GBXXXXXXX" step 3 badge, and a Quaker header (navy, with the logo on a cream circle taken from the Quaker hero). Step 2 reuses the JOY logo image.
  - Hero band colours: 7UP `#185430` (dark green from the 7UP logo, DERIVED), Lipton `#B40C30` (red from the Lipton logo, DERIVED), Quaker `#00273B` (live-site brand band). The live-site 7UP green `#00B74F` and Lipton yellow `#FFE300` fail with white text (2.7:1 and 1.3:1), and the hero, steps and teaser all use white text. The new colours pass (8.9:1, 6.9:1, 15.5:1).
  - All three are marked PLACEHOLDER in `promos.ts`. Their terms start with "PLACEHOLDER FOR TESTING" and name the promoter as "PLACEHOLDER", so no real company is named on made-up terms.
- **Why:** user's request, to test the listing, filters, carousels and participation flow with more live promotions and brands. Rockstar was left out on purpose: the moderator panel uses the Rockstar brand page as the "brand with no promotions" test case.
- **How AI was used:** Claude chose the brands from those with brand pages but no promotions, wrote the copy in the style of the real promotions, sampled colours from the brand logos and checked their contrast with white, and wrote a Pillow script to make the artwork. Copy, prize lists and dates are made up.
- **Files:** `prototype/src/data/promos.ts`; new images in `prototype/public/images/promos/7up-weekend/`, `lipton-bestea/`, `quaker-mornings/` and `prototype/public/images/global/step-code.webp`.
- **Checked by:** `tsc -b` (passes). Headless Chrome screenshots at 1440 px of `#/promotions` (all three show as active with the right badges, mechanics and days left; 7UP shows the urgent "Ends in 9 days") and the three promotion pages (header, hero band, prizes, steps, FAQs, terms). First pass found the dark Quaker logo hidden on the navy step circle and the header circle clipped; both fixed and checked again. Not checked: the participation flow end to end for the new promotions, and phone width (the headless browser couldn't go below about 500 px).
- **Decision record:** none (test data only).

### Change 46 — Participation and result pages: own background, no breadcrumb, home hero progress bar — 2026-10-27

- **Prompt (verbatim):** On the promo participation pages, the background behind the main content card should be distinguishable from the footer and the nav bars. Remove the breadcrumbs bar from these pages. On the participation results page, I want toe progress bar to be the same progress bar visually that's from the home page hero.
- **What changed:**
  - The participation page (code form) and the result page no longer sit on the exact brand colour, which the navbar and footer also use. They sit on a shade of it: the same 22% darker shade the breadcrumb bar uses (Doritos red `#E31722` → `#B1121A`, JOY promo blue `#0E38DF` → `#0B2CAE`). Black brands (Pepsi, Walkers MAX) can't go darker, so they get a dark grey instead (`#000000` → `#242424`, 14% white). The promo strip's text colour is picked to stay readable on that shade. **DERIVED, needs approval:** both shades are computed from sourced brand colours.
  - The breadcrumb bar is gone from both pages. The promo strip above the card ("You're entering" / "Your result", promo name, dates) already says where you are.
  - The result page's progress towards the next JOY reward now uses the home hero's track bar: the same rail, yellow fill, "3 / 4" bubble, white check dots, purple gift and "Entry 1…Reward" labels. It sits in a JOY blue box (the hero's background) inside the white card, with the headline in the hero's style ("**1 more entry** to your next JOY reward", number in yellow). It stays in JOY colours on every brand page, since the reward belongs to JOY. The fill grows in after the card appears.
- **Why:** user's request. With the page, navbar and footer all the same colour, the page had no edges. The breadcrumb repeated what the promo strip says on a task page. One progress bar design on home and result pages means testers learn it once.
- **How AI was used:** Claude pulled the hero's track bar out into its own component (`TrackBar`) so both pages render the same markup and CSS, added a helper that works out the page shade from the brand colour, and checked the pages with Playwright.
- **Files:** `prototype/src/components/promo/HeroVariants.tsx`, `prototype/src/components/promo/hero-variants.css`, `prototype/src/state/chrome.ts`, `prototype/src/pages/Participate.tsx`, `prototype/src/pages/Result.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc --noEmit`. Playwright at 1440 and 390 px on the Doritos participation and result pages, the JOY Avengers result page and the Pepsi EA result page (logged in, 3 entries): no breadcrumb; page background differs from navbar and footer on each (red `rgb(177, 18, 27)` vs `rgb(227, 23, 34)`, blue `rgb(11, 44, 174)` vs `rgb(14, 56, 223)`, grey `rgb(36, 36, 36)` vs black); reward box `rgb(14, 56, 223)` with a yellow fill and white done dots on every brand; gift dot inside the box; no sideways scroll. Screenshots look right at both widths. Home hero still renders the track bar (4 dots, "3 / 4"). Not checked: the other config-menu chrome treatments (brand top, accent, JOY), and the "reward unlocked" state on the result page.
- **Decision record:** none.

### Change 46 — Favourite brands: heart a brand to see its promotions first — 2026-10-27

- **Prompt (verbatim):** On the brands dropdown and page, add the ability for users to heart a certain brands, hearting brands will impact will put those brands forward in the reccomended sort in the promotions page and will be prioritized in the suggested promos on the home page
- **What changed:**
  - **Brands dropdown (desktop):** each brand logo has a heart in a white circle in its top-right corner. Clicking it fills the heart (JOY blue) and keeps the menu open; clicking the logo still opens the brand page.
  - **Mobile menu:** the brand tiles have the same heart, smaller (28 px tap target, 16 px icon), on the corner of each tile.
  - **Brands page (`/brands`):** each brand has the heart in its top-right corner, and a line under "Our brands" explains what hearting does.
  - **Each brand page:** an "Add to favourites" outline button next to "Visit brand website" in the welcome band. It reads "In your favourites" with a filled heart once on. It takes the band's text colour, so it works on light (Lipton yellow) and dark bands. On phones it sits under the other button.
  - A toast confirms each change ("Quaker added to your favourites. Its promotions now show first.").
  - **Promotions page, Recommended sort:** promotions you haven't entered still come first; within them, favourite brands come first, then the curated order. Same inside the entered group. Ended promotions stay last. Newest and Ending soonest are unchanged.
  - **Home (logged in), Suggested for you:** favourite brands' promotions come first, then the curated order.
  - Favourites are saved in the browser (`favouriteBrands` in the prototype's `localStorage`), not per account, so they work logged out and carry over when someone registers. The moderator panel's reset clears them.
- **Why:** user's request. Letting people say which brands they like gives the "Recommended" and "Suggested for you" lists a visible reason for their order.
- **How AI was used:** Claude added the favourites list to the fake store and one shared heart button used in all four places, changed the two sort rules, then checked the result with a Playwright script and screenshots.
- **Files:** `prototype/src/state/store.tsx`, `prototype/src/components/ui/FavouriteButton.tsx` (new), `prototype/src/components/ui/ui.css`, `prototype/src/components/layout/Navbar.tsx`, `prototype/src/components/layout/layout.css`, `prototype/src/pages/Brands.tsx`, `prototype/src/pages/pages.css`, `prototype/src/pages/Promotions.tsx`, `prototype/src/pages/Home.tsx`.
- **Checked by:** `tsc --noEmit`. Playwright at 1440 px from empty data: hearting Quaker in the dropdown keeps the menu open, sets `aria-pressed="true"` and moves Quaker Mornings from 5th to 1st in Recommended. After also hearting 7UP (brands page) and Lipton (brand page), Recommended starts 7UP Weekend, Lipton Bestea, Quaker Mornings, then Avengers and Las Vegas Wrap, with ended promotions last; logged-in Suggested for you shows the same order. Screenshots of the dropdown, brands page, Lipton and Quaker bands at 1440 px, and the mobile menu, brands page and Doritos band at 390 px (no sideways scroll). No page errors.
- **Open question:** a real site would probably save favourites to the account (and ask people to log in first). The prototype keeps them per browser so testing stays simple.
- **Decision record:** none.

### Change 47 — Profile page: banner removed — 2026-10-27

- **Prompt (verbatim):** On profile page, remove the banner
- **What changed:** the logo-collage strip under the breadcrumb on `/profile` is gone. The page now goes straight from the breadcrumb to "Hello, {name}!" and the tabs. Its CSS (the crop rules from change 42) is removed too. The image file `images/global/login-bg.webp` stays, because the login pages still use it.
- **Why:** user's request.
- **How AI was used:** Claude removed the banner element from `Profile.tsx` and its styles from `pages.css`, then ran the type check.
- **Files:** `prototype/src/pages/Profile.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc --noEmit` passes. Not checked: screenshots. The Playwright browser was in use by another session.
- **Decision record:** none.

### Change 47 — 7UP brand page: breadcrumb and newsletter on 7UP Green, not mint — 2026-10-27

- **Prompt (verbatim):** I dont like the secondary green for 7up's theme (currently used for breadcrumbs bar and up to date footer) Is there alternative? Is the current color real? — then: I liked the primary color, just not the secondary
- **What changed:**
  - On the 7UP brand page (`#/brands/7up`), the breadcrumb bar and the "Stay up to date" newsletter band now use the official 7UP Green `#00B74F` with black text, the same green as the navbar and footer. Before, they used a pale mint `#66D495`.
  - A brand can now set its own `shade` in `data/brands.ts`; brands without one keep the calculated shade. Only 7UP sets it.
  - The 7UP promotion page (`7up-weekend`, dark green `#185430` band with `#134225` bars) is unchanged.
- **Why:** user's request. The mint was not a 7UP colour: it was DERIVED (the band colour with 40% white, from change 21). The 7UP colour sheet in the Sponsor Files (node `18:17502`, "JOY HUB GLOBAL / DESIGN SYSTEM, MVP 2026") lists Primary 7UP Green `#00B74F`, Secondary 7UP Lime Green `#93C802` and Tertiary 7UP Green `#00A349`, all with black text. Claude offered Lime (official secondary) or Tertiary; the user preferred to keep the primary green.
- **How AI was used:** Claude traced the bar colour to the shade calculation in `state/chrome.ts`, read the 7UP colour sheet through the Figma MCP and the live-site CSS (`#00B74F` band, `#00A349` hero shapes) to check which greens are real, then added the per-brand override.
- **Files:** `prototype/src/data/brands.ts`, `prototype/src/state/chrome.ts`.
- **Checked by:** `tsc -b`. Headless Chromium at 1440 px (the shared Playwright browser was in use): full-page screenshots of the 7UP brand page (`--chrome-shade` reads `#00B74F`, text `#000000`) and the 7UP Weekend promotion (still `#185430` / `#134225`). No page errors.
- **Open question:** the 7UP promotion uses a made-up dark green (`#185430`) so white text passes, while the 7UP sheet says to use black text on 7UP Green. Switching the promotion to `#00B74F` with black text would match the sheet, but changes the hero, steps and teaser too.
- **Decision record:** none.

### Change 47 — Home: claim your reward after 4 entries — 2026-10-27

- **Prompt (verbatim):** ON the home page, once the user hits 4 promos, add a claim reward workflow
- **What changed:**
  - **Home hero:** once someone has made 4 entries, the hero reads "Reward unlocked!", the track bar is full and a yellow **Claim your reward** button sits under it. With more than one reward waiting it reads "Claim your rewards (2)". The bar stays full until the reward is claimed, then starts again at "4 entries to your next reward" (before, it emptied by itself at the 5th entry). All six hero options in the config menu (press C) get the button; on the ones with a "Find a promotion" button, the claim button takes its place while a reward waits.
  - **Claim modal, step 1 "Claim your reward":** a JOY blue ticket (yellow gift, "Bonus entry", "JOY monthly prize draw · 31.10.2026"), a line explaining why they earned it, and **Not now** / **Claim reward**.
  - **Step 2 "Reward claimed!":** blue check, "You're in the JOY monthly prize draw on 31.10.2026. We'll email <their email> if you win.", a reference (e.g. "JOY-SWF77X") and a toast. Buttons: **Find a promotion** (closes and scrolls to Suggested for you) and **Done**. If another reward is still waiting, the first button is **Claim next reward** instead.
  - **Result page:** the "reward unlocked" box now follows the same rule (full while a reward is waiting) and links "Claim it on your homepage".
  - **Fake store:** claimed rewards are saved per account (`claims` in `localStorage`, with reference and date). Rewards waiting = entries ÷ 4, rounded down, minus rewards claimed. Reset all data clears them.
  - **Moderator panel:** new "Test user, 4 entries (reward to claim)" button to jump straight to this state.
- **Why:** user's request. The bar promised a reward but nothing happened when it filled; claiming gives the 4th entry a payoff and a clear next step, which testers can now complete as a task.
- **How AI was used:** Claude added the claims list to the fake store, built one claim modal shared by all hero options, and tested the flow with Playwright.
- **Made up, needs a real rule (PROTOTYPE):** the draw date (31.10.2026, `REWARD_DRAW` in `config.ts`), the reference format and the "we'll email you" promise. The reward itself was already a placeholder (`REWARD_NAME`).
- **Files:** `prototype/src/components/promo/ClaimReward.tsx` (new), `prototype/src/components/promo/ProgressTracker.tsx`, `prototype/src/components/promo/HeroVariants.tsx`, `prototype/src/components/promo/promo.css`, `prototype/src/state/store.tsx`, `prototype/src/data/config.ts`, `prototype/src/pages/Result.tsx`, `prototype/src/pages/pages.css`, `prototype/src/moderator/ModeratorPanel.tsx`.
- **Checked by:** `tsc -b` (passes). Playwright from empty data at 1440 px: test user with 4 entries shows "Reward unlocked!", "4 / 4" and the claim button; step 1 and step 2 modals open with the right titles; after claiming, the hero reads "4 entries to your next reward" with no claim button, and still does after a reload; the claim is saved in `localStorage`. At 390 px with 8 entries: button reads "Claim your rewards (2)", "Claim next reward" appears after the first claim and "Find a promotion" after the second; no sideways scroll. Screenshots of hero, both modal steps (1440) and hero and step 1 (390) look right. No page errors. Not checked: the five other hero options visually, and the result page's link in the unlocked state.
- **Decision record:** none.

### Change 48 — 7UP brand page bars back to the mint (undoes change 47) — 2026-10-27

- **Prompt (verbatim):** revert to original 7-up that you had
- **What changed:** removed the per-brand `shade` override from change 47. The 7UP brand page's breadcrumb bar and "Stay up to date" band are back to the calculated mint `#66D495` (DERIVED: 7UP Green with 40% white) with black text. The code is the same as before change 47.
- **Why:** user's request after seeing the all-green version.
- **How AI was used:** Claude removed the change 47 edits and checked the computed colours again.
- **Files:** `prototype/src/data/brands.ts`, `prototype/src/state/chrome.ts`.
- **Checked by:** `tsc -b`. Headless Chromium at 1440 px: 7UP brand page `--chrome-shade` reads `#66d495`; 7UP Weekend promotion still `#185430` / `#134225`.
- **Decision record:** none.

### Change 49 — Promotion pages: FAQs and terms on white on dark-brand pages — 2026-10-27

- **Prompt (verbatim):** On the quaker oats individal promo page, the faq and terms sections need white bg
- **What changed:**
  - On the Quaker Mornings page (`#/promotions/quaker-mornings`), the FAQs and the terms box now sit in a full-width white band at the bottom of the page instead of on the navy brand colour. The FAQ heading, text and "Go to all FAQs" button switch to their light-background colours; the terms box keeps its light grey.
  - There is a navy gap between the steps and the white band, so the step pictures don't touch its edge.
  - This is the same white band change 43 added to ended promotion pages; it now starts at the FAQs and applies to every dark-brand promotion page (navy or black: Quaker, Pepsi, Walkers MAX). Quaker is the only active dark-brand promotion with FAQs, so for Pepsi and Walkers MAX it only affects the terms box. Light-brand pages (Doritos, JOY, 7UP, Lipton) look the same as before.
- **Why:** user's request. On the navy page the FAQ boxes and terms were white cards floating on dark, which made the bottom of the page feel heavy; the white band also matches how ended promotion pages already end.
- **How AI was used:** Claude moved the FAQs into the existing white "tail" wrapper (renamed `promo-ended-tail` to `promo-tail`, now always present), adjusted the gaps around it, and checked the result in headless Chromium.
- **Files:** `prototype/src/pages/PromoDetail.tsx`, `prototype/src/components/promo/promo.css`, `prototype/src/styles/site.css`.
- **Checked by:** `tsc --noEmit` passes. Headless Chromium (the shared Playwright browser was in use) at 1440 and 390 px on Quaker Mornings, Pepsi Music (ended) and Las Vegas Wrap (light brand): Quaker band `rgb(255, 255, 255)` on a `rgb(0, 39, 59)` page, FAQ title `#333`, text `#666`, button navy, terms `#F4F4F4`; Las Vegas Wrap unchanged (no band colour); no sideways scroll; no page errors. Screenshots looked right.
- **Decision record:** none.

### Change 50 — 7UP on its official colours: 7UP Green with black text, tertiary green as the second colour — 2026-10-27

- **Prompt (verbatim):** Use the primary green, but then the secondary mind should be changed to this: [Image #1] make sure changes apply to everything 7-up related
- **What changed:**
  - **Second colour:** the swatch the user sent is `#00A349`, the 7UP brand sheet's tertiary green (Sponsor Files `18:17502`). It replaces the DERIVED mint `#66D495` on the 7UP brand page and becomes the second colour on the 7UP promotion too: breadcrumb bar, section menu, "Stay up to date" band, and the participation and result page background. Black text on it (6.3:1).
  - **Main colour:** 7UP Green `#00B74F` everywhere: navbar, footer, brand-page welcome band, and now the 7UP Weekend promotion (hero band, step circles, teaser card, promotion cards), which used a DERIVED dark green `#185430` before.
  - **Text on 7UP Green is black** (7.9:1), as the 7UP sheet says ("Black text must be used on this green"). White fails (2.7:1). This includes the brand-page welcome band (the live site uses white there), the promotion hero, step circles, teaser, poster card (the "ends soon" time turns black instead of yellow) and the calendar icons.
  - **How:** `brands.ts` gets an optional `shade` (only 7UP sets it) used by `state/chrome.ts` for the bars and the participation background. `promos.ts` themes get an optional `text`, passed to CSS as `--promo-text` (white by default, so every other promotion looks the same as before). `promo.css` and `card-variants.css` use `--promo-text` where they had white; ended cards and teasers stay white on grey.
- **Why:** user's request. They liked the primary green but not the mint, and picked the tertiary green from the 7UP sheet as the second colour. Both colours are official (7UP brand sheet), not DERIVED.
- **How AI was used:** Claude read the swatch's pixel colour (`rgb(0, 163, 73)` = `#00A349`), matched it to the 7UP sheet, found every place the 7UP colours and the hard-coded white text are used, and checked the result with headless Chromium. Vite's file watcher missed one saved file (OneDrive), which showed up as the old colour in the first check; touching the file fixed it.
- **Files:** `prototype/src/data/brands.ts`, `prototype/src/data/promos.ts`, `prototype/src/state/chrome.ts`, `prototype/src/components/promo/PromoTeaser.tsx`, `prototype/src/components/promo/promo.css`, `prototype/src/components/promo/card-variants.css`, `prototype/src/pages/Participate.tsx`, `prototype/src/pages/Result.tsx`.
- **Checked by:** `tsc -b`. Headless Chromium at 1440 px: 7UP brand page and 7UP Weekend promotion read `--chrome-bg #00B74F`, text `#000000`, shade `#00A349`, shade text `#000000`; welcome band text `rgb(0, 0, 0)`; participation page (test login, removed after) background `rgb(0, 163, 73)`. Full-page screenshots of the brand page, promotion page and participation page; the 7UP poster card on Promotions and the 7UP teaser on Home. Promotion page at 390 px: no sideways scroll. No page errors. Not checked: the result page (same background rule as the participation page) and the other card designs in the config menu (same text-colour change).
- **Open question:** none. Both colours come from the 7UP brand sheet.
- **Decision record:** none.

### Change 51 — 7UP: white text on both greens — 2026-10-27

- **Prompt (verbatim):** make text white
- **What changed:** all text on the 7UP greens (`#00B74F` and `#00A349`) is white instead of black: navbar, breadcrumb, section menu, newsletter, footer, brand-page welcome band, promotion hero, step circles, teaser and poster card, the participation and result pages, and the text on filled green buttons ("Submit code"). The JOY logo in the navbar is white again. The colours themselves are unchanged from change 50. Links and outlines on white keep their dark green (`#00893B`).
  - `brands.ts` gets an optional `text` (only 7UP sets it, `#FFFFFF`); `state/chrome.ts` uses it instead of the 4.5:1 rule for the bars, the participation background and the page theme. The 7UP promotion theme's `text` is `#FFFFFF`, so its "ends soon" card time stays white instead of yellow.
- **Why:** user's request. It matches the live site, which uses white text on 7UP Green. **Contrast:** white fails WCAG AA for normal text on both greens: 2.7:1 on `#00B74F`, 3.3:1 on `#00A349` (passes only for large text, 18.66 px bold and up). The 7UP brand sheet asks for black text.
- **How AI was used:** Claude added the per-brand text override and checked the result in headless Chromium.
- **Files:** `prototype/src/data/brands.ts`, `prototype/src/data/promos.ts`, `prototype/src/state/chrome.ts`.
- **Checked by:** `tsc -b`. Headless Chromium at 1440 px: 7UP brand page, promotion and participation page (test login, removed after) read text `#FFFFFF` on `#00B74F` and shade text `#FFFFFF` on `#00A349`; welcome band text `rgb(255, 255, 255)`. Screenshots of the promotion page, poster card, Home teaser and participation page. Promotion page at 390 px: no sideways scroll. No page errors.
- **Open question:** white text fails contrast on both 7UP greens (see Why). Fine for the usability test, but worth a note for accessibility.
- **Decision record:** none.

### Change 51 — Home hero: "Every 4 entries…" line moved down — 2026-10-27

- **Prompt (verbatim):** ON home page hero, move the every 4 entries.. label down slightly
- **What changed:** on the logged-in home hero (track design, the default), the small line "Every 4 entries earns a bonus entry into the JOY monthly prize draw." now has 28px of space above it instead of 12px, so it no longer sits right under the "ENTRY 1–3 / REWARD" labels. The other hero designs in the config menu are unchanged.
- **Why:** user's request. The line was crowding the track labels.
- **How AI was used:** Claude added one CSS rule scoped to the track hero and checked it in the browser.
- **Files:** `prototype/src/components/promo/hero-variants.css`.
- **Checked by:** Playwright at 1440 px (test user, 3 entries): margin reads 28px, the line starts about 18px below the lowest track label (was about 2px). Screenshots at 1440 and 390 px look right.
- **Decision record:** none.

### Change 52 — Promotions page: more space between the promotion grid and the footer — 2026-10-27

- **Prompt (verbatim):** on promotions page, add more gap between the grid of promos and the footer
- **What changed:** on `#/promotions`, the space below the "All promotions" grid (before the "Stay up to date" band and footer) goes from 64 px to 120 px. Nothing else on the page moves.
- **Why:** user's request. The last row of cards sat close to the blue newsletter band.
- **How AI was used:** Claude found the section's bottom padding in `Promotions.tsx`, raised it, and checked the result with a headless Chromium screenshot.
- **Files:** `prototype/src/pages/Promotions.tsx`.
- **Checked by:** full-page headless Chromium screenshot at 1440 px (the shared Playwright browser was in use): 120 px gap between the bottom of the last card row and the newsletter band. Not checked at 390 px (same padding applies at every width).
- **Decision record:** none.

### Change 53 — Home hero: "Every 4 entries…" line moved down a bit more — 2026-10-27

- **Prompt (verbatim):** on home page hero, move the every 4 entries label down slightly
- **What changed:** on the logged-in home hero (track design, the default), the line "Every 4 entries earns a bonus entry into the JOY monthly prize draw." sits 16 px lower. The space under the progress track goes from 72 to 88 px on desktop and from 64 to 80 px on mobile. That leaves about 34 px between the "ENTRY 1–3 / REWARD" labels and the line at 1440 px (was 18) and about 39 px at 390 px.
  - Change 51's 28 px top margin on the line never showed, because it collapses into the track's larger bottom margin. The space has to come from the track's bottom margin. The 28 px rule stays, since it still applies when the "Claim reward" button sits between the track and the line.
- **Why:** user's request.
- **How AI was used:** Claude measured the gap in the browser, found the margin collapse, and moved the space onto the track.
- **Files:** `prototype/src/components/promo/hero-variants.css`.
- **Checked by:** Playwright (logged-in test user, 3 entries). At 1440 px the track's bottom margin reads 88 px, the gap is 34 px, and an element screenshot looks right. At 390 px the margin is 80 px, the gap is 39 px, and there's no sideways scroll.
- **Decision record:** none.

### Change 54 — Promotions hero: click the left or right side to change slide — 2026-10-27

- **Prompt (verbatim):** On the promotions page hero, clicking on the left/right of the hero should control the carosel as well.
- **What changed:** clicking anywhere on the left half of the hero carousel shows the previous slide; the right half shows the next one. It wraps around (back from the first slide goes to the last). The mouse cursor turns into a left or right arrow to show which way a click will go. Clicking "See more" still opens the promotion, and the dots still work. This is the shared `HeroCarousel`, so the logged-in Home hero gets the same behaviour when it has more than one slide; a single-slide hero is unchanged.
- **Why:** user's request. A large click area is easier to find than the small dots.
- **How AI was used:** Claude added a click handler that checks which half of the hero was clicked and skips clicks on links and buttons. The first browser test found a crash (the click position was read after React had released the event), which Claude fixed before logging.
- **Files:** `prototype/src/components/promo/HeroCarousel.tsx`, `prototype/src/components/promo/promo.css`.
- **Checked by:** `tsc -b`. Headless Chromium at 1440 and 390 px on `#/promotions` (5 slides, starts on slide 2): right click → 3, right → 4, left → 3; left from slide 1 wraps to slide 5; cursor reads `e-resize` / `w-resize`; a dot still selects its slide; "See more" opens the promotion page. No page errors. Keyboard users still use the dots (the click areas are a mouse and touch shortcut only).
- **Decision record:** none.

### Change 55 — Navbar "Hi Sam" is a plain link; Log out added to the profile page list — 2026-10-27

- **Prompt (verbatim):** ON the nav bar, change the profile tab to a normal button instead of a dropdown. In the profile page, add Log out as an option  on the right list.
- **What changed:**
  - Navbar (logged in, desktop): "Hi Sam" is now a plain link to the profile page. The chevron and the dropdown (My profile / My entries / Log out) are gone. Hover still underlines it, and it's bold while you're on the profile page. The phone menu is unchanged (it already had "My profile" and "Log out").
  - Profile page: "Log out" is added under My details / My entries / Settings, with the same look as those items. It sits outside the tab list for screen readers, because it isn't a tab. The Log out button in Settings stays.
  - Fix: logging out from the profile page now goes to Home. Before, it went to the Login page, because the profile page's "not logged in" redirect ran before the move to Home (the page change waits for its fade).
  - The CSS for the removed dropdown is deleted.
- **Why:** user's request. The dropdown's only other job (Log out) needed a new home, so it moves to the profile page list.
- **How AI was used:** Claude replaced the dropdown with a link, added the list item, removed the unused CSS, and found and fixed the logout redirect during browser testing.
- **Files:** `prototype/src/components/layout/Navbar.tsx`, `prototype/src/components/layout/layout.css`, `prototype/src/pages/Profile.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc -b`. Headless Chromium (test user, 3 entries): at 1440 px the navbar has no buttons in the session area, and "Hi Sam" links to `#/profile` and opens it. Log out on the profile list goes to `#/` with Login/Register showing. At 390 px, Log out goes to `#/`. Screenshots at both widths look right. No page errors.
- **Decision record:** none.

### Change 56 — Profile page: "Log out" in red — 2026-10-27

- **Prompt (verbatim):** change log out color to red
- **What changed:** the "Log out" item in the profile page list (added in change 55) now uses the error red `var(--color-feedback-error)` (#B21119) for its text and icon, the same red as "Delete profile". The hover underline is red too. The Log out button in the Settings tab is unchanged.
- **Why:** user's request. Red sets it apart from the three tabs above it.
- **How AI was used:** Claude added one CSS rule using the existing error token and checked it in the browser.
- **Files:** `prototype/src/pages/pages.css`.
- **Checked by:** headless Chromium screenshot at 1440 px of `#/profile`: Log out shows in red under the tabs, and clicking it still goes to `#/`. The 390 px run also passes (same rule at every width).
- **Decision record:** none.

### Change 56 — Promotions hero: normal cursor (undoes change 54's arrow cursors) — 2026-10-27

- **Prompt (verbatim):** on the promotions page, dont change the cursor on the hero banner
- **What changed:** the mouse cursor no longer turns into a left or right arrow over the hero carousel. It stays the normal arrow, and links and buttons inside the hero still show the hand. Clicking the left or right half still changes slide (change 54 is otherwise kept). The mouse-move tracking that only set the arrow is removed.
- **Why:** user's request.
- **How AI was used:** Claude removed the cursor CSS and the mouse-move handler, and folded the left/right check into the click handler.
- **Files:** `prototype/src/components/promo/HeroCarousel.tsx`, `prototype/src/components/promo/promo.css`.
- **Checked by:** `tsc -b`. Headless Chromium at 1440 px on `#/promotions`: cursor reads `auto` at 20% and 80% across the hero, "See more" link reads `pointer`; right click goes slide 2 → 3, left click 3 → 2. No page errors.
- **Decision record:** none.

### Change 57 — Profile page: open tab no longer underlined — 2026-10-27

- **Prompt (verbatim):** remove underline from only the active state (follow-up to "remove the udnerline from the active state/hover effect", which the user interrupted and narrowed)
- **What changed:** in the profile page list (My details / My entries / Settings / Log out), the open tab is shown only by bold blue text, with no underline, even on hover. Hovering any other item still fades in the underline, as before.
- **Why:** user's request.
- **How AI was used:** Claude limited the hover underline rule to tabs that aren't open and checked the computed styles in the browser.
- **Files:** `prototype/src/pages/pages.css`.
- **Checked by:** headless Chromium at 1440 px (test user): the open tab's underline colour is transparent at rest and on hover. A hovered closed tab shows its underline (rgb 51,51,51). Element screenshot looks right.
- **Decision record:** none.

### Change 59 — Logged-out home hero: whole photo, flush right, like the live site — 2026-10-27

- **Prompt (verbatim):** On the non-logged in screen, the right side of the hero image content is cutoff
- **Follow-up (verbatim):** Undo?? this is how it's supposed to look [screenshot of the live-site JOY hero]
- **What changed:** the first attempt (a smaller circle moved in from the edge) was undone. On desktop (992 px and wider), the JOY "Register to participate" hero now shows the whole photo instead of a circle crop. The photo is flush to the right edge and sits on the bottom curve, so her raised arm, the purple ✕ and her jeans are all visible. Only its left side is cut, by a large curve. The photo is 631 px wide (its width at the 715 px hero height) and shrinks to 46% of the window below about 1370 px so it doesn't run under the text. Promo slides and mobile are unchanged.
- **Why:** the live site shows this photo whole (`brand-joy .right-column .hero-image`: image `width: auto; max-height: 725px`, left edge cut by `Brabd-Hero-desktop-mask.png`). The old 950 px circle crop cut her side off at the right edge and her head at the top.
- **How AI was used:** Claude read the live-site CSS rule and tried to download the mask PNG, but the live site returns 403 to scripts and to the test browser. So Claude measured the user's screenshot against the source photo (scale 0.746, curve crossing the top at 30% of the width, leftmost point at 54% of the height) and rebuilt the curve as `clip-path: circle(74% at 79% 54.5%)` on a new `hero-slide--joy` class.
- **Files:** `prototype/src/components/promo/HeroCarousel.tsx`, `prototype/src/components/promo/promo.css`.
- **Checked by:** `tsc --noEmit`. Playwright screenshots of logged-out `#/` at 1024, 1440 and 1920 px: the whole photo shows, flush right, with the curved left edge, and at 1024 px it stays clear of the text. 390 px is unchanged.
- **Decision record:** none. The curve is an approximation of the live-site mask (NEEDS SOURCE for the exact PNG if it matters).

### Change 58 — Config menu: five progress bar styles for the home hero and the result page — 2026-10-27

- **Prompt (verbatim):** on the logged in home page, I like the current hero section, however I dont like the styling of the progress bar itself. Add to the config menu 5 variants of only the progress bar, that will update the variant in the hero as well as the participation results screen.
- **What changed:** a new **Progress bar** section in the design config menu (press C). It has six choices: Original plus five new styles. The choice swaps only the bar. The headline, greeting, "Claim your reward" button and the rest of the hero stay the same. It applies on the C · Big track home hero (the default) and in the "to your next JOY reward" box on the result page after entering a code.
  - **Original** (default, unchanged): chunky yellow track with big dots and an "n / 4" bubble.
  - **A · Slim line:** thin rail with small dots, an "n of 4 entries" count above, and a gift dot at the end.
  - **B · Segments:** one rounded block per entry with a gap between, labels underneath with a tick once done. The reward block has a yellow outline until it's earned.
  - **C · Stepper:** numbered circles joined by lines. Done entries are yellow with a tick, and the next entry is white with a soft ring. The reward circle is purple and turns yellow once earned.
  - **D · Meter card:** a soft see-through panel with a big "n/4 entries" count, a 4-part bar and a gift tile that turns yellow and pulses once earned. On phones and in the narrow result box, the bar moves under the count so its labels don't collide.
  - **E · Tickets:** one ticket per entry, with side notches and a dashed inner line. A ticket turns yellow with a tick once used, and the last ticket (purple) is the reward. In narrow spaces the icon stacks over the label.
  - The menu also has two buttons: **Home hero** (switches to the Big track hero and opens Home) and **Latest result** (opens the result page of the test user's newest entry).
  - All styles use the same JOY colours as the hero (yellow, purple, navy, white on the dark blue). They keep the progress bar role and label for screen readers, and they keep the "bar stays full while a reward waits to be claimed" rule (change 47).
- **Why:** user's request. They like the hero but not the bar, so only the bar is up for exploration.
- **How AI was used:** Claude designed the five styles. It added a `RewardBar` component that picks the style from the config setting, and pointed the hero and result page at it. It screenshotted every style at 0–4 entries, at 1440 and 390 px, on both screens, then fixed the collisions it found: Meter card labels on phones and in the result box, and ticket labels cut off in the result box.
- **Files:** `prototype/src/components/promo/RewardBar.tsx` (new), `prototype/src/components/promo/reward-bar.css` (new), `prototype/src/state/design.tsx`, `prototype/src/moderator/ConfigPanel.tsx`, `prototype/src/components/promo/HeroVariants.tsx`, `prototype/src/components/promo/hero-variants.css`, `prototype/src/pages/Result.tsx`, `prototype/src/pages/pages.css`.
- **Checked by:** `tsc -b`. Headless Chromium, test user with 2 entries (part way) and 4 entries (reward unlocked), every style, Home hero and result page, at 1440 and 390 px: element screenshots look right after the fixes above, there's no sideways scroll, and there are no page errors.
- **Decision record:** none. This is an exploration; the default stays Original until the team picks one.

### Change 60 — Logged-in home: "Suggested for you" shows 3 promotions — 2026-10-27

- **Prompt (verbatim):** On the logged in home page, the suggested for you should only have 3 promos
- **What changed:** "Suggested for you" now shows at most 3 promotions, so it's one row on desktop. The order is the same as before: promotions you haven't entered yet, with your hearted brands first. The "See all promotions" link beside the heading leads to the rest. If you've entered every active promotion, the empty message still shows.
- **Why:** user's request. It also matches "Your entries", which already shows 3.
- **How AI was used:** Claude added `.slice(0, 3)` after the favourite-brand sort in the logged-in home.
- **Files:** `prototype/src/pages/Home.tsx`.
- **Checked by:** `tsc --noEmit` (passes). The browser check was skipped because another session was using the Playwright browser.
- **Decision record:** none.

### Change 61 — Logged-out home: "Current promotions" shows 3 promotions — 2026-10-27

- **Prompt (verbatim):** On the non logged in home, the current promotions section should only have 3 cards,
- **What changed:** "Current promotions" on the logged-out home now shows only the first 3 active promotions, in the same curated order and with the same alternating left/right layout. The "See all promotions" button under them leads to the rest.
- **Why:** user's request. It matches the logged-in home, where "Suggested for you" shows 3 (change 60).
- **How AI was used:** Claude added `.slice(0, 3)` to the active promotions list in the logged-out home.
- **Files:** `prototype/src/pages/Home.tsx`.
- **Checked by:** `tsc --noEmit` (passes). No browser check.
- **Decision record:** none.

### Change 62 — Progress bar default is now D · Meter card — 2026-10-27

- **Prompt (verbatim):** set defauly progress bar to meter card
- **What changed:** the progress bar on the Big track home hero and the result page now shows **D · Meter card** by default instead of Original. The config menu (press C) marks Meter card as the default, and the other styles can still be picked there.- **Why:** user's request. The team picked Meter card from the five styles in change 58.
- **How AI was used:** Claude changed the default in the design settings and moved the "Default." note in the menu. It also renamed the saved-settings key (v2 → v3), because every browser had already saved "Original" and would otherwise keep showing it. Side effect: any config menu choices a tester made before (hero, card, global elements) go back to their defaults once.
- **Files:** `prototype/src/state/design.tsx`.
- **Checked by:** `tsc --noEmit` (passes). No browser check.
- **Decision record:** none.

---

## Save state 2 — "pre-testing" — 2026-10-27

**Title:** pre-testing. The prototype right before usability testing.
**Code at this state:** commit "prototype save state 2: pre-testing", which adds this entry. It also includes changes 57–62, which weren't committed before.
**Screenshots (taken 2026-10-27):** `docs/save-states/save-state-2/desktop-1440/` and `docs/save-states/save-state-2/mobile-390/` (32 pages each, full page). The method and the list of screenshots are in `docs/save-states/save-state-2/README.md`.

### The prompt (verbatim)

> preform a save state right now on current, title it pre-testing

### Summary

Since save state 1, 62 prompts (changes 1–62, on 2026-10-26 and 2026-10-27) polished the prototype page by page and added the features the team wants to test. The look still follows the live site. A few experiments sit on top, and the team can switch them or review them before testing.

- **Home, logged out:** one "Register to participate" hero that shows the whole photo, like the live site (59). One merged "Creating Joy" section (1–3). "Current promotions" cut to 3 (61).
- **Home, logged in:** a "Hi Sam!" hero with a reward progress bar (37, 38, 51, 53). "Claim your reward" after every 4 entries (47). The Meter card bar is the default (58, 62). "Suggested for you" is cut to 3 (60), and the page ends after "Your entries" (6).
- **Navigation:** a Home tab, centred tabs and an underlined active tab (7, 16). "Hi Sam" is a plain link, and Log out moved to the profile page (55–57). Brand logo in the navbar (32).
- **Promotions:** the heading sits above the Brand, Promotion type and Sort filters. One 3-column grid lists ended promotions last (8–10, 52). Every card is clickable (31). Hero slides change when you click the left or right side (54, 56).
- **Promotion pages:** prizes come first, and the hero has the live-site curve. Section gaps are even. A sticky section menu takes the navbar's place while you scroll (13, 28, 29, 33–35, 44, 45). Dark-brand pages use the brand colour, with FAQs and terms on white (21, 25–27, 43, 49).
- **Entering a code:** one centred participate column (14). A brand-specific "Calculating your results" animation (24). A clearer result page with the reward bar (15, 39, 46).
- **Brands:** a "Promos from other brands" carousel (21, 22) and the hero curve on brand pages (30). Heart a brand to see its promotions first (46).
- **New test content:** three placeholder active promotions for 7UP, Lipton and Quaker. 7UP uses its official colours (46, 50, 51).
- **Design config menu (press C):** 5 home hero, 5 promotion card and 6 progress bar styles to compare (17, 18, 58). The defaults are the Big track hero, Poster cards and the Meter card bar.
- **Motion:** page crossfades, transitions on menus, the accordion and the carousel, and hover states (23, 24).

### Open questions at this state

- Changes 21 and 25–27 put the brand colour on the navbar, breadcrumb, newsletter, footer and page background of promotion and brand pages. Keeping them would replace D36 ("JOY blue on every page"). There's no decision record for this yet.
- The reward rule (every 4 entries earns a bonus entry into the JOY monthly draw) and the draw date are still made up (D39).
- The curve on the logged-out hero is an approximation of the live-site mask (NEEDS SOURCE for the exact image).
- The 7UP, Lipton and Quaker promotions are placeholders, not live-site content.

## Changes after save state 2
