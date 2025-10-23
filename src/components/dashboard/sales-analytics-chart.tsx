
"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
  { name: 'Jul', sales: 7000 },
  { name: 'Aug', sales: 6500 },
  { name: 'Sep', sales: 7500 },
  { name: 'Oct', sales: 7100 },
  { name: 'Nov', sales: 8200 },
  { name: 'Dec', sales: 9000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border shadow-lg rounded-lg p-3 text-sm">
        <p className="font-bold text-lg text-primary">${payload[0].value.toLocaleString()}</p>
        <p className="text-muted-foreground">{label}</p>
      </div>
    );
  }
  return null;
};

export function SalesAnalyticsChart() {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="font-headline text-lg">Análisis de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart 
                          data={salesData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis 
                              dataKey="name" 
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
                              tickFormatter={(value) => `$${value/1000}k`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}/>
                            <Area 
                              type="monotone" 
                              dataKey="sales" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                              fillOpacity={1} 
                              fill="url(#colorSales)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
