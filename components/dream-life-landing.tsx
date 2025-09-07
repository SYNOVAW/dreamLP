"use client"
import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, Sparkles, Moon, Stars, Heart, Brain, Flame, ChevronRight, Play } from "lucide-react"
import { useState } from "react"
import { useLocale } from "@/hooks/use-locale"
import { LanguageSwitcher } from "@/components/language-switcher"
import { glassCardStyles, specialGlassStyles } from "@/lib/card-styles"

// JayVue: one-file landing page, Tailwind + shadcn/ui + framer-motion
// Sections: Hero / Waitlist / Social Proof / Features / Meditation Hz Music / How It Works / Persona / Pricing / FAQ / CTA / Footer

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
}

/* AI Card Art helpers + PersonaCardPro */
function CardArt({ seed }: { seed: string }) {
  const idx = Math.abs(hashStr(seed)) % 3;
  const gradients = [
    "from-[#ff5f6d]/30 via-[#ff7a85]/20 to-[#a855f7]/30",
    "from-[#a855f7]/30 via-[#7dd3fc]/20 to-[#ff5f6d]/30",
    "from-[#22d3ee]/20 via-[#a78bfa]/20 to-[#ff7a85]/25",
  ];
  return (
    <div className={`h-40 rounded-xl border border-white/10 bg-gradient-to-br ${gradients[idx]} relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage:
          'radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.5) 0, transparent 60%),'+
          'radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,.5) 0, transparent 60%),'+
          'radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,.4) 0, transparent 60%)'
      }}/>
      <div className="absolute -top-6 -right-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
    </div>
  );
}

function hashStr(s: string){ let h=0; for(let i=0;i<s.length;i++){ h=((h<<5)-h)+s.charCodeAt(i); h|=0; } return h; }

function copyPersonaPrompt(name: string, theme: string){
  const prompt = [
    `ultra-detailed tarot-style character card, dreamy, ethereal lighting, neon watercolor gradient, cosmic motifs`,
    `character: ${name} — theme: ${theme}`,
    `style: soft-glow, volumetric light, particles, subtle bokeh, crisp linework, 3:4 portrait`,
    `colorway: watermelon red (#ff5f6d) → magenta (#ff7a85) → dreamy purple (#a855f7)`,
    `background: misty nebula, faint constellations; foreground: emblem matching theme`,
    `clean border, gold foil ornament, minimal typography, no watermark, high quality`
  ].join('\n');
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(prompt);
    alert('已复制绘图 Prompt，粘贴到你的绘图工具即可。');
  }
}

function PersonaCardPro({ name, line, tip, sr, artSeed }: {
  name: string; line: string; tip: string; sr: number; artSeed?: string
}) {
  const { t } = useLocale()
  
  const handleCardHover = () => {
    // 埋点：Persona卡片悬浮
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'persona_card_hover', { name })
    }
  }
  
  return (
    <Card 
      className={`${glassCardStyles.hover} transition hover:shadow-xl hover:shadow-pink-500/10`}
      onMouseEnter={handleCardHover}
    >
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center justify-between ${glassCardStyles.text.primary}`}>
          <span>{name}</span>
          <span className={`text-xs ${glassCardStyles.text.subtle}`}>SR {sr}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardArt seed={artSeed || name} />
        <div className={`mt-3 text-sm ${glassCardStyles.text.muted}`}>{t.persona.themeLabel}{line}</div>
        <div className={`mt-2 text-xs ${glassCardStyles.text.subtle}`}>{t.persona.tipLabel}{tip}</div>
        <div className="mt-3 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-slate-200"
            onClick={() => copyPersonaPrompt(name, line)}
          >
            复制AI绘制Prompt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Card className={`${glassCardStyles.hover}`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${glassCardStyles.text.primary}`}>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`${glassCardStyles.text.muted} text-sm leading-relaxed`}>{desc}</p>
      </CardContent>
    </Card>
  )
}

