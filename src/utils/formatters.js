/* Formatting helpers: rupee prices and readable dates. */

export function formatRupees(amount) {
  const number = Number(amount)
  if (!Number.isFinite(number)) return '₹0'
  return `₹${number.toLocaleString('en-IN')}`
}

export function formatDate(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/* Complaints collapse the internal workflow into two public states. */
export function complaintStatusLabel(status) {
  return status === 'Resolved' ? 'Resolved' : 'Pending'
}