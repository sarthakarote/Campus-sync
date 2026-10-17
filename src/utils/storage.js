/* Safe localStorage wrapper. Every read is wrapped in try/catch. If a key is
   missing, holds invalid JSON or a wrong type, the service reseeds silently.
   If localStorage is unavailable the data is kept in memory for the session. */

import { STORAGE_PREFIX } from './constants.js'

let memoryStore = new Map()
let storageWorks = null

function canUseLocalStorage() {
  if (storageWorks !== null) return storageWorks
  try {
    const probe = `${STORAGE_PREFIX}__probe__`
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    storageWorks = true
  } catch {
    storageWorks = false
  }
  return storageWorks
}

export function readStorage(key) {
  if (canUseLocalStorage()) {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return undefined
      return JSON.parse(raw)
    } catch {
      return undefined
    }
  }
  return memoryStore.has(key) ? memoryStore.get(key) : undefined
}

export function writeStorage(key, value) {
  if (canUseLocalStorage()) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      /* Quota full: keep the value for this session only. */
    }
  }
  memoryStore.set(key, value)
  return false
}

/* Reads an array under key; if it is missing or not an array it silently
   reseeds with the provided seed data. Used by mock services. */
export function readCollection(key, seed) {
  const stored = readStorage(key)
  if (Array.isArray(stored)) return stored
  writeStorage(key, seed)
  return seed
}

export function clearPrefix(prefix) {
  if (canUseLocalStorage()) {
    try {
      const keys = []
      for (let i = 0; i < window.localStorage.length; i += 1) {
        keys.push(window.localStorage.key(i))
      }
      keys.forEach((key) => {
        if (key.startsWith(prefix)) window.localStorage.removeItem(key)
      })
    } catch {
      /* ignore single key errors */
    }
  }
  memoryStore.clear()
}

/* Removes every Campus Sync key and lets services reseed on next read. */
export function clearDemoData() {
  clearPrefix(STORAGE_PREFIX)
}

/* Message shown when changes cannot be persisted after refresh. */
export function persistenceWarning() {
  return canUseLocalStorage()
    ? ''
    : 'Changes will not be saved after refresh.'
}