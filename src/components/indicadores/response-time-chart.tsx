'use client';
import * as React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from '@/components/ui/separator';
import { responseTimeData } from "@/lib/data/indicadores-data";

const GaugePointer = ({ cx, cy, angle, outerRadius }: { cx: number, cy: number, angle: number, outerRadius: number }) => {
  const target = {
    x: cx + (outerRadius - 5) * Math.sin(angle * (Math.PI / 180)),
    y: cy - (outerRadius - 5) * Math.cos(angle * (Math.PI / 180)),
  };

  const tailLength = 10;
  const tail = {
     x: cx + (outerRadius - tailLength) * Math.sin(angle * (Math.PI / 180)),
     y: cy - (outerRadius - tailLength) * Math.cos(angle * (Math.PI / 180)),
  }

  return (
    <g>
        <path d={`M ${tail.x} ${tail.y} L ${target.x} ${target.y}`} stroke="white" strokeWidth={5} strokeLinecap='round' />
        <circle cx={target.x} cy={target.y} r={10} fill="white" />
        <circle cx={target.x} cy={target.y} r={5} fill="hsl(var(--primary))" />
    </g>
  );
};


export function ResponseTimeChart() {
    const { value, min, max, segments } = responseTimeData;
    const totalAngle = 240;
    const startAngle = -210;
    
    const valuePercentage = (value - min) / (max - min);
    const valueAngle = startAngle + (valuePercentage * totalAngle);

    const chartData = segments.map(segment => ({
      ...segment,
      value: (segment.max - segment.min) / (max - min) * 100,
    }));

    return (
        <Card className="flex flex-col shadow-lg border-2 border-muted/50 rounded-2xl w-full max-w-sm mx-auto">
          <CardHeader className="pb-2">
            <CardDescription>Estadísticas</CardDescription>
            <CardTitle className="text-2xl">Tiempo de Respuesta</CardTitle>
          </CardHeader>
          <Separator className="mx-6 w-auto" />
          <CardContent className="flex-1 flex flex-col items-center justify-center relative p-6">
            
            <div className="relative w-[280px] h-[180px]">
                <PieChart width={280} height={280} >
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        startAngle={startAngle}
                        endAngle={startAngle + totalAngle}
                        innerRadius="75%"
                        outerRadius="90%"
                        dataKey="value"
                        stroke="none"
                        cornerRadius={10}
                        isAnimationActive={false}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>

                <div className='absolute inset-0' style={{ transformOrigin: 'center 140px' }}>
                     <GaugePointer cx={140} cy={140} angle={valueAngle} outerRadius={126} />
                </div>

            </div>
            
            <div className='text-center -mt-8'>
                <p className="text-7xl font-bold text-foreground">
                    {value}<span className='text-5xl text-muted-foreground'>h</span>
                </p>
                <p className="font-semibold text-foreground mt-2">es el tiempo de respuesta</p>
                <p className="text-sm text-muted-foreground">Actualizado hoy</p>
            </div>
            
          </CardContent>
        </Card>
    )
}
