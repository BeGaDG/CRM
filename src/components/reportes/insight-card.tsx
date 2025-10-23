'use client';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, UserCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type InsightCardProps = {
  title: string;
  description: string;
  trend: 'positive' | 'negative' | 'neutral';
};

const trendIcons = {
    positive: <TrendingUp className="h-5 w-5 text-green-500" />,
    negative: <TrendingUp className="h-5 w-5 text-red-500 transform rotate-90" />,
    neutral: <Zap className="h-5 w-5 text-blue-500" />
};

export const InsightCard = ({ title, description, trend }: InsightCardProps) => {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="p-4 flex items-start gap-4">
        <div className="flex-shrink-0">
          {trendIcons[trend]}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
