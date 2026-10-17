/* Complaint service. Every function returns a Promise and uses only the
   storage wrapper, so the body can later be replaced with request(..) calls.
   Future endpoint: GET /api/complaints?category=&status=&priority=&sort=&q= */

import { complaints as seedComplaints } from '../data/complaints.js'
import { KEY_COMPLAINTS } from '../utils/constants.js'
import { readCollection, writeStorage } from '../utils/storage.js'

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getComplaints() {
  await wait()
  return readCollection(KEY_COMPLAINTS, seedComplaints)
}

export async function getComplaintById(id) {
  await wait()
  const list = readCollection(KEY_COMPLAINTS, seedComplaints)
  return list.find((complaint) => complaint.id === id) ?? null
}

export async function createComplaint(data) {
  await wait()
  const list = readCollection(KEY_COMPLAINTS, seedComplaints)
  const complaint = {
    id: `cmp-${Date.now()}`,
    ...data,
    status: 'Pending',
    stage: 'Seniors',
    authority: 'Seniors',
    votes: 0,
    updates: [],
    createdAt: new Date().toISOString(),
  }
  writeStorage(KEY_COMPLAINTS, [complaint, ...list])
  return complaint
}