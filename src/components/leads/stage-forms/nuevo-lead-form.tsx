
'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { StageFormProps } from './form-props';

export const NuevoLeadForm = ({ formData, handleChange, handleSelectChange }: StageFormProps) => {
  return (
    <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre <span className='text-destructive'>*</span></Label>
          <Input id="name" placeholder="Nombre completo del cliente" defaultValue={formData.name} onChange={handleChange}/>
        </div>
        <div>
          <Label htmlFor="address">Dirección</Label>
          <Input id="address" placeholder="Dirección del cliente" defaultValue={formData.address} onChange={handleChange}/>
        </div>
        <div>
          <Label htmlFor="phone">Número de teléfono <span className='text-destructive'>*</span></Label>
          <Input id="phone" type="tel" placeholder="Ej: 3101234567" defaultValue={formData.phone} onChange={handleChange}/>
        </div>
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="ejemplo@correo.com" defaultValue={formData.email} onChange={handleChange}/>
        </div>
        <div>
          <Label htmlFor="source">Fuente del Lead</Label>
           <Select name="source" onValueChange={(value) => handleSelectChange('source', value)}>
            <SelectTrigger id="source">
              <SelectValue placeholder="Seleccionar fuente..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="referido">Referido</SelectItem>
              <SelectItem value="pagina_web">Página Web</SelectItem>
              <SelectItem value="redes_sociales">Redes Sociales</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
  )
}
