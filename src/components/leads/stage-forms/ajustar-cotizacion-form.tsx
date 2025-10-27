'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { DatePicker } from './date-picker';
import type { StageFormProps } from './form-props';

export const AjustarCotizacionForm = ({ formData, handleDateChange, handleChange, handleSelectChange }: StageFormProps) => {
  return (
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
  )
}
