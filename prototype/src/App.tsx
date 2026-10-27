import { useEffect, useLayoutEffect, useState, type CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer, Newsletter } from './components/layout/Footer'
import { ModeratorPanel } from './moderator/ModeratorPanel'
import { ConfigPanel } from './moderator/ConfigPanel'
import Home from './pages/Home'
import Promotions from './pages/Promotions'
import PromoDetail from './pages/PromoDetail'
import Participate from './pages/Participate'
import Result from './pages/Result'
import { BrandPage, BrandsIndex } from './pages/Brands'
import { ChangeCountry, CheckEmail, Login, Onboarding, Register } from './pages/Auth'
import Profile from './pages/Profile'
import { ContactPage, FaqPage, PromoTerms, TermsPage } from './pages/TextPages'
import NotFound from './pages/NotFound'
import { useDesign } from './state/design'
import { useChromeTheme } from './state/chrome'

/**
 * Page changes crossfade (View Transitions API): the browser snapshots the old page, the routes switch to the new
 * address, and the snapshot blends into the new page. Nothing moves and the screen never goes blank; the navbar has
 * its own snapshot (site.css) so it stays put. Browsers without the API, or with "reduce motion" on, just switch.
 */
function useCrossfadeLocation() {
  const location = useLocation()
  const [shown, setShown] = useState(location)
  useEffect(() => {
    if (location.key === shown.key) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) { setShown(location); return }
    document.startViewTransition(() => flushSync(() => setShown(location)))
  }, [location, shown.key])
  // Jump to the top before the new page is painted (or snapshotted). Jump, don't glide: smooth scrolling would
  // otherwise scroll the new page up from where the old one was.
  useLayoutEffect(() => { if (!shown.hash) window.scrollTo({ top: 0, behavior: 'instant' }) }, [shown.pathname, shown.hash])
  return shown
}

function Layout({ newsletter = true }: { newsletter?: boolean }) {
  // Visual exploration: on promotion and brand pages, the navbar, breadcrumb, newsletter and footer can take the brand colour
  const { chrome } = useDesign()
  const theme = useChromeTheme()
  const themed = chrome !== 'joy' && theme
  return (
    <div
      className="chrome"
      data-chrome={themed ? chrome : undefined}
      data-chrome-light={themed && theme.text === '#000000' ? '' : undefined}
      style={themed ? { '--chrome-bg': theme.bg, '--chrome-text': theme.text, '--chrome-shade': theme.shade, '--chrome-shade-text': theme.shadeText, '--chrome-ink': theme.page?.ink } as CSSProperties : undefined}
    >
      <a href="#main" className="visually-hidden">Skip to content</a>
      <Navbar />
      {/* Change 25: the page content takes the brand theme too (buttons, links, menus, focus rings; styles in site.css) */}
      <main
        id="main"
        className="page-main"
        data-page-theme={themed && theme.page ? '' : undefined}
        data-page-canvas={themed && theme.page?.canvas ? '' : undefined}
        data-brand={themed ? theme.page?.mode : undefined}
        style={themed ? theme.page?.vars : undefined}
      >
        <Outlet />
      </main>
      {newsletter && <Newsletter />}
      <Footer />
    </div>
  )
}

export default function App() {
  const location = useCrossfadeLocation()
  return (
    <>
      {/* Routes render the address being shown, which trails the real one by the length of the crossfade's snapshot */}
      <Routes location={location}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="promotions" element={<Promotions />} />
          <Route path="promotions/:slug" element={<PromoDetail />} />
          <Route path="promotions/:slug/terms" element={<PromoTerms />} />
          <Route path="brands" element={<BrandsIndex />} />
          <Route path="brands/:slug" element={<BrandPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="terms" element={<TermsPage kind="terms" />} />
          <Route path="privacy" element={<TermsPage kind="privacy" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Task pages: no newsletter band, like the live login/register pages' focus on the form */}
        <Route element={<Layout newsletter={false} />}>
          <Route path="promotions/:slug/participate" element={<Participate />} />
          <Route path="promotions/:slug/result/:id" element={<Result />} />
          <Route path="login" element={<Login />} />
          <Route path="login/check-email" element={<CheckEmail />} />
          <Route path="register" element={<Register />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-country" element={<ChangeCountry />} />
        </Route>
      </Routes>
      <ModeratorPanel />
      <ConfigPanel />
    </>
  )
}
