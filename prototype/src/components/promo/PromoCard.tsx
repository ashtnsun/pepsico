import { Link } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'
import type { Promo } from '../../data/promos'
import type { Entry } from '../../state/store'
import { daysLeft, formatRange, isEnded } from '../../data/config'
import { promoStyle } from './PromoTeaser'
import './promo.css'

export function StatusBadge({ promo, entry }: { promo: Promo; entry?: Entry }) {
  if (entry?.outcome === 'won') return <span className="badge badge--won">You won</span>
  if (isEnded(promo)) return <span className="badge badge--expired">Ended</span>
  if (entry) return <span className="badge badge--entered">Entered</span>
  const d = daysLeft(promo)
  return <span className="badge badge--active">{d <= 14 ? `Ends in ${d} days` : 'Active'}</span>
}

/**
 * Compact promotion card for the logged-in home and profile (wireframe "Suggested" / "Entered" rows),
 * drawn in the live-site style: brand-color top with the round teaser art, white body.
 */
export function PromoCard({ promo, entry }: { promo: Promo; entry?: Entry }) {
  const ended = isEnded(promo)
  return (
    <article className={`pcard ${ended ? 'pcard--ended' : ''}`} style={promoStyle(promo)}>
      <div className="pcard__media">
        <img src={promo.images.card} alt="" />
        <span className="pcard__badge"><StatusBadge promo={promo} entry={entry} /></span>
      </div>
      <div className="pcard__body">
        <p className="pcard__brand">{promo.brandLabel}</p>
        <h3 className="pcard__title">{promo.teaserTitle}</h3>
        <p className="pcard__date"><CalendarDays size={16} aria-hidden /> {formatRange(promo)}</p>
        {entry ? (
          <p className="pcard__entry">
            {entry.outcome === 'won' && <>Prize: <strong>{entry.prize}</strong></>}
            {entry.outcome === 'lost' && <>No instant win this time{promo.drawPrize ? <>, but you’re in the draw for {promo.drawPrize}</> : ''}.</>}
            {entry.outcome === 'entered' && <>You’re in the draw{promo.drawPrize ? <> for {promo.drawPrize}</> : ''}.</>}
          </p>
        ) : (
          <p className="pcard__text">{promo.teaserText}</p>
        )}
        <Link to={`/promotions/${promo.slug}`} className={`btn ${entry || ended ? 'btn--outline' : 'btn--primary'} pcard__cta`}>
          {entry ? 'View' : ended ? 'View promo' : 'Enter'}<span className="visually-hidden">: {promo.teaserTitle}</span>
        </Link>
      </div>
    </article>
  )
}
