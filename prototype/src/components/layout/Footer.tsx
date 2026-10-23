import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CircleAlert, CircleCheck } from 'lucide-react'
import { useStore } from '../../state/store'
import './layout.css'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function Newsletter() {
  const { subscribe } = useStore()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'error' | 'ok' | 'already'>('idle')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) { setState('error'); return }
    setState(subscribe(email))
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <img className="newsletter__deco newsletter__deco--left" src="./images/global/mailing-left.png" alt="" />
      <img className="newsletter__deco newsletter__deco--right" src="./images/global/mailing-right.png" alt="" />
      <div className="newsletter__inner">
        <div>
          <h2 id="newsletter-title" className="h1">Stay up to date with your favorite brands</h2>
          <p className="newsletter__sub">Always receive the latest news about current promotions</p>
        </div>
        {state === 'ok' || state === 'already' ? (
          <p className="newsletter__done" role="status">
            <CircleCheck size={22} aria-hidden />
            {state === 'ok' ? 'Thanks! You’re subscribed. Check your inbox to confirm your email.' : 'You’re already subscribed with this email.'}
          </p>
        ) : (
          <form className="newsletter__form" onSubmit={submit} noValidate>
            <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
            <input
              id="newsletter-email" type="email" placeholder="mail@mail.com" value={email}
              onChange={(e) => { setEmail(e.target.value); setState('idle') }}
              aria-invalid={state === 'error'} aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
            />
            {state === 'error' && <p id="newsletter-error" className="newsletter__error"><CircleAlert size={16} aria-hidden /> Error: enter a valid email address, like name@example.com</p>}
            <button type="submit" className="btn btn--white">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <img className="footer__logo" src="./images/global/footer-logo.webp" alt="JOY by PepsiCo" />
      <div className="footer__inner">
        <ul className="footer__links">
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/terms">Terms and Conditions</Link></li>
          <li><Link to="/privacy">Privacy policy</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/change-country">Change Country</Link></li>
        </ul>
        <p>©2025 PepsiCo, Inc</p>
      </div>
    </footer>
  )
}
