'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Sun, Zap, Layers, AlertCircle } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { stages } from '@/app/leads/page';


const leadExample = {
  id: 'lead-1',
  name: 'Constructora S.A.S',
  city: 'Bogotá D.C.',
  lastContact: 'Hace 2h',
  priority: 'alta' as const,
  interestType: 'planta-solar' as const,
  status: 'Por Visitar',
  phone: '310 123 4567',
  email: 'contacto@constructora.com',
  creationDate: new Date().toISOString(),
  collectedData: {
    'nic': '1234567',
    'consumo': '5000 kWh',
    'valor_cotizacion': 15000000,
    'potencia_pico': '10 kWp'
  }
};
export type Lead = typeof leadExample;

const interestTypeIcons = {
  'planta-solar': { icon: Sun, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
  'comercializadora': { icon: Zap, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  'ambos': { icon: Layers, color: 'text-green-500', bgColor: 'bg-green-500/10' },
};

export const LeadCard = ({ lead, onClick, isSelected }: { lead: Lead, onClick: () => void, isSelected: boolean }) => {
  const currentStage = stages.find(s => s.name === lead.status);
  const interest = interestTypeIcons[lead.interestType];
  const Icon = interest.icon;

  const isOverdue = ['Nuevo Cliente', 'Por Contactar'].includes(lead.status) &&
                    differenceInDays(new Date(), new Date(lead.creationDate)) > 2;

  return (
    <Card 
      onClick={onClick} 
      className={cn(
        "cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4",
        isOverdue ? "border-l-red-500" : "border-l-transparent",
        isSelected && "ring-2 ring-primary border-primary"
      )}
    >
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className={cn("w-1.5 h-12 sm:h-8 rounded-full", currentStage?.color)}></div>
          <div className={cn("h-10 w-10 flex-shrink-0 rounded-lg flex items-center justify-center", interest.bgColor)}>
            <Icon className={cn("h-6 w-6", interest.color)} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-base">{lead.name}</p>
            <p className="text-sm text-muted-foreground">{lead.city}</p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex items-center justify-between mt-3 sm:mt-0 gap-4">
            <div className="flex flex-col items-start sm:items-end text-sm">
                <span className='font-medium text-foreground'>{lead.phone}</span>
                <span className='text-muted-foreground'>Últ. contacto: {lead.lastContact}</span>
            </div>
            <div className="flex items-center gap-2">
              {isOverdue && <AlertCircle className="h-5 w-5 text-red-500" title="Este lead no ha sido contactado en más de 2 días"/>}
              {currentStage && (
                <Badge variant="secondary" className='font-medium text-xs sm:text-sm whitespace-nowrap h-fit'>
                  <span className={cn("h-2 w-2 rounded-full mr-2", currentStage.color)}></span>
                  {lead.status}
                </Badge>
              )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};
