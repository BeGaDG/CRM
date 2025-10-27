
'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { reportData, statusColors } from '@/lib/data/reportes-data';


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
