"use client"

import { useInView } from "framer-motion"
import { useRef, useReducer, useEffect } from "react"

// Animation variants for consistent use across components
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
}

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
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
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