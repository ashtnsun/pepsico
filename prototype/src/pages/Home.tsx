import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { promos } from '../data/promos'
import { isActive } from '../data/config'
import { useStore } from '../state/store'
import { HeroCarousel, type HeroSlide } from '../components/promo/HeroCarousel'
import { PromoTeaser } from '../components/promo/PromoTeaser'
import { PromoCard } from '../components/promo/PromoCard'
import { ProgressTracker } from '../components/promo/ProgressTracker'
import { getPromo } from '../data/promos'
import './pages.css'

const active = promos.filter(isActive)

/** Wireframe "How To Play" (Snack, Play, Win), drawn like the live-site promotion steps. */
function HowItWorks() {
  const steps = [
    { title: 'Snack', text: 'Buy a promotional pack of your favourite PepsiCo brand.', image: './images/promos/las-vegas-wrap/step-1.webp' },
    { title: 'Play', text: 'Log in to JOY and enter the code from the pack.', image: './images/promos/avengers-doomsday/step-2.webp' },
    { title: 'Win', text: 'Find out straight away if you’ve won, or join the prize draw.', image: './images/promos/avengers-doomsday/step-3.webp' },
  ]
  return (
    <section className="how" aria-labelledby="how-title">
      <h2 id="how-title" className="section-title">How it works</h2>
      <ol className="steps__list" style={{ '--promo-bg': '#0E38DF' } as CSSProperties}>
        {steps.map((s, i) => (
          <li className="steps__item" key={s.title}>
            <div className="steps__circle">
              <span className="steps__index" aria-hidden>{i + 1}</span>
              <p className="steps__text"><span className="how__word">{s.title}</span>{s.text}</p>
              <img className="steps__image" src={s.image} alt="" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Live-site home content blocks below the promotions. */
function HomeContent() {
  return (
    <>
      <section className="content-card container" aria-labelledby="duaf-title">
        <h2 id="duaf-title" className="section-title">Walkers Do Us A Flavour.</h2>
        <div className="content-card__row">
          <img className="content-card__media" src="./images/home/walkers-duaf.jpg" alt="Two Walkers Do Us A Flavour packs: Grilled Cheese & Chilli Jam and Salt & Pepper Chicken" />
          <div>
            <h3 className="h1 content-card__title">Its Crunch time. Pick your winner.</h3>
            <p className="content-card__text">Only One Can Stay.</p>
            <Link to="/brands/walkers" className="btn btn--primary">Discover Walkers</Link>
          </div>
        </div>
      </section>
      <section className="packshots" aria-labelledby="packshots-title">
        <h2 id="packshots-title" className="packshots__title">Creating Joy with every sip and every bite</h2>
        <p className="packshots__sub">All the classics you love &amp; new flavours waiting to be discovered</p>
        <picture>
          <source media="(max-width: 767px)" srcSet="./images/home/packshots-mobile.webp" />
          <img src="./images/home/packshots-desktop.webp" alt="Walkers, Doritos, Popworks and Quaker packs" />
        </picture>
      </section>
      <section className="cyan-band">
        <img className="cyan-band__deco cyan-band__deco--l" src="./images/global/band-left.svg" alt="" />
        <img className="cyan-band__deco cyan-band__deco--r" src="./images/global/band-right.svg" alt="" />
        <p>Joy is where you can enjoy all your favourite snacks and beverages in one place</p>
      </section>
    </>
  )
}

export default function Home() {
  const { user, myEntries } = useStore()

  if (!user) {
    const slides: HeroSlide[] = [
      { kind: 'joy', title: 'Register to participate', text: 'Create a free JOY account to enter promotions from all your favourite PepsiCo brands.', cta: { label: 'Register now', to: '/register' } },
      ...active.map((p) => ({ kind: 'promo' as const, promo: p })),
    ]
    return (
      <>
        <h1 className="visually-hidden">JOY by PepsiCo</h1>
        <HeroCarousel slides={slides} />
        <HowItWorks />
        <section aria-labelledby="current-title" className="home-promos">
          <h2 id="current-title" className="section-title">Current promotions</h2>
          {active.map((p, i) => <PromoTeaser key={p.slug} promo={p} side={i % 2 ? 'left' : 'right'} />)}
          <div className="center"><Link to="/promotions" className="btn btn--primary btn--wide">See all promotions</Link></div>
        </section>
        <HomeContent />
      </>
    )
  }

  // Logged in (wireframe "Home (Logged-in)")
  const enteredSlugs = new Set(myEntries.map((e) => e.promo))
  const suggested = active.filter((p) => !enteredSlugs.has(p.slug))
  const latestEntries = [...myEntries].reverse()
  return (
    <>
      <ProgressTracker name={user.firstName} entries={myEntries.length} />
      <section className="container home-section" aria-labelledby="suggested-title">
        <div className="home-section__head">
          <h2 id="suggested-title" className="h1">Suggested for you</h2>
          <Link to="/promotions" className="link link--caps">See all promotions</Link>
        </div>
        {suggested.length ? (
          <div className="card-grid">{suggested.map((p) => <PromoCard key={p.slug} promo={p} />)}</div>
        ) : (
          <p className="empty-state">You’ve entered every active promotion. New ones are added often, so check back soon!</p>
        )}
      </section>
      <section className="container home-section" aria-labelledby="entered-title">
        <div className="home-section__head">
          <h2 id="entered-title" className="h1">Your entries</h2>
          {latestEntries.length > 0 && <Link to="/profile#entries" className="link link--caps">Entry history</Link>}
        </div>
        {latestEntries.length ? (
          <div className="card-grid">
            {latestEntries.slice(0, 4).map((e) => { const p = getPromo(e.promo); return p ? <PromoCard key={e.id} promo={p} entry={e} /> : null })}
          </div>
        ) : (
          <div className="empty-state">
            <h3 className="h3">No entries yet</h3>
            <p>Enter a code from a promotional pack and your entries will show up here.</p>
          </div>
        )}
      </section>
      <HeroCarousel slides={active.map((p) => ({ kind: 'promo' as const, promo: p }))} />
      <HomeContent />
    </>
  )
}
