/* Seed queue counters. "current" is the token being served right now and
   "next" is the next token that will be issued. The queues page advances
   "current" on a timer to simulate a live counter. */

export const queues = [
  {
    id: 'q-canteen',
    name: 'Canteen Counter',
    location: 'Main Canteen, Ground Floor',
    icon: 'store',
    current: 34,
    next: 41,
    minutesPerPerson: 2,
    open: '8:00 AM - 6:00 PM',
  },
  {
    id: 'q-concession',
    name: 'Concession Pass Counter',
    location: 'Admin Block, Room 12',
    icon: 'ticket',
    current: 12,
    next: 19,
    minutesPerPerson: 4,
    open: '10:00 AM - 4:00 PM',
  },
  {
    id: 'q-library',
    name: 'Library Help Desk',
    location: 'Central Library, Floor 1',
    icon: 'magnifier',
    current: 6,
    next: 12,
    minutesPerPerson: 3,
    open: '9:00 AM - 8:00 PM',
  },
]
