import type { Promo } from './promos'

/**
 * PROTOTYPE: the date the prototype pretends it is. Fixed so test sessions on different
 * days see the same active and ended promotions. Matches the live-site capture date.
 */
export const TODAY = '2026-10-23'

/** PROTOTYPE: entries needed to fill the progress tracker (wireframe "Home (Logged-in)"). Needs a real rule from the team. */
export const REWARD_EVERY = 4
export const REWARD_NAME = 'a bonus entry into the JOY monthly prize draw'

export const isActive = (p: Promo) => p.start <= TODAY && TODAY <= p.end
export const isEnded = (p: Promo) => p.end < TODAY

/** 2026-09-27 -> 27.09.2026 (live-site format) */
export const formatDate = (iso: string) => iso.split('-').reverse().join('.')
export const formatRange = (p: Promo) => `${formatDate(p.start)} - ${formatDate(p.end)}`

export const daysLeft = (p: Promo) =>
  Math.round((Date.parse(p.end) - Date.parse(TODAY)) / 86_400_000)

export const COUNTRIES = [
  { code: 'gb', name: 'United Kingdom', flag: './images/global/flag-gb.png' },
  { code: 'ie', name: 'Ireland', flag: './images/global/flag-ie.png' },
  { code: 'pl', name: 'Poland' },
  { code: 'es', name: 'Spain' },
  { code: 'pt', name: 'Portugal' },
  { code: 'nl', name: 'Nederland' },
  { code: 'be-fr', name: 'Belgique' },
  { code: 'be-nl', name: 'België' },
  { code: 'fr', name: 'France' },
  { code: 'gr', name: 'Greece' },
]
