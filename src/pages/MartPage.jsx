/* Campus Mart: a responsive grid of student listings with a search box, a
   category filter and an "Add to Cart" button on every item. */

import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Icon from '../components/Icon.jsx'
import { MART_CATEGORIES } from '../utils/constants.js'
import { formatRupees } from '../utils/formatters.js'
import { getListings } from '../services/martService.js'

export default function MartPage({ cart = [], onAddToCart, onNavigate }) {
  const [listings, setListings] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    getListings().then((list) =>
      setListings(
        [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      ),
    )
  }, [])

  const cartCount = cart.reduce((total, entry) => total + entry.qty, 0)
  const cartTotal = cart.reduce(
    (total, entry) => total + entry.price * entry.qty,
    0,
  )

  const visible = useMemo(() => {
    if (!listings) return null
    const query = search.trim().toLowerCase()
    return listings.filter((item) => {
      const matchesCategory =
        category === 'All' || item.category === category
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      return matchesCategory && matchesQuery
    })
  }, [listings, search, category])

  return (
    <>
      <PageHeader
        title="Campus Mart"
        subtitle="Buy and sell stationery, snacks, books and campus merchandise."
      />

      {cartCount > 0 && (
        <div className="cart-bar">
          <span>
            <Icon name="cart" size={18} /> {cartCount} item
            {cartCount > 1 ? 's' : ''} in cart
          </span>
          <strong>{formatRupees(cartTotal)}</strong>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => onNavigate('cart')}
          >
            View Cart
          </button>
        </div>
      )}

      <div className="mart-toolbar">
        <SearchBar
          value={search}
          onChange={setSearch}
          label="Search the mart"
        />
        <div className="field">
          <label className="field__label" htmlFor="mart-category">
            Category
          </label>
          <select
            id="mart-category"
            className="field__control"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="All">All categories</option>
            {MART_CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {visible === null ? (
        <LoadingSpinner text="Loading listings.." />
      ) : visible.length === 0 ? (
        <EmptyState message="No items match your search." />
      ) : (
        <ul className="product-grid">
          {visible.map((item) => {
            const sold = item.status === 'Sold'
            return (
              <li className="product-card" key={item.id}>
                {item.image && (
                  <img
                    className="product-card__image"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                )}
                <div className="product-card__body">
                  <div className="product-card__head">
                    <h3 className="product-card__title">{item.title}</h3>
                    {sold && <span className="badge">Sold</span>}
                  </div>
                  <p className="product-card__meta">
                    {item.category} · {item.condition}
                  </p>
                  <p className="product-card__price">
                    {formatRupees(item.price)}
                  </p>
                  <button
                    type="button"
                    className="btn btn--primary product-card__button"
                    disabled={sold}
                    onClick={() => onAddToCart?.(item)}
                  >
                    <Icon name="cart" size={18} />
                    {sold ? 'Sold out' : 'Add to Cart'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
