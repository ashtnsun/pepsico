# Color

Use the `--color-*` variables from `tokens.md`. They're grouped by **role**; pick by what the color does, not by how it looks. The brand (`data-brand`) changes the values; the names never change.

## Roles
| Role | Tokens | Use for |
| --- | --- | --- |
| Surface | `--color-surface-default`, `-subtle`, `-inverse` | Page and card backgrounds; `subtle` for quiet areas (accordion); `inverse` for dark bands (newsletter, prize band) |
| Text | `--color-text-default`, `-secondary`, `-link`, `-link-pressed`, `-on-inverse`, `-on-action`, `-on-action-pressed`, `-on-action-inverse`, `-on-action-inverse-pressed`, `-on-feedback-active`, `-on-feedback-expired` | Text **and icons**. The `on-…` tokens go on top of the matching background |
| Action | `--color-action-primary`, `-primary-hover`, `-primary-pressed`, `-inverse` | Filled button backgrounds only |
| Border | `--color-border-default`, `-action`, `-action-inverse`, `-focus`, `-focus-inverse` | Dividers, outline buttons, input borders, focus outlines |
| Brand | `--color-brand-primary`, `--color-brand-accent` | Brand areas: step circles, prize cards, brand bands, decoration. Never buttons. Never text on light surfaces (`accent`) |
| Feedback | `--color-feedback-active`, `-expired`, `-error` | Badge backgrounds; error borders and messages on light backgrounds |

## Safe text/background pairs
Every pair below passes WCAG AA (4.5:1) in all three brands.

| Background | Text and icons |
| --- | --- |
| `surface-default`, `surface-subtle` | `text-default`, `text-secondary`, `text-link`, `feedback-error` (light only) |
| `surface-inverse` | `text-on-inverse` |
| `brand-primary` | `text-on-inverse` |
| `action-primary` / `-hover` | `text-on-action` |
| `action-primary-pressed` | `text-on-action-pressed` |
| `action-inverse` | `text-on-action-inverse` (pressed: `text-on-action-inverse-pressed`) |
| `feedback-active` | `text-on-feedback-active` |
| `feedback-expired` | `text-on-feedback-expired` |

## Rules
- Never put `--color-brand-accent` or Doritos orange text on white; it fails contrast.
- On `surface-inverse`, don't use `--color-feedback-error` for text (it fails). Use `text-on-inverse` and start the message with "Error:".
- Don't invent tints, shades or transparency. If a color is missing, use the closest role and note it.
- What each brand looks like: JOY = blues (`#1443FF` actions, `#0E38DF` bands); Doritos = black actions, red brand areas, orange accents; Rockstar = black actions and brand, violet accents.
