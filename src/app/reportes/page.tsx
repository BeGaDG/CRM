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
import { DateRange } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Download, SlidersHorizontal } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { KpiCard } from '@/components/reportes/kpi-card';
import { BarChartCard } from '@/components/reportes/bar-chart-card';
import { LineChartCard } from '@/components/reportes/line-chart-card';
import { PieChartCard } from '@/components/reportes/pie-chart-card';
import { AreaChartCard } from '@/components/reportes/area-chart-card';
import { ReportTable } from '@/components/reportes/report-table';
import { InsightCard } from '@/components/reportes/insight-card';
import { EmptyState } from '@/components/reportes/empty-state';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';


const kpisData = [
    { title: 'Leads Captados (30d)', value: '316', variationPercent: 12, comparisonText: 'vs el mes anterior' },
    { title: 'Tasa de Conversión', value: '15.8%', variationPercent: -2.5, comparisonText: 'vs el mes anterior' },
    { title: 'Facturación Total (30d)', value: '$89.4M', variationPercent: 20.1, comparisonText: 'vs el mes anterior' },
    { title: 'Clientes Activos', value: '78', variationPercent: 5, comparisonText: 'vs el mes anterior' }
];

const insightsData = [
    { title: "Mejor Sede en Conversión", description: "Los leads de Montería tienen una tasa de conversión 12% más alta.", trend: "positive" },
    { title: "Asesor del Mes", description: "El asesor con mejor rendimiento del mes es Carlos Ruiz.", trend: "positive" },
    { title: "Oportunidad de Mejora", description: "El 40% de los contratos se generan tras la segunda cotización.", trend: "neutral" }
];


const FilterBar = () => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2024, 0, 1),
        to: new Date(),
    });

    return (
        <div className="flex flex-col sm:flex-row items-center gap-2 bg-card p-3 rounded-lg border">
            <div className="flex flex-1 w-full gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn("w-full sm:w-[260px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                            <>
                                {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                                {format(date.to, "LLL dd, y", { locale: es })}
                            </>
                            ) : (
                            format(date.from, "LLL dd, y", { locale: es })
                            )
                        ) : (
                            <span>Selecciona un rango</span>
                        )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={es}
                        />
                    </PopoverContent>
                </Popover>
                <Select>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Sede" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las Sedes</SelectItem>
                        <SelectItem value="monteria">Montería</SelectItem>
                        <SelectItem value="sincelejo">Sincelejo</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Comercial" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                        <SelectItem value="ana">Ana Gómez</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <Button className="w-full sm:w-auto gap-2">
                <Download className="h-4 w-4"/>
                Exportar Reporte
            </Button>
        </div>
    )
}


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
