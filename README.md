# JOY Design System

A themeable design system for JOY by PepsiCo, the cross-brand rewards and promotions platform, built by the PurdueUX x PepsiCo student team.

- **Rules for Claude Code and for anyone working in this repo:** [CLAUDE.md](CLAUDE.md)
- **What happened in each session:** [docs/process-log.md](docs/process-log.md)
- **Why we made each choice:** [docs/decisions.md](docs/decisions.md)

## Folders

| Folder | What's in it |
| --- | --- |
| `references/` | Source material: PDFs, screenshots, brand guidelines. Read-only. |
| `references/live-site/` | Screenshots and CSS captured from joy-pepsico.eu (Prompt 0.5). |
| `tokens/` | Design tokens as W3C DTCG JSON (`primitives.json`, `theme.json`, `scale.json`). |
| `guidelines/` | Instructions for Figma Make (an AI) on how to rebuild each foundation and component in code. |
| `docs/` | Process log, decisions, audit, token docs, QA report, screenshots. |

## Publishing the library and building the Make Kit

Publishing has to be done by a person in the Figma app; the API can't publish.

1. Open the [AI-Assisted Design System](https://www.figma.com/design/AJ0GKjFjDNvEsD4MfdyZaN/AI-Assisted-Design-System) file.
2. Open the **Assets** panel → **Library** icon (book) → **Publish**.
3. Check the list:
   - Collections `2. Theme` and `3. Scale`, the 9 text styles, and the components Button, Icon Button, Text Field, Accordion, Card, Badge, Breadcrumb, Breadcrumb Item, Pagination Dots, Dot and the 10 Lucide icons (`Icon/…`).
   - `1. Primitives` should not be listed; it's hidden from publishing on purpose.
4. Add a short description, e.g. "Phase 1: tokens, type, 8 components", and publish.
5. In **Figma Make**, create a Make Kit from the published library, then add the files from `guidelines/` to the kit's guidelines: `Guidelines.md` first, then `foundations/` and `components/`.
6. Test: ask Make for "a Doritos promotion page with steps, prizes and FAQ" and check that it uses `var(--…)` tokens and `data-brand="doritos"`.
