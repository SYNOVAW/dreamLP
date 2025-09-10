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
import { glassCardStyles } from "@/lib/card-styles"
import { Emoji, EMOJIS } from "@/components/emoji"
import LoadingScreen from "@/components/loading-screen"
import ConstellationCardsSection from "@/components/constellation-cards-section"
import { 
  TypewriterText, 
  WordReveal, 
  SparkleText, 
  GradientText, 
  FloatingLetters,
  MagicalReveal,
  ShimmerText 
} from "@/components/magical-typography"

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
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 16 } },
}

const animationVariants = {
  nebulaSwirl: {
    animate: {
      rotate: 360,
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        rotate: { duration: 20, repeat: Infinity, ease: "linear" as const },
        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
        opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
      },
    },
  },
  logoGlow: {
    animate: {
      filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
    },
  },
  buttonMagical: {
    rest: { scale: 1, boxShadow: "0 0 0 0 rgba(168, 85, 247, 0)" },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 0 20px 5px rgba(168, 85, 247, 0.3)",
      background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
    },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  },
  cardBreathing: {
    animate: {
      scale: [1, 1.02, 1],
      rotateZ: [0, 1, 0],
      boxShadow: [
        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "0 10px 15px -3px rgba(168, 85, 247, 0.1)",
        "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      ],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
    },
  },
  starTwinkle: {
    animate: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 180, 360],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const, times: [0, 0.5, 1] },
    },
  },
}

/* AI Card Art helpers + PersonaCardPro */
function CardArt({ seed, personaName }: { seed: string; personaName?: string }) {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [imageSrc, setImageSrc] = React.useState<string | null>(null)
  
  // 程序化渐变作为后备
  const idx = Math.abs(hashStr(seed)) % 3;
  const gradients = [
    "from-[#ff5f6d]/30 via-[#ff7a85]/20 to-[#a855f7]/30",
    "from-[#a855f7]/30 via-[#7dd3fc]/20 to-[#ff5f6d]/30",
    "from-[#22d3ee]/20 via-[#a78bfa]/20 to-[#ff7a85]/25",
  ];
  
  // 根据persona名称确定图片路径
  React.useEffect(() => {
    if (personaName) {
      // 提取persona的关键词来匹配图片文件名
      let imageFileName = ''
      if (personaName.includes('MIRA') || personaName.includes('静谧')) {
        imageFileName = 'MIRA.jpg'
      } else if (personaName.includes('IGNIS') || personaName.includes('炽羽')) {
        imageFileName = 'IGNIS.jpg'
      } else if (personaName.includes('ECHO') || personaName.includes('回响')) {
        imageFileName = 'ECHO.jpg'
      }
      
      if (imageFileName) {
        setImageSrc(`/${imageFileName}`)
      }
    }
  }, [personaName])
  
  return (
    <div className={`w-full rounded-xl border border-white/10 bg-gradient-to-br ${gradients[idx]} relative overflow-hidden`} style={{ aspectRatio: '3/5' }}>
      {/* 程序化渐变背景（作为后备或加载状态） */}
      {!imageLoaded && (
        <>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage:
              'radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.5) 0, transparent 60%),'+
              'radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,.5) 0, transparent 60%),'+
              'radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,.4) 0, transparent 60%)'
          }}/>
          <div className="absolute -top-6 -right-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
        </>
      )}
      
      {/* 真实AI图片 */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={`${personaName} AI Art`}
          className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            if (process.env.NODE_ENV === 'development') {
              console.log(`Failed to load image: ${imageSrc}`)
            }
            setImageSrc(null) // 回退到程序化渐变
          }}
        />
      )}
      
      {/* 渐变遮罩层，确保文字可读性 */}
      
    </div>
  );
}

function hashStr(s: string){ let h=0; for(let i=0;i<s.length;i++){ h=((h<<5)-h)+s.charCodeAt(i); h|=0; } return h; }

/** FlipCard：支持点击/回车/空格翻转，桌面可 hover 翻转（可关） */
function FlipCard({
  front,
  back,
  hover = true,
  className = ""
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  hover?: boolean;
  className?: string;
}) {
  const [flipped, setFlipped] = React.useState(false);
  const { t } = useLocale();

  const toggle = () => setFlipped((v) => !v);

  return (
    <div
      className={`relative w-full cursor-pointer select-none ${className}`}
      style={{ perspective: 1200, aspectRatio: '3/5' }}
    >
      <motion.button
        type="button"
        aria-pressed={flipped}
        aria-label={flipped ? t.ui.cardFlip.viewFront : t.ui.cardFlip.viewBack}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggle();
          }
        }}
        className="group absolute inset-0 w-full h-full outline-none focus:ring-2 focus:ring-fuchsia-500/40 rounded-2xl"
        whileTap={{ scale: 0.985 }}
        onMouseEnter={hover ? () => setFlipped(true) : undefined}
        onMouseLeave={hover ? () => setFlipped(false) : undefined}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Front */}
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
            {front}
          </div>
          {/* Back */}
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            {back}
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}

function copyPersonaPrompt(name: string, theme: string, t: any){
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
    alert(t.ui.copyPrompt);
  }
}

function PersonaFlipCard({
  name, line, tip, sr, img
}: { name: string; line: string; tip: string; sr: number; img: string }) {
  const { t } = useLocale()
  
  const handleCardInteraction = () => {
    // 埋点：Persona卡片交互
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'persona_card_flip', { name })
    }
  }

  return (
    <FlipCard
      className="rounded-2xl"
      hover={false} // 移动端友好，只用点击翻转
      front={
        <div className={`h-full rounded-2xl ${glassCardStyles.base} overflow-hidden flex flex-col`}>
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
            <div className={`text-sm ${glassCardStyles.text.primary}`}>{name}</div>
            <div className={`text-xs ${glassCardStyles.text.subtle}`}>SR {sr}</div>
          </div>
          <div className="flex-1 relative">
            <img
              src={img}
              alt={`${name} card art`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
              <span className="text-xs text-slate-300">点击翻面</span>
            </div>
          </div>
        </div>
      }
      back={
        <div className={`h-full rounded-2xl ${glassCardStyles.base} p-4`}>
          <div className="flex items-center justify-between">
            <div className={`text-sm ${glassCardStyles.text.primary}`}>{name}</div>
            <div className={`text-xs ${glassCardStyles.text.subtle}`}>SR {sr}</div>
          </div>
          <div className={`mt-2 text-sm ${glassCardStyles.text.muted}`}>{t.persona.themeLabel}{line}</div>
          <div className={`mt-3 text-xs ${glassCardStyles.text.muted} leading-relaxed`}>
            <div className={`mb-2 font-medium ${glassCardStyles.text.secondary}`}>今日解析</div>
            <p>
              梦中的符号指向「{line}」。建议从小处着手：{tip}。若出现犹豫，
              先做 2 分钟呼吸，再选择一个 5 分钟内能完成的小动作。
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1">
              <li>行动 ①：4-7-8 呼吸 × 3 轮</li>
              <li>行动 ②：{tip}</li>
              <li>行动 ③：记录今日感受</li>
            </ul>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-slate-200 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                copyPersonaPrompt(name, line, t)
              }}
            >
              {t.ui.buttons.copyAIPrompt}
            </Button>
          </div>
          <div className={`mt-3 text-xs ${glassCardStyles.text.subtle}`}>
            点击可翻面 / 空格或回车也可
          </div>
        </div>
      }
    />
  );
}

