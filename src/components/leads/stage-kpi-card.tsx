
'use client';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { Button } from '../ui/button';

type StageKpiCardProps = {
  count: number;
  icon: LucideIcon;
  color: string;
  isSelected: boolean;
  onClick: () => void;
};

export const StageKpiCard = ({ count, icon: Icon, color, isSelected, onClick }: StageKpiCardProps) => {
    const iconColor = color.replace('bg-', 'text-');
    const bgColor = color.replace('bg-', 'bg-') + '/10';
    
    return (
        <Button 
            variant={isSelected ? 'default' : 'outline'}
            className={cn(
                "w-20 h-20 flex flex-col justify-center items-center gap-1 transition-all duration-200 rounded-lg",
                 isSelected ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:bg-muted"
            )}
            onClick={onClick}
        >
            <div className={cn("h-8 w-8 flex-shrink-0 rounded-lg flex items-center justify-center", isSelected ? 'bg-primary-foreground/20' : bgColor)}>
              <Icon className={cn("h-5 w-5", isSelected ? 'text-primary-foreground' : iconColor)} />
            </div>
            <div className='text-center'>
              <p className="text-xl font-bold">{count}</p>
            </div>
        </Button>
    );
};
