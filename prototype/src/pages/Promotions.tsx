import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { promos, type Mechanic, type Promo } from '../data/promos'
import { isActive, isEnded } from '../data/config'
import { useStore } from '../state/store'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { HeroCarousel } from '../components/promo/HeroCarousel'
import { PromoCard } from '../components/promo/PromoCard'
import './pages.css'

const ACTIVE = promos.filter(isActive)
const BRAND_FILTERS = [...new Map(promos.map((p) => [p.brand, p.brandLabel])).entries()]
const TYPE_LABELS: Record<Mechanic, string> = { instant: 'Instant win', draw: 'Prize draw' }
const TYPE_FILTERS = [...new Set(promos.map((p) => p.mechanic))]
const SORTS = { recommended: 'Recommended', newest: 'Newest', ending: 'Ending soonest' }
type Sort = keyof typeof SORTS

/**
 * Live-site promotions page, plus the wireframe "Promo Gallery" ideas: a grid of all promotions
 * (the same PromoCard as the home page) that can be filtered and sorted. Ended promotions always come last.
 */
export default function Promotions() {
  const { myEntries } = useStore()
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [sort, setSort] = useState<Sort>('recommended')

  const list = useMemo(() => {
    const entered = (slug: string) => myEntries.some((e) => e.promo === slug)
    const matches = promos.filter((p) => (!brand || p.brand === brand) && (!type || p.mechanic === type))
    const live = matches.filter((p) => !isEnded(p))
    const ended = matches.filter(isEnded)
    if (sort === 'newest') {
      const newest = (a: Promo, b: Promo) => b.start.localeCompare(a.start)
      return [...live.sort(newest), ...ended.sort(newest)]
    }
    // Recommended: the curated order, with promotions you haven't entered yet first.
    // Ending soonest: nearest end date first.
    live.sort(sort === 'recommended' ? (a, b) => Number(entered(a.slug)) - Number(entered(b.slug)) : (a, b) => a.end.localeCompare(b.end))
    // Ended promotions: the one that ended most recently first.
    return [...live, ...ended.sort((a, b) => b.end.localeCompare(a.end))]
  }, [brand, type, sort, myEntries])

  const filtering = brand !== '' || type !== ''
  const latestEntry = (slug: string) => [...myEntries].reverse().find((e) => e.promo === slug)

  return (
    <>
      <Breadcrumb items={[{ label: 'Promotions' }]} />
      <h1 className="visually-hidden">Promotions</h1>
      <HeroCarousel slides={ACTIVE.map((p) => ({ kind: 'promo' as const, promo: p }))} start={1} />

      <section className="container" aria-labelledby="all-title" style={{ paddingBottom: 64 }}>
        <h2 id="all-title" className="section-title listing-section-title">All promotions</h2>
        <div className="listing-tools" role="group" aria-label="Filter and sort promotions">
          <div className="field listing-tools__field">
            <label htmlFor="promo-brand" className="field__label">Brand</label>
            <select id="promo-brand" className="field__input" value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">All brands</option>
              {BRAND_FILTERS.map(([slug, label]) => <option key={slug} value={slug}>{label}</option>)}
            </select>
          </div>
          <div className="field listing-tools__field">
            <label htmlFor="promo-type" className="field__label">Promotion type</label>
            <select id="promo-type" className="field__input" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All types</option>
              {TYPE_FILTERS.map((m) => <option key={m} value={m}>{TYPE_LABELS[m]}</option>)}
            </select>
          </div>
          {filtering && (
            <button type="button" className="link listing-tools__clear" onClick={() => { setBrand(''); setType('') }}><X size={14} aria-hidden /> Clear filters</button>
          )}
          <div className="field listing-tools__field listing-tools__sort">
            <label htmlFor="promo-sort" className="field__label">Sort by</label>
            <select id="promo-sort" className="field__input" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              {(Object.keys(SORTS) as Sort[]).map((s) => <option key={s} value={s}>{SORTS[s]}</option>)}
            </select>
          </div>
        </div>
        <div aria-live="polite">
          {/* Keyed by the filters so the cards rise in again after each change */}
          {list.length ? <div className="card-grid" key={`${brand}|${type}|${sort}`}>{list.map((p) => <PromoCard key={p.slug} promo={p} entry={latestEntry(p.slug)} />)}</div>
            : <div className="empty-state"><h3 className="h3">No promotions match</h3><p>Try another brand or promotion type.</p></div>}
        </div>
      </section>
    </>
  )
}
