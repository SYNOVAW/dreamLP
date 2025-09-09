"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { glassCardStyles } from "@/lib/card-styles"
import { Stars, Sparkles, RotateCcw } from "lucide-react"
import MagicalCardDraw from "./magical-card-draw"

// Constellation cards data with front/back content
const constellationCards = [
  {
    id: "aries",
    name: "Aries",
    chineseName: "白羊座",
    image: "/Aries.jpg",
    frontTitle: "The Pioneer",
    frontDescription: "Bold action leads to breakthrough",
    backTitle: "今日指引",
    backDescription: "勇敢迈出第一步，宇宙会为你的决心铺路。今天是开始新冒险的完美时机。",
    element: "Fire",
    dates: "3/21 - 4/19"
  },
  {
    id: "taurus",
    name: "Taurus", 
    chineseName: "金牛座",
    image: "/Taurus.jpg",
    frontTitle: "The Builder",
    frontDescription: "Steady progress creates lasting beauty",
    backTitle: "今日指引",
    backDescription: "慢工出细活，今天专注于打造坚实的基础。耐心是你最大的财富。",
    element: "Earth",
    dates: "4/20 - 5/20"
  },
  {
    id: "gemini",
    name: "Gemini",
    chineseName: "双子座", 
    image: "/Gemini.jpg",
    frontTitle: "The Messenger",
    frontDescription: "Communication opens new worlds",
    backTitle: "今日指引",
    backDescription: "用好奇心探索世界，用智慧连接人心。今天适合学习和交流。",
    element: "Air",
    dates: "5/21 - 6/20"
  },
  {
    id: "cancer",
    name: "Cancer",
    chineseName: "巨蟹座",
    image: "/Cancer.jpg", 
    frontTitle: "The Nurturer",
    frontDescription: "Intuition guides the heart home",
    backTitle: "今日指引",
    backDescription: "倾听内心的声音，关爱身边的人。情感的力量今天格外强大。",
    element: "Water",
    dates: "6/21 - 7/22"
  },
  {
    id: "leo",
    name: "Leo",
    chineseName: "狮子座",
    image: "/Leo.jpg",
    frontTitle: "The Creator", 
    frontDescription: "Authenticity shines brightest",
    backTitle: "今日指引",
    backDescription: "展现真实的自己，让内在的光芒照亮世界。自信是你的超能力。",
    element: "Fire",
    dates: "7/23 - 8/22"
  },
  {
    id: "virgo",
    name: "Virgo",
    chineseName: "处女座",
    image: "/Virgo.jpg",
    frontTitle: "The Perfectionist",
    frontDescription: "Details reveal hidden treasures",
    backTitle: "今日指引", 
    backDescription: "用心观察细节，在平凡中发现非凡。完美来自对品质的追求。",
    element: "Earth",
    dates: "8/23 - 9/22"
  },
  {
    id: "libra", 
    name: "Libra",
    chineseName: "天秤座",
    image: "/Libra.jpg",
    frontTitle: "The Harmonizer",
    frontDescription: "Balance brings inner peace",
    backTitle: "今日指引",
    backDescription: "寻找生活的平衡点，用美好的心情迎接每一个瞬间。",
    element: "Air", 
    dates: "9/23 - 10/22"
  },
  {
    id: "scorpio",
    name: "Scorpio",
    chineseName: "天蝎座", 
    image: "/Scorpio.jpg",
    frontTitle: "The Transformer",
    frontDescription: "Depth reveals hidden power",
    backTitle: "今日指引",
    backDescription: "深入探索内在的力量，转化挑战为成长的机会。",
    element: "Water",
    dates: "10/23 - 11/21" 
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    chineseName: "射手座",
    image: "/Sagittarius.jpg", 
    frontTitle: "The Explorer",
    frontDescription: "Adventure expands the soul",
    backTitle: "今日指引",
    backDescription: "保持开放的心态，每一次经历都是智慧的积累。勇敢追求梦想。",
    element: "Fire",
    dates: "11/22 - 12/21"
  },
  {
    id: "capricorn",
    name: "Capricorn", 
    chineseName: "摩羯座",
    image: "/Capricorn.jpg",
    frontTitle: "The Achiever",
    frontDescription: "Discipline creates mountains",
    backTitle: "今日指引",
    backDescription: "脚踏实地向目标前进，每一步都在为未来的成功奠基。",
    element: "Earth",
    dates: "12/22 - 1/19"
  },
  {
    id: "aquarius",
    name: "Aquarius",
    chineseName: "水瓶座",
    image: "/Aquarius.jpg",
    frontTitle: "The Innovator", 
    frontDescription: "Vision shapes tomorrow",
    backTitle: "今日指引",
    backDescription: "用独特的视角看世界，你的创新思维将带来意想不到的收获。",
    element: "Air",
    dates: "1/20 - 2/18"
  },
  {
    id: "pisces",
    name: "Pisces",
    chineseName: "双鱼座",
    image: "/Pisces.jpg", 
    frontTitle: "The Dreamer",
    frontDescription: "Imagination flows into reality",
    backTitle: "今日指引",
    backDescription: "让想象力指引方向，直觉将带你找到最美的答案。",
    element: "Water",
    dates: "2/19 - 3/20"
  }
]

