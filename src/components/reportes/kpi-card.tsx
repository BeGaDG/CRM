'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type KpiCardProps = {
  title: string;
  value: string;
  variationPercent: number;
  comparisonText: string;
  loading?: boolean;
};

export const KpiCard = ({ title, value, variationPercent, comparisonText, loading }: KpiCardProps) => {
  const TrendIcon = variationPercent > 0 ? ArrowUp : variationPercent < 0 ? ArrowDown : Minus;
  const trendColor = variationPercent > 0 ? 'text-green-500' : variationPercent < 0 ? 'text-red-500' : 'text-muted-foreground';

  if (loading) {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-4 w-40" />
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn("text-xs", trendColor)}>
            <TrendIcon className="inline h-3 w-3 mr-1" />
            {Math.abs(variationPercent)}% {comparisonText}
        </p>
      </CardContent>
    </Card>
  );
};
