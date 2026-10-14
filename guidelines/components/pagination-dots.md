# Pagination Dots

A row of dots under a carousel that shows which slide is visible: one long pill for the current slide, small dots for the others.

## When to use / when not to
- Use under carousels of steps, prizes or promo cards.
- Don't use as the only way to move between slides; always pair with Icon Button arrows (the dots are 8px, too small to tap reliably).
- Don't use for page navigation in long lists (use numbered pagination, Phase 2).

## Anatomy
- Row: `display: flex`, `align-items: center`, `gap: var(--spacing-8)`, centered under the carousel.
- Active dot: 59 × 8 px pill, `border-radius: var(--radius-full)`, `background: var(--color-action-primary)`.
- Inactive dot: 8 × 8 px circle, `border-radius: var(--radius-full)`, `background: var(--color-text-secondary)`.
- Count: one dot per slide (3 by default, up to 5 in Figma via `Has dot 4` / `Has dot 5`).

## Variants (Dot)
| State | Size | Color |
| --- | --- | --- |
| Active | 59 × 8 | `var(--color-action-primary)` |
| Inactive | 8 × 8 | `var(--color-text-secondary)` |

Animate the width change (about 200ms) when the slide changes.

## Rules
- Exactly one dot is active.
- If the dots are clickable, each is a `<button aria-label="Go to slide N">` with `aria-current="true"` on the active one, and a focus outline: `outline: var(--border-width-thick) solid var(--color-border-focus)`, `outline-offset: 2px`. Otherwise mark the row `aria-hidden="true"` and let the arrows do the work.
- Never hardcode colors; the active color follows the brand (JOY blue, Doritos and Rockstar black).

## Example
```jsx
<div className="dots" aria-hidden="true">
  {slides.map((_, i) => <span key={i} className={`dots__dot ${i === current ? 'is-active' : ''}`} />)}
</div>

<style>{`
.dots { display:flex; align-items:center; justify-content:center; gap:var(--spacing-8); }
.dots__dot { width:8px; height:8px; border-radius:var(--radius-full); background:var(--color-text-secondary); transition:width 200ms; }
.dots__dot.is-active { width:59px; background:var(--color-action-primary); }
`}</style>
```
