/* App shell. Holds the signed-in demo role, the current page, the cart and the
   theme. Renders the landing page when nobody is signed in, otherwise the
   shared layout (sidebar + top bar) plus the active page. Page switching is
   state-based; there is no router. */

import { useEffect, useState } from 'react'
import Icon from './components/Icon.jsx'
import LandingPage from './components/LandingPage.jsx'
import Sidebar from './components/Sidebar.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import Toast from './components/Toast.jsx'
import { getUserForRole } from './data/users.js'
import CartPage from './pages/CartPage.jsx'
import ComplaintsPage from './pages/ComplaintsPage.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import LostFoundPage from './pages/LostFoundPage.jsx'
import MartPage from './pages/MartPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import QueuesPage from './pages/QueuesPage.jsx'
import SeniorsPage from './pages/SeniorsPage.jsx'
import {
  KEY_CART,
  KEY_ROLE,
  KEY_THEME,
  PAGE_LABELS,
  ROLE_BY_ID,
} from './utils/constants.js'
import { clearDemoData, persistenceWarning } from './utils/storage.js'
import { useLocalStorage } from './utils/useLocalStorage.js'

const PAGES = {
  dashboard: DashboardPage,
  complaints: ComplaintsPage,
  mart: MartPage,
  cart: CartPage,
  lostfound: LostFoundPage,
  queues: QueuesPage,
  seniors: SeniorsPage,
  profile: ProfilePage,
}

export default function App() {
  const [role, setRole] = useLocalStorage(KEY_ROLE, null)
  const [theme, setTheme] = useLocalStorage(KEY_THEME, 'light')
  const [cart, setCart] = useLocalStorage(KEY_CART, [])
  const [page, setPage] = useState('dashboard')
  const [toast, setToast] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /* An invalid stored role falls back to the landing page. */
  const activeRole = ROLE_BY_ID[role] ? role : null
  const currentUser = activeRole ? getUserForRole(activeRole) : null

  const toggleTheme = () => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const navigate = (target) => {
    setPage(target)
    setSidebarOpen(false)
  }

  const showToast = (message, kind = 'success') =>
    setToast({ message, kind, id: Date.now() })

  const handleEnter = (roleId) => {
    setRole(roleId)
    setPage('dashboard')
  }

  const handleLogout = () => {
    setRole(null)
    setPage('dashboard')
    setSidebarOpen(false)
  }

  const handleReset = () => {
    clearDemoData()
    setRole(null)
    setCart([])
    setPage('dashboard')
    setSidebarOpen(false)
    showToast('Demo data reset')
  }

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.id === item.id)
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry,
        )
      }
      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          qty: 1,
        },
      ]
    })
    showToast(`Added "${item.title}" to cart`)
  }

  const updateCartQty = (id, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((entry) => entry.id !== id)
        : prev.map((entry) => (entry.id === id ? { ...entry, qty } : entry)),
    )
  }

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((entry) => entry.id !== id))

  const clearCart = () => setCart([])

  /* Escape closes the mobile drawer. */
  useEffect(() => {
    if (!sidebarOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setSidebarOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  if (!activeRole) {
    return (
      <>
        <LandingPage
          theme={theme}
          onToggleTheme={toggleTheme}
          onEnter={handleEnter}
        />
        {toast && (
          <Toast
            message={toast.message}
            kind={toast.kind}
            onDismiss={() => setToast(null)}
          />
        )}
      </>
    )
  }

  const ActivePage = PAGES[page] ?? DashboardPage
  const warning = persistenceWarning()
  const cartCount = cart.reduce((total, entry) => total + entry.qty, 0)

  return (
    <>
      <div className="layout">
        <Sidebar
          currentPage={page}
          onNavigate={navigate}
          role={activeRole}
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="layout__main">
          <header className="topbar">
            <button
              type="button"
              className="btn btn--ghost topbar__menu"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
            >
              <Icon name="menu" />
            </button>

            <span className="topbar__title">
              {PAGE_LABELS[page] ?? 'Campus Sync'}
            </span>

            <div className="topbar__actions">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <button
                type="button"
                className="btn btn--ghost topbar__cart"
                onClick={() => navigate('cart')}
                aria-label={`Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
              >
                <Icon name="cart" />
                {cartCount > 0 && (
                  <span className="topbar__cart-count">{cartCount}</span>
                )}
              </button>
              <span className="topbar__user-meta">{currentUser.name}</span>
            </div>
          </header>

          <main className="layout__content">
            {warning && <p className="notice">{warning}</p>}

            <ActivePage
              currentUser={currentUser}
              role={activeRole}
              onNavigate={navigate}
              cart={cart}
              onAddToCart={addToCart}
              onUpdateCartQty={updateCartQty}
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
              showToast={showToast}
              onLogout={handleLogout}
              onReset={handleReset}
            />
          </main>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          kind={toast.kind}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  )
}
