/* Dashboard page (DB-01..DB-08). Welcomes the demo user and composes summary
   widgets that each load from its module service. */

import PageHeader from '../../components/PageHeader.jsx'
import ModuleTiles from './ModuleTiles.jsx'
import QuickActions from './QuickActions.jsx'
import RecentComplaints from './RecentComplaints.jsx'
import RecentListings from './RecentListings.jsx'
import RecentReports from './RecentReports.jsx'
import SummaryCards from './SummaryCards.jsx'

function Section({ title, children }) {
  return (
    <section>
      <h2 className="dashboard__section-title">{title}</h2>
      {children}
    </section>
  )
}

export default function DashboardPage({ currentUser, role, onNavigate }) {
  const isPrincipal = role === 'principal'
  const meta = [currentUser.department, currentUser.year]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="dashboard">
      <PageHeader
        title={`Welcome, ${currentUser.name}`}
        subtitle={`Demo profile · ${meta}`}
      />

      {isPrincipal && (
        <Section title="Complaint summary">
          <SummaryCards />
        </Section>
      )}

      <Section title="Your modules">
        <ModuleTiles onNavigate={onNavigate} />
      </Section>

      <Section title="Recent complaints">
        <RecentComplaints onNavigate={onNavigate} />
      </Section>

      <Section title="Recent listings">
        <RecentListings onNavigate={onNavigate} />
      </Section>

      <Section title="Recent lost and found">
        <RecentReports onNavigate={onNavigate} />
      </Section>

      <Section title="Quick actions">
        <QuickActions onNavigate={onNavigate} />
      </Section>
    </div>
  )
}