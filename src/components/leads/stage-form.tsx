'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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

export const StageForm = ({ stageName, onSave, onDataChange }: { stageName: string | null; onSave: () => void; onDataChange: (data: any) => void; }) => {
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
