'use client';
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';


const chartData = [
  { week: 'Semana 1', converted: 5, discarded: 2 },
  { week: 'Semana 2', converted: 7, discarded: 3 },
  { week: 'Semana 3', converted: 4, discarded: 1 },
  { week: 'Semana 4', converted: 9, discarded: 4 },
];

const chartConfig = {
  converted: {
    label: "Convertidos",
    color: "hsl(var(--primary))",
  },
  discarded: {
    label: "Descartados",
    color: "hsl(var(--destructive))",
  },
};


export const LineChartCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolución de Leads</CardTitle>
        <CardDescription>Leads convertidos vs. descartados en las últimas 4 semanas.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="converted" name="Convertidos" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="discarded" name="Descartados" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
            </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
