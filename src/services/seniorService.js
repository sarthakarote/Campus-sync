/* Seniors service. The directory and events are read-only seed data.
   Future endpoint: GET /api/seniors?q=&domain=&club=&interest=,
   GET /api/events?club= */

import { events as seedEvents } from '../data/events.js'
import { seniors as seedSeniors } from '../data/seniors.js'

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getSeniors() {
  await wait()
  return seedSeniors
}

export async function getSeniorById(id) {
  await wait()
  return seedSeniors.find((senior) => senior.id === id) ?? null
}

export async function getEvents() {
  await wait()
  return seedEvents
}