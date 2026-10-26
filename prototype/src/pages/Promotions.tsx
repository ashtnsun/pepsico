import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { promos, type Mechanic } from '../data/promos'
import { isActive, isEnded } from '../data/config'
import { useStore } from '../state/store'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { HeroCarousel } from '../components/promo/HeroCarousel'
import { PromoTeaser } from '../components/promo/PromoTeaser'
import './pages.css'

const ACTIVE = promos.filter(isActive)
// Only offer options that match at least one active promotion, so no filter leads to an empty list.
const BRAND_FILTERS = [...new Map(ACTIVE.map((p) => [p.brand, p.brandLabel])).entries()]
const TYPE_LABELS: Record<Mechanic, string> = { instant: 'Instant win', draw: 'Prize draw' }
const TYPE_FILTERS = [...new Set(ACTIVE.map((p) => p.mechanic))]
const SORTS = { recommended: 'Recommended', newest: 'Newest', ending: 'Ending soonest' }
type Sort = keyof typeof SORTS

/**
 * Live-site promotions page, plus the wireframe "Promo Gallery" ideas: filters and sorting for
 * active promotions, and ended promotions kept in their own clearly labelled section.
 */
export default function Promotions() {
  const { myEntries } = useStore()
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [sort, setSort] = useState<Sort>('recommended')
  const [showAllEnded, setShowAllEnded] = useState(false)

  const active = useMemo(() => {
    const entered = (slug: string) => myEntries.some((e) => e.promo === slug)
    const list = ACTIVE.filter((p) => (!brand || p.brand === brand) && (!type || p.mechanic === type))
    // Recommended: the curated order, with promotions you haven't entered yet first.
    if (sort === 'recommended') return list.sort((a, b) => Number(entered(a.slug)) - Number(entered(b.slug)))
    if (sort === 'newest') return list.sort((a, b) => b.start.localeCompare(a.start))
    return list.sort((a, b) => a.end.localeCompare(b.end))
  }, [brand, type, sort, myEntries])

  const ended = promos.filter(isEnded).sort((a, b) => b.end.localeCompare(a.end))
  const shownEnded = showAllEnded ? ended : ended.slice(0, 2)
  const filtering = brand !== '' || type !== ''

  return (
    <>
      <Breadcrumb items={[{ label: 'Promotions' }]} />
      <h1 className="visually-hidden">Promotions</h1>
      <HeroCarousel slides={ACTIVE.map((p) => ({ kind: 'promo' as const, promo: p }))} start={1} />

      <section aria-labelledby="active-title">
        <h2 id="active-title" className="section-title listing-section-title">Active promotions</h2>
        <div className="listing-tools" role="group" aria-label="Filter and sort active promotions">
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
          {active.length ? active.map((p, i) => <PromoTeaser key={p.slug} promo={p} side={i % 2 ? 'left' : 'right'} />)
            : <div className="empty-state"><h3 className="h3">No active promotions match</h3><p>Try another brand or promotion type.</p></div>}
        </div>
      </section>

      <section aria-labelledby="ended-title" style={{ paddingBottom: 64 }}>
        <h2 id="ended-title" className="section-title listing-section-title">These promos are over:</h2>
        {shownEnded.map((p) => <PromoTeaser key={p.slug} promo={p} side="right" />)}
        {!showAllEnded && ended.length > 2 && (
          <div className="center"><button type="button" className="btn btn--primary btn--wide" onClick={() => setShowAllEnded(true)}>Load more +</button></div>
        )}
      </section>
    </>
  )
}
