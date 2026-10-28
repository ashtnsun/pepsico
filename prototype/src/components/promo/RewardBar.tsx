import type { CSSProperties, ReactNode } from 'react'
import { Check, Gift } from 'lucide-react'
import { REWARD_EVERY } from '../../data/config'
import { useDesign } from '../../state/design'
import { TrackBar } from './HeroVariants'
import './reward-bar.css'

/**
 * Change 58: visual exploration of the reward progress bar only (chosen in the config menu, press C).
 * Used by the Big track home hero and the result page. "Original" is the chunky TrackBar.
 */
export function RewardBar({ filled }: { filled: number }) {
  const { bar } = useDesign()
  if (bar === 'original') return <TrackBar filled={filled} />
  const Variant = { line: BarLine, segments: BarSegments, stepper: BarStepper, meter: BarMeter, tickets: BarTickets }[bar]
  return <Variant filled={filled} />
}

type Props = { filled: number }
const steps = Array.from({ length: REWARD_EVERY }, (_, n) => n)
const isGift = (n: number) => n === REWARD_EVERY - 1
const label = (n: number) => (isGift(n) ? 'Reward' : `Entry ${n + 1}`)
const pct = (filled: number) => `${(filled / REWARD_EVERY) * 100}%`
const delay = (n: number) => ({ animationDelay: `${0.2 + n * 0.15}s` }) as CSSProperties

function Bar({ filled, className, children }: Props & { className: string; children: ReactNode }) {
  return (
    <div className={`pbar ${className}`} role="progressbar" aria-valuemin={0} aria-valuemax={REWARD_EVERY} aria-valuenow={filled} aria-label="Entries towards your next reward">
      {children}
    </div>
  )
}

/* A · Slim line: thin rail, small dots, count above */
function BarLine({ filled }: Props) {
  return (
    <Bar filled={filled} className="pbar--line">
      <p className="pbar-line__count"><strong>{filled}</strong> of {REWARD_EVERY} entries</p>
      <div className="pbar-line__track">
        <div className="pbar-line__rail"><div className="pbar__fill" style={{ width: pct(filled) }} /></div>
        <ol className="pbar-line__marks">
          {steps.map((n) => (
            <li key={n} className={`${n < filled ? 'is-done' : ''} ${isGift(n) ? 'is-gift' : ''}`} style={{ left: pct(n + 1) }}>
              <span className="pbar-line__dot">{isGift(n) && <Gift size={16} aria-hidden />}</span>
              <span className="pbar__name">{label(n)}</span>
            </li>
          ))}
        </ol>
      </div>
    </Bar>
  )
}

/* B · Segments: one block per entry, with a gap between */
function BarSegments({ filled }: Props) {
  return (
    <Bar filled={filled} className="pbar--segs">
      {steps.map((n) => (
        <div key={n} className={`pbar-seg ${n < filled ? 'is-done' : ''} ${isGift(n) ? 'is-gift' : ''}`}>
          <span className="pbar-seg__block"><span className="pbar-seg__fill" style={delay(n)} /></span>
          <span className="pbar__name">
            {isGift(n) ? <Gift size={16} aria-hidden /> : n < filled && <Check size={16} strokeWidth={3} aria-hidden />} {label(n)}
          </span>
        </div>
      ))}
    </Bar>
  )
}

/* C · Stepper: numbered circles joined by lines; the next entry is ringed */
function BarStepper({ filled }: Props) {
  return (
    <Bar filled={filled} className="pbar--steps">
      {steps.map((n) => (
        <div key={n} className={`pbar-step ${n < filled ? 'is-done' : ''} ${n === filled ? 'is-next' : ''} ${isGift(n) ? 'is-gift' : ''}`}>
          <span className="pbar-step__dot">{isGift(n) ? <Gift size={22} aria-hidden /> : n < filled ? <Check size={20} strokeWidth={3} aria-hidden /> : n + 1}</span>
          <span className="pbar__name">{label(n)}</span>
        </div>
      ))}
    </Bar>
  )
}

/* D · Meter card: big count, segmented bar and a gift tile on a soft panel */
function BarMeter({ filled }: Props) {
  return (
    <Bar filled={filled} className="pbar--meter">
      <p className="pbar-meter__count"><strong>{filled}</strong>/{REWARD_EVERY}<small>entries</small></p>
      <div className="pbar-meter__main">
        <div className="pbar-meter__rail"><div className="pbar__fill" style={{ width: pct(filled) }} /></div>
        <ol className="pbar-meter__names">{steps.map((n) => <li key={n} className={`pbar__name ${n < filled ? 'is-done' : ''}`}>{label(n)}</li>)}</ol>
      </div>
      <span className={`pbar-meter__gift ${filled === REWARD_EVERY ? 'is-open' : ''}`}><Gift size={28} aria-hidden /></span>
    </Bar>
  )
}

/* E · Tickets: one entry ticket per code; the last ticket is the reward */
function BarTickets({ filled }: Props) {
  return (
    <Bar filled={filled} className="pbar--tickets">
      {steps.map((n) => (
        <div key={n} className={`pbar-ticket ${n < filled ? 'is-done' : ''} ${isGift(n) ? 'is-gift' : ''}`} style={delay(n)}>
          <span className="pbar-ticket__icon">{isGift(n) ? <Gift size={24} aria-hidden /> : n < filled ? <Check size={22} strokeWidth={3} aria-hidden /> : n + 1}</span>
          <span className="pbar__name">{label(n)}</span>
        </div>
      ))}
    </Bar>
  )
}
