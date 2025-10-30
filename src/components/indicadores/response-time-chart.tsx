'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { responseTimeDataSede } from '@/lib/data/indicadores-data';
import { Gauge, ArrowUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Rápido', value: responseTimeDataSede.breakdown.fast },
    { name: 'Normal', value: responseTimeDataSede.breakdown.normal },
    { name: 'Lento', value: responseTimeDataSede.breakdown.slow },
];
const COLORS = ['#10B981', '#F59E0B', '#EF4444'];
const TOTAL_SEGMENTS = 50;


const GaugeChart = () => {
    const value = responseTimeDataSede.average;
    const performance = responseTimeDataSede.performancePercentage;

    const segments = Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
        const segmentValue = (i + 1) / TOTAL_SEGMENTS;
        const isActive = segmentValue <= performance / 100;
        return {
            value: 1,
            color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted))'
        };
    });

    return (
        <div className="relative h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={segments}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="70%"
                        outerRadius="95%"
                        paddingAngle={2}
                        dataKey="value"
                        stroke="hsl(var(--card))"
                        strokeWidth={2}
                    >
                        {segments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
                <span className="text-6xl font-bold tracking-tighter">
                    {value}<span className="text-4xl text-muted-foreground">h</span>
                </span>
                <span className="text-sm text-muted-foreground font-medium">Promedio</span>
            </div>
        </div>
    );
};

export const ResponseTimeChart = () => {
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row justify-between items-start pb-2">
                <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                         <div className='p-2 bg-muted rounded-lg'>
                            <Gauge className="h-5 w-5 text-primary" />
                         </div>
                        Tiempo de Respuesta
                    </h3>
                    <p className="text-sm text-muted-foreground">Promedio de la sede</p>
                </div>
                 <div className="text-right">
                    <p className="text-lg font-semibold text-green-500 flex items-center">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        {responseTimeDataSede.trend}%
                    </p>
                    <p className="text-xs text-muted-foreground">vs semana ant.</p>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center pt-4">
                <GaugeChart />

                <div className="w-full mt-4 space-y-2 text-sm">
                    {data.map((entry, index) => (
                        <div key={index} className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                <span>{entry.name}</span>
                            </div>
                            <span className="font-medium">{entry.value} leads</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
