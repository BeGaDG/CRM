'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowDown, ArrowUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type NotificationKpiCardProps = {
    title: string;
    value: string;
    unit?: string;
    trend?: number;
    trendText?: string;
    chartData?: { value: number; color: string }[];
    isTagCloud?: boolean;
};

export const NotificationKpiCard = ({ title, value, unit, trend, trendText, chartData, isTagCloud }: NotificationKpiCardProps) => {
    const TrendIcon = trend && trend > 0 ? ArrowUp : ArrowDown;
    const trendColor = trend && trend > 0 ? 'text-green-500' : 'text-red-500';

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
                {isTagCloud ? (
                    <div className="flex flex-wrap gap-2">
                        {value.split(', ').map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                ) : chartData ? (
                    <div className="flex items-center justify-between">
                         <div className="text-2xl font-bold">{value}</div>
                        <ResponsiveContainer width="40%" height={50}>
                            <PieChart>
                                <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={15} outerRadius={25} paddingAngle={2}>
                                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="text-3xl font-bold">{value} <span className="text-lg text-muted-foreground font-medium">{unit}</span></div>
                )}
                {trend != null && (
                    <p className={cn("text-xs mt-2", trendColor)}>
                        <TrendIcon className="inline h-3 w-3 mr-1" />
                        {Math.abs(trend)}% {trendText}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};