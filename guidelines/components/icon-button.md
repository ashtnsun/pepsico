# Icon Button

A round 48px button that shows one icon and no visible label, used for carousel arrows, share and similar compact actions.

## When to use / when not to
- Use for compact, well-known actions where an icon is enough: previous/next arrows on sliders, share, close.
- Don't use when the action needs words to be understood (use Button with an icon instead).
- Set **Background** to `Dark` when it sits on `var(--color-surface-inverse)` or a brand-colored band; otherwise `Light`.

## Anatomy
- Container: 48 × 48 px circle: padding `var(--spacing-16)` on all sides around a 16px icon, `border-radius: var(--radius-full)`, border `var(--border-width-thick)` solid (inside, doesn't change the size).
- Icon: one Lucide icon from `lucide-react` at `size={16}` (e.g. `ChevronLeft` / `ChevronRight` for carousels, `Share2`, `X`). Icon color uses the token in the table below, set as the button's `color`.
- Accessible name: always set `aria-label` (e.g. "Next prize"). The icon itself is `aria-hidden="true"`.

## Variants and states

| Background | State | Background color | Border | Icon |
| --- | --- | --- | --- | --- |
| Light | Default | `var(--color-action-primary)` | same as background | `var(--color-text-on-action)` |
| Light | Hover | `var(--color-action-primary-hover)` | same as background | `var(--color-text-on-action)` |
| Light | Pressed | `var(--color-action-primary-pressed)` | same as background | `var(--color-text-on-action-pressed)` |
| Dark | Default / Hover | `var(--color-action-inverse)` | `var(--color-border-action-inverse)` | `var(--color-text-on-action-inverse)` |
| Dark | Pressed | `var(--color-action-inverse)` | `var(--color-border-action-inverse)` | `var(--color-text-on-action-inverse-pressed)` |

**Focus** (`:focus-visible`): Default look plus `outline: var(--border-width-thick) solid var(--color-border-focus)` (Dark: `var(--color-border-focus-inverse)`), `outline-offset: 2px`, round.

**Disabled:** Default look with `opacity: calc(var(--opacity-disabled) / 100)`; add `disabled`. Use it for "no previous slide" on carousels instead of hiding the arrow.

## Rules
- Always one icon, never text inside.
- Always set `aria-label`.
- Never hardcode colors or sizes; the Theme mode decides the brand look.
- Doritos and Rockstar Icon Buttons don't change on hover (the Doritos sheet draws them that way). JOY darkens. That's intended.

## Example
```jsx
import { ChevronRight } from 'lucide-react';

<button className="icon-btn" aria-label="Next prize">
  <ChevronRight aria-hidden="true" size={16} />
</button>

<style>{`
.icon-btn { display:inline-flex; align-items:center; justify-content:center;
  padding:var(--spacing-16); border-radius:var(--radius-full);
  border:var(--border-width-thick) solid var(--color-action-primary);
  background:var(--color-action-primary); color:var(--color-text-on-action); cursor:pointer; }
.icon-btn:hover { background:var(--color-action-primary-hover); border-color:var(--color-action-primary-hover); }
.icon-btn:active { background:var(--color-action-primary-pressed); border-color:var(--color-action-primary-pressed); color:var(--color-text-on-action-pressed); }
.icon-btn:focus-visible { outline:var(--border-width-thick) solid var(--color-border-focus); outline-offset:2px; }
.icon-btn:disabled { opacity:calc(var(--opacity-disabled) / 100); cursor:not-allowed; }
`}</style>
```
