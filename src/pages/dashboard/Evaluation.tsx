import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, Download, Eye, FileText, TrendingUp } from "lucide-react"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts"

// 学习维度数据
const learningDimensionsData = [
  { dimension: "学习基础", value: 75, average: 65 },
  { dimension: "学习兴趣", value: 85, average: 70 },
  { dimension: "学习方式", value: 65, average: 60 },
  { dimension: "学习风格", value: 80, average: 75 },
  { dimension: "学习习惯", value: 70, average: 65 },
  { dimension: "学习进度", value: 90, average: 80 },
  { dimension: "学习能效", value: 85, average: 75 },
];

// 学习趋势数据
const learningTrendData = [
  { month: "1月", 学习基础: 65, 学习兴趣: 70, 学习方式: 55, 学习风格: 70, 学习习惯: 60, 学习进度: 75, 学习能效: 70 },
  { month: "2月", 学习基础: 68, 学习兴趣: 72, 学习方式: 58, 学习风格: 72, 学习习惯: 62, 学习进度: 78, 学习能效: 72 },
  { month: "3月", 学习基础: 70, 学习兴趣: 75, 学习方式: 60, 学习风格: 75, 学习习惯: 65, 学习进度: 80, 学习能效: 75 },
  { month: "4月", 学习基础: 72, 学习兴趣: 78, 学习方式: 62, 学习风格: 77, 学习习惯: 67, 学习进度: 83, 学习能效: 78 },
  { month: "5月", 学习基础: 75, 学习兴趣: 85, 学习方式: 65, 学习风格: 80, 学习习惯: 70, 学习进度: 90, 学习能效: 85 },
];

// 学习维度配置
const dimensionsConfig = {
  value: {
    label: "个人水平",
    color: "hsl(173 58% 39%)",
  },
  average: {
    label: "班级平均",
    color: "hsl(12 76% 61%)",
  },
} satisfies ChartConfig;

// 学习趋势配置
const trendConfig = {
  学习基础: {
    label: "学习基础",
    color: "#8884d8",
  },
  学习兴趣: {
    label: "学习兴趣",
    color: "#82ca9d",
  },
  学习方式: {
    label: "学习方式",
    color: "#ffc658",
  },
  学习风格: {
    label: "学习风格",
    color: "#ff8042",
  },
  学习习惯: {
    label: "学习习惯",
    color: "#0088fe",
  },
  学习进度: {
    label: "学习进度",
    color: "#00c49f",
  },
  学习能效: {
    label: "学习能效",
    color: "#ffbb28",
  },
} satisfies ChartConfig;

