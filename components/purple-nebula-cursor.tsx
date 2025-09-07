"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

interface PurpleNebulaCursorProps {
  isActive?: boolean
}

export function PurpleNebulaCursor({ isActive = true }: PurpleNebulaCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (!isActive || isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Hide cursor after 3 seconds of no movement
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 3000)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isActive, isMobile])

  // Don't render on mobile devices
  if (!isActive || isMobile) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] cursor-nebula">
      {/* Main nebula cursor */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-60 nebula-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, rgba(168, 85, 247, 0.4) 30%, rgba(196, 181, 253, 0.2) 60%, transparent 100%)',
          filter: 'blur(40px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isVisible ? [1, 1.2, 1] : 0,
          opacity: isVisible ? [0.6, 0.8, 0.6] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 0.5,
        }}
      />

      {/* Secondary nebula layers */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-40 nebula-float"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(196, 181, 253, 0.4) 40%, rgba(216, 180, 254, 0.2) 70%, transparent 100%)',
          filter: 'blur(30px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: mousePosition.x + 20,
          y: mousePosition.y - 15,
          scale: isVisible ? [0.8, 1.1, 0.8] : 0,
          opacity: isVisible ? [0.4, 0.6, 0.4] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 25,
          mass: 0.6,
          delay: 0.1,
        }}
      />

      {/* Third nebula layer */}
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(196, 181, 253, 0.5) 0%, rgba(216, 180, 254, 0.3) 35%, rgba(233, 213, 255, 0.2) 65%, transparent 100%)',
          filter: 'blur(35px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: mousePosition.x - 30,
          y: mousePosition.y + 25,
          scale: isVisible ? [0.9, 1.3, 0.9] : 0,
          opacity: isVisible ? [0.3, 0.5, 0.3] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 35,
          damping: 30,
          mass: 0.7,
          delay: 0.2,
        }}
      />

      {/* Floating particles around cursor */}
      {isVisible && (
        <>
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-purple-400/80 particle-glow"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              x: mousePosition.x + 50,
              y: mousePosition.y - 40,
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-purple-300/90 particle-glow"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              x: mousePosition.x - 60,
              y: mousePosition.y + 30,
              scale: [0, 1.5, 0],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute w-2.5 h-2.5 rounded-full bg-purple-500/70 particle-glow"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              x: mousePosition.x + 30,
              y: mousePosition.y + 60,
              scale: [0, 1.2, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />
        </>
      )}

      {/* Glow effect */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isVisible ? [0.5, 1, 0.5] : 0,
          opacity: isVisible ? [0.4, 0.6, 0.4] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 15,
          mass: 0.4,
        }}
      />
    </div>
  )
}
