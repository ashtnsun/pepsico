import { useEffect, type CSSProperties } from 'react'
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

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => { if (!hash) window.scrollTo(0, 0) }, [pathname, hash])
  return null
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
      style={themed ? { '--chrome-bg': theme.bg, '--chrome-text': theme.text, '--chrome-shade': theme.shade, '--chrome-shade-text': theme.shadeText } as CSSProperties : undefined}
    >
      <a href="#main" className="visually-hidden">Skip to content</a>
      <Navbar />
      <main id="main" className="page-main"><Outlet /></main>
      {newsletter && <Newsletter />}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
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
