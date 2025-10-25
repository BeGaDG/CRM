
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

const SimpleKpiCard = ({ title, value, icon, unit, description }: { title: string, value: string, icon: React.ReactNode, unit?: string, description?: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}{unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </CardContent>
    </Card>
);

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
  { name: 'Precio', value: 400, color: '#FF8042' },
  { name: 'Tiempo', value: 300, color: '#0088FE' },
  { name: 'Contrató con otro', value: 300, color: '#00C49F' },
  { name: 'Falta de interés', value: 200, color: '#FFBB28' },
  { name: 'Otro', value: 100, color: '#A9A9A9' },
];

const advisorGoalsData = [
  { name: 'Carlos R. (Nuevo)', presented: 4, goal: 5 },
  { name: 'Ana G. (Nuevo)', presented: 8, goal: 10 },
  { name: 'Luisa F. (Antiguo)', presented: 18, goal: 15 },
  { name: 'Jorge A. (Antiguo)', presented: 12, goal: 15 },
]

export default function IndicadoresPage() {
    return (
        <DashboardLayout>
            <main className="flex-1 flex flex-col gap-6 p-4 lg:p-6 overflow-auto">
                <h1 className="text-2xl font-semibold">Indicadores de Rendimiento</h1>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <SimpleKpiCard title="Tiempo Promedio de Respuesta" value="3.5" unit="horas" icon={<Clock className="h-4 w-4 text-muted-foreground" />} description="A nuevos leads en los últimos 30 días" />
                    <SimpleKpiCard title="Tiempo Promedio de Conversión" value="21" unit="días" icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} description="Desde la creación hasta el contrato" />
                    <SimpleKpiCard title="Ofertas Presentadas vs Vencidas" value="82 / 18" icon={<FileCheck className="h-4 w-4 text-muted-foreground" />} description="Total de ofertas en el último mes" />
                    <SimpleKpiCard title="Tasa de Rechazo" value="15.2" unit="%" icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />} description="Leads que terminan en 'No'" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Ventas por Asesor</CardTitle>
                            <CardDescription>Valor total de contratos cerrados por cada asesor en el período.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={salesByAdvisorData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" tickFormatter={(value) => `$${(value as number) / 1000000}M`} />
                                    <YAxis type="category" dataKey="name" width={80} />
                                    <Tooltip formatter={(value) => `$${(value as number).toLocaleString('es-CO')}`} />
                                    <Legend />
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
                                <BarChart data={salesByCityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
                                    <Tooltip formatter={(value) => `$${(value as number).toLocaleString('es-CO')}`} />
                                    <Legend />
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
                                <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </DashboardLayout>
    );
}
