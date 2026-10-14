# Spacing and shape

All values are `var(--…)` tokens from `tokens.md` and are the same for every brand.

## Spacing
`--spacing-4` `--spacing-8` `--spacing-12` `--spacing-16` `--spacing-20` `--spacing-24` `--spacing-32` `--spacing-40` `--spacing-48` `--spacing-80`

| Use | Token |
| --- | --- |
| Button and field padding | `--spacing-12` (top/bottom) + `--spacing-20` (sides) |
| Gap between related items (icons and labels, buttons in a row) | `--spacing-12` to `--spacing-16` |
| Gap between stacked list items (accordion) | `--spacing-20` |
| Padding inside cards and panels | `--spacing-24` |
| Gap between a block's text and its buttons | `--spacing-40` |
| Space between page sections | `--spacing-48` (mobile) to `--spacing-80` (desktop) |

Pick the nearest step; never use other numbers.

## Radius
| Token | Value | Use for |
| --- | --- | --- |
| `--radius-small` | 4px | Text links (focus area) |
| `--radius-container` | 10px | Accordion items, images inside cards |
| `--radius-card` | 20px | Cards, large images, panels |
| `--radius-control` | 32px | Buttons, text fields (pill shape) |
| `--radius-full` | 9999px | Circles and pills: icon buttons, badges, dots, number badges |

## Borders
- `--border-width-thin` (1px): dividers, the breadcrumb's top line.
- `--border-width-thick` (2px): buttons, text fields, focus outlines.
- Borders sit inside the element (use `box-sizing: border-box`), so they don't change its size.

## Focus
Every interactive element: `outline: var(--border-width-thick) solid var(--color-border-focus); outline-offset: 2px;` with the element's own radius. On dark areas, use `--color-border-focus-inverse`. Only on `:focus-visible`.

## Disabled
`opacity: calc(var(--opacity-disabled) / 100)` (30%), plus `disabled` or `aria-disabled="true"`, and no hover or pressed effects.

## Layout
- Desktop designs are 1440px wide; content blocks are about 1100px wide and centered.
- Mobile designs are 390px wide with `--spacing-16` side padding for content (`--spacing-24` in the navigation bar), as in the mobile promo page frame.
- Common heights: buttons and text fields 44px, icon buttons 48px, badges 36px, breadcrumb 36px.
- No shadows. Depth comes from color (surface vs. subtle vs. inverse).
