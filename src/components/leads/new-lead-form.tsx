'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { StageForm } from './stage-form';

export const NewLeadForm = ({ onOpenChange, onSave }: { onOpenChange: (open: boolean) => void; onSave: (newStage: string) => void; }) => {
    
      const handleSave = () => {
        onSave("Nuevo Cliente");
        onOpenChange(false);
      }

    return (
         <Sheet open={true} onOpenChange={onOpenChange}>
            <SheetContent className='w-full max-w-lg overflow-y-auto'>
                <SheetHeader>
                <SheetTitle>Crear Nuevo Lead</SheetTitle>
                <SheetDescription>
                    Completa los siguientes campos para registrar un nuevo lead. Los campos marcados con <span className='text-destructive'>*</span> son obligatorios.
                </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                    <StageForm stageName="Nuevo Cliente" onSave={() => {}} onDataChange={() => {}} />
                </div>
                 <div className='flex justify-end gap-2 mt-4 sticky bottom-0 bg-background py-4'>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Crear Lead</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
