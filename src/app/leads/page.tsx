'use client';
import { useState, useMemo } from 'react';
import {
  ChevronRight,
  Contact,
  FileText,
  Filter,
  LayoutDashboard,
  PlusCircle,
  Search,
  Settings,
  Users,
  BarChart,
  Bell,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { LeadCard } from '@/components/leads/lead-card';
import { LeadDetailPanel } from '@/components/leads/lead-detail-panel';
import { NewLeadForm } from '@/components/leads/new-lead-form';
import type { Lead } from '@/components/leads/lead-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


export const stages = [
  { name: 'Nuevo Cliente', color: 'bg-sky-500' },
  { name: 'Por Contactar', color: 'bg-cyan-500' },
  { name: 'Por Visitar', color: 'bg-blue-500' },
  { name: 'Por Cotizar', color: 'bg-indigo-500' },
  { name: 'Por Presentar Cotización', color: 'bg-violet-500' },
  { name: 'Ajustar Cotización', color: 'bg-purple-500' },
  { name: 'Seguimiento a la Cotización', color: 'bg-fuchsia-500' },
  { name: 'Por Contratar', color: 'bg-pink-500' },
  { name: 'Recaptura BD', color: 'bg-rose-500' },
  { name: 'Finalizados', color: 'bg-green-500' },
  { name: 'No', color: 'bg-gray-500' }
];

const today = new Date();
const threeDaysAgo = new Date();
threeDaysAgo.setDate(today.getDate() - 3);

const initialLeads: Lead[] = [
  { id: 'lead-1', name: 'Constructora S.A.S', city: 'Bogotá D.C.', lastContact: 'Hace 2h', priority: 'alta', interestType: 'planta-solar', status: 'Por Visitar', phone: '310 123 4567', email: 'contacto@constructora.com', creationDate: new Date().toISOString(), collectedData: { 'nic': '123456-7', 'consumo': '15000 kWh', 'valor_cotizacion': 0, 'potencia_pico': '' } },
  { id: 'lead-2', name: 'Inversiones XYZ', city: 'Medellín', lastContact: 'Ayer', priority: 'media', interestType: 'comercializadora', status: 'Por Visitar', phone: '312 987 6543', email: 'gerencia@inversionesxyz.co', creationDate: new Date().toISOString(), collectedData: {} },
  { id: 'lead-3', name: 'Logística Total', city: 'Cali', lastContact: 'Hace 3 días', priority: 'baja', interestType: 'ambos', status: 'Por Visitar', phone: '315 555 8888', email: 'logistica.total@email.com', creationDate: new Date().toISOString(), collectedData: {} },
  { id: 'lead-4', name: 'Nuevo Cliente Alfa (Urgente)', city: 'Barranquilla', lastContact: 'Hace 4 días', priority: 'alta', interestType: 'planta-solar', status: 'Nuevo Cliente', phone: '318 111 2233', email: 'alfa@cliente.com', creationDate: threeDaysAgo.toISOString(), collectedData: {} },
  { id: 'lead-5', name: 'Contacto Pendiente Beta', city: 'Cartagena', lastContact: 'Hace 5h', priority: 'media', interestType: 'comercializadora', status: 'Por Contactar', phone: '317 444 5566', email: 'beta@contacto.com', creationDate: new Date().toISOString(), collectedData: {} },
  { id: 'lead-6', name: 'Cotización Gamma', city: 'Bogotá D.C.', lastContact: 'Hace 2 días', priority: 'baja', interestType: 'planta-solar', status: 'Por Cotizar', phone: '316 777 8899', email: 'gamma@cotizacion.com', creationDate: new Date().toISOString(), collectedData: {'nic': '987654-3', 'consumo': '8000 kWh'} },
  { id: 'lead-7', name: 'Presentación Delta', city: 'Medellín', lastContact: 'Hoy', priority: 'alta', interestType: 'ambos', status: 'Por Presentar Cotización', phone: '319 000 1122', email: 'delta@presentacion.com', creationDate: new Date().toISOString(), collectedData: {'nic': '555444-1', 'consumo': '25000 kWh', 'valor_cotizacion': 120000000, 'potencia_pico': '50kWp' } },
  { id: 'lead-8', name: 'Contrato Epsilon', city: 'Cali', lastContact: 'Hace 1 semana', priority: 'alta', interestType: 'comercializadora', status: 'Por Contratar', phone: '314 333 4455', email: 'epsilon@contrato.com', creationDate: new Date().toISOString(), collectedData: {} },
];


export default function LeadsPage() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isNewLeadFormOpen, setIsNewLeadFormOpen] = useState(false);

  const [filterStage, setFilterStage] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdateStatus = (stage: string) => {
     if (selectedLead) {
      const updatedLeads = leads.map(lead =>
        lead.id === selectedLead.id ? { ...lead, status: stage, lastContact: 'Ahora' } : lead
      );
      setLeads(updatedLeads);

      const updatedSelectedLead = { ...selectedLead, status: stage, lastContact: 'Ahora' };
      setSelectedLead(updatedSelectedLead);
    }
  };

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleSaveLead = (newLeadData: Partial<Lead>) => {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        name: newLeadData.name || 'Nuevo Lead',
        city: newLeadData.city || 'Por definir',
        lastContact: 'Ahora',
        priority: 'media',
        interestType: newLeadData.interestType || 'planta-solar',
        status: 'Nuevo Cliente',
        phone: newLeadData.phone || 'N/A',
        email: newLeadData.email || 'N/A',
        creationDate: new Date().toISOString(),
        collectedData: {},
      };
      setLeads([newLead, ...leads]);
  };

  const handleSaveStageData = (stage: string, data: any) => {
    if (selectedLead) {
      const updatedLeads = leads.map(l => {
        if (l.id === selectedLead.id) {
          return {
            ...l,
            collectedData: {
              ...l.collectedData,
              ...data,
            },
          };
        }
        return l;
      });
      setLeads(updatedLeads);

      const updatedSelectedLead = {
        ...selectedLead,
        collectedData: {
          ...selectedLead.collectedData,
          ...data,
        },
      };
      setSelectedLead(updatedSelectedLead);
    }
    console.log(`Saving draft data for stage "${stage}"`, data);
  };
  
  const handleDetailClose = () => {
    setSelectedLead(null);
  }

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
        const stageMatch = filterStage === 'all' || lead.status === filterStage;
        const searchMatch = !searchTerm || 
                              lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              lead.phone.includes(searchTerm);
        return stageMatch && searchMatch;
    });
  }, [leads, filterStage, searchTerm]);
  
  const stageCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: leads.length };
    stages.forEach(stage => {
      counts[stage.name] = leads.filter(lead => lead.status === stage.name).length;
    });
    return counts;
  }, [leads]);


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
              <Link href="/users">
                <SidebarMenuButton>
                  <Users />
                  <span className="truncate">Gestión de Usuarios</span>
                </SidebarMenuButton>
              </Link>
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
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-foreground">Gestión de Leads</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button size="sm" className="gap-1.5" onClick={() => setIsNewLeadFormOpen(true)}>
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

        <main className="flex-1 flex flex-col gap-4 p-4 lg:p-6 bg-muted/40 overflow-hidden">
          {/* Top Filters */}
           <div className='flex flex-col md:flex-row gap-4'>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nombre o teléfono..."
                className="w-full rounded-lg bg-background pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex gap-2'>
              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger className="h-10 w-full md:w-[200px]">
                  <SelectValue placeholder="Filtrar por etapa..." />
                </SelectTrigger>
                <SelectContent>
                   <SelectItem value="all">Todos los Leads ({stageCounts['all'] || 0})</SelectItem>
                  {stages.map((stage) => (
                    <SelectItem key={stage.name} value={stage.name}>
                       {stage.name} ({stageCounts[stage.name] || 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
               <Button variant="outline" className="gap-1.5 h-10">
                <Filter className="h-4 w-4" />
                <span className='hidden sm:inline'>Más Filtros</span>
              </Button>
            </div>
          </div>

          {/* Leads List */}
          <div className='flex-1 space-y-3 overflow-y-auto'>
              {filteredLeads.map(lead => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onClick={() => handleSelectLead(lead)}
                  isSelected={selectedLead?.id === lead.id}
                />
              ))}
              {filteredLeads.length === 0 && (
                  <div className="text-center text-muted-foreground py-20">
                      <Contact className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <p className="font-medium text-lg">No se encontraron leads</p>
                      <p className='text-base'>Intenta ajustar tu búsqueda o filtros.</p>
                  </div>
              )}
          </div>
        </main>

        {/* Sheet for new lead form */}
        <NewLeadForm open={isNewLeadFormOpen} onOpenChange={setIsNewLeadFormOpen} onSave={handleSaveLead} />

        {/* Sheet for lead detail */}
        <Sheet open={!!selectedLead} onOpenChange={(isOpen) => { if (!isOpen) handleDetailClose() }}>
          <SheetContent className="p-0 sm:max-w-2xl w-full flex flex-col">
            <LeadDetailPanel
              lead={selectedLead}
              onUpdateStatus={handleUpdateStatus}
              onSaveStageData={handleSaveStageData}
            />
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}

    