"use client"

import { LocaleContext } from '@/hooks/use-locale'
import { useClientLocale } from '@/hooks/use-client-locale'

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const localeData = useClientLocale()

  // 在客户端挂载前显示加载状态
  if (!localeData.mounted) {
    return (
      <LocaleContext.Provider value={localeData}>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="flex items-center gap-2 text-slate-200">
            <div className="w-4 h-4 rounded-full bg-fuchsia-500 animate-pulse"></div>
            <span>Loading...</span>
          </div>
        </div>
      </LocaleContext.Provider>
    )
  }

  return (
    <LocaleContext.Provider value={localeData}>
      {children}
    </LocaleContext.Provider>
  )
}
