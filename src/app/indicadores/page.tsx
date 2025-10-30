
'use client';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

export default function IndicadoresPage() {
    return (
        <DashboardLayout>
            <main className="flex-1 flex flex-col gap-6 p-4 lg:p-6 overflow-auto">
                <h1 className="text-2xl font-semibold">Indicadores de Rendimiento</h1>
            </main>
        </DashboardLayout>
    );
}
