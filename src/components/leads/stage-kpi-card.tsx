
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

export const StageKpiCard = ({ title, count, icon: Icon, color }: StageKpiCardProps) => {
    return (
        <Card className='shadow-sm hover:shadow-md transition-shadow relative overflow-hidden'>
            <div className={cn("absolute top-0 left-0 right-0 h-1.5", color)}></div>
            <CardContent className="p-4 pt-6">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <Icon className={cn("h-5 w-5", color.replace('bg-', 'text-'))} />
                </div>
                <p className="text-3xl font-bold mt-1">{count}</p>
            </CardContent>
        </Card>
    );
};
