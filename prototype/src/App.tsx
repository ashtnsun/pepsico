import { useEffect } from 'react'
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

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => { if (!hash) window.scrollTo(0, 0) }, [pathname, hash])
  return null
}

function Layout({ newsletter = true }: { newsletter?: boolean }) {
  return (
    <>
      <a href="#main" className="visually-hidden">Skip to content</a>
      <Navbar />
      <main id="main" className="page-main"><Outlet /></main>
      {newsletter && <Newsletter />}
      <Footer />
    </>
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
