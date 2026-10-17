/* Seniors coordination: a directory of senior student mentors with a search
   box, plus upcoming club events. Read-only seed data. */

import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { formatDate } from '../utils/formatters.js'
import { getEvents, getSeniors } from '../services/seniorService.js'

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function SeniorsPage() {
  const [seniors, setSeniors] = useState(null)
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getSeniors().then(setSeniors)
    getEvents().then((list) =>
      setEvents(
        [...list].sort((a, b) => new Date(a.date) - new Date(b.date)),
      ),
    )
  }, [])

  const visible = useMemo(() => {
    if (!seniors) return null
    const query = search.trim().toLowerCase()
    if (!query) return seniors
    return seniors.filter((senior) =>
      [senior.name, senior.domain, senior.department, ...senior.expertise]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [seniors, search])

  return (
    <>
      <PageHeader
        title="Seniors"
        subtitle="Reach out to senior mentors and keep up with club events."
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        label="Find a mentor by name, domain or skill"
      />

      {visible === null ? (
        <LoadingSpinner text="Loading mentors.." />
      ) : visible.length === 0 ? (
        <EmptyState message="No mentors match your search." />
      ) : (
        <ul className="senior-grid">
          {visible.map((senior) => (
            <li className="card senior-card" key={senior.id}>
              <div className="senior-card__head">
                <span className="senior-card__avatar" aria-hidden="true">
                  {initials(senior.name)}
                </span>
                <div>
                  <h3 className="senior-card__name">{senior.name}</h3>
                  <p className="senior-card__meta">
                    {senior.department} · {senior.year}
                  </p>
                </div>
              </div>
              <p className="badge">{senior.domain}</p>
              <p className="senior-card__bio">{senior.bio}</p>
              <p className="senior-card__skills">
                {senior.expertise.join(' · ')}
              </p>
            </li>
          ))}
        </ul>
      )}

      {events.length > 0 && (
        <section className="senior-events">
          <h2 className="dashboard__section-title">Upcoming events</h2>
          <ul className="event-list">
            {events.map((event) => (
              <li className="card event-card" key={event.id}>
                <div>
                  <h3 className="event-card__title">{event.title}</h3>
                  <p className="event-card__meta">
                    {event.club} · {event.venue}
                  </p>
                </div>
                <span className="event-card__date">{formatDate(event.date)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
