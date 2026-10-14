# Process log

One entry per Claude Code session. Append new entries at the bottom; never edit or delete old ones.

Entry template:

```markdown
---
## Session N — <prompt name> — <YYYY-MM-DD>

### Prompt (verbatim)
<paste the exact prompt>

### What I did
- <bullet per meaningful action>

### Changes
- Repo: <files created or changed>
- Figma: <pages, collections, components created or changed, with node IDs>

### Decisions
- <decision> — <why>. (Also add it to docs/decisions.md.)

### Verification
- <what was checked and how: screenshots, variable reads, contrast script>

### Open questions / next steps
- <anything the team needs to decide or provide>
```

---
## Session 1 — Prompt 0: Repo setup — 2026-10-13

### Prompt (verbatim)
Read CLAUDE.md first; it has the standing rules for this project.

Set up this repo:
1. Create the folder structure described in CLAUDE.md.
2. Create docs/process-log.md using the log template in CLAUDE.md, and docs/decisions.md.
3. In docs/decisions.md, record these decisions with a one-line rationale each:
   - Brand theming uses one "2. Theme" variable collection with a mode per brand (JOY, Doritos, Rockstar), because extended collections are Enterprise-only.
   - The Make Kit is assembled from the published Figma library, not an npm package.
   - Two token layers (Primitives -> Theme) plus a Scale collection. No component tokens yet.
   - Phase 1 covers 8 core components (listed in CLAUDE.md).
4. List every file in references/ and confirm the project plan and design documentation PDFs are there. (Brand sheets live in the Sponsor Files Figma file; screenshots come from Prompt 0.5.)
5. Check Figma MCP access: run whoami, then get_metadata on each of the 3 files in CLAUDE.md. Tell me which you can read, and confirm you can write to the AI-Assisted Design System file. Confirm you can load the figma-use skill, and check whether Galano Grotesque is available as a font in that file.
6. Check that git and Node.js are installed (Prompt 0.5 needs Node for Playwright).
7. git init and make the first commit.

Do not create tokens or change anything in Figma yet. Log this session.

### What I did
- Read CLAUDE.md.
- Created the folder structure from CLAUDE.md: `references/live-site/`, `tokens/`, `guidelines/foundations/`, `guidelines/components/`, `docs/screenshots/`. Empty folders hold a `.gitkeep` file so git tracks them.
- Created `docs/process-log.md` (this file) and `docs/decisions.md` with decisions D1–D4.
- Added a short `README.md` (it's listed in the CLAUDE.md repo structure) and a `.gitignore` (ignores `node_modules/` for Prompt 0.5, plus OS clutter files).
- Listed `references/`:
  - `09PepsiCo_Documentation_Berry_Chan_Hittle_Lehner_Lim_Sun - Google Docs.pdf` (11 MB): design documentation ✅
  - `09PepsiCo_Project-Plan_Berry_Chan_Hittle_Lehner_Lim_Sun - Google Docs.pdf` (336 KB): project plan ✅
  - `screenshots/` (13 PNGs, already there): `brandpage`, `brandpicker`, `countrypicker`, `home`, `login`, `popup`, `profile`, `promoended`, `promopageexample1`, `promopageexample2`, `promos`, `register`, `signinloading`
  - `live-site/`: new, empty (for Prompt 0.5)
- Checked Figma MCP access:
  - `whoami`: handle `aysun` (sun1278@purdue.edu). Full seat on the "Pepsico x PurdueUX" student team, among others.
  - `get_metadata` on all 3 files worked:
    - AI-Assisted Design System (`AJ0GKjFjDNvEsD4MfdyZaN`): 1 page, "Page 1" (`0:1`). It's empty: no nodes, variables, text styles, or paint styles.
    - Pepsi Purdue Sponsor Files (Copy) (`g4wG15yJrdTxcQoeQ7Cf0v`): 1 page, "Promotion Pages/Flow" (`0:1`). I also read the Rockstar brand sheet `18:17654` to confirm the node IDs resolve.
    - Wireframes (`IMEy8gioQJFpGIgb9qIUJe`): 1 page, "Page 1" (`0:1`).
  - Write access to AI-Assisted Design System confirmed: one `use_figma` script created a temporary rectangle (`2:2`) and deleted it in the same run, so nothing was left in the file.
  - The `figma-use` skill loaded (Figma plugin v2.2.127).
  - Galano Grotesque is **not available** in the AI-Assisted Design System file. A search of all 8,927 available fonts found no family matching "Galano".
- Checked tools: git 2.53.0 (Windows), Node.js v22.12.0, npm 10.9.0, npx 10.9.0.
- Ran `git init` and made the first commit.

### Changes
- Repo: `README.md`, `.gitignore`, `docs/process-log.md`, `docs/decisions.md`, and `.gitkeep` files in `references/live-site/`, `tokens/`, `guidelines/foundations/`, `guidelines/components/`, `docs/screenshots/`. Initialized the git repo.
- Figma: no changes. The write test's temporary node `2:2` was created and deleted in the same script.

### Decisions
- D1: Brand theming uses one `2. Theme` collection with modes JOY, Doritos, Rockstar, because extended collections are Enterprise-only.
- D2: The Make Kit is assembled from the published Figma library, not an npm package.
- D3: Two token layers (Primitives → Theme) plus a Scale collection. No component tokens yet.
- D4: Phase 1 covers 8 core components.
- (All four are recorded in `docs/decisions.md`.)

### Verification
- `find` and `ls` listings of the repo and `references/`.
- Figma: `whoami`, `get_metadata` page listings for all 3 files, `get_metadata` on `18:17654`, and one `use_figma` script that read variables, styles, and fonts and ran the write test (it returned `writeOk: true` and `removed: true`).
- `git --version`, `node --version`, `npm --version`.

### Open questions / next steps
- **Galano Grotesque isn't available in Figma.** It's a commercial font. Options: (a) someone with a license installs it locally, and every teammate who edits text does the same; (b) we choose an approved fallback. Text styles can't use it until this is settled. Please tell me which option, or give me a source for an approved fallback. Until then the font is `NEEDS SOURCE`.
- `references/screenshots/` already has 13 screenshots, but CLAUDE.md says live-site captures go in `references/live-site/`. Should Prompt 0.5 keep these where they are as the team's own captures, or move them?
- The repo sits inside a OneDrive folder. OneDrive sync can sometimes lock or duplicate files inside `.git/`. If commits start failing, move the repo out of OneDrive or pause syncing.
- Next is Prompt 0.5: capture the live site with Playwright, which needs Node (installed).
