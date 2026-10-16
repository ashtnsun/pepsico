# Button

A pill-shaped control that triggers an action, such as "Participate here", "Register" or "See more".

## When to use / when not to
- Use **Primary** for the main action in a section. Use at most one Primary per section.
- Use **Secondary** (outline) for a second action next to a Primary, e.g. "Sign in" beside "Register".
- Use **Tertiary** (text link) for low-emphasis actions and in-page links, e.g. "Terms and conditions".
- Set **Background** to `Dark` whenever the button sits on `var(--color-surface-inverse)` or an image/brand-colored band. Otherwise use `Light`.
- Don't use Button for navigation between pages inside body text (use a plain link), or for icon-only actions (use Icon Button).

## Anatomy
- Container: `display: inline-flex`, `align-items: center`, `gap: var(--spacing-12)`, padding `var(--spacing-12)` `var(--spacing-20)`, height 44px (from padding + line height; don't set it).
- Radius: Primary and Secondary `var(--radius-control)`; Tertiary `var(--radius-small)`.
- Border: `var(--border-width-thick)` solid. Its color is in the table below; Tertiary has no border. The border sits inside the box and doesn't change the size.
- Label: text style **Label**: `font-family: var(--font-family-body)`, `font-size: var(--font-size-16)`, `line-height: var(--line-height-20)`, `font-weight: 600`, `text-transform: uppercase`.
- Icons (optional, off by default): a Lucide icon from `lucide-react` at `size={16}`, left and/or right of the label (e.g. `ArrowRight`, `ChevronDown`). Icon color is always the same token as the label (it inherits `currentColor`).

## Variants and states

**Background = Light**

| Variant | State | Background | Border | Label + icons | Underline |
| --- | --- | --- | --- | --- | --- |
| Primary | Default | `var(--color-action-primary)` | same as background | `var(--color-text-on-action)` | no |
| Primary | Hover | `var(--color-action-primary-hover)` | same as background | `var(--color-text-on-action)` | **yes** |
| Primary | Pressed | `var(--color-action-primary-pressed)` | same as background | `var(--color-text-on-action-pressed)` | no |
| Secondary | Default | transparent | `var(--color-border-action)` | `var(--color-text-link)` | no |
| Secondary | Hover | transparent | `var(--color-border-action)` | `var(--color-text-link)` | **yes** |
| Secondary | Pressed | transparent | `var(--color-border-action)` | `var(--color-text-link-pressed)` | **yes** |
| Tertiary | Default | transparent | none | `var(--color-text-link)` | **yes** |
| Tertiary | Hover | transparent | none | `var(--color-text-link)` | no |
| Tertiary | Pressed | transparent | none | `var(--color-text-link-pressed)` | **yes** |

**Background = Dark**

| Variant | State | Background | Border | Label + icons | Underline |
| --- | --- | --- | --- | --- | --- |
| Primary | Default / Hover | `var(--color-action-inverse)` | `var(--color-border-action-inverse)` | `var(--color-text-on-action-inverse)` | Hover only |
| Primary | Pressed | `var(--color-action-inverse)` | `var(--color-border-action-inverse)` | `var(--color-text-on-action-inverse-pressed)` | no |
| Secondary | Default / Hover | transparent | `var(--color-border-action-inverse)` | `var(--color-text-on-inverse)` | Hover only |
| Secondary | Pressed | transparent | `var(--color-border-action-inverse)` | `var(--color-text-on-action-pressed)` | yes |
| Tertiary | Default / Hover | transparent | none | `var(--color-text-on-inverse)` | Default only |
| Tertiary | Pressed | transparent | none | `var(--color-text-on-action-pressed)` | yes |

**Focus** (keyboard focus, `:focus-visible`): keep the Default look, plus an outline outside the button: `outline: var(--border-width-thick) solid var(--color-border-focus)` (Dark: `var(--color-border-focus-inverse)`), `outline-offset: 2px`. Tertiary keeps its Default underline.

**Disabled:** keep the Default look and set `opacity: calc(var(--opacity-disabled) / 100)` (= 0.3). Add `disabled` / `aria-disabled="true"` and remove hover and pressed effects.

Underline: `text-decoration: underline`. In Figma the underline is drawn as a separate "Underline" layer, because Figma can't vary text decoration between variants that share a text property. In code, always use `text-decoration`.

## Rules
- Always use the Theme and Scale variables above. Never hardcode colors, sizes or radius.
- The brand comes from the Theme (JOY, Doritos, Rockstar). Never pick colors per brand in the component.
- Always pick `Background` from what the button sits on, not from the brand.
- Labels are short verbs in UPPERCASE (via `text-transform`); write the text in normal case in the source.
- Every button must show the focus outline when focused with a keyboard.
- Doritos and Rockstar filled buttons don't change color on hover; the underline is the hover signal. That's intended.

## Example
```jsx
<button className="btn btn--primary">Participate here</button>
<button className="btn btn--secondary">Sign in</button>
<a className="btn btn--tertiary" href="/terms">Terms and conditions</a>

<style>{`
.btn { display:inline-flex; align-items:center; gap:var(--spacing-12);
  padding:var(--spacing-12) var(--spacing-20); border:var(--border-width-thick) solid transparent;
  border-radius:var(--radius-control); font-family:var(--font-family-body);
  font-size:var(--font-size-16); line-height:var(--line-height-20); font-weight:600;
  text-transform:uppercase; text-decoration:none; cursor:pointer; }
.btn:focus-visible { outline:var(--border-width-thick) solid var(--color-border-focus); outline-offset:2px; }
.btn:disabled { opacity:calc(var(--opacity-disabled) / 100); cursor:not-allowed; }
.btn--primary { background:var(--color-action-primary); border-color:var(--color-action-primary); color:var(--color-text-on-action); }
.btn--primary:hover { background:var(--color-action-primary-hover); border-color:var(--color-action-primary-hover); text-decoration:underline; }
.btn--primary:active { background:var(--color-action-primary-pressed); border-color:var(--color-action-primary-pressed); color:var(--color-text-on-action-pressed); text-decoration:none; }
.btn--secondary { background:transparent; border-color:var(--color-border-action); color:var(--color-text-link); }
.btn--secondary:hover { text-decoration:underline; }
.btn--secondary:active { color:var(--color-text-link-pressed); text-decoration:underline; }
.btn--tertiary { background:transparent; border:0; border-radius:var(--radius-small); color:var(--color-text-link); text-decoration:underline; }
.btn--tertiary:hover { text-decoration:none; }
.btn--tertiary:active { color:var(--color-text-link-pressed); text-decoration:underline; }
`}</style>
```
For a dark background, add `.btn--on-dark` and swap in the "Background = Dark" tokens from the table above.
