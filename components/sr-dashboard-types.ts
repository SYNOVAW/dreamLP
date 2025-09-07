// SR Dashboard Type Definitions
// Complete TypeScript interfaces for the SR Dashboard component

export interface WeeklyTrendPoint {
  day: string
  value: number
  date: Date
}

export interface AchievementState {
  level: 'bronze' | 'silver' | 'gold' | 'diamond'
  title: string
  description: string
  unlocked: boolean
  progress: number // 0-100
}

export interface SRDimensions {
  emotion: number // 0-100
  symbol: number  // 0-100
  action: number  // 0-100
}

export interface SRData {
  /** Overall synchrony rate percentage (0-100) */
  total: number
  
  /** Individual dimension scores */
  dimensions: SRDimensions
  
  /** Trend direction */
  trend: 'up' | 'down' | 'stable'
  
  /** Numerical trend value (can be positive or negative) */
  trendValue: number
  
  /** Human-readable last update time */
  lastUpdate: string
  
  /** Weekly trend data for mini chart */
  weeklyTrend: WeeklyTrendPoint[]
  
  /** User achievements and progress */
  achievements: AchievementState[]
  
  /** Overall sync level category */
  syncLevel: 'excellent' | 'good' | 'fair' | 'needs-work'
  
  /** Current streak in days */
  streakDays: number
}

export interface SRTheme {
  /** Primary color for charts and progress indicators */
  primaryColor?: string
  
  /** Accent color for highlights and secondary elements */
  accentColor?: string
  
  /** Background color override */
  backgroundColor?: string
}

export interface SRDashboardProps {
  /** SR data to display. If not provided, uses mock data */
  data?: SRData
  
  /** Additional CSS classes */
  className?: string
  
  /** Language for text display */
  language?: 'en' | 'ja' | 'zh'
  
  /** Theme configuration */
  theme?: SRTheme
  
  /** Animation speed control */
  animationSpeed?: 'slow' | 'normal' | 'fast'
  
  /** Callback when a metric is clicked */
  onMetricClick?: (metric: string, value: number) => void
  
  /** Callback when an achievement is clicked */
  onAchievementClick?: (achievement: AchievementState) => void
}

// Language Translation Interfaces
export interface Translations {
  title: string
  emotion: string
  symbol: string
  action: string
  weeklyTrend: string
  lastUpdate: string
  streakDays: string
  achievements: string
  excellent: string
  good: string
  fair: string
  needsWork: string
  description: string
  emotionDesc: string
  symbolDesc: string
  actionDesc: string
}

export type SupportedLanguage = 'en' | 'ja' | 'zh'

// Component-specific interfaces
export interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  showPercentage?: boolean
  animated?: boolean
  pulseOnHover?: boolean
}

export interface RadialChartProps {
  dimensions: SRDimensions
  size?: number
}

export interface WeeklyTrendChartProps {
  data: WeeklyTrendPoint[]
  height?: number
}

// Animation configuration types
export interface AnimationConfig {
  duration: number
  delay: number
}

export type AnimationSpeed = 'slow' | 'normal' | 'fast'

// Level determination return type
export interface SRLevel {
  level: string
  color: string
  bg: string
  gradient: string
}

// Usage Examples and Default Values
export const DEFAULT_SR_DATA: SRData = {
  total: 68,
  dimensions: {
    emotion: 72,
    symbol: 65,
    action: 67
  },
  trend: 'up',
  trendValue: 5.2,
  lastUpdate: '2時間前',
  syncLevel: 'good',
  streakDays: 7,
  weeklyTrend: [
    { day: 'Mon', value: 62, date: new Date('2024-09-01') },
    { day: 'Tue', value: 65, date: new Date('2024-09-02') },
    { day: 'Wed', value: 58, date: new Date('2024-09-03') },
    { day: 'Thu', value: 70, date: new Date('2024-09-04') },
    { day: 'Fri', value: 68, date: new Date('2024-09-05') },
    { day: 'Sat', value: 72, date: new Date('2024-09-06') },
    { day: 'Sun', value: 68, date: new Date('2024-09-07') }
  ],
  achievements: [
    {
      level: 'gold',
      title: 'Dream Synchronizer',
      description: 'Achieved 70%+ SR for 7 consecutive days',
      unlocked: true,
      progress: 100
    },
    {
      level: 'silver',
      title: 'Emotion Master',
      description: 'Maintained 80%+ emotion sync for 3 days',
      unlocked: false,
      progress: 67
    },
    {
      level: 'bronze',
      title: 'Action Taker',
      description: 'Complete 10 recommended actions',
      unlocked: true,
      progress: 100
    }
  ]
}

export const DEFAULT_THEME: SRTheme = {
  primaryColor: '#8b5cf6',
  accentColor: '#06b6d4',
  backgroundColor: 'rgba(255, 255, 255, 0.05)'
}

// Performance optimization types
export interface PerformanceConfig {
  /** Enable lazy loading for complex visualizations */
  lazyLoad?: boolean
  
  /** Reduce animation complexity for better performance */
  reducedMotion?: boolean
  
  /** Enable memory management for continuous animations */
  memoryManagement?: boolean
}

// Accessibility configuration
export interface AccessibilityConfig {
  /** Enable high contrast mode */
  highContrast?: boolean
  
  /** Reduce motion for sensitive users */
  reduceMotion?: boolean
  
  /** Enable additional ARIA labels */
  verboseAria?: boolean
  
  /** Focus management for keyboard navigation */
  focusManagement?: boolean
}

// Extended props with performance and accessibility
export interface ExtendedSRDashboardProps extends SRDashboardProps {
  /** Performance optimization settings */
  performance?: PerformanceConfig
  
  /** Accessibility configuration */
  accessibility?: AccessibilityConfig
}