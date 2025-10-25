
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { NotificationKpiCard } from '@/components/notificaciones/notification-kpi-card';
import { PerformanceChartCard } from '@/components/notificaciones/performance-chart-card';
import { ComplianceDonutCard } from '@/components/notificaciones/compliance-donut-card';
import { ActiveAlertsCard } from '@/components/notificaciones/active-alerts-card';
import { AdvisorPerformanceCard } from '@/components/notificaciones/advisor-performance-card';
import { FilterBar } from '@/components/notificaciones/filter-bar';


const kpis = [
    { title: "Tiempo prom. de respuesta", value: "45", unit: "minutos", trend: -10, trendText: "vs mes anterior", color: "border-blue-500" },
    { title: "Ofertas Presentadas vs. Vencidas", value: "82 / 18", chartData: [{value: 82, color: '#22C55E'}, {value: 18, color: '#EF4444'}], color: "border-green-500" },
    { title: "Tiempo prom. de conversión", value: "21", unit: "días", trend: 5, trendText: "vs mes anterior", color: "border-yellow-500" },
    { title: "Top Motivos de Rechazo", value: "Precio, Tiempo, Competencia", isTagCloud: true, color: "border-red-500" }
]

const salesByAdvisor = [
    { name: 'Carlos Ruiz', sales: 120, goal: 100, avatar: 'https://picsum.photos/seed/301/40/40' },
    { name: 'Ana Gómez', sales: 95, goal: 100, avatar: 'https://picsum.photos/seed/302/40/40' },
    { name: 'Luisa Fernández', sales: 75, goal: 90, avatar: 'https://picsum.photos/seed/303/40/40' },
    { name: 'Jorge Arias', sales: 50, goal: 80, avatar: 'https://picsum.photos/seed/304/40/40' },
];

const minOffersData = [
  { name: 'Carlos R. (N)', done: 4, goal: 5 },
  { name: 'Ana G. (N)', done: 8, goal: 10 },
  { name: 'Luisa F. (A)', done: 18, goal: 15 },
  { name: 'Jorge A. (A)', done: 12, goal: 15 },
]

const salesByCityRaw = [
    { name: 'Montería', sales: 210, fill: 'hsl(var(--chart-1))' },
    { name: 'Sincelejo', sales: 150, fill: 'hsl(var(--chart-2))' },
    { name: 'Barranquilla', sales: 90, fill: 'hsl(var(--chart-3))' },
    { name: 'Otros', sales: 45, fill: 'hsl(var(--chart-4))' },
];

const totalCitySales = salesByCityRaw.reduce((acc, city) => acc + city.sales, 0);

const salesByCity = salesByCityRaw.map(city => ({
    ...city,
    totalSales: totalCitySales,
}));

export default function NotificacionesPage() {
    return (
        <DashboardLayout>
             <main className="flex-1 flex flex-col gap-6 p-4 lg:p-6 overflow-auto">
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Inicio / Notificaciones Comerciales</p>
                        <h1 className="text-2xl font-semibold">Notificaciones y Alertas Comerciales</h1>
                    </div>
                     <Button variant="default" className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4"/>
                        Exportar Informe
                    </Button>
                </header>
                
                <FilterBar />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map(kpi => <NotificationKpiCard key={kpi.title} {...kpi} />)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <AdvisorPerformanceCard
                            title="Ventas por Asesor (en Millones COP)"
                            description="Rendimiento de ventas de cada asesor frente a su meta mensual."
                            data={salesByAdvisor}
                        />
                         <PerformanceChartCard
                            title="Ofertas Mínimas Realizadas"
                            description="Cumplimiento de la meta de ofertas presentadas por cada comercial."
                            data={minOffersData}
                            dataKey="done"
                            metaKey="goal"
                            indexKey="name"
                            layout="vertical"
                        />
                    </div>
                    <div className="space-y-6">
                         <PerformanceChartCard
                            title="Ventas por Ciudad (en Millones COP)"
                            description="Distribución de ventas en las principales ciudades."
                            data={salesByCity}
                            dataKey="sales"
                            indexKey="name"
                            layout="horizontal"
                        />
                        <ComplianceDonutCard />
                        <ActiveAlertsCard />
                    </div>
                </div>
             </main>
        </DashboardLayout>
    );
}
