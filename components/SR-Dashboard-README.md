# SR (Synchrony Rate) Dashboard Component

A comprehensive, animated React dashboard component for visualizing dream-reality synchronization metrics with advanced data visualization and multilingual support.

## 🌟 Features

### Visual Components
- **Animated Circular Progress**: Smooth progress rings with glow effects and pulse animations
- **Multi-dimensional Radial Chart**: 3D visualization showing Emotion/Symbol/Action sync relationships  
- **Weekly Trend Mini-chart**: Smooth line chart with animated data points and gradients
- **Enhanced Progress Bars**: Gradient fills with shimmer effects and smooth animations
- **Achievement System**: Unlockable badges with progress tracking and visual feedback

### Animation & Interactions
- **Staggered Entrance Animations**: Sequential element reveals using Framer Motion
- **Hover Effects**: Scale, rotate, and glow effects on interactive elements
- **Pulse Effects**: Continuous subtle animations for active metrics
- **Smooth Transitions**: Seamless state changes with easing functions
- **Click Interactions**: Expandable metric details and clickable achievement cards

### Accessibility & Performance
- **WCAG Compliance**: Full keyboard navigation, ARIA labels, high contrast support
- **Multi-language Support**: English, Japanese, and Chinese translations
- **Responsive Design**: Mobile-first approach with breakpoint optimizations
- **Memory Optimization**: Efficient animation rendering and cleanup
- **Reduced Motion**: Respects user preferences for motion sensitivity

## 📦 Installation & Usage

### Basic Implementation

```tsx
import SRDashboard from '@/components/sr-dashboard'
import type { SRData } from '@/components/sr-dashboard-types'

const MyApp = () => {
  const srData: SRData = {
    total: 75,
    dimensions: {
      emotion: 80,
      symbol: 70,
      action: 75
    },
    trend: 'up',
    trendValue: 3.2,
    lastUpdate: '1 hour ago',
    syncLevel: 'good',
    streakDays: 12,
    weeklyTrend: [/* your trend data */],
    achievements: [/* your achievements */]
  }

  return (
    <SRDashboard 
      data={srData}
      language="en"
      onMetricClick={(metric, value) => console.log(`${metric}: ${value}%`)}
    />
  )
}
```

### Advanced Configuration

```tsx
import SRDashboard from '@/components/sr-dashboard'

const AdvancedExample = () => {
  const customTheme = {
    primaryColor: '#3b82f6',
    accentColor: '#10b981',
    backgroundColor: 'rgba(255, 255, 255, 0.08)'
  }

  return (
    <SRDashboard
      data={srData}
      language="ja"
      theme={customTheme}
      animationSpeed="fast"
      className="my-custom-dashboard"
      onMetricClick={handleMetricClick}
      onAchievementClick={handleAchievementClick}
    />
  )
}
```

## 🎛️ Props Interface

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `SRData` | Mock data | SR metrics and trend data |
| `className` | `string` | `''` | Additional CSS classes |
| `language` | `'en' \| 'ja' \| 'zh'` | `'ja'` | Display language |
| `theme` | `SRTheme` | Default theme | Custom color scheme |
| `animationSpeed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Animation timing |

### Event Handlers

| Prop | Type | Description |
|------|------|-------------|
| `onMetricClick` | `(metric: string, value: number) => void` | Metric click handler |
| `onAchievementClick` | `(achievement: AchievementState) => void` | Achievement click handler |

## 📊 Data Structure

### SRData Interface

```typescript
interface SRData {
  total: number              // Overall sync rate (0-100)
  dimensions: {
    emotion: number         // Emotional sync (0-100)
    symbol: number          // Symbol sync (0-100)
    action: number          // Action sync (0-100)
  }
  trend: 'up' | 'down' | 'stable'
  trendValue: number        // Change amount
  lastUpdate: string
  weeklyTrend: WeeklyTrendPoint[]
  achievements: AchievementState[]
  syncLevel: 'excellent' | 'good' | 'fair' | 'needs-work'
  streakDays: number
}
```

### Achievement System

```typescript
interface AchievementState {
  level: 'bronze' | 'silver' | 'gold' | 'diamond'
  title: string
  description: string
  unlocked: boolean
  progress: number  // 0-100
}
```

## 🎨 Theme Configuration

### Default Theme

```typescript
const defaultTheme = {
  primaryColor: '#8b5cf6',    // Purple
  accentColor: '#06b6d4',     // Cyan
  backgroundColor: 'rgba(255, 255, 255, 0.05)'
}
```

### Custom Themes

```typescript
const blueTheme = {
  primaryColor: '#3b82f6',
  accentColor: '#10b981',
  backgroundColor: 'rgba(255, 255, 255, 0.05)'
}

