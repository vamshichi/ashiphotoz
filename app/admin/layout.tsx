import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./admin.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing website content",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-100`}>
      {children}
    </div>
  )
} 