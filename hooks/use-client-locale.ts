"use client"

import { useState, useEffect } from 'react'
import type { Locale } from '@/lib/i18n'
import { defaultLocale } from '@/lib/i18n'
import { zh } from '@/locales/zh'
import { ja } from '@/locales/ja'
import { en } from '@/locales/en'

const translations = { zh, ja, en }

// Safe translation function with fallback to prevent errors during language switching
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

export function useClientLocale() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // 只在客户端运行
        const saved = localStorage.getItem('dreamlife-locale') as Locale
    if (saved && translations[saved]) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = async (newLocale: Locale) => {
    try {
      setIsLoading(true)
      
      // Validate the new locale
      if (!translations[newLocale]) {
        console.error(`Invalid locale: ${newLocale}`)
        return
      }
      
      // Update state and localStorage
      setLocaleState(newLocale)
      localStorage.setItem('dreamlife-locale', newLocale)
      
      // Give React a moment to update the DOM with new translations
      await new Promise(resolve => setTimeout(resolve, 100))
      
    } catch (error) {
      console.error('Error switching language:', error)
      // Revert to previous locale on error
      setLocaleState(locale)
    } finally {
      setIsLoading(false)
    }
  }

  // 在服务端或未挂载时返回默认值
  if (!mounted) {
    return {
      locale: defaultLocale,
      setLocale: () => {},
      t: createSafeTranslation(zh, zh),
      mounted: false,
      isLoading: false
    }
  }

  return {
    locale,
    setLocale,
    t: createSafeTranslation(
      translations[locale],
      translations[defaultLocale] // Use default locale as fallback
    ),
    mounted: true,
    isLoading
  }
}
