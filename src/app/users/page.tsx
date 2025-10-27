
'use client';
import { useState } from 'react';
import {
  Upload,
  UserPlus,
  X,
  Users, MoreHorizontal, Contact, FileText, Search, Target, DollarSign
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { UserCard, UserDetailPanel, UserModalForm } from '@/components/users';
import { usersData, roleColors } from '@/lib/data/users-data';
import type { User } from '@/lib/data/users-data';

export default function UsersPage() {
  const [users] = useState<User[]>(usersData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsDetailSheetOpen(true);
  }

  const handleOpenForm = (user?: User | null) => {
    setSelectedUser(user || null);
    setIsFormOpen(true);
  }

  const handleCloseDetail = () => {
    setIsDetailSheetOpen(false);
    // Give animation time to finish before clearing, avoids visual glitch
    setTimeout(() => setSelectedUser(null), 300);
  }

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setTimeout(() => setSelectedUser(null), 300);
  }


  return (
    <DashboardLayout>
        <main className="flex-1 flex flex-col gap-6 p-4 lg:p-6 bg-muted/40">
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div className='flex-1'>
                    <h1 className='text-2xl font-semibold'>Usuarios y Equipo</h1>
                    <p className='text-muted-foreground'>Gestiona los miembros de tu equipo y sus permisos.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Upload className="mr-2 h-4 w-4"/> Exportar
                    </Button>
                    <Button className="w-full sm:w-auto" onClick={() => handleOpenForm()}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Nuevo Usuario
                    </Button>
                </div>
            </div>
            
             <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                     <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar por nombre o correo..." className="pl-9 w-full" />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Select>
                          <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Filtrar por rol" /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="all">Todos los roles</SelectItem>
                              <SelectItem value="Comercial">Comercial</SelectItem>
                              <SelectItem value="Supervisor">Supervisor</SelectItem>
                              <SelectItem value="Administrador">Admin</SelectItem>
                          </SelectContent>
                      </Select>
                      <Select>
                          <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Filtrar por estado" /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="all">Cualquier estado</SelectItem>
                              <SelectItem value="active">Activo</SelectItem>
                              <SelectItem value="inactive">Inactivo</SelectItem>
                          </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="overflow-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {users.length > 0 ? users.map((user) => (
                            <UserCard 
                                key={user.id} 
                                user={user} 
                                roleColors={roleColors}
                                onSelect={() => handleSelectUser(user)}
                                onEdit={() => handleOpenForm(user)}
                            />
                        )) : (
                             <div className="col-span-full text-center text-muted-foreground py-20">
                                <Users className="h-16 w-16 mx-auto mb-4 opacity-30" />
                                <p className="font-medium text-lg">No hay usuarios registrados</p>
                                <p className='text-base mb-4'>Crea el primero para comenzar a gestionar tu equipo.</p>
                                <Button size="sm" onClick={() => handleOpenForm()}>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Crear Usuario
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            
            {/* Sheet for User Detail */}
            <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
                <SheetContent className="p-0 sm:max-w-xl w-full flex flex-col">
                    <UserDetailPanel user={selectedUser} onClose={handleCloseDetail} />
                </SheetContent>
            </Sheet>


            {/* Modal for new/edit user */}
            <UserModalForm open={isFormOpen} onOpenChange={handleCloseForm} user={selectedUser} />

        </main>
    </DashboardLayout>
  );
}
