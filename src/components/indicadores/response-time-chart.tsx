'use client';
import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
} from "@/components/ui/chart"
import { responseTimeData } from "@/lib/data/indicadores-data";

const chartConfig = {
  tiempo: {
    label: "Tiempo",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function ResponseTimeChart() {
  const chartData = [{ month: "january", tiempo: responseTimeData.value }]
  const totalValue = chartData[0].tiempo;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tiempo de Respuesta Promedio</CardTitle>
        <CardDescription>Respuesta a nuevos leads en las últimas 4 semanas</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={360 * (totalValue / responseTimeData.max) }
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue.toFixed(1)}h
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Promedio
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="tiempo"
              background
              cornerRadius={5}
              fill="var(--color-tiempo)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
            {responseTimeData.trend.direction === 'up' ? 
                <TrendingUp className="h-4 w-4 text-green-500" /> :
                <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
            }
            {responseTimeData.trend.value}% este mes
        </div>
        <div className="leading-none text-muted-foreground">
          {responseTimeData.trend.label}
        </div>
      </CardFooter>
    </Card>
  )
}
