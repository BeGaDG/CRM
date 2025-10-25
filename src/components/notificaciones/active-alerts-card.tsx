'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const alerts = [
    { id: 1, text: "Asesor Juan Pérez no ha presentado ofertas este mes." },
    { id: 2, text: "La tasa de rechazo en Sincelejo aumentó un 20%." },
    { id: 3, text: "3 leads llevan más de 72h sin ser contactados." },
];

export const ActiveAlertsCard = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Alertas Activas</CardTitle>
                <Button variant="ghost" size="sm">Ver todo</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {alerts.map(alert => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-destructive-foreground">{alert.text}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};