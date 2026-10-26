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
