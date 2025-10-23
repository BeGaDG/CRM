
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function InvoiceStats() {
    const totalInvoices = 1135;
    const paid = 234;
    const overdue = 514;
    const unpaid = 345;
    
    const paidPercent = (paid / totalInvoices) * 100;
    const overduePercent = (overdue / totalInvoices) * 100;
    const unpaidPercent = (unpaid / totalInvoices) * 100;

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="font-headline text-lg">Estadísticas de Facturas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="relative h-32 w-32 sm:h-40 sm:w-40 mx-auto flex items-center justify-center">
                    <svg className="absolute inset-0" viewBox="0 0 36 36">
                        <path
                            className="text-muted/20"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                        <path
                            className="text-blue-500"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={`${unpaidPercent}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                         <path
                            className="text-primary"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={`${overduePercent}, 100`}
                            strokeDashoffset={`-${unpaidPercent}`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                     <div className="text-center">
                        <p className="text-3xl font-bold">{totalInvoices}</p>
                        <p className="text-sm text-muted-foreground">Facturas</p>
                    </div>
                </div>

                <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <span className="h-2 w-2 rounded-full bg-green-500"></span>
                           <span>Pagado</span>
                        </div>
                        <span className="font-medium">{paid}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <span className="h-2 w-2 rounded-full bg-primary"></span>
                           <span>Vencido</span>
                        </div>
                        <span className="font-medium">{overdue}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                           <span>Sin Pagar</span>
                        </div>
                        <span className="font-medium">{unpaid}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
