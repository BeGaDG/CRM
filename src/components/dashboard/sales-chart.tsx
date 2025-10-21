"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Enero", sales: 186 },
  { month: "Febrero", sales: 305 },
  { month: "Marzo", sales: 237 },
  { month: "Abril", sales: 173 },
  { month: "Mayo", sales: 209 },
  { month: "Junio", sales: 214 },
];

const chartConfig = {
  sales: {
    label: "Ventas",
    color: "hsl(var(--primary))",
  },
} as const;

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Rendimiento de Ventas</CardTitle>
        <CardDescription>Últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <XAxis
              dataKey="month"
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
