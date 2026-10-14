# Live site capture: joy-pepsico.eu/en-gb

Captured 2026-10-14 (Prompt 0.5) from https://www.joy-pepsico.eu/en-gb/. This folder is reference material, so don't edit it; recapture instead.

## How it was captured

- The site sits behind Imperva/Incapsula bot protection: plain `curl` and a fresh Playwright browser both get **403**. A teammate refreshed the page by hand in the Playwright browser, which passed the check. Everything below was captured in that same browser session. Nothing was done to get around the protection.
- If you recapture later, expect the same 403. Open the site by hand in the Playwright browser first.
- The cookie banner and its grey backdrop (`#consent-greyout-div`, `.cc-window`) were hidden with CSS for the screenshots. No cookie choice was made.

## What's here

| Path | What it is |
| --- | --- |
| `*.png` (top level) | 13 screenshots the team took earlier (moved here from `references/screenshots/`). |
| `capture/<page>--desktop.png` | Full-page screenshots at 1440 × 900. |
| `capture/<page>--mobile.png` | Full-page screenshots at 390 × 844. |
| `css/` | Every same-site stylesheet the homepage loads, saved as served. `css/_index.json` maps each file back to its URL. The theme is in `themes__custom__barrio_pepsico_joypepsico__css__style.css` (6 MB, unminified). |
| `computed-styles.json` | What the browser actually rendered (font, color, border, radius, padding) for headings, buttons, links, inputs, accordion, breadcrumb, cards and footer on 6 pages at 1440 px. Entries in Arial with `cc-` classes belong to the cookie widget; ignore them. |

The 9 pages captured: `home`, `promotions`, `brand-doritos`, `brand-rockstar`, `promo-doritos-las-vegas-wrap` (active Doritos promo), `promo-avengers-doomsday` (active JOY/default promo), `faq`, `login`, `register`.

## JOY base values found

These are measured from the live site (rendered styles and CSS). "Rendered" means read from the browser; "CSS" means read from `style.css`.

### Type

| What | Value | Source |
| --- | --- | --- |
| Font family | `Galano` (Galano Grotesque webfont), fallback `sans-serif`. Greek pages switch to `Manrope`. | CSS `:root { --font-family }` and `@font-face` |
| Weights loaded | **400 Regular, 600 SemiBold, 700 Bold** | CSS `@font-face` |
| Body | 16px, weight 400, color `#333333` | Rendered |
| Page title (promo hero h1) | 60px / 62px, 700 | Rendered |
| Section heading (h1/h2) | 36px / 40px, 700 | Rendered |
| Card / prize title (h3) | 20px / 26px, 600 | Rendered |
| Accordion question | 20px / 26px, 600 | Rendered |
| Button & nav label | 16px / 16px, 600, UPPERCASE | Rendered |
| Secondary text | `#666666` (36 uses in CSS); disclaimer text uses `#555555` | CSS, rendered |

### Color

| What | Value | Source |
| --- | --- | --- |
| JOY blue (primary buttons, footer, links) | `#1443FF` | Rendered |
| JOY dark blue (newsletter band, breadcrumb bar, text on yellow/white CTAs, CTA hover) | `#0E38DF` | Rendered |
| Primary `.btn-primary` hover/focus | `#0023AD` (CSS `rgb(0, 34.6, 173)`) | Rendered + CSS |
| Primary `.btn-primary` disabled | `#ADBDFF` (CSS `rgb(173, 189.4, 255)`) | CSS only (no disabled button on the pages) |
| White button hover (on dark backgrounds) | `#F2F2F2` | Rendered |
| JOY yellow (hero CTA on blue) | `#FFE600`, hover `#E6CF00` (CSS `rgb(229.5, 207, 0)`) | CSS, rendered |
| Cyan (focus border, accent band) | `#00E0F3` | Rendered |
| Subtle surface | `#F4F4F4` (19 uses) | CSS |

### Shape and spacing

| What | Value | Source |
| --- | --- | --- |
| Button | height 45px, padding 0 24px (wide CTAs 0 45px), radius **44px** (pill), border 2px (1px on `.btn-primary`) | Rendered |
| Newsletter Subscribe button | padding 14px 24px, height 49px, radius 44px | Rendered |
| Card radius (product card) | 20px | Rendered; CSS has 64 × `20px` |
| Step number badge | 48px circle, 26px / 600 | Rendered |
| Text field (newsletter) | padding 12px, no box, bottom border only, white text on blue | Rendered + screenshot |
| Breakpoints most used | 576, 768/769, 800, 973, 1200, 1441px (`min-width`) | CSS `@media` counts |

### States (rendered, desktop)

- **Hover:** blue filled CTA → background `#0E38DF`; `.btn-primary` → `#0023AD`; white CTA on a dark background → `#F2F2F2`; breadcrumb links → underline. The header Login/Register buttons, nav links and footer links **don't change** on hover.
- **Focus:** CTAs get a 2px `#00E0F3` (cyan) border plus the browser's default outline. Bootstrap `.btn` gets a `rgba(38,143,255,0.5)` 3.2px glow.
- **Disabled:** not shown on any captured page. `#ADBDFF` comes from the CSS only.

### Components seen

- **Breadcrumb** (`nav.joy_breadcrumb`): a 40px bar on `#0E38DF` with white uppercase links separated by `/`; the current page is **bold**.
- **Accordion** (FAQ): no box or background. Each question is 20px / 600 in `#333333` with a blue chevron on the right, and items are separated by a 1px blue line.
- **Badge** (`.brand-teaser-badge`): white tab with radius 0 0 0 20px, 16px / 600 uppercase, letter-spacing 2.72px, text `#0E38DF`. "ENDED" uses **the same style** as active badges, which matches the research finding that expired promos look active.
- **Pagination dots** (`.slick-dots`): 8px tall; one dot is a long pill and the rest are 8px circles (see `home--desktop.png`). The widths and colors animate, so the exact active-dot width and color weren't pinned down; check them in the screenshots.

## Brand pages

- **Doritos:** the brand CSS uses `#E31722` red and `#FA7115` orange. Both match the brand sheet.
- **Rockstar:** the brand CSS uses `#000000`. **Violet `#B64F9B` doesn't appear anywhere on the site.**
- On both brand pages, the standard buttons are still JOY blue `#1443FF`. Brand color shows up in heroes, step circles and prize bands, not in buttons.
