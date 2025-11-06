
'use client';
import { Card, CardContent } from '@/components/ui/card';
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
    return (
        <Card className='shadow-sm hover:shadow-md transition-shadow'>
            <CardContent className="p-4 flex items-center gap-4">
                <div className={cn("h-12 w-12 flex-shrink-0 rounded-lg flex items-center justify-center", color + '/10')}>
                    <Icon className={cn("h-6 w-6", color.replace('bg-', 'text-'))} />
                </div>
                <div className='flex-1'>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{count}</p>
                </div>
            </CardContent>
        </Card>
    );
};
