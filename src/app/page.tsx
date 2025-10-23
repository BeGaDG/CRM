
'use client';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  ClipboardList,
  Contact,
  DollarSign,
  FileText,
  LayoutDashboard,
  MoreHorizontal,
  Percent,
  Search,
  Settings,
  Target,
  Users,
  BarChart,
  Bell,
  CheckCircle,
  FileSignature
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SolYCieloLogo } from '@/components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SalesAnalyticsChart } from '@/components/dashboard/sales-analytics-chart';
import { LeadFunnelStats } from '@/components/dashboard/lead-funnel-stats';
import { cn } from '@/lib/utils';


const kpis = [
  {
    title: 'Nuevos Leads (Mes)',
    value: '124',
    delta: '+15.2% vs mes anterior',
    deltaType: 'positive',
    icon: <Users className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: 'Ingresos del Mes',
    value: '$45,231.89',
    delta: '+20.1% vs mes anterior',
    deltaType: 'positive',
    icon: <DollarSign className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: 'Tasa de Conversión',
    value: '23.5%',
    delta: '-1.2% vs mes anterior',
    deltaType: 'negative',
    icon: <Percent className="h-6 w-6 text-muted-foreground" />,
  },
   {
    title: 'Facturas Pendientes',
    value: '12',
    delta: '3 vencidas',
    deltaType: 'negative',
    icon: <FileText className="h-6 w-6 text-muted-foreground" />,
  },
];

const recentContracts = [
    {
        id: 'contract-1',
        customer: 'Constructora S.A.S',
        value: 120000000,
        type: 'Planta Solar',
        date: '2024-07-23',
        status: 'Activo',
        statusColor: 'bg-green-500',
    },
    {
        id: 'contract-2',
        customer: 'Inversiones XYZ',
        value: 15000000,
        type: 'Comercializadora',
        date: '2024-07-20',
        status: 'Activo',
        statusColor: 'bg-green-500',
    },
    {
        id: 'contract-3',
        customer: 'Tiendas La Rebaja',
        value: 85000000,
        type: 'Ambos',
        date: '2024-07-15',
        status: 'Finalizado',
        statusColor: 'bg-gray-500',
    },
     {
        id: 'contract-4',
        customer: 'Hotel El Dorado',
        value: 250000000,
        type: 'Planta Solar',
        date: '2024-07-11',
        status: 'Activo',
        statusColor: 'bg-green-500',
    },
];

const recentActivity = [
    {
        icon: <Contact className="h-4 w-4" />,
        bgColor: 'bg-blue-100 dark:bg-blue-900/50',
        textColor: 'text-blue-600 dark:text-blue-300',
        description: "Nuevo lead 'Colegio Moderno' fue creado.",
        time: "Hace 5m"
    },
     {
        icon: <FileSignature className="h-4 w-4" />,
        bgColor: 'bg-green-100 dark:bg-green-900/50',
        textColor: 'text-green-600 dark:text-green-300',
        description: "Contrato firmado con 'Constructora S.A.S'.",
        time: "Hace 2h"
    },
     {
        icon: <CheckCircle className="h-4 w-4" />,
        bgColor: 'bg-sky-100 dark:bg-sky-900/50',
        textColor: 'text-sky-600 dark:text-sky-300',
        description: "Pago de factura de 'Inversiones XYZ' recibido.",
        time: "Hace 8h"
    },
     {
        icon: <ClipboardList className="h-4 w-4" />,
        bgColor: 'bg-orange-100 dark:bg-orange-900/50',
        textColor: 'text-orange-600 dark:text-orange-300',
        description: "Nueva cotización enviada a 'Logística Total'.",
        time: "Ayer"
    }
]


export default function Dashboard() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/80">
        <SidebarHeader className="flex items-center gap-2.5 p-4">
          <SolYCieloLogo className="h-8 w-8 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight font-headline group-data-[collapsible=icon]:hidden">
            Sol & Cielo
          </h2>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton isActive>
                  <LayoutDashboard />
                  <span className="truncate">Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/leads">
                <SidebarMenuButton>
                  <Contact />
                  <span className="truncate">Leads</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/users">
                <SidebarMenuButton>
                  <Users />
                  <span className="truncate">Usuarios</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileText />
                  <span className="truncate">Facturas</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  <BarChart />
                  <span className="truncate">Reportes</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <SidebarMenu>
             <SidebarMenuItem>
              <SidebarMenuButton>
                <Bell />
                <span className="truncate">Notificaciones</span>
                 <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                <span className="truncate">Configuración</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col bg-muted/40">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold md:text-xl">
            Bienvenido de nuevo, Equipo
          </h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar cualquier cosa..."
                className="w-full rounded-md bg-background pl-9 md:w-[200px] lg:w-[320px] h-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                  <Avatar className="h-9 w-9">
                    {userAvatar && (
                      <AvatarImage
                        src={userAvatar.imageUrl}
                        alt="Avatar de usuario"
                        data-ai-hint={userAvatar.imageHint}
                      />
                    )}
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Menú de usuario</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6 overflow-auto">
          {/* KPI Strip */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  {kpi.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className={`text-xs ${kpi.deltaType === 'positive' ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                     {kpi.deltaType === 'positive' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {kpi.delta}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 flex">
              <SalesAnalyticsChart />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <LeadFunnelStats />
              <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                         <div key={index} className="flex items-start gap-3">
                            <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", activity.bgColor, activity.textColor)}>
                                {activity.icon}
                            </div>
                            <div className="flex-1 text-sm">
                                <p>{activity.description}</p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Recent Contracts Table */}
          <Card>
            <CardHeader className='flex-row items-center justify-between'>
              <div>
                <CardTitle className="font-headline text-lg">
                    Contratos Recientes
                </CardTitle>
                <CardDescription>Estos son los últimos contratos cerrados este mes.</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="#">Ver todos</Link>
              </Button>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="hidden sm:table-cell">Tipo de Interés</TableHead>
                    <TableHead className="hidden md:table-cell">Fecha de Cierre</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell>
                        <div className="font-medium">{contract.customer}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary">{contract.type}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{new Date(contract.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                      <TableCell className='text-right font-mono'>${contract.value.toLocaleString('es-CO')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

    

    