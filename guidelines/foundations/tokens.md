# Tokens (CSS)

Paste this into the app's global CSS once. Every component guideline uses these variables. Don't add other colors or sizes.

- The JOY brand is the default (`:root`).
- To switch brand, set `data-brand="doritos"` or `data-brand="rockstar"` on `<html>` or on any section. Only the colors change; sizes stay the same.
- Generated from `tokens/*.json` (Figma collections `1. Primitives`, `2. Theme`, `3. Scale`). The comment after each color names the raw palette color it comes from. Never use raw palette colors directly.
- `--opacity-disabled` is a percentage: use `opacity: calc(var(--opacity-disabled) / 100)`.

```css
:root, [data-brand="joy"] {
  /* Theme (JOY, default) */
  --color-surface-default: #FFFFFF; /* neutral/0 */
  --color-surface-subtle: #F4F4F4; /* neutral/50 */
  --color-surface-inverse: #0E38DF; /* joy/blue/600 */
  --color-text-default: #333333; /* neutral/800 */
  --color-text-secondary: #666666; /* neutral/600 */
  --color-text-on-inverse: #FFFFFF; /* neutral/0 */
  --color-text-on-action: #FFFFFF; /* neutral/0 */
  --color-text-on-action-pressed: #FFFFFF; /* neutral/0 */
  --color-text-on-action-inverse: #1443FF; /* joy/blue/500 */
  --color-text-on-action-inverse-pressed: #0024B5; /* joy/blue/700 */
  --color-text-link: #1443FF; /* joy/blue/500 */
  --color-text-link-pressed: #1443FF; /* joy/blue/500 */
  --color-text-on-feedback-active: #0A0F36; /* joy/blue/900 */
  --color-text-on-feedback-expired: #FFFFFF; /* neutral/0 */
  --color-action-primary: #1443FF; /* joy/blue/500 */
  --color-action-primary-hover: #0E38DF; /* joy/blue/600 */
  --color-action-primary-pressed: #0024B5; /* joy/blue/700 */
  --color-action-inverse: #FFFFFF; /* neutral/0 */
  --color-border-default: #EDEDED; /* neutral/100 */
  --color-border-action: #1443FF; /* joy/blue/500 */
  --color-border-action-inverse: #FFFFFF; /* neutral/0 */
  --color-border-focus: #0A0F36; /* joy/blue/900 */
  --color-border-focus-inverse: #FFFFFF; /* neutral/0 */
  --color-brand-primary: #1443FF; /* joy/blue/500 */
  --color-brand-accent: #75DEF2; /* joy/sky/300 */
  --color-feedback-active: #EBFF40; /* joy/green/300 */
  --color-feedback-expired: #B21119; /* joy/red/600 */
  --color-feedback-error: #B21119; /* joy/red/600 */
  --font-family-body: "Inter", system-ui, sans-serif; /* font/family/brand */

  /* Scale (same for every brand). opacity is a percentage: use calc(var(--opacity-disabled) / 100) */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-80: 80px;
  --radius-small: 4px;
  --radius-container: 10px;
  --radius-card: 20px;
  --radius-control: 32px;
  --radius-full: 9999px;
  --border-width-thin: 1px;
  --border-width-thick: 2px;
  --font-size-14: 14px;
  --font-size-16: 16px;
  --font-size-20: 20px;
  --font-size-24: 24px;
  --font-size-36: 36px;
  --font-size-60: 60px;
  --line-height-16: 16px;
  --line-height-18: 18px;
  --line-height-20: 20px;
  --line-height-24: 24px;
  --line-height-28: 28px;
  --line-height-40: 40px;
  --line-height-64: 64px;
  --opacity-disabled: 30;
}

[data-brand="doritos"] {
  --color-surface-inverse: #030303; /* doritos/dark/900 */
  --color-text-on-action-pressed: #FA7115; /* doritos/orange/500 */
  --color-text-on-action-inverse: #FFFFFF; /* neutral/0 */
  --color-text-on-action-inverse-pressed: #FA7115; /* doritos/orange/500 */
  --color-text-link: #030303; /* doritos/dark/900 */
  --color-text-link-pressed: #E31722; /* doritos/red/500 */
  --color-action-primary: #030303; /* doritos/dark/900 */
  --color-action-primary-hover: #030303; /* doritos/dark/900 */
  --color-action-primary-pressed: #030303; /* doritos/dark/900 */
  --color-action-inverse: #030303; /* doritos/dark/900 */
  --color-border-action: #030303; /* doritos/dark/900 */
  --color-border-focus: #E31722; /* doritos/red/500 */
  --color-border-focus-inverse: #FA7115; /* doritos/orange/500 */
  --color-brand-primary: #E31722; /* doritos/red/500 */
  --color-brand-accent: #FA7115; /* doritos/orange/500 */
}

[data-brand="rockstar"] {
  --color-surface-inverse: #000000; /* rockstar/black/900 */
  --color-text-on-action-pressed: #B64F9B; /* rockstar/violet/500 */
  --color-text-on-action-inverse: #FFFFFF; /* neutral/0 */
  --color-text-on-action-inverse-pressed: #B64F9B; /* rockstar/violet/500 */
  --color-text-link: #000000; /* rockstar/black/900 */
  --color-text-link-pressed: #000000; /* rockstar/black/900 */
  --color-action-primary: #000000; /* rockstar/black/900 */
  --color-action-primary-hover: #000000; /* rockstar/black/900 */
  --color-action-primary-pressed: #000000; /* rockstar/black/900 */
  --color-action-inverse: #000000; /* rockstar/black/900 */
  --color-border-action: #000000; /* rockstar/black/900 */
  --color-border-focus: #B64F9B; /* rockstar/violet/500 */
  --color-border-focus-inverse: #B64F9B; /* rockstar/violet/500 */
  --color-brand-primary: #000000; /* rockstar/black/900 */
  --color-brand-accent: #B64F9B; /* rockstar/violet/500 */
}
```
