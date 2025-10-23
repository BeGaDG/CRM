
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function LeadFunnelStats() {
    const funnelStages = [
        { name: 'Nuevos', count: 124, color: 'bg-sky-500' },
        { name: 'Por Cotizar', count: 48, color: 'bg-indigo-500' },
        { name: 'En Negociación', count: 21, color: 'bg-purple-500' },
        { name: 'Ganados', count: 8, color: 'bg-green-500' }
    ];

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="font-headline text-lg">Embudo de Leads</CardTitle>
                <CardDescription>Estado actual del pipeline de ventas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {funnelStages.map((stage) => (
                    <div key={stage.name}>
                        <div className="flex justify-between items-center mb-1 text-sm">
                            <span className="font-medium text-muted-foreground">{stage.name}</span>
                            <span className="font-bold">{stage.count} Leads</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full">
                            <div
                                className={`h-2 rounded-full ${stage.color}`}
                                style={{ width: `${(stage.count / funnelStages[0].count) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
