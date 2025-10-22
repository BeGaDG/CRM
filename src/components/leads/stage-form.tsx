'use client';
import React, { useState, useEffect } from 'react';
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

export const StageForm = ({ stageName, onSave, onDataChange, initialData = {} }: { stageName: string | null; onSave: (data: any) => void; onDataChange: (data: any) => void; initialData?: any; }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev: any) => ({
      ...prev,
      [id]: isCheckbox ? checked : value,
    }));
    onDataChange(formData);
  };

  const handleSelectChange = (id: string, value: string) => {
     setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
    onDataChange(formData);
  }

  const handleDateChange = (id: string, date?: Date) => {
    setFormData((prev: any) => ({
      ...prev,
      [id]: date,
    }));
    onDataChange(formData);
  }

  const handleSaveClick = () => {
    onSave(formData);
  }

  const forms: { [key: string]: React.ReactNode } = {
    'Nuevo Cliente': (
      <div className="space-y-4">
        <div>
          <Label htmlFor="nombre">Nombre <span className='text-destructive'>*</span></Label>
          <Input id="name" placeholder="Nombre completo del cliente" defaultValue={formData.name} onChange={handleChange}/>
        </div>
        <div>
          <Label htmlFor="direccion">Dirección</Label>
          <Input id="address" placeholder="Dirección del cliente" defaultValue={formData.address} onChange={handleChange}/>
        </div>
        <div>
          <Label htmlFor="telefono">Número de teléfono <span className='text-destructive'>*</span></Label>
          <Input id="phone" type="tel" placeholder="Ej: 3101234567" defaultValue={formData.phone} onChange={handleChange}/>
        </div>
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="ejemplo@correo.com" defaultValue={formData.email} onChange={handleChange}/>
        </div>
      </div>
    ),
    'Por Visitar': (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Tipo de Interés <span className='text-destructive'>*</span></Label>
          <div className='flex items-center space-x-2'>
            <Checkbox id="interes_planta_solar" checked={formData.interes_planta_solar} onCheckedChange={(checked) => handleSelectChange('interes_planta_solar', !!checked as any)} />
            <Label htmlFor="interes_planta_solar" className='font-normal'>Planta Solar</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id="interes_comercializadora" checked={formData.interes_comercializadora} onCheckedChange={(checked) => handleSelectChange('interes_comercializadora', !!checked as any)} />
            <Label htmlFor="interes_comercializadora" className='font-normal'>Comercializadora</Label>
          </div>
        </div>
        <div>
          <Label>Día de la visita <span className='text-destructive'>*</span></Label>
          <DatePicker date={formData.visit_date} setDate={(date) => handleDateChange('visit_date', date)} />
        </div>
        <div><Label htmlFor="nic">NIC</Label><Input id="nic" defaultValue={formData.nic} onChange={handleChange}/></div>
        <div><Label htmlFor="factura">Factura (File)</Label><Input id="factura" type="file" /></div>
        <div><Label>Fecha de emisión de la factura</Label><DatePicker date={formData.invoice_date} setDate={(date) => handleDateChange('invoice_date', date)} /></div>
        <div><Label htmlFor="consumo">Consumo mensual</Label><Input id="consumo" defaultValue={formData.consumo} onChange={handleChange}/></div>
        <div><Label htmlFor="pago">Promedio de pago por consumo $</Label><Input id="pago" type="number" defaultValue={formData.pago} onChange={handleChange}/></div>
        <div><Label htmlFor="departamento">Departamento <span className='text-destructive'>*</span></Label><Input id="departamento" defaultValue={formData.departamento} onChange={handleChange}/></div>
        <div><Label htmlFor="ciudad">Ciudad <span className='text-destructive'>*</span></Label><Input id="ciudad" defaultValue={formData.ciudad} onChange={handleChange}/></div>
        <div><Label htmlFor="operador">Operador de red</Label><Input id="operador" defaultValue={formData.operador} onChange={handleChange}/></div>
        <div><Label htmlFor="comercializador">Comercializador actual</Label><Input id="comercializador" defaultValue={formData.comercializador} onChange={handleChange}/></div>
        <div className='space-y-2'>
          <Label>Tipo de mercado</Label>
          <RadioGroup value={formData.market_type} onValueChange={(value) => handleSelectChange('market_type', value)} className='flex gap-4'>
            <div className="flex items-center space-x-2"><RadioGroupItem value="regulado" id="regulado" /><Label htmlFor="regulado" className='font-normal'>Regulado</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="no_regulado" id="no_regulado" /><Label htmlFor="no_regulado" className='font-normal'>No Regulado</Label></div>
          </RadioGroup>
        </div>
        <div><Label htmlFor="tension">Nivel de tensión</Label><Input id="tension" defaultValue={formData.tension} onChange={handleChange}/></div>
        <div><Label htmlFor="direccion_visita">Dirección <span className='text-destructive'>*</span></Label><Input id="direccion_visita" defaultValue={formData.direccion_visita} onChange={handleChange}/></div>
        <div><Label htmlFor="email_visita">Correo electrónico</Label><Input id="email_visita" type="email" defaultValue={formData.email_visita} onChange={handleChange}/></div>
      </div>
    ),
    'Por Cotizar': (
      <div className="space-y-4">
        <div><Label htmlFor="nic_cotizar">NIC <span className='text-destructive'>*</span></Label><Input id="nic" defaultValue={formData.nic} onChange={handleChange}/></div>
        <div><Label htmlFor="factura_cotizar">Factura (File) <span className='text-destructive'>*</span></Label><Input id="factura_cotizar" type="file" /></div>
        <div><Label>Fecha de emisión de la factura <span className='text-destructive'>*</span></Label><DatePicker date={formData.invoice_date} setDate={(date) => handleDateChange('invoice_date', date)} /></div>
        <div><Label htmlFor="consumo_cotizar">Consumo mensual <span className='text-destructive'>*</span></Label><Input id="consumo" defaultValue={formData.consumo} onChange={handleChange}/></div>
        <div><Label htmlFor="pago_cotizar">Promedio de pago por consumo $ <span className='text-destructive'>*</span></Label><Input id="pago" type="number" defaultValue={formData.pago} onChange={handleChange}/></div>
        <div><Label htmlFor="email_cotizar">Correo electrónico</Label><Input id="email" type="email" defaultValue={formData.email} onChange={handleChange}/></div>
        <div><Label htmlFor="operador_cotizar">Operador de red <span className='text-destructive'>*</span></Label><Input id="operador" defaultValue={formData.operador} onChange={handleChange}/></div>
        <div><Label htmlFor="comercializador_cotizar">Comercializador actual <span className='text-destructive'>*</span></Label><Input id="comercializador" defaultValue={formData.comercializador} onChange={handleChange}/></div>
        <div><Label htmlFor="tension_cotizar">Nivel de tensión <span className='text-destructive'>*</span></Label><Input id="tension" defaultValue={formData.tension} onChange={handleChange}/></div>
        <div className='space-y-2'>
          <Label>Tipo de mercado <span className='text-destructive'>*</span></Label>
           <RadioGroup value={formData.market_type} onValueChange={(value) => handleSelectChange('market_type', value)} className='flex gap-4'>
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
          <DatePicker date={formData.quote_date} setDate={(date) => handleDateChange('quote_date', date)} />
        </div>
        <div><Label htmlFor="cotizacion_file">Cotización (File) <span className='text-destructive'>*</span></Label><Input id="cotizacion_file" type="file" /></div>
        <div><Label htmlFor="valor_cotizacion">Valor de cotización <span className='text-destructive'>*</span></Label><Input id="valor_cotizacion" type="number" defaultValue={formData.valor_cotizacion} onChange={handleChange}/></div>

        <Separator />
        <h4 className='font-semibold'>Planta Solar</h4>
        <div className="grid grid-cols-2 gap-4">
          <div><Label htmlFor="ref_inversor">Ref. Inversor <span className='text-destructive'>*</span></Label><Input id="ref_inversor" defaultValue={formData.ref_inversor} onChange={handleChange}/></div>
          <div><Label htmlFor="cant_inversores">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_inversores" type="number" defaultValue={formData.cant_inversores} onChange={handleChange}/></div>
          <div><Label htmlFor="ref_panel">Ref. Panel <span className='text-destructive'>*</span></Label><Input id="ref_panel" defaultValue={formData.ref_panel} onChange={handleChange}/></div>
          <div><Label htmlFor="cant_paneles">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_paneles" type="number" defaultValue={formData.cant_paneles} onChange={handleChange}/></div>
          <div className='col-span-2'><Label htmlFor="potencia">Potencia pico ofrecida <span className='text-destructive'>*</span></Label><Input id="potencia_pico" defaultValue={formData.potencia_pico} onChange={handleChange}/></div>
        </div>

        <Separator />
        <h4 className='font-semibold'>Comercializadora</h4>
        <div><Label htmlFor="tipo_medidor">Tipo de Medidor <span className='text-destructive'>*</span></Label><Input id="tipo_medidor" defaultValue={formData.tipo_medidor} onChange={handleChange}/></div>
        <div className="space-y-2">
          <Label>Telemedida <span className='text-destructive'>*</span></Label>
          <div className='flex items-center space-x-2'><Checkbox id="telemedida" checked={formData.telemedida} onCheckedChange={(checked) => handleSelectChange('telemedida', !!checked as any)} /><Label htmlFor="telemedida" className='font-normal'>Incluir</Label></div>
        </div>
        <div className="space-y-2">
          <Label>Monitoreo <span className='text-destructive'>*</span> (Condicionado a si tiene proyecto solar)</Label>
          <div className='flex items-center space-x-2'><Checkbox id="monitoreo" checked={formData.monitoreo} onCheckedChange={(checked) => handleSelectChange('monitoreo', !!checked as any)} /><Label htmlFor="monitoreo" className='font-normal'>Incluir</Label></div>
        </div>
      </div>
    ),
    'Por Contratar': (
      <div className='space-y-4'>
        <div><Label htmlFor="contrato_file">Contrato firmado (File) <span className='text-destructive'>*</span></Label><Input id="contrato_file" type="file" /></div>
        <div><Label htmlFor="pago_file">Comprobante de pago (File)</Label><Input id="pago_file" type="file" /></div>
        <div><Label htmlFor="valor_contrato">Valor <span className='text-destructive'>*</span></Label><Input id="valor_contrato" type="number" defaultValue={formData.valor_contrato} onChange={handleChange}/></div>
        <div><Label htmlFor="financiacion">Tipo de financiación <span className='text-destructive'>*</span></Label><Input id="financiacion" defaultValue={formData.financiacion} onChange={handleChange}/></div>
        <div><Label htmlFor="email_contrato">Correo electrónico <span className='text-destructive'>*</span></Label><Input id="email_contrato" type="email" defaultValue={formData.email_contrato} onChange={handleChange}/></div>
      </div>
    ),
    'Ajustar Cotización': (
      <div className="space-y-6">
        <div>
          <Label>Fecha de cotización <span className='text-destructive'>*</span></Label>
          <DatePicker date={formData.quote_date_aj} setDate={(date) => handleDateChange('quote_date_aj', date)} />
        </div>
        <div><Label htmlFor="cotizacion_file_aj">Cotización (File) <span className='text-destructive'>*</span></Label><Input id="cotizacion_file_aj" type="file" /></div>
        <div><Label htmlFor="valor_cotizacion_aj">Valor de cotización <span className='text-destructive'>*</span></Label><Input id="valor_cotizacion" type="number" defaultValue={formData.valor_cotizacion} onChange={handleChange}/></div>

        <Separator />
        <h4 className='font-semibold'>Planta Solar</h4>
        <div className="grid grid-cols-2 gap-4">
          <div><Label htmlFor="ref_inversor_aj">Ref. Inversor <span className='text-destructive'>*</span></Label><Input id="ref_inversor" defaultValue={formData.ref_inversor} onChange={handleChange}/></div>
          <div><Label htmlFor="cant_inversores_aj">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_inversores" type="number" defaultValue={formData.cant_inversores} onChange={handleChange}/></div>
          <div><Label htmlFor="ref_panel_aj">Ref. Panel <span className='text-destructive'>*</span></Label><Input id="ref_panel" defaultValue={formData.ref_panel} onChange={handleChange}/></div>
          <div><Label htmlFor="cant_paneles_aj">Cantidad <span className='text-destructive'>*</span></Label><Input id="cant_paneles" type="number" defaultValue={formData.cant_paneles} onChange={handleChange}/></div>
          <div className='col-span-2'><Label htmlFor="potencia_aj">Potencia pico ofrecida <span className='text-destructive'>*</span></Label><Input id="potencia_pico" defaultValue={formData.potencia_pico} onChange={handleChange}/></div>
        </div>

        <Separator />
        <h4 className='font-semibold'>Comercializadora</h4>
        <div><Label htmlFor="tipo_medidor_aj">Tipo de Medidor <span className='text-destructive'>*</span></Label><Input id="tipo_medidor" defaultValue={formData.tipo_medidor} onChange={handleChange}/></div>
        <div className="space-y-2">
          <Label>Telemedida <span className='text-destructive'>*</span></Label>
          <div className='flex items-center space-x-2'><Checkbox id="telemedida_aj" checked={formData.telemedida} onCheckedChange={(checked) => handleSelectChange('telemedida_aj', !!checked as any)} /><Label htmlFor="telemedida_aj" className='font-normal'>Incluir</Label></div>
        </div>
        <div className="space-y-2">
          <Label>Monitoreo <span className='text-destructive'>*</span> (Condicionado a si tiene proyecto solar)</Label>
          <div className='flex items-center space-x-2'><Checkbox id="monitoreo_aj" checked={formData.monitoreo} onCheckedChange={(checked) => handleSelectChange('monitoreo_aj', !!checked as any)} /><Label htmlFor="monitoreo_aj" className='font-normal'>Incluir</Label></div>
        </div>
      </div>
    ),
    'Seguimiento a la Cotización': (
      <div className='space-y-4'>
        <div>
          <Label>Fecha de próximo acercamiento <span className='text-destructive'>*</span></Label>
          <DatePicker date={formData.follow_up_date} setDate={(date) => handleDateChange('follow_up_date', date)} />
        </div>
        <div>
          <Label>Acción a realizar <span className='text-destructive'>*</span></Label>
          <Select value={formData.follow_up_action} onValueChange={(value) => handleSelectChange('follow_up_action', value)}>
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
          <Textarea placeholder="Añadir notas..." id="follow_up_notes" defaultValue={formData.follow_up_notes} onChange={handleChange}/>
        </div>
        <div>
          <Label>Estado de la cotización</Label>
          <RadioGroup value={formData.quote_status} onValueChange={(value) => handleSelectChange('quote_status', value)} className='flex gap-4'>
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
          <Select value={formData.rejection_reason} onValueChange={(value) => handleSelectChange('rejection_reason', value)}>
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
          <Textarea placeholder="Añadir observaciones..." id="rejection_notes" defaultValue={formData.rejection_notes} onChange={handleChange} />
        </div>
        <div>
          <Label>Fecha sugerida para recaptura (si aplica)</Label>
          <DatePicker date={formData.recapture_date} setDate={(date) => handleDateChange('recapture_date', date)} />
        </div>
      </div>
    )
  };

  const formContent = stageName ? forms[stageName] : null;

  if (!formContent) return null;

  return (
    <div className='space-y-4'>
      {formContent}
      <Button onClick={handleSaveClick} className='w-full'>
        <Save className="mr-2 h-4 w-4" />
        Guardar Borrador
      </Button>
    </div>
  );
};
