'use client';
import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart,
  Bell,
  Building,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Contact,
  CreditCard,
  FileText,
  Filter,
  GripVertical,
  LayoutDashboard,
  MoreHorizontal,
  Phone,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Star,
  Users,
  Video,
  X,
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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

const kpis = [
  { title: "Leads Nuevos (Semana)", value: "28", delta: "+12%", trend: "up" },
  { title: "Leads por Visitar", value: "15", delta: "3 Prioridad Alta", trend: "stale" },
  { title: "Cotizaciones Activas", value: "42", delta: "Valor: $82.5M", trend: "up" },
  { title: "Cierres del Mes", value: "12", delta: "+2 vs mes anterior", trend: "up" },
];

const pipelineColumns = [
  { id: 'nuevo', title: 'Nuevo (8)', leads: [
    { id: 'lead-1', name: 'Constructora S.A.S', city: 'Bogotá D.C.', lastContact: 'Hace 2h', priority: 'alta', ownerAvatar: 'https://picsum.photos/seed/101/40/40' },
    { id: 'lead-2', name: 'Industrias ABC', city: 'Medellín', lastContact: 'Ayer', priority: 'media', ownerAvatar: 'https://picsum.photos/seed/102/40/40' },
  ]},
  { id: 'por-visitar', title: 'Por Visitar (5)', leads: [
    { id: 'lead-3', name: 'Mercacentro', city: 'Ibagué', lastContact: 'Hace 3d', priority: 'alta', ownerAvatar: 'https://picsum.photos/seed/103/40/40' },
  ]},
  { id: 'por-cotizar', title: 'Por Cotizar (12)', leads: [
    { id: 'lead-4', name: 'Logística Total', city: 'Cali', lastContact: 'Hace 1d', priority: 'media', ownerAvatar: 'https://picsum.photos/seed/101/40/40' },
    { id: 'lead-5', name: 'Hospital San Rafael', city: 'Bogotá D.C.', lastContact: 'Hace 4d', priority: 'baja', ownerAvatar: 'https://picsum.photos/seed' },
    { id: 'lead-6', name: 'Colegio Bilingüe', city: 'Medellín', lastContact: 'Hace 5d', priority: 'media', ownerAvatar: 'https://picsum.photos/seed/102/40/40' },
  ]},
  { id: 'por-contratar', title: 'Por Contratar (3)', leads: [
    { id: 'lead-7', name: 'Centro Comercial Oasis', city: 'Cartagena', lastContact: 'Hace 1 semana', priority: 'alta', ownerAvatar: 'https://picsum.photos/seed/103/40/40' },
  ]},
  { id: 'cerrado', title: 'Cerrado / No Interesado (2)', leads: [] },
]

const priorityStyles = {
  alta: 'bg-red-500/20 text-red-700 border-red-500/30',
  media: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
  baja: 'bg-green-500/20 text-green-700 border-green-500/30'
}

type Lead = typeof pipelineColumns[0]['leads'][0];

