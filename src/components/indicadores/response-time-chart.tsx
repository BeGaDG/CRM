'use client';
import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { responseTimeDataSede } from '@/lib/data/indicadores-data';

export const ResponseTimeChart = () => {
    const chartData = [
        { name: 'Tiempo de Respuesta', value: responseTimeDataSede.average, fill: 'hsl(var(--primary))' },
    ];
    const maxTime = 8; // Max value for the gauge (e.g., 8 hours)
    const endAngle = 90 - (chartData[0].value / maxTime) * 360;


    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Tiempo de Respuesta Promedio</CardTitle>
                <CardDescription>Promedio de horas para el primer contacto en la sede.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={{ value: { label: 'Horas' } }}
                    className="mx-auto aspect-square h-full max-h-[250px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                         <RadialBarChart
                            startAngle={90}
                            endAngle={endAngle}
                            innerRadius="70%"
                            outerRadius="100%"
                            barSize={20}
                            data={chartData}
                        >
                            <PolarAngleAxis type="number" domain={[0, maxTime]} angleAxisId={0} tick={false} />
                            <RadialBar
                                background={{ fill: 'hsl(var(--muted))' }}
                                dataKey="value"
                                cornerRadius={10}
                            />
                            <g>
                                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-4xl font-bold">
                                    {chartData[0].value.toFixed(1)}h
                                </text>
                                <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-sm">
                                    Promedio
                                </text>
                            </g>
                        </RadialBarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
