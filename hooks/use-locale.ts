"use client"

import { useState, useEffect, createContext, useContext } from 'react'
import type { Locale } from '@/lib/i18n'
import { defaultLocale } from '@/lib/i18n'
import { zh } from '@/locales/zh'
import { ja } from '@/locales/ja'
import { en } from '@/locales/en'

const translations = { zh, ja, en }

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof zh
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: zh
})

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}

export function useLocalStorage() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    // Load from localStorage on client side
    const saved = localStorage.getItem('dreamlife-locale') as Locale
    if (saved && translations[saved]) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('dreamlife-locale', newLocale)
  }

  return {
    locale,
    setLocale,
    t: translations[locale]
  }
}
