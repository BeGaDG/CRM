
'use client';
import { useState, useEffect } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Info, Sun, Zap, Layers, UserCircle, ChevronsUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { stages } from '@/lib/data/leads-data';
import type { Lead, Stage, Advisor } from '@/lib/data/leads-data';

const getNextStages = (currentStage: string): string[] => {
  const stageMap: { [key: string]: string[] } = {
    'Nuevo Lead': ['Por Contactar'],
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

const NextStageSelector = ({ 
    currentStage, 
    allStages, 
    onUpdateStatus, 
    canAdvance 
}: { 
    currentStage: string; 
    allStages: Stage[];
    onUpdateStatus: (stage: string) => void; 
    canAdvance: boolean; 
}) => {
  const [manualStage, setManualStage] = useState<string>('');
  const nextStages = getNextStages(currentStage);

  const mainAction = nextStages.length > 0 ? nextStages[0] : null;
  const otherActions = nextStages.slice(1);
  
  const handleManualChange = () => {
    if (manualStage && manualStage !== currentStage) {
      onUpdateStatus(manualStage);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Próximo Paso Sugerido</h3>
        {mainAction ? (
            <Button onClick={() => onUpdateStatus(mainAction)} size="lg" className="w-full font-bold" disabled={!canAdvance} title={!canAdvance ? "Completa los campos obligatorios de la etapa actual para avanzar" : ""}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Avanzar a: {mainAction}
            </Button>
        ) : (
             <p className="text-sm text-muted-foreground text-center p-4 bg-muted rounded-md">Este es el final del flujo.</p>
        )}
        {otherActions.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
            {otherActions.map(stage => (
                <Button key={stage} onClick={() => onUpdateStatus(stage)} variant="outline" size="sm" className="flex-1">
                {stage}
                </Button>
            ))}
            </div>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
            <ChevronsUpDown className="h-4 w-4" />
            Cambio Manual de Etapa
        </h3>
        <div className="flex gap-2">
            <Select onValueChange={setManualStage} value={manualStage}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecciona una etapa..." />
                </SelectTrigger>
                <SelectContent>
                    {allStages.map(stage => (
                        <SelectItem key={stage.name} value={stage.name} disabled={stage.name === currentStage}>
                            {stage.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={handleManualChange} disabled={!manualStage || manualStage === currentStage}>
                Cambiar
            </Button>
        </div>
      </div>
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

const interestTypeIcons = {
  'planta-solar': { icon: Sun, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', label: 'Planta Solar' },
  'comercializadora': { icon: Zap, color: 'text-blue-500', bgColor: 'bg-blue-500/10', label: 'Comercializadora' },
  'ambos': { icon: Layers, color: 'text-green-500', bgColor: 'bg-green-500/10', label: 'Ambos' },
};

export const LeadDetailSummary = ({ 
  lead, 
  onUpdateStatus, 
  advisors,
  onAssignLead
}: { 
  lead: Lead; 
  onUpdateStatus: (stage: string) => void; 
  advisors: Advisor[];
  onAssignLead: (advisorId: string) => void;
}) => {
    const [selectedAdvisorId, setSelectedAdvisorId] = useState(lead?.advisorId || '');
    
    useEffect(() => {
        if (lead) {
            setSelectedAdvisorId(lead.advisorId);
        }
    }, [lead]);

    const currentStage = stages.find(s => s.name === lead.status);
    const canAdvance = true; 
    
    const interest = interestTypeIcons[lead.interestType];
    const Icon = interest.icon;

    const handleAssignClick = () => {
        onAssignLead(selectedAdvisorId);
    };

    const isReassignDisabled = selectedAdvisorId === lead.advisorId;

    return (
        <TabsContent value="resumen" className="p-4 space-y-6 text-sm">
            <div className='space-y-3'>
                <p><strong>Teléfono:</strong> <a href={`tel:${lead.phone}`} className='text-primary hover:underline'>{lead.phone}</a></p>
                <p><strong>Email:</strong> <a href={`mailto:${lead.email}`} className='text-primary hover:underline'>{lead.email}</a></p>
                <p><strong>Fuente:</strong> Referido</p>
                <div className='flex items-center gap-2'>
                    <strong>Interés:</strong>
                    <Badge variant="secondary" className={cn('font-medium', interest.bgColor, interest.color, 'border-none')}>
                        <Icon className="h-3 w-3 mr-1.5" />
                        {interest.label}
                    </Badge>
                </div>
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

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                Asesor Asignado
              </h3>
              <div className='flex items-center gap-2'>
               <Select value={selectedAdvisorId} onValueChange={setSelectedAdvisorId}>
                    <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Seleccionar asesor..." />
                    </SelectTrigger>
                    <SelectContent>
                        {advisors.map(advisor => (
                            <SelectItem key={advisor.id} value={advisor.id}>
                                {advisor.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleAssignClick} disabled={isReassignDisabled}>
                    Asignar
                </Button>
               </div>
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
            <NextStageSelector 
                currentStage={lead.status} 
                allStages={stages}
                onUpdateStatus={onUpdateStatus} 
                canAdvance={canAdvance} 
            />
        </TabsContent>
    )
}
