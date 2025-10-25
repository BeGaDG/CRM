
'use client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { Button } from '../ui/button';
import { Filter } from 'lucide-react';

export const FilterBar = () => (
    <div className="flex flex-col sm:flex-row items-center gap-2 bg-card p-3 rounded-lg border">
        <div className="flex flex-1 w-full gap-2">
            <Select defaultValue="monteria">
                <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Ciudad" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="monteria">Montería</SelectItem>
                    <SelectItem value="sincelejo">Sincelejo</SelectItem>
                    <SelectItem value="todos">Todas las ciudades</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Asesor" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                    <SelectItem value="ana">Ana Gómez</SelectItem>
                    <SelectItem value="todos">Todos los asesores</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="07">
                <SelectTrigger className="w-full sm:w-[120px]"><SelectValue placeholder="Mes" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="01">Enero</SelectItem>
                    <SelectItem value="02">Febrero</SelectItem>
                    <SelectItem value="03">Marzo</SelectItem>
                    <SelectItem value="04">Abril</SelectItem>
                    <SelectItem value="05">Mayo</SelectItem>
                    <SelectItem value="06">Junio</SelectItem>
                    <SelectItem value="07">Julio</SelectItem>
                    <SelectItem value="08">Agosto</SelectItem>
                    <SelectItem value="09">Septiembre</SelectItem>
                    <SelectItem value="10">Octubre</SelectItem>
                    <SelectItem value="11">Noviembre</SelectItem>
                    <SelectItem value="12">Diciembre</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="2024">
                <SelectTrigger className="w-full sm:w-[100px]"><SelectValue placeholder="Año" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Button className="w-full sm:w-auto gap-2">
            <Filter className="h-4 w-4"/>
            Aplicar Filtros
        </Button>
    </div>
);
