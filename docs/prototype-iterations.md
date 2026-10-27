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
