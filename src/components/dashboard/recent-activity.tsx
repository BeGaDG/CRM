'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Activity = {
    icon: React.ReactElement;
    bgColor: string;
    textColor: string;
    description: string;
    time: string;
}

export function RecentActivity({ activities }: { activities: Activity[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", activity.bgColor, activity.textColor)}>
                            {activity.icon}
                        </div>
                        <div className="flex-1 text-sm">
                            <p>{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
