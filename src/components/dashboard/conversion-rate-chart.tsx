"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const conversionData = [
  { name: 'Ene', conversion: 18 },
  { name: 'Feb', conversion: 22 },
  { name: 'Mar', conversion: 25 },
  { name: 'Abr', conversion: 23 },
  { name: 'May', conversion: 28 },
  { name: 'Jun', conversion: 32 },
];

export function ConversionRateChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Tasa de Conversión</CardTitle>
                <CardDescription>Global, últimos 6 meses.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={conversionData} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="conversion" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
