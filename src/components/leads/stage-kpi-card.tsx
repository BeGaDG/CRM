'use client';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type StageKpiCardProps = {
  title: string;
  count: number;
  total: number;
  icon: LucideIcon;
  color: string;
};

export const StageKpiCard = ({ title, count, icon: Icon, color }: StageKpiCardProps) => {

  const chartColor = `hsl(var(--${color.replace('bg-', '')}))`;

  return (
    <Card className='h-full w-full overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
      <CardContent className="p-3 flex items-center gap-3">
        <div className={cn("h-10 w-10 flex-shrink-0 rounded-lg flex items-center justify-center", color + '/10')}>
            <Icon className={cn("h-6 w-6", color.replace('bg-', 'text-'))} />
        </div>
        <div className='flex-1'>
            <p className="text-xl font-bold">{count}</p>
            <p className="text-xs text-muted-foreground font-medium truncate w-full">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};
