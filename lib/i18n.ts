export type Locale = 'zh' | 'ja' | 'en'

export const locales: Locale[] = ['zh', 'ja', 'en']

export const defaultLocale: Locale = 'zh'

export const localeNames = {
  zh: '中文',
  ja: '日本語', 
  en: 'English'
}

export const localeFlags = {
  zh: '🇨🇳',
  ja: '🇯🇵',
  en: '🇺🇸'
}
