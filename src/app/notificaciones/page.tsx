'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { NotificationKpiCard } from '@/components/notificaciones/notification-kpi-card';
import { PerformanceChartCard } from '@/components/notificaciones/performance-chart-card';
import { ComplianceDonutCard } from '@/components/notificaciones/compliance-donut-card';
import { ActiveAlertsCard } from '@/components/notificaciones/active-alerts-card';
import { PieChartCard } from '@/components/notificaciones/pie-chart-card';

const FilterBar = () => (
    <div className="flex flex-col sm:flex-row items-center gap-2 bg-card p-3 rounded-lg border">
        <div className="flex flex-1 w-full gap-2">
            <Select defaultValue="monteria">
                <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Ciudad" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="monteria">Montería</SelectItem>
                    <SelectItem value="sincelejo">Sincelejo</SelectItem>
                    <SelectItem value="todos">Todas las ciudades</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Asesor" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                    <SelectItem value="ana">Ana Gómez</SelectItem>
                    <SelectItem value="todos">Todos los asesores</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="07">
                <SelectTrigger className="w-full sm:w-[120px]"><SelectValue placeholder="Mes" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="01">Enero</SelectItem>
                    <SelectItem value="02">Febrero</SelectItem>
                    <SelectItem value="03">Marzo</SelectItem>
                    <SelectItem value="04">Abril</SelectItem>
                    <SelectItem value="05">Mayo</SelectItem>
                    <SelectItem value="06">Junio</SelectItem>
                    <SelectItem value="07">Julio</SelectItem>
                    <SelectItem value="08">Agosto</SelectItem>
                    <SelectItem value="09">Septiembre</SelectItem>
                    <SelectItem value="10">Octubre</SelectItem>
                    <SelectItem value="11">Noviembre</SelectItem>
                    <SelectItem value="12">Diciembre</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="2024">
                <SelectTrigger className="w-full sm:w-[100px]"><SelectValue placeholder="Año" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Button className="w-full sm:w-auto gap-2">
            <Filter className="h-4 w-4"/>
            Aplicar Filtros
        </Button>
    </div>
);


const kpis = [
    { title: "Tiempo prom. de respuesta", value: "45", unit: "minutos", trend: -10, trendText: "vs mes anterior", color: "border-blue-500" },
    { title: "Ofertas Presentadas vs. Vencidas", value: "82 / 18", chartData: [{value: 82, color: '#22C55E'}, {value: 18, color: '#EF4444'}], color: "border-green-500" },
    { title: "Tiempo prom. de conversión", value: "21", unit: "días", trend: 5, trendText: "vs mes anterior", color: "border-yellow-500" },
    { title: "Top Motivos de Rechazo", value: "Precio, Tiempo, Competencia", isTagCloud: true, color: "border-red-500" }
]

const salesByAdvisor = [
    { name: 'Carlos R.', ventas: 120, meta: 100 },
    { name: 'Ana G.', ventas: 95, meta: 100 },
    { name: 'Luisa F.', ventas: 75, meta: 90 },
    { name: 'Jorge A.', ventas: 50, meta: 80 },
];

const minOffersData = [
  { name: 'Carlos R. (N)', done: 4, goal: 5 },
  { name: 'Ana G. (N)', done: 8, goal: 10 },
  { name: 'Luisa F. (A)', done: 18, goal: 15 },
  { name: 'Jorge A. (A)', done: 12, goal: 15 },
]

const salesByCity = [
    { name: 'Montería', value: 210, fill: 'hsl(var(--chart-1))' },
    { name: 'Sincelejo', value: 150, fill: 'hsl(var(--chart-2))' },
    { name: 'Barranquilla', value: 90, fill: 'hsl(var(--chart-3))' },
    { name: 'Otros', value: 45, fill: 'hsl(var(--chart-4))' },
];

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
                        <PerformanceChartCard
                            title="Ventas por Asesor (en Millones COP)"
                            description="Rendimiento de ventas de cada asesor frente a su meta mensual."
                            data={salesByAdvisor}
                            dataKey="ventas"
                            metaKey="meta"
                            indexKey="name"
                            layout="horizontal"
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
                         <PieChartCard
                            title="Ventas por Ciudad (en Millones COP)"
                            description="Distribución de ventas en las principales ciudades."
                            data={salesByCity}
                        />
                        <ComplianceDonutCard />
                        <ActiveAlertsCard />
                    </div>
                </div>
             </main>
        </DashboardLayout>
    );
}
