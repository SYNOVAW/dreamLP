'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Emoji, EMOJIS } from '@/components/emoji'

interface SRData {
  total: number
  emotion: number
  symbol: number
  action: number
  trend: 'up' | 'down' | 'stable'
  lastUpdate: string
}

interface SRDashboardProps {
  data?: SRData
  className?: string
}

export default function SRDashboard({ data, className = '' }: SRDashboardProps) {
  // デフォルトデータ（実際のアプリではAPIから取得）
  const defaultData: SRData = {
    total: 68,
    emotion: 72,
    symbol: 65,
    action: 67,
    trend: 'up',
    lastUpdate: '2時間前'
  }

  const srData = data || defaultData

  // SRレベル判定
  const getSRLevel = (value: number) => {
    if (value >= 80) return { level: 'Excellent', color: 'text-green-400', bg: 'bg-green-500/20' }
    if (value >= 60) return { level: 'Good', color: 'text-blue-400', bg: 'bg-blue-500/20' }
    if (value >= 40) return { level: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
    return { level: 'Needs Work', color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  const totalLevel = getSRLevel(srData.total)

  // 円形プログレスバーのコンポーネント
  const CircularProgress = ({ value, size = 120, strokeWidth = 8, color = '#8b5cf6' }: {
    value: number
    size?: number
    strokeWidth?: number
    color?: string
  }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (value / 100) * circumference

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* 背景円 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* プログレス円 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* 中央のテキスト */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{value}%</div>
            <div className="text-xs text-slate-400">SR</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* メインSRダッシュボード */}
      <Card className="bg-white/5 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Emoji emoji={EMOJIS.CRYSTAL} size={24} />
            <span className="instrument text-lg font-normal tracking-tight">
              <span className="text-purple-400 italic">Synchrony</span> Rate Metrics
            </span>
            <Badge className={`ml-auto ${totalLevel.bg} ${totalLevel.color} border-0`}>
              {totalLevel.level}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* 円形プログレス */}
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <CircularProgress 
                  value={srData.total} 
                  size={140}
                  color="#8b5cf6"
                />
              </motion.div>
            </div>

            {/* SR詳細 */}
            <div className="space-y-4">
              <div className="text-center md:text-left">
                <h3 className="instrument text-4xl md:text-5xl font-normal tracking-tight text-white mb-2">
                  <span className="text-purple-400 italic">Synchrony</span> {srData.total}%
                </h3>
                <p className="text-white/70 font-light text-sm mb-4 leading-relaxed">
                  夢と現実の同期率を測定する革新的な指標
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <motion.div
                    animate={{ 
                      y: srData.trend === 'up' ? [-2, 2, -2] : 
                         srData.trend === 'down' ? [2, -2, 2] : 0
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Emoji 
                      emoji={srData.trend === 'up' ? EMOJIS.ARROW_UP : 
                             srData.trend === 'down' ? EMOJIS.ARROW_DOWN : '➡️'} 
                      size={16} 
                    />
                  </motion.div>
                  <span className="text-sm text-slate-400">
                    最終更新: {srData.lastUpdate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3つのSR次元 */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Emotion SR */}
        <Card className="bg-white/5 border-white/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Emoji emoji={EMOJIS.HEART} size={20} />
              <span className="instrument text-sm font-normal tracking-tight text-white">
                <span className="text-purple-400 italic">Emotion</span> SR
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">感情同期</span>
                <span className="text-white font-medium">{srData.emotion}%</span>
              </div>
              <Progress 
                value={srData.emotion} 
                className="h-2 bg-white/10"
              />
              <p className="text-xs text-slate-400">
                夢の感情と現実の一致度
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Symbol SR */}
        <Card className="bg-white/5 border-white/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Emoji emoji={EMOJIS.STAR} size={20} />
              <span className="instrument text-sm font-normal tracking-tight text-white">
                <span className="text-purple-400 italic">Symbol</span> SR
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">象徴同期</span>
                <span className="text-white font-medium">{srData.symbol}%</span>
              </div>
              <Progress 
                value={srData.symbol} 
                className="h-2 bg-white/10"
              />
              <p className="text-xs text-slate-400">
                夢の象徴とPersonaの一致度
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action SR */}
        <Card className="bg-white/5 border-white/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Emoji emoji={EMOJIS.ARROW_RIGHT} size={20} />
              <span className="instrument text-sm font-normal tracking-tight text-white">
                <span className="text-purple-400 italic">Action</span> SR
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">行動同期</span>
                <span className="text-white font-medium">{srData.action}%</span>
              </div>
              <Progress 
                value={srData.action} 
                className="h-2 bg-white/10"
              />
              <p className="text-xs text-slate-400">
                推奨行動の実行度
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SR説明 */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-purple-500/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center">
            <h4 className="instrument text-lg font-normal tracking-tight text-white mb-2">
              <Emoji emoji={EMOJIS.BRAIN} size={20} className="mr-2" />
              <span className="text-purple-400 italic">Synchrony</span> Rate とは？
            </h4>
            <p className="text-white/70 font-light text-sm leading-relaxed">
              SRは夢と現実の同期率を測定する革新的な指標です。
              感情・象徴・行動の3つの次元から、あなたの無意識と意識の調和度を可視化します。
              心拍や睡眠の時代は終わりました。次は「夢と無意識」の可視化です。
            </p>
            <div className="mt-4 flex justify-center gap-4 text-xs text-slate-400">
              <span>🧠 心理学ベース</span>
              <span>⚡ AI解析</span>
              <span>📊 データ可視化</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
