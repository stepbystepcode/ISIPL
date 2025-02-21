"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with a legend"

const chartData = [
  { month: "数据库原理", desktop: 186, mobile: 80 },
  { month: "计算机系统", desktop: 305, mobile: 200 },
  { month: "计算机组成原理", desktop: 237, mobile: 120 },
  { month: "计算机网络", desktop: 73, mobile: 190 },
  { month: "人工智能", desktop: 209, mobile: 130 },
  { month: "数据结构", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "你的水平",
    color: "hsl(173 58% 39%)",
  },
  mobile: {
    label: "班级平均水平",
    color: "hsl(12 76% 61%)",
  },
} satisfies ChartConfig

export function RadarCard() {
  return (
    <Card>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] min-w-[300px]"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: -40,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
            <Radar dataKey="mobile" fill="var(--color-mobile)" />
            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
