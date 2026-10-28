import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { CircleAlert, Info } from 'lucide-react'
import { getPromo, type Promo } from '../data/promos'
import { isEnded } from '../data/config'
import { useStore } from '../state/store'
import { stageStyle } from '../state/chrome'
import { DateLine, promoStyle } from '../components/promo/PromoTeaser'
import { BrandLoader } from '../components/promo/BrandLoader'
import NotFound from './NotFound'
import './pages.css'

/** The promotion's art, name and dates, straight on the brand colour above the white card (participation and result pages) */
export function PromoStrip({ promo, kicker }: { promo: Promo; kicker: string }) {
  return (
    <section className="participate__promo" aria-label={kicker}>
      <img className="participate__art" src={promo.images.card} alt="" />
      <div>
        <p className="participate__kicker">{kicker}</p>
        <p className="h3">{promo.teaserTitle}</p>
        <DateLine promo={promo} />
      </div>
    </section>
  )
}

/** Wireframe "Promo Loading", as one centred column: a small promo strip on top, then the entry form / "calculating" card. */
export default function Participate() {
  const { slug } = useParams()
  const promo = getPromo(slug)
  const { user, enter, canEnter } = useStore()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState<{ code?: string; terms?: string }>({})
  const [phase, setPhase] = useState<'form' | 'loading'>('form')
  const codeRef = useRef<HTMLInputElement>(null)
  // Check the entry limit once, when the page opens, so submitting doesn't flip the page to "already entered"
  const [blocked] = useState(() => !!promo && !!user && !canEnter(promo.slug))

  useEffect(() => { codeRef.current?.focus() }, [])

  if (!promo) return <NotFound />
  if (!user) return <Navigate to="/login" replace state={{ from: `/promotions/${promo.slug}/participate`, reason: 'participate' }} />
  if (isEnded(promo)) return <Navigate to={`/promotions/${promo.slug}`} replace />

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (!code.trim()) next.code = 'Enter the code from your pack.'
    if (!terms) next.terms = 'Accept the promotion terms and conditions to enter.'
    if (next.code || next.terms) { setErrors(next); if (next.code) codeRef.current?.focus(); return }
    const res = enter(promo.slug, code)
    if (!res.ok) { setErrors({ code: res.message }); codeRef.current?.focus(); return }
    setPhase('loading')
    window.setTimeout(() => navigate(`/promotions/${promo.slug}/result/${res.entry.id}`, { replace: true }), 2600)
  }

  return (
    // Change 46: no breadcrumb on this task page; the promo strip says where you are
    <div style={{ ...promoStyle(promo), ...stageStyle(promo) }}>
      <div className="participate">
        <div className="participate__main">
          <PromoStrip promo={promo} kicker="You’re entering" />

          {phase === 'loading' ? (
            <div className="panel" role="status" aria-live="assertive" style={{ textAlign: 'center' }}>
              <h1>{promo.mechanic === 'instant' ? 'Calculating your instant results…' : 'Submitting your entry…'}</h1>
              <BrandLoader brand={promo.brand} />
            </div>
          ) : blocked ? (
            <div className="panel">
              <h1>You’ve already entered</h1>
              <p className="panel__lead">
                {promo.limit === 'week' ? 'There is one entry per person per week. You can enter again from Monday with a new code.'
                  : promo.limit === 'day' ? 'There is one entry per person per day. Come back tomorrow with a new code.'
                  : 'There is one entry per person for this promotion.'}
              </p>
              <Link to={`/promotions/${promo.slug}`} className="btn btn--primary btn--block">Back to the promotion</Link>
            </div>
          ) : (
            <form className="panel" onSubmit={submit} noValidate>
              <h1>Enter your code</h1>
              <p className="panel__lead">
                {promo.mechanic === 'instant'
                  ? <>Enter the code from your promotional pack to find out straight away if you’ve won.{promo.drawPrize && <> Every entry is also in the draw for {promo.drawPrize}.</>}</>
                  : <>Enter the code from your promotional pack to join the draw for {promo.drawPrize}.</>}
              </p>
              <div className="panel__help">
                <img src={promo.steps[2]?.image ?? promo.images.card} alt="" />
                <span><Info size={16} aria-hidden style={{ verticalAlign: '-3px', marginRight: 4 }} />{promo.codeHelp}</span>
              </div>
              <div className="field">
                <label htmlFor="code" className="field__label">Code*</label>
                <input
                  ref={codeRef} id="code" className="field__input code-input" autoComplete="off" spellCheck={false}
                  placeholder={`${promo.codePrefix}${'X'.repeat(9 - promo.codePrefix.length)}`} value={code}
                  onChange={(e) => { setCode(e.target.value); setErrors((er) => ({ ...er, code: undefined })) }}
                  aria-invalid={!!errors.code} aria-describedby={errors.code ? 'code-error' : undefined}
                />
                {errors.code && <p id="code-error" className="field__error"><CircleAlert size={16} aria-hidden /> Error: {errors.code}</p>}
              </div>
              <label className="check">
                <input type="checkbox" checked={terms} onChange={(e) => { setTerms(e.target.checked); setErrors((er) => ({ ...er, terms: undefined })) }} aria-invalid={!!errors.terms} aria-describedby={errors.terms ? 'terms-error' : undefined} />
                <span>I have read and accept the <Link to={`/promotions/${promo.slug}/terms`} target="_blank" className="link">promotion terms and conditions</Link>. I’m 18 or over and live in the UK or Ireland.*</span>
              </label>
              {errors.terms && <p id="terms-error" className="field__error" style={{ marginTop: -8, marginBottom: 12 }}><CircleAlert size={16} aria-hidden /> Error: {errors.terms}</p>}
              <button type="submit" className="btn btn--primary btn--block">Submit code</button>
              <p className="field__help" style={{ marginTop: 14, textAlign: 'center' }}>Keep your pack: you’ll need it to claim a prize.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
