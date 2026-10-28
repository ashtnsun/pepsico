/* eslint-disable react-refresh/only-export-components */
// Fake back end for the prototype. Everything is kept in localStorage so a test
// session survives page reloads; the moderator panel can reset it.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getPromo } from '../data/promos'
import { REWARD_EVERY, TODAY } from '../data/config'

export type User = {
  email: string
  firstName: string
  lastName: string
  country: string
  dob?: string
  gender?: string
  postcode?: string
  phone?: string
  marketing: boolean
  ads: boolean
  provider: 'email' | 'google' | 'facebook'
}

export type Entry = {
  id: string
  promo: string
  code: string
  date: string
  outcome: 'won' | 'lost' | 'entered'
  prize?: string
}

/** A JOY reward the person claimed from the home hero (one per REWARD_EVERY entries). */
export type Claim = { id: string; ref: string; date: string }

export type OutcomeMode = 'random' | 'win' | 'lose'

type Data = {
  accounts: Record<string, User>
  entries: Record<string, Entry[]>   // by email
  usedCodes: string[]
  currentEmail: string | null
  newsletter: string[]
  outcomeMode: OutcomeMode
  ignoreLimits: boolean
  country: string | null
  seenWelcome: boolean
  /** Change 46: brand slugs the person hearted. Kept per browser, not per account, so it also works logged out. */
  favouriteBrands: string[]
  /** Change 47: rewards claimed, by email. Rewards earned minus these = rewards waiting to be claimed. */
  claims: Record<string, Claim[]>
}

const KEY = 'joy-prototype-v1'

const empty: Data = {
  accounts: {}, entries: {}, usedCodes: [], currentEmail: null, newsletter: [],
  outcomeMode: 'random', ignoreLimits: false, country: 'gb', seenWelcome: false, favouriteBrands: [], claims: {},
}

const load = (): Data => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...empty, ...JSON.parse(raw) } : empty
  } catch {
    return empty
  }
}

export const TEST_USER: User = {
  email: 'sam.taylor@example.com', firstName: 'Sam', lastName: 'Taylor', country: 'gb',
  dob: '1998-04-12', gender: 'prefer-not', postcode: 'RG1 1LN', phone: '', marketing: true, ads: false, provider: 'email',
}

export type EnterResult =
  | { ok: true; entry: Entry }
  | { ok: false; error: 'format' | 'used' | 'limit' | 'ended' | 'country'; message: string }

type Store = Data & {
  user: User | null
  myEntries: Entry[]
  myClaims: Claim[]
  unclaimedRewards: number
  claimReward: () => Claim | null
  register: (u: User) => 'ok' | 'exists'
  login: (email: string) => boolean
  socialLogin: (provider: 'google' | 'facebook') => { isNew: boolean }
  completeOnboarding: (country: string, marketing: boolean, ads: boolean) => void
  logout: () => void
  updateProfile: (u: Partial<User>) => void
  deleteAccount: () => void
  enter: (promoSlug: string, code: string) => EnterResult
  canEnter: (promoSlug: string) => boolean
  subscribe: (email: string) => 'ok' | 'already'
  setCountry: (code: string) => void
  toggleFavourite: (brandSlug: string) => void
  setFlag: (patch: Partial<Pick<Data, 'outcomeMode' | 'ignoreLimits' | 'seenWelcome'>>) => void
  resetAll: () => void
  loginAsTestUser: (entries: number) => void
}

const Ctx = createContext<Store | null>(null)

