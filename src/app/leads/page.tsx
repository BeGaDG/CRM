
'use client';
import { useState, useMemo } from 'react';
import type { DateRange } from "react-day-picker";
import {
  Contact,
  Filter,
  PlusCircle,
  Search,
  Upload,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ImportLeadsSheet } from '@/components/leads/import-leads-sheet';
import { LeadFilterSheet } from '@/components/leads/lead-filter-sheet';
import { stages, advisors, initialLeads } from '@/lib/data/leads-data';


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
        status: 'Nuevo Lead',
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
    const newLeads: Lead[] = importedLeads.map((lead, index) => ({
      ...lead,
      id: `imported-lead-${Date.now()}-${index}`,
      lastContact: 'Ahora',
      status: 'Nuevo Lead',
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
            <div className='flex flex-col sm:flex-row items-center gap-2'>
              <Button variant="outline" className="gap-1.5 h-10 w-full sm:w-auto" onClick={() => setIsFilterSheetOpen(true)}>
                <Filter className="h-4 w-4" />
                <span>Filtros</span>
              </Button>
              <Button variant="outline" className="gap-1.5 h-10 w-full sm:w-auto" onClick={() => setIsImportSheetOpen(true)}>
                <Upload className="h-4 w-4" />
                <span>Importar</span>
              </Button>
              <Button className="gap-1.5 h-10 w-full sm:w-auto" onClick={() => setIsNewLeadFormOpen(true)}>
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

        <NewLeadForm open={isNewLeadFormOpen} onOpenChange={setIsNewLeadFormOpen} onSave={handleSaveLead} />
        <ImportLeadsSheet open={isImportSheetOpen} onOpenChange={setIsImportSheetOpen} onImport={handleImportLeads} />
        <LeadDetailPanel
            lead={selectedLead}
            onOpenChange={handleDetailClose}
            onUpdateStatus={handleUpdateStatus}
            onSaveStageData={handleSaveStageData}
            advisors={advisors}
            onAssignLead={handleAssignLead}
        />
        <LeadFilterSheet 
            open={isFilterSheetOpen} 
            onOpenChange={setIsFilterSheetOpen} 
            dateRange={dateRange}
            setDateRange={setDateRange}
        />
    </DashboardLayout>
  );
}
