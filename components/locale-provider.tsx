"use client"

import { LocaleContext } from '@/hooks/use-locale'
import { useLocalStorage } from '@/hooks/use-locale'

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const localeData = useLocalStorage()

  return (
    <LocaleContext.Provider value={localeData}>
      {children}
    </LocaleContext.Provider>
  )
}
