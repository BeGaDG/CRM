'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DatePicker } from './date-picker';
import type { StageFormProps } from './form-props';

export const PorVisitarForm = ({ formData, handleDateChange, handleChange, handleSelectChange }: StageFormProps) => {
  return (
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
  );
};
