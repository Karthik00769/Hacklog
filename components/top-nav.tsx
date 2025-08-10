"use client"
import Link from "next/link"
import { Menu, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function TopNav({ showAuth = true }: { showAuth?: boolean }) {
  const [account, setAccount] = useState<string | null>(null)

  async function connectWallet(role: "hacker" | "organizer") {
    try {
      if (!window.ethereum) {
        alert("Core wallet / MetaMask not found. Please install it.")
        return
      }

      // Request account access
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const selectedAccount = accounts[0]
      setAccount(selectedAccount)

      console.log(`Connected as ${selectedAccount} for role: ${role}`)
      // You can now send this account & role to your backend for authentication
      
      const message = `Login as ${role} at ${new Date().toISOString()}`
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, selectedAccount],
      })

      console.log("Signature:", signature)
      alert(`Wallet connected: ${selectedAccount}\nSignature: ${signature}`)
    } catch (err) {
      console.error("Wallet connection error:", err)
      alert("Failed to connect wallet.")
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md dark:bg-neutral-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-red-600 to-red-500 text-white font-bold">
            H
          </div>
          <span className="text-lg font-bold tracking-tight">Hacklog</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link className="text-sm text-muted-foreground hover:text-foreground" href="/hacker">
            Hacker Dashboard
          </Link>
          <Link className="text-sm text-muted-foreground hover:text-foreground" href="/organizer">
            Organizer Panel
          </Link>
          <Link className="text-sm text-muted-foreground hover:text-foreground" href="/recruiter">
            Recruiter Portal
          </Link>
          <Link className="text-sm text-muted-foreground hover:text-foreground" href="/nft">
            NFT Viewer
          </Link>
          <a
            className="text-sm text-muted-foreground hover:text-foreground"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex items-center gap-1.5">
              <Github className="size-4" /> GitHub
            </div>
          </a>
          {showAuth && (
            <div className="flex items-center gap-2">
              <Button
                className="bg-red-600 text-white hover:bg-red-500"
                onClick={() => connectWallet("hacker")}
              >
                For Hackers
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-500"
                onClick={() => connectWallet("organizer")}
              >
                For Organizers
              </Button>
            </div>
          )}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Open Menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-3">
                <Link className="text-sm" href="/hacker">
                  Hacker Dashboard
                </Link>
                <Link className="text-sm" href="/organizer">
                  Organizer Panel
                </Link>
                <Link className="text-sm" href="/recruiter">
                  Recruiter Portal
                </Link>
                <Link className="text-sm" href="/nft">
                  NFT Viewer
                </Link>
                {showAuth && (
                  <>
                    <Button
                      className="bg-red-600 text-white hover:bg-red-500"
                      onClick={() => connectWallet("hacker")}
                    >
                      For Hackers
                    </Button>
                    <Button
                      className="bg-red-600 text-white hover:bg-red-500"
                      onClick={() => connectWallet("organizer")}
                    >
                      For Organizers
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
