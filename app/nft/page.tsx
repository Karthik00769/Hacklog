"use client"

import TopNav from "@/components/top-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Search } from "lucide-react"

export default function NFTIndex() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const onSearch = () => {
    if (!query) return
    // Simulated lookup
    setResult(query.startsWith("nft-") ? query : "nft-1")
  }

  return (
    <main>
      <TopNav showAuth={false} />
      <section className="mx-auto w-full max-w-3xl p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Public NFT Viewer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hash">Search by hash or link</Label>
              <div className="flex gap-2">
                <Input
                  id="hash"
                  placeholder="nft-12 or 0xhash..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="focus-visible:ring-red-500"
                />
                <Button onClick={onSearch} className="bg-red-600 text-white hover:bg-red-500">
                  <Search className="mr-2 size-4" /> Search
                </Button>
              </div>
            </div>

            {result && (
              <div className="rounded-lg border p-4">
                <div className="font-medium">Result</div>
                <div className="mt-1 text-sm text-muted-foreground">Found matching NFT:</div>
                <Link className="text-red-600 underline" href={`/nft/${result}`}>
                  Open {result}
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
