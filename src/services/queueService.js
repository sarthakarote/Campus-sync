/* Campus Queues service. Counters and the caller's tickets live in the same
   storage wrapper as the other modules, so a future backend can replace each
   function with an API call. Everything returns a Promise. */

import { queues as seedQueues } from '../data/queues.js'
import { KEY_MY_TICKETS, KEY_QUEUES } from '../utils/constants.js'
import { readCollection, readStorage, writeStorage } from '../utils/storage.js'

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getQueues() {
  await wait()
  return readCollection(KEY_QUEUES, seedQueues)
}

/* Tickets are read synchronously because they are shown immediately. */
export function getMyTickets() {
  const stored = readStorage(KEY_MY_TICKETS)
  return Array.isArray(stored) ? stored : []
}

function readQueues() {
  return readCollection(KEY_QUEUES, seedQueues).map((queue) => ({ ...queue }))
}

/* Issues the next token to the caller and moves the counter's "next" forward. */
export async function joinQueue(queueId) {
  await wait()
  const list = readQueues()
  const queue = list.find((entry) => entry.id === queueId)
  if (!queue) return null

  const tickets = getMyTickets()
  if (tickets.some((ticket) => ticket.queueId === queueId)) {
    return { queues: list, tickets, ticket: null }
  }

  const ticket = {
    id: `tkt-${Date.now()}`,
    queueId,
    number: queue.next,
    joinedAt: new Date().toISOString(),
  }
  queue.next += 1
  const nextTickets = [...tickets, ticket]

  writeStorage(KEY_QUEUES, list)
  writeStorage(KEY_MY_TICKETS, nextTickets)
  return { queues: list, tickets: nextTickets, ticket }
}

/* Drops the caller's ticket for a queue. */
export async function leaveQueue(queueId) {
  await wait()
  const tickets = getMyTickets().filter((ticket) => ticket.queueId !== queueId)
  writeStorage(KEY_MY_TICKETS, tickets)
  return { tickets }
}

/* Live counter tick: occasionally moves "current" one step forward. */
export async function tickQueues() {
  const list = readQueues()
  list.forEach((queue) => {
    if (queue.current < queue.next - 1 && Math.random() < 0.6) {
      queue.current += 1
    }
  })
  writeStorage(KEY_QUEUES, list)
  return list
}
