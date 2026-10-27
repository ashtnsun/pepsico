import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Clock, Gift, Ticket, Trophy, Zap } from 'lucide-react'
import type { Promo } from '../../data/promos'
import type { Entry } from '../../state/store'
import { daysLeft, formatDate, isEnded, TODAY } from '../../data/config'
import { promoStyle } from './PromoTeaser'
import { StatusBadge } from './PromoCard'
import './card-variants.css'

/**
 * Visual exploration: five alternative promotion cards (chosen in the config menu, press C).
 * Same information as the original PromoCard, ordered: what it is, what you can win, how long is left, what to do.
 */
export type CardProps = { promo: Promo; entry?: Entry }

function cardInfo(promo: Promo, entry?: Entry) {
  const ended = isEnded(promo)
  const d = daysLeft(promo)
  const total = Date.parse(promo.end) - Date.parse(promo.start)
  return {
    ended,
    days: d,
    time: ended ? `Ended ${formatDate(promo.end)}` : d <= 0 ? 'Ends today' : d === 1 ? '1 day left' : `${d} days left`,
    urgent: !ended && d <= 14,
    elapsed: Math.min(100, Math.max(0, ((Date.parse(TODAY) - Date.parse(promo.start)) / total) * 100)),
    mechanic: promo.mechanic === 'instant' ? 'Instant win' : 'Prize draw',
    MechanicIcon: promo.mechanic === 'instant' ? Zap : Ticket,
    prize: promo.prizes[0],
    cta: entry ? 'View' : ended ? 'View promo' : 'Enter now',
    primary: !entry && !ended,
  }
}

/** What the participant got, for cards in "Your entries". */
function Outcome({ promo, entry }: { promo: Promo; entry: Entry }) {
  if (entry.outcome === 'won') return <>You won: <strong>{entry.prize}</strong></>
  if (entry.outcome === 'lost') return <>No instant win this time{promo.drawPrize ? <>, but you’re in the draw for {promo.drawPrize}</> : ''}.</>
  return <>You’re in the draw{promo.drawPrize ? <> for {promo.drawPrize}</> : ''}.</>
}

/** The card's one link, stretched over the whole card so the card is clickable. */
function CardLink({ promo, className, children }: { promo: Promo; className: string; children: ReactNode }) {
  return (
    <Link to={`/promotions/${promo.slug}`} className={`cv-link ${className}`}>
      {children}<span className="visually-hidden">: {promo.teaserTitle}</span>
    </Link>
  )
}

/* ---------- A · Poster ---------- */
export function CardPoster({ promo, entry }: CardProps) {
  const i = cardInfo(promo, entry)
  return (
    <article className={`cv cv-poster ${i.ended ? 'is-ended' : ''}`} style={promoStyle(promo)}>
      <div className="cv-poster__top">
        <StatusBadge promo={promo} entry={entry} />
        <span className="cv-chip cv-chip--glass"><i.MechanicIcon size={14} aria-hidden /> {i.mechanic}</span>
      </div>
      <div className="cv-poster__art"><img src={promo.images.card} alt="" /></div>
      <div className="cv-poster__body">
        <p className="cv-eyebrow">{promo.brandLabel}</p>
        <h3 className="cv-poster__title">{promo.teaserTitle}</h3>
        <p className="cv-poster__prize">
          {entry ? <Outcome promo={promo} entry={entry} /> : <><Gift size={18} aria-hidden /> <span>Win: <strong>{i.prize?.name}</strong></span></>}
        </p>
        <div className="cv-poster__foot">
          <span className={`cv-time ${i.urgent ? 'is-urgent' : ''}`}><Clock size={16} aria-hidden /> {i.time}</span>
          <CardLink promo={promo} className={`btn ${i.primary ? 'btn--promo' : 'btn--outline-white'}`}>{i.cta}</CardLink>
        </div>
      </div>
    </article>
  )
}

/* ---------- B · Ticket ---------- */
export function CardTicket({ promo, entry }: CardProps) {
  const i = cardInfo(promo, entry)
  return (
    <article className={`cv cv-ticket ${i.ended ? 'is-ended' : ''}`} style={promoStyle(promo)}>
      <div className="cv-ticket__media">
        <img src={promo.images.card} alt="" />
        <span className="cv-ticket__badge"><StatusBadge promo={promo} entry={entry} /></span>
      </div>
      <div className="cv-ticket__body">
        <p className="cv-eyebrow">{promo.brandLabel} · {i.mechanic}</p>
        <h3 className="cv-ticket__title">{promo.teaserTitle}</h3>
        {entry ? (
          <p className="cv-ticket__outcome"><Outcome promo={promo} entry={entry} /></p>
        ) : i.prize && (
          <div className="cv-ticket__prize">
            <img src={i.prize.image} alt="" />
            <div><span className="cv-label">Top prize</span><strong>{i.prize.name}</strong></div>
          </div>
        )}
      </div>
      <div className="cv-ticket__tear" aria-hidden />
      <div className="cv-ticket__stub">
        <div className={`cv-ticket__days ${i.urgent ? 'is-urgent' : ''}`}>
          {i.ended ? <span className="cv-ticket__ended">Ended</span> : <><b>{Math.max(i.days, 0)}</b><span>{i.days === 1 ? 'day' : 'days'}<br />left</span></>}
        </div>
        <CardLink promo={promo} className={`btn ${i.primary ? 'btn--primary' : 'btn--outline'}`}>{i.cta}</CardLink>
      </div>
    </article>
  )
}

