// Visual exploration (change 21): the brand theme of the page you're on, used to colour the global
// elements (navbar, breadcrumb, newsletter, footer). Which treatment is shown is picked in the config menu (C).
// Change 25: the page content (buttons, links, menus, FAQ boxes, focus rings) takes the brand theme too (`page`).
import type { CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import { getPromo } from '../data/promos'
import { brands, getBrand } from '../data/brands'

export type ChromeTheme = {
  /** Brand colour: the promotion's colour (hero band) or the brand page's "Welcome" band colour. */
  bg: string
  /** Text on bg: white, or black when white text fails 4.5:1 (7UP green, Lipton yellow). */
  text: string
  /** DERIVED: for the breadcrumb and newsletter, bg with 22% black (or 40% white on light brands), and the text that passes on it. */
  shade: string
  shadeText: string
  /** Brand logo for the navbar chip (none on multi-brand JOY promotions). */
  logo?: string
  name: string
  brandSlug?: string
  /** Brand decoration shapes, shown in the newsletter band instead of the JOY ones. */
  deco?: string
  /** Theme for the page content. Only for single-brand pages (none on multi-brand JOY promotions). */
  page?: PageTheme
}

/**
 * Doritos and Rockstar use their design system Theme mode (tokens.css `[data-brand]`, from the brand sheets).
 * Other brands get DERIVED token values from their brand colour (`vars`).
 */
export type PageTheme = {
  mode?: 'doritos' | 'rockstar'; vars?: CSSProperties; /** Text and link colour on white */ ink: string
  /** Change 27: only dark brands (black or navy) put the whole page on the brand colour; the others keep white sections. */
  canvas: boolean
}

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const onWhite = (hex: string) => 1.05 / (luminance(hex) + 0.05)
const readableText = (bg: string) => (onWhite(bg) >= 4.5 ? '#FFFFFF' : '#000000')
const mix = (hex: string, to: number, amount: number) => '#' + [1, 3, 5].map((i) => {
  const c = parseInt(hex.slice(i, i + 2), 16)
  return Math.round(c + (to - c) * amount).toString(16).padStart(2, '0')
}).join('')
const colours = (bg: string) => {
  const text = readableText(bg)
  // Dark brands get a darker bar; light brands (black text) a lighter one, so yellow doesn't turn olive
  const shade = text === '#FFFFFF' ? mix(bg, 0, 0.22) : mix(bg, 255, 0.4)
  return { bg, text, shade, shadeText: readableText(shade) }
}

/**
 * DERIVED (needs approval): filled buttons in the brand colour with white or black text; hover 22% darker (12% on
 * light brands). Links, outlines and focus rings in the brand colour darkened in 5% steps until it passes 4.5:1 on
 * white (7UP green turns dark green); if that takes more than 40% black (Lipton yellow turns olive), black instead.
 */
const derivedPage = (bg: string): Omit<PageTheme, 'canvas'> => {
  const onBg = readableText(bg)
  let ink = bg
  for (let n = 1; onWhite(ink) < 4.5; n++) ink = n > 8 ? '#000000' : mix(bg, 0, n * 0.05)
  return {
    ink,
    vars: {
      '--color-action-primary': bg,
      '--color-action-primary-hover': mix(bg, 0, onBg === '#FFFFFF' ? 0.22 : 0.12),
      '--color-text-on-action': onBg,
      '--color-text-link': ink,
      '--color-text-hover': ink,
      '--color-border-action': ink,
      '--color-border-focus': ink,
      '--color-action-inverse': '#FFFFFF',
      '--color-text-on-action-inverse': ink,
      // Change 26: text, outlines and focus rings directly on the brand colour
      '--color-text-on-inverse': onBg,
      '--color-border-focus-inverse': onBg,
    } as CSSProperties,
  }
}
// ink = --color-text-link of the Theme mode (tokens.css). Dark = luminance under 0.05: black, Quaker and Popworks navy
// (Doritos and Walkers red are 0.12 to 0.17, so they keep white sections).
const pageTheme = (slug: string, bg: string): PageTheme => ({
  ...(slug === 'doritos' ? { mode: slug, ink: '#030303' } : slug === 'rockstar' ? { mode: slug, ink: '#000000' } : derivedPage(bg)),
  canvas: luminance(bg) < 0.05,
})

export function useChromeTheme(): ChromeTheme | null {
  const { pathname } = useLocation()
  const promoSlug = pathname.match(/^\/promotions\/([^/]+)/)?.[1]
  const promo = getPromo(promoSlug)
  if (promo) {
    const brand = getBrand(promo.brand)
    return {
      ...colours(promo.theme.bg), logo: brand?.logoOnBand ?? brand?.logo, name: brand?.name ?? promo.brandLabel, brandSlug: brand?.slug, deco: promo.theme.deco ?? brand?.deco,
      page: brand ? pageTheme(brand.slug, promo.theme.bg) : undefined,
    }
  }
  const brandSlug = pathname.match(/^\/brands\/([^/]+)/)?.[1]
  const brand = brands.find((b) => b.slug === brandSlug)
  if (brand) return { ...colours(brand.band), logo: brand.logoOnBand ?? brand.logo, name: brand.name, brandSlug: brand.slug, deco: brand.deco, page: pageTheme(brand.slug, brand.band) }
  return null
}