// 保留原版本作为备用
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
        <CardArt seed={artSeed || name} personaName={name} />
        <div className={`mt-3 text-sm ${glassCardStyles.text.muted}`}>{t.persona.themeLabel}{line}</div>
        <div className={`mt-2 text-xs ${glassCardStyles.text.subtle}`}>{t.persona.tipLabel}{tip}</div>
        <div className="mt-3 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-slate-200"
            onClick={() => copyPersonaPrompt(name, line, t)}
          >
            {t.ui.buttons.copyDrawPrompt}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureCard({ icon, title, desc, details }: { icon: React.ReactNode; title: string; desc: string; details?: string }) {
  return (
    <Card className={`${glassCardStyles.hover}`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${glassCardStyles.text.primary}`}>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`${glassCardStyles.text.muted} text-sm leading-relaxed mb-2`}>{desc}</p>
        {details && (
          <p className={`${glassCardStyles.text.subtle} text-xs leading-relaxed`}>{details}</p>
        )}
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
      className={`${glassCardStyles.base} ${highlight ? 'shadow-2xl border-fuchsia-400/30' : ''}`}
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
  const [birthday, setBirthday] = useState("")
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
      setBirthday('')
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
    <form onSubmit={onSubmit} className="mt-4 grid gap-3 md:grid-cols-[1fr_150px_180px_160px]">
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
      
      <input
        type="date"
        value={birthday}
        disabled={isSubmitting}
        onChange={(e) => setBirthday(e.target.value)}
        placeholder={t.waitlist.birthdayPlaceholder}
        className={`h-11 rounded-lg border border-white/15 bg-white/10 backdrop-blur-sm px-3 text-sm ${glassCardStyles.text.primary} placeholder:${glassCardStyles.text.subtle} focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70`}
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
          <Stars className="mr-1 h-4 w-4" />
          {isSubmitting ? t.waitlist.submitting : t.waitlist.joinButton}
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

/* —— Creative Lab：AI 歌曲 & AI 短视频 —— */
function CreativeLabSection(){
  const [tab, setTab] = React.useState<'music'|'video'>('music');
  return (
    <section id="creative" className="py-16 md:py-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-2xl md:text-4xl font-semibold text-slate-100">创作实验室 · AI 歌曲 & 短视频</h3>
            <p className="mt-2 text-slate-300/90">让昨夜的梦，长成一段旋律或 15s 影像。支持 Persona 主题、情绪/Hz 氛围、一键生成。</p>
          </div>
          <div className="inline-flex rounded-lg border border-white/10 overflow-hidden">
            <button onClick={()=>setTab('music')}
              className={`px-3 py-2 text-sm transition-all ${tab==='music'?'bg-white/10 text-white':'text-slate-300 hover:bg-white/5'}`}>AI 歌曲</button>
            <button onClick={()=>setTab('video')}
              className={`px-3 py-2 text-sm transition-all ${tab==='video'?'bg-white/10 text-white':'text-slate-300 hover:bg-white/5'}`}>AI 短视频</button>
          </div>
        </div>

        <div className="mt-8">
          {tab==='music' ? <MusicGenerator/> : <VideoGenerator/>}
        </div>

        <p className="mt-6 text-xs text-slate-400">
          * 创作内容仅作娱乐与个人灵感用途。请确保你拥有上传素材的版权；生成作品不应侵犯第三方权利或冒用他人声音/形象。
        </p>
      </div>
    </section>
  );
}

/* ——— AI 歌曲 —— */
function MusicGenerator(){
  const { t } = useLocale();
  const [mood, setMood] = React.useState('平静 · 432Hz');
  const [persona, setPersona] = React.useState('MIRA（安抚）');
  const [prompt, setPrompt] = React.useState('昨夜梦到在紫色海面漂浮，微风和远处灯塔。');
  const [dur, setDur] = React.useState(20);
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState<string | null>(null);

  const generate = async ()=>{
    setLoading(true); setUrl(null);
    
    // 埋点：AI音乐生成
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ai_music_generate', { 
        persona, 
        mood, 
        duration: dur 
      })
    }
    
    // TODO: 接后端 /api/ai-music 生成并返回 {url}
    // const res = await fetch('/api/ai-music',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt,mood,persona,duration:dur})});
    // const { url } = await res.json();
    await new Promise(r=>setTimeout(r,1200)); // demo
    setUrl('/audio/demo-ambient-20s.mp3');    // 占位
    setLoading(false);
  };

  return (
    <Card className={`${glassCardStyles.base}`}>
      <CardHeader>
        <CardTitle className={glassCardStyles.text.primary}>AI 歌曲生成</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-3">
          <SelectBox label="Persona 主题" value={persona} onChange={setPersona}
            options={['MIRA（安抚）','IGNIS（激励）','ECHO（反思）']}/>
          <SelectBox label="情绪/频率" value={mood} onChange={setMood}
            options={['平静 · 432Hz','疗愈 · 528Hz','觉醒 · 963Hz','专注 · 无Hz标签']}/>
          <div>
            <div className="text-xs text-slate-400 mb-1">时长（秒）</div>
            <input type="number" min={10} max={60} value={dur} onChange={e=>setDur(parseInt(e.target.value||'20'))}
              className="w-full h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-slate-100"/>
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-1">{t.ui.labels.lyricsPrompt}</div>
          <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={3}
            placeholder={t.ui.placeholder.dreamScenes}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"/>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button onClick={generate} disabled={loading} className="bg-gradient-to-r from-[#ff5f6d] to-[#a855f7] hover:opacity-90 text-white">
            {loading ? t.ui.buttons.generating : t.ui.buttons.generate}
          </Button>
          <Button variant="outline" className="border-white/20 text-slate-200 hover:bg-white/10" onClick={()=>setPrompt(draftFromPersona(persona))}>
            {t.ui.buttons.autoFill}
          </Button>
        </div>
        {loading && <FakeProgress label={t.ui.progress.renderingAudio} />}
        {url && (
          <div className="mt-2">
            <audio controls preload="none" className="w-full">
              <source src={url} type="audio/mpeg" />
            </audio>
            <div className="mt-2 text-xs text-slate-400">{t.ui.placeholder_note.audio}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ——— AI 短视频 —— */
function VideoGenerator(){
  const { t } = useLocale();
  const [style, setStyle] = React.useState('梦境水彩 · 粒子光');
  const [ratio, setRatio] = React.useState('9:16');
  const [script, setScript] = React.useState('紫色海面、星屑、远处灯塔，镜头慢推；结尾出现今日卡牌。');
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState<string | null>(null);

  const generate = async ()=>{
    setLoading(true); setUrl(null);
    
    // 埋点：AI视频生成
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ai_video_generate', { 
        style, 
        ratio 
      })
    }
    
    // TODO: 接后端 /api/ai-video 生成并返回 {url, cover}
    await new Promise(r=>setTimeout(r,1500)); // demo
    setUrl('/video/demo-clip-15s.mp4');       // 占位
    setLoading(false);
  };

  return (
    <Card className={`${glassCardStyles.base}`}>
      <CardHeader>
        <CardTitle className={glassCardStyles.text.primary}>AI 短视频制作</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-3">
          <SelectBox label="风格" value={style} onChange={setStyle}
            options={['梦境水彩 · 粒子光','霓虹赛博 · 星空','柔雾电影感','线性渐变 · 抽象']}/>
          <SelectBox label="画幅" value={ratio} onChange={setRatio}
            options={['9:16','1:1','16:9']}/>
          <SelectBox label="节奏" value={'慢'} onChange={()=>{}} options={['慢','中','快']}/>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-1">{t.ui.labels.videoScript}</div>
          <textarea rows={3} value={script} onChange={e=>setScript(e.target.value)}
            placeholder={t.ui.placeholder.videoScript}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"/>
        </div>
        <div className="flex gap-3 flex-wrap">
          <UploadButton label={t.ui.buttons.uploadMaterial} accept="image/*,video/*" />
          <Button onClick={generate} disabled={loading} className="bg-gradient-to-r from-[#ff5f6d] to-[#a855f7] hover:opacity-90 text-white">
            {loading ? t.ui.buttons.generating : t.ui.buttons.generateVideo}
          </Button>
          <Button variant="outline" className="border-white/20 text-slate-200 hover:bg-white/10"
            onClick={()=>setScript(t.ui.template.videoScript)}>
            {t.ui.buttons.useTemplate}
          </Button>
        </div>
        {loading && <FakeProgress label={t.ui.progress.renderingVideo} />}
        {url && (
          <div className="mt-2">
            <video controls playsInline className="w-full rounded-lg border border-white/10 bg-black">
              <source src={url} type="video/mp4" />
            </video>
            <div className="mt-2 text-xs text-slate-400">{t.ui.placeholder_note.video}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ——— 小组件 —— */
function SelectBox({label,value,onChange,options}:{label:string;value:string;onChange:(v:string)=>void;options:string[]}) {
  return (
    <div>
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <select value={value} onChange={e=>onChange(e.target.value)}
        className="w-full h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-slate-100">
        {options.map(o=> <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
function UploadButton({label,accept}:{label:string;accept:string}){
  const id = React.useId();
  return (
    <div className="relative">
      <input id={id} type="file" accept={accept} className="sr-only" multiple />
      <label htmlFor={id} className="inline-flex h-11 items-center px-3 rounded-lg border border-white/20 bg-white/5 text-sm text-slate-200 hover:bg-white/10 cursor-pointer transition-all">
        {label}
      </label>
    </div>
  );
}
function FakeProgress({label}:{label:string}){
  return (
    <div className="mt-2">
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="h-2 w-full rounded bg-white/5 overflow-hidden">
        <div className="h-full w-1/3 animate-[progress_1.2s_ease-in-out_infinite] bg-gradient-to-r from-[#ff5f6d] to-[#a855f7]" />
      </div>
      <style>{`@keyframes progress{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
    </div>
  );
}
function draftFromPersona(p:string){
  if(p.includes('MIRA')) return '温柔女声哼唱，Lo-fi + pad + 海风与风铃，节拍 70BPM，平静、呼吸感';
  if(p.includes('IGNIS')) return '鼓点有推进，合成主旋律与火花粒子音效，95BPM，正向、行动力';
  return '钢琴与弦乐碎片，轻回声，慢速 65BPM，反思、留白';
}

/* —— AI電気羊数羊 AI Electric Sheep Counting —— */
function SheepCountingSection(){
  const { t } = useLocale()
  const [sheepCount, setSheepCount] = React.useState(0)
  const [isCounting, setIsCounting] = React.useState(false)
  const [currentSheep, setCurrentSheep] = React.useState<{id: number, type: 'normal' | 'rare', message?: string} | null>(null)
  const [wellnessTip, setWellnessTip] = React.useState<React.ReactElement | null>(null)
  const [showCompletion, setShowCompletion] = React.useState(false)

  // 养生提示
  const wellnessTips = [
    <><Emoji emoji={EMOJIS.SLEEP} size={16} /> 今晚别刷手机太久，23:30前关屏</>,
    <><Emoji emoji={EMOJIS.LEAF} size={16} /> 明日晨起试试温水 + 柠檬</>,
    <><Emoji emoji={EMOJIS.MOON} size={16} /> 梦见月亮时，适合冥想 3 分钟</>,
    <><Emoji emoji={EMOJIS.TEA} size={16} /> 睡前1小时避免咖啡因</>,
    <><Emoji emoji={EMOJIS.MEDITATION} size={16} /> 深呼吸5次，让身体放松</>,
    <><Emoji emoji={EMOJIS.COMPUTER} size={16} /> 把手机放在床外，减少蓝光干扰</>
  ]

  // 数羊开始
  const startCounting = () => {
    setIsCounting(true)
    setSheepCount(0)
    setCurrentSheep(null)
    setWellnessTip(null)
    setShowCompletion(false)
    
    // 埋点：数羊开始
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sheep_counting_start', {
        session_id: Date.now()
      })
    }
  }

  // 数羊クリック
  const countSheep = () => {
    if (!isCounting) return

    const newCount = sheepCount + 1
    setSheepCount(newCount)

    // 随机生成羊的类型
    const isRare = Math.random() < 0.15 // 15%概率出现稀有羊
    const sheepType = isRare ? 'rare' : 'normal'
    
    const sheep = {
      id: newCount,
      type: sheepType as "normal" | "rare",
      message: sheepType === 'rare' ? '✨ 稀有梦之羊出现了！' : undefined
    }
    
    setCurrentSheep(sheep)

    // 每5只羊给一个养生提示
    if (newCount % 5 === 0) {
      const randomTip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)]
      setWellnessTip(randomTip)
    }

    // 数到20只羊完成
    if (newCount >= 20) {
      setIsCounting(false)
      setShowCompletion(true)
      
      // 埋点：数羊完成
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'sheep_counting_complete', {
          total_sheep: newCount,
          session_id: Date.now()
        })
      }
    }
  }

  // 重置
  const resetCounting = () => {
    setIsCounting(false)
    setSheepCount(0)
    setCurrentSheep(null)
    setWellnessTip(null)
    setShowCompletion(false)
  }

  return (
    <section id="sheep-counting" className="py-16 md:py-24 border-t border-white/10 relative">
      
      
      <div className="mx-auto max-w-4xl px-4 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-800/60 px-4 py-2 text-sm text-slate-200 mb-6">
            <Sparkles className="h-4 w-4" /> AI電気羊数羊
          </motion.div>
          
          <motion.h2 
            variants={item}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            数えた羊が、夢のカードになる
          </motion.h2>
          
          <motion.p 
            variants={item}
            className="text-slate-300/80 text-lg max-w-2xl mx-auto"
          >
            AI電気羊と一緒に数える、眠りの儀式
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.div variants={item} className="max-w-md mx-auto">
            {/* 数羊エリア */}
            <div className={`${glassCardStyles.base} p-8 border border-white/20 mb-6`}>
              {/* 羊カウンター */}
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-white mb-2">
                  {sheepCount}
                </div>
                <div className="text-slate-300">只羊</div>
              </div>

              {/* 現在の羊 */}
              {currentSheep && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="mb-6"
                >
                  <div className={`text-4xl mb-2 ${currentSheep.type === 'rare' ? 'animate-pulse' : ''}`}>
                    {currentSheep.type === 'rare' ? (
                      <>
                        <Emoji emoji={EMOJIS.SPARKLES} size={32} />
                        <Emoji emoji={EMOJIS.SHEEP} size={32} />
                      </>
                    ) : (
                      <Emoji emoji={EMOJIS.SHEEP} size={32} />
                    )}
                  </div>
                  {currentSheep.message && (
                    <div className="text-sm text-yellow-300 animate-bounce">
                      {currentSheep.message}
                    </div>
                  )}
                </motion.div>
              )}

              {/* 数羊ボタン */}
              {!showCompletion && (
                <div className="space-y-4">
                  {!isCounting ? (
                    <Button
                      onClick={startCounting}
                      className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      开始数羊仪式
                    </Button>
                  ) : (
                    <Button
                      onClick={countSheep}
                      className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <Emoji emoji={EMOJIS.SHEEP} size={24} className="mr-2" />
                      数一只羊
                    </Button>
                  )}
                </div>
              )}

              {/* 完成画面 */}
              {showCompletion && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-white mb-2">数羊仪式完成！</h3>
                  <p className="text-slate-300 mb-4">你已经数了 {sheepCount} 只羊，现在可以安心入睡了</p>
                  <Button
                    onClick={resetCounting}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    重新开始
                  </Button>
                </motion.div>
              )}
            </div>

            {/* 养生提示 */}
            {wellnessTip && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${glassCardStyles.base} p-4 border border-white/20 mb-4`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
                  <p className="text-slate-200 text-sm">{wellnessTip}</p>
                </div>
              </motion.div>
            )}

            {/* 羊群图鉴提示 */}
            <div className={`${glassCardStyles.base} p-4 border border-white/20`}>
              <h4 className="text-sm font-semibold text-white mb-2">羊群图鉴</h4>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-300">
                <div className="text-center">
                  <div className="text-lg">
                    <Emoji emoji={EMOJIS.SHEEP} size={20} />
                  </div>
                  <div>普通羊</div>
                  <div className="text-slate-400">1-9只</div>
                </div>
                <div className="text-center">
                  <div className="text-lg">
                    <Emoji emoji={EMOJIS.STAR} size={20} />
                    <Emoji emoji={EMOJIS.SHEEP} size={20} />
                  </div>
                  <div>梦之羊</div>
                  <div className="text-slate-400">10-19只</div>
                </div>
                <div className="text-center">
                  <div className="text-lg">
                    <Emoji emoji={EMOJIS.SPARKLES} size={20} />
                    <Emoji emoji={EMOJIS.SHEEP} size={20} />
                  </div>
                  <div>稀有羊</div>
                  <div className="text-slate-400">随机出现</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* —— 赛博养生 Cyber Wellness —— */
function CyberWellnessSection(){
  const { t } = useLocale()
  
  const [activeWellness, setActiveWellness] = React.useState<string | null>(null)
  const [wellnessResult, setWellnessResult] = React.useState<string | null>(null)

  // 梦境处方生成
  const generateDreamPrescription = () => {
    const prescriptions = [
      "今日处方：喝一杯温热的柚子茶，进行10分钟深呼吸冥想。",
      "今日处方：进行30分钟有氧运动，喝一杯生姜茶提升活力。",
      "今日处方：写日记记录感受，喝一杯薰衣草茶放松心情。",
      "今日处方：听432Hz音乐15分钟，喝一杯薄荷茶清新头脑。",
      "今日处方：进行瑜伽拉伸，喝一杯玫瑰花茶滋养身心。"
    ]
    return prescriptions[Math.floor(Math.random() * prescriptions.length)]
  }

  // 虚拟温泉呼吸引导
  const startVirtualSpa = () => {
    setActiveWellness('spa')
    // 埋点：虚拟温泉开始
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ritual_start', {
        ritual_type: 'virtual_spa'
      })
    }
    
    // 5秒後に完成
    setTimeout(() => {
      setActiveWellness(null)
      setWellnessResult('温泉疗法完成！身心得到深度放松。')
      // 埋点：虚拟温泉完成
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ritual_done', {
          ritual_type: 'virtual_spa'
        })
      }
    }, 5000)
  }

  // 赛博药膳推荐
  const generateDreamDrink = () => {
    const drinks = [
      "梦见森林？来一杯抹茶，感受自然的清新。",
      "梦见星空？今晚适合紫苏茶，让思绪如星光般闪烁。",
      "梦见海洋？推荐柠檬蜂蜜茶，如海风般清爽。",
      "梦见花朵？玫瑰花茶最适合，让花香伴随入梦。",
      "梦见火焰？生姜茶能温暖身心，点燃内在能量。"
    ]
    return drinks[Math.floor(Math.random() * drinks.length)]
  }

  const wellnessCards = [
    {
      icon: <Emoji emoji={EMOJIS.MOON} size={24} />,
      title: "梦境处方签",
      description: "AI電気羊解读昨夜的梦，为你开出今日的小处方。可能是一杯柚子茶、一次深呼吸，或是一段短冥想。",
      cta: "解锁今日处方",
      gradient: "from-white/5 to-white/10",
      borderGradient: "from-white/20 to-white/30",
      action: () => {
        const prescription = generateDreamPrescription()
        setWellnessResult(prescription)
        // 埋点：梦境处方生成
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'ritual_start', {
            ritual_type: 'dream_prescription'
          })
        }
      }
    },
    {
      icon: <Emoji emoji={EMOJIS.SPA} size={24} />,
      title: "虚拟温泉",
      description: "闭上眼睛，进入数字温泉。屏幕中的热气与光晕，配合呼吸引导，就像身体在赛博温泉中复原。",
      cta: activeWellness === 'spa' ? "温泉中..." : "开始温泉疗法",
      gradient: "from-white/5 to-white/10",
      borderGradient: "from-white/20 to-white/30",
      action: startVirtualSpa
    },
    {
      icon: <Emoji emoji={EMOJIS.TEA} size={24} />,
      title: "赛博药膳",
      description: "将梦境色彩转化为饮品推荐。梦见森林？来一杯抹茶。梦见星空？今晚适合紫苏茶。",
      cta: "冲泡我的梦饮",
      gradient: "from-white/5 to-white/10",
      borderGradient: "from-white/20 to-white/30",
      action: () => {
        const drink = generateDreamDrink()
        setWellnessResult(drink)
        // 埋点：赛博药膳生成
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'ritual_start', {
            ritual_type: 'cyber_medicine'
          })
        }
      }
    }
  ]

  return (
    <section id="cyber-wellness" className="py-16 md:py-24 border-t border-white/10 relative">
      
      
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-800/60 px-4 py-2 text-sm text-slate-200 mb-6">
            <Sparkles className="h-4 w-4" /> 赛博养生 Cyber Wellness
          </motion.div>
          
          <motion.h2 
            variants={item}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            让梦境成为你的每日养生处方
          </motion.h2>
          
          <motion.p 
            variants={item}
            className="text-slate-300/80 text-lg max-w-2xl mx-auto"
          >
            在梦与代码之间，重启身体
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {wellnessCards.map((card, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`group relative rounded-2xl p-6 ${glassCardStyles.base} border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10 hover:scale-105`}
            >
              {/* 能量场效果 */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-white transition-colors">
                  {card?.title || 'Untitled'}
                </h3>
                
                <p className="text-sm text-slate-300/80 mb-6 leading-relaxed">
                  {card.description}
                </p>
                
                <Button 
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    card.action()
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'cyber_wellness_click', {
                        card_type: card?.title || 'unknown',
                        card_index: index
                      })
                    }
                  }}
                  disabled={activeWellness === 'spa'}
                >
                  {card.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* 养生结果展示 */}
        {wellnessResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className={`${glassCardStyles.base} p-6 border border-white/20 bg-white/5`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
                <h3 className="text-lg font-semibold text-white">养生处方已生成</h3>
              </div>
              <p className="text-slate-200 leading-relaxed">{wellnessResult}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 border-white/20 text-white hover:bg-white/10"
                onClick={() => setWellnessResult(null)}
              >
                关闭
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

/* —— AI Electric Sheep：合梦创造 —— */
function AIElectricSheepSection(){
  const { t } = useLocale()
  const [dreamInput, setDreamInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [dreamResult, setDreamResult] = React.useState<{title: string, music: string, video: string} | null>(null)

  const handleDreamGeneration = async () => {
    if (!dreamInput.trim()) return
    setLoading(true)
    
    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ai_electric_sheep_generate', {
        input_length: dreamInput.length
      })
    }
    
    // Simulate AI processing
    await new Promise(r => setTimeout(r, 2500))
    
    setDreamResult({
      title: '午夜的电子牧场',
      music: '/audio/electric-sheep-dream.mp3',
      video: '/video/electric-sheep-visual.mp4'
    })
    
    setLoading(false)
  }

  return (
    <section className="py-16 md:py-24 border-t border-white/10 relative">
      
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-4">
            <span>⚡</span>
            <span>灵感来自《Do Androids Dream of Electric Sheep?》</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-semibold text-slate-100">
            AI電気羊 · 合梦创造
          </h3>
          <p className="mt-3 text-slate-300/90 max-w-3xl mx-auto">
            不只解读梦境，更与AI共同造梦。输入昨夜片段，AI将与你共同编织新的梦境，生成专属音乐与影像。
          </p>
        </div>

        <Card className={`${glassCardStyles.base} mb-8`}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <label className="text-sm font-medium text-slate-200 block">
                写下昨夜的一个梦片段...
              </label>
              <textarea
                value={dreamInput}
                onChange={(e) => setDreamInput(e.target.value)}
                placeholder="例如：在紫色海面漂浮，远处有灯塔的光..."
                className="w-full h-32 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-3 text-slate-100 placeholder:text-slate-500 resize-none focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
              <div className="flex justify-between items-center">
                <Button 
                  onClick={handleDreamGeneration}
                  disabled={loading || !dreamInput.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-3 font-medium"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⚡</span>
                      正在编织梦境...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">⚡</span>
                      与AI一起做梦
                    </>
                  )}
                </Button>
                <span className="text-xs text-slate-400">{dreamInput.length}/500</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading && (
          <Card className={`${glassCardStyles.base} mb-8`}>
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center animate-pulse">
                  <span className="text-2xl animate-spin">⚡</span>
                </div>
                <p className="text-slate-300">AI正在与你的潜意识对话...</p>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full w-3/5 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {dreamResult && (
          <Card className={`${glassCardStyles.base} mb-8`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <span>✨</span>
                {dreamResult?.title || 'Dream Result'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-200 mb-3">梦境音乐已生成</h4>
                  <audio controls preload="none" className="w-full mb-3">
                    <source src={dreamResult.music} type="audio/mpeg" />
                  </audio>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-cyan-400/20 text-cyan-300">
                      聆听
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-slate-300">
                      分享
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-200 mb-3">梦境影像已生成</h4>
                  <video controls playsInline className="w-full rounded-lg mb-3">
                    <source src={dreamResult.video} type="video/mp4" />
                  </video>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-purple-400/20 text-purple-300">
                      观看
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-slate-300">
                      重新编织
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-8">
          <h4 className="text-lg font-semibold text-slate-200 mb-4 text-center">Persona 梦境世界</h4>
          <p className="text-slate-400 text-center mb-6 text-sm">每个Persona都有独特的梦境色彩与音景</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card className={`${glassCardStyles.hover} cursor-pointer group transition-all duration-300 hover:bg-gradient-to-br hover:from-green-600/20 hover:to-blue-600/20 hover:border-green-400/30`}>
              <CardContent className="p-4 text-center space-y-2">
                <div className="text-2xl mb-2">🌲</div>
                <h5 className="font-medium text-slate-200">静谧森林</h5>
                <p className="text-xs text-slate-400">薄雾中的古树与流水声，432Hz自然频率</p>
                <div className="text-xs text-slate-300 font-medium">MIRA · 安抚 · 治愈</div>
              </CardContent>
            </Card>
            
            <Card className={`${glassCardStyles.hover} cursor-pointer group transition-all duration-300 hover:bg-gradient-to-br hover:from-red-600/20 hover:to-orange-600/20 hover:border-red-400/30`}>
              <CardContent className="p-4 text-center space-y-2">
                <div className="text-2xl mb-2">
                  <Emoji emoji={EMOJIS.FIRE} size={24} />
                </div>
                <h5 className="font-medium text-slate-200">火焰都市</h5>
                <p className="text-xs text-slate-400">霓虹赛博空间，电子律动与合成器</p>
                <div className="text-xs text-slate-300 font-medium">IGNIS · 激励 · 探索</div>
              </CardContent>
            </Card>
            
            <Card className={`${glassCardStyles.hover} cursor-pointer group transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-blue-600/20 hover:border-purple-400/30`}>
              <CardContent className="p-4 text-center space-y-2">
                <div className="text-2xl mb-2">
                  <Emoji emoji="🪞" size={24} />
                </div>
                <h5 className="font-medium text-slate-200">镜之迷宫</h5>
                <p className="text-xs text-slate-400">多维度反射空间，环绕音效与回响</p>
                <div className="text-xs text-slate-300 font-medium">ECHO · 反思 · 洞察</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className={`${glassCardStyles.base} mb-8`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-200">
              <Emoji emoji={EMOJIS.USERS} size={20} />
              邀请其他人合梦
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 text-sm mb-4">分享梦境链接，让朋友一起参与梦境创造</p>
            <div className="flex gap-3 flex-wrap">
              <Button 
                variant="outline" 
                className="border-white/20 text-slate-200 hover:bg-white/10"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'collaborative_dream_click')
                  }
                }}
              >
                生成合梦链接
              </Button>
            </div>
            <div className="text-xs text-slate-500 mt-3">最多4人同时合梦</div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            专业版用户享有无限合梦次数与高品质输出 ·
            <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto text-xs ml-1">
              升级解锁
            </Button>
          </p>
        </div>
      </div>
    </section>
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
  const [isLoading, setIsLoading] = useState(true)
  const [currentCopyIndex, setCurrentCopyIndex] = React.useState(0)
  
  // ローディング完了ハンドラー
  const handleLoadingComplete = () => {
    setIsLoading(false)
  }
  
  // AI電気羊コピー群
  const aiSheepCopies = [
    "夢は、もう人間だけのものじゃない。AI電気羊と、ともに。",
    "AI電気羊が、今夜の夢をカードに変える。",
    "人とAIが、ともに夢を見る最初の時代。",
    "もしAIが夢を見るなら、その夢はあなたと重なる。",
    "AI電気羊が囁く、あなたのもうひとつの現実。",
    "眠りの物語を、AI電気羊とクエストに。"
  ]
  
  // スクロール検知とコピー切り替え
  React.useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const scrollProgress = Math.min(scrollY / (windowHeight * 2), 1) // 2画面分で切り替え
      const newIndex = Math.floor(scrollProgress * (aiSheepCopies.length - 1))
      
      if (newIndex !== currentCopyIndex) {
        setCurrentCopyIndex(newIndex)
        
        // 埋点：AI電気羊コピー切り替え
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'ai_sheep_copy_change', {
            copy_index: newIndex,
            copy_text: aiSheepCopies[newIndex]
          })
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentCopyIndex])
  
  // 页面浏览埋点
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lp_view', { page: 'landing' })
    }
  }, [])
  
  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className="min-h-screen text-slate-100 relative overflow-hidden">

      {/* 梦幻紫色背景动画 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-fuchsia-500/8 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/5 via-fuchsia-600/5 to-cyan-600/5 rounded-full blur-3xl animate-spin-slow" />
        
        {/* 额外的梦境粒子效果 */}
        <div className="absolute top-1/4 left-1/2 w-32 h-32 bg-violet-400/5 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-pink-400/8 rounded-full blur-2xl animate-float" style={{animationDelay: '1.5s'}} />
        <div className="absolute top-2/3 left-1/4 w-16 h-16 bg-blue-400/6 rounded-full blur-xl animate-twinkle" />
      </div>
      {/* Top nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10">
              <img 
                src="/logo.jpg" 
                alt="REMia Logo" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="font-semibold tracking-wide text-slate-100">REMia</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white transition">
              {t.nav.features}
            </a>
            <a href="#meditation" className="hover:text-white transition">
              {t.nav.meditation}
            </a>
            <a href="#sheep-counting" className="hover:text-white transition">
              数羊
            </a>
            <a href="#constellation-cards" className="hover:text-white transition">
              星座卡牌
            </a>
            <a href="#todays-card" className="hover:text-white transition">
              今日卡
            </a>
            <a href="#cyber-wellness" className="hover:text-white transition">
              赛博养生
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
        
        
        {/* Enhanced Cosmic Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* Animated nebula clouds */}
          <motion.div 
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl"
            variants={animationVariants.nebulaSwirl}
            animate="animate"
          />
          <motion.div 
            className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"
            variants={animationVariants.nebulaSwirl}
            animate="animate"
            transition={{ delay: 2 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl"
            variants={animationVariants.nebulaSwirl}
            animate="animate"
            transition={{ delay: 4 }}
          />
          
          {/* Floating cosmic particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                x: [-10, 10, -10],
                opacity: [0.1, 0.6, 0.1],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Constellation patterns */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                radial-gradient(2px 2px at 20px 30px, #d946ef, transparent),
                radial-gradient(2px 2px at 40px 70px, #8b5cf6, transparent),
                radial-gradient(1px 1px at 90px 40px, #06b6d4, transparent),
                radial-gradient(1px 1px at 130px 80px, #f59e0b, transparent),
                radial-gradient(2px 2px at 160px 30px, #d946ef, transparent)
              `,
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-16 md:pt-24 md:pb-24 relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <motion.div variants={item} className="space-y-8">
              {/* Enhanced Logo with Glow Animation */}
              <div className="space-y-4">
                <motion.h1 
                  className="instrument text-5xl sm:text-6xl md:text-8xl font-normal tracking-tight text-white relative"
                  variants={animationVariants.logoGlow}
                  animate="animate"
                >
                  <SparkleText className="relative z-10">
                    {t?.hero?.title || 'REMia'}
                  </SparkleText>
                </motion.h1>
                
                {/* Enhanced Tagline with Typewriter Effect */}
                <div className="text-xl md:text-2xl text-cyan-200/90 font-medium italic">
                  <TypewriterText 
                    text={t.hero.tagline}
                    delay={1500}
                    speed={80}
                    className="inline-block"
                  />
              </div>
              </div>
              
              {/* Enhanced Value proposition with Word Reveal */}
              <div className="space-y-3">
                <div className="text-xl md:text-2xl text-fuchsia-200/90 font-medium leading-relaxed">
                  <WordReveal 
                    text={t.hero.valueProposition}
                    delay={2.5}
                    staggerChildren={0.12}
                  />
                </div>
                <div className="text-lg md:text-xl text-slate-300/80 font-light">
                  <WordReveal 
                    text={t.hero.subtitle}
                    delay={4}
                    staggerChildren={0.08}
                  />
                </div>
              </div>
              
              {/* Enhanced CTA with Magical Effects */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  variants={animationVariants.buttonMagical}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative inline-block"
                >
                  <Button 
                    size="lg"
                    className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-400 hover:to-fuchsia-400 shadow-2xl shadow-indigo-500/30 text-white font-semibold px-8 py-4 text-lg border-0"
                    onClick={() => {
                      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'hero_cta_click', { btn: 'waitlist' })
                      }
                    }}
                  >
                    {/* Shimmer effect overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      style={{ width: "30%", skewX: "-20deg" }}
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3,
                        ease: "linear" 
                      }}
                    />
                    <span className="relative z-10 flex items-center">
                      <ShimmerText>{t.hero.startFree}</ShimmerText>
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </span>
                </Button>
                  
                  {/* Particle effects around button */}
                  <div className="absolute -inset-2 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-fuchsia-400 rounded-full opacity-60"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          x: [0, (Math.random() - 0.5) * 40],
                          y: [0, (Math.random() - 0.5) * 40],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatDelay: Math.random() * 2 + 1,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-sm text-slate-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 6, duration: 0.5 }}
                >
                  <FloatingLetters 
                    text={t.hero.guardianCard}
                    delay={0.5}
                    floatIntensity={5}
                  />
                </motion.p>
              </motion.div>
              
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

            {/* Simplified Mock Device - Single Guardian Card Focus */}
            <motion.div variants={item} className="relative">
              <div className="relative mx-auto aspect-[9/18] h-[560px] w-[310px] rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-800 p-3 shadow-2xl">
                <div className="h-full w-full rounded-[1.6rem] bg-slate-900/90 overflow-hidden">
                  <div className="h-12 w-full bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/30 to-cyan-500/30" />
                  <div className="p-6 flex flex-col items-center justify-center h-full space-y-6">
                    <div className="text-center space-y-2">
                      <div className="text-sm text-slate-400">今日の守護カード</div>
                      <div className="text-lg text-slate-200 font-medium">Today's Guardian Card</div>
                        </div>
                    
                    {/* Enhanced Guardian Card with Advanced 3D Effects */}
                    <motion.div
                      variants={animationVariants.cardBreathing}
                      animate="animate"
                      className="relative group cursor-pointer"
                      style={{ perspective: "1000px" }}
                      whileHover={{
                        scale: 1.05,
                        rotateX: 10,
                        rotateY: 10,
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      {/* 3D Card Container */}
                      <motion.div 
                        className="aspect-[3/5] w-32 rounded-xl relative preserve-3d"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Main Card Face */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-purple-600/30 border border-white/20 p-4 text-center flex flex-col justify-between backdrop-blur-sm rounded-xl shadow-2xl">
                          {/* Animated constellation pattern overlay */}
                          <motion.div 
                            className="absolute inset-0 opacity-30 rounded-xl overflow-hidden"
                            animate={{ 
                              backgroundPosition: ["0% 0%", "100% 100%"] 
                            }}
                            transition={{ 
                              duration: 20, 
                              repeat: Infinity, 
                              ease: "linear" 
                            }}
                            style={{
                              backgroundImage: `radial-gradient(1px 1px at 20% 30%, #fff, transparent),
                                              radial-gradient(1px 1px at 40% 70%, #d946ef, transparent),
                                              radial-gradient(1px 1px at 90% 40%, #8b5cf6, transparent),
                                              radial-gradient(1px 1px at 30% 80%, #06b6d4, transparent)`,
                              backgroundSize: "100% 100%"
                            }}
                          />
                          
                          <div className="relative z-10">
                            <motion.div 
                              className="text-xs text-slate-400"
                              animate={{ 
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{ 
                                duration: 8, 
                                repeat: Infinity,
                                ease: "easeInOut" 
                              }}
                            >
                              ✦
                            </motion.div>
                    </div>
                          
                          <div className="space-y-2 relative z-10">
                            <div className="text-sm text-slate-200 font-medium">
                              <GradientText 
                                gradientFrom="#d946ef" 
                                gradientTo="#8b5cf6"
                                animationDuration={4}
                              >
                                守護の星
                              </GradientText>
                      </div>
                            <div className="text-xs text-slate-400">Guardian Star</div>
                    </div>
                          
                          <div className="text-xs text-slate-500 relative z-10">
                            <motion.span
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              タップして引く
                            </motion.span>
                    </div>
                  </div>
                      </motion.div>
                      
                      {/* Enhanced Magical Particle System */}
                      <div className="absolute -inset-6 pointer-events-none">
                        {/* Orbiting particles */}
                        {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                              background: ["#d946ef", "#8b5cf6", "#06b6d4", "#f59e0b"][i % 4],
                              left: "50%",
                              top: "50%",
                              transformOrigin: `${20 + i * 3}px 0px`,
                            }}
                            animate={{
                              rotate: [0, 360],
                              scale: [0.5, 1.2, 0.5],
                              opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                              rotate: {
                                duration: 8 + i * 0.5,
                                repeat: Infinity,
                                ease: "linear",
                              },
                              scale: {
                                duration: 3 + i * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2,
                              },
                              opacity: {
                                duration: 2 + i * 0.3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.1,
                              },
                            }}
                          />
                        ))}
                        
                        {/* Floating sparkles */}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.div
                            key={`sparkle-${i}`}
                            className="absolute text-xs opacity-60"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              color: ["#d946ef", "#8b5cf6", "#06b6d4"][i % 3],
                            }}
                            variants={animationVariants.starTwinkle}
                            animate="animate"
                            transition={{
                              delay: i * 0.3,
                            }}
                          >
                            ✨
              </motion.div>
                        ))}
                        
                        {/* Cosmic energy rings */}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={`ring-${i}`}
                            className="absolute inset-0 rounded-full border border-fuchsia-400/20"
                            style={{
                              transform: `scale(${1 + i * 0.3})`,
                            }}
                            animate={{
                              rotate: [0, 360],
                              opacity: [0.2, 0.6, 0.2],
                              scale: [1 + i * 0.3, 1.2 + i * 0.3, 1 + i * 0.3],
                            }}
                            transition={{
                              duration: 6 + i * 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.5,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                    
                    <div className="text-center space-y-1">
                      <div className="text-xs text-slate-500">朝の儀式を始めましょう</div>
                      <div className="text-xs text-slate-600">Begin your morning ritual</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Constellation Cards Section */}
      <ConstellationCardsSection />

      {/* Waiting List */}
      <section id="waitlist" className="py-6 md:py-10 -mt-8">
        <div className="mx-auto max-w-3xl px-4">
          <Card className={`${glassCardStyles.base} shadow-2xl`}>
            <CardContent className="p-6 md:p-8">
              <h3 className={`text-xl md:text-2xl font-semibold ${glassCardStyles.text.primary}`}>{t?.waitlist?.title || 'Join Waitlist'}</h3>
              <p className={`mt-1 text-base font-medium ${glassCardStyles.text.secondary}`}>{t.waitlist.subtitle}</p>
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
        
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80 relative z-10">
          {["改善睡眠", "情绪调节", "个性化养生", "隐私优先"].map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
              <Stars className="h-4 w-4" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Psychology Education */}
      <section className="py-16 md:py-20 relative">
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="instrument text-2xl md:text-3xl font-normal text-slate-100 mb-4">
              {t?.psychology?.title || 'Psychology'}
            </h2>
            <p className="text-slate-300/80 text-sm md:text-base mb-2">
              {t.psychology.subtitle}
            </p>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              {t.psychology.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { key: 'freud', icon: '🧠' },
              { key: 'jung', icon: '🌙' }, 
              { key: 'modern', icon: '⚡' }
            ].map(({ key, icon }) => (
              <Card key={key} className={`${glassCardStyles.base} ${glassCardStyles.hover} p-6`}>
                <div className="text-center">
                  <div className="text-2xl mb-3">{icon}</div>
                  <h3 className={`font-medium ${glassCardStyles.text.primary} mb-1`}>
                    {t.psychology.theories[key as keyof typeof t.psychology.theories].name}
                  </h3>
                  <p className={`text-xs ${glassCardStyles.text.subtle} mb-2`}>
                    {t.psychology.theories[key as keyof typeof t.psychology.theories].period}
                  </p>
                  <p className={`text-sm ${glassCardStyles.text.accent} mb-3 font-medium`}>
                    {t.psychology.theories[key as keyof typeof t.psychology.theories].theory}
                  </p>
                  <p className={`text-xs ${glassCardStyles.text.muted} leading-relaxed`}>
                    {t.psychology.theories[key as keyof typeof t.psychology.theories].description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto">
            <h3 className={`text-lg font-medium ${glassCardStyles.text.primary} text-center mb-4`}>
              {t?.psychology?.approach?.title || 'Our Approach'}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {t.psychology.approach.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-fuchsia-400/60" />
                  <span className={`text-sm ${glassCardStyles.text.muted}`}>{item}</span>
                </div>
              ))}
            </div>
            <p className={`text-xs ${glassCardStyles.text.subtle} text-center italic`}>
              {t.psychology.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 relative">
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="instrument text-2xl md:text-4xl font-normal">{t?.features?.title || 'Core Features'}</h2>
            <p className="mt-3 text-slate-300/90">
              {t.features.description}
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Moon className="h-5 w-5" />}
              title={t?.features?.cards?.eveningRitual?.title || 'Evening Ritual'}
              desc={t.features.cards.eveningRitual.description}
              details={t.features.cards.eveningRitual.details}
            />
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title={t?.features?.cards?.morningRitual?.title || 'Morning Ritual'}
              desc={t.features.cards.morningRitual.description}
              details={t.features.cards.morningRitual.details}
            />
            <FeatureCard
              icon={<Heart className="h-5 w-5" />}
              title={t?.features?.cards?.collectShare?.title || 'Collect & Share'}
              desc={t.features.cards.collectShare.description}
              details={t.features.cards.collectShare.details}
            />
          </div>
        </div>
      </section>

      {/* Emotional Value Section */}
      <section id="emotional-value" className="py-16 md:py-24 relative">
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="instrument text-2xl md:text-4xl font-normal">{t?.emotionalValue?.title || 'Emotional Value'}</h2>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Card className={`${glassCardStyles.hover} bg-gradient-to-br from-pink-500/10 to-transparent border-pink-400/20`}>
              <CardHeader>
                <CardTitle className={`${glassCardStyles.text.primary} text-center`}>
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-400/20 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-pink-300" />
                  </div>
                  {t?.emotionalValue?.cards?.comfort?.title || 'Comfort'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${glassCardStyles.text.muted} text-sm text-center leading-relaxed`}>
                  {t.emotionalValue.cards.comfort.description}
                </p>
              </CardContent>
            </Card>

            <Card className={`${glassCardStyles.hover} bg-gradient-to-br from-purple-500/10 to-transparent border-purple-400/20`}>
              <CardHeader>
                <CardTitle className={`${glassCardStyles.text.primary} text-center`}>
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-400/20 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-purple-300" />
                  </div>
                  {t?.emotionalValue?.cards?.narrative?.title || 'Narrative'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${glassCardStyles.text.muted} text-sm text-center leading-relaxed`}>
                  {t.emotionalValue.cards.narrative.description}
                </p>
              </CardContent>
            </Card>

            <Card className={`${glassCardStyles.hover} bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-400/20`}>
              <CardHeader>
                <CardTitle className={`${glassCardStyles.text.primary} text-center`}>
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cyan-400/20 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-cyan-300" />
                  </div>
                  {t?.emotionalValue?.cards?.science?.title || 'Science'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${glassCardStyles.text.muted} text-sm text-center leading-relaxed`}>
                  {t.emotionalValue.cards.science.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meditation Hz Music */}
      <section id="meditation" className="py-16 md:py-24 relative">
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="instrument text-2xl md:text-4xl font-normal">冥想 · Hz 音乐 <Emoji emoji={EMOJIS.MUSIC} size={32} /></h2>
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
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-4xl font-semibold">解锁 Persona · 梦中同伴</h3>
            <p className="mt-3 text-slate-300/90">重复的梦象会召唤对应人格。与其对话，让白天更顺。</p>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { name: t.persona.characters.mira.name, line: t.persona.characters.mira.theme, tip: t.persona.characters.mira.tip, img: "/MIRA.jpg" },
              { name: t.persona.characters.ignis.name, line: t.persona.characters.ignis.theme, tip: t.persona.characters.ignis.tip, img: "/IGNIS.jpg" },
              { name: t.persona.characters.echo.name, line: t.persona.characters.echo.theme, tip: t.persona.characters.echo.tip, img: "/ECHO.jpg" },
            ].map((p, i) => (
              <PersonaFlipCard key={i} {...p} sr={88 - i * 7} />
            ))}
          </div>
        </div>
      </section>

      {/* Creative Lab */}
      <CreativeLabSection />

      {/* AI電気羊数羊 */}
      <SheepCountingSection />

      {/* 今日卡 Today's Card */}

      {/* 赛博养生 Cyber Wellness */}
      <CyberWellnessSection />

      {/* AI Electric Sheep */}
      <AIElectricSheepSection />

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 relative">
        
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
        
        <div className="mx-auto max-w-5xl px-4 relative z-10">
          <Card className={`${glassCardStyles.base} shadow-2xl`}>
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className={`text-2xl md:text-4xl font-semibold ${glassCardStyles.text.primary}`}>{t?.cta?.title || 'Get Started'}</h3>
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
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          {/* Social Proof */}
          <div className={`mb-6 p-6 rounded-xl ${glassCardStyles.base} text-center`}>
            <div className="space-y-3">
              <p className={`text-sm ${glassCardStyles.text.muted} leading-relaxed`}>
                {t.footer.socialProof.cbt}
              </p>
              <p className={`text-sm ${glassCardStyles.text.secondary} leading-relaxed font-medium`}>
                {t.footer.socialProof.nextGen}
              </p>
            </div>
          </div>

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
              <div className="h-6 w-6 rounded-lg flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10">
                <img 
                  src="/logo.jpg" 
                  alt="REMia Logo" 
                  className="w-4 h-4 object-contain"
                />
              </div>
              <span>{t.footer.socialProof.company}</span>
          </div>
          <div className="flex items-center gap-6">
              <a className="hover:text-slate-200" href="https://www.synovawhisper.com" target="_blank" rel="noopener noreferrer">
                Synova Whisper
            </a>
            <a className="hover:text-slate-200" href="#">
                {t.footer.links.privacy}
            </a>
            <a className="hover:text-slate-200" href="#">
                {t.footer.links.terms}
            </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}
