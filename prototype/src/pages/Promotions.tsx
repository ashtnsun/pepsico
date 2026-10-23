import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { promos } from '../data/promos'
import { isActive, isEnded } from '../data/config'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { HeroCarousel } from '../components/promo/HeroCarousel'
import { PromoTeaser } from '../components/promo/PromoTeaser'
import './pages.css'

const BRAND_FILTERS = [...new Map(promos.map((p) => [p.brand, p.brandLabel])).entries()]

/**
 * Live-site promotions page, plus the wireframe "Promo Gallery" ideas: search and filters,
 * and ended promotions kept in their own clearly labelled section.
 */
export default function Promotions() {
  const [q, setQ] = useState('')
  const [brand, setBrand] = useState<string | null>(null)
  const [status, setStatus] = useState<'all' | 'active' | 'ended'>('all')
  const [showAllEnded, setShowAllEnded] = useState(false)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return promos.filter((p) =>
      (!brand || p.brand === brand) &&
      (!term || [p.title, p.teaserTitle, p.teaserText, p.brandLabel, ...p.prizes.map((x) => x.name)].join(' ').toLowerCase().includes(term)),
    )
  }, [q, brand])

  const active = filtered.filter(isActive)
  const ended = filtered.filter(isEnded).sort((a, b) => b.end.localeCompare(a.end))
  const filtering = q.trim() !== '' || brand !== null || status !== 'all'
  const shownEnded = showAllEnded || filtering ? ended : ended.slice(0, 2)

  return (
    <>
      <Breadcrumb items={[{ label: 'Promotions' }]} />
      <h1 className="visually-hidden">Promotions</h1>
      <HeroCarousel slides={promos.filter(isActive).map((p) => ({ kind: 'promo' as const, promo: p }))} start={1} />

      <div className="listing-tools" role="search">
        <div className="listing-tools__row">
          <div className="search field" style={{ marginBottom: 0 }}>
            <label htmlFor="promo-search" className="visually-hidden">Search promotions</label>
            <Search size={20} aria-hidden />
            <input id="promo-search" className="field__input" type="search" placeholder="Search promotions or prizes" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="chips" role="group" aria-label="Status">
            {(['all', 'active', 'ended'] as const).map((s) => (
              <button key={s} type="button" className="chip" aria-pressed={status === s} onClick={() => setStatus(s)}>
                {s === 'all' ? 'All' : s === 'active' ? 'Active' : 'Ended'}
              </button>
            ))}
          </div>
        </div>
        <div className="chips" role="group" aria-label="Brand">
          <span className="chips__label">Brand:</span>
          <button type="button" className="chip" aria-pressed={brand === null} onClick={() => setBrand(null)}>All brands</button>
          {BRAND_FILTERS.map(([slug, label]) => (
            <button key={slug} type="button" className="chip" aria-pressed={brand === slug} onClick={() => setBrand(brand === slug ? null : slug)}>{label}</button>
          ))}
        </div>
        <p className="listing-count" aria-live="polite">
          {status !== 'ended' && `${active.length} active`}{status === 'all' && ' · '}{status !== 'active' && `${ended.length} ended`}
          {filtering && <> · <button type="button" className="link" onClick={() => { setQ(''); setBrand(null); setStatus('all') }}><X size={14} aria-hidden /> Clear filters</button></>}
        </p>
      </div>

      {status !== 'ended' && (
        <section aria-labelledby="active-title">
          <h2 id="active-title" className="section-title listing-section-title">Active promotions</h2>
          {active.length ? active.map((p, i) => <PromoTeaser key={p.slug} promo={p} side={i % 2 ? 'left' : 'right'} />)
            : <div className="empty-state"><h3 className="h3">No active promotions match</h3><p>Try another brand or search term.</p></div>}
        </section>
      )}

      {status !== 'active' && (
        <section aria-labelledby="ended-title" style={{ paddingBottom: 64 }}>
          <h2 id="ended-title" className="section-title listing-section-title">These promos are over:</h2>
          {shownEnded.length ? shownEnded.map((p) => <PromoTeaser key={p.slug} promo={p} side="right" />)
            : <div className="empty-state"><h3 className="h3">No ended promotions match</h3></div>}
          {!filtering && !showAllEnded && ended.length > 2 && (
            <div className="center"><button type="button" className="btn btn--primary btn--wide" onClick={() => setShowAllEnded(true)}>Load more +</button></div>
          )}
        </section>
      )}
    </>
  )
}
