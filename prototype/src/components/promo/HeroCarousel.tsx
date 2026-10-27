import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Promo } from '../../data/promos'
import { promoStyle, DateLine } from './PromoTeaser'
import './promo.css'

export type HeroSlide =
  | { kind: 'promo'; promo: Promo }
  | { kind: 'joy'; title: string; text: string; cta: { label: string; to: string } }

/**
 * Live-site home/promotions hero: full-width brand color, content left, big round image right, curved bottom.
 * All slides are stacked; the chosen one fades in on top of the last one (promo.css), the others are hidden.
 */
export function HeroCarousel({ slides, start = 0 }: { slides: HeroSlide[]; start?: number }) {
  const [i, setI] = useState(Math.min(start, slides.length - 1))
  // A single slide is a plain hero, so it isn't announced as a carousel.
  const multi = slides.length > 1
  return (
    <section className="hero-carousel" aria-roledescription={multi ? 'carousel' : undefined} aria-label={multi ? 'Featured promotions' : undefined}>
      <div className="hero-carousel__slides">
        {slides.map((s, n) => (
          <HeroSlideView key={n} s={s} active={n === i} {...(multi ? { 'aria-roledescription': 'slide', 'aria-label': `${n + 1} of ${slides.length}` } : {})} />
        ))}
      </div>
      {multi && (
        <div className="dots">
          {slides.map((sl, n) => (
            <button
              key={n} type="button" aria-current={n === i}
              aria-label={`Show slide ${n + 1}: ${sl.kind === 'promo' ? sl.promo.teaserTitle : sl.title}`} onClick={() => setI(n)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function HeroSlideView({ s, active, ...slideProps }: { s: HeroSlide; active: boolean; 'aria-roledescription'?: string; 'aria-label'?: string }) {
  const cls = `hero-slide ${active ? 'is-active' : ''}`
  if (s.kind === 'promo') return (
    <div className={cls} style={promoStyle(s.promo)} {...slideProps}>
      {s.promo.theme.deco && <img className="hero-slide__deco" src={s.promo.theme.deco} alt="" />}
      <div className="hero-slide__content">
        <img className="hero-slide__logo" src={s.promo.images.logo} alt={`${s.promo.brandLabel} logo`} />
        <DateLine promo={s.promo} />
        <h2 className="hero-slide__title">{s.promo.teaserTitle}</h2>
        <Link to={`/promotions/${s.promo.slug}`} className="btn btn--promo btn--wide">See more<span className="visually-hidden">: {s.promo.teaserTitle}</span></Link>
        <p className="hero-slide__text">{s.promo.teaserText}</p>
      </div>
      <div className="hero-slide__image">
        <picture>
          <source media="(max-width: 767px)" srcSet={s.promo.images.teaserMobile} />
          <img src={s.promo.images.teaser ?? s.promo.images.card} alt="" />
        </picture>
      </div>
    </div>
  )
  return (
    <div className={cls} style={{ '--promo-bg': '#0E38DF', '--promo-cta-bg': '#FFE600', '--promo-cta-text': '#0E38DF' } as CSSProperties} {...slideProps}>
      <img className="hero-slide__deco" src="./images/global/teaser-deco-default.webp" alt="" />
      <div className="hero-slide__content">
        <img className="hero-slide__logo hero-slide__logo--joy" src="./images/global/joy-logo-white.png" alt="JOY" />
        <h2 className="hero-slide__title">{s.title}</h2>
        <Link to={s.cta.to} className="btn btn--promo btn--wide">{s.cta.label}</Link>
        <p className="hero-slide__text">{s.text}</p>
      </div>
      <div className="hero-slide__image">
        <picture>
          <source media="(max-width: 767px)" srcSet="./images/home/hero-joy-mobile.webp" />
          <img src="./images/home/hero-joy-desktop.webp" alt="" />
        </picture>
      </div>
    </div>
  )
}
