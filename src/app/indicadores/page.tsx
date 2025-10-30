'use client';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart as BarChartIcon } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { sedes, asesores } from '@/lib/data/indicadores-data';

export default function IndicadoresPage() {
    const [selectedSede, setSelectedSede] = useState<string | null>(null);
    const [selectedAsesor, setSelectedAsesor] = useState<string | null>(null);

    const handleSedeChange = (value: string) => {
        setSelectedSede(value);
        setSelectedAsesor(null); // Reset asesor when sede changes
    };

    const SedeCharts = () => (
        <div className="animate-in fade-in-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {/* Gráficos de Sede irán aquí */}
            </div>
        </div>
    );

    const AsesorCharts = () => (
        <div className="animate-in fade-in-50">
            <h2 className="text-xl font-semibold text-muted-foreground mb-4">Métricas del Asesor: {selectedAsesor} ({selectedSede})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <Card>
                    <CardHeader>
                        <CardTitle>Gráfico de Asesor 1</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                             <p className="text-muted-foreground text-sm">Data del asesor</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Gráfico de Asesor 2</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                             <p className="text-muted-foreground text-sm">Data del asesor</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Gráfico de Asesor 3</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                             <p className="text-muted-foreground text-sm">Data del asesor</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Gráfico de Asesor 4</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                             <p className="text-muted-foreground text-sm">Data del asesor</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Gráfico de Asesor 5</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                             <p className="text-muted-foreground text-sm">Data del asesor</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Gráfico de Asesor 6</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                             <p className="text-muted-foreground text-sm">Data del asesor</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Gráfico de Asesor 7</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                             <p className="text-muted-foreground text-sm">Data del asesor</p>
                        </div>
                    </CardContent>
                </Card>
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
                        <p className="text-muted-foreground">Filtra por sede y asesor para ver las métricas.</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Select onValueChange={handleSedeChange}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Seleccionar Sede..." />
                            </SelectTrigger>
                            <SelectContent>
                                {sedes.map(sede => (
                                    <SelectItem key={sede.id} value={sede.name}>{sede.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setSelectedAsesor} value={selectedAsesor || ''} disabled={!selectedSede}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Seleccionar Asesor..." />
                            </SelectTrigger>
                            <SelectContent>
                                {asesores.filter(a => selectedSede === 'Todas' || a.sede === selectedSede).map(asesor => (
                                    <SelectItem key={asesor.id} value={asesor.name}>{asesor.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex-1">
                    {!selectedSede && <EmptyState />}
                    {selectedSede && !selectedAsesor && <SedeCharts />}
                    {selectedSede && selectedAsesor && <AsesorCharts />}
                </div>

            </main>
        </DashboardLayout>
    );
}
