import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Student Portfolio Builder",
  description:
    "Build stunning academic profiles, showcase your projects, and download professional PDFs. Your data stays with you - we don't store anything!",
  keywords: ["portfolio", "student", "resume", "CV", "academic", "projects", "PDF"],
  authors: [{ name: "Student Portfolio Builder" }],
  openGraph: {
    title: "Student Portfolio Builder",
    description: "Create professional student portfolios in minutes",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
