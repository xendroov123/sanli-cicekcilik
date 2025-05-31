import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Şanlı Çiçekçilik - Online Çiçek Siparişi | sezertezcan.com",
  description:
    "Türkiye'nin en güvenilir çiçekçisi Şanlı Çiçekçilik ile sevdiklerinize en taze çiçekleri gönderin. Aynı gün teslimat, ücretsiz kargo.",
  keywords: "çiçek, çiçek siparişi, online çiçekçi, gül buketi, orkide, doğum günü çiçekleri",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
