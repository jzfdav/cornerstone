import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create client if credentials exist
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return supabase !== null
}

// Types
export interface Project {
  id: string
  code: string
  name: string
  created_at: string
}

export interface User {
  id: string
  project_id: string
  access_code: string
  display_name: string
  spouse_name: string
  role: 'admin' | 'member'
  created_at: string
}
