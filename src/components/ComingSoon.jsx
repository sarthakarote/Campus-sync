/* Stand-in page for module pages that arrive in later phases, so every
   sidebar link opens a real page from Phase 1 on. */

import PageHeader from './PageHeader.jsx'

export default function ComingSoon({ title, subtitle, onNavigate }) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="card coming-soon__body">
        <p>
          This module is built in a later phase. The page and its navigation
          are already wired up.
        </p>
        <button
          className="btn btn--secondary"
          onClick={() => onNavigate('dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </>
  )
}