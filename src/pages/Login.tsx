import { useEffect, useState } from 'react'
import { Logo } from '../components/Logo'
import { useAuth } from '../hooks/useAuth'
import './Login.css'

export default function Login() {
  const { getSavedProjectCode, login } = useAuth()

  const [projectCode, setProjectCode] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    project?: string
    access?: string
  }>({})

  // Auto-populate saved project code
  useEffect(() => {
    const saved = getSavedProjectCode()
    if (saved) {
      setProjectCode(saved)
    }
  }, [getSavedProjectCode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    try {
      const result = await login(projectCode, accessCode, rememberMe)

      if (!result.success) {
        if (result.projectError) {
          setErrors({ project: 'Code not recognized' })
        } else if (result.accessError) {
          setErrors({ access: 'Access code not recognized' })
        }
      }
      // If success, the auth state change will redirect automatically
    } catch {
      setErrors({ access: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      {/* Top Half - Branding */}
      <div className="login-branding">
        <Logo size={80} className="login-logo" />
        <h1 className="login-title">Cornerstone</h1>
        <p className="login-subtitle">Home Construction Tracker</p>
      </div>

      {/* Bottom Half - Form */}
      <div className="login-form-section">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              id="projectCode"
              type="text"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value.toUpperCase())}
              placeholder="e.g. PTH"
              autoComplete="off"
              style={{ textTransform: 'uppercase' }}
              disabled={isLoading}
            />
            <label htmlFor="projectCode">Project Code</label>
            {errors.project && <p className="error-text">{errors.project}</p>}
          </div>

          <div className="form-group">
            <input
              id="accessCode"
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Enter your code"
              autoComplete="current-password"
              disabled={isLoading}
            />
            <label htmlFor="accessCode">Access Code</label>
            {errors.access && <p className="error-text">{errors.access}</p>}
          </div>

          <div className="checkbox-wrapper">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            <label htmlFor="rememberMe">Remember me for a week</label>
          </div>

          <button
            type="submit"
            className={`btn btn-primary btn-full ${isLoading ? 'btn-loading' : ''}`}
            disabled={isLoading || !projectCode.trim() || !accessCode.trim()}
          >
            {isLoading ? 'Entering...' : 'Enter'}
          </button>
        </form>
      </div>

      {/* Footer - Bible Verse */}
      <footer className="login-footer">
        <p className="bible-verse">
          "The stone the builders rejected has become the cornerstone." — Psalm
          118:22
        </p>
      </footer>
    </div>
  )
}
