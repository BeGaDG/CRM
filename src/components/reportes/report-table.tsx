'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const reportData = [
  { id: 'lead-1', lead_name: 'Constructora S.A.S', assigned_to: 'Carlos Ruiz', status: 'Contratado', last_update: '2024-07-28', value: 120000000, sede: 'Montería' },
  { id: 'lead-2', lead_name: 'Inversiones XYZ', assigned_to: 'Ana Gómez', status: 'Cotizado', last_update: '2024-07-27', value: 15000000, sede: 'Sincelejo' },
  { id: 'lead-3', lead_name: 'Logística Total', assigned_to: 'Carlos Ruiz', status: 'Visitado', last_update: '2024-07-25', value: 0, sede: 'Montería' },
  { id: 'lead-4', lead_name: 'Nuevo Cliente Alfa', assigned_to: 'Luisa Fernández', status: 'Contactado', last_update: '2024-07-28', value: 0, sede: 'Otros' },
  { id: 'lead-5', lead_name Tiendas La Rebaja', assigned_to: 'Ana Gómez', status: 'Contratado', last_update: '2024-07-22', value: 85000000, sede: 'Sincelejo' },
];

const statusColors: { [key: string]: string } = {
  Contratado: 'bg-green-100 text-green-800',
  Cotizado: 'bg-blue-100 text-blue-800',
  Visitado: 'bg-purple-100 text-purple-800',
  Contactado: 'bg-yellow-100 text-yellow-800',
  Nuevo: 'bg-gray-100 text-gray-800',
};


export const ReportTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reporte Detallado</CardTitle>
        <CardDescription>Análisis detallado de los leads según los filtros aplicados.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead / Cliente</TableHead>
              <TableHead className="hidden sm:table-cell">Asesor</TableHead>
              <TableHead className="hidden md:table-cell">Sede</TableHead>
              <TableHead className="hidden lg:table-cell">Último Movimiento</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Valor</TableHead>
               <TableHead><span className="sr-only">Acciones</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.lead_name}</TableCell>
                <TableCell className="hidden sm:table-cell">{item.assigned_to}</TableCell>
                <TableCell className="hidden md:table-cell">{item.sede}</TableCell>
                <TableCell className="hidden lg:table-cell">{item.last_update}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusColors[item.status]}>{item.status}</Badge>
                </TableCell>
                <TableCell className="text-right font-mono">${item.value.toLocaleString('es-CO')}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Lead</DropdownMenuItem>
                            <DropdownMenuItem>Ver Asesor</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
