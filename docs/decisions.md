# Decisions

Every project decision goes here: what we decided, what else we considered, why, and when. Newest at the bottom.

---

## D1 — One Theme collection with a mode per brand

- **Decision:** Brand theming uses one `2. Theme` variable collection with a mode per brand: `JOY` (default), `Doritos`, `Rockstar`.
- **Options considered:** (a) one Theme collection with brand modes; (b) extended collections, one per brand; (c) a separate library file per brand.
- **Why:** Extended collections are Enterprise-only and we're on a student plan, so modes are the simplest option that works.
- **Date:** 2026-10-13

## D2 — Make Kit comes from the published Figma library

- **Decision:** The Figma Make Kit is assembled from the published Figma library, not from an npm package.
- **Options considered:** (a) published Figma library plus guidelines `.md` files; (b) a coded npm component package.
- **Why:** This phase delivers Figma foundations, not production code, so the library and written guidelines are the source Make rebuilds from.
- **Date:** 2026-10-13

## D3 — Two token layers plus a Scale collection, no component tokens yet

- **Decision:** Tokens use two layers (`1. Primitives` → `2. Theme`) plus a `3. Scale` collection. No component-level tokens for now.
- **Options considered:** (a) Primitives → Theme + Scale; (b) Primitives → Theme → Component tokens.
- **Why:** Two layers are enough to theme 3 brands and are easier for a team that's new to design systems. Component tokens can be added later if we need them.
- **Date:** 2026-10-13

## D4 — Phase 1 covers 8 core components

- **Decision:** Phase 1 builds Button, Icon Button, Text Field, Accordion, Card (Step, Prize, Content), Badge, Breadcrumb, and Pagination Dots.
- **Options considered:** (a) these 8 core components; (b) also the page-level patterns (Navbar, Footer, Newsletter, Promo Hero, and others).
- **Why:** These are the building blocks the current promo pages use most. The larger patterns are built from them, so they move to Phase 2.
- **Date:** 2026-10-13

## D5 — Inter is the placeholder font until Galano Grotesque is sourced

