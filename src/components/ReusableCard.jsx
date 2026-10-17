/* Border-card wrapper. The clickable variant renders as a real button so it
   stays keyboard reachable with a visible focus ring. Used by lists and
   dashboard widgets. */

export default function ReusableCard({
  title,
  image,
  imageAlt = '',
  onClick,
  children,
  footer,
}) {
  const className = onClick ? 'card card--clickable' : 'card'

  if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        {image && (
          <img className="card__image" src={image} alt={imageAlt} loading="lazy" />
        )}
        {title && <span className="card__title">{title}</span>}
        {children}
        {footer}
      </button>
    )
  }

  return (
    <div className={className}>
      {image && (
        <img className="card__image" src={image} alt={imageAlt} loading="lazy" />
      )}
      {title && <h3 className="card__title">{title}</h3>}
      {children}
      {footer}
    </div>
  )
}