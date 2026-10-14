# Card

Content blocks for promo pages. There are three types: **Step** (one step of "How to take part"), **Prize** (one prize tile) and **Content** (image + title + text + buttons).

## When to use / when not to
- **Step:** in a row of 3–4 numbered steps explaining how to enter a promotion.
- **Prize:** in a row or slider of prizes; one tile per prize.
- **Content:** for a product, news or brand story with a call to action.
- Don't use cards as buttons; only the buttons inside a Content card are clickable.

## Anatomy

**Step** (328 × 420):
- Circle: 328px, `background: var(--color-brand-primary)`, `border-radius: var(--radius-full)`, starting 16px from the top.
- Number badge: 48px circle, `background: var(--color-surface-default)`, number in **Heading/3** `var(--color-text-default)`, centered horizontally, 46px from the top.
- Step text: **Body/L**, `var(--color-text-on-inverse)`, centered, max width 230px, 134px from the top.
- Image (product shot): 287 × 151, `border-radius: var(--radius-container)`, overlapping the bottom of the circle (top at 252px).

**Prize** (328 × 420):
- Card: `background: var(--color-brand-primary)`, `border-radius: var(--radius-card)`, clips its content.
- Number badge: same as Step.
- Image: 263 × 139, `border-radius: var(--radius-container)`, top at 124px, centered.
- Prize name: **Heading/3**, `var(--color-text-on-inverse)`, centered, max width 230px, top at 348px.

**Content** (1100 wide, height follows the image, 403px in the reference):
- Row: `gap: var(--spacing-24)`.
- Image: about half the width (565px), `border-radius: var(--radius-card)`.
- Text column: padding `var(--spacing-48)` `var(--spacing-24)`, vertically centered, `gap: var(--spacing-40)` between the text block and the buttons.
  - Title: **Heading/1**, `var(--color-text-default)`.
  - Body: **Body/M**, `var(--color-text-default)`, `gap: var(--spacing-24)` below the title.
  - Buttons: Button Primary + Button Secondary (Background Light), `gap: var(--spacing-16)`.
- On mobile, stack the image above the text.

## Variants
| Type | Background | Text color | Has buttons |
| --- | --- | --- | --- |
| Step | `var(--color-brand-primary)` circle | `var(--color-text-on-inverse)` | no |
| Prize | `var(--color-brand-primary)` card | `var(--color-text-on-inverse)` | no |
| Content | none (sits on the page surface) | `var(--color-text-default)` | yes |

## Rules
- Brand color always comes from `var(--color-brand-primary)`; the Theme mode decides the brand. Promo-specific artwork (e.g. a yellow Lay's campaign) goes in the image, not in the card colors.
- Every image needs `alt` text (Step: describe the product; Prize: name the prize).
- Step text is one short sentence that starts with a verb ("Buy…", "Scan…", "Enter…").
- Never hardcode colors or sizes.

## Example
```jsx
<ol className="steps">
  <li className="step-card">
    <span className="step-card__number">1</span>
    <p className="step-card__text">Buy one of the participating products</p>
    <img className="step-card__image" src={packShot} alt="Doritos promotional packs" />
  </li>
</ol>

<style>{`
.step-card { position:relative; width:328px; height:420px; list-style:none; }
.step-card::before { content:''; position:absolute; top:16px; left:0; width:328px; height:328px;
  border-radius:var(--radius-full); background:var(--color-brand-primary); }
.step-card__number { position:absolute; top:46px; left:140px; width:48px; height:48px; display:grid; place-items:center;
  border-radius:var(--radius-full); background:var(--color-surface-default); color:var(--color-text-default);
  font:700 var(--font-size-20)/var(--line-height-24) var(--font-family-body); }
.step-card__text { position:absolute; top:134px; left:49px; width:230px; margin:0; text-align:center;
  color:var(--color-text-on-inverse); font:400 var(--font-size-20)/var(--line-height-24) var(--font-family-body); }
.step-card__image { position:absolute; top:252px; left:20px; width:287px; height:151px; object-fit:contain; border-radius:var(--radius-container); }
`}</style>
```
