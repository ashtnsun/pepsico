import { Link, useParams } from 'react-router-dom'
import { brands, getBrand } from '../data/brands'
import { promos } from '../data/promos'
import { isActive, isEnded } from '../data/config'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { PromoTeaser } from '../components/promo/PromoTeaser'
import NotFound from './NotFound'
import './pages.css'

const activeCount = (slug: string) => promos.filter((p) => p.brand === slug && isActive(p)).length

export function BrandsIndex() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Brands' }]} />
      <div className="page-head"><h1 className="h1">Our brands</h1><p>Pick a brand to see its promotions and news.</p></div>
      <div className="brands-grid">
        {brands.map((b) => {
          const n = activeCount(b.slug)
          return (
            <Link key={b.slug} to={`/brands/${b.slug}`}>
              <img src={b.logo} alt="" />
              <span>{b.name}</span>
              <span className="brands-grid__count">{n ? `${n} active promotion${n > 1 ? 's' : ''}` : 'No active promotions'}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}

/**
 * Live-site brand page (hero, welcome band, news, "want to know more") with the wireframe "Brand"
 * structure: active promotions first, ended ones in their own section.
 */
export function BrandPage() {
  const { slug } = useParams()
  const brand = getBrand(slug)
  if (!brand) return <NotFound />
  const mine = promos.filter((p) => p.brand === brand.slug)
  const active = mine.filter(isActive)
  const ended = mine.filter(isEnded)
  const others = promos.filter((p) => p.brand !== brand.slug && isActive(p))
  const tall = brand.hero.includes('rockstar') || brand.hero.includes('lipton')

  return (
    <>
      <Breadcrumb items={[{ label: 'Brands', to: '/brands' }, { label: brand.name }]} />
      <div className={`brand-hero ${tall ? 'brand-hero--tall' : ''}`}>
        <picture>
          <source media="(max-width: 767px)" srcSet={brand.heroMobile} />
          <img src={brand.hero} alt={`${brand.name} hero image`} />
        </picture>
      </div>
      <section className="brand-band" style={{ background: brand.band, color: brand.bandText }}>
        {brand.deco && <><img className="brand-band__deco brand-band__deco--l" src={brand.deco} alt="" /><img className="brand-band__deco brand-band__deco--r" src={brand.deco} alt="" /></>}
        <h1>{brand.welcome}</h1>
        <a href={brand.website} target="_blank" rel="noreferrer" className="btn btn--wide" style={{ background: brand.bandCta.bg, borderColor: brand.bandCta.bg, color: brand.bandCta.text }}>
          Visit brand website<span className="visually-hidden"> (opens in a new tab)</span>
        </a>
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

      {ended.length > 0 && (
        <section aria-labelledby="brand-ended-title" style={{ paddingBottom: 48 }}>
          <h2 id="brand-ended-title" className="section-title">Ended promotions</h2>
          {ended.map((p) => <PromoTeaser key={p.slug} promo={p} />)}
        </section>
      )}

      {active.length === 0 && others.length > 0 && (
        <section aria-labelledby="brand-others-title" style={{ paddingBottom: 48 }}>
          <h2 id="brand-others-title" className="section-title">Check out other brand promotions:</h2>
          {others.map((p, i) => <PromoTeaser key={p.slug} promo={p} side={i % 2 ? 'left' : 'right'} />)}
        </section>
      )}
    </>
  )
}
