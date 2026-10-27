import { Link, useParams } from 'react-router-dom'
import { getPromo, promos } from '../data/promos'
import { getBrand } from '../data/brands'
import { isActive, isEnded } from '../data/config'
import { useStore } from '../state/store'
import { Breadcrumb, type Crumb } from '../components/layout/Breadcrumb'
import { DateLine, PromoTeaser, promoStyle } from '../components/promo/PromoTeaser'
import { CtaBanner, Prizes, PromoTerms, SectionNav, Steps } from '../components/promo/PromoSections'
import { Accordion } from '../components/ui/Accordion'
import { Share } from '../components/ui/Share'
import NotFound from './NotFound'
import './pages.css'

export function promoCrumbs(slug: string, extra: Crumb[] = []): Crumb[] {
  const p = getPromo(slug)!
  const brand = getBrand(p.brand)
  return [
    { label: 'Brands', to: '/brands' },
    { label: p.brandLabel, to: brand ? `/brands/${brand.slug}` : undefined },
    { label: 'Promotions', to: '/promotions' },
    { label: p.slug.replace(/-/g, ' '), to: extra.length ? `/promotions/${p.slug}` : undefined },
    ...extra,
  ]
}

export default function PromoDetail() {
  const { slug } = useParams()
  const promo = getPromo(slug)
  const { user, myEntries, canEnter } = useStore()
  if (!promo) return <NotFound />

  const ended = isEnded(promo)
  const myEntry = [...myEntries].reverse().find((e) => e.promo === promo.slug)
  const blocked = !!user && !ended && !canEnter(promo.slug)
  const participateTo = `/promotions/${promo.slug}/participate`
  const loginState = { from: participateTo, reason: 'participate' }
  const ctaClass = promo.theme.ctaBg === '#FFE600' ? 'btn--yellow' : 'btn--promo'

  const links = [
    { id: 'prizes', label: 'Prizes' },
    promo.steps.length ? { id: 'steps', label: 'Steps' } : null,
    promo.faqs.length ? { id: 'faqs', label: 'FAQs' } : null,
    { id: 'terms', label: 'Terms and conditions' },
  ].filter(Boolean) as { id: string; label: string }[]

  const others = promos.filter((p) => isActive(p) && p.slug !== promo.slug)

  return (
    <div style={promoStyle(promo)}>
      <Breadcrumb items={promoCrumbs(promo.slug)} />

      <section className="promo-hero" aria-labelledby="promo-title">
        <div className="promo-hero__image">
          <picture>
            <source media="(max-width: 767px)" srcSet={promo.images.headerMobile} />
            <img src={promo.images.header} alt={`${promo.teaserTitle} promotion artwork`} />
          </picture>
        </div>
        <div className="promo-hero__band">
          {promo.theme.deco && <><img className="promo-hero__deco promo-hero__deco--l" src={promo.theme.deco} alt="" /><img className="promo-hero__deco promo-hero__deco--r" src={promo.theme.deco} alt="" /></>}
          <div className="promo-hero__band-inner">
            <DateLine promo={promo} />
            {ended ? (
              <>
                <span className="badge badge--expired" style={{ marginBottom: 16 }}>Ended</span>
                <h1 id="promo-title" className="promo-hero__title">The Promotion Has Ended</h1>
                <p className="promo-hero__subtitle">Thank you for participation! {promo.teaserTitle} is closed and no longer accepts codes.</p>
                <Link to="/promotions" className="btn btn--white btn--wide">See active promotions</Link>
              </>
            ) : (
              <>
                <h1 id="promo-title" className="promo-hero__title">{promo.title}</h1>
                <p className="promo-hero__subtitle">{promo.subtitle}</p>
                {blocked ? (
                  <div className="promo-hero__status">
                    <span className="btn btn--white btn--wide" aria-disabled="true">Already entered</span>
                    <p className="promo-hero__note">
                      {promo.limit === 'week' ? 'You’ve used your entry for this week. You can enter again from Monday with a new code.'
                        : promo.limit === 'day' ? 'You’ve entered today. Come back tomorrow with a new code.'
                        : 'You’re in! There is one entry per person for this promotion.'}
                      {myEntry && <> <Link to={`/promotions/${promo.slug}/result/${myEntry.id}`}>See your entry</Link></>}
                    </p>
                  </div>
                ) : user ? (
                  <Link to={participateTo} className={`btn btn--wide ${ctaClass}`}>Participate here</Link>
                ) : (
                  <>
                    <Link to="/login" state={loginState} className={`btn btn--wide ${ctaClass}`}>Participate here</Link>
                    <p className="promo-hero__note" style={{ marginTop: -24, marginBottom: 32 }}>
                      You need a free JOY account to take part. <Link to="/register" state={loginState}>Register</Link> or <Link to="/login" state={loginState}>log in</Link>.
                    </p>
                  </>
                )}
                <Share title={promo.teaserTitle} />
              </>
            )}
          </div>
        </div>
      </section>

      <SectionNav
        links={links}
        cta={ended ? undefined : blocked ? { label: 'Already entered', to: '#', disabled: true } : { label: 'Participate here', to: user ? participateTo : '/login' }}
      />

      {/* Order: prizes, steps, the legal text with the contact and T&C links right under it, participate, FAQs */}
      <Prizes promo={promo} />
      <Steps promo={promo} />

      <PromoTerms promo={promo} />

      {!ended && <CtaBanner promo={promo} to={user ? participateTo : '/login'} label="Participate here" />}

      {promo.faqs.length > 0 && (
        <section id="faqs" className="promo-faq" aria-labelledby="faq-title">
          <div className="promo-faq__side">
            <h2 id="faq-title" className="promo-faq__title">Frequently asked questions</h2>
            <p className="promo-faq__text">Can’t find your answer here? All FAQs cover your account, codes and prizes.</p>
            <Link to="/faq" className="btn btn--outline">Go to all FAQs</Link>
          </div>
          <Accordion items={promo.faqs} />
        </section>
      )}

      {ended && others.length > 0 && (
        <section aria-labelledby="others-title" style={{ padding: '40px 0 48px' }}>
          <h2 id="others-title" className="section-title">Check out other promotions:</h2>
          {others.map((p, i) => <PromoTeaser key={p.slug} promo={p} side={i % 2 ? 'left' : 'right'} />)}
        </section>
      )}
    </div>
  )
}
