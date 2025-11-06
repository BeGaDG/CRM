
'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StageForm } from './stage-form';
import type { Lead } from '@/lib/data/leads-data';

export const NewLeadForm = ({ open, onOpenChange, onSave }: { open: boolean; onOpenChange: (open: boolean) => void; onSave: (data: Partial<Lead>) => void; }) => {
    
      const [formData, setFormData] = useState<Partial<Lead>>({});

      const handleSave = () => {
        onSave(formData);
        onOpenChange(false);
        setFormData({});
      }

    return (
         <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>Crear Nuevo Lead</DialogTitle>
                    <DialogDescription>
                        Completa los siguientes campos para registrar un nuevo lead. Los campos marcados con <span className='text-destructive'>*</span> son obligatorios.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <StageForm 
                      stageName="Nuevo Lead" 
                      onSave={() => {}} 
                      onDataChange={(data) => setFormData(data)}
                      initialData={formData}
                    />
                </div>
                 <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Crear Lead</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
