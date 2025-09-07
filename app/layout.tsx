import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Instrument_Serif } from "next/font/google"
import { Suspense } from "react"
import { PurpleNebulaCursor } from "@/components/purple-nebula-cursor"
import { ClientRootLayout } from "./ClientRootLayout"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700"],
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
  weight: "400",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://remia.app'),
  title: "REMia · 梦境生活 - 记录梦境，解锁内心世界的秘密",
  description: "改善睡眠质量，调节情绪压力，建立生活仪式感。记录昨夜的故事，AI解读象征与情绪；抽取今日「命运卡」，获得个性化的呼吸/饮食/作息建议；解锁与你同频的梦中Persona陪伴。",
  keywords: ["梦境记录", "睡眠改善", "AI解梦", "Persona", "冥想", "情绪调节", "生活仪式感"],
  authors: [{ name: "SYNOVA WHISPER" }],
  creator: "SYNOVA WHISPER",
  publisher: "SYNOVA WHISPER",
  openGraph: {
    title: "REMia · 梦境生活",
    description: "把你的梦，变成白天的指引",
    url: "https://remia.app",
    siteName: "REMia",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "REMia - 梦境生活应用",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REMia · 梦境生活",
    description: "把你的梦，变成白天的指引",
    images: ["/logo.png"],
    creator: "@SYNOVAWHISPER",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${instrumentSerif.variable} antialiased`}>
      <body className={`font-sans ${GeistMono.variable}`}>
        <ClientRootLayout>
          <Suspense fallback={null}>{children}</Suspense>
        </ClientRootLayout>
        <Analytics />
      </body>
    </html>
  )
}
