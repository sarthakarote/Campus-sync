/* The only custom hook. Persists a value to localStorage through the safe
   storage wrapper, used by App to remember the selected demo role. */

import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from './storage.js'

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = readStorage(key)
    return stored === undefined || stored === null ? initial : stored
  })

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  return [value, setValue]
}