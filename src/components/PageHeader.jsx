/* Page title, subtitle and an optional action button. Renders the single h1
   on each page. */

export default function PageHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      {actionLabel && onAction && (
        <button className="btn btn--primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}