'use client';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DatePicker } from './date-picker';
import type { StageFormProps } from './form-props';

export const SeguimientoCotizacionForm = ({ formData, handleSelectChange, handleDateChange, handleChange }: StageFormProps) => {
  return (
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
  )
}
