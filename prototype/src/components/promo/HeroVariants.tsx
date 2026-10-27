import type { CSSProperties, ReactNode } from 'react'
import { ArrowDown, Check, Gift, Sparkles, Ticket, Trophy } from 'lucide-react'
import { REWARD_EVERY, REWARD_NAME } from '../../data/config'
import './hero-variants.css'

/**
 * Visual exploration: five alternative logged-in home heroes (chosen in the config menu, press C).
 * All show the same progress towards the next reward as the original ProgressTracker.
 */
export type HeroProps = { name: string; entries: number; wins: number }

function useReward(entries: number) {
  const done = entries % REWARD_EVERY
  const unlocked = entries > 0 && done === 0
  const filled = unlocked ? REWARD_EVERY : done
  return { filled, left: REWARD_EVERY - done, unlocked, rewards: Math.floor(entries / REWARD_EVERY), pct: (filled / REWARD_EVERY) * 100 }
}

const steps = Array.from({ length: REWARD_EVERY }, (_, n) => n)
const scrollToPromos = () => document.getElementById('suggested-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

function Message({ left, unlocked }: { left: number; unlocked: boolean }) {
  return unlocked
    ? <>You’ve unlocked <strong>{REWARD_NAME}</strong>! Keep entering to earn the next one.</>
    : <>You are <strong>{left} {left === 1 ? 'entry' : 'entries'}</strong> away from your next reward.</>
}

function Cta({ className = 'btn btn--yellow btn--wide' }: { className?: string }) {
  return <button type="button" className={className} onClick={scrollToPromos}>Find a promotion <ArrowDown size={18} aria-hidden /></button>
}

function Bar({ filled, children, className }: { filled: number; children: ReactNode; className: string }) {
  return (
    <div className={className} role="progressbar" aria-valuemin={0} aria-valuemax={REWARD_EVERY} aria-valuenow={filled} aria-label="Entries towards your next reward">
      {children}
    </div>
  )
}

/** JOY decoration shapes from the brand sheet: plus signs, dot grids, rings. */
function Deco({ variant }: { variant: string }) {
  return (
    <div className={`hv-deco hv-deco--${variant}`} aria-hidden>
      <span className="hv-plus hv-plus--a" /><span className="hv-plus hv-plus--b" /><span className="hv-dots hv-dots--a" /><span className="hv-dots hv-dots--b" /><span className="hv-circle" />
    </div>
  )
}

/* ---------- A · Reward ring ---------- */
export function HeroRing({ name, entries }: HeroProps) {
  const r = useReward(entries)
  const R = 130, C = 2 * Math.PI * R, gap = 24, seg = C / REWARD_EVERY - gap
  return (
    <section className="hv hv-ring" aria-labelledby="hero-title">
      <Deco variant="ring" />
      <div className="hv__inner hv-ring__inner">
        <div className="hv-ring__text">
          <p className="hv__eyebrow">Your JOY rewards</p>
          <h1 id="hero-title" className="hv__title">Hi {name},</h1>
          <p className="hv__msg"><Message {...r} /></p>
          <p className="hv__small">Every {REWARD_EVERY} entries earns {REWARD_NAME}.</p>
          <Cta />
        </div>
        <Bar className="hv-ring__dial" filled={r.filled}>
          <svg viewBox="0 0 320 320" aria-hidden>
            {steps.map((n) => (
              <circle key={n} cx="160" cy="160" r={R} className={`hv-ring__seg ${n < r.filled ? 'is-done' : ''}`}
                strokeDasharray={`${seg} ${C}`} transform={`rotate(${-90 + (n * 360) / REWARD_EVERY + (gap / C) * 180} 160 160)`}
                style={{ '--seg': seg, animationDelay: `${0.2 + n * 0.18}s` } as CSSProperties} />
            ))}
          </svg>
          <div className="hv-ring__center">
            <span className={`hv-ring__gift ${r.unlocked ? 'is-open' : ''}`}><Gift size={34} /></span>
            <span className="hv-ring__count">{r.filled}<small>/{REWARD_EVERY}</small></span>
            <span className="hv-ring__label">entries</span>
          </div>
        </Bar>
      </div>
    </section>
  )
}

/* ---------- B · Stamp card ---------- */
const STAMP_COLORS = ['var(--hv-purple)', 'var(--hv-orange)', 'var(--hv-sky)']
export function HeroStamps({ name, entries }: HeroProps) {
  const r = useReward(entries)
  return (
    <section className="hv hv-stamps" aria-labelledby="hero-title">
      <Deco variant="stamps" />
      <div className="hv__inner hv-stamps__inner">
        <h1 id="hero-title" className="hv__title">Hi {name},</h1>
        <p className="hv__msg"><Message {...r} /></p>
        <div className="hv-stamps__card">
          <div className="hv-stamps__head">
            <span className="hv-stamps__brand"><img src="./images/global/joy-logo-white.png" alt="JOY" /> Reward card</span>
            <span className="hv-stamps__no">Card #{r.rewards + (r.unlocked ? 0 : 1)}</span>
          </div>
          <Bar className="hv-stamps__slots" filled={r.filled}>
            {steps.map((n) => {
              const last = n === REWARD_EVERY - 1
              const on = n < r.filled
              return (
                <div key={n} className={`hv-stamp ${on ? 'is-done' : ''} ${last ? 'hv-stamp--gift' : ''}`}
                  style={{ '--stamp': last ? 'var(--site-yellow)' : STAMP_COLORS[n % 3], '--tilt': `${[-9, 7, -5, 4][n]}deg`, animationDelay: `${0.15 + n * 0.15}s` } as CSSProperties}>
                  <span className="hv-stamp__face">{last ? <Gift size={36} /> : on ? <Check size={34} strokeWidth={3} /> : n + 1}</span>
                  <span className="hv-stamp__label">{last ? 'Reward' : `Entry ${n + 1}`}</span>
                </div>
              )
            })}
          </Bar>
          <p className="hv-stamps__foot">Every {REWARD_EVERY} entries earns {REWARD_NAME}.{r.rewards > 0 && ` Cards completed: ${r.rewards}.`}</p>
        </div>
        <Cta />
      </div>
    </section>
  )
}

/* ---------- C · Big track ---------- */
export function HeroTrack({ name, entries }: HeroProps) {
  const r = useReward(entries)
  return (
    <section className="hv hv-track" aria-labelledby="hero-title">
      <Deco variant="track" />
      <div className="hv__inner hv-track__inner">
        <p className="hv__eyebrow">Hi {name}</p>
        <h1 id="hero-title" className="hv-track__headline">
          {r.unlocked ? <>Reward <em>unlocked!</em></> : <><em>{r.left} {r.left === 1 ? 'entry' : 'entries'}</em> to your next reward</>}
        </h1>
        <Bar className="hv-track__bar" filled={r.filled}>
          <div className="hv-track__rail">
            <div className="hv-track__fill" style={{ width: `${r.pct}%` }}>
              {r.filled > 0 && <span className="hv-track__bubble">{r.filled} / {REWARD_EVERY}</span>}
            </div>
          </div>
          <ol className="hv-track__marks">
            {steps.map((n) => {
              const last = n === REWARD_EVERY - 1
              return (
                <li key={n} className={`${n < r.filled ? 'is-done' : ''} ${last ? 'is-gift' : ''}`} style={{ left: `${((n + 1) / REWARD_EVERY) * 100}%` }}>
                  <span className="hv-track__dot">{last ? <Gift size={30} aria-hidden /> : n < r.filled ? <Check size={18} strokeWidth={3} aria-hidden /> : n + 1}</span>
                  <span className="hv-track__name">{last ? 'Reward' : `Entry ${n + 1}`}</span>
                </li>
              )
            })}
          </ol>
        </Bar>
        <p className="hv__small">Every {REWARD_EVERY} entries earns {REWARD_NAME}.</p>
      </div>
    </section>
  )
}

/* ---------- D · Bento dashboard ---------- */
export function HeroBento({ name, entries, wins }: HeroProps) {
  const r = useReward(entries)
  return (
    <section className="hv hv-bento" aria-labelledby="hero-title">
      <div className="hv__inner hv-bento__grid">
        <div className="hv-bento__main">
          <Deco variant="bento" />
          <p className="hv__eyebrow">Your JOY rewards</p>
          <h1 id="hero-title" className="hv__title">Hi {name},</h1>
          <p className="hv__msg"><Message {...r} /></p>
          <Bar className="hv-bento__segs" filled={r.filled}>
            {steps.map((n) => (
              <span key={n} className={`hv-bento__seg ${n < r.filled ? 'is-done' : ''}`} style={{ animationDelay: `${0.2 + n * 0.15}s` }}>
                <span className="hv-bento__seg-label">{n === REWARD_EVERY - 1 ? <><Gift size={16} aria-hidden /> Reward</> : `Entry ${n + 1}`}</span>
              </span>
            ))}
          </Bar>
          <Cta />
        </div>
        <div className="hv-bento__tile hv-bento__tile--sky">
          <Ticket size={28} aria-hidden />
          <span className="hv-bento__num">{entries}</span>
          <span className="hv-bento__cap">Total entries</span>
        </div>
        <div className="hv-bento__tile hv-bento__tile--green">
          <Trophy size={28} aria-hidden />
          <span className="hv-bento__num">{wins}</span>
          <span className="hv-bento__cap">Prizes won</span>
        </div>
        <div className="hv-bento__tile hv-bento__tile--purple">
          <Sparkles size={28} aria-hidden />
          <span className="hv-bento__cap hv-bento__cap--lead">Next reward</span>
          <span className="hv-bento__reward">A bonus entry into the JOY monthly prize draw</span>
          <span className="hv-bento__cap">Rewards earned: {r.rewards}</span>
        </div>
      </div>
    </section>
  )
}

/* ---------- E · Fill the can ---------- */
export function HeroCan({ name, entries }: HeroProps) {
  const r = useReward(entries)
  return (
    <section className="hv hv-can" aria-labelledby="hero-title">
      <Deco variant="can" />
      <div className="hv__inner hv-can__inner">
        <div className="hv-can__text">
          <p className="hv__eyebrow">Your JOY rewards</p>
          <h1 id="hero-title" className="hv__title">Hi {name},<br /><span className="hv-can__accent">{r.unlocked ? 'your can is full!' : 'fill your can.'}</span></h1>
          <p className="hv__msg">Every entry fills it a little more. <Message {...r} /></p>
          <Cta />
        </div>
        <Bar className="hv-can__wrap" filled={r.filled}>
          <div className="hv-can__can">
            <span className="hv-can__lid" />
            <div className="hv-can__body">
              <div className="hv-can__liquid" style={{ height: `${r.pct}%` }}>
                <svg className="hv-can__wave" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden><path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V20 H0Z" /></svg>
                {r.filled > 0 && <><span className="hv-can__bubble" /><span className="hv-can__bubble" /><span className="hv-can__bubble" /></>}
              </div>
              <img className="hv-can__logo" src="./images/global/joy-logo-white.png" alt="" />
            </div>
          </div>
          <ol className="hv-can__ticks" aria-hidden>
            {steps.map((n) => (
              <li key={n} className={n < r.filled ? 'is-done' : ''} style={{ bottom: `${((n + 1) / REWARD_EVERY) * 100}%` }}>
                {n === REWARD_EVERY - 1 ? <><Gift size={18} /> Reward</> : `Entry ${n + 1}`}
              </li>
            ))}
          </ol>
        </Bar>
      </div>
    </section>
  )
}
