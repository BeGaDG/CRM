'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Activity } from "@/lib/data/leads-data";
import { History } from "lucide-react";

export const ActivityHistory = ({ activities }: { activities: Activity[] }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Historial de Actividad
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {activities.length > 0 ? (
                    <div className="relative pl-6">
                        <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-4 mb-6 last:mb-0">
                                <div className="absolute left-0 h-6 w-6 bg-background border-2 border-primary rounded-full flex items-center justify-center -translate-x-1/2 ml-3">
                                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                                </div>
                                <div className="flex-1 text-sm pt-1">
                                    <p className="text-foreground">{activity.description}</p>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        <span>{activity.user}</span> &bull; <span>{formatDistanceToNow(new Date(activity.date), { addSuffix: true, locale: es })}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center text-xs p-4 bg-muted/50 rounded-lg border">
                        No hay actividades registradas.
                    </p>
                )}
            </CardContent>
        </Card>
    );
};
