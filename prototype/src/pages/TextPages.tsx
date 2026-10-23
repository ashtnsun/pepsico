import { useMemo, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CircleAlert, CircleCheck, Search } from 'lucide-react'
import { generalFaqs } from '../data/faq'
import { getPromo } from '../data/promos'
import { formatRange } from '../data/config'
import { useStore } from '../state/store'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { Accordion } from '../components/ui/Accordion'
import NotFound from './NotFound'
import { promoCrumbs } from './PromoDetail'
import './pages.css'

export function FaqPage() {
  const [q, setQ] = useState('')
  const groups = useMemo(() => {
    const t = q.trim().toLowerCase()
    return generalFaqs
      .map((g) => ({ ...g, items: g.items.filter((f) => !t || (f.q + ' ' + f.a).toLowerCase().includes(t)) }))
      .filter((g) => g.items.length)
  }, [q])
  return (
    <>
      <Breadcrumb items={[{ label: 'FAQ' }]} />
      <div className="page-head"><h1 className="h1">Frequently asked questions</h1></div>
      <div className="text-page">
        <div className="search field" style={{ marginBottom: 40 }}>
          <label htmlFor="faq-search" className="visually-hidden">Search questions</label>
          <Search size={20} aria-hidden />
          <input id="faq-search" type="search" className="field__input" placeholder="Search questions" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {groups.length ? groups.map((g) => (
          <section key={g.group} className="faq-group" aria-label={g.group}>
            <h2>{g.group}</h2>
            <Accordion items={g.items} firstOpen={false} />
          </section>
        )) : (
          <div className="empty-state"><h3 className="h3">No questions match “{q}”</h3><p>Try other words, or <Link to="/contact" className="link">contact us</Link>.</p></div>
        )}
      </div>
    </>
  )
}

export function ContactPage() {
  const { user } = useStore()
  const [f, setF] = useState({ name: user ? `${user.firstName} ${user.lastName}` : '', email: user?.email ?? '', topic: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!f.name.trim()) er.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) er.email = 'Enter a valid email address, like name@example.com'
    if (!f.topic) er.topic = 'Choose what your message is about.'
    if (f.message.trim().length < 10) er.message = 'Write a message of at least 10 characters.'
    setErrors(er)
    if (!Object.keys(er).length) setSent(true)
  }
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => { setF({ ...f, [k]: e.target.value }); setErrors({ ...errors, [k]: '' }) }
  const err = (k: string) => errors[k] && <p id={`c-${k}-error`} className="field__error"><CircleAlert size={16} aria-hidden /> Error: {errors[k]}</p>
  const a = (k: string) => ({ id: `c-${k}`, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `c-${k}-error` : undefined })
  return (
    <>
      <Breadcrumb items={[{ label: 'Contact' }]} />
      <div className="page-head"><h1 className="h1">Contact us</h1><p>Questions about JOY or a promotion? Send us a message and we’ll reply by email.</p></div>
      <div className="text-page">
        {sent ? (
          <p className="alert alert--success" role="status"><CircleCheck size={20} aria-hidden /> Thanks, {f.name.split(' ')[0]}! We’ve received your message and will reply to {f.email} within 2 working days.</p>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="field-row">
              <div className="field"><label htmlFor="c-name" className="field__label">Name*</label><input className="field__input" value={f.name} onChange={set('name')} {...a('name')} />{err('name')}</div>
              <div className="field"><label htmlFor="c-email" className="field__label">E-mail*</label><input type="email" className="field__input" value={f.email} onChange={set('email')} {...a('email')} />{err('email')}</div>
            </div>
            <div className="field">
              <label htmlFor="c-topic" className="field__label">Topic*</label>
              <select className="field__input" value={f.topic} onChange={set('topic')} {...a('topic')}>
                <option value="">- Select -</option>
                <option>A promotion or my code</option><option>My prize</option><option>My account or login</option><option>Something else</option>
              </select>
              {err('topic')}
            </div>
            <div className="field">
              <label htmlFor="c-message" className="field__label">Message*</label>
              <textarea className="field__input" style={{ height: 160, borderRadius: 20, padding: 16 }} value={f.message} onChange={set('message')} {...a('message')} />
              {err('message')}
            </div>
            <button type="submit" className="btn btn--primary btn--wide">Send message</button>
          </form>
        )}
      </div>
    </>
  )
}

export function TermsPage({ kind }: { kind: 'terms' | 'privacy' }) {
  const title = kind === 'terms' ? 'Terms and Conditions' : 'Privacy policy'
  return (
    <>
      <Breadcrumb items={[{ label: title }]} />
      <div className="page-head"><h1 className="h1">{title}</h1></div>
      <div className="text-page">
        <p className="alert alert--info">This is a prototype. The full {title.toLowerCase()} are on the live JOY site.</p>
        {kind === 'terms' ? (
          <>
            <h2>Using JOY</h2><p>JOY by PepsiCo is open to residents aged 18 or over. You need a registered account to take part in promotions.</p>
            <h2>Promotions</h2><p>Each promotion has its own terms and conditions, linked from the promotion page. They explain who can enter, how many times, the prizes and how winners are chosen.</p>
          </>
        ) : (
          <>
            <h2>Your data</h2><p>We use your personal data to run your account and the promotions you enter. If you agree, we also use it for marketing. Your personal data is deleted automatically after 2 years.</p>
            <h2>Your rights</h2><p>You can change your marketing preferences or delete your profile at any time from your profile settings.</p>
          </>
        )}
      </div>
    </>
  )
}

export function PromoTerms() {
  const { slug } = useParams()
  const promo = getPromo(slug)
  if (!promo) return <NotFound />
  return (
    <>
      <Breadcrumb items={promoCrumbs(promo.slug, [{ label: 'Terms and conditions' }])} />
      <div className="page-head"><h1 className="h1">{promo.teaserTitle}: terms and conditions</h1><p>Runs {formatRange(promo)}</p></div>
      <div className="text-page">
        <p>{promo.disclaimer ?? 'The full terms for this promotion are available on request.'}</p>
        <p><Link to={`/promotions/${promo.slug}`} className="link">Back to the promotion</Link></p>
      </div>
    </>
  )
}
