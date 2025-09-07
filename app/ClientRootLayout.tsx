"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { PurpleNebulaCursor } from "@/components/purple-nebula-cursor"
import LoadingScreen from "@/components/loading-screen"
import { useMediaQuery } from "@/hooks/use-media-query"

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")
  
  // Instagram/LinkedIn等の埋め込みビューを検出
  const isInstagramEmbed = typeof window !== "undefined" && 
    (window.location.href.includes("instagram.com") || 
     window.navigator.userAgent.includes("Instagram") ||
     window.navigator.userAgent.includes("LinkedIn") ||
     window.navigator.userAgent.includes("FBAN") ||
     window.navigator.userAgent.includes("FBAV") ||
     document.referrer.includes("instagram.com") ||
     document.referrer.includes("linkedin.com"))

  // Handle client-side mounting with optimized timing
  useEffect(() => {
    console.log('ClientRootLayout - isInstagramEmbed:', isInstagramEmbed)
    console.log('ClientRootLayout - isMobile:', isMobile)
    
    // モバイルや埋め込みビューでは即座にマウント
    const mountDelay = isInstagramEmbed ? 0 : (isMobile ? 50 : 100)
    
    console.log('ClientRootLayout - mountDelay:', mountDelay)
    
    const timer = setTimeout(() => {
      console.log('ClientRootLayout - Setting mounted to true')
      setMounted(true)
      
      // ローディング状態を少し遅延させてから解除
      setTimeout(() => {
        setIsLoading(false)
      }, 100)
    }, mountDelay)

    return () => clearTimeout(timer)
  }, [isMobile, isInstagramEmbed])

  // フォールバック: 埋め込みブラウザ1秒、正常ブラウザ3秒後に強制的にマウント
  useEffect(() => {
    const fallbackTime = isInstagramEmbed ? 1000 : 3000
    const fallbackTimer = setTimeout(() => {
      if (!mounted) {
        console.warn("ClientRootLayout - Forcing mount due to timeout, isInstagramEmbed:", isInstagramEmbed)
        setMounted(true)
        setIsLoading(false)
      }
    }, fallbackTime)

    return () => clearTimeout(fallbackTimer)
  }, [mounted, isInstagramEmbed])

  // ローディング完了時のコールバック
  const handleLoadingComplete = () => {
    console.log('ClientRootLayout - Loading complete')
    setIsLoading(false)
  }

  // ローディング中はLoadingScreenを表示
  if (isLoading && mounted) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  // マウント前の初期状態
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* 紫色星雲カーソルエフェクト */}
      <PurpleNebulaCursor isActive={mounted} />
      
      <main className="flex-1">{children}</main>
    </>
  )
}