const emeraldTheme = {
  primaryColor: '#10b981',
  accentColor: '#f59e0b',
  backgroundColor: 'rgba(255, 255, 255, 0.05)'
}
```

## 🌐 Internationalization

### Supported Languages

- **English (`en`)**: Complete interface translation
- **Japanese (`ja`)**: Native Japanese text and formatting
- **Chinese (`zh`)**: Simplified Chinese interface

### Adding New Languages

1. Add language code to `SupportedLanguage` type
2. Extend `translations` object with new language
3. Update language selector in components

```typescript
const translations = {
  // ... existing translations
  fr: {
    title: 'Tableau de Bord du Taux de Synchronie',
    emotion: 'Sync Émotionnel',
    // ... complete translation
  }
}
```

## 🎬 Animation System

### Animation Speeds

```typescript
const animationSpeeds = {
  slow: { duration: 1.2, delay: 0.3 },
  normal: { duration: 0.8, delay: 0.2 },
  fast: { duration: 0.6, delay: 0.1 }
}
```

### Custom Animations

The component uses Framer Motion for animations:

- **Staggered Container**: Sequential child animations
- **Spring Physics**: Natural motion for interactive elements
- **Path Animations**: SVG path drawing for charts
- **Gesture Animations**: Hover and tap responses

## ♿ Accessibility Features

### Keyboard Navigation
- Tab navigation through all interactive elements
- Enter/Space activation for buttons and clickable items
- Arrow key navigation for chart elements

### Screen Reader Support
- Comprehensive ARIA labels and descriptions
- Role definitions for custom components
- Live regions for dynamic content updates

### Visual Accessibility
- High contrast color ratios (WCAG AA compliant)
- Scalable text and UI elements
- Reduced motion support via `prefers-reduced-motion`

### Implementation

```tsx
// Reduced motion support
const shouldReduceMotion = useReducedMotion()

<motion.div
  animate={shouldReduceMotion ? {} : animationConfig}
  // ...
/>
```

## 🚀 Performance Optimizations

### Rendering Optimizations
- **Lazy Loading**: Complex visualizations load on demand
- **Memoization**: React.memo for expensive components
- **Animation Cleanup**: Proper cleanup of Framer Motion instances
- **SVG Optimization**: Minimal DOM manipulation for charts

### Memory Management
- Automatic animation cleanup on unmount
- Debounced event handlers
- Efficient state updates with minimal re-renders

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `< 768px` - Single column layout, reduced chart sizes
- **Tablet**: `768px - 1024px` - Two-column grid, medium charts
- **Desktop**: `> 1024px` - Three-column grid, full-size visualizations

### Mobile Optimizations
- Touch-friendly interactive elements (44px minimum)
- Reduced animation complexity on lower-end devices
- Adaptive text sizing and spacing

## 🔧 Development

### Component Structure
```
components/
├── sr-dashboard.tsx              # Main dashboard component
├── sr-dashboard-types.ts         # TypeScript definitions
├── sr-dashboard-example.tsx      # Usage examples
└── SR-Dashboard-README.md        # This documentation
```

### Dependencies
- React 18+
- Framer Motion (latest)
- Tailwind CSS 3+
- Radix UI components
- TypeScript 4.5+

### Development Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Type checking
pnpm type-check

# Build for production
pnpm build
```

## 🎯 Use Cases

### Healthcare & Wellness Apps
- Sleep quality visualization
- Meditation progress tracking
- Mental health monitoring
- Biometric data correlation

### Dream Analysis Platforms
- REM sleep pattern analysis
- Dream-reality synchronization studies
- Psychological assessment tools
- Research data visualization

### Productivity & Goal Tracking
- Habit formation analysis
- Performance correlation studies
- Personal development metrics
- Achievement progress systems

## 🤝 Contributing

### Code Style
- Use TypeScript for all new features
- Follow existing animation patterns
- Maintain accessibility standards
- Add comprehensive JSDoc comments

### Testing
- Test all interactive elements with keyboard navigation
- Verify screen reader compatibility
- Test across different languages
- Validate performance on mobile devices

## 📄 License

This component is part of the DreamLife landing page project and follows the project's licensing terms.

## 🔮 Roadmap

- [ ] Real-time data streaming support
- [ ] Export functionality for charts
- [ ] Custom achievement creation
- [ ] Voice interface integration
- [ ] VR/AR visualization modes
- [ ] Advanced filtering and time range selection
- [ ] Social sharing features
- [ ] Dark/Light theme toggle