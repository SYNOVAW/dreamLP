"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-animation"

// Typewriter Effect Component
interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
  cursor?: boolean
}

export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 50, 
  className = "", 
  onComplete,
  cursor = true 
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text)
      setIsComplete(true)
      onComplete?.()
      return
    }

    const timer = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsComplete(true)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay, speed, onComplete, prefersReducedMotion])

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      {cursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="ml-1 text-fuchsia-300"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

// Word-by-Word Reveal Effect
interface WordRevealProps {
  text: string
  delay?: number
  wordDelay?: number
  className?: string
  staggerChildren?: number
}

export function WordReveal({ 
  text, 
  delay = 0, 
  wordDelay = 0.1, 
  className = "",
  staggerChildren = 0.08
}: WordRevealProps) {
  const words = text.split(" ")
  const prefersReducedMotion = useReducedMotion()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerChildren,
        delayChildren: delay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={item}
          className="inline-block mr-2 last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Sparkle Text Effect
interface SparkleTextProps {
  children: React.ReactNode
  className?: string
  sparkleCount?: number
  sparkleColors?: string[]
}

export function SparkleText({ 
  children, 
  className = "",
  sparkleCount = 8,
  sparkleColors = ["#d946ef", "#9333ea", "#7c3aed", "#a855f7"]
}: SparkleTextProps) {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>
  }

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      {Array.from({ length: sparkleCount }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
            fontSize: `${Math.random() * 0.8 + 0.5}rem`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: Math.random() * 3 + 2,
          }}
        >
          ✨
        </motion.span>
      ))}
    </span>
  )
}

// Gradient Animation Text
interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradientFrom?: string
  gradientTo?: string
  animationDuration?: number
}

export function GradientText({ 
  children, 
  className = "",
  gradientFrom = "#d946ef",
  gradientTo = "#9333ea",
  animationDuration = 3
}: GradientTextProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.span
      className={`bg-gradient-to-r bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo}, ${gradientFrom})`,
        backgroundSize: "200% 100%",
      }}
      animate={prefersReducedMotion ? {} : {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  )
}

// Floating Letters Effect
interface FloatingLettersProps {
  text: string
  className?: string
  delay?: number
  floatIntensity?: number
}

export function FloatingLetters({ 
  text, 
  className = "",
  delay = 0,
  floatIntensity = 10
}: FloatingLettersProps) {
  const letters = text.split("")
  const prefersReducedMotion = useReducedMotion()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={`inline-block ${className}`}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          animate={prefersReducedMotion ? {} : {
            y: [0, -floatIntensity, 0],
            rotate: [0, Math.random() * 6 - 3, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
          className="inline-block"
          style={{ 
            transformOrigin: "center center",
            minWidth: letter === " " ? "0.25em" : "auto"
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Glitch Text Effect
interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  triggerOnHover?: boolean
}

export function GlitchText({ 
  children, 
  className = "",
  intensity = 2,
  triggerOnHover = false
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(!triggerOnHover)
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>
  }

  const glitchAnimation = {
    x: [0, intensity, -intensity, intensity, 0],
    skew: [0, intensity, -intensity, 0],
    filter: [
      "hue-rotate(0deg)",
      `hue-rotate(${intensity * 20}deg)`,
      `hue-rotate(-${intensity * 20}deg)`,
      "hue-rotate(0deg)",
    ],
  }

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => triggerOnHover && setIsGlitching(true)}
      onMouseLeave={() => triggerOnHover && setIsGlitching(false)}
      animate={isGlitching ? glitchAnimation : {}}
      transition={{
        duration: 0.3,
        repeat: isGlitching ? Infinity : 0,
        repeatType: "mirror",
      }}
      style={{ willChange: "transform, filter" }}
    >
      {children}
    </motion.span>
  )
}

// Magical Text Reveal with Particles
interface MagicalRevealProps {
  children: React.ReactNode
  className?: string
  particleCount?: number
  revealDuration?: number
}

export function MagicalReveal({ 
  children, 
  className = "",
  particleCount = 20,
  revealDuration = 1.5
}: MagicalRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
        animate={{ 
          opacity: isRevealed ? 1 : 0, 
          scale: isRevealed ? 1 : 0.8,
          rotateY: isRevealed ? 0 : -90
        }}
        transition={{ 
          duration: prefersReducedMotion ? 0.1 : revealDuration,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
      
      {!prefersReducedMotion && (
        <AnimatePresence>
          {isRevealed && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: particleCount }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-fuchsia-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 200],
                    y: [0, (Math.random() - 0.5) * 200],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  exit={{ opacity: 0 }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

// Shimmer Text Effect
interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
  shimmerWidth?: number
  duration?: number
}

export function ShimmerText({ 
  children, 
  className = "",
  shimmerWidth = 100,
  duration = 2.5
}: ShimmerTextProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(90deg, currentColor 30%, rgba(255,255,255,0.8) 50%, currentColor 70%)",
        backgroundSize: `${shimmerWidth}% 100%`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
      animate={prefersReducedMotion ? {} : {
        backgroundPosition: ["-100% 0", "100% 0"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  )
}