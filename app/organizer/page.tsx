"use client"

import type React from "react"

import TopNav from "@/components/top-nav"
import { DashboardShell } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useMemo, useState } from "react"
import { Calendar, Check, CircleHelp, X } from "lucide-react"

type Submission = {
  id: string
  hacker: string
  repo: string
  score: number
  status: "pending" | "approved" | "rejected"
}

const initialSubs: Submission[] = [
  { id: "sub-001", hacker: "alice.eth", repo: "github.com/alice/zk-vault", score: 92, status: "pending" },
  { id: "sub-002", hacker: "bob.eth", repo: "github.com/bob/defi-ui", score: 81, status: "pending" },
  { id: "sub-003", hacker: "eve.eth", repo: "github.com/eve/ai-agent", score: 87, status: "pending" },
]

export default function OrganizerPanel() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [dates, setDates] = useState("")
  const [createdEvents, setCreatedEvents] = useState<{ title: string; desc: string; dates: string }[]>([])
  const [subs, setSubs] = useState<Submission[]>(initialSubs)
  const [confirm, setConfirm] = useState<{ id: string; action: "approve" | "reject" } | null>(null)
  const [mintProgress, setMintProgress] = useState<Record<string, number>>({})

  const pending = useMemo(() => subs.filter((s) => s.status === "pending"), [subs])

  const createEvent = () => {
    if (!title) return
    setCreatedEvents((e) => [{ title, desc, dates }, ...e])
    setTitle("")
    setDesc("")
    setDates("")
  }

  const triggerMint = (id: string) => {
    setMintProgress((m) => ({ ...m, [id]: 5 }))
    const t = setInterval(() => {
      setMintProgress((m) => {
        const cur = m[id] ?? 0
        if (cur >= 100) {
          clearInterval(t)
          return { ...m, [id]: 100 }
        }
        return { ...m, [id]: Math.min(100, cur + Math.random() * 20) }
      })
    }, 350)
  }

  const onConfirm = () => {
    if (!confirm) return
    setSubs((all) =>
      all.map((s) =>
        s.id === confirm.id ? { ...s, status: confirm.action === "approve" ? "approved" : "rejected" } : s,
      ),
    )
    if (confirm.action === "approve") triggerMint(confirm.id)
    setConfirm(null)
  }

  return (
    <main>
      <TopNav showAuth={false} />
      <DashboardShell
        active="upload"
        items={[
          { key: "events", title: "Events", icon: Calendar, href: "#events" },
          { key: "submissions", title: "Submissions", icon: CircleHelp, href: "#submissions" },
        ]}
      >
        <div className="mx-auto w-full max-w-6xl space-y-10 p-4 md:p-6">
          <section id="events" className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Hackathon Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="e-title">Title</Label>
                  <Input
                    id="e-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Global Hack 2025"
                    className="focus-visible:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="e-desc">Description</Label>
                  <Input
                    id="e-desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Build the future of..."
                    className="focus-visible:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="e-dates">Dates</Label>
                  <Input
                    id="e-dates"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    placeholder="Jan 12 - Jan 14, 2025"
                    className="focus-visible:ring-red-500"
                  />
                </div>
                <RippleButton onClick={createEvent} className="bg-red-600 text-white hover:bg-red-500">
                  Create Event
                </RippleButton>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Created Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {createdEvents.length === 0 && <p className="text-sm text-muted-foreground">No events yet.</p>}
                {createdEvents.map((e, i) => (
                  <div key={i} className="rounded-lg border p-4 transition-opacity animate-in fade-in">
                    <div className="font-medium">{e.title}</div>
                    <div className="text-sm text-muted-foreground">{e.desc}</div>
                    <div className="text-sm text-muted-foreground">{e.dates}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <Separator />

          <section id="submissions" className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Approve Submissions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {subs.map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-col gap-2 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="font-medium">{s.hacker}</div>
                      <div className="text-sm text-muted-foreground">{s.repo}</div>
                      <div className="text-sm text-red-600">AI Score: {s.score}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {s.status === "pending" ? (
                        <>
                          <RippleButton
                            onClick={() => setConfirm({ id: s.id, action: "approve" })}
                            className="bg-green-600 text-white hover:bg-green-500"
                          >
                            <Check className="mr-2 size-4" /> Approve
                          </RippleButton>
                          <RippleButton
                            onClick={() => setConfirm({ id: s.id, action: "reject" })}
                            className="bg-red-600 text-white hover:bg-red-500"
                          >
                            <X className="mr-2 size-4" /> Reject
                          </RippleButton>
                        </>
                      ) : s.status === "approved" ? (
                        <div className="w-56">
                          <div className="mb-2 text-sm text-muted-foreground">Minting NFT...</div>
                          <Progress value={mintProgress[s.id] ?? 0} className="h-2" />
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">Rejected</div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </DashboardShell>

      <Dialog open={!!confirm} onOpenChange={() => setConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm {confirm?.action === "approve" ? "Approval" : "Rejection"}</DialogTitle>
            <DialogDescription>Are you sure you want to {confirm?.action} this submission?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirm(null)}>
              Cancel
            </Button>
            <Button
              className={
                confirm?.action === "approve"
                  ? "bg-green-600 text-white hover:bg-green-500"
                  : "bg-red-600 text-white hover:bg-red-500"
              }
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

function RippleButton({
  className = "",
  children,
  onClick,
}: {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none ${className}`}
      onMouseDown={(e) => {
        const target = e.currentTarget
        const circle = document.createElement("span")
        const diameter = Math.max(target.clientWidth, target.clientHeight)
        const radius = diameter / 2
        circle.style.width = circle.style.height = `${diameter}px`
        circle.style.left = `${e.clientX - target.getBoundingClientRect().left - radius}px`
        circle.style.top = `${e.clientY - target.getBoundingClientRect().top - radius}px`
        circle.classList.add("ripple")
        const ripple = target.getElementsByClassName("ripple")[0]
        if (ripple) {
          ripple.remove()
        }
        target.appendChild(circle)
      }}
    >
      {children}
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 600ms linear;
          background-color: rgba(255, 255, 255, 0.7);
          pointer-events: none;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  )
}
