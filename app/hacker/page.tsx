"use client"

import TopNav from "@/components/top-nav"
import { DashboardShell } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import AIScoreChart from "@/components/ai-score-chart"
import NFTCard from "@/components/nft-card"
import { useEffect, useMemo, useState } from "react"
import { UploadCloud, Wand2 } from "lucide-react"

export default function HackerDashboard() {
  const [repo, setRepo] = useState("")
  const [figma, setFigma] = useState("")
  const [fileName, setFileName] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [scores, setScores] = useState<{ label: string; value: number }[] | null>(null)
  const [minting, setMinting] = useState(0)
  const [nftReady, setNftReady] = useState(false)
  const [flip, setFlip] = useState(false)

  const animatedScores = useMemo(
    () =>
      scores
        ? scores.map((s) => ({ ...s }))
        : [
            { label: "Code", value: 0 },
            { label: "Design", value: 0 },
            { label: "Impact", value: 0 },
            { label: "Docs", value: 0 },
          ],
    [scores],
  )

  const onUpload = () => {
    setSubmitting(true)
    // Simulate AI scoring
    setTimeout(() => {
      const gen = [
        { label: "Code", value: 88 },
        { label: "Design", value: 81 },
        { label: "Impact", value: 90 },
        { label: "Docs", value: 75 },
      ]
      setScores(gen)
      setSubmitting(false)
    }, 1000)
  }

  const onMint = () => {
    setMinting(5)
    const interval = setInterval(() => {
      setMinting((m) => {
        if (m >= 100) {
          clearInterval(interval)
          setNftReady(true)
          setTimeout(() => setFlip(true), 400)
          return 100
        }
        return Math.min(100, m + Math.random() * 18)
      })
    }, 300)
  }

  useEffect(() => {
    if (!scores) return
    // Animate score bars by slight delay
  }, [scores])

  return (
    <main>
      <TopNav showAuth={false} />
      <DashboardShell active="upload">
        <div className="mx-auto w-full max-w-6xl space-y-10 p-4 md:p-6">
          <section id="upload" className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload Portal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="repo">GitHub Repository</Label>
                  <Input
                    id="repo"
                    placeholder="https://github.com/user/repo"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    className="focus-visible:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="figma">Figma Link</Label>
                  <Input
                    id="figma"
                    placeholder="https://www.figma.com/file/..."
                    value={figma}
                    onChange={(e) => setFigma(e.target.value)}
                    className="focus-visible:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slides">Presentation (PDF/Slides)</Label>
                  <Input
                    id="slides"
                    type="file"
                    accept=".pdf,.ppt,.pptx"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                    className="cursor-pointer focus-visible:ring-red-500"
                  />
                  {fileName && <p className="text-xs text-muted-foreground">Selected: {fileName}</p>}
                </div>
                <Button onClick={onUpload} disabled={submitting} className="bg-red-600 text-white hover:bg-red-500">
                  <UploadCloud className="mr-2 size-4" /> {submitting ? "Submitting..." : "Submit for AI Verification"}
                </Button>
              </CardContent>
            </Card>

            <Card id="scores">
              <CardHeader>
                <CardTitle>AI Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <AIScoreChart data={animatedScores} />
                {!scores && <p className="mt-3 text-sm text-muted-foreground">Submit your work to generate scores.</p>}
                {scores && (
                  <Button
                    onClick={onMint}
                    variant="outline"
                    className="mt-4 border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                  >
                    <Wand2 className="mr-2 size-4" /> Mint NFT with Metadata
                  </Button>
                )}
              </CardContent>
            </Card>
          </section>

          <section id="nft" className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>NFT Minting Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={minting} className="h-2" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {minting < 100 ? "Minting in progress..." : "Minted successfully!"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>NFT Viewer</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                {nftReady ? (
                  <NFTCard score={Math.round((scores?.reduce((a, s) => a + s.value, 0) ?? 0) / 4)} flipped={flip} />
                ) : (
                  <p className="text-sm text-muted-foreground">Your NFT will appear here after minting.</p>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </DashboardShell>
    </main>
  )
}
