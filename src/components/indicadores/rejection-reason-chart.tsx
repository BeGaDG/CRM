'use client';
import { Pie, PieChart, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { rejectionData } from '@/lib/data/indicadores-data';

const chartConfig = {
  reasons: {
    label: 'Reasons',
  },
  ...rejectionData.reasons.reduce((acc, reason) => {
    acc[reason.name.replace(/ /g, '')] = { label: reason.name, color: reason.color };
    return acc;
  }, {} as any)
} satisfies ChartConfig;

export function RejectionReasonChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Estadísticas</CardTitle>
        <CardDescription className="text-base font-semibold">Motivo de rechazo</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[250px]">
          <PieChart>
            <Pie
              data={rejectionData.reasons}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={5}
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + (outerRadius + 15) * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + (outerRadius + 15) * Math.sin(-midAngle * (Math.PI / 180));
                
                return (
                  <text
                    x={x}
                    y={y}
                    fill="hsl(var(--foreground))"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    className="text-xs font-medium"
                  >
                   {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {rejectionData.reasons.map((entry) => (
                <Cell key={entry.name} fill={entry.color} className="stroke-background hover:opacity-80" />
              ))}
            </Pie>
             <g transform="translate(125, 125)">
                <text x="0" y="5" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-2xl font-bold">
                    {rejectionData.totalRejections}
                </text>
            </g>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2 text-sm w-full max-w-[250px]">
          {rejectionData.reasons.map(reason => (
            <div key={reason.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: reason.color }} />
                <span>{reason.name}</span>
              </div>
              <span className="font-semibold">{reason.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
