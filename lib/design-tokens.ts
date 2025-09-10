// Unified design tokens for consistent styling across the app
export const designTokens = {
  // Typography scale for consistent text hierarchy
  typography: {
    hero: "text-6xl sm:text-7xl md:text-8xl font-bold",
    h1: "text-4xl md:text-5xl font-bold",
    h2: "text-3xl md:text-4xl font-semibold", 
    h3: "text-2xl md:text-3xl font-semibold",
    h4: "text-xl md:text-2xl font-medium",
    h5: "text-lg md:text-xl font-medium",
    bodyLarge: "text-lg md:text-xl leading-relaxed",
    body: "text-base leading-relaxed",
    bodySmall: "text-sm leading-relaxed",
    caption: "text-xs leading-normal"
  },

  // Consistent spacing system
  spacing: {
    // Section spacing
    section: "py-16 md:py-24",
    sectionLarge: "py-20 md:py-32",
    sectionCompact: "py-12 md:py-16",
    
    // Component spacing
    cardPadding: "p-6",
    cardPaddingLarge: "p-8",
    cardPaddingSmall: "p-4",
    
    // Grid and layout gaps
    cardGrid: "gap-6 md:gap-8",
    elementSpacing: {
      xs: "gap-2",
      sm: "gap-4", 
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12"
    },
    
    // Margins for consistent vertical rhythm
    marginBottom: {
      sm: "mb-4",
      md: "mb-6", 
      lg: "mb-8",
      xl: "mb-12"
    }
  },

  // Component sizing standards
  components: {
    // Card aspect ratios
    aspectRatios: {
      standard: "aspect-[3/4]",    // Standard cards
      portrait: "aspect-[3/5]",    // Portrait cards
      landscape: "aspect-[16/9]",  // Landscape cards
      square: "aspect-square"      // Square cards
    },
    
    // Border radius consistency
    borderRadius: {
      small: "rounded-lg",
      medium: "rounded-xl", 
      large: "rounded-2xl",
      pill: "rounded-full"
    },
    
    // Component heights
    heights: {
      input: "h-11",
      buttonSmall: "h-9",
      buttonMedium: "h-11", 
      buttonLarge: "h-14",
      cardMinHeight: "min-h-[400px]"
    },
    
    // Widths for consistent layouts
    widths: {
      cardStandard: "w-72",
      cardWide: "w-80",
      cardNarrow: "w-64"
    }
  },

  // Color system with consistent opacity levels
  colors: {
    // Background opacity levels
    backgroundOpacity: {
      subtle: "/5",   // Very light backgrounds
      light: "/10",   // Light backgrounds
      medium: "/20",  // Medium backgrounds
      strong: "/30"   // Strong backgrounds
    },
    
    // Border opacity levels
    borderOpacity: {
      subtle: "/10",   // Subtle borders
      medium: "/20",   // Standard borders
      strong: "/30"    // Prominent borders
    },
    
    // Shadow opacity levels
    shadowOpacity: {
      subtle: "/5",
      medium: "/10",
      strong: "/20"
    }
  },

  // Animation system for consistent timing
  animation: {
    // Duration standards
    duration: {
      fast: "duration-200",
      normal: "duration-300", 
      slow: "duration-500",
      slower: "duration-700"
    },
    
    // Easing functions
    easing: {
      standard: "ease-in-out",
      smooth: "ease-out",
      bounce: "ease-in-out"
    },
    
    // Delay patterns for staggered animations
    delay: {
      none: "delay-0",
      short: "delay-100",
      medium: "delay-200", 
      long: "delay-300"
    }
  },

  // Layout containers for consistent widths
  layout: {
    container: "mx-auto max-w-7xl px-4",
    containerNarrow: "mx-auto max-w-4xl px-4",
    containerWide: "mx-auto max-w-6xl px-4"
  }
}

// Utility functions for applying design tokens
export const applyTokens = {
  // Apply consistent section styling
  section: (variant: 'default' | 'large' | 'compact' = 'default') => {
    const spacingMap = {
      default: designTokens.spacing.section,
      large: designTokens.spacing.sectionLarge,
      compact: designTokens.spacing.sectionCompact
    }
    return `${spacingMap[variant]} relative overflow-hidden`
  },

  // Apply consistent card styling
  card: (size: 'standard' | 'wide' | 'narrow' = 'standard', aspectRatio: 'standard' | 'portrait' | 'landscape' | 'square' = 'standard') => {
    const widthMap = {
      standard: designTokens.components.widths.cardStandard,
      wide: designTokens.components.widths.cardWide,
      narrow: designTokens.components.widths.cardNarrow
    }
    return `${widthMap[size]} ${designTokens.components.aspectRatios[aspectRatio]}`
  },

  // Apply consistent heading styles
  heading: (level: 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5') => {
    return designTokens.typography[level]
  },

  // Apply consistent body text styles
  text: (variant: 'large' | 'body' | 'small' | 'caption' = 'body') => {
    const textMap = {
      large: designTokens.typography.bodyLarge,
      body: designTokens.typography.body,
      small: designTokens.typography.bodySmall,
      caption: designTokens.typography.caption
    }
    return textMap[variant]
  }
}