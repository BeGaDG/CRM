'use client';
import { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart,
  Bell,
  Building,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Contact,
  CreditCard,
  FileText,
  Filter,
  GitMerge,
  GripVertical,
  LayoutDashboard,
  MoreHorizontal,
  Phone,
  Plus,
  PlusCircle,
  RefreshCcw,
  Search,
  Settings,
  Star,
  Users,
  Video,
  X,
  UserPlus
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  { name: 'Nuevo Cliente', count: 8, color: 'bg-sky-500' },
  { name: 'Por Contactar', count: 5, color: 'bg-cyan-500' },
  { name: 'Por Visitar', count: 3, color: 'bg-blue-500' },
  { name: 'Por Cotizar', count: 12, color: 'bg-indigo-500' },
  { name: 'Por Presentar Cotización', count: 4, color: 'bg-violet-500' },
  { name: 'Ajustar Cotización', count: 2, color: 'bg-purple-500' },
  { name: 'Seguimiento a la Cotización', count: 7, color: 'bg-fuchsia-500' },
  { name: 'Por Contratar', count: 1, color: 'bg-pink-500' },
  { name: 'Recaptura BD', count: 150, color: 'bg-rose-500' },
  { name: 'Finalizados', count: 320, color: 'bg-green-500' },
  { name: 'No', count: 50, color: 'bg-gray-500'}
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

const LeadCard = ({ lead, isSelected, onClick }: { lead: Lead, isSelected: boolean, onClick: () => void}) => {
    const priorityColors = {
        alta: 'bg-red-500',
        media: 'bg-yellow-500',
        baja: 'bg-green-500',
    };
    return (
        <Card onClick={onClick} className={cn("cursor-pointer hover:shadow-md transition-shadow", isSelected && "border-primary ring-2 ring-primary")}>
            <CardContent className="p-4 flex gap-4">
                <div className={`w-1.5 rounded-full ${priorityColors[lead.priority as keyof typeof priorityColors]}`}></div>
                <div className='flex-1'>
                    <div className='flex justify-between items-start'>
                        <div>
                            <p className="font-semibold text-sm">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.city}</p>
                        </div>
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={lead.ownerAvatar} />
                            <AvatarFallback>{lead.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex justify-between items-center mt-3 text-xs'>
                        <span className='text-muted-foreground'>Últ. contacto: {lead.lastContact}</span>
                        <Badge variant="secondary" className='font-normal'>{lead.status}</Badge>
                    </div>
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

const NextStageSelector = ({ currentStage, onUpdateStatus }: { currentStage: string; onUpdateStatus: (stage: string) => void; }) => {
    const nextStages = getNextStages(currentStage);

    if (nextStages.length === 0) {
        return <p className="text-sm text-muted-foreground text-center p-4 bg-muted rounded-md">Este es el final del flujo.</p>;
    }

    const mainAction = nextStages[0];
    const otherActions = nextStages.slice(1);

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold">Próximo Paso</h3>
             <Button onClick={() => onUpdateStatus(mainAction)} className="w-full">
                <ArrowRight className="mr-2 h-4 w-4"/>
                Avanzar a: {mainAction}
             </Button>
             {otherActions.length > 0 && (
                <div className="flex gap-2">
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


const LeadDetailPanel = ({ lead, onClose, onUpdateStatus }: { lead: Lead | null; onClose: () => void; onUpdateStatus: (stage: string) => void; }) => {
    if (!lead) return <Card className="hidden lg:flex flex-col h-full items-center justify-center border-dashed shadow-none"><CardContent className='p-6 flex flex-col items-center justify-center h-full text-center text-muted-foreground'><Contact className="h-12 w-12 mb-4 opacity-50" /> <p className='font-semibold'>Selecciona un lead</p><p className='text-sm'>Elige un lead de la lista para ver sus detalles completos aquí.</p></CardContent></Card>;

    const currentStage = stages.find(s => s.name === lead.status);

    return (
        <Card className="flex flex-col h-full relative">
            <Button variant="ghost" size="icon" className="lg:hidden absolute top-2 right-2 z-10" onClick={onClose}><X className="h-4 w-4"/></Button>
            <CardHeader className="flex-row items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={lead.ownerAvatar} />
                    <AvatarFallback>{lead.name.substring(0,2)}</AvatarFallback>
                </Avatar>
                <div>
                     <CardTitle className="text-xl font-bold font-headline">{lead.name}</CardTitle>
                    <p className="text-muted-foreground">{lead.city}</p>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <Tabs defaultValue="resumen" className="h-full flex flex-col">
                    <TabsList className="mx-4 mt-2">
                        <TabsTrigger value="resumen">Resumen</TabsTrigger>
                        <TabsTrigger value="actividad">Actividad</TabsTrigger>
                        <TabsTrigger value="documentos">Documentos</TabsTrigger>
                    </TabsList>
                    <div className='overflow-y-auto flex-1'>
                        <TabsContent value="resumen" className="p-4 space-y-4 text-sm">
                            <div className='space-y-2'>
                                <p><strong>Teléfono:</strong> {lead.phone}</p>
                                <p><strong>Email:</strong> {lead.email}</p>
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
                            <NextStageSelector currentStage={lead.status} onUpdateStatus={onUpdateStatus} />
                        </TabsContent>
                        <TabsContent value="actividad" className="p-4 space-y-4 text-xs">
                             <div className="flex items-start gap-3">
                                <div className="bg-muted p-2 rounded-full mt-1">
                                    <Contact className="h-3 w-3" />
                                </div>
                                <p><span className="font-semibold">Lead creado</span> por 'Admin'. Asignado a 'Carlos Ruiz'. <span className="text-muted-foreground">Hace 3h</span></p>
                            </div>
                        </TabsContent>
                        <TabsContent value="documentos" className="p-4 space-y-2">
                             <a href="#" className="flex items-center text-sm p-3 bg-muted rounded-md hover:bg-primary/10 transition-colors">
                                <FileText className="h-5 w-5 mr-3 text-primary" />
                                <span>RUT_Constructora_SAS.pdf</span>
                                <ChevronRight className="h-4 w-4 ml-auto"/>
                            </a>
                        </TabsContent>
                    </div>
                </Tabs>
            </CardContent>
            <div className="p-4 border-t bg-background flex gap-2">
                <Button variant="outline" className="flex-1"><Plus className="mr-2 h-4 w-4"/> Agendar Visita</Button>
            </div>
        </Card>
    )
}

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
                    {date ? format(date, "PPP") : <span>Seleccionar fecha</span>}
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

const StageForm = ({ stageName, onOpenChange, onSave }: { stageName: string | null; onOpenChange: (open: boolean) => void; onSave: (newStage: string) => void; }) => {
    const [date, setDate] = useState<Date>()
    const [date2, setDate2] = useState<Date>()
    const [date3, setDate3] = useState<Date>()

    const handleSave = () => {
        if (stageName) {
            onSave(stageName);
        }
        onOpenChange(false);
    }

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
                        <Checkbox id="planta_solar"/>
                        <Label htmlFor="planta_solar" className='font-normal'>Planta Solar</Label>
                    </div>
                     <div className='flex items-center space-x-2'>
                        <Checkbox id="comercializadora"/>
                        <Label htmlFor="comercializadora" className='font-normal'>Comercializadora</Label>
                    </div>
                </div>
                <div>
                    <Label>Día de la visita <span className='text-destructive'>*</span></Label>
                    <DatePicker date={date} setDate={setDate}/>
                </div>
                <div><Label htmlFor="nic">NIC</Label><Input id="nic"/></div>
                <div><Label htmlFor="factura">Factura (File)</Label><Input id="factura" type="file"/></div>
                <div><Label>Fecha de emisión de la factura</Label><DatePicker date={date2} setDate={setDate2}/></div>
                <div><Label htmlFor="consumo">Consumo mensual</Label><Input id="consumo"/></div>
                <div><Label htmlFor="pago">Promedio de pago por consumo $</Label><Input id="pago" type="number" /></div>
                <div><Label htmlFor="departamento">Departamento <span className='text-destructive'>*</span></Label><Input id="departamento"/></div>
                <div><Label htmlFor="ciudad">Ciudad <span className='text-destructive'>*</span></Label><Input id="ciudad"/></div>
                <div><Label htmlFor="operador">Operador de red</Label><Input id="operador"/></div>
                <div><Label htmlFor="comercializador">Comercializador actual</Label><Input id="comercializador"/></div>
                <div className='space-y-2'>
                    <Label>Tipo de mercado</Label>
                    <RadioGroup defaultValue="regulado" className='flex gap-4'>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="regulado" id="regulado" /><Label htmlFor="regulado" className='font-normal'>Regulado</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no_regulado" id="no_regulado" /><Label htmlFor="no_regulado" className='font-normal'>No Regulado</Label></div>
                    </RadioGroup>
                </div>
                 <div><Label htmlFor="tension">Nivel de tensión</Label><Input id="tension"/></div>
                 <div><Label htmlFor="direccion_visita">Dirección <span className='text-destructive'>*</span></Label><Input id="direccion_visita"/></div>
                 <div><Label htmlFor="email_visita">Correo electrónico</Label><Input id="email_visita" type="email"/></div>
            </div>
        ),
        'Por Cotizar': (
            <div className="space-y-4">
                 <div><Label htmlFor="nic_cotizar">NIC <span className='text-destructive'>*</span></Label><Input id="nic_cotizar"/></div>
                <div><Label htmlFor="factura_cotizar">Factura (File) <span className='text-destructive'>*</span></Label><Input id="factura_cotizar" type="file"/></div>
                <div><Label>Fecha de emisión de la factura <span className='text-destructive'>*</span></Label><DatePicker date={date} setDate={setDate}/></div>
                <div><Label htmlFor="consumo_cotizar">Consumo mensual <span className='text-destructive'>*</span></Label><Input id="consumo_cotizar"/></div>
                <div><Label htmlFor="pago_cotizar">Promedio de pago por consumo $ <span className='text-destructive'>*</span></Label><Input id="pago_cotizar" type="number"/></div>
                <div><Label htmlFor="email_cotizar">Correo electrónico</Label><Input id="email_cotizar" type="email"/></div>
                <div><Label htmlFor="operador_cotizar">Operador de red <span className='text-destructive'>*</span></Label><Input id="operador_cotizar"/></div>
                <div><Label htmlFor="comercializador_cotizar">Comercializador actual <span className='text-destructive'>*</span></Label><Input id="comercializador_cotizar"/></div>
                <div><Label htmlFor="tension_cotizar">Nivel de tensión <span className='text-destructive'>*</span></Label><Input id="tension_cotizar"/></div>
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
                    <DatePicker date={date} setDate={setDate}/>
                </div>
                 <div><Label htmlFor="cotizacion_file">Cotización (File) <span className='text-destructive'>*</span></Label><Input id="cotizacion_file" type="file"/></div>
                 <div><Label htmlFor="valor_cotizacion">Valor de cotización <span className='text-destructive'>*</span></Label><Input id="valor_cotizacion" type="number"/></div>

                 <Separator/>
                 <h4 className='font-semibold'>Planta Solar</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <div><Label htmlFor="ref_inversor">Ref. Inversor <span className='text-destructive'>*</span></Label><Input id="ref_inversor"/></div>
                    <div><Label htmlFor="cant_inversores">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_inversores" type="number"/></div>
                    <div><Label htmlFor="ref_panel">Ref. Panel <span className='text-destructive'>*</span></Label><Input id="ref_panel"/></div>
                    <div><Label htmlFor="cant_paneles">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_paneles" type="number"/></div>
                    <div className='col-span-2'><Label htmlFor="potencia">Potencia pico ofrecida <span className='text-destructive'>*</span></Label><Input id="potencia"/></div>
                 </div>

                 <Separator/>
                 <h4 className='font-semibold'>Comercializadora</h4>
                 <div><Label htmlFor="tipo_medidor">Tipo de Medidor <span className='text-destructive'>*</span></Label><Input id="tipo_medidor"/></div>
                 <div className="space-y-2">
                    <Label>Telemedida <span className='text-destructive'>*</span></Label>
                     <div className='flex items-center space-x-2'><Checkbox id="telemedida"/><Label htmlFor="telemedida" className='font-normal'>Incluir</Label></div>
                </div>
                 <div className="space-y-2">
                    <Label>Monitoreo <span className='text-destructive'>*</span> (Condicionado a si tiene proyecto solar)</Label>
                     <div className='flex items-center space-x-2'><Checkbox id="monitoreo"/><Label htmlFor="monitoreo" className='font-normal'>Incluir</Label></div>
                </div>
            </div>
        ),
         'Por Contratar': (
             <div className='space-y-4'>
                 <div><Label htmlFor="contrato_file">Contrato firmado (File) <span className='text-destructive'>*</span></Label><Input id="contrato_file" type="file"/></div>
                 <div><Label htmlFor="pago_file">Comprobante de pago (File)</Label><Input id="pago_file" type="file"/></div>
                 <div><Label htmlFor="valor_contrato">Valor <span className='text-destructive'>*</span></Label><Input id="valor_contrato" type="number"/></div>
                 <div><Label htmlFor="financiacion">Tipo de financiación <span className='text-destructive'>*</span></Label><Input id="financiacion"/></div>
                 <div><Label htmlFor="email_contrato">Correo electrónico <span className='text-destructive'>*</span></Label><Input id="email_contrato" type="email"/></div>
             </div>
         ),
         'Ajustar Cotización': (
             <div className="space-y-6">
                <div>
                    <Label>Fecha de cotización <span className='text-destructive'>*</span></Label>
                    <DatePicker date={date} setDate={setDate}/>
                </div>
                 <div><Label htmlFor="cotizacion_file_aj">Cotización (File) <span className='text-destructive'>*</span></Label><Input id="cotizacion_file_aj" type="file"/></div>
                 <div><Label htmlFor="valor_cotizacion_aj">Valor de cotización <span className='text-destructive'>*</span></Label><Input id="valor_cotizacion_aj" type="number"/></div>

                 <Separator/>
                 <h4 className='font-semibold'>Planta Solar</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <div><Label htmlFor="ref_inversor_aj">Ref. Inversor <span className='text-destructive'>*</span></Label><Input id="ref_inversor_aj"/></div>
                    <div><Label htmlFor="cant_inversores_aj">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_inversores_aj" type="number"/></div>
                    <div><Label htmlFor="ref_panel_aj">Ref. Panel <span className='text-destructive'>*</span></Label><Input id="ref_panel_aj"/></div>
                    <div><Label htmlFor="cant_paneles_aj">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_paneles_aj" type="number"/></div>
                    <div className='col-span-2'><Label htmlFor="potencia_aj">Potencia pico ofrecida <span className='text-destructive'>*</span></Label><Input id="potencia_aj"/></div>
                 </div>

                 <Separator/>
                 <h4 className='font-semibold'>Comercializadora</h4>
                 <div><Label htmlFor="tipo_medidor_aj">Tipo de Medidor <span className='text-destructive'>*</span></Label><Input id="tipo_medidor_aj"/></div>
                 <div className="space-y-2">
                    <Label>Telemedida <span className='text-destructive'>*</span></Label>
                     <div className='flex items-center space-x-2'><Checkbox id="telemedida_aj"/><Label htmlFor="telemedida_aj" className='font-normal'>Incluir</Label></div>
                </div>
                 <div className="space-y-2">
                    <Label>Monitoreo <span className='text-destructive'>*</span> (Condicionado a si tiene proyecto solar)</Label>
                     <div className='flex items-center space-x-2'><Checkbox id="monitoreo_aj"/><Label htmlFor="monitoreo_aj" className='font-normal'>Incluir</Label></div>
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
                     <Textarea placeholder="Añadir notas..."/>
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
                     <Textarea placeholder="Añadir observaciones..."/>
                 </div>
                 <div>
                    <Label>Fecha sugerida para recaptura (si aplica)</Label>
                    <DatePicker date={date3} setDate={setDate3} />
                </div>
            </div>
        )
    };

    const formContent = stageName ? forms[stageName] : null;

    return (
        <Sheet open={!!stageName} onOpenChange={onOpenChange}>
            <SheetContent className='overflow-y-auto w-full max-w-lg'>
                <SheetHeader>
                    <SheetTitle>Avanzar a: {stageName}</SheetTitle>
                    <SheetDescription>
                        Completa los siguientes campos para continuar con el proceso. Los campos marcados con <span className='text-destructive'>*</span> son obligatorios.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                    {formContent || <p>No se requiere información adicional para esta etapa.</p>}
                </div>
                {formContent && (
                    <div className='flex justify-end gap-2 mt-4'>
                        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                        <Button onClick={handleSave}>Guardar y Avanzar</Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};


export default function LeadsPage() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');
  const isMobile = useIsMobile();
  const [activeStage, setActiveStage] = useState('Por Visitar');
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [formStage, setFormStage] = useState<string | null>(null);

  const handleUpdateStatus = (stage: string) => {
    setFormStage(stage);
  };

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleSaveStage = (newStage: string) => {
    if (selectedLead) {
      const updatedLeads = leads.map(lead =>
        lead.id === selectedLead.id ? { ...lead, status: newStage } : lead
      );
      setLeads(updatedLeads);
      
      const updatedSelectedLead = { ...selectedLead, status: newStage };
      setSelectedLead(updatedSelectedLead);
      setActiveStage(newStage);
    }
    // Logic to create a new lead
    else if (newStage === 'Nuevo Cliente') {
        // This is where you would handle creating a new lead.
        // For now, let's just close the form.
        console.log("Creating new lead...");
    }
    setFormStage(null);
  };
  
  const handleStageChange = (stage: string) => {
    setActiveStage(stage);
  }
  
  useEffect(() => {
    if (selectedLead) {
      setActiveStage(selectedLead.status);
    }
  }, [selectedLead]);

  // Effect to manage lead selection based on active stage and screen size
  useEffect(() => {
    const leadsInCurrentStage = leads.filter(lead => lead.status === activeStage);
    // On desktop, if the selected lead is not in the current stage,
    // or no lead is selected, select the first one from the current stage.
    if (!isMobile) {
      if (!selectedLead || selectedLead.status !== activeStage) {
        setSelectedLead(leadsInCurrentStage.length > 0 ? leadsInCurrentStage[0] : null);
      }
    } else {
      // On mobile, clear selection when changing stages via the dropdown
      // This ensures the list is shown, not a stale detail view
      setSelectedLead(null);
    }
  }, [activeStage, isMobile]);

  // Initial load selection for desktop
  useEffect(() => {
    if (!isMobile && !selectedLead) {
      const leadsInCurrentStage = leads.filter(lead => lead.status === activeStage);
      setSelectedLead(leadsInCurrentStage.length > 0 ? leadsInCurrentStage[0] : null);
    }
  }, [isMobile, leads, activeStage]);

  const filteredLeads = leads.filter(lead => lead.status === activeStage);

  const handleDetailClose = () => {
    setSelectedLead(null);
  }

  const isDetailViewVisible = !!selectedLead;


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
             <ChevronRight className="h-4 w-4"/>
             <span className="font-semibold text-foreground">Gestión de Leads</span>
           </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Buscar por nombre o teléfono..."
                className="w-full rounded-lg bg-background pl-10 md:w-[200px] lg:w-[320px] h-10"
                />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
                <Filter className="h-4 w-4" />
                Filtros
                <ChevronDown className="h-4 w-4" />
              </Button>
             <Button size="sm" className="gap-1.5" onClick={() => handleUpdateStatus('Nuevo Cliente')}>
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

        <main className="flex-1 grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr_400px] gap-6 p-4 lg:p-6 bg-muted/40 overflow-hidden">
            {/* Left Column: Stages */}
             <div className={cn("hidden md:flex flex-col", isMobile && isDetailViewVisible && 'hidden')}>
                <Card className="flex-1 flex flex-col">
                  <CardHeader>
                      <CardTitle className="text-lg">Etapas del Flujo</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto -mt-2">
                      <ul className='space-y-1'>
                          {stages.map(stage => (
                              <li key={stage.name}>
                                  <button
                                      onClick={() => handleStageChange(stage.name)}
                                      className={cn(
                                          "w-full text-left p-2 rounded-md text-sm flex justify-between items-center transition-colors",
                                          activeStage === stage.name
                                              ? "bg-primary/10 text-primary font-semibold"
                                              : "hover:bg-muted/80"
                                      )}
                                  >
                                      <div className="flex items-center gap-2">
                                          <span className={cn("h-2 w-2 rounded-full", stage.color)}></span>
                                          <span>{stage.name}</span>
                                      </div>
                                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", activeStage === stage.name ? "bg-primary/20" : "bg-muted")}>{leads.filter(l => l.status === stage.name).length}</span>
                                  </button>
                              </li>
                          ))}
                      </ul>
                  </CardContent>
                </Card>
            </div>

            {/* Center Column: Leads List */}
             <div className={cn("flex flex-col gap-4", isMobile && isDetailViewVisible && 'hidden')}>
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-semibold'>Leads en: {activeStage} ({filteredLeads.length})</h2>
                </div>
                <div className="md:hidden">
                    <Select value={activeStage} onValueChange={handleStageChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar etapa..." />
                        </SelectTrigger>
                        <SelectContent>
                            {stages.map(stage => (
                                <SelectItem key={stage.name} value={stage.name}>
                                    <div className="flex items-center gap-2">
                                        <span className={cn("h-2 w-2 rounded-full", stage.color)}></span>
                                        <span>{stage.name} ({leads.filter(l => l.status === stage.name).length})</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className='space-y-3 overflow-y-auto'>
                    {filteredLeads.map(lead => (
                       <LeadCard 
                        key={lead.id} 
                        lead={lead} 
                        isSelected={selectedLead?.id === lead.id}
                        onClick={() => handleSelectLead(lead)} 
                       />
                    ))}
                    {filteredLeads.length === 0 && (
                        <div className="text-center text-muted-foreground py-10">
                            <Contact className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="font-medium">No hay leads en esta etapa.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Lead Detail */}
            <div className={cn("hidden lg:block", isMobile && "hidden")}>
                <LeadDetailPanel 
                    lead={selectedLead} 
                    onClose={handleDetailClose} 
                    onUpdateStatus={handleUpdateStatus} 
                />
            </div>
            
            {/* Sheet for stage forms */}
            <StageForm stageName={formStage} onOpenChange={(isOpen) => !isOpen && setFormStage(null)} onSave={handleSaveStage} />
            
            {/* Sheet for mobile/tablet lead detail */}
            <Sheet open={isDetailViewVisible && isMobile} onOpenChange={(isOpen) => {if (!isOpen) handleDetailClose()}}>
                <SheetContent className="p-0 sm:max-w-lg w-full">
                   <LeadDetailPanel 
                      lead={selectedLead} 
                      onClose={handleDetailClose} 
                      onUpdateStatus={handleUpdateStatus}
                    />
                </SheetContent>
            </Sheet>

        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
