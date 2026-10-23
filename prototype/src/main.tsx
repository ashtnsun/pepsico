// Global styles first so component and page styles can override them
import './styles/tokens.css'
import './styles/site.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { StoreProvider } from './state/store'
import { ToastProvider } from './components/ui/Toast'
import App from './App'

// HashRouter so the built prototype works on any static host without server rewrites.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <StoreProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </StoreProvider>
    </HashRouter>
  </StrictMode>,
)
