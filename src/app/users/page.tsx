'use client';
import { useState } from 'react';
import {
  Upload,
  UserPlus,
  X,
  Users, MoreHorizontal, Contact, FileText, Search
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { UserCard } from '@/components/users/user-card';


const usersData = [
    {
        id: 'user-1',
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@sol-cielo.com',
        role: 'Comercial',
        sede: 'Montería',
        status: true,
        last_login: '2024-07-22T14:30:00Z',
        avatar: 'https://picsum.photos/seed/301/100/100',
        performance: {
            leadsCount: 45,
            contractsCount: 8,
            totalSales: 280000000,
        }
    },
    {
        id: 'user-2',
        name: 'Ana Gómez',
        email: 'ana.gomez@sol-cielo.com',
        role: 'Supervisor',
        sede: 'Sincelejo',
        status: true,
        last_login: '2024-07-22T16:05:00Z',
        avatar: 'https://picsum.photos/seed/302/100/100',
        performance: {
            leadsCount: 25,
            contractsCount: 5,
            totalSales: 150000000,
        }
    },
    {
        id: 'user-3',
        name: 'Luisa Fernández',
        email: 'luisa.fernandez@sol-cielo.com',
        role: 'Administrador',
        sede: 'Montería',
        status: true,
        last_login: '2024-07-22T10:15:00Z',
        avatar: 'https://picsum.photos/seed/303/100/100',
        performance: {
            leadsCount: 10,
            contractsCount: 2,
            totalSales: 95000000,
        }
    },
    {
        id: 'user-4',
        name: 'Jorge Arias',
        email: 'jorge.arias@sol-cielo.com',
        role: 'Comercial',
        sede: 'Otros',
        status: false,
        last_login: '2024-06-15T11:00:00Z',
        avatar: 'https://picsum.photos/seed/304/100/100',
        performance: {
            leadsCount: 30,
            contractsCount: 3,
            totalSales: 120000000,
        }
    },
     {
        id: 'user-5',
        name: 'Maria Rodriguez',
        email: 'maria.rodriguez@sol-cielo.com',
        role: 'Contabilidad',
        sede: 'Sincelejo',
        status: true,
        last_login: '2024-07-21T09:00:00Z',
        avatar: 'https://picsum.photos/seed/305/100/100',
        performance: {
            leadsCount: 0,
            contractsCount: 0,
            totalSales: 0,
        }
    },
     {
        id: 'user-6',
        name: 'Pedro Pascal',
        email: 'pedro.pascal@sol-cielo.com',
        role: 'Operaciones',
        sede: 'Montería',
        status: true,
        last_login: '2024-07-23T08:00:00Z',
        avatar: 'https://picsum.photos/seed/306/100/100',
        performance: {
            leadsCount: 5,
            contractsCount: 1,
            totalSales: 40000000,
        }
    },
    {
        id: 'user-7',
        name: 'Sofia Vergara',
        email: 'sofia.vergara@sol-cielo.com',
        role: 'Comercial',
        sede: 'Sincelejo',
        status: true,
        last_login: '2024-07-23T09:30:00Z',
        avatar: 'https://picsum.photos/seed/307/100/100',
        performance: {
            leadsCount: 55,
            contractsCount: 12,
            totalSales: 450000000,
        }
    },
    {
        id: 'user-8',
        name: 'J Balvin',
        email: 'j.balvin@sol-cielo.com',
        role: 'Marketing',
        sede: 'Otros',
        status: true,
        last_login: '2024-07-22T11:45:00Z',
        avatar: 'https://picsum.photos/seed/308/100/100',
        performance: {
            leadsCount: 150,
            contractsCount: 0,
            totalSales: 0,
        }
    }
];

type User = typeof usersData[0];

const roleColors: { [key: string]: string } = {
  Comercial: 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-300 dark:bg-blue-900/50',
  Supervisor: 'bg-purple-500/10 text-purple-700 border-purple-500/20 dark:text-purple-300 dark:bg-purple-900/50',
  Administrador: 'bg-primary/10 text-primary border-primary/20 dark:text-primary dark:bg-primary/20',
  Contabilidad: 'bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-300 dark:bg-green-900/50',
  Operaciones: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-300 dark:bg-yellow-900/50',
  Marketing: 'bg-pink-500/10 text-pink-700 border-pink-500/20 dark:text-pink-300 dark:bg-pink-900/50',
};


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

const UserDetailPanel = ({ user, onClose }: { user: User | null, onClose: () => void }) => {
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

const UserModalForm = ({ open, onOpenChange, user }: { open: boolean, onOpenChange: (open: boolean) => void, user?: User | null }) => {
    const title = user ? "Editar Usuario" : "Crear Nuevo Usuario";
    const description = user ? "Actualiza los datos del miembro del equipo." : "Completa los datos para registrar un nuevo miembro en el equipo.";
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full max-w-md">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                    <div>
                        <Label htmlFor="fullName">Nombre completo</Label>
                        <Input id="fullName" placeholder="Ej: Juanita Pérez" defaultValue={user?.name}/>
                    </div>
                    <div>
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" placeholder="ejemplo@sol-cielo.com" defaultValue={user?.email} />
                    </div>
                    <div>
                        <Label htmlFor="role">Rol</Label>
                        <Select defaultValue={user?.role}>
                            <SelectTrigger id="role"><SelectValue placeholder="Seleccionar rol..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Comercial">Comercial</SelectItem>
                                <SelectItem value="Supervisor">Supervisor</SelectItem>
                                <SelectItem value="Administrador">Administrador</SelectItem>
                                <SelectItem value="Contabilidad">Contabilidad</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="sede">Sede</Label>
                        <Select defaultValue={user?.sede}>
                            <SelectTrigger id="sede"><SelectValue placeholder="Seleccionar sede..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Montería">Montería</SelectItem>
                                <SelectItem value="Sincelejo">Sincelejo</SelectItem>
                                <SelectItem value="Otros">Otros</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label htmlFor="status-switch">Usuario Activo</Label>
                            <p className="text-xs text-muted-foreground">Define si el usuario podrá iniciar sesión.</p>
                        </div>
                        <Switch id="status-switch" defaultChecked={user ? user.status : true} />
                    </div>
                </div>
                 <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button>Guardar Cambios</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};


export default function UsersPage() {
  const [users] = useState<User[]>(usersData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsDetailSheetOpen(true);
  }

  const handleOpenForm = (user?: User | null) => {
    setSelectedUser(user || null);
    setIsFormOpen(true);
  }

  const handleCloseDetail = () => {
    setIsDetailSheetOpen(false);
    // Give animation time to finish before clearing, avoids visual glitch
    setTimeout(() => setSelectedUser(null), 300);
  }

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setTimeout(() => setSelectedUser(null), 300);
  }


  return (
    <DashboardLayout>
        <main className="flex-1 flex flex-col gap-6 p-4 lg:p-6 bg-muted/40">
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div className='flex-1'>
                    <h1 className='text-2xl font-semibold'>Usuarios y Equipo</h1>
                    <p className='text-muted-foreground'>Gestiona los miembros de tu equipo y sus permisos.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Upload className="mr-2 h-4 w-4"/> Exportar
                    </Button>
                    <Button className="w-full sm:w-auto" onClick={() => handleOpenForm()}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Nuevo Usuario
                    </Button>
                </div>
            </div>
            
             <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                     <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar por nombre o correo..." className="pl-9 w-full" />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Select>
                          <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Filtrar por rol" /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="all">Todos los roles</SelectItem>
                              <SelectItem value="Comercial">Comercial</SelectItem>
                              <SelectItem value="Supervisor">Supervisor</SelectItem>
                              <SelectItem value="Administrador">Admin</SelectItem>
                          </SelectContent>
                      </Select>
                      <Select>
                          <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Filtrar por estado" /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="all">Cualquier estado</SelectItem>
                              <SelectItem value="active">Activo</SelectItem>
                              <SelectItem value="inactive">Inactivo</SelectItem>
                          </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="overflow-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {users.length > 0 ? users.map((user) => (
                            <UserCard 
                                key={user.id} 
                                user={user} 
                                roleColors={roleColors}
                                onSelect={() => handleSelectUser(user)}
                                onEdit={() => handleOpenForm(user)}
                            />
                        )) : (
                             <div className="col-span-full text-center text-muted-foreground py-20">
                                <Users className="h-16 w-16 mx-auto mb-4 opacity-30" />
                                <p className="font-medium text-lg">No hay usuarios registrados</p>
                                <p className='text-base mb-4'>Crea el primero para comenzar a gestionar tu equipo.</p>
                                <Button size="sm" onClick={() => handleOpenForm()}>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Crear Usuario
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            
            {/* Sheet for User Detail */}
            <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
                <SheetContent className="p-0 sm:max-w-xl w-full flex flex-col">
                    <UserDetailPanel user={selectedUser} onClose={handleCloseDetail} />
                </SheetContent>
            </Sheet>


            {/* Modal for new/edit user */}
            <UserModalForm open={isFormOpen} onOpenChange={handleCloseForm} user={selectedUser} />

        </main>
    </DashboardLayout>
  );
}
