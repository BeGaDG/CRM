
'use client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sun, Zap, Layers } from 'lucide-react';
import type { Lead, Advisor } from '@/lib/data/leads-data';
import { LeadDetailSummary } from './lead-detail-summary';
import { LeadDetailForms } from './lead-detail-forms';
import { LeadDetailActivity } from './lead-detail-activity';

const interestTypeIcons = {
  'planta-solar': { icon: Sun, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
  'comercializadora': { icon: Zap, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  'ambos': { icon: Layers, color: 'text-green-500', bgColor: 'bg-green-500/10' },
};


export const LeadDetailPanel = ({ 
  lead, 
  onOpenChange,
  onUpdateStatus, 
  onSaveStageData,
  advisors,
  onAssignLead
}: { 
  lead: Lead | null; 
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (stage: string) => void; 
  onSaveStageData: (stage: string, data: any) => void; 
  advisors: Advisor[];
  onAssignLead: (advisorId: string) => void;
}) => {
    if (!lead) return null;

    const interest = interestTypeIcons[lead.interestType];
    const Icon = interest.icon;

    return (
        <Sheet open={!!lead} onOpenChange={onOpenChange}>
            <SheetContent className="p-0 sm:max-w-2xl w-full flex flex-col">
                <SheetHeader className="text-left p-4">
                    <div className="flex items-center gap-4">
                        <div className={cn("h-16 w-16 flex-shrink-0 rounded-lg flex items-center justify-center", interest.bgColor)}>
                            <Icon className={cn("h-8 w-8", interest.color)} />
                        </div>
                        <div>
                            <SheetTitle className="text-2xl font-bold font-headline">{lead.name}</SheetTitle>
                            <p className="text-muted-foreground">{lead.city}</p>
                        </div>
                    </div>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-1">
                    <Tabs defaultValue="resumen" className="flex flex-col h-full">
                        <TabsList className="mx-4 mt-2 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                            <TabsTrigger value="resumen">Resumen</TabsTrigger>
                            <TabsTrigger value="formularios">Formularios</TabsTrigger>
                            <TabsTrigger value="actividad">Actividad</TabsTrigger>
                        </TabsList>
                        <LeadDetailSummary 
                            lead={lead} 
                            onUpdateStatus={onUpdateStatus} 
                            advisors={advisors}
                            onAssignLead={onAssignLead}
                        />
                        <LeadDetailForms 
                            lead={lead}
                            onSaveStageData={onSaveStageData}
                        />
                        <LeadDetailActivity />
                    </Tabs>
                </div>
                <div className="p-4 border-t bg-background/80 backdrop-blur-sm flex gap-2 sticky bottom-0">
                    <Input placeholder='Escribe una nota rápida...'/>
                    <Button>Guardar</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
