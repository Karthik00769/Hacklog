"use client"

import TopNav from "@/components/top-nav"
import { DashboardShell } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Filter, Search } from "lucide-react"

type NFT = { id: string; event: string; skill: string; score: number }

const ALL: NFT[] = Array.from({ length: 34 }).map((_, i) => ({
  id: `nft-${i + 1}`,
  event: i % 2 === 0 ? "Global Hack 2025" : "Web3 Summit 2025",
  skill: ["Frontend", "Smart Contracts", "AI", "Design"][i % 4],
  score: 60 + ((i * 7) % 41),
}))

export default function RecruiterPortal() {
  const [q, setQ] = useState("")
  const [score, setScore] = useState<number[]>([70])
  const [event, setEvent] = useState<string>("all")
  const [skill, setSkill] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const min = score[0] ?? 0
    return ALL.filter((n) => {
      const matchQ = q ? n.id.includes(q) : true
      const matchE = event === "all" ? true : n.event === event
      const matchS = skill === "all" ? true : n.skill === skill
      const matchScore = n.score >= min
      return matchQ && matchE && matchS && matchScore
    })
  }, [q, event, skill, score])

  const pageSize = 9
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const items = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    setPage(1)
  }, [q, event, skill, score])

  return (
    <main>
      <TopNav showAuth={false} />
      <DashboardShell active="nft" items={[{ key: "browser", title: "NFT Browser", icon: Search, href: "#browser" }]}>
        <div className="mx-auto w-full max-w-6xl space-y-8 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Explore Contribution NFTs</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="border-red-200 hover:bg-red-50 bg-transparent">
                  <Filter className="mr-2 size-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[420px]">
                <SheetHeader>
                  <SheetTitle>Filter NFTs</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <Label>Search by ID</Label>
                    <Input
                      placeholder="nft-12"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="focus-visible:ring-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum AI Score: {score[0]}</Label>
                    <Slider
                      value={score}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={setScore}
                      className="[--track-active:theme(colors.red.500)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Event</Label>
                    <select
                      value={event}
                      onChange={(e) => setEvent(e.target.value)}
                      className="w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      <option value="all">All</option>
                      <option value="Global Hack 2025">Global Hack 2025</option>
                      <option value="Web3 Summit 2025">Web3 Summit 2025</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Skill</Label>
                    <select
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      className="w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      <option value="all">All</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Smart Contracts">Smart Contracts</option>
                      <option value="AI">AI</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <section id="browser" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: pageSize }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <CardContent className="space-y-2 p-4">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </CardContent>
                  </Card>
                ))
              : items.map((n) => (
                  <Link key={n.id} href={`/nft/${n.id}`} className="block">
                    <Card className="transition-transform duration-200 hover:scale-[1.02]">
                      <CardHeader>
                        <CardTitle className="text-base">{n.id}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src="/red-tech-nft.png"
                          alt={`NFT ${n.id}`}
                          className="h-40 w-full rounded-md object-cover"
                        />
                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Event:</span> {n.event}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Skill:</span> {n.skill}
                          </div>
                          <div className="col-span-2 text-red-600 font-medium">AI Score: {n.score}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
          </section>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setPage((p) => Math.max(1, p - 1))
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: pages })
                  .slice(0, 5)
                  .map((_, i) => {
                    const p = i + 1
                    return (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === page}
                          onClick={(e) => {
                            e.preventDefault()
                            setPage(p)
                          }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setPage((p) => Math.min(pages, p + 1))
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </DashboardShell>
    </main>
  )
}
