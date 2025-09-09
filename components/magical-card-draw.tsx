"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { glassCardStyles } from "@/lib/card-styles"
import { Stars, Sparkles, RotateCcw, Moon } from "lucide-react"

// Constellation cards data (same as existing)
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
    image: "/Gemini.JPG",
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

// Particle component for magical effects
const MagicalParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-fuchsia-300 rounded-full"
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 200 - 100],
      y: [0, -Math.random() * 100 - 50]
    }}
    transition={{
      duration: 2,
      delay: delay,
      ease: "easeOut"
    }}
  />
)

// Floating particles around the card
const FloatingParticles = ({ isActive }: { isActive: boolean }) => {
  const particles = Array.from({ length: 12 }, (_, i) => i)
  
  return (
    <AnimatePresence>
      {isActive && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <motion.div
                className="w-1 h-1 bg-purple-300 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

// Main magical card drawing component
interface MagicalCardDrawProps {
  onCardDrawn?: (card: typeof constellationCards[0]) => void
}

export default function MagicalCardDraw({ onCardDrawn }: MagicalCardDrawProps) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawnCard, setDrawnCard] = useState<typeof constellationCards[0] | null>(null)
  const [showParticles, setShowParticles] = useState(false)
  const [lastDrawDate, setLastDrawDate] = useState<string | null>(null)
  const [cardFlipped, setCardFlipped] = useState(false)

  // Check if user can draw a card today
  const canDrawToday = () => {
    const today = new Date().toDateString()
    return lastDrawDate !== today
  }

  // Handle card draw
  const handleDrawCard = async () => {
    if (!canDrawToday() || isDrawing) return
    
    setIsDrawing(true)
    setShowParticles(true)
    setCardFlipped(false)
    
    // Simulate mystical drawing process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Select random card
    const randomCard = constellationCards[Math.floor(Math.random() * constellationCards.length)]
    setDrawnCard(randomCard)
    
    // Store draw date
    const today = new Date().toDateString()
    setLastDrawDate(today)
    localStorage.setItem('lastCardDrawDate', today)
    localStorage.setItem('dailyCard', JSON.stringify(randomCard))
    
    // Callback for parent component
    onCardDrawn?.(randomCard)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsDrawing(false)
    
    // Auto-flip to reveal guidance after a moment
    setTimeout(() => {
      setShowParticles(false)
    }, 2000)
  }

  // Handle card flip
  const handleCardFlip = () => {
    if (!drawnCard || isDrawing) return
    setCardFlipped(!cardFlipped)
  }

  // Reset for new draw
  const handleReset = () => {
    setDrawnCard(null)
    setCardFlipped(false)
    setShowParticles(false)
  }

  // Load saved data on mount
  useEffect(() => {
    const savedDate = localStorage.getItem('lastCardDrawDate')
    const savedCard = localStorage.getItem('dailyCard')
    
    if (savedDate && savedCard) {
      setLastDrawDate(savedDate)
      if (savedDate === new Date().toDateString()) {
        setDrawnCard(JSON.parse(savedCard))
      }
    }
  }, [])

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Background magical effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-fuchsia-500/10 to-purple-600/10 rounded-3xl blur-xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-fuchsia-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              每日神秘抽卡
            </h2>
            <p className={`text-sm ${glassCardStyles.text.secondary}`}>
              {canDrawToday() ? "准备好接受宇宙的指引了吗？" : "今日卡牌已抽取，明日再来吧"}
            </p>
          </motion.div>
        </div>

        {/* Card Drawing Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!drawnCard ? (
              // Card Back - Initial State
              <motion.div
                key="card-back"
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                className="relative cursor-pointer"
                style={{ aspectRatio: "9/16" }}
                whileHover={{ scale: canDrawToday() ? 1.05 : 1 }}
                whileTap={{ scale: canDrawToday() ? 0.95 : 1 }}
                onClick={handleDrawCard}
              >
                <Card className={`w-full h-full ${glassCardStyles.base} overflow-hidden border-2 border-purple-500/30 ${canDrawToday() ? 'hover:border-fuchsia-400/50' : 'opacity-60'}`}>
                  <CardContent className="p-0 h-full relative">
                    {/* Mystical Card Back Design */}
                    <div className="relative w-full h-full">
                      <img
                        src="/card-back.jpg"
                        alt="Mystical Card Back"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay effects */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
                      
                      {/* Floating particles */}
                      <FloatingParticles isActive={!isDrawing} />
                      
                      {/* Drawing state overlay */}
                      <AnimatePresence>
                        {isDrawing && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                          >
                            <div className="text-center space-y-4">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="mx-auto w-12 h-12 border-2 border-fuchsia-300 border-t-transparent rounded-full"
                              />
                              <motion.p
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-fuchsia-200 font-medium"
                              >
                                宇宙正在为你选择...
                              </motion.p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Call to action */}
                      {canDrawToday() && !isDrawing && (
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`px-4 py-2 rounded-full ${glassCardStyles.base} border border-fuchsia-400/30`}
                          >
                            <div className="flex items-center gap-2 text-sm text-fuchsia-200">
                              <Moon className="h-4 w-4" />
                              <span>点击抽取今日卡牌</span>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Magical particles during draw */}
                <AnimatePresence>
                  {showParticles && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 8 }, (_, i) => (
                        <MagicalParticle key={i} delay={i * 0.2} />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              // Drawn Card - Flippable
              <motion.div
                key="drawn-card"
                initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                className="relative cursor-pointer select-none"
                style={{ 
                  perspective: "1000px",
                  aspectRatio: "9/16"
                }}
                onClick={handleCardFlip}
              >
                <motion.div
                  className="w-full h-full relative preserve-3d"
                  animate={{ rotateY: cardFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front side - Constellation Card */}
                  <Card 
                    className={`absolute inset-0 w-full h-full ${glassCardStyles.hover} overflow-hidden backface-hidden border-2 border-purple-500/30`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <CardContent className="p-0 h-full relative">
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={drawnCard.image}
                          alt={drawnCard.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Element badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${elementColors[drawnCard.element as keyof typeof elementColors]} backdrop-blur-sm border border-white/20`}>
                            <span className="text-xs font-medium text-white">{drawnCard.element}</span>
                          </div>
                        </div>
                        
                        {/* Bottom overlay */}
                        <div className="absolute inset-x-0 bottom-0 z-10">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                          
                          <div className="relative z-20 p-6 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-white">
                                  {drawnCard.name}
                                </h3>
                                <p className="text-sm text-slate-300">
                                  {drawnCard.chineseName}
                                </p>
                              </div>
                              <Stars className="h-6 w-6 text-fuchsia-300" />
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-xs text-slate-400 font-medium">
                                {drawnCard.dates}
                              </p>
                              <p className="text-base font-semibold text-fuchsia-200">
                                {drawnCard.frontTitle}
                              </p>
                              <p className="text-sm text-slate-200 leading-relaxed">
                                {drawnCard.frontDescription}
                              </p>
                            </div>
                            
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

                  {/* Back side - Daily Guidance */}
                  <Card 
                    className={`absolute inset-0 w-full h-full ${glassCardStyles.highlight} overflow-hidden backface-hidden border-2 border-fuchsia-400/30`}
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <CardContent className="p-0 h-full relative">
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={drawnCard.image}
                          alt={drawnCard.name}
                          className="w-full h-full object-cover"
                        />
                        
                        <div className="absolute inset-0 bg-black/70" />
                        
                        {/* Mystical sparkles */}
                        <div className="absolute inset-0 z-10">
                          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-fuchsia-300 rounded-full animate-ping opacity-60" />
                          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse" />
                          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                        </div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-8 text-center">
                          <div className="space-y-6">
                            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500/30 to-purple-600/30 backdrop-blur-sm flex items-center justify-center border border-fuchsia-400/20">
                              <Sparkles className="h-8 w-8 text-fuchsia-300" />
                            </div>
                            
                            <div className="space-y-2">
                              <h3 className="text-3xl font-bold text-white">
                                {drawnCard.name}
                              </h3>
                              <p className="text-lg text-slate-300">
                                {drawnCard.chineseName}
                              </p>
                            </div>
                            
                            <div className="space-y-4 max-w-sm">
                              <h4 className="text-xl font-semibold text-fuchsia-300">
                                {drawnCard.backTitle}
                              </h4>
                              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
                                <p className="text-sm leading-relaxed text-slate-200">
                                  {drawnCard.backDescription}
                                </p>
                              </div>
                            </div>
                          </div>
                          
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-3">
          {drawnCard && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="bg-transparent border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400/50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              重新体验
            </Button>
          )}
          
          {!canDrawToday() && !drawnCard && (
            <Card className={`${glassCardStyles.base} max-w-sm mx-auto`}>
              <CardContent className="p-4">
                <p className="text-sm text-center text-slate-400">
                  每日限抽一张，明天再来接受新的宇宙指引
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* CSS for 3D effects */}
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
}