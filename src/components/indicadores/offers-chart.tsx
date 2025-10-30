'use client';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { offersData } from '@/lib/data/indicadores-data';
import { ChartConfig, ChartContainer } from '../ui/chart';

const chartConfig = {
  product: {
    label: 'Product Sales',
    color: 'hsl(var(--primary))',
  },
  subs: {
    label: 'Subscriptions',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function OffersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Ofertas presentadas vs. vencidas.</CardTitle>
        <CardDescription className="text-2xl font-bold">${offersData.total.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[120px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={offersData.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
              <YAxis hide={true} />
              <Bar dataKey="product" fill="var(--color-product)" radius={4} />
              <Bar dataKey="subs" fill="var(--color-subs)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
         <div className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>Product sales</span>
                </div>
                <span className="font-semibold">${offersData.productSales.toLocaleString()}</span>
            </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-subs)]" />
                    <span>Subscriptions</span>
                </div>
                <span className="font-semibold">${offersData.subscriptions.toLocaleString()}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
