"use client"

import { motion } from "framer-motion"
import { GrainGradient } from "@paper-design/shaders-react"
import { useReducedMotion } from "@/hooks/use-animation"

export function GradientBackground() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 z-0">
      {/* Enhanced watermelon red to purple gradient */}
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(260, 30%, 10%)"
        softness={0.8}
        intensity={0.5}
        noise={0}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={prefersReducedMotion ? 0 : 1}
        colors={["hsl(348, 83%, 64%)", "hsl(280, 85%, 66%)", "hsl(270, 100%, 50%)"]}
      />
      
      {/* Floating orbs */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-transparent blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400/15 to-transparent blur-3xl"
            animate={{
              x: [0, -80, 120, 0],
              y: [0, 100, -60, 0],
              scale: [1, 0.9, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          
          <motion.div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-400/10 to-transparent blur-2xl"
            animate={{
              x: [0, -60, 40, 0],
              y: [0, -40, 80, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: 5,
            }}
          />
          
          {/* Particle-like effects */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 8}%`,
              }}
              animate={{
                y: [0, -20, 10, 0],
                opacity: [0.2, 0.8, 0.2, 0.2],
                scale: [1, 1.5, 1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
            />
          ))}
          
          {/* Four-pointed stars */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute opacity-40"
              style={{
                left: `${15 + (i * 7) % 70}%`,
                top: `${20 + (i * 11) % 60}%`,
                width: '8px',
                height: '8px',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 45, 90, 135, 180],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 6 + (i % 3) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Floating sheep silhouettes */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`sheep-${i}`}
              className="absolute opacity-20"
              style={{
                left: `${10 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
                width: '32px',
                height: '24px',
              }}
              animate={{
                x: [0, 50, -30, 0],
                y: [0, -20, 10, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1, 0.9, 0.8],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            >
              <svg
                viewBox="0 0 32 24"
                fill="currentColor"
                className="w-full h-full text-white/40"
              >
                {/* Simple sheep silhouette */}
                <ellipse cx="20" cy="16" rx="10" ry="6" />
                <circle cx="12" cy="14" r="4" />
                <circle cx="8" cy="12" r="3" />
                <circle cx="15" cy="10" r="2.5" />
                <circle cx="24" cy="12" r="2" />
                <rect x="26" y="11" width="4" height="8" rx="1" />
                <rect x="6" y="14" width="3" height="6" rx="1" />
                <rect x="18" y="18" width="3" height="4" rx="1" />
                <rect x="22" y="19" width="3" height="4" rx="1" />
              </svg>
            </motion.div>
          ))}

          {/* Enhanced constellation effect */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.4) 0, transparent 50%),
                                radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.3) 0, transparent 50%),
                                radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.4) 0, transparent 50%),
                                radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.3) 0, transparent 50%),
                                radial-gradient(1px 1px at 15% 80%, rgba(255,192,203,0.3) 0, transparent 50%),
                                radial-gradient(1px 1px at 85% 15%, rgba(138,43,226,0.3) 0, transparent 50%)`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </div>
  )
}
