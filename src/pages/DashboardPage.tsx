import { Logo } from '../components/Logo'
import { useAuth } from '../hooks/useAuth'
import './DashboardPage.css'

export default function Dashboard() {
  const { user, project, logout } = useAuth()

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <Logo size={32} />
          <div className="header-info">
            <h1 className="project-name">{project?.name}</h1>
            <span className="user-name">Welcome, {user?.display_name}</span>
          </div>
        </div>
        <button type="button" onClick={logout} className="btn-logout">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="welcome-card">
          <h2>🏗️ Welcome to Cornerstone</h2>
          <p>Your home construction tracker is ready.</p>
          <div className="coming-soon">
            <h3>Coming Soon</h3>
            <ul>
              <li>📋 Layout Plan Management</li>
              <li>✏️ Proposed Changes & Suggestions</li>
              <li>❓ Queries & Clarifications</li>
              <li>📊 Activities & Milestones</li>
              <li>📒 Vendor Directory</li>
              <li>📜 Changelog</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
