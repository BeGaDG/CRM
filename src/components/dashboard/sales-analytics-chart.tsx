
"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const contractData = [
  { month: 'Ene', value: 25000000 },
  { month: 'Feb', value: 45000000 },
  { month: 'Mar', value: 80000000 },
  { month: 'Abr', value: 65000000 },
  { month: 'May', value: 110000000 },
  { month: 'Jun', value: 150000000 },
  { month: 'Jul', value: 135000000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border shadow-lg rounded-lg p-3 text-sm">
        <p className="font-bold text-lg text-primary">${payload[0].value.toLocaleString('es-CO')}</p>
        <p className="text-muted-foreground">Ingresos en {label}</p>
      </div>
    );
  }
  return null;
};

export function SalesAnalyticsChart() {
    return (
        <Card className="shadow-sm w-full flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline text-lg">Ingresos por Contratos Cerrados</CardTitle>
                <CardDescription>Evolución de los ingresos generados por nuevos contratos en los últimos 6 meses.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                        data={contractData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                        <XAxis 
                            dataKey="month" 
                            stroke="hsl(var(--muted-foreground))" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                        />
                        <YAxis 
                            stroke="hsl(var(--muted-foreground))" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                            tickFormatter={(value: number) => `$${value/1000000}M`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}/>
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorSales)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

    

    