'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { responseTimeDataSede } from '@/lib/data/indicadores-data';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

export const ResponseTimeChart = () => {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const averageTime = responseTimeDataSede.average;
    
    // Calculate the total grid columns needed. Each day is a column.
    const gridCols = days.length;

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-start'>
                    <div>
                        <CardTitle>Tiempo de Respuesta Promedio</CardTitle>
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
                    <span className="text-3xl font-bold">{averageTime}h</span>
                    <span className="text-muted-foreground"> / promedio</span>
                 </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className={`grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground`}>
                        {days.map(day => <div key={day}>{day}</div>)}
                    </div>

                    <div className="relative space-y-2">
                        {responseTimeDataSede.activities.map((activity) => (
                            <div key={activity.name} className="relative h-6 w-full rounded-full bg-muted">
                                <div
                                    className={cn("absolute h-6 rounded-full", activity.color)}
                                    style={{
                                        left: `${(activity.start / gridCols) * 100}%`,
                                        width: `${(activity.span / gridCols) * 100}%`,
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
                        {responseTimeDataSede.activities.map(activity => (
                             <div key={activity.name} className="flex items-center gap-2">
                                <span className={cn("h-2 w-2 rounded-full", activity.color)}></span>
                                <span>{activity.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