// Element color mapping
const elementColors = {
  Fire: "from-orange-500/20 to-red-600/30",
  Earth: "from-amber-500/20 to-yellow-600/30", 
  Air: "from-blue-400/20 to-cyan-500/30",
  Water: "from-blue-600/20 to-purple-500/30"
}

// Flip card component with overlay design
interface FlipCardProps {
  card: typeof constellationCards[0]
  isFlipped: boolean
  onClick: () => void
}

function FlipCard({ card, isFlipped, onClick }: FlipCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  return (
    <div
      className="w-72 cursor-pointer select-none relative preserve-3d"
      style={{ 
        perspective: "1000px",
        aspectRatio: "9/16" // Maintain 9:16 aspect ratio
      }}
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side */}
        <Card 
          className={`absolute inset-0 w-full h-full ${glassCardStyles.hover} overflow-hidden backface-hidden border-0`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <CardContent className="p-0 h-full relative">
            {/* Background Image */}
            <div className="relative w-full h-full overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 animate-pulse" />
              )}
              <img
                src={card.image}
                alt={card.name}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />
              
              {/* Element badge - top right */}
              <div className="absolute top-4 right-4 z-20">
                <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${elementColors[card.element as keyof typeof elementColors]} backdrop-blur-sm border border-white/20`}>
                  <span className="text-xs font-medium text-white">{card.element}</span>
                </div>
              </div>
              
              {/* Bottom overlay with gradient */}
              <div className="absolute inset-x-0 bottom-0 z-10">
                {/* Gradient background for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                
                {/* Content overlay */}
                <div className="relative z-20 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-white">
                        {card.name}
                      </h3>
                      <p className="text-sm text-slate-300">
                        {card.chineseName}
                      </p>
                    </div>
                    <Stars className="h-6 w-6 text-fuchsia-300 flex-shrink-0" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 font-medium">
                      {card.dates}
                    </p>
                    <p className="text-base font-semibold text-fuchsia-200">
                      {card.frontTitle}
                    </p>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {card.frontDescription}
                    </p>
                  </div>
                  
                  {/* Subtle click indicator */}
                  <div className="flex items-center justify-center mt-4 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <RotateCcw className="h-3 w-3" />
                      <span>点击查看今日指引</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back side */}
        <Card 
          className={`absolute inset-0 w-full h-full ${glassCardStyles.highlight} overflow-hidden backface-hidden border-0`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <CardContent className="p-0 h-full relative">
            {/* Background Image (same as front) */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover"
              />
              
              {/* Darker overlay for back side text visibility */}
              <div className="absolute inset-0 bg-black/70" />
              
              {/* Mystical sparkles effect */}
              <div className="absolute inset-0 z-10">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-fuchsia-300 rounded-full animate-ping opacity-60" />
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse" />
                <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              </div>
              
              {/* Content overlay centered */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-8 text-center">
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500/30 to-purple-600/30 backdrop-blur-sm flex items-center justify-center border border-fuchsia-400/20">
                    <Sparkles className="h-8 w-8 text-fuchsia-300" />
                  </div>
                  
                  {/* Constellation name */}
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-white">
                      {card.name}
                    </h3>
                    <p className="text-lg text-slate-300">
                      {card.chineseName}
                    </p>
                  </div>
                  
                  {/* Daily guidance */}
                  <div className="space-y-4 max-w-sm">
                    <h4 className="text-xl font-semibold text-fuchsia-300">
                      {card.backTitle}
                    </h4>
                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
                      <p className="text-sm leading-relaxed text-slate-200">
                        {card.backDescription}
                      </p>
                    </div>
                  </div>
                  
                  {/* Date range */}
                  <div className="text-xs text-slate-400 font-medium">
                    {card.dates}
                  </div>
                </div>
                
                {/* Flip back indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <RotateCcw className="h-3 w-3" />
                    <span>点击翻回正面</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// Main constellation cards section component
export default function ConstellationCardsSection() {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const autoScrollRef = useRef<number>()

  // Auto-scroll functionality
  useEffect(() => {
    if (!scrollRef.current || isPaused) return

    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
      
      autoScrollRef.current = window.setInterval(() => {
        if (scrollRef.current && !isPaused) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
          
          // If we've reached the end, reset to beginning
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollLeft = 0
          } else {
            scrollRef.current.scrollLeft += 1
          }
        }
      }, 30) // Smooth 30fps scrolling
    }

    startAutoScroll()

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isPaused])

  // Handle card flip
  const handleCardFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  }

  return (
    <section id="constellation-cards" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-600/3 via-purple-600/3 to-fuchsia-600/3 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Section header */}
          <div className="text-center space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-200 via-fuchsia-200 to-slate-200 bg-clip-text text-transparent">
                星座人格卡牌
              </h2>
              <p className={`text-lg ${glassCardStyles.text.secondary} max-w-2xl mx-auto`}>
                每张卡牌都承载着宇宙的智慧与星座的能量，为你的今日之路提供神秘而深刻的指引
              </p>
            </motion.div>
          </div>

          {/* Daily Card Draw Section */}
          <motion.div variants={itemVariants} className="max-w-md mx-auto">
            <MagicalCardDraw />
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 max-w-2xl mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            <div className="px-4">
              <Card className={`${glassCardStyles.base}`}>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 text-center justify-center">
                    <Sparkles className="h-4 w-4 text-fuchsia-300" />
                    <span className={`text-xs ${glassCardStyles.text.muted}`}>
                      探索所有星座卡牌
                    </span>
                    <Sparkles className="h-4 w-4 text-fuchsia-300" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          </motion.div>

          {/* Instructions for gallery */}
          <motion.div variants={itemVariants}>
            <Card className={`${glassCardStyles.base} max-w-lg mx-auto`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-center justify-center">
                  <span className={`text-sm ${glassCardStyles.text.muted}`}>
                    点击卡牌翻转查看今日指引 • 悬停暂停自动滚动
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Scrolling cards gallery */}
          <motion.div variants={itemVariants} className="relative">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Duplicate cards for infinite scroll effect */}
              {[...constellationCards, ...constellationCards].map((card, index) => (
                <div key={`${card.id}-${index}`} className="flex-shrink-0">
                  <FlipCard
                    card={card}
                    isFlipped={flippedCards.has(`${card.id}-${index}`)}
                    onClick={() => handleCardFlip(`${card.id}-${index}`)}
                  />
                </div>
              ))}
            </div>
            
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />
          </motion.div>
        </motion.div>
      </div>

      {/* Additional CSS for smooth scrolling and effects */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </section>
  )
}