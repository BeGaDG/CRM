'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '../ui/progress';
import { responseTimeData } from '@/lib/data/indicadores-data';

export function ResponseTimeChart() {
  const { time, goal } = responseTimeData;
  const progress = (time / goal) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Tiempo promedio de respuesta</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center gap-4">
        <div className="space-y-2">
            <p className="text-3xl font-bold">{time}min</p>
            <p className="text-sm text-muted-foreground">Meta: &lt; {goal}min</p>
        </div>
        <Progress value={progress} />
        <p className="text-xs text-muted-foreground mt-1">
            Respuesta rápida, ¡buen trabajo!
        </p>
      </CardContent>
    </Card>
  );
}
