import { LabelList, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { thing: "eat", time: 275, fill: "var(--color-eat)" },
    { thing: "sport", time: 200, fill: "var(--color-sport)" },
    { thing: "class", time: 187, fill: "var(--color-class)" },
    { thing: "sleep", time: 173, fill: "var(--color-sleep)" },
    { thing: "selfStudy", time: 90, fill: "var(--color-selfStudy)" },
    { thing: "other", time: 90, fill: "var(--color-other)" },
  ]
  
  const chartConfig: { [key: string]: { label: string; color: string } } = {
    eat: {
      label: "吃饭",
      color: "hsl(var(--chart-1))",
    },
    sport: {
      label: "运动",
      color: "hsl(var(--chart-2))",
    },
    class: {
      label: "上课",
      color: "hsl(var(--chart-3))",
    },
    selfStudy: {
      label: "自习",
      color: "hsl(var(--chart-4))",
    },
    sleep: {
      label: "睡觉",
      color: "hsl(var(--chart-5))",
    },
    other: {
      label: "其他",
      color: "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig
  
  export default function StudyCard() {
    return (
      <Card className="flex flex-col w-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>时间平衡规划图</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[200px]"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey="thing"
                    labelFormatter={(value: string) => chartConfig[value as keyof typeof chartConfig]?.label}
                  />
                }
              />
              <Pie data={chartData} dataKey="time" nameKey="thing">
                <LabelList
                  dataKey="thing"
                  position="inside"
                  fill="#000"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: string) => chartConfig[value as keyof typeof chartConfig]?.label}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  }