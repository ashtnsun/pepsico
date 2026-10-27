import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, Repeat, Ticket, Trophy, Zap } from 'lucide-react'
import type { Promo } from '../../data/promos'
import { daysLeft, formatDate, isEnded, TODAY } from '../../data/config'
import './promo.css'
import './promo-page.css'

const COUNTRY_NAMES: Record<string, string> = { gb: 'UK', ie: 'Ireland' }

/**
 * "At a glance" card in the promotion hero: time left, how you win, how often you can enter, where it's open.
 * Everything here restates facts already on the page (dates, legal text, FAQs), so people don't have to dig for them.
 */
export function PromoFacts({ promo }: { promo: Promo }) {
  const ended = isEnded(promo)
  const d = daysLeft(promo)
  const total = Date.parse(promo.end) - Date.parse(promo.start)
  const elapsed = ended ? 100 : Math.min(100, Math.max(0, ((Date.parse(TODAY) - Date.parse(promo.start)) / total) * 100))
  const time = ended ? 'Ended' : d <= 0 ? 'Ends today' : d === 1 ? 'Ends tomorrow' : `Ends in ${d} days`
  const instant = promo.mechanic === 'instant'
  const howText = instant
    ? promo.drawPrize ? `Find out straight away, and every entry goes into the draw for ${promo.drawPrize}.` : 'Find out straight away if you’ve won.'
    : `Every entry goes into the draw${promo.drawPrize ? ` for ${promo.drawPrize}` : ''}.`
  const often = promo.limit === 'week' ? '1 entry per week' : promo.limit === 'day' ? '1 entry per day' : '1 entry per person'
  const oftenText = promo.limit === 'week' ? 'A new week starts on Monday.' : promo.limit === 'day' ? 'Come back each day with a new code.' : 'Enter once with your code.'
  return (
    <aside className={`pfacts ${ended ? 'pfacts--ended' : ''}`} aria-label="Promotion at a glance">
      <div className="pfacts__time">
        <p className="pfacts__row">
          <span className="pfacts__icon"><Clock size={18} aria-hidden /></span>
          <span><span className="pfacts__label">{ended ? 'Dates' : 'Time left'}</span><strong className={!ended && d <= 14 ? 'is-urgent' : ''}>{time}</strong></span>
        </p>
        <div className="pfacts__bar" aria-hidden><span style={{ width: `${elapsed}%` }} /></div>
        <p className="pfacts__dates"><span><span className="visually-hidden">Runs from </span>{formatDate(promo.start)}</span><span><span className="visually-hidden">to </span>{formatDate(promo.end)}</span></p>
      </div>
      <ul className="pfacts__list">
        <li className="pfacts__row">
          <span className="pfacts__icon">{instant ? <Zap size={18} aria-hidden /> : <Ticket size={18} aria-hidden />}</span>
          <span><span className="pfacts__label">How you win</span><strong>{instant ? 'Instant win' : 'Prize draw'}</strong><span className="pfacts__text">{howText}</span></span>
        </li>
        <li className="pfacts__row">
          <span className="pfacts__icon"><Repeat size={18} aria-hidden /></span>
          <span><span className="pfacts__label">How often</span><strong>{often}</strong><span className="pfacts__text">{oftenText}</span></span>
        </li>
        <li className="pfacts__row">
          <span className="pfacts__icon"><MapPin size={18} aria-hidden /></span>
          <span>
            <span className="pfacts__label">Open to</span>
            <strong className="pfacts__countries">
              {promo.countries.map((c) => <img key={c} src={`./images/global/flag-${c}.png`} alt="" width={18} height={18} />)}
              {promo.countries.map((c) => COUNTRY_NAMES[c] ?? c.toUpperCase()).join(' and ')}, 18+
            </strong>
          </span>
        </li>
      </ul>
    </aside>
  )
}

