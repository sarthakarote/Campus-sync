/* Loading state shown while mock services wait 300 ms. */

export default function LoadingSpinner({ text = 'Loading..' }) {
  return (
    <div className="loading" role="status">
      <span className="loading__spinner" aria-hidden="true" />
      <span>{text}</span>
    </div>
  )
}