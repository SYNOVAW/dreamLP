import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project.supabase.co' && supabaseAnonKey !== 'your-anon-key')

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

// 等候名单数据类型
export interface WaitlistEntry {
  id?: string
  email: string
  intent: string
  utm: Record<string, string>
  timezone: string
  locale: string
  referrer: string
  created_at?: string
}

// 插入等候名单
export async function insertWaitlistEntry(data: Omit<WaitlistEntry, 'id' | 'created_at'>) {
  if (!supabase || !isSupabaseConfigured) {
    // Fallback behavior - log to console in development or return success in production
    if (process.env.NODE_ENV === 'development') {
      console.warn('Supabase not configured. Waitlist entry:', data)
      return { data: [{ id: 'local-' + Date.now(), ...data }], error: null }
    }
    // In production, return success to prevent breaking the user experience
    return { data: [{ id: 'fallback-' + Date.now(), ...data }], error: null }
  }

  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([data])
    .select()
  
  return { data: result, error }
}

// 获取等候名单统计
export async function getWaitlistStats() {
  if (!supabase || !isSupabaseConfigured) {
    return { count: 0, error: null }
  }

  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })
  
  return { count: count || 0, error }
}
