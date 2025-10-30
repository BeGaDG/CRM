'use client';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart as BarChartIcon } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { sedes } from '@/lib/data/indicadores-data';
import { ResponseTimeChart } from '@/components/indicadores/response-time-chart';
import { OffersChart } from '@/components/indicadores/offers-chart';
import { RejectionReasonChart } from '@/components/indicadores/rejection-reason-chart';
import { SalesByCityChart } from '@/components/indicadores/sales-by-city-chart';

export default function IndicadoresPage() {
    const [selectedSede, setSelectedSede] = useState<string | null>(null);

    const handleSedeChange = (value: string) => {
        setSelectedSede(value === 'all' ? null : value);
    };

    const SedeCharts = () => (
        <div className="animate-in fade-in-50 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponseTimeChart />
                <OffersChart />
            </div>
            <RejectionReasonChart />
            <div className="lg:col-span-2">
                <SalesByCityChart />
            </div>
        </div>
    );
    
    const EmptyState = () => (
        <div className="text-center text-muted-foreground py-20">
            <BarChartIcon className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p className="font-medium text-lg">Selecciona una sede</p>
            <p className='text-base'>Elige una sede para ver sus indicadores de rendimiento.</p>
        </div>
    );

    return (
        <DashboardLayout>
            <main className="flex-1 flex flex-col gap-6 p-4 lg:p-6 overflow-auto">
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-lg border">
                    <div className="flex-1 w-full">
                        <h1 className="text-2xl font-semibold">Indicadores de Rendimiento</h1>
                        <p className="text-muted-foreground">Filtra por sede para ver las métricas.</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Select onValueChange={handleSedeChange} defaultValue="all">
                            <SelectTrigger className="w-full sm:w-[220px]">
                                <SelectValue placeholder="Seleccionar Sede..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las Sedes</SelectItem>
                                {sedes.map(sede => (
                                    <SelectItem key={sede.id} value={sede.name}>{sede.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex-1">
                    {!selectedSede && <EmptyState />}
                    {selectedSede && <SedeCharts />}
                </div>

            </main>
        </DashboardLayout>
    );
}
