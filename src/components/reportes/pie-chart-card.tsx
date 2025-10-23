'use client';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { name: 'Montería', value: 45, fill: 'hsl(var(--chart-1))' },
  { name: 'Sincelejo', value: 28, fill: 'hsl(var(--chart-2))' },
  { name: 'Otros', value: 12, fill: 'hsl(var(--chart-3))' },
];

const chartConfig = {
  value: {
    label: "Contratos",
  },
  monteria: {
    label: "Montería",
    color: "hsl(var(--chart-1))",
  },
  sincelejo: {
    label: "Sincelejo",
    color: "hsl(var(--chart-2))",
  },
  otros: {
    label: "Otros",
    color: "hsl(var(--chart-3))",
  },
};


export const PieChartCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contratos por Sede</CardTitle>
        <CardDescription>Distribución de los contratos cerrados por cada sede.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Tooltip content={<ChartTooltipContent />} />
                <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={false}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (
                    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                        {`${(percent * 100).toFixed(0)}%`}
                    </text>
                    );
                }}
                >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                </Pie>
                <Legend />
            </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
