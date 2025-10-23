'use client';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, UploadCloud, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

// This is a placeholder type. In a real app, you'd have a more robust Lead type.
type Lead = {
  name: string;
  city: string;
  phone: string;
  email: string;
  interestType: 'planta-solar' | 'comercializadora' | 'ambos';
};

export const ImportLeadsSheet = ({ open, onOpenChange, onImport }: { open: boolean; onOpenChange: (open: boolean) => void; onImport: (leads: Lead[]) => void; }) => {
    
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            // Basic file type check
            if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.csv')) {
                setError('Por favor, selecciona un archivo .xlsx o .csv');
                setFile(null);
            } else {
                setError(null);
                setFile(selectedFile);
            }
        }
    };
    
    const handleImportClick = () => {
        if (!file) {
            setError('Por favor, selecciona un archivo para importar.');
            return;
        }
        // Placeholder for file processing logic
        console.log('Processing file:', file.name);
        
        // This is where you would read the Excel/CSV file and parse the leads.
        // For this example, we'll just simulate a successful import with placeholder data.
        const fakeLeads: Lead[] = [
            { name: 'Importado Lead 1', city: 'Bogotá', phone: '3001112233', email: 'lead1@import.com', interestType: 'planta-solar' },
            { name: 'Importado Lead 2', city: 'Medellín', phone: '3004445566', email: 'lead2@import.com', interestType: 'comercializadora' },
        ];
        
        onImport(fakeLeads);
        // Reset state
        setFile(null);
        setError(null);
    };

    return (
         <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className='w-full max-w-lg'>
                <SheetHeader>
                    <SheetTitle>Importar Leads desde Excel</SheetTitle>
                    <SheetDescription>
                        Sube un archivo .xlsx o .csv con tus leads. Asegúrate de que el archivo tenga las columnas correctas.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="file-upload" className='font-semibold'>Paso 1: Descarga la plantilla</Label>
                        <p className='text-sm text-muted-foreground'>
                            Para asegurar una importación exitosa, usa nuestra plantilla.
                        </p>
                        <Button variant="outline" asChild>
                            <Link href="/plantilla-leads.xlsx" download>
                                <FileText className='mr-2 h-4 w-4'/>
                                Descargar Plantilla
                            </Link>
                        </Button>
                    </div>

                    <div className="space-y-2">
                         <Label htmlFor="file-upload" className='font-semibold'>Paso 2: Sube tu archivo</Label>
                        <div className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                            <UploadCloud className='h-12 w-12 text-muted-foreground mb-4' />
                            <p className="font-medium mb-1">
                                {file ? file.name : 'Arrastra y suelta tu archivo aquí'}
                            </p>
                            <p className="text-sm text-muted-foreground mb-4">o haz clic para buscar</p>
                            <Input 
                                id="file-upload" 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                                accept=".xlsx, .csv"
                            />
                        </div>
                    </div>

                    {error && (
                         <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
                 <SheetFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleImportClick} disabled={!file}>Importar Leads</Button>
                 </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
