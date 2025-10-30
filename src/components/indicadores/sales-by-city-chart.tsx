'use client';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { salesByCityData } from '@/lib/data/indicadores-data';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '../ui/chart';

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border shadow-lg rounded-lg p-3 text-sm">
        <p className="font-bold text-lg text-foreground">${payload[0].value.toLocaleString('es-CO')}</p>
        <p className="text-muted-foreground">Ventas en {label}</p>
      </div>
    );
  }
  return null;
};


export function SalesByCityChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-sm font-medium">Ventas por ciudad</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">$12.7k</span>
              <span className="text-xs text-green-500 font-medium">+1.3% vs el año anterior</span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-muted p-1">
            <Button variant="ghost" size="sm" className="h-7 text-xs">Diario</Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">Semanal</Button>
            <Button variant="secondary" size="sm" className="h-7 text-xs">Anual</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] w-full p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesByCityData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
            <YAxis tickFormatter={(value) => `${value / 1000}k`} tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))' }} />
            <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorSales)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
