'use client';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from './date-picker';
import type { StageFormProps } from './form-props';

export const NoForm = ({ formData, handleSelectChange, handleDateChange, handleChange }: StageFormProps) => {
  return (
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
}
