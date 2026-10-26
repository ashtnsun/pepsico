# JOY Design System — Claude Code rules

Read this file at the start of every session. These rules apply to every prompt unless the prompt says otherwise.

## What this project is

A themeable design system for JOY by PepsiCo, the cross-brand rewards and promotions platform. It's built by the PurdueUX x PepsiCo student team.

- **Goal of this phase:** foundations (tokens, typography, 8 core components) in Figma, clean enough to publish as a library and turn into a Figma Make Kit for AI-assisted prototyping.
- **Audience:** a team where several people are new to design systems. Prefer simple, plainly named, well-explained over clever or flexible. Complexity gets added later.
- **Brands in this phase:** JOY (default), Doritos, Rockstar.

## Figma files

| File | Key | Use |
| --- | --- | --- |
| [AI-Assisted Design System](https://www.figma.com/design/AJ0GKjFjDNvEsD4MfdyZaN/AI-Assisted-Design-System) | `AJ0GKjFjDNvEsD4MfdyZaN` | **Where we build.** The only file you write to. |
| [Pepsi Purdue Sponsor Files (Copy)](https://www.figma.com/design/g4wG15yJrdTxcQoeQ7Cf0v/Pepsi-Purdue-Sponsor-Files--Copy-) | `g4wG15yJrdTxcQoeQ7Cf0v` | Current site frames and brand sheets. Read-only. Page "Promotion Pages/Flow". Best reference frame: `18:4470` (desktop active promo landing page). |
| [Wireframes](https://www.figma.com/design/IMEy8gioQJFpGIgb9qIUJe/Wireframes) | `IMEy8gioQJFpGIgb9qIUJe` | Redesign ideas. Read-only. Use only as a component wishlist. |

Node IDs in links use a hyphen (`node-id=18-4470`); the MCP tools take a colon (`18:4470`).

**Brand sheets** ("JOY HUB GLOBAL / DESIGN SYSTEM, MVP 2026") in the Sponsor Files are the source of truth for brand color and patterns:

| Brand | Node | Colors | Also documented |
| --- | --- | --- | --- |
| JOY | `18:20865` | Black `#000000`, Purple `#9E00BF`, Blue `#1442FF` (we use `#1443FF`, D7), Sky `#75DEF2`, Green `#EBFF40`, Orange `#FF8000`, White `#FFFFFF`, Dark Blue `#0A0F36` | Palette + contrast matrix only (no CTA or nav spec) |
| Doritos | `18:16576` | Red `#E31722`, Dark `#030303`, Orange `#FA7115`, White `#FFFFFF`, Black `#000000` | Contrast matrix; CTA spec (filled, outline, text link × Default, Hover, Pressed, Focus, Disabled × light/dark background); navigation with brand band; 48px circular icon buttons |
| Rockstar | `18:17654` | Black `#000000` (white text only), Violet `#B64F9B` (black or white text) | Colors only. Hover, disabled, surface, and type values must be DERIVED and flagged for approval. |

All brand sheets are on the Sponsor Files page **"Brand guides/elements" (`18:15669`)**. `get_metadata` without a node ID doesn't list this page, so open it by ID. The page also has sheets or contrast matrices for Lay's, Pepsi, Cheetos, Walkers and others (see `docs/audit.md` §1). Note: Doritos Orange on white fails contrast (2.82:1) and must not carry text on light surfaces.

**Live site:** https://www.joy-pepsico.eu/en-gb/ (public; Drupal 9, Bootstrap-based theme). The JOY sheet above only covers colors, so the live site's CSS is the source for other exact JOY base values (hover colors, font weights, breakpoints). Where it disagrees with the Figma frames on intent, the Figma frames win.

Known from the current site (verify, don't assume): font Galano Grotesque (Regular, Bold); text `#333333`, secondary text `#666666`; JOY blue `#1443FF` for buttons, newsletter band, and footer; subtle surface `#F4F4F4`; pill buttons with radius 32 and padding 12/20; accordion radius 10. The current file has **no variables or styles**; everything is hardcoded.

## Architecture (decided; don't change without asking)

- **3 variable collections:**
  - `1. Primitives` (1 mode): raw color ramps and font family names. Hidden from publishing.
  - `2. Theme` (modes: `JOY`, `Doritos`, `Rockstar`; JOY is the default): semantic tokens. Every value is an alias to a Primitive.
  - `3. Scale` (1 mode): spacing, radius, border width, font size, line height.
- **Components use only Theme and Scale tokens**, never Primitives and never raw values.
- No extended collections (Enterprise-only; we're on a student plan).
- The Make Kit is assembled from the published Figma library, so guidelines `.md` files must describe each component precisely enough for Make to rebuild it in code.

## Naming conventions

- Variables: `category/role/variant`, lowercase, slash-separated. Examples: `color/text/default`, `color/action/primary-hover`, `spacing/16`, `radius/control`.
- Theme color roles: `surface`, `text`, `action`, `border`, `brand`, `feedback`. **No brand names in Theme token names.**
- Primitives may carry brand names: `doritos/red/500`.
- Web code syntax on every variable: slashes become hyphens, e.g. `var(--color-text-default)`.
- Text styles: `Display`, `Heading/1`–`Heading/3`, `Body/L`, `Body/M`, `Body/S`, `Label`, `Caption` (adjust only if the audit justifies it).
- Components: Title Case (`Button`, `Text Field`). Variant properties: `Variant`, `Size`, `State`. Booleans read as questions: `Has icon`, `Has label`.
- Layers: meaningful names (`Container`, `Label`, `Icon`). Never leave `Frame 123`, `Group 4`, or `Rectangle 2`.

## Phase 1 components

Button · Icon Button · Text Field · Accordion · Card (Step, Prize, Content) · Badge · Breadcrumb · Pagination Dots

- Interactive states follow the Doritos sheet: `Default`, `Hover`, `Pressed`, `Focus`, `Disabled`.
- Button variants: `Primary` (filled), `Secondary` (outline), `Tertiary` (text link); Button and Icon Button also have `Background`: `Light`, `Dark`.
- Badge statuses include `Active` and `Expired` (research found expired promos look like active ones). Breadcrumb emphasizes the current page.
- Icons: one outline icon set; icon color always from a Theme text token.

Phase 2 (not now): Navbar, Footer, Newsletter, Promo Hero, Section Nav, Progress Tracker, Result Message.

## Standing rules

1. **Never invent official brand values.** If a brand color, font, or rule isn't in the brand sheets, `references/`, or the Figma files, write `NEEDS SOURCE` and ask me. Values you compute from sourced colors (hover shades, tints) are labelled `DERIVED` and need my approval.
2. **Read before you write.** Use the Figma MCP to inspect real nodes (`get_design_context` section by section; `get_metadata` for structure) instead of guessing from memory.
3. **Load the `figma-use` skill before any `use_figma` call.** Also load `figma-generate-library` when building variables or components, if it's available.
4. **Work in small batches** in Figma: one collection, one component set, or one page section per `use_figma` call. Report node IDs of what you create.
5. **Verify visually.** After any Figma write, take a `get_screenshot` and compare it with what you intended. For themed work, check all 3 modes.
6. **No hardcoded values** in components: every fill, stroke, radius, gap, and padding binds to a variable; every text layer uses a text style.
7. **Ask before deviating** from the architecture, token list, or component list. Propose changes with a reason; don't add things silently.
8. **Stay in scope.** Do only what the current prompt asks. Note other ideas under "Open questions" in the log.
9. **Plain English** in everything a teammate reads: descriptions, docs, Read Me.
10. **Commit after every session** with a message like `prompt-3: foundations in figma`.

## Repo structure

```
joy-design-system/
├── CLAUDE.md
├── README.md
├── references/            # PDFs, screenshots, brand guidelines (read-only, never edit)
│   └── live-site/         # Prompt 0.5 capture of joy-pepsico.eu/en-gb: screenshots, CSS extract
├── tokens/                # W3C DTCG JSON: primitives.json, theme.json, scale.json
├── guidelines/            # Make Kit guidelines, written for an AI reader
│   ├── Guidelines.md
│   ├── foundations/
│   └── components/
└── docs/
    ├── process-log.md
    ├── decisions.md
    ├── audit.md
    ├── tokens.md
    ├── qa-report.md
    └── screenshots/
```

## Prototype phase (web, for usability testing)

From Prompt 17 we also build an interactive web prototype of the redesigned site in `prototype/` (Vite + React + TypeScript). It is for usability testing, so the major tasks must work end to end.

- **Looks:** match the live site (captures in `references/live-site/`). The wireframes only suggest structure and new features; never copy their visuals.
- **Colors:** buttons, links and navigation stay JOY blue on every page, as on the live site. The brand color only fills promotion surfaces (hero band, step circles, prize band, teaser card). This is different from the Figma `Doritos`/`Rockstar` modes (D36).
- **Tokens:** `prototype/src/styles/tokens.css` is a copy of `guidelines/foundations/tokens.md`. Values the live site uses that aren't tokens (yellow CTA, brand teaser colors, button height 45) live in `prototype/src/styles/site.css` with a comment naming their source. The Figma rules about binding variables don't apply to the prototype.
- **Images:** real assets from the live site in `prototype/public/images/` (internal testing only). Font: Inter.
- **Data:** fake, stored in the browser (`localStorage`). A hidden moderator panel (`Shift + M`) resets data and forces a win or a loss.
- Run with `cd prototype && npm install && npm run dev`.
- **Iteration log (required):** after every prototype change, append an entry to `docs/prototype-iterations.md` (prompt verbatim, what changed, why, how AI was used, files, checks). When I say "save state N", take full-page screenshots of every route at 1440 and 390 px into `docs/save-states/save-state-N/` and add a save-state summary there (what changed since the last save state and the context behind it).

## Logging (required, every session)

At the end of every session, **append** (never overwrite) an entry to `docs/process-log.md`:

```markdown
---
## Session N — <prompt name> — <YYYY-MM-DD>

### Prompt (verbatim)
<paste the exact prompt I gave you>

### What I did
- <bullet per meaningful action>

### Changes
- Repo: <files created or changed>
- Figma: <pages, collections, components created or changed, with node IDs>

### Decisions
- <decision> — <why>. (Also add it to docs/decisions.md.)

### Verification
- <what you checked and how: screenshots, variable reads, contrast script>

### Open questions / next steps
- <anything I need to decide or provide>
```

When a decision is made, also add it to `docs/decisions.md` as: decision, options considered, why, and date.

## Component guidelines format (`guidelines/components/<component>.md`)

Written for Figma Make (an AI) to rebuild the component in code. Short, imperative, exact token names.

```markdown
# <Component>

<One sentence: what it is and what it's for.>

## When to use / when not to
- Use for …
- Don't use for … (use <other component> instead)

## Anatomy
- Container: padding `var(--spacing-12)` `var(--spacing-20)`, radius `var(--radius-control)`, …
- Label: text style Label, color `var(--color-text-on-action)`
- Icon (optional): 16px, …

## Variants and states
| Variant | Background | Text | Border |
| --- | --- | --- | --- |
| Primary | `var(--color-action-primary)` | `var(--color-text-on-action)` | none |

Hover: … · Disabled: … · Focus: 2px `var(--color-border-focus)` outline

## Rules
- Always …
- Never hardcode colors; never …

## Example
<short JSX/HTML example using the CSS variables>
```
