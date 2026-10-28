import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useStore, type OutcomeMode } from '../state/store'
import './moderator.css'

const JUMPS: [string, string][] = [
  ['Home', '/'],
  ['Promotions', '/promotions'],
  ['Avengers (instant win, JOY)', '/promotions/avengers-doomsday'],
  ['Doritos wrap-up (draw)', '/promotions/las-vegas-wrap'],
  ['Doritos Las Vegas (ended)', '/promotions/las-vegas'],
  ['Doritos brand page', '/brands/doritos'],
  ['Rockstar brand page (no promos)', '/brands/rockstar'],
  ['Login', '/login'],
  ['Register', '/register'],
  ['Profile', '/profile'],
  ['FAQ', '/faq'],
]

/**
 * Hidden panel for the test moderator. Open with Shift + M, or add ?moderator to the URL.
 * Not part of the design being tested.
 */
export function ModeratorPanel() {
  const s = useStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(() => window.location.search.includes('moderator'))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, select')) return
      if (e.shiftKey && e.key.toLowerCase() === 'm') setOpen((o) => !o)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!open) return null
  return (
    <aside className="mod" aria-label="Moderator panel">
      <div className="mod__head">
        <strong>Moderator panel</strong>
        <button type="button" aria-label="Close moderator panel" onClick={() => setOpen(false)}><X size={18} /></button>
      </div>
      <p className="mod__small">Shift + M to show or hide. Data is saved in this browser only.</p>

      <h3>Participant</h3>
      <p className="mod__small">{s.user ? `Logged in as ${s.user.firstName} ${s.user.lastName} (${s.myEntries.length} entries)` : 'Logged out'}</p>
      <div className="mod__row">
        <button type="button" onClick={() => { s.loginAsTestUser(3); navigate('/') }}>Test user, 3 entries</button>
        <button type="button" onClick={() => { s.loginAsTestUser(4); navigate('/') }}>Test user, 4 entries (reward to claim)</button>
        <button type="button" onClick={() => { s.loginAsTestUser(0); navigate('/') }}>Test user, 0 entries</button>
        {s.user && <button type="button" onClick={() => { s.logout(); navigate('/') }}>Log out</button>}
      </div>

      <h3>Instant-win result</h3>
      <div className="mod__row" role="radiogroup" aria-label="Instant-win result">
        {(['random', 'win', 'lose'] as OutcomeMode[]).map((m) => (
          <label key={m}><input type="radio" name="mod-outcome" checked={s.outcomeMode === m} onChange={() => s.setFlag({ outcomeMode: m })} /> {m === 'random' ? 'Random' : m === 'win' ? 'Always win' : 'Always lose'}</label>
        ))}
      </div>
      <label className="mod__check"><input type="checkbox" checked={s.ignoreLimits} onChange={(e) => s.setFlag({ ignoreLimits: e.target.checked })} /> Ignore “one entry per week/day” limits</label>
      <p className="mod__small">Valid test codes: GB + 5 or more letters/numbers (Avengers), GBC + 5 or more (Doritos). Each code works once.</p>

      <h3>Go to</h3>
      <select onChange={(e) => { if (e.target.value) navigate(e.target.value); e.target.value = '' }} defaultValue="">
        <option value="">Choose a page…</option>
        {JUMPS.map(([l, p]) => <option key={p} value={p}>{l}</option>)}
      </select>

      <button type="button" className="mod__reset" onClick={() => { if (window.confirm('Reset all prototype data (accounts, entries, codes)?')) { s.resetAll(); navigate('/') } }}>
        Reset all data
      </button>
    </aside>
  )
}
