'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DatePicker } from './date-picker';
import type { StageFormProps } from './form-props';

export const PorCotizarForm = ({ formData, handleChange, handleSelectChange, handleDateChange }: StageFormProps) => {
  return (
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
  )
}