const uid = () => Math.random().toString(36).slice(2, 10)
const nowTime = () => new Date().toTimeString().slice(0, 5)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Data>(load)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(data)) } catch { /* private mode: keep in memory */ }
  }, [data])

  const user = data.currentEmail ? data.accounts[data.currentEmail] ?? null : null
  const myEntries = useMemo(() => (user ? data.entries[user.email] ?? [] : []), [data.entries, user])

  const myClaims = useMemo(() => (user ? data.claims[user.email] ?? [] : []), [data.claims, user])
  const unclaimedRewards = Math.max(0, Math.floor(myEntries.length / REWARD_EVERY) - myClaims.length)

  const claimReward = useCallback(() => {
    if (!user || unclaimedRewards < 1) return null
    const claim: Claim = { id: uid(), ref: `JOY-${uid().slice(0, 6).toUpperCase()}`, date: `${TODAY} ${nowTime()}` }
    setData((d) => ({ ...d, claims: { ...d.claims, [user.email]: [...(d.claims[user.email] ?? []), claim] } }))
    return claim
  }, [unclaimedRewards, user])

  const register = useCallback((u: User) => {
    const email = u.email.trim().toLowerCase()
    if (data.accounts[email]) return 'exists' as const
    setData((d) => ({ ...d, accounts: { ...d.accounts, [email]: { ...u, email } }, currentEmail: email }))
    return 'ok' as const
  }, [data.accounts])

  const login = useCallback((email: string) => {
    const e = email.trim().toLowerCase()
    if (!data.accounts[e]) return false
    setData((d) => ({ ...d, currentEmail: e }))
    return true
  }, [data.accounts])

  const socialLogin = useCallback((provider: 'google' | 'facebook') => {
    const email = provider === 'google' ? 'sam.taylor@gmail.com' : 'sam.taylor@facebook.example'
    const existing = data.accounts[email]
    if (existing) {
      setData((d) => ({ ...d, currentEmail: email }))
      return { isNew: false }
    }
    // A social account comes with name and email but no country or consents: onboarding asks for them.
    const u: User = { email, firstName: 'Sam', lastName: 'Taylor', country: '', marketing: false, ads: false, provider }
    setData((d) => ({ ...d, accounts: { ...d.accounts, [email]: u }, currentEmail: email }))
    return { isNew: true }
  }, [data.accounts])

  const completeOnboarding = useCallback((country: string, marketing: boolean, ads: boolean) => {
    setData((d) => {
      if (!d.currentEmail) return d
      const u = d.accounts[d.currentEmail]
      return { ...d, accounts: { ...d.accounts, [u.email]: { ...u, country, marketing, ads } } }
    })
  }, [])

  const logout = useCallback(() => setData((d) => ({ ...d, currentEmail: null })), [])

  const updateProfile = useCallback((patch: Partial<User>) => {
    setData((d) => {
      if (!d.currentEmail) return d
      const u = d.accounts[d.currentEmail]
      return { ...d, accounts: { ...d.accounts, [u.email]: { ...u, ...patch, email: u.email } } }
    })
  }, [])

  const deleteAccount = useCallback(() => {
    setData((d) => {
      if (!d.currentEmail) return d
      const accounts = { ...d.accounts }; delete accounts[d.currentEmail]
      const entries = { ...d.entries }; delete entries[d.currentEmail]
      return { ...d, accounts, entries, currentEmail: null }
    })
  }, [])

  const hasEnteredRecently = useCallback((slug: string) => {
    if (data.ignoreLimits || !user) return false
    // Every entry in the prototype happens on TODAY, so any earlier entry for the same
    // promotion counts as "this week" / "today" / "already entered".
    return (data.entries[user.email] ?? []).some((e) => e.promo === slug)
  }, [data.entries, data.ignoreLimits, user])

  const canEnter = useCallback((slug: string) => !hasEnteredRecently(slug), [hasEnteredRecently])

  const enter = useCallback((slug: string, rawCode: string): EnterResult => {
    const promo = getPromo(slug)
    const code = rawCode.replace(/[\s-]/g, '').toUpperCase()
    if (!promo || !user) return { ok: false, error: 'format', message: 'Something went wrong. Please try again.' }
    if (promo.end < TODAY) return { ok: false, error: 'ended', message: 'This promotion has ended, so it no longer accepts codes.' }
    if (!promo.countries.includes(user.country)) return { ok: false, error: 'country', message: 'This promotion is only open to residents of the UK and Ireland.' }
    if (!code.startsWith(promo.codePrefix) || code.length < promo.codePrefix.length + 5 || code.length > 14 || !/^[A-Z0-9]+$/.test(code)) {
      return { ok: false, error: 'format', message: `That doesn't look like a valid code. Codes start with ${promo.codePrefix} and have letters and numbers only.` }
    }
    if (data.usedCodes.includes(code)) return { ok: false, error: 'used', message: 'This code has already been used. Each code can be entered once.' }
    if (hasEnteredRecently(slug)) {
      const msg = promo.limit === 'week'
        ? 'You have already entered this week. You can enter again from Monday with a new code.'
        : promo.limit === 'day' ? 'You have already entered today. Come back tomorrow with a new code.'
        : 'You have already entered this promotion. There is one entry per person.'
      return { ok: false, error: 'limit', message: msg }
    }
    let outcome: Entry['outcome'] = 'entered'
    let prize: string | undefined
    if (promo.mechanic === 'instant') {
      const win = data.outcomeMode === 'win' || (data.outcomeMode === 'random' && Math.random() < 0.5)
      outcome = win ? 'won' : 'lost'
      if (win) {
        const pool = promo.prizes.filter((p) => p.instant)
        prize = pool[Math.floor(Math.random() * pool.length)]?.name
      }
    }
    const entry: Entry = { id: uid(), promo: slug, code, date: `${TODAY} ${nowTime()}`, outcome, prize }
    setData((d) => ({
      ...d,
      usedCodes: [...d.usedCodes, code],
      entries: { ...d.entries, [user.email]: [...(d.entries[user.email] ?? []), entry] },
    }))
    return { ok: true, entry }
  }, [data.outcomeMode, data.usedCodes, hasEnteredRecently, user])

  const subscribe = useCallback((email: string) => {
    const e = email.trim().toLowerCase()
    if (data.newsletter.includes(e)) return 'already' as const
    setData((d) => ({ ...d, newsletter: [...d.newsletter, e] }))
    return 'ok' as const
  }, [data.newsletter])

  const setCountry = useCallback((code: string) => setData((d) => ({ ...d, country: code })), [])
  const toggleFavourite = useCallback((slug: string) => setData((d) => ({
    ...d,
    favouriteBrands: d.favouriteBrands.includes(slug) ? d.favouriteBrands.filter((b) => b !== slug) : [...d.favouriteBrands, slug],
  })), [])
  const setFlag = useCallback((patch: Partial<Data>) => setData((d) => ({ ...d, ...patch })), [])
  const resetAll = useCallback(() => setData({ ...empty }), [])

  const loginAsTestUser = useCallback((n: number) => {
    // Fill earlier entries with ended promotions so the active ones stay open to enter.
    const past = ['las-vegas', 'pepsi-music', 'walkers-gdk', 'pepsi-ea', 'las-vegas', 'pepsi-music']
    const entries: Entry[] = Array.from({ length: n }, (_, i) => ({
      id: uid(), promo: past[i % past.length], code: `GBTEST${i + 1}00`, date: `2026-0${7 + (i % 3)}-1${i} 18:2${i}`,
      outcome: i === 1 ? 'won' : i % 2 ? 'entered' : 'lost', prize: i === 1 ? 'Pepsi Bucket Hat' : undefined,
    }))
    setData((d) => ({
      ...d,
      accounts: { ...d.accounts, [TEST_USER.email]: TEST_USER },
      entries: { ...d.entries, [TEST_USER.email]: entries },
      claims: { ...d.claims, [TEST_USER.email]: [] },
      currentEmail: TEST_USER.email,
    }))
  }, [])

  const value: Store = {
    ...data, user, myEntries, myClaims, unclaimedRewards, claimReward, register, login, socialLogin, completeOnboarding, logout, updateProfile,
    deleteAccount, enter, canEnter, subscribe, setCountry, toggleFavourite, setFlag, resetAll, loginAsTestUser,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore must be used inside StoreProvider')
  return s
}
