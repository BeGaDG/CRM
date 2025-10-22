'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  Contact,
  ChevronRight,
  FileText,
  Filter,
  LayoutDashboard,
  PlusCircle,
  Search,
  Settings,
  Users,
  BarChart,
  Bell,
  X,
  Calendar as CalendarIcon,
  UserPlus,
  Save
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SolYCieloLogo } from '@/components/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const leadExample = {
  id: 'lead-1',
  name: 'Constructora S.A.S',
  city: 'Bogotá D.C.',
  lastContact: 'Hace 2h',
  priority: 'alta',
  ownerAvatar: 'https://picsum.photos/seed/101/40/40',
  status: 'Por Visitar',
  phone: '310 123 4567',
  email: 'contacto@constructora.com'
};
type Lead = typeof leadExample;

const stages = [
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

const initialLeads: Lead[] = [
  { id: 'lead-1', name: 'Constructora S.A.S', city: 'Bogotá D.C.', lastContact: 'Hace 2h', priority: 'alta', ownerAvatar: 'https://picsum.photos/seed/101/40/40', status: 'Por Visitar', phone: '310 123 4567', email: 'contacto@constructora.com' },
  { id: 'lead-2', name: 'Inversiones XYZ', city: 'Medellín', lastContact: 'Ayer', priority: 'media', ownerAvatar: 'https://picsum.photos/seed/102/40/40', status: 'Por Visitar', phone: '312 987 6543', email: 'gerencia@inversionesxyz.co' },
  { id: 'lead-3', name: 'Logística Total', city: 'Cali', lastContact: 'Hace 3 días', priority: 'baja', ownerAvatar: 'https://picsum.photos/seed/103/40/40', status: 'Por Visitar', phone: '315 555 8888', email: 'logistica.total@email.com' },
  { id: 'lead-4', name: 'Nuevo Cliente Alfa', city: 'Barranquilla', lastContact: 'Hace 1h', priority: 'alta', ownerAvatar: 'https://picsum.photos/seed/104/40/40', status: 'Nuevo Cliente', phone: '318 111 2233', email: 'alfa@cliente.com' },
  { id: 'lead-5', name: 'Contacto Pendiente Beta', city: 'Cartagena', lastContact: 'Hace 5h', priority: 'media', ownerAvatar: 'https://picsum.photos/seed/105/40/40', status: 'Por Contactar', phone: '317 444 5566', email: 'beta@contacto.com' },
  { id: 'lead-6', name: 'Cotización Gamma', city: 'Bogotá D.C.', lastContact: 'Hace 2 días', priority: 'baja', ownerAvatar: 'https://picsum.photos/seed/106/40/40', status: 'Por Cotizar', phone: '316 777 8899', email: 'gamma@cotizacion.com' },
  { id: 'lead-7', name: 'Presentación Delta', city: 'Medellín', lastContact: 'Hoy', priority: 'alta', ownerAvatar: 'https://picsum.photos/seed/107/40/40', status: 'Por Presentar Cotización', phone: '319 000 1122', email: 'delta@presentacion.com' },
  { id: 'lead-8', name: 'Contrato Epsilon', city: 'Cali', lastContact: 'Hace 1 semana', priority: 'alta', ownerAvatar: 'https://picsum.photos/seed/108/40/40', status: 'Por Contratar', phone: '314 333 4455', email: 'epsilon@contrato.com' },
];

const LeadCard = ({ lead, onClick }: { lead: Lead, onClick: () => void }) => {
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

const DatePicker = ({ date, setDate }: { date?: Date, setDate: (date?: Date) => void }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { weekStartsOn: 1 }) : <span>Seleccionar fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

const StageForm = ({ stageName, onSave, onDataChange }: { stageName: string | null; onSave: () => void; onDataChange: (data: any) => void; }) => {
  const [date, setDate] = useState<Date>()
  const [date2, setDate2] = useState<Date>()
  const [date3, setDate3] = useState<Date>()

  const forms: { [key: string]: React.ReactNode } = {
    'Nuevo Cliente': (
      <div className="space-y-4">
        <div>
          <Label htmlFor="nombre">Nombre <span className='text-destructive'>*</span></Label>
          <Input id="nombre" placeholder="Nombre completo del cliente" />
        </div>
        <div>
          <Label htmlFor="direccion">Dirección</Label>
          <Input id="direccion" placeholder="Dirección del cliente" />
        </div>
        <div>
          <Label htmlFor="telefono">Número de teléfono <span className='text-destructive'>*</span></Label>
          <Input id="telefono" type="tel" placeholder="Ej: 3101234567" />
        </div>
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="ejemplo@correo.com" />
        </div>
      </div>
    ),
    'Por Visitar': (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Tipo de Interés <span className='text-destructive'>*</span></Label>
          <div className='flex items-center space-x-2'>
            <Checkbox id="planta_solar" />
            <Label htmlFor="planta_solar" className='font-normal'>Planta Solar</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id="comercializadora" />
            <Label htmlFor="comercializadora" className='font-normal'>Comercializadora</Label>
          </div>
        </div>
        <div>
          <Label>Día de la visita <span className='text-destructive'>*</span></Label>
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div><Label htmlFor="nic">NIC</Label><Input id="nic" /></div>
        <div><Label htmlFor="factura">Factura (File)</Label><Input id="factura" type="file" /></div>
        <div><Label>Fecha de emisión de la factura</Label><DatePicker date={date2} setDate={setDate2} /></div>
        <div><Label htmlFor="consumo">Consumo mensual</Label><Input id="consumo" /></div>
        <div><Label htmlFor="pago">Promedio de pago por consumo $</Label><Input id="pago" type="number" /></div>
        <div><Label htmlFor="departamento">Departamento <span className='text-destructive'>*</span></Label><Input id="departamento" /></div>
        <div><Label htmlFor="ciudad">Ciudad <span className='text-destructive'>*</span></Label><Input id="ciudad" /></div>
        <div><Label htmlFor="operador">Operador de red</Label><Input id="operador" /></div>
        <div><Label htmlFor="comercializador">Comercializador actual</Label><Input id="comercializador" /></div>
        <div className='space-y-2'>
          <Label>Tipo de mercado</Label>
          <RadioGroup defaultValue="regulado" className='flex gap-4'>
            <div className="flex items-center space-x-2"><RadioGroupItem value="regulado" id="regulado" /><Label htmlFor="regulado" className='font-normal'>Regulado</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="no_regulado" id="no_regulado" /><Label htmlFor="no_regulado" className='font-normal'>No Regulado</Label></div>
          </RadioGroup>
        </div>
        <div><Label htmlFor="tension">Nivel de tensión</Label><Input id="tension" /></div>
        <div><Label htmlFor="direccion_visita">Dirección <span className='text-destructive'>*</span></Label><Input id="direccion_visita" /></div>
        <div><Label htmlFor="email_visita">Correo electrónico</Label><Input id="email_visita" type="email" /></div>
      </div>
    ),
    'Por Cotizar': (
      <div className="space-y-4">
        <div><Label htmlFor="nic_cotizar">NIC <span className='text-destructive'>*</span></Label><Input id="nic_cotizar" /></div>
        <div><Label htmlFor="factura_cotizar">Factura (File) <span className='text-destructive'>*</span></Label><Input id="factura_cotizar" type="file" /></div>
        <div><Label>Fecha de emisión de la factura <span className='text-destructive'>*</span></Label><DatePicker date={date} setDate={setDate} /></div>
        <div><Label htmlFor="consumo_cotizar">Consumo mensual <span className='text-destructive'>*</span></Label><Input id="consumo_cotizar" /></div>
        <div><Label htmlFor="pago_cotizar">Promedio de pago por consumo $ <span className='text-destructive'>*</span></Label><Input id="pago_cotizar" type="number" /></div>
        <div><Label htmlFor="email_cotizar">Correo electrónico</Label><Input id="email_cotizar" type="email" /></div>
        <div><Label htmlFor="operador_cotizar">Operador de red <span className='text-destructive'>*</span></Label><Input id="operador_cotizar" /></div>
        <div><Label htmlFor="comercializador_cotizar">Comercializador actual <span className='text-destructive'>*</span></Label><Input id="comercializador_cotizar" /></div>
        <div><Label htmlFor="tension_cotizar">Nivel de tensión <span className='text-destructive'>*</span></Label><Input id="tension_cotizar" /></div>
        <div className='space-y-2'>
          <Label>Tipo de mercado <span className='text-destructive'>*</span></Label>
          <RadioGroup defaultValue="regulado" className='flex gap-4'>
            <div className="flex items-center space-x-2"><RadioGroupItem value="regulado" id="regulado_cotizar" /><Label htmlFor="regulado_cotizar" className='font-normal'>Regulado</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="no_regulado" id="no_regulado_cotizar" /><Label htmlFor="no_regulado_cotizar" className='font-normal'>No Regulado</Label></div>
          </RadioGroup>
        </div>
      </div>
    ),
    'Por Presentar Cotización': (
      <div className="space-y-6">
        <div>
          <Label>Fecha de cotización <span className='text-destructive'>*</span></Label>
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div><Label htmlFor="cotizacion_file">Cotización (File) <span className='text-destructive'>*</span></Label><Input id="cotizacion_file" type="file" /></div>
        <div><Label htmlFor="valor_cotizacion">Valor de cotización <span className='text-destructive'>*</span></Label><Input id="valor_cotizacion" type="number" /></div>

        <Separator />
        <h4 className='font-semibold'>Planta Solar</h4>
        <div className="grid grid-cols-2 gap-4">
          <div><Label htmlFor="ref_inversor">Ref. Inversor <span className='text-destructive'>*</span></Label><Input id="ref_inversor" /></div>
          <div><Label htmlFor="cant_inversores">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_inversores" type="number" /></div>
          <div><Label htmlFor="ref_panel">Ref. Panel <span className='text-destructive'>*</span></Label><Input id="ref_panel" /></div>
          <div><Label htmlFor="cant_paneles">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_paneles" type="number" /></div>
          <div className='col-span-2'><Label htmlFor="potencia">Potencia pico ofrecida <span className='text-destructive'>*</span></Label><Input id="potencia" /></div>
        </div>

        <Separator />
        <h4 className='font-semibold'>Comercializadora</h4>
        <div><Label htmlFor="tipo_medidor">Tipo de Medidor <span className='text-destructive'>*</span></Label><Input id="tipo_medidor" /></div>
        <div className="space-y-2">
          <Label>Telemedida <span className='text-destructive'>*</span></Label>
          <div className='flex items-center space-x-2'><Checkbox id="telemedida" /><Label htmlFor="telemedida" className='font-normal'>Incluir</Label></div>
        </div>
        <div className="space-y-2">
          <Label>Monitoreo <span className='text-destructive'>*</span> (Condicionado a si tiene proyecto solar)</Label>
          <div className='flex items-center space-x-2'><Checkbox id="monitoreo" /><Label htmlFor="monitoreo" className='font-normal'>Incluir</Label></div>
        </div>
      </div>
    ),
    'Por Contratar': (
      <div className='space-y-4'>
        <div><Label htmlFor="contrato_file">Contrato firmado (File) <span className='text-destructive'>*</span></Label><Input id="contrato_file" type="file" /></div>
        <div><Label htmlFor="pago_file">Comprobante de pago (File)</Label><Input id="pago_file" type="file" /></div>
        <div><Label htmlFor="valor_contrato">Valor <span className='text-destructive'>*</span></Label><Input id="valor_contrato" type="number" /></div>
        <div><Label htmlFor="financiacion">Tipo de financiación <span className='text-destructive'>*</span></Label><Input id="financiacion" /></div>
        <div><Label htmlFor="email_contrato">Correo electrónico <span className='text-destructive'>*</span></Label><Input id="email_contrato" type="email" /></div>
      </div>
    ),
    'Ajustar Cotización': (
      <div className="space-y-6">
        <div>
          <Label>Fecha de cotización <span className='text-destructive'>*</span></Label>
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div><Label htmlFor="cotizacion_file_aj">Cotización (File) <span className='text-destructive'>*</span></Label><Input id="cotizacion_file_aj" type="file" /></div>
        <div><Label htmlFor="valor_cotizacion_aj">Valor de cotización <span className='text-destructive'>*</span></Label><Input id="valor_cotizacion_aj" type="number" /></div>

        <Separator />
        <h4 className='font-semibold'>Planta Solar</h4>
        <div className="grid grid-cols-2 gap-4">
          <div><Label htmlFor="ref_inversor_aj">Ref. Inversor <span className='text-destructive'>*</span></Label><Input id="ref_inversor_aj" /></div>
          <div><Label htmlFor="cant_inversores_aj">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_inversores_aj" type="number" /></div>
          <div><Label htmlFor="ref_panel_aj">Ref. Panel <span className='text-destructive'>*</span></Label><Input id="ref_panel_aj" /></div>
          <div><Label htmlFor="cant_paneles_aj">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_paneles_aj" type="number" /></div>
          <div className='col-span-2'><Label htmlFor="potencia_aj">Potencia pico ofrecida <span className='text-destructive'>*</span></Label><Input id="potencia_aj" /></div>
        </div>

        <Separator />
        <h4 className='font-semibold'>Comercializadora</h4>
        <div><Label htmlFor="tipo_medidor_aj">Tipo de Medidor <span className='text-destructive'>*</span></Label><Input id="tipo_medidor_aj" /></div>
        <div className="space-y-2">
          <Label>Telemedida <span className='text-destructive'>*</span></Label>
          <div className='flex items-center space-x-2'><Checkbox id="telemedida_aj" /><Label htmlFor="telemedida_aj" className='font-normal'>Incluir</Label></div>
        </div>
        <div className="space-y-2">
          <Label>Monitoreo <span className='text-destructive'>*</span> (Condicionado a si tiene proyecto solar)</Label>
          <div className='flex items-center space-x-2'><Checkbox id="monitoreo_aj" /><Label htmlFor="monitoreo_aj" className='font-normal'>Incluir</Label></div>
        </div>
      </div>
    ),
    'Seguimiento a la Cotización': (
      <div className='space-y-4'>
        <div>
          <Label>Fecha de próximo acercamiento <span className='text-destructive'>*</span></Label>
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div>
          <Label>Acción a realizar <span className='text-destructive'>*</span></Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Seleccionar acción..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="llamada">Llamada</SelectItem>
              <SelectItem value="visita">Visita</SelectItem>
              <SelectItem value="correo">Correo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Comentarios / notas del comercial</Label>
          <Textarea placeholder="Añadir notas..." />
        </div>
        <div>
          <Label>Estado de la cotización</Label>
          <RadioGroup defaultValue="sin_cambios" className='flex gap-4'>
            <div className="flex items-center space-x-2"><RadioGroupItem value="ajustada" id="ajustada" /><Label htmlFor="ajustada" className='font-normal'>Ajustada</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="sin_cambios" id="sin_cambios" /><Label htmlFor="sin_cambios" className='font-normal'>Sin Cambios</Label></div>
          </RadioGroup>
        </div>
      </div>
    ),
    'No': (
      <div className='space-y-4'>
        <div>
          <Label>Motivo del rechazo <span className='text-destructive'>*</span></Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Seleccionar motivo..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="precio">Precio</SelectItem>
              <SelectItem value="tiempo">Tiempo</SelectItem>
              <SelectItem value="otro_proveedor">Contrató con otro</SelectItem>
              <SelectItem value="sin_interes">Falta de interés</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Observaciones</Label>
          <Textarea placeholder="Añadir observaciones..." />
        </div>
        <div>
          <Label>Fecha sugerida para recaptura (si aplica)</Label>
          <DatePicker date={date3} setDate={setDate3} />
        </div>
      </div>
    )
  };

  const formContent = stageName ? forms[stageName] : null;

  if (!formContent) return null;

  return (
    <div className='space-y-4'>
      {formContent}
      <Button onClick={onSave} className='w-full'>
        <Save className="mr-2 h-4 w-4" />
        Guardar Borrador
      </Button>
    </div>
  );
};


const LeadDetailPanel = ({ lead, onUpdateStatus, onSaveStageData }: { lead: Lead | null; onUpdateStatus: (stage: string) => void; onSaveStageData: (stage: string, data: any) => void; }) => {
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

const NewLeadForm = ({ onOpenChange, onSave }: { onOpenChange: (open: boolean) => void; onSave: (newStage: string) => void; }) => {
    
      const handleSave = () => {
        onSave("Nuevo Cliente");
        onOpenChange(false);
      }

    return (
         <Sheet open={true} onOpenChange={onOpenChange}>
            <SheetContent className='w-full max-w-lg overflow-y-auto'>
                <SheetHeader>
                <SheetTitle>Crear Nuevo Lead</SheetTitle>
                <SheetDescription>
                    Completa los siguientes campos para registrar un nuevo lead. Los campos marcados con <span className='text-destructive'>*</span> son obligatorios.
                </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                    <StageForm stageName="Nuevo Cliente" onSave={() => {}} onDataChange={() => {}} />
                </div>
                 <div className='flex justify-end gap-2 mt-4 sticky bottom-0 bg-background py-4'>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Crear Lead</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}


export default function LeadsPage() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isNewLeadFormOpen, setIsNewLeadFormOpen] = useState(false);
  const [stageToAdvance, setStageToAdvance] = useState<string | null>(null);

  const [filterStage, setFilterStage] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdateStatus = (stage: string) => {
     if (selectedLead) {
      const updatedLeads = leads.map(lead =>
        lead.id === selectedLead.id ? { ...lead, status: stage } : lead
      );
      setLeads(updatedLeads);

      const updatedSelectedLead = { ...selectedLead, status: stage };
      setSelectedLead(updatedSelectedLead);
    }
  };

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleSaveLead = (newStage: string) => {
    if (newStage === 'Nuevo Cliente') {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        name: 'Nuevo Lead', // Placeholder, should come from form
        city: 'Por definir',
        lastContact: 'Ahora',
        priority: 'media',
        ownerAvatar: 'https://picsum.photos/seed/999/40/40',
        status: 'Nuevo Cliente',
        phone: 'N/A',
        email: 'N/A',
      };
      setLeads([newLead, ...leads]);
    }
  };

  const handleSaveStageData = (stage: string, data: any) => {
    // Here you would save the partial data to the lead object.
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
        return stageMatch && searchMatch;
    });
  }, [leads, filterStage, searchTerm]);


  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/80">
        <SidebarHeader className="flex items-center gap-2.5 p-4">
          <SolYCieloLogo className="h-8 w-8" />
          <h2 className="text-xl font-semibold tracking-tight font-headline group-data-[collapsible=icon]:hidden">
            Sol & Cielo
          </h2>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton>
                  <LayoutDashboard />
                  <span className="truncate">Home General</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/leads">
                <SidebarMenuButton isActive>
                  <Contact />
                  <span className="truncate">Gestión de Leads</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/users">
                <SidebarMenuButton>
                  <Users />
                  <span className="truncate">Gestión de Usuarios</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FileText />
                <span className="truncate">Gestión de Facturas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BarChart />
                <span className="truncate">Reportes y Análisis</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                <span className="truncate">Configuración</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="hidden md:flex text-sm items-center gap-2 text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-foreground">Gestión de Leads</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button size="sm" className="gap-1.5" onClick={() => setIsNewLeadFormOpen(true)}>
              <PlusCircle className="h-4 w-4" />
              Crear Lead
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notificaciones</span>
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                  <Avatar className="h-9 w-9">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Avatar de usuario" data-ai-hint={userAvatar.imageHint} />}
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Menú de usuario</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuItem>Soporte</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 flex flex-col gap-4 p-4 lg:p-6 bg-muted/40 overflow-y-auto">
          {/* Top Filters */}
          <div className='flex flex-col md:flex-row gap-2'>
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
            <Select value={filterStage} onValueChange={setFilterStage}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por etapa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las etapas</SelectItem>
                {stages.map(stage => (
                    <SelectItem key={stage.name} value={stage.name}>{stage.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="gap-1.5">
              <Filter className="h-4 w-4" />
              <span className='sr-only'>Filtros</span>
            </Button>
          </div>

          {/* Leads List */}
          <div className='flex-1 space-y-3'>
              {filteredLeads.map(lead => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onClick={() => handleSelectLead(lead)}
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
        {isNewLeadFormOpen && <NewLeadForm onOpenChange={setIsNewLeadFormOpen} onSave={handleSaveLead} />}

        {/* Sheet for lead detail */}
        <Sheet open={!!selectedLead} onOpenChange={(isOpen) => { if (!isOpen) handleDetailClose() }}>
          <SheetContent className="p-0 sm:max-w-2xl w-full flex flex-col">
            <LeadDetailPanel
              lead={selectedLead}
              onUpdateStatus={handleUpdateStatus}
              onSaveStageData={handleSaveStageData}
            />
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}
