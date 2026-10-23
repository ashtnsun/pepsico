import { Link, useParams } from 'react-router-dom'
import { Frown, PartyPopper, Ticket } from 'lucide-react'
import { getPromo, promos } from '../data/promos'
import { REWARD_EVERY, formatDate, isActive } from '../data/config'
import { useStore } from '../state/store'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { PromoCard } from '../components/promo/PromoCard'
import NotFound from './NotFound'
import { promoCrumbs } from './PromoDetail'
import './pages.css'

/** Wireframes "Promo Results (WIN)" and "(LOSE)", plus a draw-entry confirmation. */
export default function Result() {
  const { slug, id } = useParams()
  const promo = getPromo(slug)
  const { myEntries } = useStore()
  const entry = myEntries.find((e) => e.id === id)
  if (!promo || !entry) return <NotFound />

  const prize = promo.prizes.find((p) => p.name === entry.prize)
  const total = myEntries.length
  const left = REWARD_EVERY - (total % REWARD_EVERY)
  const unlocked = total % REWARD_EVERY === 0
  const entered = new Set(myEntries.map((e) => e.promo))
  const next = promos.filter((p) => isActive(p) && !entered.has(p.slug))

  return (
    <>
      <Breadcrumb items={promoCrumbs(promo.slug, [{ label: 'Your result' }])} />
      <div className="result">
        <div className="result__card" role="status">
          {entry.outcome === 'won' && (
            <>
              <div className="result__icon result__icon--won"><PartyPopper size={44} aria-hidden /></div>
              <h1>Congratulations!</h1>
              <p className="result__lead">You’ve won a prize. Please check your inbox for further instructions on how to redeem your prize. Claim it within 14 days.</p>
              <div className="result__prize">
                <h2>You won: <strong>{entry.prize}</strong></h2>
                {prize && <img src={prize.image} alt="" />}
                {promo.drawPrize && <p className="result__lead">You’re also in the draw for {promo.drawPrize}.</p>}
              </div>
            </>
          )}
          {entry.outcome === 'lost' && (
            <>
              <div className="result__icon result__icon--lost"><Frown size={44} aria-hidden /></div>
              <h1>Not this time</h1>
              <p className="result__lead">Sorry, this code didn’t win an instant prize.</p>
              {promo.drawPrize && (
                <div className="result__prize">
                  <h2>But you’re still in the draw for <strong>{promo.drawPrize}</strong></h2>
                  <p className="result__lead">The winners are picked at random after the promotion ends on {formatDate(promo.end)}. We’ll email you if you win.</p>
                </div>
              )}
            </>
          )}
          {entry.outcome === 'entered' && (
            <>
              <div className="result__icon result__icon--entered"><Ticket size={44} aria-hidden /></div>
              <h1>You’re in the draw!</h1>
              <p className="result__lead">Your code has been accepted. You’re entered into the draw for <strong>{promo.drawPrize}</strong>.</p>
              <div className="result__prize">
                <h2>What happens next</h2>
                <p className="result__lead">The winner is picked at random after the promotion ends on {formatDate(promo.end)} and will be contacted by email.</p>
              </div>
            </>
          )}
          <p className="result__code">Code {entry.code} · entered {formatDate(entry.date.slice(0, 10))}</p>
          <p className="alert alert--info" style={{ marginTop: 20, textAlign: 'left' }}>
            {unlocked
              ? <>This was your {total}th entry: you’ve unlocked a JOY reward! See it on your homepage.</>
              : <>You’re {left} {left === 1 ? 'entry' : 'entries'} away from your next JOY reward.</>}
          </p>
          <div className="result__actions">
            <Link to="/" className="btn btn--primary btn--wide">Return to homepage</Link>
            <Link to="/profile#entries" className="link link--caps">See all my entries</Link>
          </div>
        </div>

        {next.length > 0 && (
          <section className="result__next container" aria-labelledby="next-title">
            <h2 id="next-title" className="h1">Try another promotion</h2>
            <div className="card-grid">{next.map((p) => <PromoCard key={p.slug} promo={p} />)}</div>
          </section>
        )}
      </div>
    </>
  )
}
