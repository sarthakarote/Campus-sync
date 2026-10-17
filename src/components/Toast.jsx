/* Confirmation or error toast. Rendered top right (top centre on mobile),
   announces with role="status" and dismisses itself after 4 seconds. */

import { useEffect } from 'react'

export default function Toast({ message, kind = 'success', onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className={`toast toast--${kind}`} role="status">
      {message}
    </div>
  )
}