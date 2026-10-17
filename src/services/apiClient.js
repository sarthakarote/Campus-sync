/* Future REST API client (section 14). Today the mock flag keeps every
   service reading localStorage; flipping USE_MOCK lets each service swap its
   body to request(..) calls one module at a time. */

import { API_BASE_URL } from '../utils/constants.js'

export default async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) {
    const error = new Error(`Request failed (${response.status})`)
    const body = await response.json().catch(() => ({}))
    error.message = body.message || error.message
    throw error
  }
  return response.json()
}