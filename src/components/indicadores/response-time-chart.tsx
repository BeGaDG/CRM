'use client';
import { Card, CardContent } from '@/components/ui/card';
import { responseTimeDataSede } from '@/lib/data/indicadores-data';
import { Gauge } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Rápido', value: responseTimeDataSede.breakdown.fast },
    { name: 'Normal', value: responseTimeDataSede.breakdown.normal },
    { name: 'Lento', value: responseTimeDataSede.breakdown.slow },
];
const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const GaugeChart = () => {
    const value = responseTimeDataSede.average;
    const target = responseTimeDataSede.target;
    const percentage = Math.min((value / target) * 100, 100);

    const chartData = [
        { name: 'value', value: percentage },
        { name: 'background', value: 100 - percentage }
    ];

    return (
        <div className="relative h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={[{ value: 100 }]}
                        dataKey="value"
                        cx="50%"
                        cy="90%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="70%"
                        outerRadius="100%"
                        fill="hsl(var(--muted))"
                        isAnimationActive={false}
                    />
                    <Pie
                        data={chartData}
                        dataKey="value"
                        cx="50%"
                        cy="90%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="70%"
                        outerRadius="100%"
                        fill="hsl(var(--primary))"
                        stroke="hsl(var(--card))"
                        strokeWidth={4}
                        cornerRadius={10}
                    >
                         <Cell key={`cell-0`} fill="hsl(var(--primary))" />
                         <Cell key={`cell-1`} fill="transparent" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
                <span className="text-4xl font-bold tracking-tighter">
                    {value}<span className="text-2xl text-muted-foreground">h</span>
                </span>
                <span className="text-sm text-muted-foreground">Promedio</span>
            </div>
        </div>
    );
};

export const ResponseTimeChart = () => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                             <div className='p-1.5 bg-muted rounded-md'>
                                <Gauge className="h-5 w-5 text-primary" />
                             </div>
                            <h3 className="text-lg font-semibold">Tiempo de Respuesta</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Promedio de la sede</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold">{responseTimeDataSede.target}h</p>
                        <p className="text-xs text-muted-foreground">Objetivo</p>
                    </div>
                </div>

                <GaugeChart />

                <div className="mt-4 space-y-2 text-sm">
                    {data.map((entry, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
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
