'use client';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { StageForm } from './stage-form';
import type { Lead } from './lead-card';

export const NewLeadForm = ({ open, onOpenChange, onSave }: { open: boolean; onOpenChange: (open: boolean) => void; onSave: (data: Partial<Lead>) => void; }) => {
    
      const [formData, setFormData] = useState<Partial<Lead>>({});

      const handleSave = () => {
        onSave(formData);
        onOpenChange(false);
        setFormData({});
      }

    return (
         <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className='w-full max-w-lg overflow-y-auto'>
                <SheetHeader>
                <SheetTitle>Crear Nuevo Lead</SheetTitle>
                <SheetDescription>
                    Completa los siguientes campos para registrar un nuevo lead. Los campos marcados con <span className='text-destructive'>*</span> son obligatorios.
                </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                    <StageForm 
                      stageName="Nuevo Cliente" 
                      onSave={() => {}} 
                      onDataChange={(data) => setFormData(data)}
                      initialData={formData}
                    />
                </div>
                 <div className='flex justify-end gap-2 mt-4 sticky bottom-0 bg-background py-4'>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Crear Lead</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
