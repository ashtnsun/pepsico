import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useStore } from '../state/store'
import { CARD_VARIANTS, CHROME_VARIANTS, HERO_VARIANTS, useDesign } from '../state/design'
import './moderator.css'

/**
 * Hidden design config menu for the visual exploration. Open with C, or add ?config to the URL.
 * Not part of the design being tested.
 */
export function ConfigPanel() {
  const design = useDesign()
  const s = useStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(() => window.location.search.includes('config'))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, select, [contenteditable]')) return
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return
      if (e.key.toLowerCase() === 'c') setOpen((o) => !o)
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!open) return null
  return (
    <aside className="mod mod--config" aria-label="Design config">
      <div className="mod__head">
        <strong>Design config</strong>
        <button type="button" aria-label="Close design config" onClick={() => setOpen(false)}><X size={18} /></button>
      </div>
      <p className="mod__small">C to show or hide. Saved in this browser only.</p>

      <h3>Home hero</h3>
      {!s.user && <p className="mod__small">Shows on the home page when logged in.</p>}
      <div className="mod__list" role="radiogroup" aria-label="Home hero">
        {HERO_VARIANTS.map((v) => (
          <label key={v.id} className={design.hero === v.id ? 'is-on' : ''}>
            <input type="radio" name="cfg-hero" checked={design.hero === v.id} onChange={() => design.set({ hero: v.id })} />
            <span><b>{v.name}</b><small>{v.note}</small></span>
          </label>
        ))}
      </div>
      <p className="mod__small">Preview progress (logs in the test user):</p>
      <div className="mod__row">
        {[0, 1, 2, 3, 4].map((n) => (
          <button key={n} type="button" onClick={() => { s.loginAsTestUser(n); navigate('/') }}>{n} {n === 1 ? 'entry' : 'entries'}</button>
        ))}
      </div>

      <h3>Promotion cards</h3>
      <div className="mod__list" role="radiogroup" aria-label="Promotion cards">
        {CARD_VARIANTS.map((v) => (
          <label key={v.id} className={design.card === v.id ? 'is-on' : ''}>
            <input type="radio" name="cfg-card" checked={design.card === v.id} onChange={() => design.set({ card: v.id })} />
            <span><b>{v.name}</b><small>{v.note}</small></span>
          </label>
        ))}
      </div>
      <div className="mod__row">
        <button type="button" onClick={() => navigate('/')}>Home</button>
        <button type="button" onClick={() => navigate('/promotions')}>Promotions</button>
      </div>

      <h3>Brand theme</h3>
      <p className="mod__small">On promotion and brand pages. A, B and C also put buttons, links and menus on the page in the brand theme.</p>
      <div className="mod__list" role="radiogroup" aria-label="Brand theme">
        {CHROME_VARIANTS.map((v) => (
          <label key={v.id} className={design.chrome === v.id ? 'is-on' : ''}>
            <input type="radio" name="cfg-chrome" checked={design.chrome === v.id} onChange={() => design.set({ chrome: v.id })} />
            <span><b>{v.name}</b><small>{v.note}</small></span>
          </label>
        ))}
      </div>
      <div className="mod__row">
        <button type="button" onClick={() => navigate('/promotions/las-vegas-wrap')}>Doritos promo</button>
        <button type="button" onClick={() => navigate('/promotions/pepsi-music')}>Pepsi promo</button>
        <button type="button" onClick={() => navigate('/brands/7up')}>7UP brand</button>
      </div>
    </aside>
  )
}
