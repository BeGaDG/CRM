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
  const progress = Math.min((time / goal) * 100, 100);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Tiempo promedio de respuesta</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center gap-4">
        <div className="space-y-2 text-center">
            <p className="text-5xl font-bold">{time}min</p>
            <p className="text-sm text-muted-foreground">Meta: &lt; {goal}min</p>
        </div>
        <div>
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground mt-2 text-center">
              Respuesta rápida, ¡buen trabajo!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
