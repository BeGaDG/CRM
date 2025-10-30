
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  ChartContainer,
} from '@/components/ui/chart';
import { responseTimeData } from '@/lib/data/indicadores-data';
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import { Progress } from '@/components/ui/progress';

export function ResponseTimeChart() {
  const { currentTime, goal } = responseTimeData;
  const progress = (currentTime / goal) * 100;
  const chartData = [{ name: 'value', value: progress, fill: 'hsl(var(--primary))' }];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Tiempo promedio de respuesta</CardTitle>
        <CardDescription>Rendimiento en la atención a nuevos leads.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
         <div className="grid grid-cols-2 gap-4 items-center">
            <div className="h-[150px]">
                 <ChartContainer config={{}} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            data={chartData}
                            startAngle={90}
                            endAngle={-270}
                            innerRadius="75%"
                            outerRadius="100%"
                            barSize={12}
                        >
                            <PolarAngleAxis type="number" domain={[0, 100]} dataKey="value" tick={false} />
                            <RadialBar dataKey="value" background={{ fill: 'hsl(var(--muted))' }} cornerRadius={6} />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
                <p className="text-3xl font-bold">{currentTime}min</p>
                <p className="text-sm font-medium text-muted-foreground">Meta: &lt; {goal}min</p>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Respuesta rápida, ¡buen trabajo!</p>
            </div>
         </div>
      </CardContent>
    </Card>
  );
}
