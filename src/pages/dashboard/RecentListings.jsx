/* Dashboard widget: the three newest Available listings with image, title and
   price (DB-05). Sold listings are excluded. */

import { useEffect, useState } from 'react'
import EmptyState from '../../components/EmptyState.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ReusableCard from '../../components/ReusableCard.jsx'
import { getListings } from '../../services/martService.js'
import { formatRupees } from '../../utils/formatters.js'

export default function RecentListings({ onNavigate }) {
  const [listings, setListings] = useState(null)

  useEffect(() => {
    getListings().then((list) =>
      setListings(
        list
          .filter((item) => item.status === 'Available')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3),
      ),
    )
  }, [])

  if (listings === null) return <LoadingSpinner text="Loading listings.." />

  if (listings.length === 0) {
    return (
      <EmptyState
        message="No items are listed in the marketplace yet."
        actionLabel="List an Item"
        onAction={() => onNavigate('mart')}
      />
    )
  }

  return (
    <div className="widget-list">
      {listings.map((item) => (
        <ReusableCard
          key={item.id}
          title={item.title}
          image={item.image}
          imageAlt={item.image ? item.title : ''}
          onClick={() => onNavigate('mart')}
          footer={
            <span className="card__row">
              <strong>{formatRupees(item.price)}</strong>
              <span>{item.sellerName}</span>
            </span>
          }
        />
      ))}
    </div>
  )
}