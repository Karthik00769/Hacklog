"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NFTCard({
  id = "hacklog-001",
  title = "Hacklog Contribution NFT",
  image = "/red-gradient-nft.png",
  score = 87,
  flipped = false,
}: {
  id?: string
  title?: string
  image?: string
  score?: number
  flipped?: boolean
}) {
  return (
    <div className="relative h-[360px] w-full [perspective:1200px] sm:w-[420px]">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative size-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <Card className="absolute inset-0 [backface-visibility:hidden]">
          <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={image || "/placeholder.svg"}
              alt="NFT artwork"
              className="h-48 w-full rounded-md object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
            <div className="mt-3 text-sm text-muted-foreground">
              Token ID: <span className="font-mono">{id}</span>
            </div>
            <div className="mt-2 font-semibold text-red-600">AI Score: {score}</div>
          </CardContent>
        </Card>

        {/* Back */}
        <Card className="absolute inset-0 rotate-y-180 [backface-visibility:hidden]">
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Repo:</span> github.com/user/repo
            </div>
            <div className="text-sm">
              <span className="font-medium">Figma:</span> figma.com/file/xyz
            </div>
            <div className="text-sm">
              <span className="font-medium">Event:</span> Global Hack 2025
            </div>
            <div className="text-sm">
              <span className="font-medium">Creator:</span> 0x1234...abcd
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
