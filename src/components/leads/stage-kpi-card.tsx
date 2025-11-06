
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import * as React from 'react';

type StageKpiCardProps = {
  title: string;
  count: number;
  icon: LucideIcon;
  color: string;
};

export const StageKpiCard = ({ title, count, icon: Icon, color }: StageKpiCardProps) => {
    const iconColor = color.replace('bg-', 'text-');
    
    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4", iconColor)} />
                    <p className="text-xs font-medium text-muted-foreground truncate">{title}</p>
                </div>
                <p className="text-lg font-bold">{count}</p>
            </CardContent>
        </Card>
    );
};

    