- **Decision:** Use Inter as a placeholder font family in Figma until Galano Grotesque (the live site's font) is available in the file.
- **Options considered:** (a) install licensed Galano Grotesque on every editor's machine now; (b) use Inter as a placeholder; (c) pick another fallback font.
- **Why:** Galano Grotesque isn't available in the AI-Assisted Design System file, and it's a paid font. Inter is free, ships with Figma, and has every weight we might need, so text work can go ahead now.
- **How to swap later:** keep the font family in one Primitive (for example `font/family/brand`) so replacing Inter means changing one value, not every text style.
- **Date:** 2026-10-13

## D6 — Existing site screenshots live in references/live-site/

- **Decision:** Move the 13 screenshots from `references/screenshots/` to `references/live-site/`.
- **Options considered:** (a) keep them in `references/screenshots/`; (b) move them into `references/live-site/`.
- **Why:** CLAUDE.md says live-site captures go in `references/live-site/`, and having one folder for them is easier to find.
- **Date:** 2026-10-13

## D7 — JOY blue is #1443FF

- **Decision:** JOY's main blue is `#1443FF`.
- **Options considered:** (a) `#1442FF` from the JOY palette frame `18:20865`; (b) `#1443FF` from the Figma promo frames and the live site.
- **Why:** It's the value actually used in the designs and in production. The two differ by one digit and look the same, so matching what ships avoids confusion.
- **Date:** 2026-10-14

## D8 — JOY hover and pressed colors

- **Decision:** JOY primary hover = `#0E38DF`, pressed = `#0024B5`.
- **Options considered:** (a) these two sourced blues; (b) the site's Bootstrap hover `#0023AD`; (c) compute new shades.
- **Why:** Both colors already appear in the Figma frames, the Doritos sheet's navigation and the live site. Only the hover/pressed roles are new, and white text passes AAA on both.
- **Date:** 2026-10-14

## D9 — Doritos and Rockstar hover follow the Doritos sheet, plus an underline on filled buttons

- **Decision:** Use the Doritos CTA spec for hover/pressed (outline buttons underline on hover; pressed text turns the accent color). Also underline the filled button's label on hover, because the sheet gives filled buttons no hover change. Rockstar follows the same pattern with violet as its accent.
- **Options considered:** (a) the sheet exactly, with no filled hover; (b) the sheet plus an underline on filled hover; (c) derive hover fill colors.
- **Why:** Every button should react to hover, and an underline needs no invented colors.
- **Date:** 2026-10-14

## D10 — Focus colors

- **Decision:** JOY focus = JOY Dark Blue `#0A0F36` on light backgrounds, white on dark. Doritos = red `#E31722` on light, orange `#FA7115` on dark. Rockstar = violet `#B64F9B` on both. Text links also get a visible focus ring.
- **Options considered:** (a) the site's cyan `#00E0F3`; (b) the colors above.
- **Why:** The site's cyan fails contrast on white (1.62:1). The chosen colors all pass the 3:1 focus-indicator rule against their background, and the Doritos sheet already uses red and orange this way.
- **Date:** 2026-10-14

## D11 — Disabled = 30% opacity, with an opacity Scale token

- **Decision:** Every brand shows disabled controls at 30% opacity, stored as `opacity/disabled` = 0.3 in `3. Scale`.
- **Options considered:** (a) opacity; (b) separate disabled colors per brand (the site's `#ADBDFF`).
- **Why:** The Doritos sheet uses 30% opacity, it works for every brand with no invented colors, and a token keeps it from being hardcoded. This adds an opacity group to the Scale collection (approved).
- **Date:** 2026-10-14

## D12 — Button and nav labels are UPPERCASE

- **Decision:** The `Label` text style is UPPERCASE.
- **Options considered:** (a) UPPERCASE (live site, JOY frames); (b) sentence case (Doritos sheet).
- **Why:** That's what JOY uses today. Text case can't change per brand mode, so we had to pick one.
- **Date:** 2026-10-14

## D13 — Keep Caption and Body/S as they're used today

- **Decision:** Keep both styles at their current values: `Caption` = Regular 14/16 (mobile frames, 18 uses) and `Body/S` = Regular 14/18 (desktop frame).
- **Options considered:** (a) drop Caption; (b) keep both as used now.
- **Why:** Both are in use in the current designs.
- **Date:** 2026-10-14

## D14 — Desktop text styles only; mobile sizes go in the guidelines

- **Decision:** Text styles use desktop sizes. Mobile sizes (for example headings 36 → 24) are written in the guidelines, not built as a second Scale mode.
- **Options considered:** (a) desktop only; (b) a "Mobile" mode on `3. Scale`.
- **Why:** A second mode would change the agreed architecture and add complexity for a team new to design systems. It can be added later.
- **Date:** 2026-10-14

## D15 — "Active" badge uses JOY Green with JOY Dark Blue text

- **Decision:** The Active badge is JOY Green `#EBFF40` with JOY Dark Blue `#0A0F36` text (16.67:1). The Ended badge stays `#B21119` with white text (7.03:1).
- **Options considered:** JOY Blue (but that's the button color, so badges could look clickable); JOY Purple; JOY Green.
- **Why:** The user asked for a color from the JOY palette. Green reads as "live/active", looks nothing like the red Ended badge or the blue buttons, and the text has very high contrast. One trade-off: the green pill's edge is faint on white (1.11:1). The text carries the meaning, so that's acceptable for a non-interactive badge.
- **Date:** 2026-10-14

## D16 — Text tokens can also color icons

- **Decision:** `color/text/*` Theme tokens are scoped to text fill, shape fill and stroke color, not text only.
- **Options considered:** (a) text fill only, plus separate `color/icon/*` tokens; (b) let text tokens color icons too.
- **Why:** CLAUDE.md says icon color always comes from a Theme text token. Separate icon tokens would duplicate every text color.
- **Date:** 2026-10-14

## D17 — Token JSON keeps one Theme file with every mode listed

- **Decision:** `tokens/theme.json` holds each token once. `$value` is the JOY (default) value, and `$extensions.com.figma.modes` lists the JOY, Doritos and Rockstar values. Opacity is 0–1 in JSON and a percentage (30) in Figma.
- **Options considered:** (a) one file per brand; (b) one file with modes in `$extensions`.
- **Why:** CLAUDE.md names a single `theme.json`, and one file keeps the three brands side by side so differences are easy to review.
- **Date:** 2026-10-14
