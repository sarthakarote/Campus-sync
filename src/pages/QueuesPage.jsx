/* Campus Queues: live counters for the canteen, concession pass desk and
   library. A timer advances each counter to simulate a real queue, and a
   student can join or leave a queue to get a token number. */

import { useEffect, useState } from 'react'
import Icon from '../components/Icon.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import PageHeader from '../components/PageHeader.jsx'
import {
  getMyTickets,
  getQueues,
  joinQueue,
  leaveQueue,
  tickQueues,
} from '../services/queueService.js'

export default function QueuesPage({ showToast }) {
  const [queues, setQueues] = useState(null)
  const [tickets, setTickets] = useState(() => getMyTickets())

  useEffect(() => {
    getQueues().then(setQueues)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      tickQueues().then(setQueues)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleJoin = async (queue) => {
    const result = await joinQueue(queue.id)
    if (!result) return
    setQueues(result.queues)
    setTickets(result.tickets)
    if (result.ticket) {
      showToast?.(`Joined ${queue.name}. Your token is #${result.ticket.number}`)
    }
  }

  const handleLeave = async (queue) => {
    const result = await leaveQueue(queue.id)
    setTickets(result.tickets)
    showToast?.(`Left ${queue.name}`)
  }

  return (
    <>
      <PageHeader
        title="Campus Queues"
        subtitle="Check the live canteen and concession pass queues before you go."
      />

      {queues === null ? (
        <LoadingSpinner text="Loading queues.." />
      ) : (
        <ul className="queue-grid">
          {queues.map((queue) => {
            const ticket = tickets.find((entry) => entry.queueId === queue.id)
            const waiting = Math.max(0, queue.next - queue.current - 1)
            const position = ticket
              ? Math.max(0, ticket.number - queue.current)
              : null
            const waitMinutes = position ? position * queue.minutesPerPerson : 0
            const beingServed = ticket && queue.current >= ticket.number

            return (
              <li className="card queue-card" key={queue.id}>
                <div className="queue-card__head">
                  <span className="queue-card__icon">
                    <Icon name={queue.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="queue-card__title">{queue.name}</h3>
                    <p className="queue-card__location">{queue.location}</p>
                  </div>
                </div>

                <div className="queue-card__stats">
                  <div className="queue-stat">
                    <span className="queue-stat__value">
                      #{queue.current}
                    </span>
                    <span className="queue-stat__label">Now serving</span>
                  </div>
                  <div className="queue-stat">
                    <span className="queue-stat__value">{waiting}</span>
                    <span className="queue-stat__label">In queue</span>
                  </div>
                  <div className="queue-stat">
                    <span className="queue-stat__value">
                      ~{waiting * queue.minutesPerPerson}m
                    </span>
                    <span className="queue-stat__label">Est. wait</span>
                  </div>
                </div>

                <p className="queue-card__open">Open {queue.open}</p>

                {ticket ? (
                  <div className="queue-ticket">
                    <div className="queue-ticket__row">
                      <span>Your token</span>
                      <strong>#{ticket.number}</strong>
                    </div>
                    <div className="queue-ticket__row">
                      <span>{beingServed ? 'Status' : 'Ahead of you'}</span>
                      <strong>
                        {beingServed
                          ? "You're being served"
                          : `${position} · ~${waitMinutes}m`}
                      </strong>
                    </div>
                    <button
                      type="button"
                      className="btn btn--secondary queue-card__button"
                      onClick={() => handleLeave(queue)}
                    >
                      Leave queue
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn--primary queue-card__button"
                    onClick={() => handleJoin(queue)}
                  >
                    <Icon name="ticket" size={18} />
                    Join Queue
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
