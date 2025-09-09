"use client"

import { useInView } from "framer-motion"
import { useRef, useReducer, useEffect } from "react"

// Custom hook for scroll-triggered animations
export function useScrollAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.3 
  })
  
  return { ref, isInView }
}

// Custom hook for reduced motion preferences
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useReducer(
    (state: boolean, action: boolean) => action,
    false
  )

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return
    }

    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
      mediaQuery.addEventListener('change', handleChange)

      return () => mediaQuery.removeEventListener('change', handleChange)
    } catch (error) {
      // Fallback for browsers that don't support matchMedia
      console.warn('matchMedia is not supported in this environment')
    }
  }, [])

  return prefersReducedMotion
}

// Enhanced animation variants for REMia
export const animationVariants = {
  // Page load animations
  pageLoad: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  },

  // Scroll-triggered animations
  slideUp: {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  slideInLeft: {
    hidden: { opacity: 0, x: -60 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  slideInRight: {
    hidden: { opacity: 0, x: 60 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Staggered container animations
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Card animations
  cardHover: {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.03, 
      y: -8,
      transition: { 
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }
    },
  },

  // Button animations
  buttonPress: {
    rest: { scale: 1 },
    tap: { 
      scale: 0.95,
      transition: { 
        duration: 0.1,
        ease: "easeOut",
      }
    },
  },

  // Floating animations
  float: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  },

  floatSlow: {
    animate: {
      y: [-15, 15, -15],
      x: [-5, 5, -5],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  },

  // Navigation animations
  navSlide: {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Form animations
  formFocus: {
    rest: { scale: 1, borderColor: "rgba(255, 255, 255, 0.15)" },
    focus: {
      scale: 1.02,
      borderColor: "rgba(217, 70, 239, 0.4)",
      boxShadow: "0 0 0 2px rgba(217, 70, 239, 0.1)",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  },

  // Success/error states
  successPulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  },

  shake: {
    animate: {
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  },

  // Typography effects
  typewriter: {
    hidden: { width: 0, opacity: 0 },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  },

  wordByWord: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  sparkleText: {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },

  glowPulse: {
    animate: {
      textShadow: [
        "0 0 10px rgba(217, 70, 239, 0.5)",
        "0 0 20px rgba(217, 70, 239, 0.8)",
        "0 0 30px rgba(217, 70, 239, 1)",
        "0 0 20px rgba(217, 70, 239, 0.8)",
        "0 0 10px rgba(217, 70, 239, 0.5)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // Advanced card animations
  cardMagnetic: {
    rest: { 
      scale: 1, 
      y: 0, 
      rotateX: 0, 
      rotateY: 0,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    },
    hover: { 
      scale: 1.05, 
      y: -15,
      rotateX: 5,
      rotateY: 5,
      boxShadow: "0 25px 50px rgba(217, 70, 239, 0.3)",
      transition: { 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    },
  },

  cardBreathing: {
    animate: {
      scale: [1, 1.02, 1],
      rotateZ: [0, 0.5, 0, -0.5, 0],
      boxShadow: [
        "0 10px 30px rgba(217, 70, 239, 0.2)",
        "0 15px 40px rgba(217, 70, 239, 0.4)",
        "0 10px 30px rgba(217, 70, 239, 0.2)",
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  cardFlipEnhanced: {
    rest: { rotateY: 0, scale: 1 },
    flip: {
      rotateY: 180,
      scale: 1.05,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  },

  // Particle and cosmic effects
  cosmicFloat: {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 5, 0, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  },

  starTwinkle: {
    animate: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 180, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    },
  },

  nebulaSwirl: {
    animate: {
      rotate: 360,
      scale: [1, 1.1, 1],
      opacity: [0.4, 0.7, 0.4],
      transition: {
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        },
        scale: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
        opacity: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
  },

  // Enhanced button animations
  buttonMagical: {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 20px rgba(217, 70, 239, 0.3)",
      background: "linear-gradient(135deg, #d946ef, #9333ea)",
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 8px 30px rgba(217, 70, 239, 0.6)",
      background: "linear-gradient(135deg, #e879f9, #a855f7)",
      transition: { 
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    tap: { 
      scale: 0.95,
      transition: { 
        duration: 0.1,
        ease: "easeOut",
      }
    },
  },

  // Scroll-triggered enhanced animations
  slideUpMagical: {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.9,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  parallaxScroll: {
    animate: (scrollY: number) => ({
      y: scrollY * 0.5,
      opacity: 1 - scrollY * 0.002,
      transition: {
        type: "tween",
        ease: "linear",
        duration: 0,
      },
    }),
  },

  // Logo and branding animations
  logoGlow: {
    animate: {
      filter: [
        "drop-shadow(0 0 10px rgba(217, 70, 239, 0.5))",
        "drop-shadow(0 0 20px rgba(217, 70, 239, 0.8))",
        "drop-shadow(0 0 30px rgba(217, 70, 239, 1))",
        "drop-shadow(0 0 20px rgba(217, 70, 239, 0.8))",
        "drop-shadow(0 0 10px rgba(217, 70, 239, 0.5))",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // Form and interaction animations
  inputMagical: {
    rest: { 
      scale: 1, 
      borderColor: "rgba(255, 255, 255, 0.15)",
      boxShadow: "0 0 0 0 rgba(217, 70, 239, 0)",
    },
    focus: {
      scale: 1.02,
      borderColor: "rgba(217, 70, 239, 0.6)",
      boxShadow: "0 0 0 4px rgba(217, 70, 239, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  },
}

// Animation utilities
export const createDelayedVariant = (delay: number, baseVariant: any) => ({
  ...baseVariant,
  show: {
    ...baseVariant.show,
    transition: {
      ...baseVariant.show.transition,
      delay,
    },
  },
})

export const getResponsiveAnimation = (isMobile: boolean, variant: any) => {
  if (isMobile) {
    // Reduce animation intensity for mobile
    return {
      ...variant,
      show: {
        ...variant.show,
        transition: {
          ...variant.show.transition,
          duration: (variant.show.transition.duration || 0.6) * 0.7,
        },
      },
    }
  }
  return variant
}