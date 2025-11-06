'use client';
import { Card, CardContent } from '@/components/ui/card';
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
    const chartColor = `hsl(var(--${color.replace('bg-', '')}))`;

    return (
        <Card className='shadow-sm hover:shadow-md transition-shadow'>
            <CardContent className="p-4 flex justify-between items-center">
                <div className='flex items-center gap-4'>
                    <div className={cn("h-12 w-12 flex-shrink-0 rounded-lg flex items-center justify-center", color + '/10')}>
                        <Icon className={cn("h-6 w-6", color.replace('bg-', 'text-'))} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-2xl font-bold">{count}</p>
                    </div>
                </div>
                <div className="w-20 text-right">
                    <p className="font-semibold text-sm">{percentage.toFixed(0)}%</p>
                    <Progress value={percentage} indicatorClassName={color} className='h-1.5 mt-1' />
                </div>
            </CardContent>
        </Card>
    );
};
