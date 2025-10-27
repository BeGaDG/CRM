
'use client';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

export const FilterBar = () => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2024, 0, 1),
        to: new Date(),
    });

    return (
        <div className="flex flex-col sm:flex-row items-center gap-2 bg-card p-3 rounded-lg border">
            <div className="flex flex-1 w-full gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn("w-full sm:w-[260px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                            <>
                                {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                                {format(date.to, "LLL dd, y", { locale: es })}
                            </>
                            ) : (
                            format(date.from, "LLL dd, y", { locale: es })
                            )
                        ) : (
                            <span>Selecciona un rango</span>
                        )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={es}
                        />
                    </PopoverContent>
                </Popover>
                <Select>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Sede" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las Sedes</SelectItem>
                        <SelectItem value="monteria">Montería</SelectItem>
                        <SelectItem value="sincelejo">Sincelejo</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Comercial" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                        <SelectItem value="ana">Ana Gómez</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <Button className="w-full sm:w-auto gap-2">
                <Download className="h-4 w-4"/>
                Exportar Reporte
            </Button>
        </div>
    )
}
