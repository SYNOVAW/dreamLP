// Mindful design system inspired by Calm, Headspace and mindfulness principles
export const mindfulDesign = {
  // Calm and serene color palette - avoid bright, energetic colors
  colors: {
    // Soft, muted backgrounds - like dawn sky or gentle lake
    background: {
      primary: "from-slate-50 via-blue-50/30 to-slate-50", // Very soft, barely there gradient
      overlay: "bg-white/60 backdrop-blur-sm", // Gentle overlay
      card: "bg-white/40 backdrop-blur-md", // Subtle glass effect
    },
    
    // Natural, calming text colors
    text: {
      primary: "text-slate-800", // Soft dark, not harsh black
      secondary: "text-slate-600", // Gentle medium tone
      muted: "text-slate-500", // Soft, unobtrusive
      accent: "text-blue-700", // Calm blue instead of bright fuchsia
    },
    
    // Minimal accent colors inspired by nature
    accent: {
      primary: "bg-blue-100 border-blue-200", // Soft sky blue
      secondary: "bg-stone-100 border-stone-200", // Gentle earth tone
      highlight: "bg-blue-50 border-blue-100", // Very subtle highlight
    },
    
    // Remove harsh shadows and glows
    shadow: "shadow-sm shadow-slate-200/50" // Very subtle shadow
  },

  // Simplified typography - less dramatic, more readable
  typography: {
    hero: "text-4xl sm:text-5xl md:text-6xl font-medium", // Less aggressive than font-bold
    h1: "text-3xl md:text-4xl font-medium",
    h2: "text-2xl md:text-3xl font-medium", 
    h3: "text-xl md:text-2xl font-medium",
    body: "text-base leading-relaxed font-normal",
    small: "text-sm leading-relaxed font-normal",
    caption: "text-xs leading-normal font-normal"
  },

  // Generous spacing for breathing room
  spacing: {
    section: "py-20 md:py-32", // More breathing room
    sectionLarge: "py-24 md:py-40",
    cardPadding: "p-8", // More generous padding
    cardPaddingLarge: "p-12",
    cardGap: "gap-8 md:gap-12", // More space between elements
    elementGap: "gap-6", // Comfortable spacing
  },

  // Soft, natural shapes
  shapes: {
    borderRadius: "rounded-2xl", // Softer, more organic
    borderRadiusLarge: "rounded-3xl",
    borderRadiusSmall: "rounded-xl",
  },

  // Minimal animations - no flashy effects
  animation: {
    gentle: "transition-all duration-500 ease-out", // Slower, gentler
    subtle: "transition-opacity duration-300 ease-out",
    hover: "hover:bg-white/60 hover:shadow-md transition-all duration-300",
  },

  // Layout focused on content, minimal distractions
  layout: {
    container: "mx-auto max-w-4xl px-6", // Narrower, more focused
    containerWide: "mx-auto max-w-6xl px-6",
    containerNarrow: "mx-auto max-w-2xl px-6",
  }
}

// Utility functions for applying mindful design
export const applyMindful = {
  // Create calm, spacious sections
  section: (variant: 'default' | 'large' = 'default') => {
    const spacingMap = {
      default: mindfulDesign.spacing.section,
      large: mindfulDesign.spacing.sectionLarge
    }
    return `${spacingMap[variant]} relative`
  },

  // Gentle, natural cards
  card: (variant: 'default' | 'highlight' = 'default') => {
    const cardMap = {
      default: `${mindfulDesign.colors.background.card} ${mindfulDesign.shapes.borderRadius} ${mindfulDesign.colors.shadow}`,
      highlight: `${mindfulDesign.colors.accent.primary} ${mindfulDesign.shapes.borderRadius} ${mindfulDesign.colors.shadow}`
    }
    return `${cardMap[variant]} ${mindfulDesign.animation.hover}`
  },

  // Calm typography
  heading: (level: 'hero' | 'h1' | 'h2' | 'h3') => {
    return `${mindfulDesign.typography[level]} ${mindfulDesign.colors.text.primary}`
  },

  // Natural body text
  text: (variant: 'body' | 'small' | 'caption' = 'body', tone: 'primary' | 'secondary' | 'muted' = 'secondary') => {
    return `${mindfulDesign.typography[variant]} ${mindfulDesign.colors.text[tone]}`
  },

  // Subtle backgrounds
  background: (variant: 'primary' | 'overlay' = 'primary') => {
    return variant === 'primary' 
      ? `bg-gradient-to-br ${mindfulDesign.colors.background.primary}`
      : mindfulDesign.colors.background.overlay
  }
}