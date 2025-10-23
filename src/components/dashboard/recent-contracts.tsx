'use client';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Contract = {
    id: string;
    customer: string;
    value: number;
    type: string;
    date: string;
}

export function RecentContracts({ contracts }: { contracts: Contract[] }) {
    return (
        <Card>
            <CardHeader className='flex-row items-center justify-between'>
              <div>
                <CardTitle className="font-headline text-lg">
                    Contratos Recientes
                </CardTitle>
                <CardDescription>Estos son los últimos contratos cerrados este mes.</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="#">Ver todos</Link>
              </Button>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="hidden sm:table-cell">Tipo de Interés</TableHead>
                    <TableHead className="hidden md:table-cell">Fecha de Cierre</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell>
                        <div className="font-medium">{contract.customer}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary">{contract.type}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{new Date(contract.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                      <TableCell className='text-right font-mono'>${contract.value.toLocaleString('es-CO')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
        </Card>
    );
}
