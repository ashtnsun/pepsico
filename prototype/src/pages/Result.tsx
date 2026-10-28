import { Link, useParams } from 'react-router-dom'
import { getPromo } from '../data/promos'
import { REWARD_EVERY, REWARD_NAME, formatDate } from '../data/config'
import { useStore } from '../state/store'
import { stageStyle } from '../state/chrome'
import { RewardBar } from '../components/promo/RewardBar'
import { promoStyle } from '../components/promo/PromoTeaser'
import NotFound from './NotFound'
import { PromoStrip } from './Participate'
import './pages.css'

/**
 * Wireframes "Promo Results (WIN)" and "(LOSE)", plus a draw-entry confirmation.
 * Change 39: one order for every outcome: headline, the prize (or the draw), what happens next, then progress
 * towards the next JOY reward. No decorative icon; a win shows the real prize picture instead.
 */
export default function Result() {
  const { slug, id } = useParams()
  const promo = getPromo(slug)
  const { myEntries } = useStore()
  const entry = myEntries.find((e) => e.id === id)
  if (!promo || !entry) return <NotFound />

  const prize = promo.prizes.find((p) => p.name === entry.prize)

  return (
    // Change 46: no breadcrumb on this task page; the promo strip says where you are
    <div style={{ ...promoStyle(promo), ...stageStyle(promo) }}>
      <div className="result">
        <div className="participate__main">
          <PromoStrip promo={promo} kicker="Your result" />
          <div className="result__card" role="status">
            {entry.outcome === 'won' && (
              <>
                <h1>You’ve won!</h1>
                <div className="result__prize">
                  {prize && <img src={prize.image} alt="" />}
                  <p className="result__prize-name">{entry.prize}</p>
                </div>
                <p className="result__lead">We’ve emailed you how to claim your prize. <strong>Claim it within 14 days.</strong></p>
                {promo.drawPrize && <p className="result__note">You’re also in the draw for {promo.drawPrize}.</p>}
              </>
            )}
            {entry.outcome === 'lost' && (
              <>
                <h1>No win this time</h1>
                <p className="result__lead">This code didn’t win an instant prize.</p>
                {promo.drawPrize && (
                  <p className="result__note">
                    <strong>You’re still in the draw for {promo.drawPrize}.</strong> Winners are picked at random after the promotion ends on {formatDate(promo.end)}. We’ll email you if you win.
                  </p>
                )}
              </>
            )}
            {entry.outcome === 'entered' && (
              <>
                <h1>You’re in the draw!</h1>
                <p className="result__lead">Your code was accepted. You’re entered into the draw for <strong>{promo.drawPrize}</strong>.</p>
                <p className="result__note">The winner is picked at random after the promotion ends on {formatDate(promo.end)} and will be contacted by email.</p>
              </>
            )}
            <RewardProgress entries={myEntries.length} />
            <div className="result__actions">
              <Link to="/" className="btn btn--primary btn--wide">Return to homepage</Link>
              <Link to="/profile#entries" className="link link--caps">See all my entries</Link>
            </div>
            <p className="result__code">Code {entry.code} · Entered {formatDate(entry.date.slice(0, 10))}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Change 39: entries towards the next JOY reward. Change 46: drawn with the home hero's track bar, in JOY colours on every brand.
 * Change 58: the bar style follows the config menu's "Progress bar" choice. */
function RewardProgress({ entries }: { entries: number }) {
  // Change 47: "unlocked" means a reward is waiting to be claimed on the homepage
  const { unclaimedRewards } = useStore()
  const done = entries % REWARD_EVERY
  const unlocked = unclaimedRewards > 0
  const left = REWARD_EVERY - done
  return (
    <section className="reward" data-brand="joy" aria-labelledby="reward-title">
      <h2 id="reward-title">{unlocked ? <>You’ve <em>unlocked</em> a JOY reward</> : <><em>{left} more {left === 1 ? 'entry' : 'entries'}</em> to your next JOY reward</>}</h2>
      <RewardBar filled={unlocked ? REWARD_EVERY : done} />
      <p className="reward__text">
        {unlocked ? <>You’ve earned {REWARD_NAME}. <Link to="/">Claim it on your homepage</Link>.</> : <>Every {REWARD_EVERY} entries earns {REWARD_NAME}.</>}
      </p>
    </section>
  )
}
