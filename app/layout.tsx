import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Henry Speiser",
  description:
    "Portfolio of Henry Speiser, an engineer who builds things across software, electronics, and mechanical domains.",
  keywords: [
    "Henry Speiser",
    "Engineer",
    "Builder",
    "Software Engineer",
    "Electronics",
    "Mechanical Engineering",
    "Portfolio",
    "Projects",
    "Rockets",
    "PCB Design",
    "Embedded Systems",
    "3D Printing",
  ],
  authors: [{ name: "Henry Speiser", url: "https://henryspeiser.com" }],
  creator: "Henry Speiser",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://henryspeiser.com",
    title: "Henry Speiser",
    description:
      "Portfolio of Henry Speiser, an engineer who builds things across software, electronics, and mechanical domains.",
    siteName: "Henry Speiser Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Speiser",
    description:
      "Portfolio of Henry Speiser, an engineer who builds things across software, electronics, and mechanical domains.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
