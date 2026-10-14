# Breadcrumb

A thin bar under the navigation that shows where the page sits (Home / Brands / Doritos / current page) and links back up.

## When to use / when not to
- Use on every page below the homepage: brand pages, promotion pages, FAQ, login.
- Don't use on the homepage.
- Don't use for steps in a process (use a progress tracker, Phase 2).

## Anatomy
- Bar: full width, `background: var(--color-surface-default)`, `border-top: var(--border-width-thin) solid var(--color-border-action)`, padding `var(--spacing-8)` `var(--spacing-40)`, `gap: var(--spacing-12)`, height 36px.
- Items (links): text style **Body/M**, `text-transform: uppercase`, `var(--color-text-default)`.
- Separator: "/" in **Body/M**, `var(--color-text-default)`, `aria-hidden="true"`.
- Current page (last item): text style **Label** (semibold, uppercase), `var(--color-text-default)`. Not a link; mark it with `aria-current="page"`.
- Levels: Home, then up to 3 middle levels, then the current page.

## States (links)
| State | Look |
| --- | --- |
| Default | Body/M, no underline |
| Hover | `text-decoration: underline` |
| Focus | `outline: var(--border-width-thick) solid var(--color-border-focus)`, `outline-offset: 2px`, `border-radius: var(--radius-small)` |
| Current | Label style (semibold), no link, no hover |

## Rules
- Wrap it in `<nav aria-label="Breadcrumb">` with an ordered list.
- Item names match the page titles they link to, shortened if needed.
- On small screens, show only the parent level and the current page.
- Never hardcode colors; the top border follows the brand (JOY blue, Doritos and Rockstar black).

## Example
```jsx
<nav aria-label="Breadcrumb" className="breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/brands">Brands</a></li>
    <li><a href="/brands/doritos">Doritos</a></li>
    <li aria-current="page">Las Vegas Wrap</li>
  </ol>
</nav>

<style>{`
.breadcrumb { background:var(--color-surface-default); border-top:var(--border-width-thin) solid var(--color-border-action);
  padding:var(--spacing-8) var(--spacing-40); }
.breadcrumb ol { display:flex; gap:var(--spacing-12); margin:0; padding:0; list-style:none;
  font:400 var(--font-size-16)/var(--line-height-20) var(--font-family-body); text-transform:uppercase; color:var(--color-text-default); }
.breadcrumb li + li::before { content:'/'; margin-right:var(--spacing-12); }
.breadcrumb a { color:inherit; text-decoration:none; border-radius:var(--radius-small); }
.breadcrumb a:hover { text-decoration:underline; }
.breadcrumb a:focus-visible { outline:var(--border-width-thick) solid var(--color-border-focus); outline-offset:2px; }
.breadcrumb [aria-current="page"] { font-weight:600; }
`}</style>
```
