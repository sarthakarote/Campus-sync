/* Dashboard widget: the three newest Open reports with their Lost or Found tag
   (DB-06). Resolved reports are excluded. */

import { useEffect, useState } from 'react'
import EmptyState from '../../components/EmptyState.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ReusableCard from '../../components/ReusableCard.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import { getReports } from '../../services/lostFoundService.js'

export default function RecentReports({ onNavigate }) {
  const [reports, setReports] = useState(null)

  useEffect(() => {
    getReports().then((list) =>
      setReports(
        list
          .filter((report) => report.status === 'Open')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3),
      ),
    )
  }, [])

  if (reports === null) return <LoadingSpinner text="Loading reports.." />

  if (reports.length === 0) {
    return (
      <EmptyState
        message="No lost or found reports yet."
        actionLabel="Report an item"
        onAction={() => onNavigate('lostfound')}
      />
    )
  }

  return (
    <div className="widget-list">
      {reports.map((report) => (
        <ReusableCard
          key={report.id}
          title={report.itemName}
          onClick={() => onNavigate('lostfound')}
          footer={
            <span className="card__row">
              <StatusBadge status={report.type} />
              <span>{report.location}</span>
              <span>{report.category}</span>
            </span>
          }
        />
      ))}
    </div>
  )
}