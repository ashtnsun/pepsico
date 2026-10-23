import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Faq } from '../../data/promos'
import './ui.css'

/** Live-site FAQ accordion: question 20/600, blue chevron, dark divider. First item open, like the live site. */
export function Accordion({ items, firstOpen = true }: { items: Faq[]; firstOpen?: boolean }) {
  const [open, setOpen] = useState<number | null>(firstOpen ? 0 : null)
  const id = useId()
  return (
    <div className="accordion">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <div className="accordion__item" key={f.q}>
            <h3>
              <button
                type="button" className="accordion__question" aria-expanded={isOpen} aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{f.q}</span>
                <ChevronDown size={20} strokeWidth={3} className={`accordion__chevron ${isOpen ? 'is-open' : ''}`} aria-hidden />
              </button>
            </h3>
            <div id={`${id}-${i}`} className="accordion__answer" hidden={!isOpen}>{f.a}</div>
          </div>
        )
      })}
    </div>
  )
}
