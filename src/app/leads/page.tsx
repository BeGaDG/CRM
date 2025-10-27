
'use client';
import { useState, useMemo } from 'react';
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  ChevronRight,
  Contact,
  FileText,
  Filter,
  PlusCircle,
  Search,
  Users,
  BarChart,
  Bell,
  Calendar as CalendarIcon,
  Upload,
} from 'lucide-react';
import Link from 'next/link';

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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ImportLeadsSheet } from '@/components/leads/import-leads-sheet';
import { stages, advisors, initialLeads } from '@/lib/data/leads-data';
import type { Stage } from '@/lib/data/leads-data';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isNewLeadFormOpen, setIsNewLeadFormOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isImportSheetOpen, setIsImportSheetOpen] = useState(false);

  const [filterStage, setFilterStage] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

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
  
   const handleAssignLead = (advisorId: string) => {
    if (selectedLead) {
      const advisor = advisors.find(a => a.id === advisorId);
      if (advisor) {
        const updatedLeads = leads.map(lead =>
          lead.id === selectedLead.id ? { ...lead, advisorId: advisor.id, advisorName: advisor.name, lastContact: 'Ahora' } : lead
        );
        setLeads(updatedLeads);

        const updatedSelectedLead = { ...selectedLead, advisorId: advisor.id, advisorName: advisor.name, lastContact: 'Ahora' };
        setSelectedLead(updatedSelectedLead);
      }
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
        interestType: newLeadData.interestType || 'planta-solar',
        status: 'Nuevo Cliente',
        phone: newLeadData.phone || 'N/A',
        email: newLeadData.email || 'N/A',
        creationDate: new Date().toISOString(),
        collectedData: {},
        advisorId: 'user-1', // Default assignment
        advisorName: 'Carlos Ruiz',
      };
      setLeads([newLead, ...leads]);
  };
  
  const handleImportLeads = (importedLeads: Lead[]) => {
    // NOTE: This is a placeholder. In a real app, you would parse the Excel file
    // and create new lead objects.
    const newLeads: Lead[] = importedLeads.map((lead, index) => ({
      ...lead,
      id: `imported-lead-${Date.now()}-${index}`,
      lastContact: 'Ahora',
      status: 'Nuevo Cliente',
      creationDate: new Date().toISOString(),
      collectedData: {},
      advisorId: 'user-1', // Default assignment
      advisorName: 'Carlos Ruiz',
    }));
    setLeads([...newLeads, ...leads]);
    setIsImportSheetOpen(false);
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
        
        const dateMatch = !dateRange || (
            (lead.creationDate >= (dateRange.from?.toISOString() || '')) &&
            (lead.creationDate <= (dateRange.to?.toISOString() || new Date().toISOString()))
        );

        return stageMatch && searchMatch && dateMatch;
    });
  }, [leads, filterStage, searchTerm, dateRange]);
  
  const stageCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: leads.length };
    stages.forEach(stage => {
      counts[stage.name] = leads.filter(lead => lead.status === stage.name).length;
    });
    return counts;
  }, [leads]);


  return (
    <DashboardLayout>
      <main className="flex-1 flex flex-col gap-4 p-4 lg:p-6 bg-muted/40 overflow-hidden">
          {/* Top Bar: Search, Filters and Actions */}
           <div className='flex flex-col sm:flex-row gap-4'>
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
            <div className='flex items-center gap-2'>
              <Button variant="outline" className="gap-1.5 h-10" onClick={() => setIsFilterSheetOpen(true)}>
                <Filter className="h-4 w-4" />
                <span className='hidden sm:inline'>Filtros</span>
              </Button>
              <Button variant="outline" className="gap-1.5 h-10" onClick={() => setIsImportSheetOpen(true)}>
                <Upload className="h-4 w-4" />
                <span className='hidden sm:inline'>Importar</span>
              </Button>
              <Button className="gap-1.5 h-10" onClick={() => setIsNewLeadFormOpen(true)}>
                  <PlusCircle className="h-4 w-4" />
                  <span>Nuevo Lead</span>
              </Button>
            </div>
          </div>

          {/* Filters Pills */}
           <div className='flex items-center gap-2'>
            <p className='text-sm font-medium text-muted-foreground'>Etapas:</p>
              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger className="h-9 w-auto min-w-[150px] border-dashed">
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
          </div>

          {/* Leads List */}
          <div className='flex-1 space-y-3 overflow-y-auto pr-2'>
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

        {/* Sheet for importing leads */}
        <ImportLeadsSheet open={isImportSheetOpen} onOpenChange={setIsImportSheetOpen} onImport={handleImportLeads} />

        {/* Sheet for lead detail */}
        <Sheet open={!!selectedLead} onOpenChange={(isOpen) => { if (!isOpen) handleDetailClose() }}>
          <SheetContent className="p-0 sm:max-w-2xl w-full flex flex-col">
            <LeadDetailPanel
              lead={selectedLead}
              onUpdateStatus={handleUpdateStatus}
              onSaveStageData={handleSaveStageData}
              advisors={advisors}
              onAssignLead={handleAssignLead}
            />
          </SheetContent>
        </Sheet>
        
        {/* Sheet for advanced filters */}
        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
          <SheetContent className="w-full max-w-sm flex flex-col">
            <SheetHeader>
              <SheetTitle>Filtros Avanzados</SheetTitle>
              <SheetDescription>
                Refina tu búsqueda de leads con estas opciones.
              </SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6 flex-1 overflow-y-auto">
              
              <div className='space-y-3'>
                <Label>Fecha de Creación</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y", { locale: es })} -{" "}
                            {format(dateRange.to, "LLL dd, y", { locale: es })}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y", { locale: es })
                        )
                      ) : (
                        <span>Selecciona un rango de fechas</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={1}
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Separator />
              
              <div className='space-y-3'>
                <Label>Tipo de Interés</Label>
                <div className='flex items-center space-x-2'>
                  <Checkbox id="interest-planta"/>
                  <Label htmlFor="interest-planta" className='font-normal'>Planta Solar</Label>
                </div>
                 <div className='flex items-center space-x-2'>
                  <Checkbox id="interest-comercializadora"/>
                  <Label htmlFor="interest-comercializadora" className='font-normal'>Comercializadora</Label>
                </div>
              </div>
              
               <Separator />

              <div className="space-y-3">
                <Label htmlFor="city-filter">Ciudad</Label>
                <Input id="city-filter" placeholder="Ej: Bogotá D.C." />
              </div>

            </div>
            <div className='flex justify-end gap-2 mt-4 border-t pt-4'>
              <Button variant="outline" onClick={() => setIsFilterSheetOpen(false)}>Limpiar</Button>
              <Button onClick={() => setIsFilterSheetOpen(false)}>Aplicar Filtros</Button>
            </div>
          </SheetContent>
        </Sheet>

    </DashboardLayout>
  );
}
