# Text Field

A single-line input with a label above it and optional helper text below, used for e-mail, names and promo codes.

## When to use / when not to
- Use for short, single-line answers: e-mail, first name, promo code.
- Don't use for long answers (use a textarea, Phase 2) or for choosing from a list (use a select, Phase 2).
- Set **Background** to `Dark` when the field sits on `var(--color-surface-inverse)` (e.g. the newsletter band); otherwise `Light`.

## Anatomy
- Wrapper: vertical stack, `gap: var(--spacing-8)`, full width of its column (320px in Figma).
- Label (optional, on by default): text style **Body/M** (`var(--font-size-16)` / `var(--line-height-20)`, weight 400), sentence case, e.g. "E-mail*". Always a real `<label for>`.
- Field: `border-radius: var(--radius-control)`, padding `var(--spacing-12)` `var(--spacing-20)`, `border: var(--border-width-thick) solid` (inside), height 44px (same as Button).
- Text: **Body/M**. Placeholder uses `var(--color-text-secondary)`.
- Helper text (optional, on by default): text style **Caption** (`var(--font-size-14)` / `var(--line-height-16)`), linked with `aria-describedby`.

## Variants and states

| Background | State | Field background | Border | Label + text | Helper text |
| --- | --- | --- | --- | --- | --- |
| Light | Default | `var(--color-surface-default)` | `var(--color-text-secondary)` | `var(--color-text-default)` | `var(--color-text-secondary)` |
| Light | Hover | same | `var(--color-border-action)` | same | same |
| Light | Focus | same | `var(--color-border-action)` | same | same |
| Light | Error | same | `var(--color-feedback-error)` | same | `var(--color-feedback-error)` |
| Dark | Default | transparent | `var(--color-border-default)` | `var(--color-text-on-inverse)` | `var(--color-text-on-inverse)` |
| Dark | Hover / Focus | transparent | `var(--color-border-action-inverse)` | same | same |
| Dark | Error | transparent | `var(--color-feedback-error)` | same | `var(--color-text-on-inverse)` |

**Focus** (`:focus-visible` on the input): also add `outline: var(--border-width-thick) solid var(--color-border-focus)` (Dark: `var(--color-border-focus-inverse)`), `outline-offset: 2px`, on the field.

**Error:** set `aria-invalid="true"` and put the message in the helper text. On a dark background the red isn't readable, so the message stays white and **must start with "Error:"**. Never show an error by color alone.

**Disabled:** the whole field (label, field, helper) at `opacity: calc(var(--opacity-disabled) / 100)`; add `disabled`.

## Rules
- Always show a visible label. Use placeholder text only as an example value, never as the label.
- Error messages say what to do: "Enter a valid e-mail address." not "Invalid".
- Never hardcode colors or sizes. The Theme mode decides the brand look; the border and focus colors change per brand.
- When a field sits next to a Button (e.g. newsletter), both are 44px tall, so align them on the same row.

## Example
```jsx
<div className="field">
  <label className="field__label" htmlFor="email">E-mail*</label>
  <input className="field__input" id="email" type="email" placeholder="name@email.com"
         aria-describedby="email-help" aria-invalid={hasError} />
  <p className="field__help" id="email-help">{hasError ? 'Enter a valid e-mail address.' : 'We only use this to send promotion news.'}</p>
</div>

<style>{`
.field { display:flex; flex-direction:column; gap:var(--spacing-8); }
.field__label { font:400 var(--font-size-16)/var(--line-height-20) var(--font-family-body); color:var(--color-text-default); }
.field__input { font:400 var(--font-size-16)/var(--line-height-20) var(--font-family-body); color:var(--color-text-default);
  background:var(--color-surface-default); border:var(--border-width-thick) solid var(--color-text-secondary);
  border-radius:var(--radius-control); padding:var(--spacing-12) var(--spacing-20); }
.field__input::placeholder { color:var(--color-text-secondary); }
.field__input:hover, .field__input:focus { border-color:var(--color-border-action); }
.field__input:focus-visible { outline:var(--border-width-thick) solid var(--color-border-focus); outline-offset:2px; }
.field__input[aria-invalid="true"] { border-color:var(--color-feedback-error); }
.field__input[aria-invalid="true"] + .field__help { color:var(--color-feedback-error); }
.field__help { font:400 var(--font-size-14)/var(--line-height-16) var(--font-family-body); color:var(--color-text-secondary); margin:0; }
.field:has(:disabled) { opacity:calc(var(--opacity-disabled) / 100); }
`}</style>
```
