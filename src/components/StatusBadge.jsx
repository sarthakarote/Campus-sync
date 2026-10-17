/* Status badge. The text label is always shown; the colour only reinforces
   it. Pairs follow the design system table in section 8. */

const COLORS = {
  Submitted: { bg: '#E5E7EB', text: '#374151' },
  'Under Review': { bg: '#DBEAFE', text: '#1E40AF' },
  'In Progress': { bg: '#FEF3C7', text: '#92400E' },
  Escalated: { bg: '#EDE9FE', text: '#5B21B6' },
  Resolved: { bg: '#DCFCE7', text: '#166534' },
  Available: { bg: '#DCFCE7', text: '#166534' },
  Sold: { bg: '#E5E7EB', text: '#374151' },
  Lost: { bg: '#FEE2E2', text: '#991B1B' },
  Found: { bg: '#DCFCE7', text: '#166534' },
  Open: { bg: '#DBEAFE', text: '#1E40AF' },
  Pending: { bg: '#FEF3C7', text: '#92400E' },
  Accepted: { bg: '#DCFCE7', text: '#166534' },
  Declined: { bg: '#FEE2E2', text: '#991B1B' },
}

export default function StatusBadge({ status }) {
  const color = COLORS[status] ?? COLORS.Submitted
  return (
    <span className="badge" style={{ background: color.bg, color: color.text }}>
      {status}
    </span>
  )
}