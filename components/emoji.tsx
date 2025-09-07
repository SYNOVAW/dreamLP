'use client'

import React from 'react'

interface EmojiProps {
  emoji: string
  size?: number
  className?: string
}

export const Emoji: React.FC<EmojiProps> = ({ emoji, size = 24, className = '' }) => {
  return (
    <span 
      className={`inline-block ${className}`}
      style={{ 
        fontSize: `${size}px`,
        lineHeight: 1,
        fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif'
      }}
      role="img"
      aria-label={emoji}
    >
      {emoji}
    </span>
  )
}

// よく使う絵文字の定数
export const EMOJIS = {
  // 睡眠・夢関連
  SLEEP: '😴',
  DREAM: '💭',
  MOON: '🌙',
  STAR: '⭐',
  NIGHT: '🌃',
  
  // AI・テクノロジー
  ROBOT: '🤖',
  BRAIN: '🧠',
  LIGHTNING: '⚡',
  GEAR: '⚙️',
  COMPUTER: '💻',
  
  // ウェルネス・健康
  HEART: '❤️',
  LEAF: '🍃',
  TEA: '🍵',
  SPA: '♨️',
  MEDITATION: '🧘',
  
  // カード・ゲーム
  CARD: '🃏',
  DICE: '🎲',
  TROPHY: '🏆',
  GIFT: '🎁',
  SPARKLES: '✨',
  
  // 音楽・アート
  MUSIC: '🎵',
  MICROPHONE: '🎤',
  CAMERA: '📹',
  PALETTE: '🎨',
  NOTE: '🎶',
  
  // 自然・動物
  SHEEP: '🐑',
  FLOWER: '🌸',
  TREE: '🌳',
  OCEAN: '🌊',
  MOUNTAIN: '🏔️',
  
  // 感情・表情
  SMILE: '😊',
  WINK: '😉',
  LOVE: '🥰',
  THINKING: '🤔',
  SURPRISED: '😮',
  
  // アクション・矢印
  ARROW_RIGHT: '➡️',
  ARROW_UP: '⬆️',
  ARROW_DOWN: '⬇️',
  CHECK: '✅',
  CROSS: '❌',
  
  // 時間・カレンダー
  CLOCK: '🕐',
  CALENDAR: '📅',
  SUNRISE: '🌅',
  SUNSET: '🌇',
  
  // 食べ物・飲み物
  COFFEE: '☕',
  CAKE: '🍰',
  FRUIT: '🍎',
  WATER: '💧',
  
  // その他
  FIRE: '🔥',
  DIAMOND: '💎',
  ROCKET: '🚀',
  MAGIC: '🪄',
  CRYSTAL: '🔮',
  USERS: '👥'
} as const

// 絵文字のカテゴリ別グループ
export const EMOJI_CATEGORIES = {
  SLEEP_DREAM: [EMOJIS.SLEEP, EMOJIS.DREAM, EMOJIS.MOON, EMOJIS.STAR, EMOJIS.NIGHT],
  AI_TECH: [EMOJIS.ROBOT, EMOJIS.BRAIN, EMOJIS.LIGHTNING, EMOJIS.GEAR, EMOJIS.COMPUTER],
  WELLNESS: [EMOJIS.HEART, EMOJIS.LEAF, EMOJIS.TEA, EMOJIS.SPA, EMOJIS.MEDITATION],
  GAME_CARD: [EMOJIS.CARD, EMOJIS.DICE, EMOJIS.TROPHY, EMOJIS.GIFT, EMOJIS.SPARKLES],
  MUSIC_ART: [EMOJIS.MUSIC, EMOJIS.MICROPHONE, EMOJIS.CAMERA, EMOJIS.PALETTE, EMOJIS.NOTE],
  NATURE: [EMOJIS.SHEEP, EMOJIS.FLOWER, EMOJIS.TREE, EMOJIS.OCEAN, EMOJIS.MOUNTAIN],
  EMOTIONS: [EMOJIS.SMILE, EMOJIS.WINK, EMOJIS.LOVE, EMOJIS.THINKING, EMOJIS.SURPRISED]
} as const
