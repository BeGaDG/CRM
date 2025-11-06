
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import * as React from 'react';

type StageKpiCardProps = {
  title: string;
  count: number;
  total: number;
  icon: LucideIcon;
  color: string;
};

export const StageKpiCard = ({ title, count, icon: Icon, color }: StageKpiCardProps) => {
    const iconColor = color.replace('bg-', 'text-');
    const iconBgColor = color.replace('bg-', 'bg-') + '/10';
    
    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
                <div className={cn("w-1.5 h-12 rounded-full", color)}></div>
                 <div className={cn("h-12 w-12 flex-shrink-0 rounded-lg flex items-center justify-center", iconBgColor)}>
                    <Icon className={cn("h-6 w-6", iconColor)} />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{count}</p>
                </div>
            </CardContent>
        </Card>
    );
};
