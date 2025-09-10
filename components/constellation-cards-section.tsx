"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { glassCardStyles } from "@/lib/card-styles"
import { designTokens, applyTokens } from "@/lib/design-tokens"
import { mindfulDesign, applyMindful } from "@/lib/mindful-design-system"
import { Stars, Sparkles, RotateCcw } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { createConstellationCards, ConstellationCard } from "@/lib/constellation-data"
import MagicalCardDraw from "./magical-card-draw"

// Element color mapping
const elementColors = {
  Fire: "from-orange-500/20 to-red-600/30",
  Earth: "from-amber-500/20 to-yellow-600/30", 
  Air: "from-blue-400/20 to-cyan-500/30",
  Water: "from-blue-600/20 to-purple-500/30"
}

// Flip card component with overlay design
interface FlipCardProps {
  card: ConstellationCard
  isFlipped: boolean
  onClick: () => void
  t: any
}

function FlipCard({ card, isFlipped, onClick, t }: FlipCardProps) {
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
                <div className={`relative z-20 ${designTokens.spacing.cardPadding} space-y-3`}>
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
                    <p className={`${applyTokens.text('caption')} ${glassCardStyles.text.subtle} font-medium`}>
                      {card.dates}
                    </p>
                    <p className={`${applyTokens.text('body')} font-semibold ${glassCardStyles.text.accent}`}>
                      {card.frontTitle}
                    </p>
                    <p className={`${applyTokens.text('small')} ${glassCardStyles.text.secondary}`}>
                      {card.frontDescription}
                    </p>
                  </div>
                  
                  {/* Subtle click indicator */}
                  <div className="flex items-center justify-center mt-4 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <RotateCcw className="h-3 w-3" />
                      <span>{t.constellationCards.clickForGuidance}</span>
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
              <div className={`absolute inset-0 z-20 flex flex-col justify-center items-center ${designTokens.spacing.cardPaddingLarge} text-center`}>
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500/30 to-purple-600/30 backdrop-blur-sm flex items-center justify-center border border-fuchsia-400/20">
                    <Sparkles className="h-8 w-8 text-fuchsia-300" />
                  </div>
                  
                  {/* Constellation name */}
                  <div className="space-y-2">
                    <h3 className={`${applyTokens.heading('h3')} ${glassCardStyles.text.primary}`}>
                      {card.name}
                    </h3>
                    <p className={`${applyTokens.text('large')} ${glassCardStyles.text.secondary}`}>
                      {card.chineseName}
                    </p>
                  </div>
                  
                  {/* Daily guidance */}
                  <div className="space-y-4 max-w-sm">
                    <h4 className={`${applyTokens.heading('h4')} ${glassCardStyles.text.accent}`}>
                      {card.backTitle}
                    </h4>
                    <div className={`bg-black/40 backdrop-blur-sm ${designTokens.components.borderRadius.small} p-4 border border-purple-500/20`}>
                      <p className={`${applyTokens.text('small')} ${glassCardStyles.text.secondary}`}>
                        {card.backDescription}
                      </p>
                    </div>
                  </div>
                  
                  {/* Date range */}
                  <div className={`${applyTokens.text('caption')} ${glassCardStyles.text.subtle} font-medium`}>
                    {card.dates}
                  </div>
                </div>
                
                {/* Flip back indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <RotateCcw className="h-3 w-3" />
                    <span>{t.constellationCards.clickToFlipBack}</span>
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
  const { t } = useLocale()
  const constellationCards = createConstellationCards(t)
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
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
  }

  return (
    <section id="constellation-cards" className="py-16 md:py-24 relative overflow-hidden">

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
                {t.constellationCards.sectionTitle}
              </h2>
              <p className={`text-lg ${glassCardStyles.text.secondary} max-w-2xl mx-auto`}>
                {t.constellationCards.sectionDescription}
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
                <CardContent className={designTokens.spacing.cardPaddingSmall}>
                  <div className="flex items-center gap-2 text-center justify-center">
                    <Sparkles className="h-4 w-4 text-fuchsia-300" />
                    <span className={`text-xs ${glassCardStyles.text.muted}`}>
                      {t.constellationCards.exploreAll}
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
              <CardContent className={designTokens.spacing.cardPadding}>
                <div className="flex items-center gap-3 text-center justify-center">
                  <span className={`text-sm ${glassCardStyles.text.muted}`}>
                    {t.constellationCards.instructions}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Scrolling cards gallery */}
          <motion.div variants={itemVariants} className="relative">
            <div
              ref={scrollRef}
              className={`flex ${designTokens.spacing.cardGrid} overflow-x-auto scrollbar-hide pb-4`}
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
                    t={t}
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