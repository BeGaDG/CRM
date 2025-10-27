'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { StageFormProps } from './form-props';

export const PorContratarForm = ({ formData, handleChange }: StageFormProps) => {
  return (
    <div className='space-y-4'>
        <div><Label htmlFor="contrato_file">Contrato firmado (File) <span className='text-destructive'>*</span></Label><Input id="contrato_file" type="file" /></div>
        <div><Label htmlFor="pago_file">Comprobante de pago (File)</Label><Input id="pago_file" type="file" /></div>
        <div><Label htmlFor="valor_contrato">Valor <span className='text-destructive'>*</span></Label><Input id="valor_contrato" type="number" defaultValue={formData.valor_contrato} onChange={handleChange}/></div>
        <div><Label htmlFor="financiacion">Tipo de financiación <span className='text-destructive'>*</span></Label><Input id="financiacion" defaultValue={formData.financiacion} onChange={handleChange}/></div>
        <div><Label htmlFor="email_contrato">Correo electrónico <span className='text-destructive'>*</span></Label><Input id="email_contrato" type="email" defaultValue={formData.email_contrato} onChange={handleChange}/></div>
      </div>
  )
}
