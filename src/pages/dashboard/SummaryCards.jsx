/* Principal / Admin summary cards (DB-08, P1): total, open, escalated and
   resolved complaints computed from the complaint service. Zero values show
   as 0. */

import { useEffect, useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import { getComplaints } from '../../services/complaintService.js'

export default function SummaryCards() {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    getComplaints().then((list) => {
      setSummary({
        total: list.length,
        open: list.filter((c) => c.status !== 'Resolved').length,
        escalated: list.filter(
          (c) => c.status === 'Escalated' || c.stage === 'Principal',
        ).length,
        resolved: list.filter((c) => c.status === 'Resolved').length,
      })
    })
  }, [])

  if (summary === null) return <LoadingSpinner text="Loading summary.." />

  return (
    <div className="summary-grid">
      {[
        ['Total complaints', summary.total],
        ['Open', summary.open],
        ['Escalated', summary.escalated],
        ['Resolved', summary.resolved],
      ].map(([label, value]) => (
        <div className="card summary-card" key={label}>
          <p className="summary-card__number">{value}</p>
          <p className="summary-card__label">{label}</p>
        </div>
      ))}
    </div>
  )
}