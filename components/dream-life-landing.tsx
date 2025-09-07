"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, Sparkles, Moon, Stars, Heart, Brain, Flame, ChevronRight, Play } from "lucide-react"
import { useState } from "react"

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

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Card className="bg-slate-800/60 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-100">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
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
      className={
        "border-white/10 " +
        (highlight
          ? "bg-gradient-to-b from-slate-700/80 to-slate-800/60 shadow-xl shadow-fuchsia-500/10"
          : "bg-slate-800/60")
      }
    >
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-baseline justify-between">
          <span>{title}</span>
          <span className="text-xl">{price}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-slate-300">
          {items.map((x, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              {x}
            </li>
          ))}
        </ul>
        <Button
          className={
            "mt-6 w-full " + (highlight ? "bg-fuchsia-500 hover:bg-fuchsia-400" : "bg-slate-700 hover:bg-slate-600")
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
      <div className="text-xs text-slate-400 mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((t, i) => (
          <span
            key={i}
            className="rounded-full border border-white/10 bg-slate-700/60 px-2.5 py-1 text-xs text-slate-200"
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
    <div className="rounded-2xl border border-white/10 bg-slate-800/80 p-4 backdrop-blur min-w-[240px]">
      <div className="flex items-center gap-2 text-sm text-slate-200">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">{icon}</span>
        <div>
          <div className="font-medium text-slate-100">{title}</div>
          <div className="text-xs text-slate-300">{subtitle}</div>
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
  const [email, setEmail] = useState("")
  const [intent, setIntent] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 接入你的后端：Supabase / Firebase / Airtable / 自建API
    // fetch('/api/waitlist', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, intent })
    // });
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        ✅ 已加入等候名单。请留意邮箱，我们会发送 Beta 邀请与下载方式。
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3 md:grid-cols-[1fr_220px_160px]">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="你的邮箱"
        className="h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40"
      />
      <select
        value={intent}
        onChange={(e) => setIntent(e.target.value)}
        className="h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40"
      >
        <option value="">你最想改善…</option>
        <option value="sleep">睡眠质量</option>
        <option value="mood">情绪与压力</option>
        <option value="ritual">生活仪式感</option>
      </select>
      <Button type="submit" className="h-11 bg-gradient-to-r from-[#ff5f6d] to-[#a855f7] hover:opacity-90">
        加入等候名单
      </Button>
    </form>
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
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    // TODO: 接入真实音频播放功能
    setIsPlaying(!isPlaying)
    // 这里可以接入 HTML5 Audio API 或 React 音频库
    console.log(`${isPlaying ? "Stopping" : "Playing"} ${frequency} meditation audio`)
  }

  return (
    <Card className="bg-slate-800/60 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-slate-100">
          <span className="text-lg">{frequency}</span>
          <Button
            onClick={handlePlay}
            size="sm"
            variant="outline"
            className="border-white/20 text-slate-200 hover:bg-white/10 bg-transparent"
          >
            <Play className={`h-4 w-4 ${isPlaying ? "animate-pulse" : ""}`} />
            {isPlaying ? "播放中" : "试听"}
          </Button>
        </CardTitle>
        <div className="text-sm font-medium text-slate-200">{title}</div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {benefits.map((benefit, i) => (
            <span
              key={i}
              className="rounded-full border border-white/10 bg-slate-700/60 px-2.5 py-1 text-xs text-slate-200"
            >
              {benefit}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function DreamLifeLanding() {
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
              功能
            </a>
            <a href="#meditation" className="hover:text-white transition">
              冥想音乐
            </a>
            <a href="#how" className="hover:text-white transition">
              流程
            </a>
            <a href="#persona" className="hover:text-white transition">
              Persona
            </a>
            <a href="#pricing" className="hover:text-white transition">
              价格
            </a>
            <a href="#faq" className="hover:text-white transition">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              登录
            </Button>
            <Button className="bg-fuchsia-500 hover:bg-fuchsia-400 shadow-lg shadow-fuchsia-500/30">立即体验</Button>
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
                <Sparkles className="h-3.5 w-3.5" /> 梦境分析 × 抽卡 × 养生指南 × Persona陪伴
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                把你的梦，
                <span className="text-fuchsia-200">变成白天的指引</span>
              </h1>
              <p className="text-slate-300/90 md:text-lg max-w-xl">
                改善睡眠质量，调节情绪压力，建立生活仪式感。记录昨夜的故事，AI解读象征与情绪；抽取今日「命运卡」，获得个性化的呼吸/饮食/作息建议；解锁与你同频的梦中Persona陪伴。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button className="bg-indigo-500 hover:bg-indigo-400 shadow-lg shadow-indigo-500/30">免费开始</Button>
                <Button variant="outline" className="border-white/20 text-slate-200 hover:bg-white/10 bg-transparent">
                  查看Demo <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <div className="text-xs text-slate-400">无需注册 · 本地隐私模式</div>
              </div>
              <div className="flex items-center gap-6 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> iOS/Android
                </div>
                <div className="flex items-center gap-1">
                  <LockIcon /> 端到端加密 · 本地SQLite存储
                </div>
                <div className="flex items-center gap-1">
                  <Stars className="h-3.5 w-3.5" /> 明晰梦支持 · GDPR合规
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
                      {["星之门", "银羽旅者", "静谧之海"].map((t, i) => (
                        <div key={i} className="rounded-xl bg-slate-800/80 border border-white/20 p-3 text-center">
                          <div className="text-[10px] text-slate-400">SR{90 - i * 7}</div>
                          <div className="mt-2 text-sm text-slate-200">{t}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-white/20 bg-slate-800/80 p-3">
                      <div className="text-xs text-slate-400">梦境情绪概览</div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-200">
                        <Brain className="h-4 w-4" /> 平静 42% · 好奇 31% · 焦虑 15%
                      </div>
                    </div>
                    <div className="mt-3 rounded-xl border border-white/10 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 p-3">
                      <div className="text-xs text-slate-300">今日养生</div>
                      <ul className="mt-2 space-y-1 text-[13px] text-slate-200/90">
                        <li>• 早间 4-7-8 呼吸 × 3轮</li>
                        <li>• 午后白茶 + 枸杞</li>
                        <li>• 23:30 前入睡 · 屏幕暗色</li>
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
          <Card className="bg-gradient-to-r from-[#ff5f6d]/10 to-[#a855f7]/10 border-white/10">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-white">加入等候名单 · 率先解锁 Beta</h3>
              <p className="mt-2 text-sm text-slate-300/90">
                留下邮箱即可获得内测资格与限量 Persona 主题包。我们只会在重要更新时联系你。
              </p>
              <WaitlistForm />
              <p className="mt-3 text-xs text-slate-400">提交即表示同意我们的隐私政策与使用条款（可随时退订）。</p>
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
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-slate-100">梦图谱 · 示例</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <TagRow label="象征" items={["雨", "迷宫", "火焰", "海"]} />
                  <TagRow label="情绪" items={["平静", "好奇", "焦虑"]} />
                  <TagRow label="主题" items={["探索", "寻人", "转化"]} />
                  <TagRow label="行动" items={["今日 4-7-8 呼吸", "晚间温水足浴", "减少咖啡因"]} />
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
              { name: "静谧者·MIRA", line: "平和与呼吸", tip: "晚间 10 分钟冥想" },
              { name: "炽羽者·IGNIS", line: "行动与火", tip: "今日选择一个小挑战" },
              { name: "回响者·ECHO", line: "线索与反思", tip: "写下一个未解之问" },
            ].map((p, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{p.name}</span>
                    <span className="text-xs text-slate-400">SR {88 - i * 7}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-300">主题：{p.line}</div>
                  <div className="mt-2 text-xs text-slate-400">今日指引：{p.tip}</div>
                </CardContent>
              </Card>
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
          <Card className="bg-gradient-to-r from-fuchsia-600/20 to-cyan-600/20 border-white/10">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-4xl font-semibold text-white">今晚，从记录一个梦开始</h3>
              <p className="mt-3 text-slate-300/90">明早的你，将收到第一张来自潜意识的指引卡。</p>
              <div className="mt-6 flex justify-center gap-3">
                <Button className="bg-indigo-500 hover:bg-indigo-400">下载 App</Button>
                <Button variant="outline" className="border-white/20 text-slate-200 hover:bg-white/10 bg-transparent">
                  在浏览器体验
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 relative">
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400 relative z-10">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-cyan-300" />
            <span>DreamLife © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <a className="hover:text-slate-200" href="#">
              隐私政策
            </a>
            <a className="hover:text-slate-200" href="#">
              使用条款
            </a>
            <a className="hover:text-slate-200" href="#">
              联系
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