// 日期选择器组件
export function DatePickerWithRange({
  className,
  onDateChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  onDateChange?: (date: DateRange | undefined) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: new Date(),
  });
 
  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy年MM月dd日")} - {" "}
                  {format(date.to, "yyyy年MM月dd日")}
                </>
              ) : (
                format(date.from, "yyyy年MM月dd日")
              )
            ) : (
              <span>选择日期范围</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// 雷达图组件
function LearningRadarChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>学习维度雷达图</CardTitle>
        <CardDescription>展示各个学习维度的表现情况</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={dimensionsConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <RadarChart
            data={learningDimensionsData}
            margin={{
              top: 10,
              right: 30,
              left: 30,
              bottom: 10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="dimension" />
            <PolarGrid />
            <Radar
              name="个人水平"
              dataKey="value"
              fill="var(--color-value)"
              fillOpacity={0.6}
              stroke="var(--color-value)"
            />
            <Radar
              name="班级平均"
              dataKey="average"
              fill="var(--color-average)"
              fillOpacity={0.4}
              stroke="var(--color-average)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// 折线图组件
function LearningLineChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>学习趋势折线图</CardTitle>
        <CardDescription>展示学习维度随时间的变化趋势</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={trendConfig} className="h-[350px]">
          <LineChart
            data={learningTrendData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="学习基础"
              stroke="var(--color-学习基础)"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="学习兴趣"
              stroke="var(--color-学习兴趣)"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="学习方式"
              stroke="var(--color-学习方式)"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="学习风格"
              stroke="var(--color-学习风格)"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="学习习惯"
              stroke="var(--color-学习习惯)"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="学习进度"
              stroke="var(--color-学习进度)"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="学习能效"
              stroke="var(--color-学习能效)"
              activeDot={{ r: 8 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// 柱状图组件
function LearningBarChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>学习维度柱状图</CardTitle>
        <CardDescription>展示各个学习维度的对比情况</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={dimensionsConfig} className="h-[350px]">
          <BarChart
            data={learningDimensionsData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 70,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="dimension" 
              angle={-45} 
              textAnchor="end"
              height={70}
            />
            <YAxis domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="value" 
              fill="var(--color-value)" 
              name="个人水平"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="average" 
              fill="var(--color-average)" 
              name="班级平均"
              radius={[4, 4, 0, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// 学习趋势面积图
function LearningTrendChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>学习趋势面积图</CardTitle>
        <CardDescription>展示学习整体进步趋势</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={trendConfig} className="h-[350px]">
          <AreaChart
            data={learningTrendData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="学习基础"
              stackId="1"
              stroke="var(--color-学习基础)"
              fill="var(--color-学习基础)"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="学习兴趣"
              stackId="2"
              stroke="var(--color-学习兴趣)"
              fill="var(--color-学习兴趣)"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="学习方式"
              stackId="3"
              stroke="var(--color-学习方式)"
              fill="var(--color-学习方式)"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="学习风格"
              stackId="4"
              stroke="var(--color-学习风格)"
              fill="var(--color-学习风格)"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="学习习惯"
              stackId="5"
              stroke="var(--color-学习习惯)"
              fill="var(--color-学习习惯)"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="学习进度"
              stackId="6"
              stroke="var(--color-学习进度)"
              fill="var(--color-学习进度)"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="学习能效"
              stackId="7"
              stroke="var(--color-学习能效)"
              fill="var(--color-学习能效)"
              fillOpacity={0.3}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          本月学习效率提升 5.2% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          展示过去5个月的学习趋势数据
        </div>
      </CardFooter>
    </Card>
  );
}

// 主评价组件
export const Evaluation = () => {
  const [activeTab, setActiveTab] = React.useState("radar");
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: new Date(),
  });

  const handleDateChange = (date: DateRange | undefined) => {
    setDateRange(date);
    // 在实际应用中，这里可以根据日期范围重新获取数据
    console.log("Date range changed:", date);
  };

  const handleGenerateReport = () => {
    // 在实际应用中，这里可以生成报告
    console.log("Generating report for date range:", dateRange);
    alert("报告生成中，请稍候...");
  };

  const handlePreviewReport = () => {
    // 在实际应用中，这里可以预览报告
    console.log("Previewing report for date range:", dateRange);
    alert("报告预览功能即将上线，敬请期待！");
  };

  const handleDownloadReport = () => {
    // 在实际应用中，这里可以下载报告
    console.log("Downloading report for date range:", dateRange);
    alert("报告下载中，请稍候...");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">学情评价</h1>
          <DatePickerWithRange onDateChange={handleDateChange} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="radar">雷达图</TabsTrigger>
            <TabsTrigger value="line">折线图</TabsTrigger>
            <TabsTrigger value="bar">柱状图</TabsTrigger>
            <TabsTrigger value="trend">学习趋势图</TabsTrigger>
          </TabsList>
          <TabsContent value="radar">
            <LearningRadarChart />
          </TabsContent>
          <TabsContent value="line">
            <LearningLineChart />
          </TabsContent>
          <TabsContent value="bar">
            <LearningBarChart />
          </TabsContent>
          <TabsContent value="trend">
            <LearningTrendChart />
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>阶段报告生成</CardTitle>
            <CardDescription>
              根据所选时间范围生成学习评价报告
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleGenerateReport}>
                <FileText className="mr-2 h-4 w-4" />
                生成报告
              </Button>
              <Button variant="outline" onClick={handlePreviewReport}>
                <Eye className="mr-2 h-4 w-4" />
                预览报告
              </Button>
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download className="mr-2 h-4 w-4" />
                下载报告
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            报告包含学习基础、学习兴趣、学习方式、学习风格、学习习惯、学习进度和学习能效等维度的详细分析
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};