/* Seed complaints for the Grievance Desk. Stages follow the order Seniors,
   Faculty, HOD, Principal. Dates are relative to now so "newest first" stays
   meaningful during a demo. */

import itemPlaceholder from '../assets/item-placeholder.svg'

const hoursAgo = (hours) =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()

export const complaints = [
  {
    id: 'cmp-6',
    title: 'Projector in Hall B is too dim to read',
    description:
      'The projector in Hall B shows a faint image even with the blinds closed. Slides are unreadable past the third row.',
    category: 'Classroom',
    priority: 'Low',
    status: 'Resolved',
    stage: 'Principal',
    authority: 'Principal',
    votes: 17,
    image: null,
    createdAt: hoursAgo(220),
    updates: [
      {
        id: 'cmp-6-u1',
        author: 'Prof. Kulkarni',
        role: 'Faculty',
        text: 'A new bulb was requested from stores last week.',
        createdAt: hoursAgo(210),
      },
      {
        id: 'cmp-6-u2',
        author: "Principal's Office",
        role: 'Principal',
        text: 'Replaced the projector bulb. Issue resolved.',
        createdAt: hoursAgo(190),
      },
    ],
  },
  {
    id: 'cmp-1',
    title: 'Ceiling fan broken in Room 304',
    description:
      'The second ceiling fan in Room 304 has not worked for a week. Afternoon lectures in this room get very uncomfortable.',
    category: 'Infrastructure',
    priority: 'Medium',
    status: 'In Progress',
    stage: 'Faculty',
    authority: 'Faculty',
    votes: 12,
    image: null,
    createdAt: hoursAgo(140),
    updates: [
      {
        id: 'cmp-1-u1',
        author: 'Prof. Kulkarni',
        role: 'Faculty',
        text: 'Damage noted. Maintenance request filed for Room 304.',
        createdAt: hoursAgo(130),
      },
    ],
  },
  {
    id: 'cmp-2',
    title: 'Library Wi-Fi keeps disconnecting',
    description:
      'The library Wi-Fi drops every few minutes on all floors. VPN access and journal downloads are almost impossible.',
    category: 'Wi-Fi / Network',
    priority: 'High',
    status: 'Escalated',
    stage: 'Principal',
    authority: 'Principal',
    votes: 34,
    image: itemPlaceholder,
    createdAt: hoursAgo(30),
    updates: [
      {
        id: 'cmp-2-u1',
        author: 'Aarav Patil',
        role: 'Student',
        text: 'Happens with every device, laptop and phone.',
        createdAt: hoursAgo(28),
      },
      {
        id: 'cmp-2-u2',
        author: 'Riya Deshmukh',
        role: 'Senior',
        text: 'Repeated in all three reading halls this morning.',
        createdAt: hoursAgo(20),
      },
    ],
  },
  {
    id: 'cmp-3',
    title: 'Lab PC 12 monitor flickers constantly',
    description:
      'The monitor on PC 12 in Lab 2 flickers and occasionally goes black for a few seconds during practicals.',
    category: 'Laboratory',
    priority: 'Medium',
    status: 'Under Review',
    stage: 'Seniors',
    authority: 'Seniors',
    votes: 3,
    image: itemPlaceholder,
    createdAt: hoursAgo(12),
    updates: [],
  },
  {
    id: 'cmp-4',
    title: 'Rice in the thali is often undercooked',
    description:
      'The afternoon thali at the campus canteen has undercooked rice on most days. Students waste a lot of food.',
    category: 'Canteen',
    priority: 'Medium',
    status: 'In Progress',
    stage: 'HOD',
    authority: 'HOD',
    votes: 9,
    image: null,
    createdAt: hoursAgo(72),
    updates: [
      {
        id: 'cmp-4-u1',
        author: 'Prof. Kulkarni',
        role: 'Faculty',
        text: 'Forwarded to the hostel and canteen committee for review.',
        createdAt: hoursAgo(60),
      },
    ],
  },
  {
    id: 'cmp-5',
    title: 'Hot water not working in Hostel Block C',
    description:
      'There is no hot water in the morning showers of Hostel Block C. It has been cold for the last three days.',
    category: 'Hostel',
    priority: 'High',
    status: 'Submitted',
    stage: 'Seniors',
    authority: 'Seniors',
    votes: 0,
    image: null,
    createdAt: hoursAgo(48),
    updates: [],
  },
  {
    id: 'cmp-7',
    title: 'Three benches broken in Classroom Block A',
    description:
      'Three benches on the ground floor of Classroom Block A are unstable and one collapsed during a lecture.',
    category: 'Infrastructure',
    priority: 'Medium',
    status: 'In Progress',
    stage: 'Faculty',
    authority: 'Faculty',
    votes: 5,
    image: null,
    createdAt: hoursAgo(96),
    updates: [],
  },
  {
    id: 'cmp-8',
    title: 'Guest Wi-Fi password sheet is outdated',
    description:
      'The printed guest Wi-Fi password at the reception desk does not work. Visitors cannot log in.',
    category: 'Wi-Fi / Network',
    priority: 'Low',
    status: 'Under Review',
    stage: 'Faculty',
    authority: 'Faculty',
    votes: 2,
    image: null,
    createdAt: hoursAgo(170),
    updates: [],
  },
]