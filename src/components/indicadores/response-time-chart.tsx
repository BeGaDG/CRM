'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { responseTimeData } from '@/lib/data/indicadores-data';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

const chartConfig = {
  value: {
    label: 'Tiempo de respuesta',
  },
  primary: {
    label: 'Primary',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function ResponseTimeChart() {
  const chartData = [{ name: 'value', value: responseTimeData.percentage, fill: 'hsl(var(--primary))' }];
  
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-medium">Tiempo promedio de respuesta a nuevos leads.</CardTitle>
        <CardDescription className="text-sm text-red-500 font-medium">Remaining ${responseTimeData.remaining.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={100}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              dataKey="value"
              tick={false}
            />
            <RadialBar
              dataKey="value"
              background
              cornerRadius={10}
            />
             <g transform="translate(125, 125)">
                <text x="0" y="-10" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-4xl font-bold">
                    {responseTimeData.percentage}%
                </text>
                <text x="0" y="20" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-sm">
                    Sales: ${responseTimeData.sales.toLocaleString()}
                </text>
            </g>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
