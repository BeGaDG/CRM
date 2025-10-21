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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const leadExample = { 
  id: 'lead-1', 
  name: 'Constructora S.A.S', 
  city: 'Bogotá D.C.', 
  lastContact: 'Hace 2h', 
  priority: 'alta', 
  ownerAvatar: 'https://picsum.photos/seed/101/40/40',
  status: 'Por Visitar',
  phone: '310 123 4567',
  email: 'contacto@constructora.com'
};
type Lead = typeof leadExample;

const stages = [
  { name: 'Nuevo Cliente', count: 8, color: 'bg-sky-500' },
  { name: 'Por Contactar', count: 5, color: 'bg-cyan-500' },
  { name: 'Por Visitar', count: 3, color: 'bg-blue-500' },
  { name: 'Por Cotizar', count: 12, color: 'bg-indigo-500' },
  { name: 'Por Presentar Cotización', count: 4, color: 'bg-violet-500' },
  { name: 'Por Recotizar', count: 2, color: 'bg-purple-500' },
  { name: 'Por Seguimiento', count: 7, color: 'bg-fuchsia-500' },
  { name: 'Por Contratar', count: 1, color: 'bg-pink-500' },
  { name: 'Recaptura BD', count: 150, color: 'bg-rose-500' },
  { name: 'Finalizados', count: 320, color: 'bg-green-500' },
];

const leadsData: Lead[] = [
    { id: 'lead-1', name: 'Constructora S.A.S', city: 'Bogotá D.C.', lastContact: 'Hace 2h', priority: 'alta', ownerAvatar: 'https://picsum.photos/seed/101/40/40', status: 'Por Visitar', phone: '310 123 4567', email: 'contacto@constructora.com' },
    { id: 'lead-2', name: 'Inversiones XYZ', city: 'Medellín', lastContact: 'Ayer', priority: 'media', ownerAvatar: 'https://picsum.photos/seed/102/40/40', status: 'Por Visitar', phone: '312 987 6543', email: 'gerencia@inversionesxyz.co' },
    { id: 'lead-3', name: 'Logística Total', city: 'Cali', lastContact: 'Hace 3 días', priority: 'baja', ownerAvatar: 'https://picsum.photos/seed/103/40/40', status: 'Por Visitar', phone: '315 555 8888', email: 'logistica.total@email.com' },
];

