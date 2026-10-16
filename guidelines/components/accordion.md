# Accordion

One FAQ item: a question that opens to show its answer. Stack several to make an FAQ list.

## When to use / when not to
- Use for FAQs and other lists of questions where people only need some of the answers.
- Don't use to hide information everyone needs, e.g. prize details or dates (show them directly).
- Don't nest accordions inside accordions.

## Anatomy
- Item: `background: var(--color-surface-subtle)`, `border-radius: var(--radius-container)`, padding `0 var(--spacing-8)`, full width (900px in the Figma reference, 560px in narrow columns).
- Header (the button): padding `var(--spacing-12) 0`, `gap: var(--spacing-24)`, the question filling the width and a 16px chevron on the right.
  - Question: text style **Heading/3**, color `var(--color-text-default)`.
  - Chevron: Lucide `ChevronDown` from `lucide-react`, `size={16}`, color `var(--color-text-link)`. Points down when closed, up when open (rotate 180°). It doesn't change color on hover.
- Answer (open only): text style **Body/M**, color `var(--color-text-secondary)`, `padding-bottom: var(--spacing-16)`.
- List: stack items with `gap: var(--spacing-20)`.

## Variants and states
| Is open | State | Question color | Chevron | Answer |
| --- | --- | --- | --- | --- |
| No | Default | `var(--color-text-default)` | down | hidden |
| No / Yes | Hover | `var(--color-text-hover)` (JOY blue, Doritos red, Rockstar violet) | same as Default | same as Default |
| Yes | Default | `var(--color-text-default)` | up | shown |

**Focus** (`:focus-visible` on the header button): `outline: var(--border-width-thick) solid var(--color-border-focus)`, `outline-offset: 2px`, `border-radius: var(--radius-container)`, around the whole item.

Open and closed items use the same background; the chevron and the visible answer show the state.

## Rules
- The whole header is one `<button>` with `aria-expanded="true|false"` and `aria-controls` pointing to the answer.
- Questions are full questions ending in "?"; answers are short, plain paragraphs.
- Several items can be open at once unless the page says otherwise.
- Never hardcode colors or sizes; the Theme mode decides the brand look.

## Example
```jsx
import { ChevronDown } from 'lucide-react';

<div className="accordion">
  <div className="accordion__item">
    <button className="accordion__header" aria-expanded={open} aria-controls="faq-1" onClick={() => setOpen(!open)}>
      <span className="accordion__question">How do I enter?</span>
      <ChevronDown aria-hidden="true" size={16} className="accordion__chevron" style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
    </button>
    {open && <p className="accordion__answer" id="faq-1">Buy a promotional pack and enter the code inside.</p>}
  </div>
</div>

<style>{`
.accordion { display:flex; flex-direction:column; gap:var(--spacing-20); }
.accordion__item { background:var(--color-surface-subtle); border-radius:var(--radius-container); padding:0 var(--spacing-8); }
.accordion__header { display:flex; align-items:center; gap:var(--spacing-24); width:100%; padding:var(--spacing-12) 0;
  background:none; border:0; text-align:left; cursor:pointer; border-radius:var(--radius-container); }
.accordion__header:focus-visible { outline:var(--border-width-thick) solid var(--color-border-focus); outline-offset:2px; }
.accordion__question { flex:1; font:700 var(--font-size-20)/var(--line-height-24) var(--font-family-body); color:var(--color-text-default); }
.accordion__header:hover .accordion__question { color:var(--color-text-hover); }
.accordion__chevron { flex-shrink:0; color:var(--color-text-link); }
.accordion__answer { margin:0; padding-bottom:var(--spacing-16); font:400 var(--font-size-16)/var(--line-height-20) var(--font-family-body); color:var(--color-text-secondary); }
`}</style>
```
