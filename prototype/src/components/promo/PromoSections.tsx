import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Promo } from '../../data/promos'
import './promo.css'

/** Promotion steps: brand-color circles with a white number, text, and pack art overlapping the bottom (live site). */
export function Steps({ promo }: { promo: Promo }) {
  if (!promo.steps.length) return null
  return (
    <section id="steps" className="steps" aria-labelledby="steps-title">
      <h2 id="steps-title" className={promo.stepsTitle ? 'section-title' : 'visually-hidden'}>{promo.stepsTitle ?? 'Steps'}</h2>
      <ol className="steps__list">
        {promo.steps.map((s, i) => (
          <li className="steps__item" key={i}>
            <div className="steps__circle">
              <span className="steps__index" aria-hidden>{i + 1}</span>
              <p className="steps__text"><span className="visually-hidden">Step {i + 1}: </span>{s.text}</p>
              {s.image && <img className="steps__image" src={s.image} alt="" />}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Legal text with the promotion's contact and T&C links right under it. */
export function PromoTerms({ promo }: { promo: Promo }) {
  return (
    <section id="terms" className="pterms" aria-label="Terms and conditions">
      {promo.disclaimer && <p className="pterms__legal">{promo.disclaimer}</p>}
      <div className="pterms__links">
        <Link to="/contact" className="link">Contact (promotion)</Link>
        <Link to={`/promotions/${promo.slug}/terms`} className="link">Terms and conditions (promotion)</Link>
      </div>
    </section>
  )
}

/** Prize band: brand color, round prize art, arrows to page through (live-site rewards slider). */
export function Prizes({ promo }: { promo: Promo }) {
  const [page, setPage] = useState(0)
  const [dir, setDir] = useState(1) // 1 = next, -1 = previous: the new prizes slide in from that side
  const [perPage, setPerPage] = useState(3)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const set = () => setPerPage(mq.matches ? 1 : 3)
    set(); mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])
  const pages = Math.max(1, Math.ceil(promo.prizes.length / perPage))
  const p = Math.min(page, pages - 1)
  const shown = promo.prizes.slice(p * perPage, p * perPage + perPage)
  return (
    <section id="prizes" className="prizes" aria-labelledby="prizes-title">
      <h2 id="prizes-title" className="prizes__title">{promo.prizesTitle}</h2>
      {promo.prizesSubtitle && <p className="prizes__subtitle">{promo.prizesSubtitle}</p>}
      <div className="prizes__row">
        {pages > 1 && <button type="button" className="round-arrow" aria-label="Previous prizes" onClick={() => { setDir(-1); setPage((p - 1 + pages) % pages) }}><ChevronLeft size={24} strokeWidth={3} /></button>}
        <ul key={p} className="prizes__list" aria-live="polite" style={{ '--dir': dir } as CSSProperties}>
          {shown.map((pr, n) => (
            <li key={pr.name} className="prizes__item" style={{ '--i': n } as CSSProperties}>
              <img src={pr.image} alt="" />
              <h3 className="prizes__name">{pr.name}</h3>
            </li>
          ))}
        </ul>
        {pages > 1 && <button type="button" className="round-arrow" aria-label="Next prizes" onClick={() => { setDir(1); setPage((p + 1) % pages) }}><ChevronRight size={24} strokeWidth={3} /></button>}
      </div>
      {pages > 1 && <p className="prizes__count">{p + 1} / {pages}</p>}
    </section>
  )
}

/** Long promo banner with the participate button in the middle (live site). */
export function CtaBanner({ promo, to, label }: { promo: Promo; to: string; label: string }) {
  if (!promo.images.cta) return null
  return (
    <div className="cta-banner">
      <picture>
        <source media="(max-width: 767px)" srcSet={promo.images.ctaMobile} />
        <img src={promo.images.cta} alt="" />
      </picture>
      <Link to={to} className={`btn btn--wide ${promo.theme.ctaBg === '#FFE600' ? 'btn--yellow' : 'btn--primary'}`}>{label}</Link>
    </div>
  )
}

/**
 * Section menu under the hero (live site: STEPS, PRIZES, FAQS...). Wireframe idea added:
 * it sticks under the navbar while scrolling and carries a Participate button. Change 29: it looks the same before and
 * after it sticks (the button is always there), so sticking causes no jump.
 */
export function SectionNav({ links, cta }: { links: { id: string; label: string }[]; cta?: { label: string; to: string; disabled?: boolean } }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<string | null>(null)
  // Space taken at the top of the window by the navbar (75px, --site-nav-height) plus this menu once stuck, with a little air
  const offset = () => 75 + (ref.current?.offsetHeight ?? 73) + 16
  useEffect(() => {
    const onScroll = () => {
      let cur: string | null = null
      for (const l of links) {
        const el = document.getElementById(l.id)
        if (el && el.getBoundingClientRect().top <= offset() + 1) cur = l.id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [links])
  const go = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset(), behavior: 'smooth' })
  }
  return (
    <div ref={ref} className="section-nav">
      <nav aria-label="On this page" className="section-nav__links">
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? 'location' : undefined} onClick={(e) => { e.preventDefault(); go(l.id) }}>{l.label}</a>
        ))}
      </nav>
      {cta && (cta.disabled
        ? <span className="btn btn--primary section-nav__cta" aria-disabled="true">{cta.label}</span>
        : <Link to={cta.to} className="btn btn--primary section-nav__cta">{cta.label}</Link>)}
    </div>
  )
}
