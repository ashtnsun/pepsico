/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { CircleCheck } from 'lucide-react'

const Ctx = createContext<(msg: string) => void>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const show = useCallback((m: string) => {
    setMsg(m)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMsg(null), 3200)
  }, [])
  return (
    <Ctx.Provider value={show}>
      {children}
      <div aria-live="polite">{msg && <div className="toast"><CircleCheck size={20} aria-hidden /> {msg}</div>}</div>
    </Ctx.Provider>
  )
}

export const useToast = () => useContext(Ctx)
