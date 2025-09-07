"use client"

import { motion } from "framer-motion"
import { GrainGradient } from "@paper-design/shaders-react"
import { useReducedMotion } from "@/hooks/use-animation"

export function GradientBackground() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 z-0">
      {/* Main grain gradient */}
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(260, 30%, 10%)"
        softness={0.76}
        intensity={0.45}
        noise={0}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={prefersReducedMotion ? 0 : 1}
        colors={["hsl(280, 85%, 66%)", "hsl(290, 100%, 83%)", "hsl(270, 100%, 50%)"]}
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
          
          {/* Subtle constellation effect */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.3) 0, transparent 50%),
                                radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.2) 0, transparent 50%),
                                radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.3) 0, transparent 50%),
                                radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.2) 0, transparent 50%)`,
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </div>
  )
}
