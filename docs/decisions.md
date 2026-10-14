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
