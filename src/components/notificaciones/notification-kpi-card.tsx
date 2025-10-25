'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowDown, ArrowUp, Clock, Tag, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type NotificationKpiCardProps = {
    title: string;
    value: string;
    unit?: string;
    trend?: number;
    trendText?: string;
    chartData?: { value: number; color: string }[];
    isTagCloud?: boolean;
    color?: string;
};

const iconMapping: { [key: string]: React.ReactElement } = {
    "Tiempo prom. de respuesta": <Clock className="h-6 w-6" />,
    "Ofertas Presentadas vs. Vencidas": <TrendingUp className="h-6 w-6" />,
    "Tiempo prom. de conversión": <TrendingDown className="h-6 w-6" />,
    "Top Motivos de Rechazo": <Tag className="h-6 w-6" />,
}

export const NotificationKpiCard = ({ title, value, unit, trend, trendText, chartData, isTagCloud, color }: NotificationKpiCardProps) => {
    const TrendIcon = trend && trend > 0 ? ArrowUp : ArrowDown;
    const trendColor = trend && trend > 0 ? 'text-green-500' : 'text-red-500';
    const Icon = iconMapping[title] || <Clock className="h-6 w-6" />;

    return (
        <Card className={cn("border-l-4 shadow-sm", color)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                 <div className="text-muted-foreground">{Icon}</div>
            </CardHeader>
            <CardContent>
                 {isTagCloud ? (
                    <div className="flex flex-wrap gap-1 pt-2">
                        {value.split(', ').map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                ) : chartData ? (
                    <div className="flex items-center justify-between">
                         <div className="text-2xl font-bold">{value}</div>
                        <ResponsiveContainer width="40%" height={40}>
                            <PieChart>
                                <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={12} outerRadius={20}>
                                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="text-3xl font-bold">{value} <span className="text-base text-muted-foreground font-medium">{unit}</span></div>
                )}
                {trend != null && (
                    <p className={cn("text-xs mt-1", trendColor)}>
                        <TrendIcon className="inline h-3 w-3 mr-1" />
                        {Math.abs(trend)}% {trendText}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};
