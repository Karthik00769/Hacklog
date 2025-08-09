"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar } from "recharts"

type Score = { label: string; value: number }

export default function AIScoreChart({
  data = [
    { label: "Code", value: 0 },
    { label: "Design", value: 0 },
    { label: "Impact", value: 0 },
    { label: "Docs", value: 0 },
  ],
}: {
  data?: Score[]
}) {
  return (
    <ChartContainer
      className="h-64 w-full"
      config={{
        value: { label: "Score", color: "hsl(0 84% 60%)" },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" fill="hsl(0 84% 60%)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
