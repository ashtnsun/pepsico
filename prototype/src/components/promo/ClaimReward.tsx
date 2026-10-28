import { useState } from 'react'
import { CircleCheck, Gift } from 'lucide-react'
import { REWARD_DRAW, REWARD_EVERY, formatDate } from '../../data/config'
import { useStore, type Claim } from '../../state/store'
import { useToast } from '../ui/Toast'
import { Modal } from '../ui/Modal'
import './promo.css'

/**
 * Change 47: claim a JOY reward from the home hero once REWARD_EVERY entries are made.
 * Two steps in one modal: what you get and "Claim reward", then a confirmation with a reference.
 */
export function ClaimReward({ onClose }: { onClose: () => void }) {
  const { user, claimReward, unclaimedRewards } = useStore()
  const toast = useToast()
  const [claim, setClaim] = useState<Claim | null>(null)

  const findPromo = (close: () => void) => {
    close()
    window.setTimeout(() => document.getElementById('suggested-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250)
  }

  return (
    <Modal title={claim ? 'Reward claimed!' : 'Claim your reward'} onClose={onClose}>
      {(close) => claim ? (
        <>
          <CircleCheck className="claim__done" size={56} aria-hidden />
          <p>You’re in the JOY monthly prize draw on <strong>{formatDate(REWARD_DRAW)}</strong>. We’ll email {user?.email} if you win.</p>
          <p className="claim__ref">Reference {claim.ref}</p>
          {unclaimedRewards > 0 && <p>You have {unclaimedRewards} more {unclaimedRewards === 1 ? 'reward' : 'rewards'} to claim.</p>}
          <div className="modal__actions">
            {unclaimedRewards > 0
              ? <button type="button" className="btn btn--primary" onClick={() => setClaim(null)}>Claim next reward</button>
              : <button type="button" className="btn btn--primary" onClick={() => findPromo(close)}>Find a promotion</button>}
            <button type="button" className="btn btn--outline" onClick={close}>Done</button>
          </div>
        </>
      ) : (
        <>
          <div className="claim__ticket">
            <span className="claim__gift"><Gift size={32} aria-hidden /></span>
            <span className="claim__what">
              <strong>Bonus entry</strong>
              JOY monthly prize draw · {formatDate(REWARD_DRAW)}
            </span>
          </div>
          <p>You’ve made {REWARD_EVERY} entries, so you’ve earned a bonus entry into the JOY monthly prize draw. Claim it to be entered into this month’s draw.</p>
          <div className="modal__actions">
            <button type="button" className="btn btn--outline" onClick={close}>Not now</button>
            <button type="button" className="btn btn--primary" onClick={() => {
              const c = claimReward()
              if (c) { setClaim(c); toast('Reward claimed. You’re in the monthly prize draw.') }
            }}>Claim reward</button>
          </div>
        </>
      )}
    </Modal>
  )
}
