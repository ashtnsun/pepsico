import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './layout.css'

export type Crumb = { label: string; to?: string }

/** Live-site breadcrumb bar: dark blue, uppercase, current page in bold. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Home</Link></li>
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <Fragment key={c.label + i}>
              <li aria-hidden className="breadcrumb__sep">/</li>
              <li>
                {last || !c.to ? <span aria-current={last ? 'page' : undefined} className={last ? 'is-current' : ''}>{c.label}</span> : <Link to={c.to}>{c.label}</Link>}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
