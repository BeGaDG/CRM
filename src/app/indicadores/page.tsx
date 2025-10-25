
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Clock, TrendingUp, TrendingDown, Target, XCircle, FileCheck, Users, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { NotificationKpiCard } from '@/components/notificaciones/notification-kpi-card';
import { FilterBar } from '@/components/notificaciones/filter-bar';


const salesByAdvisorData = [
    { name: 'Carlos Ruiz', sales: 120000000 },
    { name: 'Ana Gómez', sales: 95000000 },
    { name: 'Luisa Fernández', sales: 75000000 },
    { name: 'Jorge Arias', sales: 50000000 },
];

const salesByCityData = [
    { name: 'Montería', sales: 210000000 },
    { name: 'Sincelejo', sales: 150000000 },
    { name: 'Barranquilla', sales: 90000000 },
    { name: 'Otros', sales: 45000000 },
];

const rejectionReasonsData = [
  { name: 'Precio', value: 400, color: 'hsl(var(--chart-1))' },
  { name: 'Tiempo', value: 300, color: 'hsl(var(--chart-2))' },
  { name: 'Contrató con otro', value: 300, color: 'hsl(var(--chart-3))' },
  { name: 'Falta de interés', value: 200, color: 'hsl(var(--chart-4))' },
  { name: 'Otro', value: 100, color: 'hsl(var(--muted))' },
];

const advisorGoalsData = [
  { name: 'Carlos R. (Nuevo)', presented: 4, goal: 5 },
  { name: 'Ana G. (Nuevo)', presented: 8, goal: 10 },
  { name: 'Luisa F. (Antiguo)', presented: 18, goal: 15 },
  { name: 'Jorge A. (Antiguo)', presented: 12, goal: 15 },
]

const kpis = [
    { title: "Tiempo Promedio de Respuesta", value: "3.5", unit: "horas", trend: -5, trendText: "vs la semana pasada", color: "border-blue-500", icon: <Clock className="h-6 w-6" /> },
    { title: "Tiempo Promedio de Conversión", value: "21", unit: "días", trend: 2, trendText: "vs el mes pasado", color: "border-yellow-500", icon: <TrendingUp className="h-6 w-6" /> },
    { title: "Ofertas Presentadas vs Vencidas", value: "82 / 18", chartData: [{value: 82, color: 'hsl(var(--primary))'}, {value: 18, color: 'hsl(var(--destructive))'}], color: "border-green-500", icon: <FileCheck className="h-6 w-6" /> },
    { title: "Tasa de Rechazo", value: "15.2", unit: "%", trend: -1.5, trendText: "vs el mes pasado", color: "border-red-500", icon: <TrendingDown className="h-6 w-6" /> }
]

export default function IndicadoresPage() {
    return (
        <DashboardLayout>
            <main className="flex-1 flex flex-col gap-6 p-4 lg:p-6 overflow-auto">
                <h1 className="text-2xl font-semibold">Indicadores de Rendimiento</h1>

                <FilterBar />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {kpis.map(kpi => <NotificationKpiCard key={kpi.title} {...kpi} />)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Ventas por Asesor</CardTitle>
                            <CardDescription>Valor total de contratos cerrados por cada asesor en el período.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-0">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={salesByAdvisorData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" tickFormatter={(value) => `$${(value as number) / 1000000}M`} />
                                    <YAxis type="category" dataKey="name" width={80} />
                                    <Tooltip formatter={(value) => `$${(value as number).toLocaleString('es-CO')}`} />
                                    <Bar dataKey="sales" name="Ventas" fill="hsl(var(--primary))" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Ventas por Ciudad</CardTitle>
                            <CardDescription>Valor total de contratos cerrados por ciudad principal.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={salesByCityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
                                    <Tooltip formatter={(value) => `$${(value as number).toLocaleString('es-CO')}`} />
                                    <Bar dataKey="sales" name="Ventas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" />Cumplimiento de Metas (Presentaciones)</CardTitle>
                             <CardDescription>Seguimiento de ofertas mínimas presentadas por los asesores.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {advisorGoalsData.map((advisor) => (
                             <div key={advisor.name}>
                               <div className="flex justify-between items-center mb-1">
                                 <p className="text-sm font-medium">{advisor.name}</p>
                                 <p className="text-sm text-muted-foreground"><span className="font-bold text-foreground">{advisor.presented}</span> de {advisor.goal}</p>
                               </div>
                               <Progress value={(advisor.presented / advisor.goal) * 100} />
                             </div>
                           ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><XCircle className="h-5 w-5" />Principales Motivos de Rechazo</CardTitle>
                            <CardDescription>Distribución de las razones por las cuales los leads no se convierten.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                <Pie
                                    data={rejectionReasonsData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {rejectionReasonsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [value, name]}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </DashboardLayout>
    );
}
