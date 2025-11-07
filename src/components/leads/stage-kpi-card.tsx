
'use client';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

type StageKpiCardProps = {
  title: string;
  count: number;
  icon: LucideIcon;
  color: string;
  isSelected: boolean;
  onClick: () => void;
};

export const StageKpiCard = ({ title, count, icon: Icon, color, isSelected, onClick }: StageKpiCardProps) => {
    const iconColor = color.replace('bg-', 'text-');
    const bgColor = color.replace('bg-', 'bg-') + '/10';
    
    return (
        <Card
            onClick={onClick}
            className={cn(
                "cursor-pointer basis-28 flex-1 flex flex-col justify-center items-center gap-2 p-2 transition-all duration-200 border-2",
                isSelected ? "border-primary bg-primary/5" : "bg-card hover:bg-muted"
            )}
        >
            <div className={cn("h-8 w-8 flex-shrink-0 rounded-lg flex items-center justify-center", bgColor)}>
              <Icon className={cn("h-5 w-5", iconColor)} />
            </div>
            <div className='text-center'>
              <p className="text-xl font-bold">{count}</p>
              <p className="text-xs text-center text-muted-foreground truncate w-full">{title}</p>
            </div>
        </Card>
    );
};
