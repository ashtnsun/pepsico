import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Promo } from '../../data/promos'
import { PromoTeaser } from './PromoTeaser'
import './promo.css'

/**
 * Prototype: a sideways-scrolling row of wide promotion teasers (the same PromoTeaser as "Active promotions"),
 * one per slide. Swipe or scroll on touch; below it, round arrows and the live-site dots when there is more than one.
 */
export function PromoCarousel({ promos, title, id }: { promos: Promo[]; title: string; id: string }) {
  const track = useRef<HTMLUListElement>(null)
  const [current, setCurrent] = useState(0)
  const multi = promos.length > 1

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => setCurrent(Math.round(el.scrollLeft / el.clientWidth))
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [promos])

  const go = (n: number) => {
    const el = track.current
    if (el) el.scrollTo({ left: n * el.clientWidth })
  }

  return (
    <section className="promo-carousel" aria-labelledby={id} aria-roledescription={multi ? 'carousel' : undefined}>
      <h2 id={id} className="section-title">{title}</h2>
      <ul className="promo-carousel__track" ref={track}>
        {promos.map((p, n) => (
          <li key={p.slug} {...(multi ? { 'aria-roledescription': 'slide', 'aria-label': `${n + 1} of ${promos.length}` } : {})}>
            <PromoTeaser promo={p} />
          </li>
        ))}
      </ul>
      {multi && (
        <div className="promo-carousel__controls">
          <button type="button" className="round-arrow" aria-label="Previous promotion" disabled={current === 0} onClick={() => go(current - 1)}><ChevronLeft size={22} aria-hidden /></button>
          <div className="dots">
            {promos.map((p, n) => (
              <button key={p.slug} type="button" aria-current={n === current} aria-label={`Show slide ${n + 1}: ${p.teaserTitle}`} onClick={() => go(n)} />
            ))}
          </div>
          <button type="button" className="round-arrow" aria-label="Next promotion" disabled={current === promos.length - 1} onClick={() => go(current + 1)}><ChevronRight size={22} aria-hidden /></button>
        </div>
      )}
    </section>
  )
}
