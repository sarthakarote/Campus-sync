/* Sidebar navigation. Fixed on desktop; below 1024 px it becomes a drawer
   opened by the header menu button, closed on a link click, Escape (handled
   by App) or a tap on the overlay. */

import logo from '../assets/logo.svg'
import Icon from './Icon.jsx'
import { NAV_ITEMS, ROLE_BY_ID } from '../utils/constants.js'

export default function Sidebar({
  currentPage,
  onNavigate,
  role,
  onLogout,
  isOpen,
  onClose,
}) {
  const roleLabel = ROLE_BY_ID[role]?.label ?? role

  return (
    <>
      {isOpen && (
        <button
          className="drawer-overlay"
          onClick={onClose}
          aria-label="Close navigation menu"
        />
      )}
      <aside
        className={`sidebar${isOpen ? ' sidebar--open' : ''}`}
        aria-label="Main navigation"
      >
        <button
          className="sidebar__brand"
          onClick={() => onNavigate('dashboard')}
        >
          <img src={logo} alt="Campus Sync logo" />
          Campus Sync
        </button>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === currentPage
            return (
              <button
                key={item.id}
                className={`nav-item${isActive ? ' nav-item--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onNavigate(item.id)}
              >
                <Icon name={item.icon} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__role">
            <span>Signed in as</span>
            <span className="badge">{roleLabel}</span>
          </div>
          <button className="btn btn--secondary" onClick={onLogout}>
            <Icon name="logout" size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}