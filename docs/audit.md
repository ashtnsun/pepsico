# Audit: JOY Design System foundations

**Date:** 2026-10-14 · **Status:** draft for review. Nothing in this document has been built yet.

This audit lists every color, type style, size and component pattern we found in the sources, compares the sources with each other, and proposes a token list. Each proposed value is marked:

- **SOURCED**: copied exactly from a brand sheet, a Figma frame or the live site (source given).
- **DERIVED**: worked out from sourced values (for example by picking a role for a sourced color). Needs approval before we build it.
- **NEEDS SOURCE**: no source exists. Someone has to supply it.

---

## 1. Sources reviewed

| Source | Where | What it gave us |
| --- | --- | --- |
| **JOY palette and contrast matrix** | Sponsor Files › page "Brand guides/elements" › frame `JOY` `18:20865` | The 8 official JOY colors with a full contrast matrix. **New find:** CLAUDE.md said there was no JOY base sheet. This frame isn't a full sheet (no CTA or nav spec), but it is the official JOY color list. Screenshot: `docs/screenshots/audit-joy-palette-18-20865.png` |
| **Doritos brand sheet** | `18:16576` | Colors, contrast matrix, CTA spec (3 styles × 5 states × light/dark), navigation with brand band, 48px icon buttons. Screenshots: `audit-doritos-cta-spec-18-16787.png`, `audit-doritos-navigation-18-16849.png` |
| **Rockstar brand sheet** | `18:17654` | Black `#000000` (white text only) and Violet `#B64F9B` (black or white text). Colors only. |
| **Other brand sheets** (not in scope) | Same page | Full sheets: Elma Classic Chips, Cheetos, Tostitos. Color sheets: 7UP, Duyvis, Flamin' Hot (×2), Popworks, Star, Walkers, Żabka, Ruffles, Pala Pala. Contrast matrices: Lay's `18:18323`, Pepsi `18:20223`, Lipton and 15 others. Useful when more brands are added. |
| **Desktop active promo page** | Sponsor Files › "Promotion Pages/Flow" › `18:4470` | Type, spacing, radius and color use in context; anatomy of breadcrumb, accordion, pagination dots, step/prize/content cards, text field and arrow buttons. |
| **Closed promo page** | `18:4704` | The **"Ended" badge**. |
| **Mobile promo page** | `18:4619` | Mobile type sizes. |
| **Live site** | `references/live-site/` (Prompt 0.5) | Rendered values, hover/focus states, breakpoints. |
| **Wireframes** | `IMEy8gioQJFpGIgb9qIUJe` | Wishlist only (see section 7). |
| **AI-Assisted Design System** | `AJ0GKjFjDNvEsD4MfdyZaN` | Empty. No variables, styles or nodes. |

None of the three Figma files has local variables or styles; every value is typed in by hand.

---

## 2. Answers to the open questions from Prompt 0.5

| # | Question | Finding | Status |
| --- | --- | --- | --- |
| 1 | Button radius and padding | Figma frames use **radius 32, padding 12/20** (12 buttons in `18:4470`, every cell of the Doritos CTA spec). The live site uses radius 44, padding 0/24, height 45. CLAUDE.md says the frames win, so use 32 and 12/20. At these sizes both look like a full pill. | **Resolved: 32 / 12 / 20** |
| 2 | Font weights | Figma uses Galano Grotesque **Regular, SemiBold, Bold**; SemiBold is the button weight in the Doritos spec and nav. The site matches. | **Resolved: 3 weights** (Inter Regular / Semi Bold / Bold for now) |
| 3 | Second JOY blue `#0E38DF` | Used in the Figma frames (newsletter band, steps-line border, nav divider, arrow buttons) and on the site. **Not in the JOY palette.** | Primitive SOURCED from frames; needs your OK to keep it as an official JOY blue |
| 4 | Primary hover | Frames: no hover states drawn for JOY. Site: blue CTA hover is `#0E38DF`; Bootstrap `.btn-primary` hover is `#0023AD`. The nav **Register** button in the Doritos sheet is filled `#0024B5`. | **Decision needed** (see 6.4) |
| 5 | Accordion radius 10 | **Confirmed in Figma:** accordion items are `#F4F4F4`, radius 10 (`18:30918`). The live site dropped the box. Figma wins. | **Resolved: radius 10** |
| 6 | Rockstar violet | Sheet: violet is Rockstar's **secondary** color, usable with black or white text. The site doesn't use it. | Use as Rockstar's accent (see 6.4) |
| 7 | Disabled state | Doritos spec: **disabled = 30% opacity** on every style. JOY has no disabled spec; the site's `#ADBDFF` is CSS-only. | **Proposed: 30% opacity for all brands** |
| 8 | Yellow and cyan | `#FFE600` and `#FBB517` are used in the frames' hero and prize cards. Site cyan `#00E0F3` isn't in Figma. The JOY palette's own accents are Sky `#75DEF2`, Green `#EBFF40`, Orange `#FF8000` and Purple `#9E00BF`. | Yellow/amber: **promo artwork colors, not JOY brand colors** (see 6.5) |

