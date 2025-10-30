'use client';
import * as React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { responseTimeData } from "@/lib/data/indicadores-data";
import { TrendingUp } from 'lucide-react';

const GaugePointer = ({ value, max, cx, cy, innerRadius, outerRadius, startAngle, endAngle }: any) => {
  const angle = startAngle + (value / max) * (endAngle - startAngle);
  
  const target = {
    x: cx + outerRadius * Math.sin(angle * (Math.PI / 180)),
    y: cy - outerRadius * Math.cos(angle * (Math.PI / 180)),
  };
  
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="hsl(var(--primary))" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="hsl(var(--primary))"
        strokeWidth={2}
      />
    </g>
  );
};

export function ResponseTimeChart() {
    const { value, max } = responseTimeData;
    const data = [
        { name: 'value', value: value, color: 'hsl(var(--primary))' },
        { name: 'remaining', value: max - value, color: 'hsl(var(--border))' },
    ];

    return (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Tiempo de Respuesta Promedio</CardTitle>
            <CardDescription>Respuesta a nuevos leads</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center relative">
            <PieChart width={250} height={180}>
               <Pie
                    data={[{value: 1}]}
                    dataKey="value"
                    cx="50%"
                    cy="100%"
                    startAngle={-90}
                    endAngle={90}
                    innerRadius="60%"
                    outerRadius="100%"
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--card))"
                    isAnimationActive={false}
                />
                <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="100%"
                    startAngle={-90}
                    endAngle={90}
                    innerRadius="60%"
                    outerRadius="100%"
                    paddingAngle={0}
                    isAnimationActive={true}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                    ))}
                </Pie>
                <GaugePointer 
                    value={value} 
                    max={max} 
                    cx={125} 
                    cy={180} 
                    innerRadius={0} 
                    outerRadius={75}
                    startAngle={-90} 
                    endAngle={90}
                />
            </PieChart>
             <div className="absolute bottom-10 text-center">
                <p className="text-4xl font-bold">{value}h</p>
                <p className="text-sm text-muted-foreground">Promedio</p>
             </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none text-green-500">
                <TrendingUp className="h-4 w-4" /> 12% mejor este mes
            </div>
            <div className="leading-none text-muted-foreground">
              Más rápido que el objetivo
            </div>
          </CardFooter>
        </Card>
    )
}
