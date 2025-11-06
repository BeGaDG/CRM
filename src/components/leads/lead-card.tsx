
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Layers, AlertCircle, UserCircle, HousePlug } from 'lucide-react';
import { SolarPanelIcon } from '@/components/icons';
import { differenceInDays } from 'date-fns';
import { stages } from '@/lib/data/leads-data';
import type { Lead } from '@/lib/data/leads-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LeadStatusFlow } from './lead-status-flow';

const interestTypeIcons = {
  'planta-solar': { icon: SolarPanelIcon, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
  'comercializadora': { icon: HousePlug, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  'ambos': { icon: Layers, color: 'text-green-500', bgColor: 'bg-green-500/10' },
};

export const LeadCard = ({ lead, onClick, isSelected }: { lead: Lead, onClick: () => void, isSelected: boolean }) => {
  const flowStages = stages.filter(s => !['No', 'Finalizados', 'Recaptura BD'].includes(s.name));
  const currentStage = stages.find(s => s.name === lead.status);
  const interest = interestTypeIcons[lead.interestType];
  const Icon = interest.icon;

  const isOverdue = ['Nuevo Lead', 'Por Contactar'].includes(lead.status) &&
                    differenceInDays(new Date(), new Date(lead.creationDate)) > 2;

  const badgeColor = currentStage?.colorHex || 'hsl(var(--muted))';

  return (
    <Card 
      onClick={onClick} 
      className={cn(
        "cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4",
        isOverdue ? "border-l-red-500" : `border-l-transparent`,
        isSelected && "ring-2 ring-primary border-primary"
      )}
      style={!isOverdue && currentStage ? { borderLeftColor: currentStage.colorHex } : {}}
    >
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            <div className="flex items-center gap-4 flex-1">
              <div className={cn("h-10 w-10 flex-shrink-0 rounded-lg flex items-center justify-center", interest.bgColor)}>
                <Icon className={cn("h-6 w-6", interest.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base truncate" title={lead.name}>{lead.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 truncate">
                    <UserCircle className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{lead.advisorName}</span>
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto flex flex-row sm:items-center justify-between sm:justify-end gap-4 pl-14 sm:pl-0">
                <div className="flex flex-col items-start sm:items-end text-sm">
                    <span className='font-medium text-foreground'>{lead.phone}</span>
                    <span className='text-muted-foreground whitespace-nowrap'>Últ. contacto: {lead.lastContact}</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  {isOverdue && <TooltipProvider><Tooltip><TooltipTrigger><AlertCircle className="h-5 w-5 text-red-500"/></TooltipTrigger><TooltipContent><p>Lead sin contacto por más de 2 días</p></TooltipContent></Tooltip></TooltipProvider>}
                  {currentStage && (
                    <Badge 
                        className={cn('font-medium text-xs sm:text-sm whitespace-nowrap h-fit text-white')}
                        style={{ backgroundColor: badgeColor }}
                    >
                      {lead.status}
                    </Badge>
                  )}
                </div>
            </div>
        </div>
        <div className="pt-2 border-t border-border w-full">
           <LeadStatusFlow stages={flowStages} currentStageName={lead.status} />
        </div>
      </CardContent>
    </Card>
  );
};
