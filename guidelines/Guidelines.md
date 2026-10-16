# JOY Design System: guidelines for Figma Make

You are building screens for **JOY by PepsiCo**, a cross-brand rewards and promotions website. Use only the tokens, text styles and components described in these files. When something isn't covered, build it from the foundations below rather than inventing new colors, sizes or fonts.

## Read these files
1. `foundations/tokens.md`: the CSS variables. Add them to the global CSS first.
2. `foundations/color.md`: which color token to use where.
3. `foundations/typography.md`: the 9 text styles.
4. `foundations/spacing-and-shape.md`: spacing, radius, borders, focus, layout.
5. `components/*.md`: one file per component (listed below).

## Brands
- Three brands share one system: **JOY** (default), **Doritos**, **Rockstar**.
- The brand is set by an attribute: `<html data-brand="doritos">` (or on any section). Never hardcode a brand color in a component; components always read `var(--color-…)`.
- JOY pages (home, promotions list, FAQ, login) use JOY. A brand's own pages and promotions use that brand.

## Components
| Component | Use for | File |
| --- | --- | --- |
| Button | Actions: Primary (filled), Secondary (outline), Tertiary (text link) | `components/button.md` |
| Icon Button | Round 48px icon-only actions (carousel arrows, share) | `components/icon-button.md` |
| Text Field | Single-line inputs with a label and helper text | `components/text-field.md` |
| Accordion | FAQ questions that open to show an answer | `components/accordion.md` |
| Card | Step (how to take part), Prize (prize tile), Content (image + text + buttons) | `components/card.md` |
| Badge | Promotion status: Active or Ended | `components/badge.md` |
| Breadcrumb | Path under the navigation (Home / … / current page) | `components/breadcrumb.md` |
| Pagination Dots | Which carousel slide is visible | `components/pagination-dots.md` |

Not in the system yet (Phase 2): Navbar, Footer, Newsletter band, Promo Hero, Section Nav, Progress Tracker, Result Message. If a screen needs them, compose them from the foundations and the components above, and keep them simple.

## A typical promotion page (top to bottom)
1. Navigation (Phase 2) and **Breadcrumb**.
2. Hero: the promotion title in **Display**, dates, an **Active** or **Ended** Badge, and one Primary Button "Participate here" (removed when Ended).
3. "How to take part": **Heading/1** + a row of 3–4 **Step** cards, with **Pagination Dots** and **Icon Button** arrows on small screens.
4. "Prizes": `surface/inverse` or `brand/primary` band with **Prize** cards.
5. **Content** cards for products or news.
6. "Frequently asked questions": **Heading/1** + a list of **Accordion** items.
7. Newsletter band (`surface/inverse`, white text, Text Field with Background Dark + Button with Background Dark), then the footer.

## Global rules
- **Tokens only.** Every color, size, space, radius and border uses a `var(--…)` from `foundations/tokens.md`. No hex values, no `px` values except the fixed sizes named in a guideline (icons 16px, Icon Button 48px, dots).
- **Text styles only.** Every piece of text uses one of the 9 styles in `foundations/typography.md`.
- **Icons: Lucide only.** Import from `lucide-react` (e.g. `import { ChevronDown } from 'lucide-react'`) at `size={16}` with the default stroke width. Don't set a color on the icon; it inherits `currentColor` from its parent, which uses a `--color-text-*` token. Icons in the Figma library: ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Share2, X, CircleAlert, Check. Prefer these; use another Lucide icon only when none fits.
- **Background matters.** Components with a `Background` option (Button, Icon Button, Text Field) use **Dark** on `surface/inverse` or brand-colored areas and **Light** everywhere else.
- **Accessibility:**
  - Every interactive element shows a focus outline (`outline: 2px solid var(--color-border-focus)`, `outline-offset: 2px`; on dark areas use `--color-border-focus-inverse`).
  - Text meets 4.5:1 contrast; the token pairs in `foundations/color.md` already do.
  - Icon-only buttons need `aria-label`; images need `alt`.
  - Never show state (error, ended, selected) by color alone.
- **Ended promotions** always show the Ended badge and no Participate button.
- **Plain language.** Short labels, sentence case in source text (buttons and breadcrumbs are uppercased by CSS).
- Desktop designs are 1440px wide, mobile 390px. Stack side-by-side content on mobile.