const LeadCard = ({ lead, isSelected, onClick }: { lead: Lead, isSelected: boolean, onClick: () => void}) => {
    const priorityColors = {
        alta: 'bg-red-500',
        media: 'bg-yellow-500',
        baja: 'bg-green-500',
    };
    return (
        <Card onClick={onClick} className={cn("cursor-pointer hover:shadow-md transition-shadow", isSelected && "border-primary ring-2 ring-primary")}>
            <CardContent className="p-4 flex gap-4">
                <div className={`w-1.5 rounded-full ${priorityColors[lead.priority as keyof typeof priorityColors]}`}></div>
                <div className='flex-1'>
                    <div className='flex justify-between items-start'>
                        <div>
                            <p className="font-semibold text-sm">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.city}</p>
                        </div>
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={lead.ownerAvatar} />
                            <AvatarFallback>{lead.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex justify-between items-center mt-3 text-xs'>
                        <span className='text-muted-foreground'>Últ. contacto: {lead.lastContact}</span>
                        <Badge variant="secondary" className='font-normal'>{lead.status}</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const LeadDetailPanel = ({ lead, onClose, onUpdateStatus }: { lead: Lead | null; onClose: () => void; onUpdateStatus: () => void; }) => {
    if (!lead) return <Card className="hidden lg:block"><CardContent className='p-6 flex flex-col items-center justify-center h-full text-center text-muted-foreground'><Contact className="h-12 w-12 mb-4" /> <p className='font-medium'>Selecciona un lead</p><p className='text-sm'>Elige un lead de la lista para ver sus detalles completos aquí.</p></CardContent></Card>;

    return (
        <Card className="flex flex-col h-full relative">
            <Button variant="ghost" size="icon" className="lg:hidden absolute top-2 right-2 z-10" onClick={onClose}><X className="h-4 w-4"/></Button>
            <CardHeader className="flex-row items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={lead.ownerAvatar} />
                    <AvatarFallback>{lead.name.substring(0,2)}</AvatarFallback>
                </Avatar>
                <div>
                     <CardTitle className="text-xl font-bold font-headline">{lead.name}</CardTitle>
                    <p className="text-muted-foreground">{lead.city}</p>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <Tabs defaultValue="resumen" className="h-full flex flex-col">
                    <TabsList className="mx-4 mt-2">
                        <TabsTrigger value="resumen">Resumen</TabsTrigger>
                        <TabsTrigger value="actividad">Actividad</TabsTrigger>
                        <TabsTrigger value="documentos">Documentos</TabsTrigger>
                    </TabsList>
                    <div className='overflow-y-auto flex-1'>
                        <TabsContent value="resumen" className="p-4 space-y-4 text-sm">
                            <div className='flex items-center gap-2'>
                                <Button onClick={onUpdateStatus} size="sm" variant="outline" className="flex-1">
                                    <GitMerge className="mr-2 h-4 w-4"/>
                                    Actualizar Estado
                                </Button>
                            </div>
                            <Separator/>
                             <p><strong>Teléfono:</strong> {lead.phone}</p>
                             <p><strong>Email:</strong> {lead.email}</p>
                             <p><strong>Fuente:</strong> Referido</p>
                             <Separator/>
                             <h3 className="text-sm font-semibold">Próxima Acción</h3>
                             <div className="flex items-center text-sm p-3 bg-muted rounded-md">
                                <Phone className="h-5 w-5 mr-3 text-primary" />
                                <div>
                                    <p className="font-medium">Primer Contacto</p>
                                    <p className="text-muted-foreground">Pendiente</p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="actividad" className="p-4 space-y-4 text-xs">
                             <div className="flex items-start gap-3">
                                <div className="bg-muted p-2 rounded-full mt-1">
                                    <Contact className="h-3 w-3" />
                                </div>
                                <p><span className="font-semibold">Lead creado</span> por 'Admin'. Asignado a 'Carlos Ruiz'. <span className="text-muted-foreground">Hace 3h</span></p>
                            </div>
                        </TabsContent>
                        <TabsContent value="documentos" className="p-4 space-y-2">
                             <a href="#" className="flex items-center text-sm p-3 bg-muted rounded-md hover:bg-primary/10 transition-colors">
                                <FileText className="h-5 w-5 mr-3 text-primary" />
                                <span>RUT_Constructora_SAS.pdf</span>
                                <ChevronRight className="h-4 w-4 ml-auto"/>
                            </a>
                        </TabsContent>
                    </div>
                </Tabs>
            </CardContent>
            <div className="p-4 border-t bg-background flex gap-2">
                <Button variant="outline" className="flex-1"><Phone className="mr-2 h-4 w-4"/> Llamar</Button>
                <Button className="flex-1"><Plus className="mr-2 h-4 w-4"/> Agendar Visita</Button>
            </div>
        </Card>
    )
}

const UpdateStatusSheet = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) => (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Actualizar Estado del Lead</SheetTitle>
                <SheetDescription>
                    Selecciona la nueva etapa para este lead. Esto moverá el lead en el pipeline y registrará la actividad.
                </SheetDescription>
            </SheetHeader>
            <div className="py-4">
                <p className="text-sm text-muted-foreground mb-2">Etapas disponibles</p>
                <ul className="space-y-2">
                    {stages.map(stage => (
                        <li key={stage.name}>
                            <button className="w-full text-left p-3 rounded-md border hover:bg-muted transition-colors flex items-center gap-3">
                                <span className={cn("h-3 w-3 rounded-full", stage.color)}></span>
                                <span className="font-medium text-sm">{stage.name}</span>
                                <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground"/>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </SheetContent>
    </Sheet>
)


export default function LeadsPage() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activeStage, setActiveStage] = useState('Por Visitar');
  const [isSheetOpen, setSheetOpen] = useState(false);

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

        <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 lg:p-6 bg-muted/40 overflow-hidden">
            {/* Left Column: Stages */}
            <Card className="hidden lg:flex flex-col">
                <CardHeader>
                    <CardTitle className="text-lg">Etapas del Flujo</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto -mt-2">
                    <ul className='space-y-1'>
                        {stages.map(stage => (
                            <li key={stage.name}>
                                <button
                                    onClick={() => setActiveStage(stage.name)}
                                    className={cn(
                                        "w-full text-left p-2 rounded-md text-sm flex justify-between items-center transition-colors",
                                        activeStage === stage.name
                                            ? "bg-primary/10 text-primary font-semibold"
                                            : "hover:bg-muted/80"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={cn("h-2 w-2 rounded-full", stage.color)}></span>
                                        <span>{stage.name}</span>
                                    </div>
                                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", activeStage === stage.name ? "bg-primary/20" : "bg-muted")}>{stage.count}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Center Column: Leads List */}
            <div className={cn("lg:col-span-2 xl:col-span-2 flex flex-col gap-4", selectedLead && "hidden lg:flex")}>
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-semibold'>Leads en: {activeStage} ({leadsData.length})</h2>
                </div>
                <div className="lg:hidden">
                    <Select value={activeStage} onValueChange={setActiveStage}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar etapa..." />
                        </SelectTrigger>
                        <SelectContent>
                            {stages.map(stage => (
                                <SelectItem key={stage.name} value={stage.name}>
                                    <div className="flex items-center gap-2">
                                        <span className={cn("h-2 w-2 rounded-full", stage.color)}></span>
                                        <span>{stage.name} ({stage.count})</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className='space-y-3 overflow-y-auto'>
                    {leadsData.map(lead => (
                       <LeadCard 
                        key={lead.id} 
                        lead={lead} 
                        isSelected={selectedLead?.id === lead.id}
                        onClick={() => setSelectedLead(lead)} 
                       />
                    ))}
                </div>
            </div>

            {/* Right Column: Lead Detail */}
            <div className={cn("xl:col-span-1", !selectedLead && "hidden lg:block")}>
                 {selectedLead ? (
                    <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} onUpdateStatus={() => setSheetOpen(true)} />
                ) : (
                    <div className='hidden xl:block'>
                        <LeadDetailPanel lead={null} onClose={() => {}} onUpdateStatus={() => {}} />
                    </div>
                )}
            </div>
            {/* This Sheet is used to update the lead status */}
            <UpdateStatusSheet isOpen={isSheetOpen} onOpenChange={setSheetOpen} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}