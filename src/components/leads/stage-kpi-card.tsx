
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

export const StageKpiCard = ({ title, count, total, icon: Icon, color }: StageKpiCardProps) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  
  const chartData = [
    { name: 'count', value: percentage },
    { name: 'rest', value: 100 - percentage },
  ];

  const chartColor = `hsl(var(--${color.replace('bg-', '')}))`;

  return (
    <Card className='h-full w-full overflow-hidden'>
      <CardContent className="p-3 flex flex-col items-center justify-center text-center h-full">
        <div className="relative h-24 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                dataKey="value"
                innerRadius="80%"
                outerRadius="100%"
                startAngle={90}
                endAngle={450}
                stroke="none"
              >
                 <Cell key="count" fill={chartColor} />
                 <Cell key="rest" fill="hsl(var(--muted))" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className={cn("h-8 w-8", color.replace('bg-', 'text-'))} />
          </div>
        </div>
        <p className="text-3xl font-bold mt-2">{count}</p>
        <p className="text-xs text-muted-foreground font-medium truncate">{title}</p>
      </CardContent>
    </Card>
  );
};
