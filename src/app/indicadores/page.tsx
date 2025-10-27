
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
import { kpisIndicadores, salesByAdvisorData, salesByCityData, rejectionReasonsData, advisorGoalsData } from '@/lib/data/indicadores-data';


export default function IndicadoresPage() {
    return (
        <DashboardLayout>
            <main className="flex-1 flex flex-col gap-6 p-4 lg:p-6 overflow-auto">
                <h1 className="text-2xl font-semibold">Indicadores de Rendimiento</h1>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {kpisIndicadores.map((kpi, index) => (
                    <Card key={kpi.title} className={`border-l-4 ${kpi.color}`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        {kpi.icon}
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{kpi.value} {kpi.unit}</div>
                        {kpi.trend &&
                            <p className={`text-xs ${kpi.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {kpi.trend > 0 ? '+' : ''}{kpi.trend}% {kpi.trendText}
                            </p>
                        }
                        </CardContent>
                    </Card>
                    ))}
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
