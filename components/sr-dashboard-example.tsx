'use client'

import React, { useState } from 'react'
import SRDashboard from './sr-dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Example usage component demonstrating all SR Dashboard features
export default function SRDashboardExample() {
  const [language, setLanguage] = useState<'en' | 'ja' | 'zh'>('ja')
  const [animationSpeed, setAnimationSpeed] = useState<'slow' | 'normal' | 'fast'>('normal')
  const [theme, setTheme] = useState('purple')

  // Sample data configurations
  const sampleData = {
    excellent: {
      total: 89,
      dimensions: {
        emotion: 92,
        symbol: 87,
        action: 88
      },
      trend: 'up' as const,
      trendValue: 7.3,
      lastUpdate: '1時間前',
      syncLevel: 'excellent' as const,
      streakDays: 14,
      weeklyTrend: [
        { day: 'Mon', value: 82, date: new Date('2024-09-01') },
        { day: 'Tue', value: 85, date: new Date('2024-09-02') },
        { day: 'Wed', value: 88, date: new Date('2024-09-03') },
        { day: 'Thu', value: 90, date: new Date('2024-09-04') },
        { day: 'Fri', value: 88, date: new Date('2024-09-05') },
        { day: 'Sat', value: 92, date: new Date('2024-09-06') },
        { day: 'Sun', value: 89, date: new Date('2024-09-07') }
      ],
      achievements: [
        {
          level: 'diamond' as const,
          title: 'Dream Master',
          description: 'Achieved 90%+ SR for 14 consecutive days',
          unlocked: true,
          progress: 100
        },
        {
          level: 'gold' as const,
          title: 'Emotion Synchronizer',
          description: 'Maintained 90%+ emotion sync for 7 days',
          unlocked: true,
          progress: 100
        },
        {
          level: 'silver' as const,
          title: 'Symbol Reader',
          description: 'Decoded 50 dream symbols correctly',
          unlocked: false,
          progress: 78
        }
      ]
    },
    moderate: {
      total: 68,
      dimensions: {
        emotion: 72,
        symbol: 65,
        action: 67
      },
      trend: 'up' as const,
      trendValue: 5.2,
      lastUpdate: '2時間前',
      syncLevel: 'good' as const,
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
          level: 'gold' as const,
          title: 'Dream Synchronizer',
          description: 'Achieved 70%+ SR for 7 consecutive days',
          unlocked: true,
          progress: 100
        },
        {
          level: 'silver' as const,
          title: 'Emotion Master',
          description: 'Maintained 80%+ emotion sync for 3 days',
          unlocked: false,
          progress: 67
        },
        {
          level: 'bronze' as const,
          title: 'Action Taker',
          description: 'Complete 10 recommended actions',
          unlocked: true,
          progress: 100
        }
      ]
    }
  }

  const [currentData, setCurrentData] = useState<typeof sampleData.moderate | typeof sampleData.excellent>(sampleData.moderate)

  const themeConfigs = {
    purple: {
      primaryColor: '#8b5cf6',
      accentColor: '#06b6d4',
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    },
    blue: {
      primaryColor: '#3b82f6',
      accentColor: '#10b981',
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    },
    emerald: {
      primaryColor: '#10b981',
      accentColor: '#f59e0b',
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }
  }

  const handleMetricClick = (metric: string, value?: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Metric clicked: ${metric} with value ${value || 'N/A'}%`)
    }
  }

  const handleAchievementClick = (achievement: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Achievement clicked:`, achievement)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Control Panel */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">SR Dashboard Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4 items-center">
              
              {/* Language Selector */}
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Language</label>
                <Select value={language} onValueChange={(value: 'en' | 'ja' | 'zh') => setLanguage(value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Theme Selector */}
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Theme</label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="emerald">Emerald</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Animation Speed */}
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Animation</label>
                <Select value={animationSpeed} onValueChange={(value: 'slow' | 'normal' | 'fast') => setAnimationSpeed(value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="slow">Slow</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="fast">Fast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Data Sample Selector */}
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Sample Data</label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={currentData === sampleData.moderate ? "default" : "outline"}
                    onClick={() => setCurrentData(sampleData.moderate)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Moderate
                  </Button>
                  <Button
                    size="sm"
                    variant={currentData === sampleData.excellent ? "default" : "outline"}
                    onClick={() => setCurrentData(sampleData.excellent)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Excellent
                  </Button>
                </div>
              </div>

              {/* Reset Button */}
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Actions</label>
                <Button
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                >
                  Reset Animations
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Main SR Dashboard */}
        <SRDashboard
          data={currentData}
          language={language}
          theme={themeConfigs[theme as keyof typeof themeConfigs]}
          animationSpeed={animationSpeed}
          onMetricClick={handleMetricClick}
          onAchievementClick={handleAchievementClick}
          className="animate-fade-in"
        />

        {/* Feature Overview */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">✨ Features Demonstrated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300">
              <div>
                <h4 className="font-medium text-white mb-2">🎨 Visual Components</h4>
                <ul className="space-y-1">
                  <li>• Animated circular progress indicators with glow effects</li>
                  <li>• Multi-dimensional radial chart for 3D data visualization</li>
                  <li>• Weekly trend mini-chart with smooth animations</li>
                  <li>• Enhanced progress bars with shimmer effects</li>
                  <li>• Achievement system with unlockable badges</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">🚀 Interactions & Animation</h4>
                <ul className="space-y-1">
                  <li>• Staggered entrance animations for dashboard elements</li>
                  <li>• Hover effects and click interactions</li>
                  <li>• Pulse effects for active metrics</li>
                  <li>• Smooth transitions between states</li>
                  <li>• Responsive design for mobile and desktop</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Features */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">♿ Accessibility Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div>
                <h4 className="font-medium text-white mb-2">Keyboard Navigation</h4>
                <p>All interactive elements support keyboard navigation with Tab, Enter, and Arrow keys.</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Screen Reader Support</h4>
                <p>ARIA labels, roles, and descriptions provide context for assistive technologies.</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Visual Accessibility</h4>
                <p>High contrast ratios, scalable text, and reduced motion options for sensitive users.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}