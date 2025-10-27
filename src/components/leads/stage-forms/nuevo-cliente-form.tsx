'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { StageFormProps } from './form-props';

export const NuevoClienteForm = ({ formData, handleChange }: StageFormProps) => {
  return (
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
  )
}
