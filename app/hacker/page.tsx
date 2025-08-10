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
import { UploadCloud, Wand2,} from "lucide-react"

export default function HackerDashboard() {
  const [repo, setRepo] = useState("")
  const [figma, setFigma] = useState("")
  const [ppt, setPpt] = useState<File | null>(null)
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
            { label: "Presentation", value: 0 },
          ],
    [scores]
  )

  const onUpload = async () => {
    if (!repo && !figma && !ppt) {
      alert("Please provide at least one input (Repo, Figma, or PPT).")
      return
    }

    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("repo", repo)
      formData.append("figma", figma)
      if (ppt) formData.append("ppt", ppt)

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (!res.ok || data.error) {
        throw new Error(data.error || "Unexpected API error")
      }

      const scoresArr = Object.entries(data).map(([label, value]) => ({
        label,
        value: Number(value),
      }))
      setScores(scoresArr)
    } catch (err) {
      console.error(err)
      alert("Error analyzing data.")
    } finally {
      setSubmitting(false)
    }
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
  }, [scores])

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <TopNav showAuth={false} />
      <DashboardShell active="upload">
        <div className="mx-auto w-full max-w-6xl space-y-10 p-4 md:p-6">
          {/* Upload Section */}
          <section id="upload" className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-lg border border-gray-200">
              <CardHeader className="bg-red-600 text-white p-3">
                <CardTitle>🚀 Project Analysis Portal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="repo">GitHub Repository</Label>
                    <Input
                      id="repo"
                      placeholder="https://github.com/user/repo"
                      value={repo}
                      onChange={(e) => setRepo(e.target.value)}
                      className="focus-visible:ring-red-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="figma">Figma Link</Label>
                    <Input
                      id="figma"
                      placeholder="https://www.figma.com/file/..."
                      value={figma}
                      onChange={(e) => setFigma(e.target.value)}
                      className="focus-visible:ring-red-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ppt">Upload PPT</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="ppt"
                        type="file"
                        accept=".ppt,.pptx"
                        onChange={(e) => setPpt(e.target.files?.[0] || null)}
                        className="focus-visible:ring-red-500"
                      />
                      {ppt && (
                        <span className="text-sm text-gray-600">{ppt.name}</span>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={onUpload}
                  disabled={submitting}
                  className="w-full bg-red-600 text-white hover:bg-red-500"
                >
                  <UploadCloud className="mr-2 size-4" />
                  {submitting ? "Analyzing..." : "Submit for AI Analysis"}
                </Button>
              </CardContent>
            </Card>

            {/* Scores Section */}
            <Card className="shadow-lg border border-gray-200">
              <CardHeader className="bg-gray-800 text-white p-3">
                <CardTitle>📊 AI Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <AIScoreChart data={animatedScores} />
                {!scores && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Submit your work to generate scores.
                  </p>
                )}
                {scores && (
                  <Button
                    onClick={onMint}
                    variant="outline"
                    className="mt-4 w-full border-red-200 text-red-700 hover:bg-red-50"
                  >
                    <Wand2 className="mr-2 size-4" /> Mint NFT with Metadata
                  </Button>
                )}
              </CardContent>
            </Card>
          </section>

          {/* NFT Section */}
          <section id="nft" className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-md border border-gray-200">
              <CardHeader className="bg-yellow-500 text-white p-3">
                <CardTitle>⛏ NFT Minting Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={minting} className="h-2" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {minting < 100 ? "Minting in progress..." : "Minted successfully!"}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md border border-gray-200">
              <CardHeader className="bg-green-600 text-white p-3">
                <CardTitle>🎨 NFT Viewer</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center min-h-[200px]">
                {nftReady ? (
                  <NFTCard
                    score={Math.round(
                      (scores?.reduce((a, s) => a + s.value, 0) ?? 0) /
                        (scores?.length || 1)
                    )}
                    flipped={flip}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Your NFT will appear here after minting.
                  </p>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </DashboardShell>
    </main>
  )
}
