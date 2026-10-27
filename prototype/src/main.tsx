// Global styles first so component and page styles can override them
import './styles/tokens.css'
import './styles/site.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { StoreProvider } from './state/store'
import { DesignProvider } from './state/design'
import { ToastProvider } from './components/ui/Toast'
import App from './App'

// HashRouter so the built prototype works on any static host without server rewrites.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <StoreProvider>
        <DesignProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </DesignProvider>
      </StoreProvider>
    </HashRouter>
  </StrictMode>,
)
