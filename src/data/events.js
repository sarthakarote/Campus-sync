/* Seed club and peer-learning events. Dates are relative to now so the
   "soonest first" sorting stays realistic during a demo. */

const daysFromNow = (days, hourOffset = 0) => {
  const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  date.setHours(date.getHours() + (hourOffset || 0))
  return date.toISOString()
}

export const events = [
  {
    id: 'evt-1',
    title: 'React Basics Workshop',
    club: 'Coding Club',
    date: daysFromNow(5, 2),
    venue: 'Computer Lab 3',
  },
  {
    id: 'evt-2',
    title: 'DSA Practice Hour',
    club: 'Coding Club',
    date: daysFromNow(2, 6),
    venue: 'Classroom Block B',
  },
  {
    id: 'evt-3',
    title: 'Robotics Hack Night',
    club: 'Robotics Club',
    date: daysFromNow(1, 3),
    venue: 'Innovation Lab',
  },
  {
    id: 'evt-4',
    title: 'Culture Fest Auditions',
    club: 'Cultural Committee',
    date: daysFromNow(8, 4),
    venue: 'Main Auditorium',
  },
  {
    id: 'evt-5',
    title: 'Startup Pitch Practice',
    club: 'Entrepreneurship Cell',
    date: daysFromNow(12, 5),
    venue: 'Seminar Hall',
  },
]