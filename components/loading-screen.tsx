"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isInstagramEmbed, setIsInstagramEmbed] = useState(false)

  useEffect(() => {
    // Instagram/LinkedIn等の埋め込みブラウザを検出
    const userAgent = navigator.userAgent.toLowerCase()
    const referrer = document.referrer.toLowerCase()
    
    const isEmbedded = userAgent.includes('instagram') || 
                     userAgent.includes('linkedin') || 
                     userAgent.includes('fban') || 
                     userAgent.includes('fbav') ||
                     userAgent.includes('facebook') ||
                     userAgent.includes('twitter') ||
                     userAgent.includes('tiktok') ||
                     referrer.includes('instagram.com') ||
                     referrer.includes('linkedin.com') ||
                     referrer.includes('facebook.com') ||
                     referrer.includes('twitter.com') ||
                     referrer.includes('tiktok.com')
    
    console.log('LoadingScreen - UserAgent:', userAgent)
    console.log('LoadingScreen - Referrer:', referrer)
    console.log('LoadingScreen - IsEmbedded:', isEmbedded)
    
    setIsInstagramEmbed(isEmbedded)
    
    // 埋め込みブラウザでも美しいアニメーションを表示するため、時間を延長
    const loadingTime = isEmbedded ? 2000 : 3000
    
    // 埋め込みブラウザでは画像読み込みを待たずに短時間で完了
    const timer = setTimeout(() => {
      console.log('LoadingScreen - Timer fired, hiding loading')
      setIsVisible(false)
      setTimeout(() => {
        console.log('LoadingScreen - Calling onLoadingComplete')
        onLoadingComplete()
      }, isEmbedded ? 100 : 1000)
    }, loadingTime)

    // フォールバック: 最大3秒後に強制完了（埋め込みの場合）
    const fallbackTimer = setTimeout(() => {
      console.log('LoadingScreen - Fallback timer fired, forcing completion')
      setIsVisible(false)
      onLoadingComplete()
    }, isEmbedded ? 3000 : 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(fallbackTimer)
    }
  }, [onLoadingComplete, isImageLoaded])

  // Instagram/LinkedIn埋め込みブラウザ用の美しいローディング版
  if (isInstagramEmbed && isVisible) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 bg-black z-[99999] flex items-center justify-center"
      >
        {/* ロゴコンテナ */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.2
          }}
          className="relative"
        >
          {/* ロゴ画像 */}
          <Image
            src="/synova-logo-new.png"
            alt="Synova Whisper Logo"
            width={150}
            height={150}
            className="object-contain"
            priority
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
          />
          
          {/* ロゴ周りの光るエフェクト */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-xl"
          />
        </motion.div>

        {/* ローディングテキスト */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 1.0
          }}
          className="absolute bottom-20 text-center"
        >
          <div className="relative">
            {/* 背景の光るエフェクト */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-purple-500/20 blur-xl rounded-lg"></div>
            
            {/* メインテキスト */}
            <div className="relative">
              {/* テキストの影 */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-white to-indigo-400 bg-clip-text text-transparent text-lg font-light tracking-wider uppercase blur-sm opacity-50">
                REMia
              </div>
              {/* メインテキスト */}
              <div className="relative bg-gradient-to-r from-purple-400 via-white to-indigo-400 bg-clip-text text-transparent text-lg font-light tracking-wider uppercase">
                REMia
              </div>
            </div>
            
            {/* 下線のアニメーション */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.0,
                ease: "easeOut",
                delay: 1.5
              }}
              className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            />
          </div>
        </motion.div>

        {/* ローディングドット */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-10 flex space-x-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 1.2 + i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.2
              }}
              className="w-2 h-2 bg-purple-400 rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>
    )
  }

  // 埋め込みブラウザで非表示の場合は何も返さない
  if (isInstagramEmbed && !isVisible) {
    return null
  }

  // 通常のブラウザ用のフル版
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isInstagramEmbed ? 0.3 : 1, ease: "easeInOut" }}
          className="fixed inset-0 bg-black z-[99999] flex items-center justify-center"
        >
          {/* ロゴコンテナ */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut",
              delay: 0.3 
            }}
            className="relative"
          >
            {/* ロゴ画像 */}
            <Image
              src="/synova-logo-new.png"
              alt="Synova Whisper Logo"
              width={200}
              height={200}
              className="object-contain"
              priority
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(true)} // エラーでも進める
            />
            
            {/* ロゴ周りの光るエフェクト */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-xl"
            />
          </motion.div>

          {/* ローディングテキスト */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 1.5 
            }}
            className="absolute bottom-20 text-center"
          >
            <div className="relative">
              {/* 背景の光るエフェクト */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-purple-500/20 blur-xl rounded-lg"></div>
              
              {/* メインテキスト */}
              <div className="relative">
                {/* テキストの影 */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-white to-indigo-400 bg-clip-text text-transparent text-xl md:text-2xl font-light tracking-[0.3em] uppercase blur-sm opacity-50">
                  REMia
                </div>
                {/* メインテキスト */}
                <div className="relative bg-gradient-to-r from-purple-400 via-white to-indigo-400 bg-clip-text text-transparent text-xl md:text-2xl font-light tracking-[0.3em] uppercase">
                  REMia
                </div>
              </div>
              
              {/* 下線のアニメーション */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut",
                  delay: 2.2 
                }}
                className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
              />
            </div>
          </motion.div>

          {/* ローディングドット */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="absolute bottom-10 flex space-x-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 2 + i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.2
                }}
                className="w-2 h-2 bg-purple-400 rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
