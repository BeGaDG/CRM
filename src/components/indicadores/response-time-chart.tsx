'use client';
import { RadialBar, RadialBarChart, ResponsiveContainer, PolarAngleAxis, Scatter } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { responseTimeData } from '@/lib/data/indicadores-data';
import { Separator } from '../ui/separator';

export function ResponseTimeChart() {
  const { time, goal } = responseTimeData;
  const percentage = (time / goal) * 100;
  const data = [{ name: 'time', value: percentage }];
  const angle = 180 - (percentage * 1.8); 

  return (
    <Card className='h-full flex flex-col'>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Tiempo promedio de respuesta a nuevos leads.</CardTitle>
      </CardHeader>
       <Separator />
      <CardContent className="flex-1 flex items-center justify-center p-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="85%"
            data={data}
            startAngle={180}
            endAngle={0}
            barSize={15}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background
              dataKey="value"
              cornerRadius={10}
              className='fill-primary'
            />
            <Scatter 
              data={[{ value: 0 }]} // Dummy data for the dot
              dataKey="value"
              angleAxisId={0}
              // @ts-ignore
              coordinate={{ angle: angle, radius: 0 }}
              fill="hsl(var(--primary))"
              shape={<circle r={10} />}
              isAnimationActive={false}
              z={5}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl font-bold">{time}</p>
            <p className="text-lg text-muted-foreground">Minutos</p>
        </div>
      </CardContent>
    </Card>
  );
}