---

## 3. Color inventory

### 3.1 JOY: three sources compared

| Color | JOY palette `18:20865` | Figma frame `18:4470` | Live site | Notes |
| --- | --- | --- | --- | --- |
| JOY Blue | **`#1442FF`** | `#1443FF` ×42 fills, `#1442FF` ×6 | `#1443FF` | Differ by one digit; you can't see it. **Palette wins: `#1442FF`.** |
| JOY Dark Blue | **`#0A0F36`** | not used | not used | Official but unused. Candidate for a dark surface or high-contrast focus. |
| Blue (band) | — | `#0E38DF` ×7 | `#0E38DF` (heavy) | Not in palette. |
| Blue (deep) | — | `#0024B5` (nav Register fill, Doritos sheet) | `#0024B5` ×44 in CSS | Not in palette. |
| Blue (darkest) | — | `#021E8F` (illustration only) | — | Ignore. |
| JOY Purple | `#9E00BF` | `#B637F6` (illustration) | — | |
| JOY Sky | `#75DEF2` | `#76E0F3` (illustration) | `#00E0F3` (focus border) | Fails on white (1.56). |
| JOY Green | `#EBFF40` | `#ECFF40` (illustration) | — | Fails on white (1.11). |
| JOY Orange | `#FF8000` | `#F58E1E` (hero shapes) | — | Fails on white (2.52). |
| Black / White | `#000000` / `#FFFFFF` | | | |
| Text | — | `#333333` ×46 | `#333333` | Matches CLAUDE.md. |
| Text secondary | — | `#666666` (accordion answer) | `#666666` | Matches. |
| Surface subtle | — | `#F4F4F4` (accordion) | `#F4F4F4` | Matches. Open accordion item uses `#F7F7F7` at 50%. |
| Border light | — | `#EDEDED` (input border) | — | |
| Ended badge | — | `#B21119` | — | Only red in the JOY frames. |
| Promo yellow / amber | — | `#FFE600`, `#FBB517` | `#FFE600` | Hero and prize-card artwork for this sample promo (Lay's/UEFA). |

### 3.2 Doritos (sheet `18:16576`)

Red `#E31722`, Dark `#030303`, Orange `#FA7115`, White `#FFFFFF`, Black `#000000`. They match CLAUDE.md and the site.

**CTA spec (exact, from the sheet):**

| | Filled | Outline | Text link |
| --- | --- | --- | --- |
| Shape | fill `#030303`, 2px stroke, radius 32, padding 12/20, gap 12, height 42 | transparent fill, 2px stroke | no fill or stroke, radius 4 (focus area) |
| Label | Galano SemiBold 16 / 115%, sentence case, 14px chevron icons each side | same | same, **underlined** by default |
| Default (light bg) | white text, stroke `#FFFFFF` | text and stroke `#030303` | `#030303`, underlined |
| Hover | **no visible change** | label **underlined** | underline **removed** |
| Pressed | text and icons `#FA7115` | text, icons `#E31722`, underlined | text `#E31722`, underlined |
| Focus | stroke `#FA7115` | stroke `#E31722` | no visible change |
| Disabled | **30% opacity** | 30% opacity | 30% opacity |
| Dark bg | same as light, except outline/link use white, and pressed/focus use `#FA7115` everywhere | | |

Things to flag in the Doritos spec:
- The filled button has **no hover state**.
- On a light background the filled button's white stroke can't be seen.
- On a dark background, filled and outline look the same (black fill with white stroke, and transparent with white stroke on black).
- Text links have **no focus indicator**, which fails WCAG 2.4.7.

**Navigation (Doritos sheet):** a white bar with a brand band on the right in Doritos Orange. Links are `#1442FF` SemiBold 16. **Sign In** is a JOY-blue outline button and **Register** is filled `#0024B5`. JOY blue still drives the navigation on a Doritos page.

### 3.3 Rockstar (sheet `18:17654`)

- Primary: Rockstar Black `#000000`. Rule: "White text must be used on black."
- Secondary: Rockstar Violet `#B64F9B`. Rule: "Black or white text may be used on violet."
- Nothing else is specified: no CTA states, surfaces or type.

---

## 4. Typography inventory

All sources use **Galano Grotesque**: Regular, SemiBold and Bold. **Inter is the placeholder (D5).**

| Size / line height | Weight | Where (Figma `18:4470` unless noted) | Count |
| --- | --- | --- | --- |
| 60 / 64 | Bold | Promo hero title | 1 |
| 36 / 40 | Bold | Section titles (Prizes, FAQs, Steps, product card, newsletter) | 8 |
| 24 / 28 | Bold | Section titles, **mobile** (`18:4619`) | 6 |
| 20 / 24 | Bold | Card titles, accordion question, hero subtitle | 12 |
| 20 / 24 | Regular | Section intro text | 11 |
| 16 / 20 | Regular | Body, breadcrumb, steps-line links, buttons in this frame | 45 |
| 16 / 20 | Bold | Breadcrumb current page | 3 |
| 16 / 115% (≈18) | SemiBold | Doritos CTA label; site buttons and nav (UPPERCASE) | sheet |
| 14 / 18 (mobile 14 / 16) | Regular | Small print | 1 (+18 mobile) |

Mixed-case evidence for button labels:
- **Doritos sheet:** sentence case ("Button").
- **JOY frame:** typed in capitals with Title case set ("PARTICIPATE HERE"), and the CTA banner uses UPPER.
- **Live site:** UPPERCASE.

---

## 5. Spacing, radius and border inventory (`18:4470`)

- **Auto-layout gaps:** 12 (×24), 16, 20, 8, 10, 24 (×7–8 each), 30, 40 (×5), 32, 48 (×3), 6, 80 (×2), 4, 66, 96.
- **Padding:** 12/20 (buttons ×12), 12/0 (accordion header ×11), 16/20 (input), 48/24 (content card text), 40, 80, 8/16 (badge).
- **Radius:**
  - 4: text-link focus area, steps-line links (×16)
  - 20: cards (×15)
  - 32: buttons, input, prize card (×9)
  - 22: 42px arrow buttons, i.e. fully round (×8)
  - 10: accordion (×5)
  - 52 and 55: pills and dots
- **Border widths:** 1 (divider lines), 2 (buttons, input), 3 (×8, on white strokes in the hero artwork; not a UI value).
- **Breakpoints (live site):** 576, 768/769, 800, 973, 1200, 1441. Figma has two widths: desktop 1440 and mobile 390.

---

## 6. Proposed tokens

### 6.1 `1. Primitives` (1 mode, hidden from publishing)

| Variable | Value | Status |
| --- | --- | --- |
| `joy/blue/500` | `#1442FF` | SOURCED: JOY palette |
| `joy/blue/600` | `#0E38DF` | SOURCED: frames + site (not in palette) |
| `joy/blue/700` | `#0024B5` | SOURCED: Doritos-sheet nav, site CSS |
| `joy/blue/900` | `#0A0F36` | SOURCED: JOY palette "Dark Blue" |
| `joy/purple/500` | `#9E00BF` | SOURCED: JOY palette |
| `joy/sky/300` | `#75DEF2` | SOURCED: JOY palette |
| `joy/green/300` | `#EBFF40` | SOURCED: JOY palette |
| `joy/orange/500` | `#FF8000` | SOURCED: JOY palette |
| `joy/red/600` | `#B21119` | SOURCED: Ended badge `18:4704` |
| `neutral/0` | `#FFFFFF` | SOURCED |
| `neutral/50` | `#F4F4F4` | SOURCED: accordion |
| `neutral/100` | `#EDEDED` | SOURCED: input border |
| `neutral/600` | `#666666` | SOURCED: secondary text |
| `neutral/800` | `#333333` | SOURCED: body text |
| `neutral/1000` | `#000000` | SOURCED |
| `doritos/red/500` | `#E31722` | SOURCED: Doritos sheet |
| `doritos/orange/500` | `#FA7115` | SOURCED: Doritos sheet |
| `doritos/dark/900` | `#030303` | SOURCED: Doritos sheet |
| `rockstar/black/900` | `#000000` | SOURCED: Rockstar sheet |
| `rockstar/violet/500` | `#B64F9B` | SOURCED: Rockstar sheet |
| `font/family/brand` | `Inter` (target: `Galano Grotesque`) | Placeholder (D5) |

The number after each color (500, 600…) shows how dark it is relative to the others; it isn't a full generated ramp. Promo yellow `#FFE600` and amber `#FBB517` are **left out** (see 6.5).

### 6.2 `2. Theme` (modes JOY, Doritos, Rockstar; every value aliases a Primitive)

| Token | JOY | Doritos | Rockstar | Status |
| --- | --- | --- | --- | --- |
| `color/surface/default` | neutral/0 | neutral/0 | neutral/0 | SOURCED |
| `color/surface/subtle` | neutral/50 | neutral/50 | neutral/50 | SOURCED for JOY; DERIVED for Doritos/Rockstar (no surface spec) |
| `color/surface/inverse` | joy/blue/600 | doritos/dark/900 | rockstar/black/900 | JOY SOURCED (newsletter band); Doritos SOURCED (sheet dark bg); Rockstar SOURCED (primary) |
| `color/text/default` | neutral/800 | neutral/800 | neutral/800 | SOURCED (JOY); DERIVED for others |
| `color/text/secondary` | neutral/600 | neutral/600 | neutral/600 | same |
| `color/text/on-inverse` | neutral/0 | neutral/0 | neutral/0 | SOURCED |
| `color/text/on-action` | neutral/0 | neutral/0 | neutral/0 | SOURCED (Rockstar rule: white on black) |
| `color/text/link` | joy/blue/500 | doritos/dark/900 | rockstar/black/900 | SOURCED |
| `color/action/primary` | joy/blue/500 | doritos/dark/900 | rockstar/black/900 | SOURCED |
| `color/action/primary-hover` | joy/blue/600 | doritos/dark/900 (no change) | rockstar/black/900 (no change) | **Decision 6.4** |
| `color/action/primary-pressed` | joy/blue/700 | doritos/dark/900 | rockstar/black/900 | **Decision 6.4** |
| `color/text/on-action-pressed` | neutral/0 | doritos/orange/500 | rockstar/violet/500 | Doritos SOURCED; Rockstar DERIVED (follows the Doritos pattern) |
| `color/action/inverse` (filled button on a dark bg) | neutral/0 | doritos/dark/900 | rockstar/black/900 | JOY SOURCED (frame "Button Inverted"); others SOURCED |
| `color/text/on-action-inverse` | joy/blue/500 | neutral/0 | neutral/0 | SOURCED |
| `color/border/default` | neutral/100 | neutral/100 | neutral/100 | SOURCED (JOY input); DERIVED for others |
| `color/border/action` (outline button) | joy/blue/500 | doritos/dark/900 | rockstar/black/900 | SOURCED |
| `color/border/focus` (on light bg) | joy/blue/900 | doritos/red/500 | rockstar/violet/500 | **Decision 6.4** |
| `color/border/focus-inverse` (on dark bg) | neutral/0 | doritos/orange/500 | rockstar/violet/500 | **Decision 6.4** |
| `color/brand/primary` | joy/blue/500 | doritos/red/500 | rockstar/black/900 | SOURCED |
| `color/brand/accent` | joy/sky/300 | doritos/orange/500 | rockstar/violet/500 | SOURCED colors; the role is DERIVED |
| `color/feedback/expired` (Ended badge) | joy/red/600 | joy/red/600 | joy/red/600 | SOURCED (JOY) |
| `color/feedback/active` | **NEEDS SOURCE** | | | No "Active" badge exists in any source. |
| `font/family/body` | font/family/brand | font/family/brand | font/family/brand | Placeholder |

All text/background pairs above pass WCAG AA (≥ 4.5:1) or the 3:1 rule for UI parts; see section 8.

### 6.3 `3. Scale` (1 mode)

| Group | Tokens | Status |
| --- | --- | --- |
| Spacing | `spacing/4` `8` `12` `16` `20` `24` `32` `40` `48` `80` | SOURCED (most-used gaps and padding). Odd values (6, 10, 30, 66, 96) snap to the nearest step. |
| Radius | `radius/small` 4 · `radius/container` 10 · `radius/card` 20 · `radius/control` 32 · `radius/full` 9999 | SOURCED. `full` replaces 22/52/55, which all draw full circles or pills. |
| Border width | `border-width/thin` 1 · `border-width/thick` 2 | SOURCED |
| Font size | `font-size/14` `16` `20` `24` `36` `60` | SOURCED |
| Line height | `line-height/16` `18` `20` `24` `28` `40` `64` | SOURCED |
| Opacity | `opacity/disabled` 0.3 | SOURCED (Doritos spec). **Not in the agreed Scale list; needs your OK** (rule 7). |

**Proposed text styles** (desktop values from `18:4470`):

| Style | Font | Size / line height | Notes |
| --- | --- | --- | --- |
| `Display` | Bold | 60 / 64 | Promo hero title |
| `Heading/1` | Bold | 36 / 40 | Section titles |
| `Heading/2` | Bold | 24 / 28 | Mobile section titles; desktop sub-sections |
| `Heading/3` | Bold | 20 / 24 | Card titles, accordion questions |
| `Body/L` | Regular | 20 / 24 | Section intro text |
| `Body/M` | Regular | 16 / 20 | Default body |
| `Body/S` | Regular | 14 / 18 | Small print |
| `Label` | Semi Bold | 16 / 20 | Buttons, nav, tabs. **Case: decision 6.4** |
| `Caption` | Regular | 14 / 16 | Mobile small text. Close to Body/S, so we could drop it (decision 6.4). |

### 6.4 Decisions needed from you

1. **JOY blue hex:** `#1442FF` (palette) or `#1443FF` (frames and site)? *Recommendation: `#1442FF`, because the brand sheet is the source of truth.*
2. **JOY hover and pressed:** hover = `#0E38DF` (site CTA hover, in the frames), pressed = `#0024B5` (Register fill in the sheet)? Both colors are SOURCED; giving them these roles is DERIVED. *Recommendation: yes.*
3. **Doritos and Rockstar hover:** follow the Doritos sheet as it is (filled buttons don't change on hover; outline buttons underline their label)? *Recommendation: yes, and add the underline to the filled button's hover too, so every button reacts on hover.* That addition is DERIVED.
4. **Focus colors:** JOY on light = `#0A0F36` (JOY Dark Blue, 18.5:1 on white) and white on dark. Doritos = red on light, orange on dark. Rockstar = violet both ways (4.58:1). The site's cyan focus fails on white (1.62:1), so we wouldn't use it. *Also: give text links a visible focus ring (the Doritos sheet has none).*
5. **Disabled:** 30% opacity for all brands, plus an `opacity/disabled` Scale token? *Recommendation: yes.*
6. **Label case:** UPPERCASE (JOY frames and site) or sentence case (Doritos sheet)? Text case can't change per mode, so we have to pick one. *Recommendation: UPPERCASE.*
7. **Caption:** keep it as 14/16 or drop it and use Body/S? *Recommendation: drop it, to keep the system simpler.*
8. **Mobile type sizes:** headings shrink on mobile (36 → 24). Text styles can't change by screen size without a second Scale mode, which would be an architecture change. *Recommendation: desktop styles only for now; document the mobile sizes in the guidelines.*
9. **"Active" badge color:** no source has one. Should it come from the JOY palette (for example `joy/blue/500`), or should design supply one? Currently NEEDS SOURCE.

### 6.5 Left out on purpose

- **Promo yellow `#FFE600` and amber `#FBB517`:** artwork for one sample promo (Lay's/UEFA), not a brand or system color.
- **Site-only colors** `#0023AD`, `#ADBDFF` and `#00E0F3`: they don't appear in Figma, and the cyan fails contrast.
- **Illustration-only colors** `#021E8F`, `#B637F6` and `#F58E1E`.

---

## 7. Component inventory (Phase 1)

| Component | Where it appears | Anatomy (from Figma) | States found | Gaps |
| --- | --- | --- | --- | --- |
| **Button** | Doritos CTA spec `18:16787`; JOY hero/product card/newsletter `18:4470` | 12/20 padding, radius 32, 2px border, gap 12, Label 16, optional 14px icons left/right | Doritos: all 5 × light/dark. JOY: Default only. | JOY hover/pressed/focus/disabled (decision 6.4) |
| **Icon Button** | Doritos `18:16854` (48px, round); JOY arrow buttons `18:30807` (42px, round, `#1443FF`, 40% opacity when unavailable) | Circle, 14–16px icon | Doritos all 5 × light/dark | Two sizes (42 vs 48). *Suggest one size, 48, the Doritos spec.* |
| **Text Field** | Newsletter `18:30938` | 2px `#EDEDED` border, radius 32, padding 16/20, Body/M, white text on blue | Default only | Hover, focus, error, disabled, label, helper text: none in any source. Need to derive these. |
| **Accordion** | FAQs `18:30918` | `#F4F4F4`, radius 10, padding 0/8, header 12/0, Heading/3 question, 16px chevron, Body/M `#666666` answer | Closed, Open (`#F7F7F7` @ 50%) | Hover and focus |
| **Card: Step** | `18:30807` (card `18:42815`) | 328 × 420, radius 20: a 328px circle (promo color, `#FFE600` here), a 48px white number badge (Regular 20), step text Body/L `#333333`, product image | — | The circle color is promo artwork; it needs a themed token (for example `color/brand/primary`, which matches the live site's Doritos-red circles). |
| **Card: Prize** | `18:30837` | 328 × 420, radius 20 (inner shape 32), number badge 48px white circle, Heading/3 title, image | — | Colors here are promo artwork; need themed tokens instead. |
| **Card: Content** | Product Card `18:30884` | Image + text side by side, radius 20, text padding 48/24, Heading/1 title, Body/M text, Button | — | Mobile layout |
| **Badge** | "Ended" pill on closed promo `18:4704` | Fill `#B21119`, radius full, padding 8/16, Body/M white Title case | Ended only | **"Active" badge doesn't exist anywhere.** The live site uses identical badges for both, which matches the research problem. |
| **Breadcrumb** | `18:4472` | 35px white bar with a 1px `#1443FF` **top** border, items 12px apart, separator "/", Body/M `#333333` (text typed in capitals, not styled uppercase), **current page Bold** | — | Live site is different (blue bar, white text). Figma wins. No hover state in Figma; the site underlines on hover. |
| **Pagination Dots** | `18:30807`, `18:30837` | Active: 59 × 8 pill `#1443FF`; inactive: 8 × 8 circle `#333333` @ 30%, gap 6–16 | Active / inactive | Inactive dot is about 1.8:1 against white, below the 3:1 UI guideline. *Suggest `#666666` at full opacity (5.7:1).* |

**Wireframes wishlist** (later phases, not now): progress bar ("You are 1 entry away"), "Entered" status, Active/Expired promo sections, promo results (win/lose), participation side panel, testimonial, product card variants.

---

## 8. Contrast check (WCAG 2.2)

| Pair | Ratio | Result |
| --- | --- | --- |
| `#333333` on white | 12.63 | AAA |
| `#666666` on white / on `#F4F4F4` | 5.74 / 5.22 | AA |
| White on JOY blue `#1442FF` | 6.46 | AA |
| White on `#0E38DF` / `#0024B5` | 7.92 / 10.94 | AAA |
| JOY blue on white / on `#F4F4F4` | 6.46 / 5.87 | AA |
| White on Ended `#B21119` | 7.03 | AAA |
| `#EDEDED` border on `#0E38DF` | 6.77 | Pass (UI 3:1) |
| White on Doritos red / dark | 4.76 / 20.62 | AA / AAA |
| Doritos orange on white | **2.82** | **Fail.** Never use orange for text or focus rings on light surfaces. |
| Doritos orange on dark | 7.30 | AAA |
| Rockstar violet with black or white (either way) | 4.58 | AA |
| Site focus cyan `#00E0F3` on white | **1.62** | **Fail.** Not used. |
| Inactive dot (≈ `#C2C2C2`) on white | ≈1.8 | **Fail** (UI 3:1). See section 7. |
| Disabled (30% opacity) | — | Exempt from contrast rules. |

Script: `node contrast.js "<fg>:<bg>"` (WCAG relative luminance). It's in the session scratchpad; we can add it to the repo if useful.
