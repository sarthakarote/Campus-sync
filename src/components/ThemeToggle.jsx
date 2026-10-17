/* Dark / light mode toggle. The button label and pressed state reflect the
   current theme so screen readers announce the action. */

import Icon from './Icon.jsx'

export default function ThemeToggle({ theme, onToggle, className = '' }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className={`btn btn--secondary theme-toggle ${className}`.trim()}
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={18} />
      <span className="theme-toggle__label">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}
