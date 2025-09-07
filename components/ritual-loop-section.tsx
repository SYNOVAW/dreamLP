'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Emoji, EMOJIS } from '@/components/emoji'
import { useLocale } from '@/hooks/use-locale'

const RitualLoopSection = () => {
  const { t } = useLocale()

  const nightRitual = {
    title: "🌙 夜のRitual",
    subtitle: "数羊助眠",
    description: "睡前焦虑、难入睡时，让小羊陪伴你进入梦乡",
    features: [
      {
        icon: EMOJIS.SHEEP,
        title: "小羊跳栅栏动画",
        desc: "节奏 = 呼吸法节奏，帮助放松"
      },
      {
        icon: EMOJIS.MUSIC,
        title: "柔和Hz音乐",
        desc: "432/528/963Hz音源，助眠效果"
      },
      {
        icon: EMOJIS.CRYSTAL,
        title: "梦境暗示生成",
        desc: "轻量化占い感，安心入眠"
      }
    ],
    effect: "放松、安心入眠"
  }

  const morningRitual = {
    title: "☀️ 朝のRitual",
    subtitle: "梦境抽卡",
    description: "醒来后对梦的好奇、一天的期待，让梦境指引你",
    features: [
      {
        icon: EMOJIS.CARD,
        title: "梦境记录",
        desc: "输入/记录梦境片段"
      },
      {
        icon: EMOJIS.STAR,
        title: "抽一张卡",
        desc: "正面插画 / 背面解析"
      },
      {
        icon: EMOJIS.ARROW_RIGHT,
        title: "CBT行动建议",
        desc: "今日的小行动，一天有仪式感"
      }
    ],
    effect: "梦被赋予意义 → 行为建议 → 一天有仪式感"
  }

  const cycleBenefits = [
    {
      icon: EMOJIS.HEART,
      title: "睡前有陪伴",
      desc: "数羊助眠，缓解睡前焦虑"
    },
    {
      icon: EMOJIS.SPARKLES,
      title: "醒来有指引",
      desc: "梦境抽卡，提供行动建议"
    },
    {
      icon: EMOJIS.REFRESH,
      title: "日活留存高",
      desc: "昼夜循环，建立日常习惯"
    }
  ]

  return (
    <section id="ritual-loop" className="py-16 md:py-24 border-t border-white/10 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-indigo-900/10 to-purple-900/10" />
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4">
            <span className="font-light tracking-tight">
              <span className="font-medium italic">Day/Night</span> Ritual Loop
            </span>
            <Emoji emoji={EMOJIS.REFRESH} size={32} className="ml-3" />
          </h2>
          <p className="text-white/70 font-light text-sm leading-relaxed max-w-2xl mx-auto">
            "REMia 是一款让你晚上安心入睡，早晨带来启示的梦境伴侣 App。"
          </p>
        </motion.div>

        {/* 昼夜循环图 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* 循环箭头 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-2 border-purple-400/30 rounded-full"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                  <Emoji emoji={EMOJIS.ARROW_RIGHT} size={16} />
                </div>
              </motion.div>
            </div>

            {/* 夜のRitual */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <Card className="bg-white/5 border-white/20 backdrop-blur-sm w-64">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-light tracking-tight text-white">
                    <Emoji emoji={EMOJIS.MOON} size={20} className="mr-2" />
                    <span className="font-medium italic">夜の</span>Ritual
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-white/70 font-light text-sm leading-relaxed">
                    数羊助眠，让小羊陪伴你进入梦乡
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 朝のRitual */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <Card className="bg-white/5 border-white/20 backdrop-blur-sm w-64">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-light tracking-tight text-white">
                    <Emoji emoji={EMOJIS.SUN} size={20} className="mr-2" />
                    <span className="font-medium italic">朝の</span>Ritual
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-white/70 font-light text-sm leading-relaxed">
                    梦境抽卡，让梦境指引你的一天
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* 夜のRitual详情 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-light tracking-tight text-white">
                <Emoji emoji={EMOJIS.MOON} size={24} className="mr-2" />
                <span className="font-medium italic">夜の</span>Ritual - 数羊助眠
              </CardTitle>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                睡前焦虑、难入睡时，让小羊陪伴你进入梦乡
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {nightRitual.features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl mb-3">
                      <Emoji emoji={feature.icon} size={32} />
                    </div>
                    <h4 className="text-sm font-light tracking-tight text-white mb-2">
                      <span className="font-medium italic">{feature.title}</span>
                    </h4>
                    <p className="text-white/70 font-light text-xs leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-purple-400 font-light text-sm">
                  <Emoji emoji={EMOJIS.HEART} size={16} className="mr-1" />
                  心理効果: {nightRitual.effect}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 朝のRitual详情 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-light tracking-tight text-white">
                <Emoji emoji={EMOJIS.SUN} size={24} className="mr-2" />
                <span className="font-medium italic">朝の</span>Ritual - 梦境抽卡
              </CardTitle>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                醒来后对梦的好奇、一天的期待，让梦境指引你
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {morningRitual.features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl mb-3">
                      <Emoji emoji={feature.icon} size={32} />
                    </div>
                    <h4 className="text-sm font-light tracking-tight text-white mb-2">
                      <span className="font-medium italic">{feature.title}</span>
                    </h4>
                    <p className="text-white/70 font-light text-xs leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-orange-400 font-light text-sm">
                  <Emoji emoji={EMOJIS.SPARKLES} size={16} className="mr-1" />
                  心理効果: {morningRitual.effect}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 循环价值 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-light tracking-tight text-white text-center">
                <Emoji emoji={EMOJIS.REFRESH} size={24} className="mr-2" />
                <span className="font-medium italic">昼夜闭环</span>价值
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {cycleBenefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl mb-3">
                      <Emoji emoji={benefit.icon} size={32} />
                    </div>
                    <h4 className="text-sm font-light tracking-tight text-white mb-2">
                      <span className="font-medium italic">{benefit.title}</span>
                    </h4>
                    <p className="text-white/70 font-light text-xs leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-green-400 font-light text-sm">
                  <Emoji emoji={EMOJIS.USERS} size={16} className="mr-1" />
                  "睡前有陪伴，醒来有指引" → 日活留存高
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default RitualLoopSection
