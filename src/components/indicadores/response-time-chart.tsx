'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ChartContainer,
} from '@/components/ui/chart';
import { responseTimeData } from '@/lib/data/indicadores-data';
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Scatter, ScatterChart } from 'recharts';

export function ResponseTimeChart() {
  const { currentTime, goal } = responseTimeData;
  const progress = (currentTime / goal) * 100;
  const chartData = [{ name: 'value', value: progress, fill: 'hsl(var(--primary))' }];
  
  const endAngle = -270;
  const startAngle = 90;
  const chartAngle = startAngle - ((startAngle - endAngle) * (progress / 100));
  
  const thumbX = 125 + 90 * Math.cos(-chartAngle * Math.PI / 180);
  const thumbY = 125 + 90 * Math.sin(-chartAngle * Math.PI / 180);
  
  const thumbData = [{ x: thumbX, y: thumbY }];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-medium">Tiempo promedio de respuesta a nuevos leads.</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex items-center justify-center p-6 relative h-[250px]">
        <ChartContainer
          config={{}}
          className="absolute inset-0 w-full h-full"
        >
          <RadialBarChart
            data={chartData}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={80}
            outerRadius={100}
            barSize={20}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              dataKey="value"
              tick={false}
            />
            <RadialBar
              dataKey="value"
              background={{ fill: 'hsl(var(--muted))' }}
              cornerRadius={10}
            />
          </RadialBarChart>
           <ScatterChart
              width={250}
              height={250}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <Scatter data={thumbData} fill="hsl(var(--primary))" shape={<circle r={10} />} />
               <Scatter data={thumbData} fill="white" shape={<circle r={6} />} />
            </ScatterChart>
        </ChartContainer>
         <div className="absolute flex flex-col items-center justify-center">
            <p className="text-6xl font-bold text-foreground">{currentTime}</p>
            <p className="text-lg text-muted-foreground -mt-2">Minutos</p>
        </div>
      </CardContent>
    </Card>
  );
}
