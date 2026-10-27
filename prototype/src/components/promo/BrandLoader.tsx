import { useId, type CSSProperties, type ReactElement, type ReactNode } from 'react'
import './brand-loader.css'

// Brand-specific "calculating your results" animations. Each plays once in about 2.4 s,
// just under the 2.6 s the participate page waits before showing the result.
// Brand colors come from the brand sheets / live site (see data/promos.ts and data/brands.ts);
// food colors (cola, crisps) are illustrative only.

const COLA = '#3A1A0B'
const FOAM = '#F5E6CC'
const CRISP = '#F2B33D'

/** One flying piece: moves sideways linearly while rising then falling, so it travels in an arc. */
function Fly({ dx, up, down, delay, dur = 0.8, spin = 0, children }: {
  dx: number; up: number; down: number; delay: number; dur?: number; spin?: number; children: ReactNode
}) {
  const style = { '--dx': `${dx}px`, '--up': `${up}px`, '--down': `${down}px`, '--d': `${delay}s`, '--t': `${dur}s`, '--spin': `${spin}deg` } as CSSProperties
  return (
    <g className="bl-fly-x" style={style}>
      <g className="bl-fly-y"><g className="bl-fly-spin">{children}</g></g>
    </g>
  )
}

/** Pepsi: a soda fountain fills a glass, bubbles rise, foam settles on top. */
function Pepsi() {
  const clip = useId()
  const glass = 'M48 46 L112 46 L104 146 L56 146 Z'
  return (
    <svg viewBox="0 0 160 160" className="brand-loader__art">
      <defs><clipPath id={clip}><path d={glass} /></clipPath></defs>
      <rect x="66" y="0" width="28" height="12" rx="4" fill="#333333" />
      <line className="bl-pepsi__stream" x1="80" y1="12" x2="80" y2="146" pathLength={100} stroke={COLA} strokeWidth="6" />
      <path d={glass} fill="rgba(20, 67, 255, .06)" />
      <g clipPath={`url(#${clip})`}>
        <g className="bl-pepsi__fill">
          <rect x="40" y="54" width="80" height="100" fill={COLA} />
          <rect x="40" y="46" width="80" height="10" rx="5" fill={FOAM} />
        </g>
        {[[64, 0.7], [92, 0.95], [74, 1.2], [98, 1.45], [68, 1.7]].map(([x, d]) => (
          <circle key={x} className="bl-pepsi__bubble" cx={x} cy="142" r="2.5" fill="#FFFFFF" style={{ animationDelay: `${d}s` }} />
        ))}
      </g>
      <line x1="57" y1="58" x2="62" y2="132" stroke="#FFFFFF" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
      <path d={glass} fill="none" stroke="var(--site-blue)" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  )
}

/** Doritos: the bag tips over and triangle chips tumble out into a pile. */
function Doritos() {
  const chips = [
    { dx: 4, down: 70, delay: 0.8, spin: 200 },
    { dx: 30, down: 72, delay: 0.92, spin: -160 },
    { dx: 18, down: 71, delay: 1.04, spin: 120 },
    { dx: 40, down: 70, delay: 1.16, spin: 250 },
    { dx: 12, down: 62, delay: 1.3, spin: -220 },
    { dx: 28, down: 61, delay: 1.45, spin: 170 },
    { dx: 20, down: 53, delay: 1.75, spin: -140 },
  ]
  return (
    <svg viewBox="0 0 160 160" className="brand-loader__art">
      <ellipse cx="106" cy="148" rx="36" ry="4" fill="rgba(0, 0, 0, .08)" />
      <g className="bl-doritos__bag">
        <path d="M38 26 L42 21 L46 26 L50 21 L54 26 L58 21 L62 26 L66 21 L70 26 L74 21 L78 26 L82 21 L82 80 L38 80 Z" fill="#E31722" />
        <rect x="38" y="72" width="44" height="8" fill="#030303" />
        <polygon points="60,40 74,64 46,64" fill="#FA7115" stroke="#FA7115" strokeWidth="4" strokeLinejoin="round" />
      </g>
      <g transform="translate(86 72)">
        {chips.map((c, i) => (
          <Fly key={i} dx={c.dx} up={-6} down={c.down} delay={c.delay} dur={0.55} spin={c.spin}>
            <polygon points="0,-8 8,6 -8,6" fill="#FA7115" stroke="#FA7115" strokeWidth="3" strokeLinejoin="round" />
          </Fly>
        ))}
      </g>
    </svg>
  )
}