const LeadDetailSidebar = ({ lead, onClose }: { lead: Lead | null; onClose: () => void }) => {
    if (!lead) return null;
    const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

    return (
        <Sheet open={!!lead} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-md p-0 flex flex-col" side="right">
                <SheetHeader className="p-6 pb-2">
                    <div className='flex items-center gap-4'>
                         <Avatar className="h-12 w-12 border-2 border-primary">
                            <AvatarImage src={lead.ownerAvatar} />
                            <AvatarFallback>{lead.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <div>
                             <SheetTitle className="text-2xl font-bold font-headline">{lead.name}</SheetTitle>
                            <p className="text-muted-foreground">{lead.city}</p>
                        </div>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    <div className='flex items-center gap-2'>
                        <Badge className={`${priorityStyles[lead.priority as keyof typeof priorityStyles]}`}>{`Prioridad ${lead.priority}`}</Badge>
                        <Badge variant="secondary">Estado: Nuevo</Badge>
                    </div>

                    <Card>
                        <CardHeader className='pb-2'>
                            <CardTitle className='text-sm font-semibold'>Información de Contacto</CardTitle>
                        </CardHeader>
                        <CardContent className='text-sm space-y-2'>
                            <p><strong>Teléfono:</strong> 310 123 4567</p>
                             <p><strong>Email:</strong> contacto@constructora.com</p>
                             <p><strong>Fuente:</strong> Referido</p>
                        </CardContent>
                    </Card>

                    <Separator />

                    <div>
                        <h3 className="text-sm font-semibold mb-2">Próxima Acción</h3>
                        <div className="flex items-center text-sm p-3 bg-muted rounded-md">
                            <Video className="h-5 w-5 mr-3 text-primary" />
                            <div>
                                <p className="font-medium">Visita comercial</p>
                                <p className="text-muted-foreground">Mañana, 10:00 AM</p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-semibold mb-2">Actividad Reciente</h3>
                        <div className="space-y-4 text-xs">
                             <div className="flex items-start gap-3">
                                <div className="bg-muted p-2 rounded-full mt-1">
                                    <Phone className="h-3 w-3" />
                                </div>
                                <p><span className="font-semibold">Llamada inicial</span> con 'Carlos Ruiz'. Cliente interesado en energía solar. <span className="text-muted-foreground">Hace 2h</span></p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-muted p-2 rounded-full mt-1">
                                    <Contact className="h-3 w-3" />
                                </div>
                                <p><span className="font-semibold">Lead creado</span> por 'Admin'. Asignado a 'Carlos Ruiz'. <span className="text-muted-foreground">Hace 3h</span></p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                     <div>
                        <h3 className="text-sm font-semibold mb-2">Documentos</h3>
                        <div className="space-y-2">
                             <a href="#" className="flex items-center text-sm p-3 bg-muted rounded-md hover:bg-primary/10 transition-colors">
                                <FileText className="h-5 w-5 mr-3 text-primary" />
                                <span>RUT_Constructora_SAS.pdf</span>
                                <ChevronRight className="h-4 w-4 ml-auto"/>
                            </a>
                        </div>
                    </div>

                </div>
                <div className="p-4 border-t bg-background flex gap-2">
                    <Button variant="outline" className="flex-1"><Phone className="mr-2 h-4 w-4"/> Llamar</Button>
                    <Button className="flex-1"><Plus className="mr-2 h-4 w-4"/> Agendar Visita</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

const LeadCard = ({ lead, onClick }: { lead: Lead, onClick: () => void }) => {
    return (
      <Card className="mb-2 cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
        <CardContent className="p-3">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-sm">{lead.name}</h4>
            <Badge variant="outline" className={`text-xs ${priorityStyles[lead.priority as keyof typeof priorityStyles]}`}>
              {lead.priority}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{lead.city}</p>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={lead.ownerAvatar} />
                <AvatarFallback>CR</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{lead.lastContact}</span>
            </div>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
};

export default function LeadsPage() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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
              <Link href="/">
                <SidebarMenuButton>
                  <LayoutDashboard />
                  <span className="truncate">Home General</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/leads">
                <SidebarMenuButton isActive>
                  <Contact />
                  <span className="truncate">Gestión de Leads</span>
                </SidebarMenuButton>
              </Link>
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
           <div className="hidden md:flex text-sm items-center gap-2 text-muted-foreground">
             <Link href="/" className="hover:text-foreground">Home</Link>
             <ChevronRight className="h-4 w-4"/>
             <span className="font-semibold text-foreground">Gestión de Leads</span>
           </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Buscar por nombre o teléfono..."
                className="w-full rounded-lg bg-background pl-10 md:w-[200px] lg:w-[320px] h-10"
                />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
                <Filter className="h-4 w-4" />
                Filtros
                <ChevronDown className="h-4 w-4" />
              </Button>
             <Button size="sm" className="gap-1.5">
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

        <main className="flex-1 flex flex-col bg-muted/40">
            {/* KPIs */}
            <div className="p-4 lg:p-6 border-b">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {kpis.map((kpi) => (
                    <Card key={kpi.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <p className={`text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-muted-foreground'}`}>{kpi.delta}</p>
                    </CardContent>
                    </Card>
                ))}
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 flex overflow-x-auto">
                <div className="flex gap-4 p-4 lg:p-6 min-w-max">
                    {pipelineColumns.map((column) => (
                        <div key={column.id} className="w-72 bg-card rounded-lg flex flex-col">
                            <div className="p-3 font-semibold text-sm border-b flex items-center justify-between">
                                <span>{column.title}</span>
                                <GripVertical className="h-4 w-4 text-muted-foreground"/>
                            </div>
                            <div className="p-2 flex-1 overflow-y-auto">
                                {column.leads.map((lead) => (
                                    <LeadCard key={lead.id} lead={lead} onClick={() => setSelectedLead(lead)} />
                                ))}
                                {column.leads.length === 0 && (
                                    <div className="p-4 text-center text-xs text-muted-foreground">
                                        No hay leads en esta etapa.
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <LeadDetailSidebar lead={selectedLead} onClose={() => setSelectedLead(null)} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
