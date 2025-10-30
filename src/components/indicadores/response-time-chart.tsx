'use client';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { responseTimeData } from '@/lib/data/indicadores-data';

export const ResponseTimeChart = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tiempo de Respuesta Promedio</CardTitle>
                <CardDescription>Tiempo promedio en horas para el primer contacto por asesor.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{ "Tiempo (hrs)": { label: 'Horas', color: 'hsl(var(--primary))' } }} className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={responseTimeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} tickSuffix="h" />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--muted))' }}
                                content={<ChartTooltipContent />}
                            />
                            <Bar dataKey="Tiempo (hrs)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
