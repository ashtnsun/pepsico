import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CircleAlert, Info, MailCheck } from 'lucide-react'
import { COUNTRIES } from '../data/config'
import { useStore, type User } from '../state/store'
import { Modal } from '../components/ui/Modal'
import { useToast } from '../components/ui/Toast'
import './pages.css'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type FromState = { from?: string; reason?: string } | null

/** Live-site "Signing in..." screen: blue page, white card, JOY logo. */
export function SigningIn({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = window.setTimeout(onDone, 1300); return () => window.clearTimeout(t) }, [onDone])
  return (
    <div className="signing-in" role="status">
      <div className="signing-in__card"><img src="./images/global/joy-logo-white.png" alt="JOY" /><p>Signing in<span className="dots" aria-hidden><span>.</span><span>.</span><span>.</span></span></p></div>
    </div>
  )
}

function Err({ id, children }: { id: string; children: ReactNode }) {
  return <p id={id} className="field__error"><CircleAlert size={16} aria-hidden /> Error: {children}</p>
}

/** Red asterisk that marks a required field or consent. */
const Req = () => <span className="req">*</span>

function SocialButtons({ onPick }: { onPick: (p: 'google' | 'facebook') => void }) {
  return (
    <div className="auth__social">
      <button type="button" onClick={() => onPick('facebook')}><span className="icon"><img src="./images/global/facebook.webp" alt="" /></span>Facebook</button>
      <button type="button" onClick={() => onPick('google')}><span className="icon"><img src="./images/global/google.webp" alt="" /></span>Google</button>
    </div>
  )
}

function useAfterLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const st = location.state as FromState
  return { from: st?.from, reason: st?.reason, go: () => navigate(st?.from && st.from !== '/login' ? st.from : '/', { replace: true }) }
}

function useSocial() {
  const { socialLogin } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [signing, setSigning] = useState<null | { isNew: boolean }>(null)
  const pick = (p: 'google' | 'facebook') => setSigning(socialLogin(p))
  const overlay = signing && (
    <SigningIn onDone={() => {
      const from = (location.state as FromState)?.from
      if (signing.isNew) navigate('/onboarding', { replace: true, state: { from } })
      else navigate(from ?? '/', { replace: true })
    }} />
  )
  return { pick, overlay }
}

export function Login() {
  const { accounts } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const { reason } = useAfterLogin()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [noAccount, setNoAccount] = useState(false)
  const { pick, overlay } = useSocial()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setNoAccount(false)
    if (!email.trim()) { setError('Enter your email address.'); return }
    if (!EMAIL.test(email.trim())) { setError('Enter a valid email address, like name@example.com'); return }
    // Check the account exists before "sending" the magic link (don't log in yet)
    if (!accounts[email.trim().toLowerCase()]) { setNoAccount(true); return }
    navigate('/login/check-email', { state: { ...(location.state as object), email: email.trim() } })
  }

  return (
    <>
      <div className="auth">
        <div className="auth__card">
          <h1>Log In</h1>
          {reason === 'participate' && <p className="alert alert--info" style={{ marginTop: 24 }}><Info size={18} aria-hidden /> Log in or register to take part in this promotion. You’ll come straight back to it.</p>}
          <p className="auth__lead">Select a login method.</p>
          <form onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="login-email" className="field__label">E-mail<Req /></label>
              <input id="login-email" type="email" autoComplete="email" className="field__input" placeholder="mail@mail.com" value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); setNoAccount(false) }}
                aria-invalid={!!error} aria-describedby={error ? 'login-error' : undefined} />
              {error && <Err id="login-error">{error}</Err>}
            </div>
            {noAccount && (
              <div className="alert alert--error" role="alert">
                <CircleAlert size={18} aria-hidden />
                <span>We couldn’t find a JOY account for <strong>{email}</strong>. Check the spelling, or <Link to="/register" state={{ ...(location.state as object), email }} className="link">create a new account</Link>.</span>
              </div>
            )}
            <button type="submit" className="btn btn--primary btn--block">Login with Joy account</button>
          </form>
          <p className="auth__or">OR</p>
          <p className="auth__lead" style={{ margin: '0 0 12px' }}>Log in with:</p>
          <SocialButtons onPick={pick} />
          <div className="auth__switch">
            <p>Don't have an account yet?</p>
            <Link to="/register" state={location.state} className="link link--caps" style={{ textDecoration: 'underline' }}>Create a new account</Link>
          </div>
        </div>
      </div>
      {overlay}
    </>
  )
}

