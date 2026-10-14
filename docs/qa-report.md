# QA report: Phase 1

**Date:** 2026-10-14 · **File:** [AI-Assisted Design System](https://www.figma.com/design/AJ0GKjFjDNvEsD4MfdyZaN/AI-Assisted-Design-System) · **Scope:** tokens, text styles, the 8 Phase 1 components, guidelines.

All checks were run by scripts that read the Figma file and the repo, not by eye. The visual checks are the 3-brand preview screenshots in `docs/screenshots/`.

## Summary

| Check | Result |
| --- | --- |
| Variables: scopes, code syntax, descriptions, aliases | ✅ 81 variables, 0 issues |
| Theme only aliases Primitives (no raw values) | ✅ |
| `tokens/*.json` matches Figma | ✅ 0 differences |
| Components bind every fill, stroke, radius, padding, gap and stroke weight to a variable | ✅ 0 issues across 10 component sets / components |
| No component uses a Primitive directly | ✅ |
| Every text layer uses a text style | ✅ |
| No default layer names (`Frame 12`, `Rectangle 3`…) | ✅ |
| Every component has a description | ✅ |
| Guidelines only reference real tokens | ✅ 8 guidelines, every `var(--…)` exists |
| Contrast (text 4.5:1, borders and focus 3:1) | ✅ 23 of 24 pairs pass in all 3 brands; 1 known exception (below) |

## Inventory

**Pages:** Page 1 (empty), Foundations, Icons, Button, Text Field, Icon Button, Accordion, Card, Badge, Breadcrumb, Pagination Dots.

**Variables:** `1. Primitives` 21 (hidden from publishing) · `2. Theme` 29 (JOY default, Doritos, Rockstar) · `3. Scale` 31.

**Text styles (9):** Display, Heading/1–3, Body/L, Body/M, Body/S, Label, Caption. Each has its font family, size and line height bound to variables.

| Component | Variants | Properties | Layers audited |
| --- | --- | --- | --- |
| Button | 30 | Variant, Background, State, Label, Has left/right icon, Left/Right icon | 186 |
| Icon Button | 10 | Background, State, Icon | 22 |
| Text Field | 10 | Background, State, Label, Text, Helper text, Has label, Has helper text | 52 |
| Accordion | 6 | Is open, State, Question, Answer | 32 |
| Card | 3 | Type, Number, Step text, Prize name, Title, Body | 20 |
| Badge | 2 | Status | 4 |
| Breadcrumb Item | 4 | State | 14 |
| Breadcrumb | 1 | Has level 2, 3, 4 | 14 |
| Dot | 2 | State | 4 |
| Pagination Dots | 1 | Has dot 4, 5 | 6 |
| Icon/Chevron Down (placeholder) | 1 | — | — |

## Contrast (computed from the Figma values)

| Pair | Needs | JOY | Doritos | Rockstar |
| --- | --- | --- | --- | --- |
| `text/default` on `surface/default` | 4.5:1 | 12.63 | 12.63 | 12.63 |
| `text/default` on `surface/subtle` | 4.5:1 | 11.49 | 11.49 | 11.49 |
| `text/secondary` on `surface/default` | 4.5:1 | 5.74 | 5.74 | 5.74 |
| `text/secondary` on `surface/subtle` | 4.5:1 | 5.22 | 5.22 | 5.22 |
| `text/link` on `surface/default` | 4.5:1 | 6.41 | 20.62 | 21.00 |
| `text/link-pressed` on `surface/default` | 4.5:1 | 6.41 | 4.76 | 21.00 |
| `text/on-inverse` on `surface/inverse` | 4.5:1 | 7.92 | 20.62 | 21.00 |
| `text/on-action` on `action/primary` | 4.5:1 | 6.41 | 20.62 | 21.00 |
| `text/on-action` on `action/primary-hover` | 4.5:1 | 7.92 | 20.62 | 21.00 |
| `text/on-action-pressed` on `action/primary-pressed` | 4.5:1 | 10.94 | 7.30 | 4.58 |
| `text/on-action-inverse` on `action/inverse` | 4.5:1 | 6.41 | 20.62 | 21.00 |
| `text/on-action-inverse-pressed` on `action/inverse` | 4.5:1 | 10.94 | 7.30 | 4.58 |
| `text/on-action-pressed` on `surface/inverse` | 4.5:1 | 7.92 | 7.30 | 4.58 |
| `text/on-feedback-active` on `feedback/active` | 4.5:1 | 16.67 | 16.67 | 16.67 |
| `text/on-feedback-expired` on `feedback/expired` | 4.5:1 | 7.03 | 7.03 | 7.03 |
| `feedback/error` on `surface/default` | 4.5:1 | 7.03 | 7.03 | 7.03 |
| `text/on-inverse` on `brand/primary` (Step, Prize cards) | 4.5:1 | 6.41 | 4.76 | 21.00 |
| `border/action` on `surface/default` | 3:1 | 6.41 | 20.62 | 21.00 |
| `border/action-inverse` on `surface/inverse` | 3:1 | 7.92 | 20.62 | 21.00 |
| `border/focus` on `surface/default` | 3:1 | 18.51 | 4.76 | 4.58 |
| `border/focus-inverse` on `surface/inverse` | 3:1 | 7.92 | 7.30 | 4.58 |
| Text Field border, light (`text/secondary` on `surface/default`) | 3:1 | 5.74 | 5.74 | 5.74 |
| Text Field border, dark (`border/default` on `surface/inverse`) | 3:1 | 6.77 | 17.62 | 17.94 |
| Error border on dark (`feedback/error` on `surface/inverse`) | 3:1 | **1.13 ✗** | **2.93 ✗** | **2.99 ✗** |

**Known exception:** on dark backgrounds the error border is too faint. The design doesn't rely on it: the error message stays white and starts with "Error:" (D27). An error icon would make it clearer once the icon set exists.

## Issues to resolve (open decisions)

| # | Issue | Where | Options |
| --- | --- | --- | --- |
| 1 | For Doritos and Rockstar, Accordion hover only darkens the question from `#333` to black, which is hard to see | Accordion | Underline on hover · add a hover background token |
| 2 | The red Ended badge blends into Doritos-red areas | Badge | White border · keep badges off red areas (current guideline) |
| 3 | On dark backgrounds, Doritos and Rockstar Primary looks the same as Secondary (as the brand sheet draws it) | Button, Icon Button | Keep · give Primary a different fill on dark |
| 4 | The icon set isn't chosen; `Icon/Chevron Down` is a placeholder | Icons, Button, Icon Button, Accordion | Pick one outline icon set |
| 5 | Galano Grotesque isn't installed; Inter is a placeholder | All text | Get the license, then swap `font/family/brand` and the weight names |
| 6 | The light Text Field border borrows a text token (`text/secondary`) | Text Field | Keep · add `color/border/input` |

## Housekeeping

- **Page 1 is empty.** Rename it to "Cover" (with a short Read Me) or delete it before publishing.
- **Foundations page:** hex values and token names on the boards are typed text. Swatches update automatically, but the text doesn't; regenerate it if a Primitive value changes.
- **Documentation aids:** the state/row labels next to each component set use fixed grey text. They're notes for designers, not part of the components, and aren't published as components.
- **Reference differences** (all recorded in `docs/decisions.md`): Primary hover underline for all brands (D19), focus ring outside the button (D21), Button and Text Field 44px tall (D23, D28), Accordion open background (D29), prize card artwork (D30), solid grey pagination dots (D33).

## Not covered by this QA
- Publishing the library and building the Make Kit (`guidelines/Guidelines.md`, `guidelines/foundations/*.md`).
- Testing with real content (long labels, other languages) and on mobile widths.
- Screen-reader behavior; it's specified in the guidelines but can only be tested in code.
