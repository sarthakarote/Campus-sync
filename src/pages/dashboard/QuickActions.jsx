/* Dashboard quick actions (DB-07). Each button deep-links to a module page in
   one click. */

export default function QuickActions({ onNavigate }) {
  return (
    <div className="quick-actions">
      <button
        className="card card--clickable"
        onClick={() => onNavigate('complaints')}
      >
        <span className="card__title">New Complaint</span>
        <span className="card__row">Report a campus issue</span>
      </button>
      <button
        className="card card--clickable"
        onClick={() => onNavigate('mart')}
      >
        <span className="card__title">List an Item</span>
        <span className="card__row">Sell on the College Mart</span>
      </button>
      <button
        className="card card--clickable"
        onClick={() => onNavigate('lostfound')}
      >
        <span className="card__title">Report Item</span>
        <span className="card__row">Post a lost or found item</span>
      </button>
      <button
        className="card card--clickable"
        onClick={() => onNavigate('queues')}
      >
        <span className="card__title">Join a Queue</span>
        <span className="card__row">Canteen and concession passes</span>
      </button>
      <button
        className="card card--clickable"
        onClick={() => onNavigate('seniors')}
      >
        <span className="card__title">Find a Mentor</span>
        <span className="card__row">Explore seniors and events</span>
      </button>
    </div>
  )
}