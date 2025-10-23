
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
    title: 'Valor del Pipeline',
    value: '$1.2M',
    delta: '+8.1% vs mes anterior',
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
    title: 'Leads por Contactar',
    value: '18',
    delta: '2 vencidos',
    deltaType: 'negative',
    icon: <Target className="h-6 w-6 text-muted-foreground" />,
  },
];

const recentLeads = [
  {
    id: 'lead-1',
    customer: 'Constructora S.A.S',
    interest: 'Planta Solar',
    date: '2024-07-23 08:21',
    status: 'Por Visitar',
    statusColor: 'bg-blue-500',
  },
  {
    id: 'lead-2',
    customer: 'Inversiones XYZ',
    interest: 'Comercializadora',
    date: '2024-07-22 14:45',
    status: 'Por Cotizar',
    statusColor: 'bg-indigo-500',
  },
  {
    id: 'lead-3',
    customer: 'Logística Total',
    interest: 'Ambos',
    date: '2024-07-22 10:10',
    status: 'Por Contactar',
    statusColor: 'bg-cyan-500',
  },
  {
    id: 'lead-4',
    customer: 'Nuevo Cliente Alfa',
    interest: 'Planta Solar',
    date: '2024-07-21 18:30',
    status: 'Nuevo Cliente',
    statusColor: 'bg-sky-500',
  },
];


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
              <LeadFunnelStats />
            </div>
          </div>
          
          {/* Recent Leads Table */}
          <Card>
            <CardHeader className='flex-row items-center justify-between'>
              <CardTitle className="font-headline text-lg">
                Leads Recientes
              </CardTitle>
              <Button variant="ghost" size="icon"><MoreHorizontal className='h-4 w-4'/></Button>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Interés</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className='text-right'>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className='font-medium'>{lead.customer}</TableCell>
                      <TableCell>{lead.interest}</TableCell>
                      <TableCell>{lead.date}</TableCell>
                      <TableCell className='text-right'>
                        <div className="flex items-center justify-end gap-2">
                            <span className={cn("h-2 w-2 rounded-full", lead.statusColor)}></span>
                            <span>{lead.status}</span>
                        </div>
                      </TableCell>
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
