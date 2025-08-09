"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import * as React from "react"
import { Loader2 } from "lucide-react"

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prevPathRef = React.useRef<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (prevPathRef.current === null) {
      prevPathRef.current = pathname
      setLoading(false)
      return
    }
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 380)
    prevPathRef.current = pathname
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <div className="relative">
      {/* Global route-change spinner */}
      <div
        aria-hidden={!loading}
        className={`fixed inset-0 z-50 grid place-items-center bg-background/40 backdrop-blur-sm transition-opacity ${loading ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div
          aria-label="Loading"
          className="flex items-center gap-3 rounded-full border bg-white px-4 py-2 shadow-xl dark:bg-neutral-900"
        >
          <Loader2 className="size-5 animate-spin text-red-600" />
          <span className="text-sm text-foreground">Loading...</span>
        </div>
      </div>

      {/* Page transition */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
