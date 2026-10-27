import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Promo } from '../../data/promos'
import { useStore } from '../../state/store'
import { PromoCard } from './PromoCard'
import './promo.css'

/**
 * Prototype: a sideways-scrolling row of promotion cards (the same PromoCard as the home page).
 * Swipe or scroll on touch; the round arrows only show when there are more cards than fit.
 */
export function PromoCarousel({ promos, title, id }: { promos: Promo[]; title: string; id: string }) {
  const { myEntries } = useStore()
  const track = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: true })

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => setEdge({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 })
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => { el.removeEventListener('scroll', update); ro.disconnect() }
  }, [promos])

  // Move by one card (card width plus the gap).
  const move = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' })
  }
  const latestEntry = (slug: string) => [...myEntries].reverse().find((e) => e.promo === slug)
  const scrolls = !(edge.start && edge.end)

  return (
    <section className="container promo-carousel" aria-labelledby={id} aria-roledescription="carousel">
      <div className="promo-carousel__head">
        <h2 id={id} className="h1">{title}</h2>
        {scrolls && (
          <div className="promo-carousel__arrows">
            <button type="button" className="round-arrow" aria-label="Previous promotions" disabled={edge.start} onClick={() => move(-1)}><ChevronLeft size={22} aria-hidden /></button>
            <button type="button" className="round-arrow" aria-label="Next promotions" disabled={edge.end} onClick={() => move(1)}><ChevronRight size={22} aria-hidden /></button>
          </div>
        )}
      </div>
      <ul className="promo-carousel__track" ref={track}>
        {promos.map((p) => <li key={p.slug}><PromoCard promo={p} entry={latestEntry(p.slug)} /></li>)}
      </ul>
    </section>
  )
}
