'use client';
import {
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { ArrowRight, Info, Contact } from 'lucide-react';
import type { Lead } from './lead-card';
import { StageForm } from './stage-form';
import { stages } from '@/app/leads/page';

const getNextStages = (currentStage: string): string[] => {
  const stageMap: { [key: string]: string[] } = {
    'Nuevo Cliente': ['Por Contactar'],
    'Por Contactar': ['Por Visitar', 'No'],
    'Por Visitar': ['Por Cotizar'],
    'Por Cotizar': ['Por Presentar Cotización'],
    'Por Presentar Cotización': ['Ajustar Cotización', 'Seguimiento a la Cotización', 'Por Contratar', 'No'],
    'Ajustar Cotización': ['Por Presentar Cotización'],
    'Seguimiento a la Cotización': ['Por Contratar', 'Ajustar Cotización', 'No'],
    'Por Contratar': ['Finalizados'],
    'Finalizados': [],
    'No': ['Recaptura BD'],
    'Recaptura BD': ['Por Contactar'],
  };
  return stageMap[currentStage] || [];
};

const NextStageSelector = ({ currentStage, onUpdateStatus, canAdvance }: { currentStage: string; onUpdateStatus: (stage: string) => void; canAdvance: boolean; }) => {
  const nextStages = getNextStages(currentStage);

  if (nextStages.length === 0) {
    return <p className="text-sm text-muted-foreground text-center p-4 bg-muted rounded-md">Este es el final del flujo.</p>;
  }

  const mainAction = nextStages[0];
  const otherActions = nextStages.slice(1);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">Próximo Paso</h3>
      <Button onClick={() => onUpdateStatus(mainAction)} size="lg" className="w-full font-bold" disabled={!canAdvance} title={!canAdvance ? "Completa los campos obligatorios de la etapa actual para avanzar" : ""}>
        <ArrowRight className="mr-2 h-4 w-4" />
        Avanzar a: {mainAction}
      </Button>
      {otherActions.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {otherActions.map(stage => (
            <Button key={stage} onClick={() => onUpdateStatus(stage)} variant="outline" size="sm" className="flex-1">
              {stage}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value?: string | number | null }) => {
    if (!value && value !== 0) return null;
    return (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
    );
}

export const LeadDetailPanel = ({ lead, onUpdateStatus, onSaveStageData }: { lead: Lead | null; onUpdateStatus: (stage: string) => void; onSaveStageData: (stage: string, data: any) => void; }) => {
    if (!lead) return null;

    const currentStage = stages.find(s => s.name === lead.status);
    const stageForms = stages.filter(s => s.name !== 'Finalizados' && s.name !== 'Recaptura BD');
    
    // A simple check if required fields for the CURRENT stage are filled.
    // In a real app, this logic would be much more robust.
    const canAdvance = true; 

    return (
        <>
            <SheetHeader className="text-left p-4">
                 <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-4 border-primary">
                        <AvatarImage src={lead.ownerAvatar} />
                        <AvatarFallback>{lead.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
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
                    <TabsContent value="resumen" className="p-4 space-y-6 text-sm">
                        <div className='space-y-3'>
                            <p><strong>Teléfono:</strong> <a href={`tel:${lead.phone}`} className='text-primary hover:underline'>{lead.phone}</a></p>
                            <p><strong>Email:</strong> <a href={`mailto:${lead.email}`} className='text-primary hover:underline'>{lead.email}</a></p>
                            <p><strong>Fuente:</strong> Referido</p>
                            {currentStage && (
                                <div className='flex items-center gap-2'>
                                    <strong>Estado:</strong>
                                    <Badge variant="secondary" className='font-medium'>
                                        <span className={cn("h-2 w-2 rounded-full mr-2", currentStage.color)}></span>
                                        {lead.status}
                                    </Badge>
                                </div>
                            )}
                        </div>
                        
                        <Separator/>

                        <div className='space-y-4'>
                          <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Información Clave Recopilada
                          </h3>
                          {Object.keys(lead.collectedData).length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 text-sm p-4 bg-muted/50 rounded-lg border">
                              <InfoItem label="NIC" value={lead.collectedData.nic} />
                              <InfoItem label="Consumo" value={lead.collectedData.consumo} />
                              <InfoItem label="Potencia Pico" value={lead.collectedData.potencia_pico} />
                              <InfoItem label="Valor Cotización" value={lead.collectedData.valor_cotizacion ? `$${lead.collectedData.valor_cotizacion.toLocaleString('es-CO')}` : null} />
                            </div>
                          ) : (
                             <p className="text-muted-foreground text-center text-xs p-4 bg-muted/50 rounded-lg border">
                              Aún no se ha recopilado información adicional para este lead.
                            </p>
                          )}
                        </div>
                        
                        <Separator/>
                        <NextStageSelector currentStage={lead.status} onUpdateStatus={onUpdateStatus} canAdvance={canAdvance} />
                    </TabsContent>
                    <TabsContent value="formularios" className='p-4'>
                        <Accordion type="single" collapsible defaultValue={`item-${lead.status}`}>
                            {stageForms.map(stage => (
                                <AccordionItem value={`item-${stage.name}`} key={stage.name}>
                                <AccordionTrigger>{stage.name}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-xs text-muted-foreground mb-4">
                                        Completa la información para esta etapa. Puedes guardar un borrador en cualquier momento.
                                    </p>
                                    <StageForm 
                                        stageName={stage.name} 
                                        onSave={() => onSaveStageData(stage.name, {})} // Replace {} with actual form data
                                        onDataChange={(data) => { /* Handle data change for validation */}}
                                    />
                                </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TabsContent>
                    <TabsContent value="actividad" className="p-4 space-y-4 text-xs">
                         <div className="flex items-start gap-3">
                            <div className="bg-muted p-2 rounded-full mt-1">
                                <Contact className="h-3 w-3" />
                            </div>
                            <p><span className="font-semibold">Lead creado</span> por 'Admin'. Asignado a 'Carlos Ruiz'. <span className="text-muted-foreground">Hace 3h</span></p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
             <div className="p-4 border-t bg-background/80 backdrop-blur-sm flex gap-2 sticky bottom-0">
                <Input placeholder='Escribe una nota rápida...'/>
                <Button>Guardar</Button>
            </div>
        </>
    )
}
