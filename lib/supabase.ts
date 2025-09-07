import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([data])
    .select()
  
  return { data: result, error }
}

// 获取等候名单统计
export async function getWaitlistStats() {
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })
  
  return { count: count || 0, error }
}
