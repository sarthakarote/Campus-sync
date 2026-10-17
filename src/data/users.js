/* One fictional mock user per demo role. Fictional names only; no real
   student data. Ownership checks compare against these ids. */

export const mockUsers = {
  student: {
    id: 'usr-student',
    name: 'Aarav Patil',
    role: 'student',
    department: 'Computer Engineering',
    year: 'SE',
  },
  senior: {
    id: 'usr-senior',
    name: 'Riya Deshmukh',
    role: 'senior',
    department: 'Information Technology',
    year: 'TE',
  },
  faculty: {
    id: 'usr-faculty',
    name: 'Prof. Kulkarni',
    role: 'faculty',
    department: 'Computer Engineering',
    year: 'Faculty',
  },
  principal: {
    id: 'usr-principal',
    name: "Principal's Office",
    role: 'principal',
    department: 'Administration',
    year: '',
  },
}

export function getUserForRole(roleId) {
  return mockUsers[roleId] ?? null
}