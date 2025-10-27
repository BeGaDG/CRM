
'use client';
import { TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StageForm } from './stage-form';
import { stages } from '@/lib/data/leads-data';
import type { Lead } from '@/lib/data/leads-data';

export const LeadDetailForms = ({ 
  lead, 
  onSaveStageData
}: { 
  lead: Lead; 
  onSaveStageData: (stage: string, data: any) => void; 
}) => {
    const stageForms = stages.filter(s => s.name !== 'Finalizados' && s.name !== 'Recaptura BD');

    return (
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
                            onSave={(data) => onSaveStageData(stage.name, data)}
                            initialData={lead.collectedData}
                            onDataChange={(data) => { /* Handle data change for validation */}}
                        />
                    </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </TabsContent>
    );
};
