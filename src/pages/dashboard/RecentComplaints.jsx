/* Dashboard widget: the three newest complaints with title, status badge and
   vote count (DB-03). Empty state offers a New Complaint button. */

import { useEffect, useState } from 'react'
import EmptyState from '../../components/EmptyState.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ReusableCard from '../../components/ReusableCard.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import { getComplaints } from '../../services/complaintService.js'
import { complaintStatusLabel } from '../../utils/formatters.js'

export default function RecentComplaints({ onNavigate }) {
  const [complaints, setComplaints] = useState(null)

  useEffect(() => {
    getComplaints().then((list) =>
      setComplaints(
        [...list]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3),
      ),
    )
  }, [])

  if (complaints === null) return <LoadingSpinner text="Loading complaints.." />

  if (complaints.length === 0) {
    return (
      <EmptyState
        message="No complaints have been submitted yet."
        actionLabel="New Complaint"
        onAction={() => onNavigate('complaints')}
      />
    )
  }

  return (
    <div className="widget-list">
      {complaints.map((complaint) => (
        <ReusableCard
          key={complaint.id}
          title={complaint.title}
          onClick={() => onNavigate('complaints')}
          footer={
            <span className="card__row">
              <StatusBadge status={complaintStatusLabel(complaint.status)} />
              <span aria-label={`${complaint.votes} votes`}>
                {complaint.votes} votes
              </span>
            </span>
          }
        />
      ))}
    </div>
  )
}