// 分析和埋点工具
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
  
  // 也可以同时发送到其他分析平台
  // 例如：PostHog, Segment 等
}

// 页面浏览埋点
export const trackPageView = (page: string) => {
  trackEvent('lp_view', { page })
}

// 等候名单提交埋点
export const trackWaitlistSubmit = (intent: string, utmSource: string) => {
  trackEvent('waitlist_submit', { intent, utm_source: utmSource })
}

// 冥想音频播放埋点
export const trackMeditationPlay = (frequency: string) => {
  trackEvent('med_demo_play', { frequency })
}

// Hero CTA 点击埋点
export const trackHeroCTA = (buttonType: 'try' | 'waitlist') => {
  trackEvent('hero_cta_click', { btn: buttonType })
}

// Persona 卡片悬浮埋点
export const trackPersonaHover = (personaName: string) => {
  trackEvent('persona_card_hover', { name: personaName })
}

// 导航按钮点击埋点
export const trackNavClick = (buttonType: string) => {
  trackEvent(`nav_${buttonType}_click`)
}
