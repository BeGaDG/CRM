
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { KpiCard, BarChartCard, LineChartCard, PieChartCard, AreaChartCard, ReportTable, InsightCard, EmptyState, FilterBar } from '@/components/reportes';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { kpisData, insightsData } from '@/lib/data/reportes-data';

export default function ReportesPage() {
    const [showEmptyState, setShowEmptyState] = useState(false);

    if (showEmptyState) {
        return (
            <DashboardLayout>
                <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                         <h1 className="text-2xl font-semibold">Reportes y Análisis</h1>
                         <Button onClick={() => setShowEmptyState(false)}>Mostrar datos</Button>
                    </div>
                    <FilterBar />
                    <EmptyState 
                        title="No hay datos disponibles" 
                        description="No se encontraron datos para el rango de fechas o los filtros seleccionados. Intenta con otros parámetros."
                        onRetry={() => console.log('retrying...')}
                    />
                </main>
            </DashboardLayout>
        )
    }
    
    return (
        <DashboardLayout>
            <main className="flex-1 flex flex-col gap-6 p-4 lg:p-6 overflow-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <h1 className="text-2xl font-semibold">Reportes y Análisis</h1>
                    <Button onClick={() => setShowEmptyState(true)} variant="outline" size="sm">Ver estado vacío</Button>
                </div>
                <FilterBar />
                
                {/* KPIs section */}
                <div className="hidden sm:grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {kpisData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
                </div>
                <div className="sm:hidden">
                    <Carousel opts={{ align: "start" }} className="w-full">
                        <CarouselContent>
                            {kpisData.map((kpi, index) => (
                            <CarouselItem key={index} className="basis-4/5">
                                <KpiCard {...kpi} />
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="ml-12"/>
                        <CarouselNext className="mr-12"/>
                    </Carousel>
                </div>

                {/* Main charts section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 space-y-6">
                        <BarChartCard />
                        <LineChartCard />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <PieChartCard />
                        <AreaChartCard />
                         <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Insights Automáticos</h3>
                            {insightsData.map((insight, i) => <InsightCard key={i} {...insight} />)}
                        </div>
                    </div>
                </div>

                {/* Detailed report table */}
                <ReportTable />
            </main>
        </DashboardLayout>
    )
}
