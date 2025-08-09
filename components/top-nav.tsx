"use client"

import Link from "next/link"
import { Menu, Github, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { HackerLoginDialog, OrganizerLoginDialog } from "@/components/login-dialogs"

export default function TopNav({ showAuth = true }: { showAuth?: boolean }) {
  const [hackerOpen, setHackerOpen] = useState(false)
  const [orgOpen, setOrgOpen] = useState(false)

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
              <Button onClick={() => setHackerOpen(true)} className="bg-red-600 text-white hover:bg-red-500">
                For Hackers
              </Button>
              <Button
                onClick={() => setOrgOpen(true)}
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50"
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
                    <Button onClick={() => setHackerOpen(true)} className="bg-red-600 text-white hover:bg-red-500">
                      <LogIn className="mr-2 size-4" /> For Hackers
                    </Button>
                    <Button
                      onClick={() => setOrgOpen(true)}
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <LogIn className="mr-2 size-4" /> For Organizers
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Auth dialogs */}
      <HackerLoginDialog open={hackerOpen} onOpenChange={setHackerOpen} />
      <OrganizerLoginDialog open={orgOpen} onOpenChange={setOrgOpen} />
    </header>
  )
}
