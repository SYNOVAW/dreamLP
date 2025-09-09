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
      {/* Show loading overlay during language switching */}
      {localeData.isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-xl">
            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-4 h-4 rounded-full bg-fuchsia-500 animate-pulse"></div>
              <span className="text-sm">Switching language...</span>
            </div>
          </div>
        </div>
      )}
      {children}
    </LocaleContext.Provider>
  )
}
