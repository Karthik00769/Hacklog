"use client"

import type React from "react"

import { Calendar, BarChartIcon as ChartBar, Home, LayoutGrid, ListChecks, Search, Upload } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
// This sidebar uses the shadcn/ui Sidebar primitives for a collapsible, professional nav [^1].

export function DashboardShell({
  active = "upload",
  items = [
    { key: "upload", title: "Upload", icon: Upload, href: "#upload" },
    { key: "scores", title: "AI Scores", icon: ChartBar, href: "#scores" },
    { key: "nft", title: "NFT", icon: LayoutGrid, href: "#nft" },
  ],
  children,
}: {
  active?: string
  items?: { key: string; title: string; icon: any; href: string }[]
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Sidebar className="bg-white">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((it) => (
                  <SidebarMenuItem key={it.key}>
                    <SidebarMenuButton asChild isActive={active === it.key}>
                      <a href={it.href}>
                        <it.icon />
                        <span>{it.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Navigate</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { title: "Home", href: "/", icon: Home },
                  { title: "Organizer", href: "/organizer", icon: ListChecks },
                  { title: "Recruiter", href: "/recruiter", icon: Search },
                  { title: "Events", href: "/organizer#events", icon: Calendar },
                ].map((it) => (
                  <SidebarMenuItem key={it.title}>
                    <SidebarMenuButton asChild>
                      <a href={it.href}>
                        <it.icon />
                        <span>{it.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b bg-background px-4 py-2">
          <SidebarTrigger />
          <div className="text-sm text-muted-foreground">Toggle</div>
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
