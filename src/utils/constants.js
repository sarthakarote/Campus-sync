/* App-wide constants: storage keys, fixed dropdown lists, roles, statuses
   and navigation. Fixed lists live here so seed data and forms share them. */

export const STORAGE_PREFIX = 'campusSync.v1.'

export const storageKey = (name) => `${STORAGE_PREFIX}${name}`

export const KEY_COMPLAINTS = storageKey('complaints')
export const KEY_LISTINGS = storageKey('listings')
export const KEY_REPORTS = storageKey('reports')
export const KEY_REQUESTS = storageKey('requests')
export const KEY_VOTED_IDS = storageKey('votedIds')
export const KEY_ROLE = storageKey('role')
export const KEY_CART = storageKey('cart')
export const KEY_THEME = storageKey('theme')
export const KEY_QUEUES = storageKey('queues')
export const KEY_MY_TICKETS = storageKey('myTickets')

export const USERS_KEY = storageKey('users')

/* Backend contract: used only when the mock flag is flipped (section 14). */
export const API_BASE_URL = 'http://localhost:8080/api'
export const USE_MOCK = true

/* Demo roles */
export const ROLES = [
  {
    id: 'student',
    label: 'Student',
    userId: 'usr-student',
    persona: 'Aarav Patil, SE Computer',
  },
  {
    id: 'senior',
    label: 'Senior',
    userId: 'usr-senior',
    persona: 'Riya Deshmukh, TE IT - Coding Club lead',
  },
  {
    id: 'faculty',
    label: 'Faculty / HOD',
    userId: 'usr-faculty',
    persona: 'Prof. Kulkarni, Computer Dept.',
  },
  {
    id: 'principal',
    label: 'Principal / Admin',
    userId: 'usr-principal',
    persona: "Principal's office",
  },
]

export const ROLE_BY_ID = Object.fromEntries(ROLES.map((r) => [r.id, r]))

/* Sidebar navigation */
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'complaints', label: 'Complaints', icon: 'flag' },
  { id: 'mart', label: 'Campus Mart', icon: 'tag' },
  { id: 'lostfound', label: 'Lost and Found', icon: 'magnifier' },
  { id: 'queues', label: 'Campus Queues', icon: 'clock' },
  { id: 'seniors', label: 'Seniors', icon: 'users' },
  { id: 'profile', label: 'Profile / Settings', icon: 'sliders' },
]

export const PAGE_LABELS = {
  ...Object.fromEntries(NAV_ITEMS.map((item) => [item.id, item.label])),
  cart: 'Your Cart',
}

/* Dashboard tiles */
export const ROLE_LABELS = Object.fromEntries(ROLES.map((r) => [r.id, r.label]))

/* Complaints */
export const COMPLAINT_CATEGORIES = [
  'Infrastructure',
  'Wi-Fi / Network',
  'Laboratory',
  'Classroom',
  'Hostel',
  'Canteen',
  'Other',
]

export const COMPLAINT_PRIORITIES = ['Low', 'Medium', 'High']

export const COMPLAINT_STATUSES = [
  'Submitted',
  'Under Review',
  'In Progress',
  'Escalated',
  'Resolved',
]

export const ESCALATION_STAGES = ['Seniors', 'Faculty', 'HOD', 'Principal']

/* College Mart */
export const MART_CATEGORIES = [
  'Drafters',
  'Calculators',
  'Textbooks',
  'Lab Equipment',
  'Stationery',
  'Snacks',
  'Merchandise',
  'Other',
]

export const CONDITIONS = ['New', 'Like New', 'Good', 'Fair']

export const ITEM_STATUSES = ['Available', 'Sold']

/* Lost and Found */
export const REPORT_TYPES = ['Lost', 'Found']

export const REPORT_CATEGORIES = [
  'Electronics',
  'ID/Cards',
  'Books',
  'Accessories',
  'Clothing',
  'Other',
]

export const LOCATIONS = [
  'Main Gate',
  'Library',
  'Canteen',
  'Computer Lab',
  'Classroom Block',
  'Ground',
  'Other',
]

export const REPORT_STATUSES = ['Open', 'Resolved']

/* Seniors */
export const SENIOR_DOMAINS = [
  'Web Development',
  'DSA and Competitive Programming',
  'Embedded and IoT',
  'AI and ML',
  'Core Engineering',
  'Placements',
]

export const CLUBS = [
  'Coding Club',
  'Robotics Club',
  'Cultural Committee',
  'Entrepreneurship Cell',
]

export const REQUEST_STATUSES = ['Pending', 'Accepted', 'Declined']

/* Complaint record id prefix used for generated ids, e.g. cmp-1731500000000 */
export const ID_PREFIXES = {
  complaint: 'cmp',
  listing: 'itm',
  report: 'rep',
  request: 'req',
  event: 'evt',
  senior: 'snr',
}