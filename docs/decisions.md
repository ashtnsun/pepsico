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

## D18 — Three Theme tokens added for Button

- **Decision:** Add `color/text/link-pressed` (JOY `#1443FF`, Doritos `#E31722`, Rockstar `#000000`), `color/text/on-action-inverse-pressed` (JOY `#0024B5`, Doritos `#FA7115`, Rockstar `#B64F9B`) and `color/border/action-inverse` (white for all brands).
- **Options considered:** reuse existing tokens. That would make JOY's pressed label on a white button disappear, and Doritos outline/link buttons would turn orange on white, which fails contrast.
- **Why:** These are needed to match the Doritos CTA spec states without invented colors. The user approved all three.
- **Date:** 2026-10-14

## D19 — Primary hover underlines the label for every brand

- **Decision:** On hover, the Primary button's label is underlined for JOY, Doritos and Rockstar. JOY also darkens to `#0E38DF`.
- **Options considered:** (a) underline for all brands; (b) no underline anywhere.
- **Why:** Figma can't switch an underline on and off per brand mode, so we had to pick one behavior. Underlining matches the outline button's hover in the Doritos sheet. Chosen by the user.
- **Date:** 2026-10-14

## D20 — Placeholder chevron icon until an icon set is chosen

- **Decision:** Create one `Icon/Chevron Down` component (16 px) on an `Icons` page, using the arrow shape from the Doritos sheet (`18:24504`). Button has swappable left/right icon slots, off by default.
- **Options considered:** (a) placeholder icon; (b) no icons until the set is chosen.
- **Why:** Lets us build and test the icon slots now; swapping in the real set later doesn't change the Button. Chosen by the user.
- **Date:** 2026-10-14

## D21 — Focus ring sits outside the button

- **Decision:** Focus is a 2px ring 2px outside the button (CSS `outline` + `outline-offset: 2px`), colored `color/border/focus` (light background) or `color/border/focus-inverse` (dark background).
- **Options considered:** (a) recolor the button's own border, as the Doritos sheet draws it; (b) an outside ring.
- **Why:** An inside ring disappears on JOY's white button on dark backgrounds (white ring on white) and is weak on JOY blue (about 2.8:1). An outside ring is measured against the page background, so it passes in every brand. It also gives text links a focus indicator, which the sheet lacks (D10).
- **Date:** 2026-10-14

## D22 — In Figma, underlines are a separate layer

- **Decision:** Button labels use no text decoration in Figma. A 1.5px "Underline" layer, colored with the label's token, is shown on the variants that need it. Code uses `text-decoration: underline`.
- **Options considered:** (a) text decoration plus a shared `Label` text property; (b) text decoration with no text property; (c) an underline layer plus the text property.
- **Why:** Tested in Prompt 4: Figma copies text formatting across every variant that shares a text property, so underlines can't differ per variant with option (a). Option (c) keeps the easy-to-edit Label property.
- **Date:** 2026-10-14

## D23 — Button has one size (44px) and no Size property

- **Decision:** Button is a single size: padding 12/20 with the Label line height of 20 gives a 44px height. There's no `Size` variant property.
- **Options considered:** (a) one size; (b) invent Small/Medium/Large.
- **Why:** Every source shows one size: JOY frames 44px, the Doritos sheet 42px (its line height is 18). Extra sizes would be invented values. Can be added later if designs need them.
- **Date:** 2026-10-14

## D24 — Icon Button: one filled style, 48px, follows the Doritos sheet

- **Decision:** Icon Button has only `Background` (Light/Dark) and `State` properties. There's no Variant property and one size (48px). It uses the same tokens as the Primary Button, an `Icon` swap property, and the outside focus ring (D21). Doritos and Rockstar don't change on hover; JOY darkens.
- **Options considered:** (a) follow the Doritos sheet (48px, filled only); (b) the JOY frames' 42px arrow buttons; (c) add outline/text variants.
- **Why:** The sheet is the only spec with all states. 48px also meets touch-target guidance. The JOY frames' 40%-opacity "unavailable" arrows map to the Disabled state.
- **Date:** 2026-10-14

## D25 — A Foundations page documents every token and style visually

- **Decision:** Add a `Foundations` page (after Page 1) showing: Theme colors by role with a swatch per brand mode; Primitives by family; the font family; all 9 text styles with samples; and the spacing, radius, border width and opacity scales. Every sample is bound to the real variable or style.
- **Options considered:** (a) a static picture; (b) a page built from bound samples.
- **Why:** Requested by the user. Bound samples keep the page correct when tokens change. Hex values and alias names are typed text, so re-run the page build if Primitive values change.
- **Date:** 2026-10-14
