import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, Menu, Ticket, User as UserIcon, X } from 'lucide-react'
import { brands } from '../../data/brands'
import { useStore } from '../../state/store'
import './layout.css'

export function Navbar() {
  const { user, logout } = useStore()
  const [brandsOpen, setBrandsOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef<HTMLElement>(null)

  // Close every menu when the page changes
  useEffect(() => { setBrandsOpen(false); setUserOpen(false); setMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    const onDown = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) { setBrandsOpen(false); setUserOpen(false) } }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setBrandsOpen(false); setUserOpen(false); setMobileOpen(false) } }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [])

  const onBrands = location.pathname.startsWith('/brands')
  const doLogout = () => { logout(); navigate('/') }

  return (
    <header className="site-header" ref={navRef}>
      <nav className="navbar" aria-label="Main">
        <Link to="/" className="navbar__logo" aria-label="JOY by PepsiCo, home">
          <img src="./images/global/joy-logo-white.png" alt="" width={51} height={42} />
        </Link>

        <ul className="navbar__links">
          <li><NavLink to="/promotions" className="navbar__link">Promotions</NavLink></li>
          <li>
            <button
              type="button" className={`navbar__link ${onBrands || brandsOpen ? 'active' : ''}`}
              aria-expanded={brandsOpen} aria-controls="brands-menu" onClick={() => { setBrandsOpen(!brandsOpen); setUserOpen(false) }}
            >
              Brands <ChevronDown size={16} className={brandsOpen ? 'rot' : ''} aria-hidden />
            </button>
          </li>
        </ul>

        <div className="navbar__session">
          {user ? (
            <div className="user-menu">
              <button type="button" className="user-menu__toggle" aria-expanded={userOpen} onClick={() => { setUserOpen(!userOpen); setBrandsOpen(false) }}>
                <UserIcon size={24} fill="currentColor" aria-hidden /> <span>Hi {user.firstName}</span> <ChevronDown size={16} aria-hidden />
              </button>
              {userOpen && (
                <ul className="user-menu__list">
                  <li><Link to="/profile"><UserIcon size={18} aria-hidden /> My profile</Link></li>
                  <li><Link to="/profile#entries"><Ticket size={18} aria-hidden /> My entries</Link></li>
                  <li><button type="button" onClick={doLogout}><LogOut size={18} aria-hidden /> Log out</button></li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" state={{ from: location.pathname }} className="btn btn--outline-white">Login</Link>
              <Link to="/register" state={{ from: location.pathname }} className="btn btn--white">Register</Link>
            </>
          )}
        </div>

        <button type="button" className="navbar__burger" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {brandsOpen && (
        <div id="brands-menu" className="brands-menu">
          {brands.map((b) => (
            <Link key={b.slug} to={`/brands/${b.slug}`} className="brands-menu__item">
              <img src={b.logo} alt={b.name} />
            </Link>
          ))}
          <Link to="/brands" className="brands-menu__item brands-menu__all">All brands</Link>
          <span className="brands-menu__item brands-menu__placeholder" aria-hidden><img src="./images/global/menu-logo-placeholder.svg" alt="" /></span>
        </div>
      )}

      {mobileOpen && (
        <div className="mobile-menu">
          <NavLink to="/promotions" className="mobile-menu__link">Promotions</NavLink>
          <NavLink to="/brands" className="mobile-menu__link">Brands</NavLink>
          <div className="mobile-menu__brands">
            {brands.map((b) => (
              <Link key={b.slug} to={`/brands/${b.slug}`}><img src={b.logo} alt={b.name} /></Link>
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
      )}
    </header>
  )
}
