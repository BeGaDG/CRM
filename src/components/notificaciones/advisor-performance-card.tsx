'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type AdvisorData = {
    name: string;
    sales: number;
    goal: number;
    avatar: string;
};

type AdvisorPerformanceCardProps = {
    title: string;
    description: string;
    data: AdvisorData[];
};

export const AdvisorPerformanceCard = ({ title, description, data }: AdvisorPerformanceCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {data.map((advisor) => {
                    const percentage = Math.round((advisor.sales / advisor.goal) * 100);
                    const progressColor = percentage >= 100 ? 'bg-primary' : 'bg-orange-400';
                    return (
                        <div key={advisor.name} className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={advisor.avatar} alt={advisor.name} />
                                    <AvatarFallback>{advisor.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{advisor.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        ${advisor.sales}M de ${advisor.goal}M
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className={cn("font-bold text-sm", percentage >= 100 ? "text-primary" : "text-foreground")}>
                                        {percentage}%
                                    </p>
                                </div>
                            </div>
                            <Progress value={percentage > 100 ? 100 : percentage} indicatorClassName={progressColor} />
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};