/** Live site logs in with a "magic link" email. The prototype shows the email step and lets the tester open the link. */
export function CheckEmail() {
  const { login } = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const st = location.state as (FromState & { email?: string }) | null
  const [signing, setSigning] = useState(false)
  if (!st?.email) return <Login />
  return (
    <>
      <div className="auth">
        <div className="auth__card" style={{ textAlign: 'center' }}>
          <MailCheck size={56} color="#1443FF" aria-hidden style={{ margin: '0 auto 16px' }} />
          <h1>Check your inbox</h1>
          <p className="auth__lead">We sent a login link to <strong>{st.email}</strong>. Open it on this device to log in. The link expires in 5 minutes.</p>
          <button type="button" className="btn btn--primary btn--block" onClick={() => { login(st.email!); setSigning(true) }}>Open the login link</button>
          <p className="field__help" style={{ marginTop: 8 }}>Prototype: this button stands in for the link in the email.</p>
          <div className="auth__switch">
            <p>Didn’t get the email? Check your spam folder.</p>
            <button type="button" className="link" onClick={() => toast(`We sent a new link to ${st.email}`)}>Send a new link</button>
            {' · '}
            <Link to="/login" state={{ from: st.from, reason: st.reason }} className="link">Use a different email</Link>
          </div>
        </div>
      </div>
      {signing && <SigningIn onDone={() => navigate(st.from && st.from !== '/login' ? st.from : '/', { replace: true })} />}
    </>
  )
}

const CONSENTS = [
  { key: 'terms', required: true, text: <>I confirm that I am at least 18 years old. I have read and accept the <Link to="/terms" target="_blank" className="link">Terms and Conditions</Link> and the <Link to="/privacy" target="_blank" className="link">Privacy Policy</Link>, which explains how PepsiCo processes my data and my privacy rights. My data will be used for promotion participation and, if I consent below, for marketing purposes.<Req /></> },
  { key: 'marketing', required: false, text: <>I agree to receive direct marketing communications, such as e-mail and SMS from PepsiCo brands.</> },
  { key: 'ads', required: false, text: <>I agree to personalized online advertising based on my interests and preferences, on both PepsiCo's digital assets and third-party platforms.</> },
] as const

type ConsentState = Record<'terms' | 'marketing' | 'ads', boolean>

function Consents({ value, onChange, error }: { value: ConsentState; onChange: (v: ConsentState) => void; error?: string }) {
  const all = value.terms && value.marketing && value.ads
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className="visually-hidden">Terms and consents</legend>
      <label className="check">
        <input type="checkbox" checked={all} onChange={(e) => onChange({ terms: e.target.checked, marketing: e.target.checked, ads: e.target.checked })} />
        <span>I accept all check-boxes:</span>
      </label>
      {CONSENTS.map((c) => (
        <label key={c.key} className="check check--nested">
          <input type="checkbox" checked={value[c.key]} onChange={(e) => onChange({ ...value, [c.key]: e.target.checked })}
            aria-invalid={c.required && !!error} aria-describedby={c.required && error ? 'consent-error' : undefined} />
          <span>{c.text}</span>
        </label>
      ))}
      {error && <Err id="consent-error">{error}</Err>}
    </fieldset>
  )
}

const age = (dob: string) => {
  const d = new Date(dob); const t = new Date('2026-10-23')
  let a = t.getFullYear() - d.getFullYear()
  if (t < new Date(t.getFullYear(), d.getMonth(), d.getDate())) a--
  return a
}

