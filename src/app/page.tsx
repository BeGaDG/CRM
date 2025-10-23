
'use client';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  ClipboardList,
  Contact,
  CreditCard,
  FileText,
  LayoutDashboard,
  MoreHorizontal,
  Search,
  Settings,
  Users,
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
import { InvoiceStats } from '@/components/dashboard/invoice-stats';


const kpis = [
  {
    title: 'Total de Clientes',
    value: '1.456',
    delta: '+6,5% desde la semana pasada',
    deltaType: 'positive',
    icon: <Users className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: 'Ingresos',
    value: '$3.345',
    delta: '-0,10% desde la semana pasada',
    deltaType: 'negative',
    icon: <FileText className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: 'Beneficio',
    value: '60%',
    delta: '-0,2% desde la semana pasada',
    deltaType: 'negative',
    icon: <Activity className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: 'Facturas',
    value: '1.135',
    delta: '+11,5% desde la semana pasada',
    deltaType: 'positive',
    icon: <ClipboardList className="h-6 w-6 text-muted-foreground" />,
  },
];

const recentActivities = [
  {
    id: '#065499',
    customer: 'Constructora S.A.S',
    items: '1x Contrato Comercializadora',
    date: '2024-07-23 08:21',
    status: 'Pagado',
    price: '$2.500.000',
    statusVariant: 'success',
  },
  {
    id: '#065498',
    customer: 'Inversiones XYZ',
    items: '1x Instalación Planta Solar',
    date: '2024-07-22 14:45',
    status: 'Pendiente',
    statusVariant: 'warning',
    price: '$15.000.000',
  },
  {
    id: '#065497',
    customer: 'Logística Total',
    items: '1x Mantenimiento',
    date: '2024-07-22 10:10',
    status: 'Pagado',
    statusVariant: 'success',
    price: '$800.000',
  },
  {
    id: '#065496',
    customer: 'Nuevo Cliente Alfa',
    items: '1x Asesoría Energética',
    date: '2024-07-21 18:30',
    status: 'Vencido',
    statusVariant: 'destructive',
    price: '$300.000',
  },
];

const statusBadgeVariants: { [key: string]: string } = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  destructive: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

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
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <SidebarMenu>
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
            <div className="lg:col-span-2 space-y-6">
              <SalesAnalyticsChart />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <InvoiceStats />
            </div>
          </div>
          
          {/* Recent Invoices Table */}
          <Card>
            <CardHeader className='flex-row items-center justify-between'>
              <CardTitle className="font-headline text-lg">
                Facturas Recientes
              </CardTitle>
              <Button variant="ghost" size="icon"><MoreHorizontal className='h-4 w-4'/></Button>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>No</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className='text-right'>Precio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className='font-medium'>{activity.id}</TableCell>
                      <TableCell>{activity.customer}</TableCell>
                      <TableCell>{activity.items}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusBadgeVariants[activity.statusVariant]}>{activity.status}</Badge>
                      </TableCell>
                      <TableCell className='text-right'>{activity.price}</TableCell>
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
