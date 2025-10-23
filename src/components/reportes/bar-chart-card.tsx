'use client';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { name: 'Nuevo', value: 120 },
  { name: 'Contactado', value: 98 },
  { name: 'Visitado', value: 75 },
  { name: 'Cotizado', value: 45 },
  { name: 'Contratado', value: 21 },
];

export const BarChartCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads por Etapa</CardTitle>
        <CardDescription>Número de leads en cada etapa del embudo de ventas.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ value: { label: 'Leads', color: 'hsl(var(--primary))' } }} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent />}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