function PriceCard({
  title,
  price,
  items,
  cta,
  highlight,
}: { title: string; price: string; items: string[]; cta: string; highlight?: boolean }) {
  return (
    <Card
      className={highlight ? specialGlassStyles.pricing : glassCardStyles.base}
    >
      <CardHeader>
        <CardTitle className={`${glassCardStyles.text.primary} flex items-baseline justify-between`}>
          <span>{title}</span>
          <span className="text-xl">{price}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className={`space-y-2 text-sm ${glassCardStyles.text.muted}`}>
          {items.map((x, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              {x}
            </li>
          ))}
        </ul>
        <Button
          className={
            "mt-6 w-full backdrop-blur-sm " + (highlight ? "bg-fuchsia-500/80 hover:bg-fuchsia-400/90 border border-white/10" : "bg-white/10 hover:bg-white/20 border border-white/10 text-slate-200")
          }
        >
          {cta}
        </Button>
      </CardContent>
    </Card>
  )
}

function TagRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className={`text-xs ${glassCardStyles.text.subtle} mb-2`}>{label}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((t, i) => (
          <span
            key={i}
            className={`rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-2.5 py-1 text-xs ${glassCardStyles.text.secondary}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function MiniCard({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <div className={`rounded-2xl ${glassCardStyles.base} p-4 min-w-[240px]`}>
      <div className={`flex items-center gap-2 text-sm ${glassCardStyles.text.secondary}`}>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">{icon}</span>
        <div>
          <div className={`font-medium ${glassCardStyles.text.primary}`}>{title}</div>
          <div className={`text-xs ${glassCardStyles.text.muted}`}>{subtitle}</div>
        </div>
      </div>
    </div>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
      <path
        fill="currentColor"
        d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z"
      />
    </svg>
  )
}

function WaitlistForm() {
  const { t, locale } = useLocale()
  const [email, setEmail] = useState("")
  const [intent, setIntent] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Honeypot 防机器人检查
    const form = e.currentTarget as HTMLFormElement
    const honeypot = (new FormData(form).get('company') as string) || ''
    if (honeypot) {
      setIsSubmitting(false)
      return // 机器人，静默拒绝
    }

    try {
      // 收集用户环境信息
      const params = new URLSearchParams(window.location.search)
      const utm = Object.fromEntries(params.entries())
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const referrer = typeof document !== 'undefined' ? document.referrer || '' : ''

      // 动态导入 Supabase（避免 SSR 问题）
      const { insertWaitlistEntry } = await import('@/lib/supabase')
      
      const { error: supabaseError } = await insertWaitlistEntry({
        email,
        intent: intent || 'unknown',
        utm,
        timezone,
        locale,
        referrer
      })

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      setSubmitted(true)
      setEmail('')
      setIntent('')
      
      // 埋点：等候名单提交成功
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'waitlist_submit', {
          intent,
          utm_source: utm.utm_source || 'direct'
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请稍后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className={`mt-4 rounded-xl ${glassCardStyles.base} p-4 text-sm ${glassCardStyles.text.secondary}`}>
        {t.waitlist.successMessage}
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3 md:grid-cols-[1fr_220px_160px]">
        {/* Honeypot 防机器人 */}
        <input 
          name="company" 
          className="hidden" 
          tabIndex={-1} 
          autoComplete="off" 
          aria-hidden="true"
        />
        
        <input
          type="email"
          required
          disabled={isSubmitting}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.waitlist.emailPlaceholder}
          className={`h-11 rounded-lg border border-white/15 bg-white/10 backdrop-blur-sm px-3 text-sm ${glassCardStyles.text.primary} placeholder:${glassCardStyles.text.subtle} focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 disabled:opacity-50`}
        />
        <select
          value={intent}
          disabled={isSubmitting}
          onChange={(e) => setIntent(e.target.value)}
          className={`h-11 rounded-lg border border-white/15 bg-white/10 backdrop-blur-sm px-3 text-sm ${glassCardStyles.text.primary} focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 disabled:opacity-50`}
        >
          <option value="">{t.waitlist.intentOptions.default}</option>
          <option value="sleep">{t.waitlist.intentOptions.sleep}</option>
          <option value="mood">{t.waitlist.intentOptions.mood}</option>
          <option value="ritual">{t.waitlist.intentOptions.ritual}</option>
        </select>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="h-11 bg-gradient-to-r from-fuchsia-500/80 to-indigo-500/80 hover:opacity-90 backdrop-blur-sm border border-white/10 disabled:opacity-50"
        >
          {isSubmitting ? '提交中...' : t.waitlist.joinButton}
        </Button>
      </form>
      
      {/* 错误提示 */}
      {error && (
        <div className={`mt-3 text-xs ${glassCardStyles.text.accent} bg-red-500/10 border border-red-500/20 rounded-lg p-2 backdrop-blur-sm`}>
          ❌ {error}
        </div>
      )}
      
      {/* 隐私说明 */}
      <div className={`mt-3 text-xs ${glassCardStyles.text.subtle}`}>
        {t.waitlist.privacy}
      </div>
    </div>
  )
}

function MeditationCard({
  frequency,
  title,
  description,
  benefits,
}: {
  frequency: string
  title: string
  description: string
  benefits: string[]
}) {
  const { t } = useLocale()
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  const handlePlay = () => {
    if (!audioElement) return

    if (isPlaying) {
      audioElement.pause()
      setIsPlaying(false)
    } else {
      audioElement.play()
      setIsPlaying(true)
      
      // 埋点：冥想音频播放
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'med_demo_play', {
          frequency: frequency
        })
      }
    }
  }

  const handleAudioEnd = () => {
    setIsPlaying(false)
  }

  const getAudioSrc = (freq: string) => {
    // 根据频率返回对应的音频文件路径
    const freqNum = freq.replace('Hz', '').toLowerCase()
    return `/audio/${freqNum}hz-30s.mp3`
  }

  return (
    <Card className={glassCardStyles.hover}>
      <CardHeader>
        <CardTitle className={`flex items-center justify-between ${glassCardStyles.text.primary}`}>
          <span className="text-lg">{frequency}</span>
          <Button
            onClick={handlePlay}
            size="sm"
            variant="outline"
            className="border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-slate-200"
          >
            <Play className={`h-4 w-4 ${isPlaying ? "animate-pulse" : ""}`} />
            {isPlaying ? t.meditation.playing : t.meditation.playButton}
          </Button>
        </CardTitle>
        <div className={`text-sm font-medium ${glassCardStyles.text.secondary}`}>{title}</div>
      </CardHeader>
      <CardContent>
        <p className={`${glassCardStyles.text.muted} text-sm leading-relaxed mb-4`}>{description}</p>
        
        {/* 隐藏的音频元素 */}
        <audio
          ref={setAudioElement}
          preload="none"
          onEnded={handleAudioEnd}
          onPause={() => setIsPlaying(false)}
          className="hidden"
        >
          <source src={getAudioSrc(frequency)} type="audio/mpeg" />
          <source src={getAudioSrc(frequency).replace('.mp3', '.ogg')} type="audio/ogg" />
          您的浏览器不支持音频播放。
        </audio>
        
        <div className="flex flex-wrap gap-2">
          {benefits.map((benefit, i) => (
            <span
              key={i}
              className={`rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-2.5 py-1 text-xs ${glassCardStyles.text.secondary}`}
            >
              {benefit}
            </span>
          ))}
        </div>
        
        {/* 音频播放提示 */}
        <div className={`mt-3 text-xs ${glassCardStyles.text.subtle} flex items-center gap-1`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          30秒试听片段 · 常被用于放松冥想，体验因人而异
        </div>
      </CardContent>
    </Card>
  )
}

export default function DreamLifeLanding() {
  const { t } = useLocale()
  
  // 页面浏览埋点
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lp_view', { page: 'landing' })
    }
  }, [])
  
  return (
    <div className="min-h-screen text-slate-100">
      {/* Top nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-cyan-300 shadow-lg shadow-fuchsia-500/20" />
            <span className="font-semibold tracking-wide text-slate-100">DreamLife</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white transition">
              {t.nav.features}
            </a>
            <a href="#meditation" className="hover:text-white transition">
              {t.nav.meditation}
            </a>
            <a href="#how" className="hover:text-white transition">
              {t.nav.how}
            </a>
            <a href="#persona" className="hover:text-white transition">
              {t.nav.persona}
            </a>
            <a href="#pricing" className="hover:text-white transition">
              {t.nav.pricing}
            </a>
            <a href="#faq" className="hover:text-white transition">
              {t.nav.faq}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="ghost" className="text-slate-300 hover:text-white hidden lg:flex">
              {t.nav.login}
            </Button>
            <Button 
              variant="outline"
              className="border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-slate-200 hidden md:flex"
              onClick={() => {
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'nav_waitlist_click')
                }
              }}
            >
              加入等候名单
            </Button>
            <Button 
              className="bg-fuchsia-500 hover:bg-fuchsia-400 shadow-lg shadow-fuchsia-500/30"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'nav_experience_click')
                }
              }}
            >
              {t.nav.experience}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/40 z-0" />
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 md:pt-24 md:pb-24 relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={item} className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-800/60 px-3 py-1 text-xs text-slate-200">
                <Sparkles className="h-3.5 w-3.5" /> {t.hero.badge}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                {t.hero.title}
                <span className="text-fuchsia-200">{t.hero.titleHighlight}</span>
              </h1>
              <p className="text-slate-300/90 md:text-lg max-w-xl">
                <span className="text-slate-200 font-medium">每天 2 个可执行小任务，让睡前更安、白天更稳。</span>
                <br className="hidden md:block" />
                <span className="mt-2 block">{t.hero.description}</span>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button 
                  className="bg-indigo-500 hover:bg-indigo-400 shadow-lg shadow-indigo-500/30"
                  onClick={() => {
                    // 埋点：Hero CTA 点击
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'hero_cta_click', { btn: 'try' })
                    }
                  }}
                >
                  {t.hero.startFree}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-slate-200 hover:bg-white/10 bg-transparent"
                  onClick={() => {
                    // 滚动到等候名单
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                    // 埋点：Hero CTA 点击
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'hero_cta_click', { btn: 'waitlist' })
                    }
                  }}
                >
                  加入等候名单 <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              {/* 社证徽章 */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className={`flex items-center gap-2 text-xs ${glassCardStyles.text.subtle} bg-white/5 rounded-full px-3 py-1 border border-white/10`}>
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  隐私本地
                </div>
                <div className={`flex items-center gap-2 text-xs ${glassCardStyles.text.subtle} bg-white/5 rounded-full px-3 py-1 border border-white/10`}>
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  非医疗声明
                </div>
                <div className={`flex items-center gap-2 text-xs ${glassCardStyles.text.subtle} bg-white/5 rounded-full px-3 py-1 border border-white/10`}>
                  <div className="w-2 h-2 rounded-full bg-fuchsia-400"></div>
                  免费开始
                </div>
              </div>
              <div className="flex items-center gap-6 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> {t.hero.features.platforms}
                </div>
                <div className="flex items-center gap-1">
                  <LockIcon /> {t.hero.features.security}
                </div>
                <div className="flex items-center gap-1">
                  <Stars className="h-3.5 w-3.5" /> {t.hero.features.advanced}
                </div>
              </div>
            </motion.div>

            {/* Mock devices */}
            <motion.div variants={item} className="relative">
              <div className="relative mx-auto aspect-[9/18] h-[560px] w-[310px] rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-800 p-3 shadow-2xl">
                <div className="h-full w-full rounded-[1.6rem] bg-slate-900/90 overflow-hidden">
                  <div className="h-12 w-full bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/30 to-cyan-500/30" />
                  <div className="p-4 space-y-3">
                    <div className="text-xs text-slate-400">今日卡牌</div>
                    <div className="grid grid-cols-3 gap-3">
                      {t.mockData.todayCards.map((cardName, i) => (
                        <div key={i} className="rounded-xl bg-slate-800/80 border border-white/20 p-3 text-center">
                          <div className="text-[10px] text-slate-400">SR{90 - i * 7}</div>
                          <div className="mt-2 text-sm text-slate-200">{cardName}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-white/20 bg-slate-800/80 p-3">
                      <div className="text-xs text-slate-400">梦境情绪概览</div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-200">
                        <Brain className="h-4 w-4" /> {t.mockData.emotionOverview}
                      </div>
                    </div>
                    <div className="mt-3 rounded-xl border border-white/10 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 p-3">
                      <div className="text-xs text-slate-300">今日养生</div>
                      <ul className="mt-2 space-y-1 text-[13px] text-slate-200/90">
                        {t.mockData.todayWellness.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute -right-8 -bottom-6 hidden md:block"
              >
                <MiniCard title="炽羽者・IGNIS" subtitle="Persona 已解锁" icon={<Flame className="h-4 w-4" />} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Waiting List */}
      <section id="waitlist" className="py-6 md:py-10 -mt-8">
        <div className="mx-auto max-w-3xl px-4">
          <Card className={specialGlassStyles.waitlist}>
            <CardContent className="p-6 md:p-8">
              <h3 className={`text-xl md:text-2xl font-semibold ${glassCardStyles.text.primary}`}>{t.waitlist.title}</h3>
              <p className={`mt-2 text-sm ${glassCardStyles.text.muted}`}>
                {t.waitlist.description}
              </p>
              <WaitlistForm />
              <p className={`mt-3 text-xs ${glassCardStyles.text.subtle}`}>{t.waitlist.privacy}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-8 md:py-12 border-t border-white/10 relative">
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80 relative z-10">
          {["改善睡眠", "情绪调节", "个性化养生", "隐私优先"].map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
              <Stars className="h-4 w-4" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-semibold">核心功能</h2>
            <p className="mt-3 text-slate-300/90">
              解决睡眠质量差、情绪难调节、缺乏仪式感的痛点，将梦境语言翻译为可操作的日常指引。
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Moon className="h-5 w-5" />}
              title="AI梦境分析"
              desc="60秒内语音/文字记录，提取象征/人物/场景与情绪分布，生成个性化梦境图谱。"
            />
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title="命运抽卡系统"
              desc="基于梦象的个性化卡池，每日1-3张卡牌：主题寓意+可执行行动，建立生活仪式感。"
            />
            <FeatureCard
              icon={<Heart className="h-5 w-5" />}
              title="个性化养生指南"
              desc="呼吸法/作息提醒/饮食建议/冥想练习，每日2-3个微行动，改善睡眠与情绪。"
            />
          </div>
        </div>
      </section>

      {/* Meditation Hz Music */}
      <section id="meditation" className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-semibold">冥想 · Hz 音乐 🎶</h2>
            <p className="mt-3 text-slate-300/90">科学频率调节脑波，配合梦境分析结果，提供个性化的冥想音频体验。</p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <MeditationCard
              frequency="432Hz"
              title="自然和谐频率"
              description="被称为'宇宙频率'，有助于放松身心，减少焦虑，促进深度睡眠。适合睡前冥想。"
              benefits={["减少焦虑", "促进睡眠", "身心和谐"]}
            />
            <MeditationCard
              frequency="528Hz"
              title="爱与修复频率"
              description="DNA修复频率，能够平衡情绪，增强自愈能力，提升正面能量。适合情绪调节。"
              benefits={["情绪平衡", "增强自愈", "正面能量"]}
            />
            <MeditationCard
              frequency="963Hz"
              title="觉醒与直觉频率"
              description="松果体激活频率，提升直觉力和洞察力，增强梦境记忆。适合梦境探索前使用。"
              benefits={["提升直觉", "增强洞察", "梦境记忆"]}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 relative">
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold">3步开始</h3>
            <ul className="mt-6 space-y-4 text-slate-300">
              {[
                { k: "记录梦境", d: "起床 60 秒内用语音或文字记录要点。" },
                { k: "点击抽卡", d: "从梦中萃取的卡池，给出今天的主题与行动。" },
                { k: "跟随养生", d: "按建议完成 2–3 个小习惯，获得回馈与积分。" },
              ].map((x, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-medium">{x.k}</div>
                    <div className="text-slate-400 text-sm">{x.d}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <Button className="bg-fuchsia-500 hover:bg-fuchsia-400">现在试试</Button>
              <Button variant="outline" className="border-white/20 text-slate-200 hover:bg-white/10 bg-transparent">
                观看 60s 介绍
              </Button>
            </div>
          </div>
          <div>
            <Card className={glassCardStyles.base}>
              <CardHeader>
                <CardTitle className={glassCardStyles.text.primary}>{t.howItWorks.exampleTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <TagRow label={t.howItWorks.exampleTags.symbols.label} items={t.howItWorks.exampleTags.symbols.items} />
                  <TagRow label={t.howItWorks.exampleTags.emotions.label} items={t.howItWorks.exampleTags.emotions.items} />
                  <TagRow label={t.howItWorks.exampleTags.themes.label} items={t.howItWorks.exampleTags.themes.items} />
                  <TagRow label={t.howItWorks.exampleTags.actions.label} items={t.howItWorks.exampleTags.actions.items} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Persona */}
      <section id="persona" className="py-16 md:py-24 border-t border-white/10 relative">
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-4xl font-semibold">解锁 Persona · 梦中同伴</h3>
            <p className="mt-3 text-slate-300/90">重复的梦象会召唤对应人格。与其对话，让白天更顺。</p>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { name: t.persona.characters.mira.name, line: t.persona.characters.mira.theme, tip: t.persona.characters.mira.tip },
              { name: t.persona.characters.ignis.name, line: t.persona.characters.ignis.theme, tip: t.persona.characters.ignis.tip },
              { name: t.persona.characters.echo.name, line: t.persona.characters.echo.theme, tip: t.persona.characters.echo.tip },
            ].map((p, i) => (
              <PersonaCardPro key={i} {...p} sr={88 - i * 7} artSeed={p.name} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <h3 className="text-2xl md:text-4xl font-semibold">价格方案</h3>
          <p className="mt-2 text-slate-300/90">从入门到深度陪伴，支持订阅制与次卡制，按需选择。</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <PriceCard
              title="免费版"
              price="¥0"
              items={["每日1次抽卡", "本地隐私模式", "基础梦图谱", "基础养生建议"]}
              cta="立即使用"
            />
            <PriceCard
              title="专业版"
              price="¥980/月"
              highlight
              items={["无限抽卡", "Persona解锁", "高级养生指南", "云同步备份", "7日挑战陪伴"]}
              cta="开始试用"
            />
            <PriceCard
              title="次卡制"
              price="¥300/次"
              items={["抽卡扩展包", "限定主题卡池", "特殊Persona", "联名内容"]}
              cta="购买次卡"
            />
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            * 支持多种付费模式，满足不同用户需求 · 海外版本提供年度订阅优惠
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 border-t border-white/10 relative">
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="mx-auto max-w-4xl px-4 relative z-10">
          <h3 className="text-2xl md:text-4xl font-semibold">常见问题</h3>
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>我的梦很零碎，也能分析吗？</AccordionTrigger>
              <AccordionContent>
                可以。即使是关键词或一句话也能形成基础图谱；内容越多，洞察越深。起床60秒内记录效果最佳。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>隐私如何保证？数据存储在哪里？</AccordionTrigger>
              <AccordionContent>
                默认本地SQLite加密保存，支持端到端加密；云同步为可选项，传输与存储均加密，遵守GDPR和日本个人情报法，可随时一键清除所有数据。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>抽卡是不是"迷信"？有科学依据吗？</AccordionTrigger>
              <AccordionContent>
                我们将梦象、情绪与当下目标映射为「行动建议卡」，结合心理学和养生学原理。它更像是温和的决策推力与自我反思提示，重点在可执行的健康行动。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Persona是什么？如何解锁？</AccordionTrigger>
              <AccordionContent>
                Persona是基于你重复梦象和情绪模式生成的陪伴人格。当特定符号或情绪在梦中反复出现时，对应Persona会自动解锁，提供个性化的7日挑战和日常指引。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="mx-auto max-w-5xl px-4 relative z-10">
          <Card className={specialGlassStyles.cta}>
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className={`text-2xl md:text-4xl font-semibold ${glassCardStyles.text.primary}`}>{t.cta.title}</h3>
              <p className={`mt-3 ${glassCardStyles.text.muted}`}>{t.cta.description}</p>
              <div className="mt-6 flex justify-center gap-3">
                <Button className="bg-indigo-500/80 hover:bg-indigo-400/90 backdrop-blur-sm border border-white/10">{t.cta.downloadApp}</Button>
                <Button variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-slate-200">
                  {t.cta.tryBrowser}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 relative">
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          {/* 医疗声明 */}
          <div className={`mb-6 p-4 rounded-xl ${glassCardStyles.base} text-center`}>
            <p className={`text-sm ${glassCardStyles.text.muted} leading-relaxed`}>
              <strong className={glassCardStyles.text.secondary}>重要声明：</strong>
              所有建议仅作日常参考，不替代医疗或心理治疗。如有睡眠障碍、情绪问题或其他健康状况，请咨询专业医护人员。
              Hz 音频常被用于放松冥想，体验因人而异。
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-cyan-300" />
              <span>DreamLife © {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-6">
              <a className="hover:text-slate-200" href="#">
                {t.footer.links.privacy}
              </a>
              <a className="hover:text-slate-200" href="#">
                {t.footer.links.terms}
              </a>
              <a className="hover:text-slate-200" href="#">
                {t.footer.links.contact}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
