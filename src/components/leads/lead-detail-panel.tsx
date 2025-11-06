
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, ChevronsUpDown, Info, Layers, UserCircle, Phone, Mail, Building, TrendingUp, PiggyBank, Calendar, DollarSign, FileText, Download, HousePlug } from 'lucide-react';
import { StageForm } from './stage-form';
import type { Lead, Advisor } from '@/lib/data/leads-data';
import { stages } from '@/lib/data/leads-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { SolarPanelIcon } from '@/components/icons';

const interestTypeIcons = {
  'planta-solar': { icon: SolarPanelIcon, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', label: 'Planta Solar' },
  'comercializadora': { icon: HousePlug, color: 'text-blue-500', bgColor: 'bg-blue-500/10', label: 'Comercializadora' },
  'ambos': { icon: Layers, color: 'text-green-500', bgColor: 'bg-green-500/10', label: 'Ambos' },
};

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

const InfoItem = ({ label, value, icon: Icon }: { label: string; value?: string | number | null, icon?: React.ElementType }) => {
    if (!value && value !== 0) return null;
    return (
    <div className="flex items-start justify-between text-sm">
        <p className="text-muted-foreground flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            <span>{label}</span>
        </p>
        <p className="font-medium text-right">{value}</p>
    </div>
    );
}

const InfoFileItem = ({ label, fileName, date }: { label: string; fileName?: string; date?: string }) => {
    if (!fileName) return null;
    return (
        <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                    <p className="font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{fileName}</p>
                </div>
            </div>
            <Button variant="outline" size="sm" className="h-8">
                <Download className="h-3.5 w-3.5 mr-2" />
                Ver
            </Button>
        </div>
    );
}


const CollectedInfo = ({ lead }: { lead: Lead }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-4 w-4" />
                Información Clave Recopilada
            </CardTitle>
            <CardDescription>Resumen de los datos más importantes del lead.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
            <InfoItem label="Teléfono" value={lead.phone} icon={Phone} />
            <InfoItem label="Email" value={lead.email} icon={Mail} />
            <InfoItem label="Fuente" value={lead.source} icon={TrendingUp}/>
            <Separator />
            {Object.keys(lead.collectedData).length > 0 ? (
                <>
                    <InfoItem label="NIC" value={lead.collectedData.nic} icon={Building}/>
                    <InfoItem label="Consumo (kWh)" value={lead.collectedData.consumo?.toLocaleString('es-CO')} icon={HousePlug} />
                    <InfoItem label="Pago Promedio" value={lead.collectedData.pago ? `$${lead.collectedData.pago.toLocaleString('es-CO')}` : null} icon={PiggyBank} />
                    <InfoItem label="Potencia Pico (kWp)" value={lead.collectedData.potencia_pico} icon={SolarPanelIcon}/>
                    <InfoItem label="Valor Cotización" value={lead.collectedData.valor_cotizacion ? `$${lead.collectedData.valor_cotizacion.toLocaleString('es-CO')}` : null} icon={DollarSign} />
                    <InfoItem label="Fecha de Próx. Seguimiento" value={lead.collectedData.follow_up_date ? new Date(lead.collectedData.follow_up_date).toLocaleDateString('es-CO') : null} icon={Calendar} />
                     <Separator />
                    <div className='space-y-2'>
                        <h4 className='font-medium text-muted-foreground'>Archivos Adjuntos</h4>
                        <InfoFileItem label="Factura de Servicio" fileName={lead.collectedData.factura_file} />
                        <InfoFileItem label="Cotización Enviada" fileName={lead.collectedData.cotizacion_file} />
                        <InfoFileItem label="Contrato Firmado" fileName={lead.collectedData.contrato_file} />
                    </div>
                </>
              ) : (
                 <p className="text-muted-foreground text-center text-xs p-4 bg-muted/50 rounded-lg border">
                  No hay datos adicionales.
                </p>
            )}
        </CardContent>
    </Card>
);

const AdvisorAssign = ({ lead, advisors, onAssignLead }: { lead: Lead; advisors: Advisor[]; onAssignLead: (advisorId: string) => void; }) => {
    const [selectedAdvisorId, setSelectedAdvisorId] = useState(lead?.advisorId || '');
    
    useEffect(() => {
        if (lead) setSelectedAdvisorId(lead.advisorId);
    }, [lead]);

    const handleAssignClick = () => {
        onAssignLead(selectedAdvisorId);
    };

    const isReassignDisabled = selectedAdvisorId === lead.advisorId;

    return (
        <Card>
            <CardHeader>
                 <CardTitle className="text-base flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    Asesor Asignado
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
                <Button onClick={handleAssignClick} disabled={isReassignDisabled} className="w-full">
                    Reasignar
                </Button>
            </CardContent>
        </Card>
    );
};

const QuickNotes = () => {
    const notes = [
        {
            id: 'note-1',
            author: 'Ana Gómez',
            avatar: 'https://picsum.photos/seed/302/100/100',
            content: 'El cliente está muy interesado pero necesita que ajustemos el precio. Le preocupa el ROI a corto plazo.',
            date: 'Hace 2 horas',
        },
        {
            id: 'note-2',
            author: 'Ana Gómez',
            avatar: 'https://picsum.photos/seed/302/100/100',
            content: 'Se envió la cotización v2 con el descuento solicitado. A la espera de comentarios.',
            date: 'Ayer',
        }
    ];

    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Notas Rápidas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-4">
                    {notes.map(note => (
                        <div key={note.id} className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 border">
                                <AvatarImage src={note.avatar} />
                                <AvatarFallback>{note.author.substring(0,1)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-sm bg-muted/50 p-3 rounded-lg">
                                <p className="font-medium">{note.author} <span className="text-xs text-muted-foreground ml-2">{note.date}</span></p>
                                <p className="text-muted-foreground">{note.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Separator />
                <div className="space-y-2">
                    <Textarea placeholder='Escribe una nota rápida...'/>
                    <Button className="w-full">Guardar Nota</Button>
                </div>
            </CardContent>
        </Card>
    )
}


export const LeadDetailPanel = ({ 
  lead, 
  onBack,
  onUpdateStatus, 
  onSaveStageData,
  advisors,
  onAssignLead
}: { 
  lead: Lead; 
  onBack: () => void;
  onUpdateStatus: (stage: string) => void; 
  onSaveStageData: (stage: string, data: any) => void; 
  advisors: Advisor[];
  onAssignLead: (advisorId: string) => void;
}) => {
    const currentStageInfo = stages.find(s => s.name === lead.status);
    const canAdvance = true; // Placeholder for validation logic
    const [manualStage, setManualStage] = useState<string>('');
    const nextStages = getNextStages(lead.status);
    const mainAction = nextStages.length > 0 ? nextStages[0] : null;

    const handleManualChange = () => {
        if (manualStage && manualStage !== lead.status) {
            onUpdateStatus(manualStage);
        }
    }


    return (
        <main className="flex-1 flex flex-col p-4 lg:p-6 bg-muted/40 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Volver</span>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold font-headline">{lead.name}</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{lead.city}</span>
                        <Separator orientation="vertical" className="h-4" />
                         {currentStageInfo && (
                            <Badge 
                              className='font-medium text-white'
                              style={{ backgroundColor: currentStageInfo.colorHex }}
                            >
                                {lead.status}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                {/* Left Column (Forms & Actions) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Formulario de Etapa: {lead.status}</CardTitle>
                             <CardDescription>
                                Completa la información requerida para esta etapa del proceso.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <StageForm 
                                stageName={lead.status} 
                                onSave={(data) => onSaveStageData(lead.status, data)}
                                initialData={lead.collectedData}
                                onDataChange={(data) => { /* Handle data change for validation */}}
                            />
                        </CardContent>
                    </Card>

                    {/* Stage Actions */}
                     <Card>
                        <CardHeader>
                            <CardTitle>Gestión de Etapas</CardTitle>
                            <CardDescription>Avanza el lead al siguiente paso o muévelo manually a otra etapa.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {mainAction ? (
                                <Button onClick={() => onUpdateStatus(mainAction)} size="lg" className="w-full font-bold" disabled={!canAdvance} title={!canAdvance ? "Completa los campos obligatorios para avanzar" : ""}>
                                    <ArrowRight className="mr-2 h-4 w-4" />
                                    Avanzar a: {mainAction}
                                </Button>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center p-4 bg-muted rounded-md">Este es el final del flujo.</p>
                            )}
                            <Separator />
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-muted-foreground">
                                    <ChevronsUpDown className="h-4 w-4" />
                                    Cambio Manual de Etapa
                                </Label>
                                <div className="flex gap-2">
                                    <Select onValueChange={setManualStage} value={manualStage}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una etapa..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {stages.map(stage => (
                                                <SelectItem key={stage.name} value={stage.name} disabled={stage.name === lead.status}>
                                                    {stage.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button onClick={handleManualChange} disabled={!manualStage || manualStage === lead.status} variant="outline">
                                        Cambiar
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                     </Card>
                </div>

                {/* Right Column (Info) */}
                <div className="space-y-6">
                   <CollectedInfo lead={lead} />
                   <AdvisorAssign lead={lead} advisors={advisors} onAssignLead={onAssignLead} />
                   <QuickNotes />
                </div>
            </div>
        </main>
    );
}
