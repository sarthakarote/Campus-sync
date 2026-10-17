/* Login / Sign Up dialog. There is no backend yet, so the form validates the
   basic fields and then signs the visitor in as one of the demo roles. The
   role picker keeps every module populated with sample data. */

import { useState } from 'react'
import FormField from './FormField.jsx'
import Modal from './Modal.jsx'
import { ROLES } from '../utils/constants.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AuthModal({ mode, isOpen, onClose, onEnter }) {
  const isSignup = mode === 'signup'
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  })
  const [errors, setErrors] = useState({})

  const setField = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (isSignup && form.name.trim().length < 3) {
      nextErrors.name = 'Enter your full name'
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address'
    }
    if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    onEnter(form.role)
  }

  return (
    <Modal
      title={isSignup ? 'Create your account' : 'Log in to Campus Sync'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} noValidate>
        <p className="entry__notice">
          Demo only — any details work. Pick a role to explore the app with
          sample data.
        </p>

        {isSignup && (
          <FormField
            label="Full name"
            name="auth-name"
            value={form.name}
            onChange={setField('name')}
            error={errors.name}
            required
          />
        )}

        <FormField
          label="Email"
          name="auth-email"
          type="email"
          value={form.email}
          onChange={setField('email')}
          error={errors.email}
          required
        />

        <FormField
          label="Password"
          name="auth-password"
          type="password"
          value={form.password}
          onChange={setField('password')}
          error={errors.password}
          hint="At least 6 characters."
          required
        />

        <div className="field">
          <label className="field__label" htmlFor="auth-role">
            Continue as
          </label>
          <select
            id="auth-role"
            className="field__control"
            value={form.role}
            onChange={setField('role')}
          >
            {ROLES.map((role) => (
              <option key={role.id} value={role.id}>
                {role.label} — {role.persona}
              </option>
            ))}
          </select>
        </div>

        <div className="modal__actions">
          <button type="button" className="btn btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            {isSignup ? 'Create account' : 'Log in'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
