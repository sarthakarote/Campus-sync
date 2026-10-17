/* Lost and Found service. Future endpoint:
   GET /api/reports?q=&type=&category=&location= */

import { reports as seedReports } from '../data/reports.js'
import { KEY_REPORTS } from '../utils/constants.js'
import { readCollection, writeStorage } from '../utils/storage.js'

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getReports() {
  await wait()
  return readCollection(KEY_REPORTS, seedReports)
}

export async function createReport(data) {
  await wait()
  const list = readCollection(KEY_REPORTS, seedReports)
  const report = {
    id: `rep-${Date.now()}`,
    ...data,
    status: 'Open',
    createdAt: new Date().toISOString(),
  }
  writeStorage(KEY_REPORTS, [report, ...list])
  return report
}

/* Marks a report resolved once someone has claimed (or reclaimed) it. */
export async function claimReport(id) {
  await wait()
  const list = readCollection(KEY_REPORTS, seedReports)
  const updated = list.map((report) =>
    report.id === id ? { ...report, status: 'Resolved' } : report,
  )
  writeStorage(KEY_REPORTS, updated)
  return updated.find((report) => report.id === id) ?? null
}