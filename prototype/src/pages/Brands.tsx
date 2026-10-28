import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { brands, getBrand } from '../data/brands'
import { promos } from '../data/promos'
import { isActive } from '../data/config'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { PromoTeaser } from '../components/promo/PromoTeaser'
import { PromoCarousel } from '../components/promo/PromoCarousel'
import { FavouriteButton } from '../components/ui/FavouriteButton'
import NotFound from './NotFound'
import './pages.css'

const activeCount = (slug: string) => promos.filter((p) => p.brand === slug && isActive(p)).length

export function BrandsIndex() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Brands' }]} />
      <div className="page-head">
        <h1 className="h1">Our brands</h1>
        <p>Tap the heart on the brands you love. Their promotions show first in your suggestions and in the Recommended sort.</p>
      </div>
      <div className="brands-grid">
        {brands.map((b) => {
          const n = activeCount(b.slug)
          return (
            <div key={b.slug} className="brands-grid__card">
              <Link to={`/brands/${b.slug}`}>
                <img src={b.logo} alt="" />
                <h2 className="h3">{b.name}</h2>
                <span className="brands-grid__count">{n ? `${n} active promotion${n > 1 ? 's' : ''}` : 'No active promotions'}</span>
              </Link>
              <FavouriteButton brand={b} className="brands-grid__fav" />
            </div>
          )
        })}
      </div>
    </>
  )
}

/**
 * Live-site brand page (hero, welcome band, news, "want to know more") with the wireframe "Brand"
 * structure: active promotions first. Prototype change: instead of this brand's ended promotions, the page ends with
 * a carousel of the other brands' active promotions.
 */
export function BrandPage() {
  const { slug } = useParams()
  const brand = getBrand(slug)
  if (!brand) return <NotFound />
  const mine = promos.filter((p) => p.brand === brand.slug)
  const active = mine.filter(isActive)
  const others = promos.filter((p) => p.brand !== brand.slug && isActive(p))
  const tall = brand.hero.includes('rockstar') || brand.hero.includes('lipton')

  return (
    <>
      <Breadcrumb items={[{ label: 'Brands', to: '/brands' }, { label: brand.name }]} />
      <div className={`brand-hero ${tall ? 'brand-hero--tall' : ''}`} style={{ background: brand.band }}>
        <picture>
          <source media="(max-width: 767px)" srcSet={brand.heroMobile} />
          <img src={brand.hero} alt={`${brand.name} hero image`} />
        </picture>
      </div>
      <section className="brand-band" style={{ background: brand.band, color: brand.bandText }}>
        {brand.deco && <><img className="brand-band__deco brand-band__deco--l" src={brand.deco} alt="" /><img className="brand-band__deco brand-band__deco--r" src={brand.deco} alt="" /></>}
        <h1>{brand.welcome}</h1>
        {/* With a brand theme on, a JOY-blue button here follows the theme; a brand's own colours (Walkers yellow) stay */}
        <a href={brand.website} target="_blank" rel="noreferrer" className={`btn btn--wide btn--promo ${brand.bandCta.text === '#0E38DF' ? '' : 'btn--own'}`} style={{ '--promo-cta-bg': brand.bandCta.bg, '--promo-cta-text': brand.bandCta.text } as CSSProperties}>
          Visit brand website<span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <FavouriteButton brand={brand} labelled className="brand-band__fav" />
        {brand.tagline && <p className="brand-band__tagline">{brand.tagline}</p>}
      </section>

      <section aria-labelledby="brand-active-title" style={{ paddingTop: 56 }}>
        <h2 id="brand-active-title" className="section-title">Active promotions</h2>
        {active.length ? active.map((p, i) => <PromoTeaser key={p.slug} promo={p} side={i % 2 ? 'left' : 'right'} />) : (
          <div className="empty-state">
            <h3 className="h3">Coming soon ...</h3>
            <p>At this time, there is no {brand.name} promotion to be found here, sorry. But no worries, the next competition is just around the corner.</p>
            <p style={{ marginTop: 16 }}><Link to="/promotions" className="btn btn--primary">See all active promotions</Link></p>
          </div>
        )}
      </section>

      {brand.news.length > 0 && (
        <section className="news" aria-labelledby="news-title">
          <h2 id="news-title" className="section-title">Latest Brand news</h2>
          {brand.news.map((n) => (
            <article className="news__item" key={n.title}>
              <div className="news__media">
                {n.video ? <video src={n.video} controls preload="metadata" aria-label={n.title} /> : <img src={n.image} alt="" />}
              </div>
              <div><h3>{n.title}</h3><p>{n.text}</p></div>
            </article>
          ))}
        </section>
      )}

      <section className="more-brand">
        <h2 className="h1">Want to know more about {brand.name}?</h2>
        <a href={brand.website} target="_blank" rel="noreferrer" className="btn btn--primary btn--wide">Visit brand website<span className="visually-hidden"> (opens in a new tab)</span></a>
      </section>

      {/* Other brands' promotions keep the JOY look, even when the page has a brand theme */}
      {others.length > 0 && <div data-brand="joy"><PromoCarousel id="brand-others-title" title="Promos from other brands" promos={others} /></div>}
    </>
  )
}
