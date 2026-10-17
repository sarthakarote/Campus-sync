/* Complaints page: a form to raise an issue (text, category, details) and a
   list of every complaint with a Pending / Resolved status. */

import { useEffect, useState } from 'react'
import EmptyState from '../components/EmptyState.jsx'
import FormField from '../components/FormField.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import PageHeader from '../components/PageHeader.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import {
  COMPLAINT_CATEGORIES,
  COMPLAINT_PRIORITIES,
} from '../utils/constants.js'
import { complaintStatusLabel, formatDate } from '../utils/formatters.js'
import { createComplaint, getComplaints } from '../services/complaintService.js'
import {
  validateDescription,
  validateSelect,
  validateTitle,
} from '../utils/validators.js'

const EMPTY_FORM = { title: '', category: '', priority: 'Medium', description: '' }

export default function ComplaintsPage({ currentUser, showToast }) {
  const [complaints, setComplaints] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [filter, setFilter] = useState('All')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getComplaints().then((list) =>
      setComplaints(
        [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      ),
    )
  }, [])

  const setField = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {
      title: validateTitle(form.title),
      category: validateSelect(form.category, 'category'),
      description: validateDescription(form.description),
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setSubmitting(true)
    const created = await createComplaint({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      priority: form.priority,
      authorId: currentUser?.id ?? 'usr-student',
      authorName: currentUser?.name ?? 'Student',
      image: null,
    })
    setComplaints((prev) => [created, ...prev])
    setForm(EMPTY_FORM)
    setSubmitting(false)
    showToast?.('Complaint submitted')
  }

  const visible =
    complaints === null
      ? null
      : complaints.filter(
          (complaint) =>
            filter === 'All' ||
            complaintStatusLabel(complaint.status) === filter,
        )

  const pendingCount =
    complaints?.filter((c) => complaintStatusLabel(c.status) === 'Pending')
      .length ?? 0
  const resolvedCount =
    complaints?.filter((c) => complaintStatusLabel(c.status) === 'Resolved')
      .length ?? 0

  return (
    <>
      <PageHeader
        title="Complaints"
        subtitle="Raise a campus issue and track it until it is resolved."
      />

      <div className="complaints-layout">
        <form className="card complaint-form" onSubmit={handleSubmit} noValidate>
          <h2 className="card__title">New complaint</h2>

          <FormField
            label="Complaint title"
            name="complaint-title"
            value={form.title}
            onChange={setField('title')}
            error={errors.title}
            hint="A short summary, e.g. Broken fan in Room 304."
            required
          />

          <FormField
            label="Category"
            name="complaint-category"
            type="select"
            options={COMPLAINT_CATEGORIES}
            value={form.category}
            onChange={setField('category')}
            error={errors.category}
            required
          />

          <FormField
            label="Priority"
            name="complaint-priority"
            type="select"
            options={COMPLAINT_PRIORITIES}
            value={form.priority}
            onChange={setField('priority')}
          />

          <FormField
            label="Details"
            name="complaint-description"
            type="textarea"
            value={form.description}
            onChange={setField('description')}
            error={errors.description}
            required
          />

          <button
            type="submit"
            className="btn btn--primary"
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : 'Submit complaint'}
          </button>
        </form>

        <div className="complaints-list">
          <div className="complaints-list__head">
            <div className="complaints-tabs" role="tablist" aria-label="Filter complaints">
              {['All', 'Pending', 'Resolved'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab}
                  className={`chip${filter === tab ? ' chip--active' : ''}`}
                  onClick={() => setFilter(tab)}
                >
                  {tab}
                  {tab === 'Pending' && ` (${pendingCount})`}
                  {tab === 'Resolved' && ` (${resolvedCount})`}
                </button>
              ))}
            </div>
          </div>

          {visible === null ? (
            <LoadingSpinner text="Loading complaints.." />
          ) : visible.length === 0 ? (
            <EmptyState message="No complaints to show here yet." />
          ) : (
            <ul className="complaint-items">
              {visible.map((complaint) => (
                <li className="card complaint-item" key={complaint.id}>
                  <div className="complaint-item__head">
                    <h3 className="complaint-item__title">{complaint.title}</h3>
                    <StatusBadge
                      status={complaintStatusLabel(complaint.status)}
                    />
                  </div>
                  <p className="complaint-item__text">{complaint.description}</p>
                  <div className="complaint-item__meta">
                    <span className="badge">{complaint.category}</span>
                    <span>{formatDate(complaint.createdAt)}</span>
                    <span>Priority: {complaint.priority}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
