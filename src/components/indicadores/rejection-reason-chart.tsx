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
    // A simple way to create a key from the name, e.g., "Falta de Interés" -> "FaltadeInterés"
    const key = reason.name.replace(/\s/g, '');
    acc[key] = { label: reason.name, color: reason.color };
    return acc;
  }, {} as any)
} satisfies ChartConfig;

export function RejectionReasonChart() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Estadísticas</CardTitle>
        <CardDescription className="text-base font-semibold">Motivo de rechazo</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col md:flex-row items-center justify-center gap-6 p-4">
        <ChartContainer config={chartConfig} className="w-full h-full max-w-[250px] md:max-w-none md:w-1/2 aspect-square">
          <PieChart>
            <Pie
              data={rejectionData.reasons}
              dataKey="value"
              nameKey="name"
              innerRadius="60%"
              outerRadius="80%"
              strokeWidth={2}
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
                <Cell key={entry.name} fill={`var(--color-${entry.name.replace(/\s/g, '')})`} className="stroke-background hover:opacity-80" />
              ))}
            </Pie>
             <g transform="translate(50%, 50%)">
                <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-3xl font-bold">
                    {rejectionData.totalRejections}
                </text>
                 <text x="0" y="20" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-sm">
                    Rechazos
                </text>
            </g>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-3 text-sm w-full max-w-[250px] md:w-1/2">
          {rejectionData.reasons.map(reason => (
            <div key={reason.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: `var(--color-${reason.name.replace(/\s/g, '')})` }} />
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
