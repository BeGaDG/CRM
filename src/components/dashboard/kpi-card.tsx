'use client';

import * as React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KpiCardProps = {
    title: string;
    value: string;
    icon: React.ReactElement;
    color: string;
}

export function KpiCard({ title, value, icon, color }: KpiCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 flex items-center gap-4">
        <div className={cn("w-1.5 h-12 rounded-full", color)}></div>
        <div className={cn("h-12 w-12 flex-shrink-0 rounded-lg flex items-center justify-center", color.replace('bg-', 'bg-') + '/10')}>
          {React.cloneElement(icon, { className: icon.props.className.replace('text-muted-foreground', '') })}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
