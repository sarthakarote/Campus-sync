/* Profile and Settings: mock profile summary, Sign Out back to the landing
   page, and Reset Demo Data with a confirm dialog. */

import { useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import Icon from '../components/Icon.jsx'
import PageHeader from '../components/PageHeader.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { ROLE_BY_ID } from '../utils/constants.js'

export default function ProfilePage({ currentUser, role, onLogout, onReset }) {
  const [resetOpen, setResetOpen] = useState(false)

  const roleLabel = ROLE_BY_ID[role]?.label ?? role

  return (
    <>
      <PageHeader
        title="Profile / Settings"
        subtitle="This is demo data, stored only in this browser."
      />

      <div className="card" style={{ maxWidth: 560, marginBottom: 24 }}>
        <h2 className="card__title" style={{ marginBottom: 12 }}>
          {currentUser.name}
        </h2>
        <div className="card__row" style={{ marginBottom: 16 }}>
          <StatusBadge status={roleLabel} />
        </div>
        <dl className="profile-card__row" style={{ margin: 0 }}>
          <div className="profile-card__detail">
            <dt>Department</dt>
            <dd style={{ margin: 0 }}>{currentUser.department}</dd>
          </div>
          <div className="profile-card__detail">
            <dt>Year</dt>
            <dd style={{ margin: 0 }}>{currentUser.year || '—'}</dd>
          </div>
          <div className="profile-card__detail">
            <dt>User id</dt>
            <dd style={{ margin: 0 }}>{currentUser.id}</dd>
          </div>
        </dl>
      </div>

      <div className="card" style={{ maxWidth: 560 }}>
        <h2 className="card__title" style={{ marginBottom: 12 }}>
          Demo controls
        </h2>
        <div className="settings-actions">
          <button className="btn btn--secondary" onClick={onLogout}>
            <Icon name="logout" size={18} />
            Sign Out
          </button>
          <button
            className="btn btn--danger"
            onClick={() => setResetOpen(true)}
          >
            Reset Demo Data
          </button>
        </div>
      </div>

      <ConfirmDialog
        message="Reset Demo Data? This removes everything you created and restores the original seed records."
        confirmLabel="Reset"
        isOpen={resetOpen}
        onConfirm={() => {
          setResetOpen(false)
          onReset()
        }}
        onCancel={() => setResetOpen(false)}
      />
    </>
  )
}