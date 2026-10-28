/* eslint-disable react-refresh/only-export-components */
// Visual exploration: which home hero, progress bar, promotion card and global-element (chrome) theme to show.
// Chosen in the config menu (press C). Saved in this browser only, separate from the test data.
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export const HERO_VARIANTS = [
  { id: 'original', name: 'Original', note: 'Previous dark-blue band with a thin bar.' },
  { id: 'ring', name: 'A · Reward ring', note: 'Big ring split into 4 parts, gift in the middle.' },
  { id: 'stamps', name: 'B · Stamp card', note: 'Loyalty card: each entry stamps a slot.' },
  { id: 'track', name: 'C · Big track', note: 'Default. Headline plus a full-width, chunky bar with milestones.' },
  { id: 'bento', name: 'D · Bento dashboard', note: 'Progress card with stat tiles in JOY colours.' },
  { id: 'can', name: 'E · Fill the can', note: 'A can that fills up with each entry.' },
] as const

// Change 58: the progress bar alone, on the Big track home hero and the result page
export const BAR_VARIANTS = [
  { id: 'original', name: 'Original', note: 'Chunky yellow track with big dots and an "n / 4" bubble.' },
  { id: 'line', name: 'A · Slim line', note: 'Thin rail with small dots and an "n of 4 entries" count.' },
  { id: 'segments', name: 'B · Segments', note: 'One block per entry, with a gap between.' },
  { id: 'stepper', name: 'C · Stepper', note: 'Numbered circles joined by lines; the next entry is ringed.' },
  { id: 'meter', name: 'D · Meter card', note: 'Default. Soft panel with a big count, a bar and a gift tile.' },
  { id: 'tickets', name: 'E · Tickets', note: 'One entry ticket per code; the last ticket is the reward.' },
] as const

export const CARD_VARIANTS = [
  { id: 'original', name: 'Original', note: 'Previous card: brand-colour top, white body.' },
  { id: 'poster', name: 'A · Poster', note: 'Default. Whole card in the brand colour, prize chip, time left.' },
  { id: 'ticket', name: 'B · Ticket', note: 'Ticket with a tear line; top prize and days left on the stub.' },
  { id: 'timebar', name: 'C · Time bar', note: 'Title on the art, top prize, bar showing time left.' },
  { id: 'prize', name: 'D · Prize first', note: 'Top prize on a sunburst leads; campaign art is secondary.' },
  { id: 'offset', name: 'E · Offset', note: 'Bold outline and brand-colour offset shadow, fact list.' },
] as const

export const CHROME_VARIANTS = [
  { id: 'joy', name: 'JOY blue', note: 'Live site: navbar, breadcrumb, newsletter, footer, buttons and links always JOY blue.' },
  { id: 'full', name: 'A · Brand colour', note: 'Default. Navbar, breadcrumb, newsletter and footer in the brand colour, brand logo next to JOY.' },
  { id: 'top', name: 'B · Brand top', note: 'Navbar and breadcrumb in the brand colour; newsletter and footer stay JOY.' },
  { id: 'accent', name: 'C · Brand accent', note: 'JOY blue bars with a brand stripe, brand-colour breadcrumb and logo.' },
  // A, B and C also give the page content (buttons, links, menus, FAQ boxes) the brand theme (change 25)
] as const

export type HeroVariant = (typeof HERO_VARIANTS)[number]['id']
export type BarVariant = (typeof BAR_VARIANTS)[number]['id']
export type CardVariant = (typeof CARD_VARIANTS)[number]['id']
export type ChromeVariant = (typeof CHROME_VARIANTS)[number]['id']
type Design = { hero: HeroVariant; bar: BarVariant; card: CardVariant; chrome: ChromeVariant }

// v3: default bar changed to Meter card (change 62); the new key drops choices saved under the old defaults.
const KEY = 'joy-prototype-design-v3'
const initial: Design = { hero: 'track', bar: 'meter', card: 'poster', chrome: 'full' }
const load = (): Design => {
  try { return { ...initial, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') } } catch { return initial }
}

const Ctx = createContext<(Design & { set: (d: Partial<Design>) => void }) | null>(null)

export function DesignProvider({ children }: { children: ReactNode }) {
  const [design, setDesign] = useState<Design>(load)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(design)) } catch { /* private mode */ } }, [design])
  return <Ctx.Provider value={{ ...design, set: (d) => setDesign((x) => ({ ...x, ...d })) }}>{children}</Ctx.Provider>
}

export const useDesign = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useDesign needs DesignProvider')
  return c
}
