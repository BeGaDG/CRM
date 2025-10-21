import {
  Activity,
  AlertTriangle,
  BarChart,
  Bell,
  Building,
  ChevronRight,
  ClipboardList,
  Contact,
  CreditCard,
  FileText,
  Filter,
  LayoutDashboard,
  MoreHorizontal,
  PlusCircle,
  Search,
  Settings,
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
import { ConversionRateChart } from '@/components/dashboard/conversion-rate-chart';

const kpis = [
  { title: "Total de Clientes", value: "1,250", delta: "+50 este mes", icon: <Users className="text-primary"/>, cta: "Ver clientes" },
  { title: "Leads Activos", value: "82", delta: "+15 hoy", icon: <Contact className="text-primary"/>, cta: "Gestionar leads" },
  { title: "Facturas Pendientes", value: "42", delta: "$15,780.00", icon: <FileText className="text-destructive"/>, cta: "Ver facturas" },
  { title: "Contratos Firmados", value: "310", delta: "+12 este mes", icon: <ClipboardList className="text-green-500"/>, cta: "Ver contratos" },
];

const quickAccess = [
    { title: "Gestión de Leads", description: "Flujo comercial y oportunidades.", icon: <Contact className="h-8 w-8"/>, href: "#"},
    { title: "Gestión de Usuarios", description: "Clientes y equipo administrativo.", icon: <Users className="h-8 w-8"/>, href: "#"},
    { title: "Gestión de Facturas", description: "Facturación, cobros y pagos.", icon: <FileText className="h-8 w-8"/>, href: "#"},
    { title: "Reportes y Análisis", description: "Métricas y rendimiento.", icon: <BarChart className="h-8 w-8"/>, href: "#"},
]

const recentActivities = [
  { type: "lead", title: "Nuevo lead 'Ana Torres' asignado a 'Carlos Ruiz'", timestamp: "Hace 5min", meta: "Fuente: Web" },
  { type: "factura", title: "Factura #FAC-2024-789 generada para 'Construcciones S.A.'", timestamp: "Hace 15min", meta: "Valor: $2,500" },
  { type: "pago", title: "Pago recibido de 'Inversiones ABC'", timestamp: "Hace 1h", meta: "Método: Wompi" },
  { type: "usuario", title: "Nuevo usuario 'Laura Méndez' creado", timestamp: "Hace 2h", meta: "Rol: Comercial" },
  { type: "contrato", title: "Contrato #CTR-124 firmado por 'Logística Total'", timestamp: "Ayer", meta: "Estado: Activo" },
];

const alerts = [
    { title: "5 Leads sin contactar por más de 3 días", cta: "Revisar ahora" },
    { title: "2 Facturas a punto de vencer", cta: "Contactar clientes" },
    { title: "Usuario 'Juan Pérez' inactivo por 30 días", cta: "Ver perfil" },
]

const activityIcons = {
  lead: <Contact className="h-4 w-4" />,
  factura: <FileText className="h-4 w-4" />,
  pago: <CreditCard className="h-4 w-4" />,
  usuario: <Users className="h-4 w-4" />,
  contrato: <ClipboardList className="h-4 w-4" />,
};


export default function Dashboard() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/80">
        <SidebarHeader className="flex items-center gap-2.5 p-4">
          <SolYCieloLogo className="h-8 w-8" />
          <h2 className="text-xl font-semibold tracking-tight font-headline group-data-[collapsible=icon]:hidden">
            Sol & Cielo
          </h2>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutDashboard />
                <span className="truncate">Home General</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Contact />
                <span className="truncate">Gestión de Leads</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Users />
                <span className="truncate">Gestión de Usuarios</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FileText />
                <span className="truncate">Gestión de Facturas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BarChart />
                <span className="truncate">Reportes y Análisis</span>
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
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
           <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar en todo el CRM..."
              className="w-full rounded-lg bg-background pl-10 md:w-[200px] lg:w-[320px] h-10"
            />
          </div>
          <div className="ml-auto flex items-center gap-4">
             <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
                <PlusCircle className="h-4 w-4" />
                Crear Lead
              </Button>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notificaciones</span>
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                  <Avatar className="h-9 w-9">
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

        <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6 overflow-auto bg-muted/40">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-headline tracking-tight">Home General</h1>
          </div>
          
          {/* KPI Strip */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10">
                    {kpi.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="flex justify-between items-center text-xs">
                    <p className="text-muted-foreground">{kpi.delta}</p>
                    <Link href="#" className="font-medium text-primary hover:underline flex items-center gap-1">
                      {kpi.cta} <ChevronRight className="h-3 w-3"/>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                {/* Quick Access */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">Accesos Rápidos</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {quickAccess.map((item) => (
                         <Link key={item.title} href={item.href} className="group">
                            <Card className="h-full hover:border-primary transition-colors">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                                        <CardDescription>{item.description}</CardDescription>
                                    </div>
                                    <ChevronRight className="h-5 w-5 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                                </CardHeader>
                            </Card>
                         </Link>
                       ))}
                    </CardContent>
                </Card>
                
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">Actividad Reciente Global</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-4">
                    {recentActivities.map((activity, i) => (
                        <div key={i} className="flex items-start gap-4">
                        <div className="bg-muted p-2 rounded-full mt-1">
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
            </div>
            {/* Side column */}
            <div className="space-y-6">
                {/* Alerts */}
                <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800">
                    <CardHeader>
                        <CardTitle className="font-headline text-lg flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                            <AlertTriangle className="h-5 w-5" />
                            Alertas y Recordatorios
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {alerts.map((alert, i) => (
                                <li key={i} className="flex items-center justify-between text-sm">
                                    <p className="text-yellow-900 dark:text-yellow-200">{alert.title}</p>
                                    <Link href="#" className="font-semibold text-primary hover:underline text-xs">
                                        {alert.cta}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                 <ConversionRateChart />
            </div>
          </div>
        </main>
        <footer className="px-6 py-3 border-t text-xs text-muted-foreground text-center">
            Sol & Cielo CRM v2.0 | Contacto para soporte: <a href="mailto:automations@sol-cielo.com" className="text-primary hover:underline">automations@sol-cielo.com</a>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
