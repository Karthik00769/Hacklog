"use client"

import { motion, useInView } from "framer-motion"
import { Brain, CheckCircle2, Coins, Search, Upload } from "lucide-react"
import { useRef } from "react"

const steps = [
  { title: "Upload Contributions", desc: "Add GitHub, Figma, and slides.", icon: Upload },
  { title: "AI Verification & Scoring", desc: "AI checks quality and impact.", icon: Brain },
  { title: "Organizer Review", desc: "Event organizer approves.", icon: CheckCircle2 },
  { title: "Mint NFT", desc: "Score + details secured on-chain.", icon: Coins },
  { title: "Recruiters Discover", desc: "Browse NFTs and metadata.", icon: Search },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { amount: 0.2, once: true })

  return (
    <section className="border-t bg-white py-14 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How Hacklog Works</h2>
          <p className="mt-2 text-muted-foreground">A seamless, secure flow for hackers, organizers, and recruiters.</p>
        </div>

        <div ref={ref} className="mt-10 grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => {
            const Icon = s.icon
            const side = i % 2 === 0 ? -24 : 24
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: side }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative rounded-xl border bg-card p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-red-600/10 p-2 text-red-600">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-sm text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="pointer-events-none absolute right-[-12px] top-1/2 hidden h-[2px] w-6 -translate-y-1/2 bg-red-200 md:block" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
