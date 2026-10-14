# Typography

One font family for everything: `var(--font-family-body)`. It's **Inter** for now, a placeholder for the brand font Galano Grotesque (not licensed yet). Weights: 400 (Regular), 600 (Semi Bold), 700 (Bold).

## Text styles
| Style | CSS | Use for |
| --- | --- | --- |
| Display | `font: 700 var(--font-size-60)/var(--line-height-64) var(--font-family-body)` | Promotion hero title, one per page |
| Heading/1 | `font: 700 var(--font-size-36)/var(--line-height-40) var(--font-family-body)` | Section titles ("Prizes", "Frequently asked questions") |
| Heading/2 | `font: 700 var(--font-size-24)/var(--line-height-28) var(--font-family-body)` | Sub-sections; section titles on mobile |
| Heading/3 | `font: 700 var(--font-size-20)/var(--line-height-24) var(--font-family-body)` | Card titles, accordion questions, prize names |
| Body/L | `font: 400 var(--font-size-20)/var(--line-height-24) var(--font-family-body)` | Section intros, step text |
| Body/M | `font: 400 var(--font-size-16)/var(--line-height-20) var(--font-family-body)` | Default text, labels of form fields, breadcrumb, badges |
| Body/S | `font: 400 var(--font-size-14)/var(--line-height-18) var(--font-family-body)` | Small print on desktop (terms, disclaimers) |
| Label | `font: 600 var(--font-size-16)/var(--line-height-20) var(--font-family-body); text-transform: uppercase` | Buttons, navigation links, current breadcrumb item |
| Caption | `font: 400 var(--font-size-14)/var(--line-height-16) var(--font-family-body)` | Helper text under fields; small text on mobile |

Letter spacing is 0 for every style.

## Mobile (390px)
- Display → use Heading/1 sizes (36/40).
- Heading/1 → use Heading/2 sizes (24/28).
- Everything else stays the same.

## Rules
- Use one Display per page and one Heading/1 per section.
- Write text in sentence case; only Label is uppercase (via CSS).
- Don't set font sizes, weights or line heights outside this table.
- Text color comes from the `--color-text-*` tokens (see `color.md`).