/* ---------- C · Time bar ---------- */
export function CardTimebar({ promo, entry }: CardProps) {
  const i = cardInfo(promo, entry)
  return (
    <article className={`cv cv-timebar ${i.ended ? 'is-ended' : ''}`} style={promoStyle(promo)}>
      <div className="cv-timebar__media">
        <img src={promo.images.card} alt="" />
        <div className="cv-timebar__over">
          <StatusBadge promo={promo} entry={entry} />
          <p className="cv-eyebrow">{promo.brandLabel}</p>
          <h3 className="cv-timebar__title">{promo.teaserTitle}</h3>
        </div>
      </div>
      <div className="cv-timebar__body">
        <p className="cv-timebar__line">
          {entry ? <><Trophy size={18} aria-hidden /> <span><Outcome promo={promo} entry={entry} /></span></>
            : <><Gift size={18} aria-hidden /> <span><span className="cv-label">Top prize</span>{i.prize?.name}</span></>}
        </p>
        <p className="cv-timebar__line"><i.MechanicIcon size={18} aria-hidden /> <span>{i.mechanic}{promo.mechanic === 'instant' ? ': find out straight away' : ': winners drawn after it ends'}</span></p>
        <div className="cv-timebar__time">
          <div className="cv-timebar__labels"><span>{formatDate(promo.start)}</span><strong className={i.urgent ? 'is-urgent' : ''}>{i.ended ? 'Ended' : i.time}</strong><span>{formatDate(promo.end)}</span></div>
          <div className="cv-timebar__rail" role="img" aria-label={`${Math.round(i.elapsed)}% of the promotion has passed`}><span style={{ width: `${i.elapsed}%` }} /></div>
        </div>
        <CardLink promo={promo} className={`btn btn--block ${i.primary ? 'btn--primary' : 'btn--outline'}`}>{i.cta}</CardLink>
      </div>
    </article>
  )
}

/* ---------- D · Prize first ---------- */
export function CardPrize({ promo, entry }: CardProps) {
  const i = cardInfo(promo, entry)
  const won = entry?.outcome === 'won'
  const shown = (won && promo.prizes.find((p) => p.name === entry.prize)) || i.prize
  return (
    <article className={`cv cv-prize ${i.ended ? 'is-ended' : ''}`} style={promoStyle(promo)}>
      <div className="cv-prize__stage">
        <span className="cv-prize__badge"><StatusBadge promo={promo} entry={entry} /></span>
        <img className="cv-prize__art" src={promo.images.card} alt="" />
        {shown && <img className="cv-prize__img" src={shown.image} alt="" />}
        <p className="cv-prize__name"><span className="cv-label">{won ? 'You won' : 'Top prize'}</span>{won ? entry.prize : shown?.name}</p>
      </div>
      <div className="cv-prize__body">
        <p className="cv-eyebrow">{promo.brandLabel}</p>
        <h3 className="cv-prize__title">{promo.teaserTitle}</h3>
        <p className="cv-prize__text">{entry && !won ? <Outcome promo={promo} entry={entry} /> : promo.teaserText}</p>
        <div className="cv-prize__chips">
          <span className={`cv-chip ${i.urgent ? 'cv-chip--urgent' : ''}`}><Clock size={14} aria-hidden /> {i.time}</span>
          <span className="cv-chip"><i.MechanicIcon size={14} aria-hidden /> {i.mechanic}</span>
        </div>
        <CardLink promo={promo} className={`btn btn--block ${i.primary ? 'btn--primary' : 'btn--outline'}`}>{i.cta}</CardLink>
      </div>
    </article>
  )
}

/* ---------- E · Offset ---------- */
export function CardOffset({ promo, entry }: CardProps) {
  const i = cardInfo(promo, entry)
  return (
    <article className={`cv cv-offset ${i.ended ? 'is-ended' : ''}`} style={promoStyle(promo) as CSSProperties}>
      <div className="cv-offset__media">
        <img src={promo.images.card} alt="" />
        <span className="cv-offset__brand">{promo.brandLabel}</span>
      </div>
      <div className="cv-offset__body">
        <div className="cv-offset__status"><StatusBadge promo={promo} entry={entry} /></div>
        <h3 className="cv-offset__title">{promo.teaserTitle}</h3>
        <ul className="cv-offset__facts">
          <li>{entry?.outcome === 'won' ? <Trophy size={18} aria-hidden /> : <Gift size={18} aria-hidden />}<span>{entry ? <Outcome promo={promo} entry={entry} /> : <>Win <strong>{i.prize?.name}</strong></>}</span></li>
          <li><i.MechanicIcon size={18} aria-hidden /><span>{i.mechanic}</span></li>
          <li><CalendarDays size={18} aria-hidden /><span className={i.urgent ? 'is-urgent' : ''}>{i.ended ? i.time : <>{i.time} · ends {formatDate(promo.end)}</>}</span></li>
        </ul>
        <CardLink promo={promo} className={`btn btn--block ${i.primary ? 'btn--primary' : 'btn--outline'}`}>{i.cta} <ArrowRight size={18} aria-hidden /></CardLink>
      </div>
    </article>
  )
}
