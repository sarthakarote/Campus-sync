/* Empty state message with an optional action button, used by every list
   and dashboard widget. */

export default function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div className="empty">
      <p className="empty__message">{message}</p>
      {actionLabel && onAction && (
        <button className="btn btn--secondary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}