/* Cart page: selected mart items with quantity controls and a running total. */

import EmptyState from '../components/EmptyState.jsx'
import Icon from '../components/Icon.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { formatRupees } from '../utils/formatters.js'

export default function CartPage({
  cart = [],
  onUpdateCartQty,
  onRemoveFromCart,
  onClearCart,
  onNavigate,
  showToast,
}) {
  const total = cart.reduce(
    (sum, entry) => sum + entry.price * entry.qty,
    0,
  )
  const itemCount = cart.reduce((sum, entry) => sum + entry.qty, 0)

  const handleCheckout = () => {
    showToast?.('Order placed — this is a demo checkout')
    onClearCart?.()
  }

  return (
    <>
      <PageHeader
        title="Your Cart"
        subtitle="Review your items before checking out."
      />

      {cart.length === 0 ? (
        <EmptyState
          message="Your cart is empty."
          actionLabel="Browse the Mart"
          onAction={() => onNavigate('mart')}
        />
      ) : (
        <div className="cart-layout">
          <ul className="cart-items">
            {cart.map((entry) => (
              <li className="cart-item" key={entry.id}>
                {entry.image && (
                  <img
                    className="cart-item__image"
                    src={entry.image}
                    alt={entry.title}
                  />
                )}
                <div className="cart-item__info">
                  <h3 className="cart-item__title">{entry.title}</h3>
                  <p className="cart-item__price">
                    {formatRupees(entry.price)} each
                  </p>
                </div>
                <div className="cart-item__qty" aria-label="Quantity">
                  <button
                    type="button"
                    className="btn btn--secondary cart-item__step"
                    onClick={() =>
                      onUpdateCartQty?.(entry.id, entry.qty - 1)
                    }
                    aria-label={`Decrease quantity of ${entry.title}`}
                  >
                    −
                  </button>
                  <span className="cart-item__qty-value">{entry.qty}</span>
                  <button
                    type="button"
                    className="btn btn--secondary cart-item__step"
                    onClick={() =>
                      onUpdateCartQty?.(entry.id, entry.qty + 1)
                    }
                    aria-label={`Increase quantity of ${entry.title}`}
                  >
                    +
                  </button>
                </div>
                <strong className="cart-item__line">
                  {formatRupees(entry.price * entry.qty)}
                </strong>
                <button
                  type="button"
                  className="btn btn--ghost cart-item__remove"
                  onClick={() => onRemoveFromCart?.(entry.id)}
                  aria-label={`Remove ${entry.title} from cart`}
                >
                  <Icon name="close" size={18} />
                </button>
              </li>
            ))}
          </ul>

          <aside className="card cart-summary">
            <h2 className="card__title">Order summary</h2>
            <div className="cart-summary__row">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>{formatRupees(total)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Pickup</span>
              <span>Free</span>
            </div>
            <div className="cart-summary__row cart-summary__total">
              <span>Total</span>
              <strong>{formatRupees(total)}</strong>
            </div>
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleCheckout}
            >
              Place order
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => onNavigate('mart')}
            >
              Continue shopping
            </button>
          </aside>
        </div>
      )}
    </>
  )
}