/** Walkers: the crisp packet puffs up, pops open and crisps fly out. */
function Walkers() {
  const crisps = [
    { dx: -40, up: -58, delay: 1.0, spin: 300 },
    { dx: 44, up: -66, delay: 1.05, spin: -280 },
    { dx: -56, up: -48, delay: 1.15, spin: -240 },
    { dx: 58, up: -52, delay: 1.2, spin: 260 },
    { dx: -36, up: -72, delay: 1.3, spin: 200 },
    { dx: 38, up: -46, delay: 1.38, spin: -320 },
    { dx: -62, up: -40, delay: 1.48, spin: 220 },
    { dx: 50, up: -70, delay: 1.55, spin: -200 },
  ]
  return (
    <svg viewBox="0 0 160 160" className="brand-loader__art">
      <ellipse cx="80" cy="146" rx="62" ry="4" fill="rgba(0, 0, 0, .08)" />
      <g className="bl-walkers__pack">
        <path d="M54 74 L106 74 L106 138 L102 143 L98 138 L94 143 L90 138 L86 143 L82 138 L78 143 L74 138 L70 143 L66 138 L62 143 L58 138 L54 143 Z" fill="#C4000A" />
        <circle cx="80" cy="106" r="15" fill="#FFE600" />
        <ellipse cx="80" cy="106" rx="8" ry="5.5" fill={CRISP} />
        <path className="bl-walkers__top" d="M54 64 L58 60 L62 64 L66 60 L70 64 L74 60 L78 64 L82 60 L86 64 L90 60 L94 64 L98 60 L102 64 L106 60 L106 75 L54 75 Z" fill="#C4000A" />
      </g>
      <g transform="translate(80 72)">
        {crisps.map((c, i) => (
          <Fly key={i} dx={c.dx} up={c.up} down={70} delay={c.delay} dur={0.85} spin={c.spin}>
            <ellipse rx="7" ry="5" fill={CRISP} />
          </Fly>
        ))}
      </g>
    </svg>
  )
}

/** JOY (and any brand without its own animation): a prize box shakes, the lid pops and confetti bursts out. */
function Joy() {
  const colors = ['#9E00BF', '#75DEF2', '#EBFF40', '#FF8000', '#1443FF']
  const confetti = [
    { dx: -44, up: -62, delay: 1.15, spin: 260 },
    { dx: 46, up: -70, delay: 1.18, spin: -300 },
    { dx: -62, up: -48, delay: 1.22, spin: -220 },
    { dx: 64, up: -52, delay: 1.25, spin: 240 },
    { dx: -36, up: -78, delay: 1.3, spin: 320 },
    { dx: 38, up: -58, delay: 1.33, spin: -260 },
    { dx: -54, up: -66, delay: 1.38, spin: 200 },
    { dx: 56, up: -76, delay: 1.42, spin: -200 },
    { dx: -70, up: -38, delay: 1.46, spin: 280 },
    { dx: 70, up: -42, delay: 1.5, spin: -240 },
  ]
  return (
    <svg viewBox="0 0 160 160" className="brand-loader__art">
      <ellipse cx="80" cy="146" rx="62" ry="4" fill="rgba(0, 0, 0, .08)" />
      <g className="bl-joy__box">
        <rect x="50" y="92" width="60" height="52" rx="4" fill="#1443FF" />
        <rect x="75" y="92" width="10" height="52" fill="#EBFF40" />
        <g className="bl-joy__lid">
          <rect x="45" y="78" width="70" height="16" rx="4" fill="#0E38DF" />
          <rect x="75" y="78" width="10" height="16" fill="#EBFF40" />
          <ellipse cx="71" cy="71" rx="9" ry="6" fill="none" stroke="#EBFF40" strokeWidth="4" />
          <ellipse cx="89" cy="71" rx="9" ry="6" fill="none" stroke="#EBFF40" strokeWidth="4" />
        </g>
      </g>
      <g transform="translate(80 90)">
        {confetti.map((c, i) => (
          <Fly key={i} dx={c.dx} up={c.up} down={52} delay={c.delay} dur={0.9} spin={c.spin}>
            {i % 2 ? <circle r="4" fill={colors[i % colors.length]} /> : <rect x="-3" y="-5" width="6" height="10" rx="1" fill={colors[i % colors.length]} />}
          </Fly>
        ))}
      </g>
    </svg>
  )
}

const LOADERS: Record<string, () => ReactElement> = { pepsi: Pepsi, doritos: Doritos, walkers: Walkers }

export function BrandLoader({ brand }: { brand: string }) {
  const Art = LOADERS[brand] ?? Joy
  return <div className="brand-loader" aria-hidden><Art /></div>
}
