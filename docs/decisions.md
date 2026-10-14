# Decisions

Every project decision goes here: what we decided, what else we considered, why, and when. Newest at the bottom.

---

## D1 — One Theme collection with a mode per brand

- **Decision:** Brand theming uses one `2. Theme` variable collection with a mode per brand: `JOY` (default), `Doritos`, `Rockstar`.
- **Options considered:** (a) one Theme collection with brand modes; (b) extended collections, one per brand; (c) a separate library file per brand.
- **Why:** Extended collections are Enterprise-only and we're on a student plan, so modes are the simplest option that works.
- **Date:** 2026-10-13

## D2 — Make Kit comes from the published Figma library

- **Decision:** The Figma Make Kit is assembled from the published Figma library, not from an npm package.
- **Options considered:** (a) published Figma library plus guidelines `.md` files; (b) a coded npm component package.
- **Why:** This phase delivers Figma foundations, not production code, so the library and written guidelines are the source Make rebuilds from.
- **Date:** 2026-10-13

## D3 — Two token layers plus a Scale collection, no component tokens yet

- **Decision:** Tokens use two layers (`1. Primitives` → `2. Theme`) plus a `3. Scale` collection. No component-level tokens for now.
- **Options considered:** (a) Primitives → Theme + Scale; (b) Primitives → Theme → Component tokens.
- **Why:** Two layers are enough to theme 3 brands and are easier for a team that's new to design systems. Component tokens can be added later if we need them.
- **Date:** 2026-10-13

## D4 — Phase 1 covers 8 core components

- **Decision:** Phase 1 builds Button, Icon Button, Text Field, Accordion, Card (Step, Prize, Content), Badge, Breadcrumb, and Pagination Dots.
- **Options considered:** (a) these 8 core components; (b) also the page-level patterns (Navbar, Footer, Newsletter, Promo Hero, and others).
- **Why:** These are the building blocks the current promo pages use most. The larger patterns are built from them, so they move to Phase 2.
- **Date:** 2026-10-13

## D5 — Inter is the placeholder font until Galano Grotesque is sourced

- **Decision:** Use Inter as a placeholder font family in Figma until Galano Grotesque (the live site's font) is available in the file.
- **Options considered:** (a) install licensed Galano Grotesque on every editor's machine now; (b) use Inter as a placeholder; (c) pick another fallback font.
- **Why:** Galano Grotesque isn't available in the AI-Assisted Design System file, and it's a paid font. Inter is free, ships with Figma, and has every weight we might need, so text work can go ahead now.
- **How to swap later:** keep the font family in one Primitive (for example `font/family/brand`) so replacing Inter means changing one value, not every text style.
- **Date:** 2026-10-13

## D6 — Existing site screenshots live in references/live-site/

- **Decision:** Move the 13 screenshots from `references/screenshots/` to `references/live-site/`.
- **Options considered:** (a) keep them in `references/screenshots/`; (b) move them into `references/live-site/`.
- **Why:** CLAUDE.md says live-site captures go in `references/live-site/`, and having one folder for them is easier to find.
- **Date:** 2026-10-13
