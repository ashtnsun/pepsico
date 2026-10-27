// Visual exploration (change 21): the brand theme of the page you're on, used to colour the global
// elements (navbar, breadcrumb, newsletter, footer). Which treatment is shown is picked in the config menu (C).
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
}

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const readableText = (bg: string) => (1.05 / (luminance(bg) + 0.05) >= 4.5 ? '#FFFFFF' : '#000000')
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

export function useChromeTheme(): ChromeTheme | null {
  const { pathname } = useLocation()
  const promoSlug = pathname.match(/^\/promotions\/([^/]+)/)?.[1]
  const promo = getPromo(promoSlug)
  if (promo) {
    const brand = getBrand(promo.brand)
    return { ...colours(promo.theme.bg), logo: brand?.logo, name: brand?.name ?? promo.brandLabel, brandSlug: brand?.slug, deco: promo.theme.deco ?? brand?.deco }
  }
  const brandSlug = pathname.match(/^\/brands\/([^/]+)/)?.[1]
  const brand = brands.find((b) => b.slug === brandSlug)
  if (brand) return { ...colours(brand.band), logo: brand.logo, name: brand.name, brandSlug: brand.slug, deco: brand.deco }
  return null
}
