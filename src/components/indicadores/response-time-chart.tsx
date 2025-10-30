'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { responseTimeDataSede } from '@/lib/data/indicadores-data';
import { Gauge, ArrowUp, Smile } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const GaugeChart = () => {
    const performance = responseTimeDataSede.performancePercentage / 100;
    const data = [
        { name: 'Performance', value: performance },
        { name: 'Remaining', value: 1 - performance }
    ];

    return (
        <div className="relative h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="hsl(var(--chart-2))" />
                        </linearGradient>
                    </defs>
                    {/* Background Arc */}
                    <Pie
                        data={[{ value: 1 }]}
                        dataKey="value"
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="70%"
                        outerRadius="85%"
                        fill="hsl(var(--muted))"
                        stroke="none"
                    />
                    {/* Data Arc */}
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="70%"
                        outerRadius="85%"
                        fill="url(#gradient)"
                        stroke="none"
                        cornerRadius={10}
                    >
                         <Cell fill="url(#gradient)" />
                         <Cell fill="transparent" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                <span className="text-6xl font-bold tracking-tighter">
                    {responseTimeDataSede.average}<span className="text-4xl text-muted-foreground">h</span>
                </span>
                <span className="text-sm text-muted-foreground font-medium">Promedio</span>
            </div>
             <div className="absolute bottom-[20%] left-[15%] text-xs text-muted-foreground">0h</div>
             <div className="absolute bottom-[20%] right-[15%] text-xs text-muted-foreground">8h+</div>
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

                <div className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
                    <Smile className="h-4 w-4" />
                    <span>{responseTimeDataSede.performanceText}</span>
                </div>
            </CardContent>
        </Card>
    );
};
