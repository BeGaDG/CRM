import {
  Activity,
  BarChart,
  Bell,
  Building,
  Calendar,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Contact,
  CreditCard,
  DollarSign,
  FileText,
  Filter,
  LayoutDashboard,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  PlusCircle,
  Search,
  Settings,
  TrendingUp,
  Upload,
  UserPlus,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SolYCieloLogo } from '@/components/icons';
import { SalesChart } from '@/components/dashboard/sales-chart';

const kpis = [
  { title: "Nuevos Leads (24h)", value: "12", delta: "+15%", cta: "Ver leads" },
  { title: "Leads sin contactar", value: "8", delta: "-5%", cta: "Contactar ahora" },
  { title: "Cotizaciones por vencer", value: "3", delta: "+2", cta: "Revisar" },
  { title: "Tasa de conversión (mes)", value: "25%", delta: "+2.5%", cta: "Ver informe" },
];

const pipelineColumns = [
  {
    title: "Nuevo",
    leads: [
      { name: "Ana Torres", city: "Madrid", lastActivity: "Hace 2h", priority: "alta" },
      { name: "Carlos Ruiz", city: "Barcelona", lastActivity: "Hace 5h", priority: "media" },
    ],
  },
  {
    title: "Por Visitar",
    leads: [
      { name: "Beatriz Rico", city: "Valencia", lastActivity: "Ayer", priority: "alta" },
    ],
  },
  {
    title: "Por Cotizar",
    leads: [
      { name: "David Sanz", city: "Sevilla", lastActivity: "Hace 3 días", priority: "baja" },
      { name: "Elena Gil", city: "Zaragoza", lastActivity: "Hace 4 días", priority: "media" },
      { name: "Felipe Morales", city: "Málaga", lastActivity: "Hace 1 semana", priority: "alta" },
    ],
  },
  {
    title: "Por Contratar",
    leads: [{ name: "Gloria Paz", city: "Murcia", lastActivity: "Hace 2 semanas", priority: "media" }],
  },
];

const urgentLeads = [
  { name: "Javier Soler", daysSinceContact: 5 },
  { name: "Laura Méndez", daysSinceContact: 7 },
  { name: "Marcos Núñez", daysSinceContact: 12 },
];

const upcomingVisits = [
  { date: "25 Jul", time: "10:00", advisor: "Lucía", client: "Ana Torres" },
  { date: "25 Jul", time: "12:30", advisor: "Marcos", client: "Beatriz Rico" },
  { date: "26 Jul", time: "09:00", advisor: "Lucía", client: "cliente nuevo" },
];

const recentActivities = [
  { type: "cotizacion", title: "Cotización #C-789 enviada a David Sanz", timestamp: "Hace 15min", meta: "Valor: $2,500" },
  { type: "visita", title: "Visita registrada para Beatriz Rico", timestamp: "Hace 1h", meta: "Asesor: Marcos" },
  { type: "contrato", title: "Contrato #F-123 firmado por Gloria Paz", timestamp: "Hace 3h", meta: "Estado: Completado" },
  { type: "lead", title: "Nuevo lead: Ana Torres", timestamp: "Hace 2h", meta: "Fuente: Web" },
];

const priorityVariant = {
  alta: 'destructive',
  media: 'default',
  baja: 'secondary',
} as const;

const activityIcons = {
  cotizacion: <FileText className="h-4 w-4" />,
  visita: <Calendar className="h-4 w-4" />,
  contrato: <CreditCard className="h-4 w-4" />,
  lead: <UserPlus className="h-4 w-4" />,
};


