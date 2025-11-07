
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { Button } from '../ui/button';

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
        <Button 
            variant={isSelected ? 'default' : 'outline'}
            className={cn(
                "flex-shrink-0 w-40 h-28 flex flex-col justify-center items-center gap-2 transition-all duration-200",
                 isSelected ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:bg-muted"
            )}
            onClick={onClick}
        >
            <div className={cn("h-10 w-10 flex-shrink-0 rounded-lg flex items-center justify-center", isSelected ? 'bg-primary-foreground/20' : bgColor)}>
              <Icon className={cn("h-6 w-6", isSelected ? 'text-primary-foreground' : iconColor)} />
            </div>
            <div className='text-center'>
              <p className="text-xl font-bold">{count}</p>
            </div>
        </Button>
    );
};
