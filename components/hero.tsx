"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShieldCheck, UploadCloud, Sparkles } from "lucide-react"
import { useState } from "react"
import { HackerLoginDialog, OrganizerLoginDialog } from "@/components/login-dialogs"

export default function Hero() {
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 400], [0, -60])
  const [openHacker, setOpenHacker] = useState(false)
  const [openOrganizer, setOpenOrganizer] = useState(false)

  return (
    <section className="relative overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: yParallax }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(244,63,94,0.25),transparent),linear-gradient(to_bottom,white,white)] dark:bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(244,63,94,0.25),transparent),linear-gradient(to_bottom,#0a0a0a,#0a0a0a)]"
      />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:py-24 lg:py-28 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
            <Sparkles className="size-3.5" />
            Professional hackathon credentials on-chain
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Showcase verified hackathon impact with premium NFTs
          </h1>
          <p className="mt-4 max-w-prose text-muted-foreground">
            Hacklog scores your contributions with AI, secures them on-chain, and makes your work discoverable to
            recruiters.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setOpenHacker(true)}
              className="group relative bg-red-600 text-white hover:bg-red-500"
            >
              <UploadCloud className="mr-2 size-4" />
              For Hackers — Login & Upload
              <span className="absolute inset-0 rounded-md ring-2 ring-transparent transition group-hover:ring-red-400/60" />
            </Button>
            <Button
              onClick={() => setOpenOrganizer(true)}
              variant="outline"
              className="group relative border-red-200 text-red-700 hover:bg-red-50"
            >
              <ShieldCheck className="mr-2 size-4" />
              For Organizers — Host Events
              <span className="absolute inset-0 rounded-md ring-2 ring-transparent transition group-hover:ring-red-200" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative rounded-xl border bg-card p-4 shadow-sm md:p-6">
            <img
              src="/abstract-red-glassmorphism-dashboard.png"
              alt="Hacklog polished UI preview"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <div className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl bg-gradient-to-tr from-transparent via-transparent to-red-200 blur-2xl" />
          </div>
        </motion.div>
      </div>

      <HackerLoginDialog open={openHacker} onOpenChange={setOpenHacker} />
      <OrganizerLoginDialog open={openOrganizer} onOpenChange={setOpenOrganizer} />
    </section>
  )
}
