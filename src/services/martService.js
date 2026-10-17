/* College Mart service. Future endpoint:
   GET /api/listings?q=&category=&minPrice=&maxPrice=&condition=&sort= */

import { items as seedItems } from '../data/items.js'
import { KEY_LISTINGS } from '../utils/constants.js'
import { readCollection, writeStorage } from '../utils/storage.js'

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getListings() {
  await wait()
  return readCollection(KEY_LISTINGS, seedItems)
}

export async function createListing(data) {
  await wait()
  const list = readCollection(KEY_LISTINGS, seedItems)
  const listing = {
    id: `itm-${Date.now()}`,
    ...data,
    status: 'Available',
    createdAt: new Date().toISOString(),
  }
  writeStorage(KEY_LISTINGS, [listing, ...list])
  return listing
}