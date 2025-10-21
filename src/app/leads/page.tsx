'use client';
import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
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
  GitMerge,
  GripVertical,
  LayoutDashboard,
  MoreHorizontal,
  Phone,
  Plus,
  PlusCircle,
  RefreshCcw,
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
import { cn } from '@/lib/utils';


const kpis = [
  { title: "Leads Nuevos (Semana)", value: "28", delta: "+12%", trend: "up" },
  { title: "Leads por Visitar", value: "15", delta: "3 Prioridad Alta", trend: "stale" },
  { title: "Cotizaciones Activas", value: "42", delta: "Valor: $82.5M", trend: "up" },
  { title: "Cierres del Mes", value: "12", delta: "+2 vs mes anterior", trend: "up" },
];

const leadExample = { id: 'lead-1', name: 'Constructora S.A.S', city: 'Bogotá D.C.', lastContact: 'Hace 2h', priority: 'alta', ownerAvatar: 'https://picsum.photos/seed/101/40/40' };
type Lead = typeof leadExample;

const LeadDetailSidebar = ({ lead, onClose }: { lead: Lead | null; onClose: () => void }) => {
    if (!lead) return null;

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
                        <Badge variant="secondary">Estado: Nuevo Cliente</Badge>
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
                            <Phone className="h-5 w-5 mr-3 text-primary" />
                            <div>
                                <p className="font-medium">Primer Contacto</p>
                                <p className="text-muted-foreground">Pendiente</p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-semibold mb-2">Actividad Reciente</h3>
                        <div className="space-y-4 text-xs">
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

const LeadStageCard = ({ title, description, icon, leadCount, isActive, onClick }: { title: string, description: string, icon: React.ReactNode, leadCount?: number, isActive?: boolean, onClick?: () => void }) => (
  <Card className={cn("w-64 h-40 flex flex-col hover:shadow-lg transition-shadow cursor-pointer", isActive && "border-primary shadow-lg")}>
    <CardHeader className="pb-2" onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className={cn("h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary", isActive && "bg-primary text-primary-foreground")}>
          {icon}
        </div>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="flex-1 pb-4 text-sm text-muted-foreground" onClick={onClick}>
      {description}
    </CardContent>
    {leadCount !== undefined && (
      <CardContent className="py-2 border-t text-xs font-medium">
        {leadCount} leads en esta etapa
      </CardContent>
    )}
  </Card>
);

const DecisionNode = () => (
  <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full transform rotate-45">
    <GitMerge className="h-6 w-6 text-gray-600 dark:text-gray-300 transform -rotate-45" />
  </div>
);

const FlowConnector = ({ label, isDashed }: { label?: string, isDashed?: boolean }) => (
  <div className="relative w-20 h-full flex items-center justify-center">
    <div className={cn("w-full h-0.5", isDashed ? "bg-none border-t-2 border-dashed border-gray-300" : "bg-gray-300")}></div>
    <ArrowRight className="absolute right-[-10px] h-5 w-5 text-gray-400" />
    {label && <span className="absolute -top-5 text-xs font-medium text-muted-foreground">{label}</span>}
  </div>
);


export default function LeadsPage() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/80">
        <SidebarHeader className="flex items-center gap-2.5 p-4">
          <SolYCieloLogo className="h-8 w-8" />
          <h2 className="text-xl font-semibold tracking-tight font-headline group-data-[collapsible=icon]:hidden">
            Sol &amp; Cielo
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

        <main className="flex-1 flex flex-col bg-muted/40 p-4 lg:p-6">
            {/* KPIs */}
            <div className="pb-6 border-b">
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

            {/* Flowchart */}
            <div className="flex-1 flex items-center justify-center overflow-x-auto py-8">
              <div className="flex items-center gap-4">
                {/* Stage 1 */}
                <LeadStageCard 
                  title="Nuevo Cliente" 
                  description="Lead recién ingresado al sistema." 
                  icon={<Plus />}
                  leadCount={8}
                  isActive
                  onClick={() => setSelectedLead(leadExample)}
                />
                <FlowConnector />
                {/* Stage 2 */}
                <LeadStageCard 
                  title="Por Contactar" 
                  description="Llamada o correo de primer contacto." 
                  icon={<Phone />}
                  leadCount={5}
                />
                <FlowConnector />
                {/* Decision 1 */}
                <div className="flex flex-col items-center gap-4">
                    <DecisionNode />
                    <div className="flex items-center">
                        <FlowConnector label="Sí" />
                        <LeadStageCard 
                          title="Por Visitar" 
                          description="Agendar y realizar visita comercial." 
                          icon={<Video />}
                          leadCount={3}
                        />
                        <FlowConnector />
                        <LeadStageCard 
                          title="Por Cotizar" 
                          description="Preparar y enviar la cotización." 
                          icon={<FileText />}
                          leadCount={12}
                        />
                    </div>
                     <div className="flex items-center self-start ml-24 mt-4">
                         <div className="h-10 w-0.5 bg-gray-300"></div>
                         <FlowConnector label="No" isDashed/>
                         <LeadStageCard
                          title="Recaptura BD"
                          description="Leads fríos para seguimiento futuro."
                          icon={<RefreshCcw />}
                          leadCount={150}
                        />
                     </div>
                </div>
              </div>
            </div>
            
            <LeadDetailSidebar lead={selectedLead} onClose={() => setSelectedLead(null)} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
