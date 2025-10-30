'use client';
import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { responseTimeDataSede } from '@/lib/data/indicadores-data';
import { ArrowDown } from 'lucide-react';

export const ResponseTimeChart = () => {
    const chartData = [
        { name: 'Tiempo de Respuesta', value: responseTimeDataSede.average, fill: 'hsl(var(--primary))' },
    ];
    const maxTime = 8; // Max value for the gauge (e.g., 8 hours)
    
    // We adjust the angle calculation so a lower response time is better (fills more of the gauge)
    const fillPercentage = Math.max(0, 1 - (chartData[0].value / maxTime));
    const endAngle = 90 + (fillPercentage * 360);

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-start'>
                    <div>
                        <CardTitle>Tiempo de Respuesta</CardTitle>
                        <CardDescription>Promedio de horas para el primer contacto.</CardDescription>
                    </div>
                     <div className="text-right">
                        <p className="text-sm font-semibold text-red-500 flex items-center">
                            <ArrowDown className="h-4 w-4 mr-1" />
                            {responseTimeDataSede.trend}%
                        </p>
                        <p className="text-xs text-muted-foreground">vs semana anterior</p>
                    </div>
                </div>
                 <div className='pt-2'>
                    <span className="text-3xl font-bold">{responseTimeDataSede.average}h</span>
                    <span className="text-muted-foreground"> / promedio</span>
                 </div>
            </CardHeader>
            <CardContent className="h-24 -mt-4">
                <ResponsiveContainer width="100%" height="100%">
                     <RadialBarChart
                        startAngle={90}
                        endAngle={endAngle}
                        innerRadius="80%"
                        outerRadius="100%"
                        barSize={10}
                        data={chartData}
                    >
                        <PolarAngleAxis type="number" domain={[0, maxTime]} angleAxisId={0} tick={false} />
                        <RadialBar
                            background={{ fill: 'hsl(var(--muted))' }}
                            dataKey="value"
                            cornerRadius={5}
                            isAnimationActive={false}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
