import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import type { Promo } from '../../data/promos'
import { formatRange, isEnded } from '../../data/config'
import { useStore } from '../../state/store'
import { Share } from '../ui/Share'
import './promo.css'

// Change 50: --promo-text is white unless the theme says otherwise (7UP Green takes black); the yellow "ends soon"
// text on cards then follows the text colour, as yellow can't be read on a light brand colour.
export const promoStyle = (p: Promo) => ({
  '--promo-bg': p.theme.bg,
  '--promo-text': p.theme.text ?? '#FFFFFF',
  ...(p.theme.text && { '--promo-urgent': p.theme.text }),
  '--promo-cta-bg': p.theme.ctaBg,
  '--promo-cta-text': p.theme.ctaText,
}) as CSSProperties

export function DateLine({ promo, dark = promo.theme.text === '#000000' }: { promo: Promo; dark?: boolean }) {
  return (
    <p className="date-line">
      <img src={`./images/global/calendar-${dark ? 'black' : 'white'}.svg`} alt="" width={16} height={16} />
      <span><span className="visually-hidden">Runs </span>{formatRange(promo)}</span>
    </p>
  )
}

/**
 * Live-site promotion teaser ("brand-teaser"): 1130px card in the brand color, content on one side,
 * round image on the other, a corner tab with country flags and the ENDED label.
 * Prototype change: ended teasers are greyed out and say "Ended" in red, so they can't be mistaken for active ones.
 */
export function PromoTeaser({ promo, side = 'right', headingLevel = 3 }: { promo: Promo; side?: 'left' | 'right'; headingLevel?: 2 | 3 }) {
  const { myEntries } = useStore()
  const ended = isEnded(promo)
  const entered = myEntries.some((e) => e.promo === promo.slug)
  const H = `h${headingLevel}` as 'h2' | 'h3'
  return (
    <article className={`teaser teaser--${side} ${ended ? 'teaser--ended' : ''}`} style={promoStyle(promo)}>
      <div className="teaser__card">
        {promo.theme.teaserDeco && <img className="teaser__deco" src={promo.theme.teaserDeco} alt="" />}
        <div className="teaser__content">
          <img className="teaser__logo" src={promo.images.logo} alt={`${promo.brandLabel} logo`} />
          <DateLine promo={promo} />
          <H className="teaser__title">{promo.teaserTitle}</H>
          <p className="teaser__text">{promo.teaserText}</p>
          <div className="teaser__actions">
            <Link to={`/promotions/${promo.slug}`} className={`btn btn--wide ${ended ? 'btn--white' : 'btn--promo'}`}>
              {ended ? 'View promo' : 'Go to promo'}<span className="visually-hidden">: {promo.teaserTitle}</span>
            </Link>
            {!ended && <Share title={promo.teaserTitle} />}
          </div>
        </div>
        <div className="teaser__image"><img src={promo.images.card} alt="" /></div>
        <div className="teaser__badge">
          {ended && <span className="teaser__ended">Ended</span>}
          {!ended && entered && <span className="teaser__entered"><Check size={16} strokeWidth={3} aria-hidden /> Entered</span>}
          {promo.countries.map((c) => <img key={c} src={`./images/global/flag-${c}.png`} alt={c === 'gb' ? 'UK' : 'Ireland'} width={22} height={22} />)}
        </div>
      </div>
    </article>
  )
}
