"use client"

import { useState, useEffect } from 'react'
import type { Locale } from '@/lib/i18n'
import { defaultLocale } from '@/lib/i18n'
import { zh } from '@/locales/zh'
import { ja } from '@/locales/ja'
import { en } from '@/locales/en'

const translations = { zh, ja, en }

export function useClientLocale() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // 只在客户端运行
        const saved = localStorage.getItem('remia-locale') as Locale
    if (saved && translations[saved]) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
      localStorage.setItem('remia-locale', newLocale)
    
    // Optional page reload for complete language switch - uncomment if needed
    // window.location.reload()
  }

  // 在服务端或未挂载时返回默认值
  if (!mounted) {
    return {
      locale: defaultLocale,
      setLocale: () => {},
      t: zh,
      mounted: false
    }
  }

  return {
    locale,
    setLocale,
    t: translations[locale],
    mounted: true
  }
}