/** Steps as a connected track: number, pack art on a tinted tile, then the text. */
export function Steps({ promo }: { promo: Promo }) {
  if (!promo.steps.length) return null
  return (
    <section id="steps" className="psteps" aria-labelledby="steps-title">
      <h2 id="steps-title" className={promo.stepsTitle ? 'section-title' : 'visually-hidden'}>{promo.stepsTitle ?? 'Steps'}</h2>
      <ol className="psteps__list">
        {promo.steps.map((s, i) => (
          <li className="psteps__item" key={i}>
            <span className="psteps__num" aria-hidden>{i + 1}</span>
            <div className="psteps__body">
              {s.image && <div className="psteps__art"><img src={s.image} alt="" /></div>}
              <p className="psteps__text"><span className="visually-hidden">Step {i + 1}: </span>{s.text}</p>
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

/** Prize band: the first prize in a spotlight, the rest as a compact grid so every prize is visible at once. */
export function Prizes({ promo }: { promo: Promo }) {
  const [top, ...rest] = promo.prizes
  const topTag = top.instant ? 'Instant win' : promo.mechanic === 'draw' || promo.drawPrize ? 'Prize draw' : null
  return (
    <section id="prizes" className="pprizes" aria-labelledby="prizes-title">
      <div className="pprizes__inner">
        <header className="pprizes__head">
          <h2 id="prizes-title" className="pprizes__title">{promo.prizesTitle}</h2>
          {promo.prizesSubtitle && <p className="pprizes__subtitle">{promo.prizesSubtitle}</p>}
        </header>
        <div className={`pprizes__top ${rest.length ? '' : 'pprizes__top--solo'}`}>
          <div className="pprizes__top-art"><img src={top.image} alt="" /></div>
          <div className="pprizes__top-text">
            <p className="pprizes__top-label"><Trophy size={18} aria-hidden /> {rest.length ? 'Top prize' : 'The prize'}</p>
            <h3 className="pprizes__top-name">{top.name}</h3>
            {topTag && <span className="pprizes__tag">{top.instant ? <Zap size={14} aria-hidden /> : <Ticket size={14} aria-hidden />} {topTag}</span>}
          </div>
        </div>
        {rest.length > 0 && (
          <>
            <h3 className="pprizes__more-title">More prizes</h3>
            <ul className="pprizes__list">
              {rest.map((pr) => (
                <li key={pr.name} className="pprizes__item">
                  <img src={pr.image} alt="" />
                  <span className="pprizes__item-text">
                    <span className="pprizes__name">{pr.name}</span>
                    {pr.instant && <span className="pprizes__tag pprizes__tag--small"><Zap size={12} aria-hidden /> Instant win</span>}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
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
 * Section menu under the hero (live site: STEPS, PRIZES, FAQS...), drawn as pill tabs. Wireframe idea added:
 * it sticks under the navbar while scrolling and carries a Participate button.
 */
export function SectionNav({ links, cta }: { links: { id: string; label: string }[]; cta?: { label: string; to: string; disabled?: boolean } }) {
  const ref = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const onScroll = () => {
      const top = ref.current?.getBoundingClientRect().top ?? 999
      setStuck(top <= 76)
      let cur: string | null = null
      for (const l of links) {
        const el = document.getElementById(l.id)
        if (el && el.getBoundingClientRect().top < 200) cur = l.id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [links])
  const go = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150, behavior: 'smooth' })
  }
  return (
    <div ref={ref} className={`section-nav ${stuck ? 'is-stuck' : ''}`}>
      <nav aria-label="On this page" className="section-nav__links">
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? 'location' : undefined} onClick={(e) => { e.preventDefault(); go(l.id) }}>{l.label}</a>
        ))}
      </nav>
      {cta && stuck && (cta.disabled
        ? <span className="btn btn--primary section-nav__cta" aria-disabled="true">{cta.label}</span>
        : <Link to={cta.to} className="btn btn--primary section-nav__cta">{cta.label}</Link>)}
    </div>
  )
}
