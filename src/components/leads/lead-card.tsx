'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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

const leadExample = {
  id: 'lead-1',
  name: 'Constructora S.A.S',
  city: 'Bogotá D.C.',
  lastContact: 'Hace 2h',
  priority: 'alta',
  ownerAvatar: 'https://picsum.photos/seed/101/40/40',
  status: 'Por Visitar',
  phone: '310 123 4567',
  email: 'contacto@constructora.com',
  collectedData: {
    'nic': '1234567',
    'consumo': '5000 kWh',
    'valor_cotizacion': 15000000,
    'potencia_pico': '10 kWp'
  }
};
export type Lead = typeof leadExample;

export const LeadCard = ({ lead, onClick }: { lead: Lead, onClick: () => void }) => {
  const priorityColors = {
    alta: 'bg-red-500',
    media: 'bg-yellow-500',
    baja: 'bg-green-500',
  };
  const currentStage = stages.find(s => s.name === lead.status);

  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-1.5 h-12 sm:h-8 rounded-full ${priorityColors[lead.priority as keyof typeof priorityColors]}`}></div>
          <Avatar className="h-10 w-10">
            <AvatarImage src={lead.ownerAvatar} />
            <AvatarFallback>{lead.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-base">{lead.name}</p>
            <p className="text-sm text-muted-foreground">{lead.city}</p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex items-center justify-between mt-3 sm:mt-0 gap-4">
            <div className="flex flex-col items-start sm:items-end text-sm text-muted-foreground">
                <span className='font-medium text-foreground'>{lead.phone}</span>
                <span>Últ. contacto: {lead.lastContact}</span>
            </div>
            {currentStage && (
              <Badge variant="secondary" className='font-medium text-xs sm:text-sm whitespace-nowrap h-fit'>
                <span className={cn("h-2 w-2 rounded-full mr-2", currentStage.color)}></span>
                {lead.status}
              </Badge>
            )}
        </div>
      </CardContent>
    </Card>
  );
};
