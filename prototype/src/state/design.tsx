/* eslint-disable react-refresh/only-export-components */
// Visual exploration: which home hero and promotion card design to show.
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

export const CARD_VARIANTS = [
  { id: 'original', name: 'Original', note: 'Previous card: brand-colour top, white body.' },
  { id: 'poster', name: 'A · Poster', note: 'Default. Whole card in the brand colour, prize chip, time left.' },
  { id: 'ticket', name: 'B · Ticket', note: 'Ticket with a tear line; top prize and days left on the stub.' },
  { id: 'timebar', name: 'C · Time bar', note: 'Title on the art, top prize, bar showing time left.' },
  { id: 'prize', name: 'D · Prize first', note: 'Top prize on a sunburst leads; campaign art is secondary.' },
  { id: 'offset', name: 'E · Offset', note: 'Bold outline and brand-colour offset shadow, fact list.' },
] as const

export type HeroVariant = (typeof HERO_VARIANTS)[number]['id']
export type CardVariant = (typeof CARD_VARIANTS)[number]['id']
type Design = { hero: HeroVariant; card: CardVariant }

// v2: defaults changed to Big track + Poster (change 18); the new key drops choices saved under the old defaults.
const KEY = 'joy-prototype-design-v2'
const initial: Design = { hero: 'track', card: 'poster' }
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
