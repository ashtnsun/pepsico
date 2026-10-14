# Tokens

The design tokens live in two places that must match:

- **Figma:** variable collections in the [AI-Assisted Design System](https://www.figma.com/design/AJ0GKjFjDNvEsD4MfdyZaN/AI-Assisted-Design-System) file.
- **Repo:** `tokens/primitives.json`, `tokens/theme.json`, `tokens/scale.json` (W3C DTCG format).

Built 2026-10-14 (Prompt 2). Values come from `docs/audit.md` §6 and decisions D7–D15 in `docs/decisions.md`.

## How the three collections fit together

| Collection | Modes | What's in it | Who uses it |
| --- | --- | --- | --- |
| `1. Primitives` | Value | 20 raw colors + 1 font family. Hidden from publishing. | Only the Theme collection. **Never use a Primitive in a component.** |
| `2. Theme` | **JOY** (default), Doritos, Rockstar | 24 color roles + 1 font family. Every value points to a Primitive. | Components (colors, font) |
| `3. Scale` | Value | 31 numbers: spacing, radius, border width, font size, line height, opacity | Components (sizes) |

Switching a frame's `2. Theme` mode from JOY to Doritos or Rockstar re-colors everything inside it. Scale values are the same for every brand.

In code, each variable becomes a CSS custom property: slashes become hyphens, e.g. `color/text/default` → `var(--color-text-default)`.

## Theme colors

| Token | JOY | Doritos | Rockstar | Use it for |
| --- | --- | --- | --- | --- |
| `color/surface/default` | white | white | white | Page and card background |
| `color/surface/subtle` | `#F4F4F4` | `#F4F4F4` | `#F4F4F4` | Quiet background (accordion) |
| `color/surface/inverse` | `#0E38DF` | `#030303` | `#000000` | Dark bands (newsletter) |
| `color/text/default` | `#333333` | `#333333` | `#333333` | Main text and icons |
| `color/text/secondary` | `#666666` | `#666666` | `#666666` | Supporting text |
| `color/text/on-inverse` | white | white | white | Text on `surface/inverse` |
| `color/text/on-action` | white | white | white | Label on a filled button |
| `color/text/on-action-pressed` | white | `#FA7115` | `#B64F9B` | Label on a filled button while pressed |
| `color/text/on-action-inverse` | `#1443FF` | white | white | Label on a filled button placed on a dark band |
| `color/text/link` | `#1443FF` | `#030303` | `#000000` | Text links, tertiary buttons |
| `color/text/on-feedback-active` | `#0A0F36` | same | same | Text on the Active badge |
| `color/text/on-feedback-expired` | white | same | same | Text on the Ended badge |
| `color/action/primary` | `#1443FF` | `#030303` | `#000000` | Filled button background |
| `color/action/primary-hover` | `#0E38DF` | `#030303` | `#000000` | …on hover (Doritos/Rockstar underline the label instead) |
| `color/action/primary-pressed` | `#0024B5` | `#030303` | `#000000` | …while pressed |
| `color/action/inverse` | white | `#030303` | `#000000` | Filled button on a dark band |
| `color/border/default` | `#EDEDED` | same | same | Inputs, dividers |
| `color/border/action` | `#1443FF` | `#030303` | `#000000` | Outline button border |
| `color/border/focus` | `#0A0F36` | `#E31722` | `#B64F9B` | Focus ring on light backgrounds |
| `color/border/focus-inverse` | white | `#FA7115` | `#B64F9B` | Focus ring on dark backgrounds |
| `color/brand/primary` | `#1443FF` | `#E31722` | `#000000` | Brand areas (step circles). Not buttons. |
| `color/brand/accent` | `#75DEF2` | `#FA7115` | `#B64F9B` | Decoration. Never text on light surfaces. |
| `color/feedback/active` | `#EBFF40` | same | same | Active badge |
| `color/feedback/expired` | `#B21119` | same | same | Ended badge |

Text tokens can also color icons (they're allowed on shape fills and strokes), because icon color always comes from a text token.

## Scale

| Group | Tokens |
| --- | --- |
| Spacing | `spacing/4` `8` `12` `16` `20` `24` `32` `40` `48` `80` |
| Radius | `radius/small` 4 · `radius/container` 10 · `radius/card` 20 · `radius/control` 32 · `radius/full` 9999 |
| Border width | `border-width/thin` 1 · `border-width/thick` 2 |
| Font size | `font-size/14` `16` `20` `24` `36` `60` |
| Line height | `line-height/16` `18` `20` `24` `28` `40` `64` |
| Opacity | `opacity/disabled` 30 (Figma stores opacity as a percentage; `scale.json` stores 0.3) |

## Font

`font/family/body` (Theme) → `font/family/brand` (Primitive) = **Inter**, a placeholder for Galano Grotesque (D5). To switch fonts, change that one Primitive value.

## Rules

- Components use **Theme and Scale tokens only**, never Primitives and never typed-in values.
- Don't put brand names in Theme token names. Brand names belong in Primitives (`doritos/red/500`).
- To add or change a token: update the JSON and Figma together, and log the change in `docs/decisions.md`.

## Text styles

Nine local text styles in Figma (Prompt 3). Each style's **font family, size and line height are bound to variables** (`font/family/body`, `font-size/*` and `line-height/*`), so changing a token updates every style. The weight is set on the style itself, because there are no weight tokens.

| Style | Weight | Size / line height | Use for |
| --- | --- | --- | --- |
| `Display` | Bold | 60 / 64 | Promo hero title (one per page) |
| `Heading/1` | Bold | 36 / 40 | Section titles |
| `Heading/2` | Bold | 24 / 28 | Sub-sections; section titles on mobile |
| `Heading/3` | Bold | 20 / 24 | Card titles, accordion questions |
| `Body/L` | Regular | 20 / 24 | Section intros, step text |
| `Body/M` | Regular | 16 / 20 | Default body, breadcrumb, badges |
| `Body/S` | Regular | 14 / 18 | Small print (desktop) |
| `Label` | Semi Bold | 16 / 20, **UPPERCASE** | Buttons, navigation, tabs |
| `Caption` | Regular | 14 / 16 | Small text on mobile |

Mobile sizes (D14): use Heading/2's size for section titles and Heading/1's size for the hero. These are written guidance, not separate styles.

**Swapping to Galano Grotesque:** change `font/family/brand` to `Galano Grotesque`, then update each style's weight name. Galano uses "SemiBold" (no space), while Inter uses "Semi Bold".
