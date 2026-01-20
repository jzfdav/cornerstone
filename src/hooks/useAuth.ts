import { useCallback, useEffect, useState } from 'react'
import { validateDemoLoginCode, validateDemoProjectCode } from '../lib/demoAuth'
import { type Project, supabase, type User } from '../lib/supabase'

const STORAGE_KEYS = {
  PROJECT_CODE: 'cornerstone_project_code',
  SESSION: 'cornerstone_session',
  SESSION_EXPIRY: 'cornerstone_session_expiry',
}

interface Session {
  user: User
  project: Project
}

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  project: Project | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    project: null,
  })

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const sessionStr = localStorage.getItem(STORAGE_KEYS.SESSION)
        const expiryStr = localStorage.getItem(STORAGE_KEYS.SESSION_EXPIRY)

        if (!sessionStr || !expiryStr) {
          setState((prev) => ({ ...prev, isLoading: false }))
          return
        }

        const expiry = new Date(expiryStr)
        if (expiry <= new Date()) {
          // Session expired
          localStorage.removeItem(STORAGE_KEYS.SESSION)
          localStorage.removeItem(STORAGE_KEYS.SESSION_EXPIRY)
          setState((prev) => ({ ...prev, isLoading: false }))
          return
        }

        const session: Session = JSON.parse(sessionStr)
        setState({
          isAuthenticated: true,
          isLoading: false,
          user: session.user,
          project: session.project,
        })
      } catch {
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    }

    checkSession()
  }, [])

  // Get saved project code
  const getSavedProjectCode = useCallback((): string => {
    return localStorage.getItem(STORAGE_KEYS.PROJECT_CODE) || ''
  }, [])

  // Validate project code
  const validateProjectCode = useCallback(
    async (code: string): Promise<{ valid: boolean; project?: Project }> => {
      const normalized = code.trim().toLowerCase()

      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL) {
        // Use secure hash-based validation for demo mode
        const demoProject = await validateDemoProjectCode(code)
        if (demoProject) {
          return {
            valid: true,
            project: demoProject,
          }
        }
        return { valid: false }
      }

      if (!supabase) {
        return { valid: false }
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('code', normalized)
        .single()

      if (error || !data) {
        return { valid: false }
      }

      return { valid: true, project: data }
    },
    [],
  )

  // Validate access code (login code)
  const validateAccessCode = useCallback(
    async (
      code: string,
      projectId: string,
    ): Promise<{ valid: boolean; user?: User }> => {
      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL) {
        // Use secure hash-based validation for demo mode
        const demoUser = await validateDemoLoginCode(code, projectId)
        if (demoUser) {
          return { valid: true, user: demoUser as unknown as User }
        }
        return { valid: false }
      }

      if (!supabase) {
        return { valid: false }
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('project_id', projectId)
        .eq('access_code', code.trim().toLowerCase())
        .single()

      if (error || !data) {
        return { valid: false }
      }

      return { valid: true, user: data }
    },
    [],
  )

  // Login
  const login = useCallback(
    async (
      projectCode: string,
      accessCode: string,
      rememberMe: boolean,
    ): Promise<{
      success: boolean
      projectError?: boolean
      accessError?: boolean
    }> => {
      // Validate project code
      const projectResult = await validateProjectCode(projectCode)
      if (!projectResult.valid || !projectResult.project) {
        return { success: false, projectError: true }
      }

      // Save valid project code
      localStorage.setItem(
        STORAGE_KEYS.PROJECT_CODE,
        projectCode.trim().toUpperCase(),
      )

      // Validate access code
      const userResult = await validateAccessCode(
        accessCode,
        projectResult.project.id,
      )
      if (!userResult.valid || !userResult.user) {
        return { success: false, accessError: true }
      }

      // Create session
      const session: Session = {
        user: userResult.user,
        project: projectResult.project,
      }

      // Set expiry (24h default, 7 days with remember me)
      const expiryHours = rememberMe ? 24 * 7 : 24
      const expiry = new Date()
      expiry.setHours(expiry.getHours() + expiryHours)

      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session))
      localStorage.setItem(STORAGE_KEYS.SESSION_EXPIRY, expiry.toISOString())

      setState({
        isAuthenticated: true,
        isLoading: false,
        user: userResult.user,
        project: projectResult.project,
      })

      return { success: true }
    },
    [validateProjectCode, validateAccessCode],
  )

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.SESSION)
    localStorage.removeItem(STORAGE_KEYS.SESSION_EXPIRY)
    // Keep project code for convenience

    setState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      project: null,
    })
  }, [])

  return {
    ...state,
    getSavedProjectCode,
    login,
    logout,
  }
}
