import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import './ui.css'

/** Children can be a function that gets `close`, so buttons inside the modal close it with the same fade-out. */
export function Modal({ title, children, onClose }: { title: string; children: ReactNode | ((close: () => void) => ReactNode); onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [closing, setClosing] = useState(false)
  // Play the closing fade (.is-closing in ui.css, 0.2s), then let the page remove the modal
  const close = useCallback(() => {
    setClosing(true)
    window.setTimeout(onClose, 200)
  }, [onClose])
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); prev?.focus() }
  }, [close])
  return (
    <div className={`modal-backdrop ${closing ? 'is-closing' : ''}`} onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1} ref={ref}>
        <button type="button" className="modal__close" aria-label="Close" onClick={close}><X size={22} /></button>
        <h2 id="modal-title" className="h2">{title}</h2>
        {typeof children === 'function' ? children(close) : children}
      </div>
    </div>
  )
}