export default function Dashboard() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/80">
        <SidebarHeader className="flex items-center gap-2.5">
          <SolYCieloLogo className="h-7 w-7" />
          <h2 className="text-lg font-semibold tracking-tight font-headline group-data-[collapsible=icon]:hidden">
            Sol & Cielo
          </h2>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutDashboard />
                <span className="truncate">Inicio</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Users />
                <span className="truncate">Leads</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Building />
                <span className="truncate">Clientes</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <DollarSign />
                <span className="truncate">Ventas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BarChart />
                <span className="truncate">Informes</span>
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
      <SidebarInset className="flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarTrigger className="md:hidden" />
           <div className="relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar en todo el CRM..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notificaciones</span>
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Avatar de usuario" data-ai-hint={userAvatar.imageHint} />}
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Menú de usuario</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuItem>Soporte</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl font-headline">Inicio</h1>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filtrar</span>
              </Button>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Crear Lead</span>
              </Button>
            </div>
          </div>
          
          {/* KPI Strip */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">{kpi.delta}</p>
                    <Link href="#" className="text-xs font-medium text-primary hover:underline">
                      {kpi.cta}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
            {/* Pipeline */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Pipeline de Ventas</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {pipelineColumns.map((col) => (
                    <div key={col.title} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-sm">{col.title}</h3>
                        <Badge variant="secondary" className="text-xs">{col.leads.length}</Badge>
                      </div>
                      <div className="space-y-4">
                        {col.leads.map((lead) => (
                           <Card key={lead.name} className="bg-card">
                           <CardContent className="p-3">
                             <div className="flex justify-between items-start">
                               <div>
                                 <p className="font-semibold text-sm">{lead.name}</p>
                                 <p className="text-xs text-muted-foreground">{lead.city}</p>
                               </div>
                               <Badge variant={priorityVariant[lead.priority as keyof typeof priorityVariant]} className="capitalize text-xs">{lead.priority}</Badge>
                             </div>
                             <div className="flex items-center justify-between mt-4">
                               <p className="text-xs text-muted-foreground">{lead.lastActivity}</p>
                               <div className="flex items-center">
                                 <Avatar className="h-6 w-6 border-2 border-card">
                                   <AvatarImage src="https://picsum.photos/seed/asesor1/32/32" />
                                   <AvatarFallback>AS</AvatarFallback>
                                 </Avatar>
                                 <DropdownMenu>
                                   <DropdownMenuTrigger asChild>
                                     <Button variant="ghost" size="icon" className="h-6 w-6">
                                       <MoreHorizontal className="h-4 w-4" />
                                     </Button>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent>
                                     <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                                     <DropdownMenuItem>Asignar tarea</DropdownMenuItem>
                                   </DropdownMenuContent>
                                 </DropdownMenu>
                               </div>
                             </div>
                           </CardContent>
                         </Card>
                        ))}
                         <Button variant="outline" size="sm" className="w-full">
                           <Plus className="h-4 w-4 mr-2" /> Añadir Lead
                         </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            {/* Side column */}
            <div className="space-y-4 lg:space-y-8">
              {/* Urgent Leads */}
              <Card className="bg-destructive/10 border-destructive">
                <CardHeader>
                  <CardTitle className="text-base text-destructive font-headline">Leads Urgentes</CardTitle>
                  <CardDescription className="text-destructive/80">Contactar lo antes posible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                  {urgentLeads.map((lead) => (
                    <li key={lead.name} className="flex items-center justify-between p-2 rounded-md hover:bg-destructive/10">
                      <div>
                        <p className="font-medium text-sm">{lead.name}</p>
                        <p className="text-xs text-destructive/80">{lead.daysSinceContact} días sin contacto</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/80 hover:bg-destructive/20 hover:text-destructive"><Phone className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/80 hover:bg-destructive/20 hover:text-destructive"><Mail className="h-4 w-4"/></Button>
                      </div>
                    </li>
                  ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Upcoming Visits */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Próximas Visitas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                  {upcomingVisits.map((visit, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-center">
                        <p className="font-bold text-sm">{visit.date.split(' ')[0]}</p>
                        <p className="text-xs text-muted-foreground">{visit.date.split(' ')[1]}</p>
                      </div>
                      <div className="border-l pl-4 flex-1">
                        <p className="font-medium text-sm">{visit.time}</p>
                        <p className="text-xs text-muted-foreground">con {visit.client} ({visit.advisor})</p>
                      </div>
                    </div>
                  ))}
                  </div>
                  <Button size="sm" className="w-full mt-4">
                    <Plus className="h-4 w-4 mr-2" /> Agregar visita
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-muted p-2 rounded-full">
                    {activityIcons[activity.type as keyof typeof activityIcons]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp} &middot; {activity.meta}</p>
                  </div>
                </div>
              ))}
              </div>
            </CardContent>
          </Card>

        </main>
         {/* Mobile Quick Actions */}
         <div className="md:hidden sticky bottom-0 left-0 right-0 bg-background border-t p-2 flex justify-around items-center">
            <Button variant="ghost" className="flex flex-col h-auto p-1">
              <UserPlus className="h-5 w-5 mb-1" />
              <span className="text-xs">Crear Lead</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1">
              <Upload className="h-5 w-5 mb-1" />
              <span className="text-xs">Importar</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1">
              <FileText className="h-5 w-5 mb-1" />
              <span className="text-xs">Cotizar</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1">
              <DollarSign className="h-5 w-5 mb-1" />
              <span className="text-xs">Cobrar</span>
            </Button>
          </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
