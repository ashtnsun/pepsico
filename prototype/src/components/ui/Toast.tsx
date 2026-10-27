/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { CircleCheck } from 'lucide-react'

const Ctx = createContext<(msg: string) => void>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  // id restarts the slide-in when a new message replaces one that is still showing
  const [toast, setToast] = useState<{ msg: string; id: number; leaving: boolean } | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const show = useCallback((msg: string) => {
    setToast((t) => ({ msg, id: (t?.id ?? 0) + 1, leaving: false }))
    window.clearTimeout(timer.current)
    // After 3.2s it slides out (.toast.is-leaving, 0.25s), then it's removed
    timer.current = window.setTimeout(() => {
      setToast((t) => t && { ...t, leaving: true })
      timer.current = window.setTimeout(() => setToast(null), 250)
    }, 3200)
  }, [])
  return (
    <Ctx.Provider value={show}>
      {children}
      <div aria-live="polite">
        {toast && <div key={toast.id} className={`toast ${toast.leaving ? 'is-leaving' : ''}`}><CircleCheck size={20} aria-hidden /> {toast.msg}</div>}
      </div>
    </Ctx.Provider>
  )
}

export const useToast = () => useContext(Ctx)
