'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type StageKpiCardProps = {
  title: string;
  count: number;
  total: number;
  icon: LucideIcon;
  color: string;
};

export const StageKpiCard = ({ title, count, total, icon: Icon, color }: StageKpiCardProps) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4 text-muted-foreground", color.replace('bg-', 'text-'))} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          {percentage.toFixed(1)}% del total de leads
        </p>
        <Progress value={percentage} className="h-2 mt-2" indicatorClassName={color} />
      </CardContent>
    </Card>
  );
};
