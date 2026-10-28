import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, User as UserIcon, X } from 'lucide-react'
import { brands } from '../../data/brands'
import { useStore } from '../../state/store'
import { useDesign } from '../../state/design'
import { useChromeTheme } from '../../state/chrome'
import { FavouriteButton } from '../ui/FavouriteButton'
import './layout.css'

export function Navbar() {
  const { user, logout } = useStore()
  const [brandsOpen, setBrandsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef<HTMLElement>(null)
  const { chrome } = useDesign()
  const theme = useChromeTheme()
  const cobrand = chrome !== 'joy' && theme?.logo ? theme : null

  // Close every menu when the page changes
  useEffect(() => { setBrandsOpen(false); setMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    const onDown = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setBrandsOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setBrandsOpen(false); setMobileOpen(false) } }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [])

  const onBrands = location.pathname.startsWith('/brands')
  const onProfile = location.pathname.startsWith('/profile')
  const doLogout = () => { logout(); navigate('/') }

  return (
    <header className="site-header" ref={navRef}>
      <nav className="navbar" aria-label="Main">
        <Link to="/" className="navbar__logo" aria-label="JOY by PepsiCo, home">
          <img src="./images/global/joy-logo-white.png" alt="" width={51} height={42} />
        </Link>
        {/* Visual exploration: co-brand chip on promotion and brand pages */}
        {cobrand && (
          <Link to={`/brands/${cobrand.brandSlug}`} className="navbar__cobrand" aria-label={`${cobrand.name} on JOY`}>
            <span className="navbar__cobrand-x" aria-hidden>×</span>
            <span className="navbar__cobrand-chip"><img src={cobrand.logo} alt="" /></span>
          </Link>
        )}

        <ul className="navbar__links">
          <li><NavLink to="/" end className="navbar__link">Home</NavLink></li>
          <li><NavLink to="/promotions" className="navbar__link">Promotions</NavLink></li>
          <li>
            <button
              type="button" className={`navbar__link ${onBrands || brandsOpen ? 'active' : ''}`}
              aria-expanded={brandsOpen} aria-controls="brands-menu" onClick={() => setBrandsOpen(!brandsOpen)}
            >
              Brands <ChevronDown size={16} className={brandsOpen ? 'rot' : ''} aria-hidden />
            </button>
          </li>
        </ul>

        <div className="navbar__session">
          {user ? (
            // Change 55: a plain link to the profile page (no dropdown); Log out lives on the profile page
            <Link to="/profile" className={`user-menu__toggle ${onProfile ? 'active' : ''}`}>
              <UserIcon size={24} fill="currentColor" aria-hidden /> <span>Hi {user.firstName}</span>
            </Link>
          ) : (
            <>
              <Link to="/login" state={{ from: location.pathname }} className="btn btn--outline-white">Login</Link>
              <Link to="/register" state={{ from: location.pathname }} className="btn btn--white">Register</Link>
            </>
          )}
        </div>

        <button type="button" className="navbar__burger" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
          <span key={mobileOpen ? 'close' : 'open'} className="navbar__burger-icon">{mobileOpen ? <X size={28} /> : <Menu size={28} />}</span>
        </button>
      </nav>

      <div id="brands-menu" className={`brands-menu ${brandsOpen ? 'is-open' : ''}`}>
        {/* Change 46: each logo has a heart in its corner (a sibling of the link, so it doesn't open the page) */}
        {brands.map((b) => (
          <div key={b.slug} className="brands-menu__item brands-menu__brand">
            <Link to={`/brands/${b.slug}`} className="brands-menu__link"><img src={b.logo} alt={b.name} /></Link>
            <FavouriteButton brand={b} className="brands-menu__fav" />
          </div>
        ))}
        <Link to="/brands" className="brands-menu__item brands-menu__all">All brands</Link>
        <span className="brands-menu__item brands-menu__placeholder" aria-hidden><img src="./images/global/menu-logo-placeholder.svg" alt="" /></span>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        <NavLink to="/" end className="mobile-menu__link">Home</NavLink>
        <NavLink to="/promotions" className="mobile-menu__link">Promotions</NavLink>
        <NavLink to="/brands" className="mobile-menu__link">Brands</NavLink>
        <div className="mobile-menu__brands">
          {brands.map((b) => (
            <div key={b.slug} className="mobile-menu__brand">
              <Link to={`/brands/${b.slug}`}><img src={b.logo} alt={b.name} /></Link>
              <FavouriteButton brand={b} className="mobile-menu__fav" />
            </div>
          ))}
        </div>
        {user ? (
          <>
            <NavLink to="/profile" className="mobile-menu__link">My profile</NavLink>
            <button type="button" className="btn btn--outline-white btn--block" onClick={doLogout}>Log out</button>
          </>
        ) : (
          <div className="mobile-menu__cta">
            <Link to="/login" className="btn btn--outline-white btn--block">Login</Link>
            <Link to="/register" className="btn btn--white btn--block">Register</Link>
          </div>
        )}
      </div>
    </header>
  )
}
