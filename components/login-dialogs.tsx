"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Button } from "@/components/ui/button"
import { BadgeCheck, Bot } from "lucide-react"

export function HackerLoginDialog({
  open = false,
  onOpenChange = () => {},
}: {
  open?: boolean
  onOpenChange?: (v: boolean) => void
}) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [captchaQ] = useState(() => {
    const a = Math.floor(2 + Math.random() * 7)
    const b = Math.floor(2 + Math.random() * 7)
    return { a, b, ans: a + b }
  })
  const [captcha, setCaptcha] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setError(null)
    if (Number(captcha) !== captchaQ.ans) {
      setError("CAPTCHA failed. Please try again.")
      return
    }
    if (!email.includes("@")) {
      setError("Enter a valid email.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
      router.push("/hacker")
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="hacker-login-desc">
        <DialogHeader>
          <DialogTitle>Hacker Login</DialogTitle>
          <DialogDescription id="hacker-login-desc">
            Solve the CAPTCHA to continue and access your upload dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="h-email">Email</Label>
            <Input
              id="h-email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-visible:ring-red-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="h-captcha" className="flex items-center gap-2">
              <Bot className="size-4 text-red-600" />
              CAPTCHA: What is {captchaQ.a} + {captchaQ.b}?
            </Label>
            <Input
              id="h-captcha"
              placeholder="Enter answer"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              className="focus-visible:ring-red-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={submit} className="bg-red-600 text-white hover:bg-red-500" disabled={loading}>
            <BadgeCheck className="mr-2 size-4" /> Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const PERSONAL_BLOCKLIST = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "aol.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
]

export function OrganizerLoginDialog({
  open = false,
  onOpenChange = () => {},
}: {
  open?: boolean
  onOpenChange?: (v: boolean) => void
}) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setError(null)
    const parts = email.split("@")
    if (parts.length !== 2) {
      setError("Enter a valid organization email.")
      return
    }
    const domain = parts[1].toLowerCase()
    if (PERSONAL_BLOCKLIST.includes(domain)) {
      setError("Personal email domains are not allowed. Use your organization email.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
      router.push("/organizer")
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="organizer-login-desc">
        <DialogHeader>
          <DialogTitle>Organizer Login</DialogTitle>
          <DialogDescription id="organizer-login-desc">
            Organization email required. Personal domains are blocked.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="o-email">Organization Email</Label>
            <Input
              id="o-email"
              placeholder="you@yourcompany.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-visible:ring-red-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={submit} className="bg-red-600 text-white hover:bg-red-500" disabled={loading}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
