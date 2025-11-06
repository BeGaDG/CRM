
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Layers, AlertTriangle, UserCircle, HousePlug } from 'lucide-react';
import { SolarPanelIcon } from '@/components/icons';
import { differenceInDays } from 'date-fns';
import { stages } from '@/lib/data/leads-data';
import type { Lead } from '@/lib/data/leads-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LeadStatusFlow } from './lead-status-flow';

const AmbosIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <div className="flex gap-1.5">
    <div className={cn("h-10 w-10 flex-shrink-0 rounded-lg flex items-center justify-center", interestTypeIcons['planta-solar'].bgColor)}>
        <SolarPanelIcon className={cn("h-6 w-6", interestTypeIcons['planta-solar'].color)} />
    </div>
    <div className={cn("h-10 w-10 flex-shrink-0 rounded-lg flex items-center justify-center", interestTypeIcons['comercializadora'].bgColor)}>
        <HousePlug className={cn("h-6 w-6", interestTypeIcons['comercializadora'].color)} />
    </div>
  </div>
);


const interestTypeIcons = {
  'planta-solar': { icon: SolarPanelIcon, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
  'comercializadora': { icon: HousePlug, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  'ambos': { icon: AmbosIcon, color: 'text-green-500', bgColor: 'bg-green-500/10' },
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
        isSelected && "ring-2 ring-primary border-primary",
        isOverdue && "border-l-red-500"
      )}
       style={{ borderLeftColor: isOverdue ? undefined : (currentStage ? currentStage.colorHex : 'transparent') }}
    >
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            <div className="flex items-center gap-4 flex-1">
              {lead.interestType === 'ambos' ? (
                 <AmbosIcon />
              ) : (
                <div className={cn("h-10 w-10 flex-shrink-0 rounded-lg flex items-center justify-center", interest.bgColor)}>
                  <Icon className={cn("h-6 w-6", interest.color)} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-base truncate" title={lead.name}>{lead.name}</p>
                    {isOverdue && (
                      <Badge variant="destructive" className="gap-1.5 flex-shrink-0">
                          <AlertTriangle className="h-4 w-4" />
                          Urgente
                      </Badge>
                    )}
                </div>
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
            </div>
        </div>
        <div className="pt-2 border-t border-border w-full">
           <LeadStatusFlow stages={flowStages} currentStageName={lead.status} />
        </div>
      </CardContent>
    </Card>
  );
};
