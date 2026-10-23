import { useToast } from './Toast'
import './ui.css'

// Brand marks drawn inline (lucide has no social logos).
const Facebook = () => (
  <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z" /></svg>
)
const X = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden><path d="M18.2 2.2h3.4l-7.4 8.5 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.8 2.2h7l4.8 6.4 5.6-6.4Zm-1.2 18h1.9L7 4.1H5L17 20.2Z" /></svg>
)
const WhatsApp = () => (
  <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden><path d="M12 0a12 12 0 0 0-10.3 18.1L0 24l6.1-1.6A12 12 0 1 0 12 0Zm0 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.6.9 1-3.5-.2-.4A9.8 9.8 0 1 1 12 21.8Zm5.4-7.3c-.3-.2-1.8-.9-2-1-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.7-.4Z" /></svg>
)

export function Share({ title }: { title: string }) {
  const toast = useToast()
  const share = (where: string) => {
    try { navigator.clipboard?.writeText(window.location.href) } catch { /* ignore */ }
    toast(`Link to “${title}” copied for sharing on ${where}`)
  }
  return (
    <div className="share">
      <span>Share via</span>
      <button type="button" aria-label="Share on Facebook" onClick={() => share('Facebook')}><Facebook /></button>
      <button type="button" aria-label="Share on X" onClick={() => share('X')}><X /></button>
      <button type="button" aria-label="Share on WhatsApp" onClick={() => share('WhatsApp')}><WhatsApp /></button>
    </div>
  )
}