export function Register() {
  const { register, accounts } = useStore()
  const location = useLocation()
  const toast = useToast()
  const { reason, go } = useAfterLogin()
  const { pick, overlay } = useSocial()
  const pre = (location.state as { email?: string } | null)?.email ?? ''
  const [f, setF] = useState({ email: pre, firstName: '', lastName: '', country: '', dob: '', gender: '', postcode: '', prefix: '+44', phone: '' })
  const [consent, setConsent] = useState<ConsentState>({ terms: false, marketing: false, ads: false })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [signing, setSigning] = useState(false)
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => { setF({ ...f, [k]: e.target.value }); setErrors((er) => ({ ...er, [k]: '' })) }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!f.email.trim()) er.email = 'Enter your email address.'
    else if (!EMAIL.test(f.email.trim())) er.email = 'Enter a valid email address, like name@example.com'
    else if (accounts[f.email.trim().toLowerCase()]) er.email = 'There is already an account with this email. Log in instead.'
    if (!f.firstName.trim()) er.firstName = 'Enter your first name.'
    if (!f.lastName.trim()) er.lastName = 'Enter your last name.'
    if (!f.country) er.country = 'Select your country.'
    if (f.dob && age(f.dob) < 18) er.dob = 'You must be 18 or over to join JOY.'
    if (f.phone && !/^[0-9 ]{7,15}$/.test(f.phone.trim())) er.phone = 'Enter a phone number using digits only.'
    if (!consent.terms) er.consent = 'Accept the Terms and Conditions and Privacy Policy to create an account.'
    setErrors(er)
    const first = Object.keys(er).find((k) => er[k])
    if (first) { document.getElementById(`reg-${first}`)?.focus(); return }
    register({
      email: f.email, firstName: f.firstName.trim(), lastName: f.lastName.trim(), country: f.country, dob: f.dob, gender: f.gender,
      postcode: f.postcode, phone: f.phone ? `${f.prefix} ${f.phone}` : '', marketing: consent.marketing, ads: consent.ads, provider: 'email',
    } satisfies User)
    setSigning(true)
  }

  const errProps = (k: string) => ({ id: `reg-${k}`, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `reg-${k}-error` : undefined })

  return (
    <>
      <div className="auth">
        <form className="auth__card auth__card--wide" onSubmit={submit} noValidate>
          <h1>Register here</h1>
          {reason === 'participate' && <p className="alert alert--info" style={{ marginTop: 24 }}><Info size={18} aria-hidden /> Create your free account to take part. You’ll go straight back to the promotion.</p>}
          <p className="auth__lead">Register with:</p>
          <SocialButtons onPick={pick} />
          <p className="auth__or">OR</p>

          <h2 className="h3" style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>1. Account information</h2>
          <div className="field">
            <label htmlFor="reg-email" className="field__label">E-mail<Req /></label>
            <input type="email" autoComplete="email" className="field__input" placeholder="mail@mail.com" value={f.email} onChange={set('email')} {...errProps('email')} />
            {errors.email && <Err id="reg-email-error">{errors.email} {errors.email.includes('Log in') && <Link to="/login" state={location.state} className="link">Log in</Link>}</Err>}
          </div>

          <div className="auth__section">
            <h2>2. Personal information</h2>
            <div className="field-row">
              <div className="field">
                <label htmlFor="reg-firstName" className="field__label">Name<Req /></label>
                <input autoComplete="given-name" className="field__input" placeholder="Name" value={f.firstName} onChange={set('firstName')} {...errProps('firstName')} />
                {errors.firstName && <Err id="reg-firstName-error">{errors.firstName}</Err>}
              </div>
              <div className="field">
                <label htmlFor="reg-lastName" className="field__label">Last Name<Req /></label>
                <input autoComplete="family-name" className="field__input" placeholder="Last Name" value={f.lastName} onChange={set('lastName')} {...errProps('lastName')} />
                {errors.lastName && <Err id="reg-lastName-error">{errors.lastName}</Err>}
              </div>
              <div className="field">
                <label htmlFor="reg-country" className="field__label">Country<Req /></label>
                <select className="field__input" value={f.country} onChange={set('country')} {...errProps('country')}>
                  <option value="">- Select -</option>
                  {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
                {errors.country && <Err id="reg-country-error">{errors.country}</Err>}
              </div>
              <div className="field">
                <label htmlFor="reg-dob" className="field__label">Date of birth</label>
                <input type="date" className="field__input" value={f.dob} onChange={set('dob')} max="2026-10-23" {...errProps('dob')} />
                {errors.dob && <Err id="reg-dob-error">{errors.dob}</Err>}
              </div>
            </div>
            <fieldset style={{ border: 0, padding: 0, margin: '0 0 8px' }}>
              <legend className="field__label" style={{ marginBottom: 12 }}>Gender</legend>
              <div className="radio-row">
                {[['male', 'Male'], ['female', 'Female'], ['prefer-not', 'Prefer not to say']].map(([v, l]) => (
                  <label key={v}><input type="radio" name="gender" value={v} checked={f.gender === v} onChange={set('gender')} /> {l}</label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="reg-postcode" className="field__label">Postcode</label>
              <input id="reg-postcode" autoComplete="postal-code" className="field__input" placeholder="Postcode" value={f.postcode} onChange={set('postcode')} />
            </div>
            <div className="field-row" style={{ gridTemplateColumns: '140px 1fr' }}>
              <div className="field">
                <label htmlFor="reg-prefix" className="field__label">Prefix</label>
                <select id="reg-prefix" className="field__input" value={f.prefix} onChange={set('prefix')}>
                  <option value="+44">🇬🇧 +44</option><option value="+353">🇮🇪 +353</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="reg-phone" className="field__label">Phone Number</label>
                <input type="tel" autoComplete="tel-national" className="field__input" placeholder="7400 123456" value={f.phone} onChange={set('phone')} {...errProps('phone')} />
                {errors.phone && <Err id="reg-phone-error">{errors.phone}</Err>}
              </div>
            </div>
          </div>

          <div className="auth__section">
            <span id="reg-consent" tabIndex={-1} />
            <Consents value={consent} onChange={(v) => { setConsent(v); setErrors((er) => ({ ...er, consent: '' })) }} error={errors.consent} />
          </div>
          <div className="auth__actions"><button type="submit" className="btn btn--primary btn--wide">Register</button></div>
          <div className="auth__switch">
            <p>Already have an account?</p>
            <Link to="/login" state={location.state} className="link link--caps" style={{ textDecoration: 'underline' }}>Log in</Link>
          </div>
        </form>
      </div>
      {overlay}
      {signing && <SigningIn onDone={() => { toast(`Welcome to JOY, ${f.firstName.trim()}!`); go() }} />}
    </>
  )
}

/** Wireframe "Onboarding (Country/Terms)": after a first social login, ask for country and consents. */
export function Onboarding() {
  const { user, completeOnboarding, deleteAccount } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const [country, setCountry] = useState('')
  const [consent, setConsent] = useState<ConsentState>({ terms: false, marketing: false, ads: false })
  const [errors, setErrors] = useState<{ country?: string; consent?: string }>({})
  if (!user) return <Login />
  const finish = (e: FormEvent) => {
    e.preventDefault()
    const er: typeof errors = {}
    if (!country) er.country = 'Select your country.'
    if (!consent.terms) er.consent = 'Accept the Terms and Conditions and Privacy Policy to finish.'
    setErrors(er)
    if (er.country || er.consent) return
    completeOnboarding(country, consent.marketing, consent.ads)
    toast(`Welcome to JOY, ${user.firstName}!`)
    navigate((location.state as FromState)?.from ?? '/', { replace: true })
  }
  return (
    <>
      <div className="auth">
        <form className="auth__card auth__card--wide" onSubmit={finish} noValidate>
          <h1>Almost there, {user.firstName}!</h1>
          <p className="auth__lead">You’ve signed in with {user.provider === 'google' ? 'Google' : 'Facebook'}. We just need two more things.</p>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>1. Select country<Req /></h2>
          <div className="field">
            <label htmlFor="ob-country" className="visually-hidden">Country</label>
            <select id="ob-country" className="field__input" value={country} onChange={(e) => { setCountry(e.target.value); setErrors({ ...errors, country: undefined }) }} aria-invalid={!!errors.country} aria-describedby={errors.country ? 'ob-country-error' : undefined}>
              <option value="">- Select -</option>
              {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
            {errors.country && <Err id="ob-country-error">{errors.country}</Err>}
          </div>
          <div className="auth__section">
            <h2>2. Terms &amp; Conditions<Req /></h2>
            <Consents value={consent} onChange={(v) => { setConsent(v); setErrors({ ...errors, consent: undefined }) }} error={errors.consent} />
          </div>
          <div className="auth__actions" style={{ gap: 12 }}>
            <button type="button" className="btn btn--outline btn--wide" onClick={() => { deleteAccount(); navigate('/login') }}>Cancel</button>
            <button type="submit" className="btn btn--primary btn--wide">Finish</button>
          </div>
        </form>
      </div>
    </>
  )
}

/** Live-site country picker. Only the UK site exists in the prototype. */
export function ChangeCountry() {
  const { setCountry } = useStore()
  const navigate = useNavigate()
  const [other, setOther] = useState<string | null>(null)
  const all = [...COUNTRIES.slice(0, 1), ...COUNTRIES.slice(2, 6), COUNTRIES[1], ...COUNTRIES.slice(6)]
  return (
    <>
      <div className="page-head">
        <h1 className="h1">We want to give you content designed for you</h1>
        <p style={{ color: 'var(--color-text-default)', fontWeight: 600, fontSize: 18 }}>Where are you from?</p>
      </div>
      <div className="country-grid">
        {all.map((c) => (
          <button key={c.code} type="button" onClick={() => { if (c.code === 'gb' || c.code === 'ie') { setCountry(c.code); navigate('/') } else setOther(c.name) }}>
            {c.flag ? <img className="flag" src={c.flag} alt="" /> : <span className="flag flag--blank">{c.code.slice(0, 2).toUpperCase()}</span>}
            {c.name}
          </button>
        ))}
      </div>
      {other && (
        <Modal title={`JOY ${other}`} onClose={() => setOther(null)}>
          {(close) => (
            <>
              <p>This prototype only includes the UK &amp; Ireland site. On the live site you would now see promotions for {other}.</p>
              <div className="modal__actions"><button type="button" className="btn btn--primary" onClick={close}>OK</button></div>
            </>
          )}
        </Modal>
      )}
    </>
  )
}
