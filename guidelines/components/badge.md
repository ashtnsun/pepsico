# Badge

A small pill that shows a promotion's status, either **Active** or **Ended**, so ended promotions never look like live ones.

## When to use / when not to
- Use on promo cards, promo heroes and promo lists to show whether a promotion is running.
- Don't use for counts, categories or buttons. A badge isn't clickable.
- Don't invent new statuses; ask the design team first.

## Anatomy
- Container: `display: inline-flex`, `align-items: center`, padding `var(--spacing-8)` `var(--spacing-16)`, `border-radius: var(--radius-full)`, height 36px (from padding + line height; don't set it).
- Label: text style **Body/M** (`var(--font-size-16)` / `var(--line-height-20)`, weight 400), sentence case: "Active" or "Ended".

## Variants
| Status | Background | Label | Text |
| --- | --- | --- | --- |
| Active | `var(--color-feedback-active)` | `var(--color-text-on-feedback-active)` | Active |
| Expired | `var(--color-feedback-expired)` | `var(--color-text-on-feedback-expired)` | Ended |

The colors are the same for every brand (JOY, Doritos, Rockstar).

## Rules
- Every promo card and hero shows exactly one badge.
- An ended promotion always shows the Expired badge, and its main "Participate" button is removed or disabled.
- Badges sit on a calm area (page surface or image), never directly on another badge or on red.
- Never hardcode colors.

## Example
```jsx
<span className="badge badge--active">Active</span>
<span className="badge badge--expired">Ended</span>

<style>{`
.badge { display:inline-flex; align-items:center; padding:var(--spacing-8) var(--spacing-16);
  border-radius:var(--radius-full); font:400 var(--font-size-16)/var(--line-height-20) var(--font-family-body); }
.badge--active { background:var(--color-feedback-active); color:var(--color-text-on-feedback-active); }
.badge--expired { background:var(--color-feedback-expired); color:var(--color-text-on-feedback-expired); }
`}</style>
```
