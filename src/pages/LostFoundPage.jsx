/* Lost and Found: a card grid of lost and found items with a Claim button,
   plus a short form to post a new report. */

import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState.jsx'
import FormField from '../components/FormField.jsx'
import Icon from '../components/Icon.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SearchBar from '../components/SearchBar.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import {
  LOCATIONS,
  REPORT_CATEGORIES,
  REPORT_TYPES,
} from '../utils/constants.js'
import { formatDate } from '../utils/formatters.js'
import {
  claimReport,
  createReport,
  getReports,
} from '../services/lostFoundService.js'
import {
  validateDescription,
  validateItemName,
  validateSelect,
} from '../utils/validators.js'

const EMPTY_FORM = {
  type: '',
  itemName: '',
  category: '',
  location: '',
  description: '',
}

export default function LostFoundPage({ currentUser, showToast }) {
  const [reports, setReports] = useState(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getReports().then((list) =>
      setReports(
        [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      ),
    )
  }, [])

  const setField = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const visible = useMemo(() => {
    if (!reports) return null
    const query = search.trim().toLowerCase()
    return reports.filter((report) => {
      const matchesType =
        typeFilter === 'All' || report.type === typeFilter
      const matchesQuery =
        !query ||
        report.itemName.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query)
      return matchesType && matchesQuery
    })
  }, [reports, search, typeFilter])

  const handleClaim = async (report) => {
    const updated = await claimReport(report.id)
    if (updated) {
      setReports((prev) =>
        prev.map((entry) => (entry.id === updated.id ? updated : entry)),
      )
      showToast?.(`Claim requested for "${report.itemName}"`)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {
      type: validateSelect(form.type, 'type'),
      itemName: validateItemName(form.itemName),
      category: validateSelect(form.category, 'category'),
      location: validateSelect(form.location, 'location'),
      description: validateDescription(form.description),
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setSubmitting(true)
    const created = await createReport({
      type: form.type,
      itemName: form.itemName.trim(),
      category: form.category,
      location: form.location,
      description: form.description.trim(),
      date: new Date().toISOString(),
      image: '',
      authorId: currentUser?.id ?? 'usr-student',
      contact: {
        name: currentUser?.name ?? 'Student',
        email: 'student@example.com',
      },
    })
    setReports((prev) => [created, ...prev])
    setForm(EMPTY_FORM)
    setSubmitting(false)
    setFormOpen(false)
    showToast?.('Report posted')
  }

  return (
    <>
      <PageHeader
        title="Lost and Found"
        subtitle="Post lost belongings or claim an item someone else found."
        actionLabel={formOpen ? 'Close form' : 'Report an item'}
        onAction={() => setFormOpen((open) => !open)}
      />

      {formOpen && (
        <form className="card report-form" onSubmit={handleSubmit} noValidate>
          <h2 className="card__title">New report</h2>
          <div className="report-form__grid">
            <FormField
              label="Type"
              name="report-type"
              type="select"
              options={REPORT_TYPES}
              value={form.type}
              onChange={setField('type')}
              error={errors.type}
              required
            />
            <FormField
              label="Item name"
              name="report-item"
              value={form.itemName}
              onChange={setField('itemName')}
              error={errors.itemName}
              required
            />
            <FormField
              label="Category"
              name="report-category"
              type="select"
              options={REPORT_CATEGORIES}
              value={form.category}
              onChange={setField('category')}
              error={errors.category}
              required
            />
            <FormField
              label="Location"
              name="report-location"
              type="select"
              options={LOCATIONS}
              value={form.location}
              onChange={setField('location')}
              error={errors.location}
              required
            />
          </div>
          <FormField
            label="Description"
            name="report-description"
            type="textarea"
            value={form.description}
            onChange={setField('description')}
            error={errors.description}
            required
          />
          <div className="settings-actions">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={submitting}
            >
              {submitting ? 'Posting…' : 'Post report'}
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="lf-toolbar">
        <SearchBar value={search} onChange={setSearch} label="Search items" />
        <div className="complaints-tabs" role="tablist" aria-label="Filter by type">
          {['All', 'Lost', 'Found'].map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={typeFilter === tab}
              className={`chip${typeFilter === tab ? ' chip--active' : ''}`}
              onClick={() => setTypeFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {visible === null ? (
        <LoadingSpinner text="Loading reports.." />
      ) : visible.length === 0 ? (
        <EmptyState message="No items match your search." />
      ) : (
        <ul className="lf-grid">
          {visible.map((report) => {
            const claimed = report.status === 'Resolved'
            return (
              <li className="lf-card" key={report.id}>
                {report.image && (
                  <img
                    className="lf-card__image"
                    src={report.image}
                    alt={report.itemName}
                    loading="lazy"
                  />
                )}
                <div className="lf-card__body">
                  <div className="lf-card__head">
                    <h3 className="lf-card__title">{report.itemName}</h3>
                    <StatusBadge status={report.type} />
                  </div>
                  <p className="lf-card__text">{report.description}</p>
                  <div className="lf-card__meta">
                    <span className="badge">{report.category}</span>
                    <span>{report.location}</span>
                    <span>{formatDate(report.date)}</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn--primary lf-card__button"
                    disabled={claimed}
                    onClick={() => handleClaim(report)}
                  >
                    <Icon name={claimed ? 'check' : 'flag'} size={18} />
                    {claimed ? 'Claimed' : 'Claim'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
