import { Check, Gift } from 'lucide-react'
import { REWARD_EVERY, REWARD_NAME } from '../../data/config'
import './promo.css'

/**
 * Wireframe "Home (Logged-in)": greeting with a progress bar towards the next reward.
 * Drawn on the live site's dark-blue band with the JOY yellow.
 */
export function ProgressTracker({ name, entries }: { name: string; entries: number }) {
  const done = entries % REWARD_EVERY
  const rewards = Math.floor(entries / REWARD_EVERY)
  const left = REWARD_EVERY - done
  const justUnlocked = entries > 0 && done === 0
  return (
    <section className="tracker" aria-labelledby="tracker-title">
      <img className="tracker__deco tracker__deco--l" src="./images/global/mailing-left.png" alt="" />
      <img className="tracker__deco tracker__deco--r" src="./images/global/mailing-right.png" alt="" />
      <h1 id="tracker-title" className="tracker__hello">Hi {name},</h1>
      <div className="tracker__bar" role="progressbar" aria-valuemin={0} aria-valuemax={REWARD_EVERY} aria-valuenow={justUnlocked ? REWARD_EVERY : done} aria-label="Entries towards your next reward">
        <div className="tracker__fill" style={{ width: `${((justUnlocked ? REWARD_EVERY : done) / REWARD_EVERY) * 100}%` }} />
        {Array.from({ length: REWARD_EVERY }, (_, n) => {
          const reached = justUnlocked || n < done
          const last = n === REWARD_EVERY - 1
          return (
            <span key={n} className={`tracker__step ${reached ? 'is-done' : ''} ${last ? 'tracker__step--gift' : ''}`} style={{ left: `${((n + 1) / REWARD_EVERY) * 100}%` }}>
              {last ? <Gift size={22} aria-hidden /> : reached ? <Check size={18} strokeWidth={3} aria-hidden /> : <span aria-hidden>{n + 1}</span>}
            </span>
          )
        })}
      </div>
      <p className="tracker__msg">
        {justUnlocked
          ? <>You’ve unlocked a reward: <strong>{REWARD_NAME}</strong>! Keep entering to earn the next one.</>
          : <>You are <strong>{left} {left === 1 ? 'entry' : 'entries'}</strong> away from your next reward!</>}
      </p>
      <p className="tracker__small">Every {REWARD_EVERY} entries earns {REWARD_NAME}.{rewards > 0 && ` Rewards earned so far: ${rewards}.`}</p>
    </section>
  )
}
