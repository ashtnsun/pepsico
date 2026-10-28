import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { CircleAlert, LogOut, Settings, Ticket, User as UserIcon } from 'lucide-react'
import { getPromo } from '../data/promos'
import { COUNTRIES, formatDate } from '../data/config'
import { useStore } from '../state/store'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { StatusBadge } from '../components/promo/PromoCard'
import { Modal } from '../components/ui/Modal'
import { useToast } from '../components/ui/Toast'
import './pages.css'

type Tab = 'details' | 'entries' | 'settings'

export default function Profile() {
  const { user, myEntries, updateProfile, logout, deleteAccount } = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const [tab, setTab] = useState<Tab>(location.hash === '#entries' ? 'entries' : 'details')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [f, setF] = useState(() => ({ firstName: user?.firstName ?? '', lastName: user?.lastName ?? '', dob: user?.dob ?? '', gender: user?.gender ?? '', postcode: user?.postcode ?? '', phone: user?.phone ?? '' }))
  const [errors, setErrors] = useState<Record<string, string>>({})
  // Logging out goes home; without this flag the "not logged in" redirect below sends you to Login first
  const leaving = useRef(false)
  const doLogout = () => { leaving.current = true; logout(); navigate('/') }

  useEffect(() => { if (location.hash === '#entries') setTab('entries') }, [location.hash])

  if (!user) return leaving.current ? null : <Navigate to="/login" replace state={{ from: '/profile' }} />

  const save = (e: FormEvent) => {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!f.firstName.trim()) er.firstName = 'Enter your first name.'
    if (!f.lastName.trim()) er.lastName = 'Enter your last name.'
    setErrors(er)
    if (Object.keys(er).length) return
    updateProfile(f)
    toast('Your details have been saved')
  }
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  const country = COUNTRIES.find((c) => c.code === user.country)?.name ?? '—'
  const entries = [...myEntries].reverse()

  return (
    <>
      <Breadcrumb items={[{ label: 'User' }, { label: tab === 'entries' ? 'My entries' : 'Edit' }]} />
      <div className="profile">
        <div className="profile__intro">
          <h1>Hello, {user.firstName}!</h1>
          <p>Edit or complete your details here. All your info will be safe with us.</p>
          <div className="profile__tabs" role="tablist" aria-label="Profile sections">
            <button type="button" role="tab" aria-selected={tab === 'details'} onClick={() => setTab('details')}><UserIcon size={18} aria-hidden /> My details</button>
            <button type="button" role="tab" aria-selected={tab === 'entries'} onClick={() => setTab('entries')}><Ticket size={18} aria-hidden /> My entries ({myEntries.length})</button>
            <button type="button" role="tab" aria-selected={tab === 'settings'} onClick={() => setTab('settings')}><Settings size={18} aria-hidden /> Settings</button>
          </div>
          {/* Change 55: Log out sits under the tabs (the navbar no longer has a profile dropdown). Outside the tablist because it isn't a tab. */}
          <div className="profile__tabs profile__tabs--after">
            <button type="button" onClick={doLogout}><LogOut size={18} aria-hidden /> Log out</button>
          </div>
        </div>

        {/* Keyed by tab so the new tab's content fades in */}
        <div className="profile__panel" role="tabpanel" key={tab}>
          {tab === 'details' && (
            <form onSubmit={save} noValidate>
              <div className="auth__section">
                <h2>1. Account information</h2>
                <div className="field">
                  <label htmlFor="p-email" className="field__label">Mail*</label>
                  <input id="p-email" className="field__input" value={user.email} disabled />
                </div>
              </div>
              <div className="auth__section">
                <h2>2. Personal information</h2>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="p-first" className="field__label">Name*</label>
                    <input id="p-first" className="field__input" value={f.firstName} onChange={set('firstName')} aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? 'p-first-error' : undefined} />
                    {errors.firstName && <p id="p-first-error" className="field__error"><CircleAlert size={16} aria-hidden /> Error: {errors.firstName}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="p-last" className="field__label">Last Name*</label>
                    <input id="p-last" className="field__input" value={f.lastName} onChange={set('lastName')} aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? 'p-last-error' : undefined} />
                    {errors.lastName && <p id="p-last-error" className="field__error"><CircleAlert size={16} aria-hidden /> Error: {errors.lastName}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="p-country" className="field__label">Country*</label>
                    <input id="p-country" className="field__input" value={country} disabled aria-describedby="p-country-help" />
                    <p id="p-country-help" className="field__help">To change country, contact us.</p>
                  </div>
                  <div className="field">
                    <label htmlFor="p-dob" className="field__label">Date of birth</label>
                    <input id="p-dob" type="date" className="field__input" value={f.dob} onChange={set('dob')} />
                  </div>
                </div>
                <fieldset style={{ border: 0, padding: 0, margin: '0 0 8px' }}>
                  <legend className="field__label" style={{ marginBottom: 12 }}>Gender</legend>
                  <div className="radio-row">
                    {[['male', 'Male'], ['female', 'Female'], ['prefer-not', 'Prefer not to say']].map(([v, l]) => (
                      <label key={v}><input type="radio" name="p-gender" value={v} checked={f.gender === v} onChange={set('gender')} /> {l}</label>
                    ))}
                  </div>
                </fieldset>
                <div className="field">
                  <label htmlFor="p-post" className="field__label">Postcode</label>
                  <input id="p-post" className="field__input" value={f.postcode} onChange={set('postcode')} />
                </div>
                <div className="field">
                  <label htmlFor="p-phone" className="field__label">Phone Number</label>
                  <input id="p-phone" type="tel" className="field__input" placeholder="+44 7400 123456" value={f.phone} onChange={set('phone')} />
                </div>
                <div className="auth__actions" style={{ justifyContent: 'flex-start' }}><button type="submit" className="btn btn--primary btn--wide">Save</button></div>
              </div>
            </form>
          )}

          {tab === 'entries' && (
            <div className="auth__section" id="entries">
              <h2>My entries</h2>
              {entries.length ? (
                <table className="entries-table">
                  <thead><tr><th>Promotion</th><th>Date</th><th>Code</th><th>Result</th></tr></thead>
                  <tbody>
                    {entries.map((e) => {
                      const p = getPromo(e.promo)
                      if (!p) return null
                      return (
                        <tr key={e.id}>
                          <td><Link to={`/promotions/${p.slug}/result/${e.id}`}>{p.teaserTitle}</Link><br /><span className="field__help">{p.brandLabel}</span></td>
                          <td>{formatDate(e.date.slice(0, 10))}</td>
                          <td><code>{e.code}</code></td>
                          <td>
                            <StatusBadge promo={p} entry={e} />
                            <div className="field__help" style={{ marginTop: 6 }}>
                              {e.outcome === 'won' ? e.prize : e.outcome === 'lost' ? 'No instant win' : 'In the draw'}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="empty-state"><h3 className="h3">No entries yet</h3><p>When you enter a code, it shows up here with the result.</p><p style={{ marginTop: 16 }}><Link to="/promotions" className="btn btn--primary">See promotions</Link></p></div>
              )}
            </div>
          )}

          {tab === 'settings' && (
            <>
              <div className="auth__section">
                <h2>Marketing preferences</h2>
                <label className="check"><input type="checkbox" checked={user.marketing} onChange={(e) => { updateProfile({ marketing: e.target.checked }); toast('Preferences saved') }} /><span>I agree to receive direct marketing communications, such as e-mail and SMS from PepsiCo brands.</span></label>
                <label className="check"><input type="checkbox" checked={user.ads} onChange={(e) => { updateProfile({ ads: e.target.checked }); toast('Preferences saved') }} /><span>I agree to personalized online advertising based on my interests and preferences.</span></label>
              </div>
              <div className="auth__section">
                <h2>Account</h2>
                <button type="button" className="btn btn--outline" onClick={doLogout}><LogOut size={18} aria-hidden /> Log out</button>
                <div className="danger-zone">
                  <p className="field__help" style={{ marginBottom: 12 }}>Deleting your profile removes your personal data, your entries in running promotions and your marketing consents.</p>
                  <button type="button" className="link" style={{ color: 'var(--color-feedback-error)' }} onClick={() => setConfirmDelete(true)}>Delete profile</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {confirmDelete && (
        <Modal title="Delete your JOY profile?" onClose={() => setConfirmDelete(false)}>
          {(close) => (
            <>
              <p>This removes your personal data and your entries in running promotions. You can’t undo this.</p>
              <div className="modal__actions">
                <button type="button" className="btn btn--outline" onClick={close}>Keep my profile</button>
                <button type="button" className="btn btn--primary" style={{ background: 'var(--color-feedback-error)', borderColor: 'var(--color-feedback-error)' }} onClick={() => { deleteAccount(); toast('Your profile has been deleted'); navigate('/') }}>Delete profile</button>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  )
}
