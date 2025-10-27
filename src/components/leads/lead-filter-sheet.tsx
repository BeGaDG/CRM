
'use client';
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type LeadFilterSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dateRange?: DateRange;
    setDateRange: (dateRange?: DateRange) => void;
}

export const LeadFilterSheet = ({ open, onOpenChange, dateRange, setDateRange }: LeadFilterSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full max-w-sm flex flex-col">
        <SheetHeader>
            <SheetTitle>Filtros Avanzados</SheetTitle>
            <SheetDescription>
            Refina tu búsqueda de leads con estas opciones.
            </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6 flex-1 overflow-y-auto">
            
            <div className='space-y-3'>
            <Label>Fecha de Creación</Label>
            <Popover>
                <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                    dateRange.to ? (
                        <>
                        {format(dateRange.from, "LLL dd, y", { locale: es })} -{" "}
                        {format(dateRange.to, "LLL dd, y", { locale: es })}
                        </>
                    ) : (
                        format(dateRange.from, "LLL dd, y", { locale: es })
                    )
                    ) : (
                    <span>Selecciona un rango de fechas</span>
                    )}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                    locale={es}
                />
                </PopoverContent>
            </Popover>
            </div>

            <Separator />
            
            <div className='space-y-3'>
            <Label>Tipo de Interés</Label>
            <div className='flex items-center space-x-2'>
                <Checkbox id="interest-planta"/>
                <Label htmlFor="interest-planta" className='font-normal'>Planta Solar</Label>
            </div>
                <div className='flex items-center space-x-2'>
                <Checkbox id="interest-comercializadora"/>
                <Label htmlFor="interest-comercializadora" className='font-normal'>Comercializadora</Label>
            </div>
            </div>
            
            <Separator />

            <div className="space-y-3">
            <Label htmlFor="city-filter">Ciudad</Label>
            <Input id="city-filter" placeholder="Ej: Bogotá D.C." />
            </div>

        </div>
        <div className='flex justify-end gap-2 mt-4 border-t pt-4'>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Limpiar</Button>
            <Button onClick={() => onOpenChange(false)}>Aplicar Filtros</Button>
        </div>
        </SheetContent>
    </Sheet>
  );
};
