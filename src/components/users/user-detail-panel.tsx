
'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/data/users-data';
import { roleColors } from '@/lib/data/users-data';
import { Contact, DollarSign, FileText, Target, X } from 'lucide-react';


const PerformanceChart = ({ data }: { data: any[] }) => {
    return (
        <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                 <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                    }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export const UserDetailPanel = ({ user, onClose }: { user: User | null, onClose: () => void }) => {
    if (!user) {
        return null;
    }
    
    const conversionRate = user.performance.leadsCount > 0 ? ((user.performance.contractsCount / user.performance.leadsCount) * 100).toFixed(1) : 0;
    const chartData = [
        { name: 'Leads', total: user.performance.leadsCount },
        { name: 'Contratos', total: user.performance.contractsCount }
    ];

    return (
        <Card className="h-full flex flex-col relative">
           <Button variant="ghost" size="icon" className="lg:hidden absolute top-2 right-2 z-10" onClick={onClose}><X className="h-4 w-4"/></Button>
           <CardHeader className="text-center items-center gap-4 pt-8">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </CardHeader>
             <CardContent className="flex-1 overflow-hidden p-0">
                <Tabs defaultValue="rendimiento" className="h-full flex flex-col">
                    <TabsList className="mx-4 mt-2">
                        <TabsTrigger value="rendimiento">Rendimiento</TabsTrigger>
                        <TabsTrigger value="perfil">Perfil</TabsTrigger>
                        <TabsTrigger value="config">Configuración</TabsTrigger>
                    </TabsList>
                    <div className='overflow-y-auto flex-1 p-4 text-sm space-y-4'>
                        <TabsContent value="perfil" className="space-y-4 mt-2">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center"><strong>Rol:</strong> <Badge variant="secondary" className={cn("font-medium", roleColors[user.role])}>{user.role}</Badge></div>
                                <Separator />
                                <div className="flex justify-between"><strong>Sede:</strong> <span>{user.sede}</span></div>
                                <Separator />
                                <div className="flex justify-between items-center"><strong>Estado:</strong> <Badge variant={user.status ? 'default' : 'destructive'} className={cn("font-medium", user.status ? 'bg-green-500/10 text-green-700 dark:text-green-300 dark:bg-green-900/50' : 'bg-red-500/10 text-red-700 dark:text-red-300 dark:bg-red-900/50')}>{user.status ? 'Activo' : 'Inactivo'}</Badge></div>
                                <Separator />
                                <div className="flex justify-between"><strong>Último acceso:</strong> <span>{new Date(user.last_login).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })}</span></div>
                            </div>
                            <Separator className="my-4" />
                            <h4 className="font-semibold mb-2">Permisos</h4>
                             <div className="space-y-2 text-muted-foreground">
                                <p className="flex items-center gap-2">✓ <span className="flex-1">Acceso a Gestión de Leads</span></p>
                                <p className="flex items-center gap-2">✓ <span className="flex-1">Acceso a Gestión de Usuarios</span></p>
                                <p className="flex items-center gap-2">✕ <span className="flex-1">Acceso a Reportes y Análisis</span></p>
                            </div>
                        </TabsContent>
                         <TabsContent value="rendimiento" className="space-y-6 mt-2">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Leads Asignados</CardTitle>
                                        <Contact className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{user.performance.leadsCount}</div>
                                    </CardContent>
                                </Card>
                                 <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Contratos Cerrados</CardTitle>
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{user.performance.contractsCount}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                                        <Target className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{conversionRate}%</div>
                                    </CardContent>
                                </Card>
                            </div>
                             <Card>
                                <CardHeader>
                                    <CardTitle className='text-base font-semibold'>Ventas Totales</CardTitle>
                                    <CardDescription>Valor total de los contratos cerrados.</CardDescription>
                                </CardHeader>
                                <CardContent className="flex items-center gap-4">
                                    <DollarSign className="h-8 w-8 text-green-500" />
                                    <div className="text-3xl font-bold text-green-500">${user.performance.totalSales.toLocaleString('es-CO')}</div>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle className='text-base font-semibold'>Embudo de Ventas</CardTitle>
                                </CardHeader>
                                <CardContent>
                                   <PerformanceChart data={chartData} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="config" className="mt-2">
                             <div className="space-y-3">
                                 <Button variant="outline" className="w-full justify-start">Resetear contraseña</Button>
                                 <Button variant="outline" className="w-full justify-start">Cambiar rol</Button>
                                 <Button variant="destructive" className="w-full justify-start">Desactivar cuenta</Button>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}
