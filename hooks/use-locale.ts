"use client"

import { useState, useEffect, createContext, useContext } from 'react'
import type { Locale } from '@/lib/i18n'
import { defaultLocale } from '@/lib/i18n'
import { zh } from '@/locales/zh'
import { ja } from '@/locales/ja'
import { en } from '@/locales/en'

const translations = { zh, ja, en }

// Safe translation function with fallback
function createSafeTranslation(translation: any, fallbackTranslation: any) {
  const handler: ProxyHandler<any> = {
    get(target: any, prop: string | symbol) {
      if (typeof prop === 'string' && target && typeof target === 'object') {
        const value = target[prop]
        
        // If value exists, return it (possibly wrapped in proxy for nested access)
        if (value !== undefined && value !== null) {
          if (typeof value === 'object' && !Array.isArray(value)) {
            return new Proxy(value, handler)
          }
          return value
        }
        
        // Try fallback translation
        const fallbackValue = fallbackTranslation?.[prop]
        if (fallbackValue !== undefined && fallbackValue !== null) {
          if (typeof fallbackValue === 'object' && !Array.isArray(fallbackValue)) {
            return new Proxy(fallbackValue, handler)
          }
          return fallbackValue
        }
        
        // Last resort: return a readable error message
        console.warn(`Missing translation key: ${String(prop)}`)
        return `[${String(prop)}]`
      }
      
      return target?.[prop] || `[${String(prop)}]`
    }
  }
  
  return new Proxy(translation || {}, handler)
}

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof zh
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: createSafeTranslation(translations[defaultLocale], translations[defaultLocale])
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
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // 标记为已水合，避免 hydration 不匹配
    setIsHydrated(true)
    
    // Load from localStorage on client side
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dreamlife-locale') as Locale
      if (saved && translations[saved]) {
        setLocaleState(saved)
      }
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('dreamlife-locale', newLocale)
    }
  }

  return {
    locale: isHydrated ? locale : defaultLocale,
    setLocale,
    t: createSafeTranslation(
      translations[isHydrated ? locale : defaultLocale],
      translations[defaultLocale] // Use default locale as fallback
    )
  }
}
