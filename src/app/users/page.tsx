'use client';
import { useState } from 'react';
import {
  ChevronRight,
  FileText,
  Filter,
  LayoutDashboard,
  MoreHorizontal,
  PlusCircle,
  Search,
  Settings,
  Users,
  Contact,
  BarChart,
  Upload,
  UserPlus
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SolYCieloLogo } from '@/components/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';


const usersData = [
    {
        id: 'user-1',
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@sol-cielo.com',
        role: 'Comercial',
        sede: 'Montería',
        status: true,
        last_login: '2024-07-22T14:30:00Z',
        avatar: 'https://picsum.photos/seed/301/40/40',
    },
    {
        id: 'user-2',
        name: 'Ana Gómez',
        email: 'ana.gomez@sol-cielo.com',
        role: 'Supervisor',
        sede: 'Sincelejo',
        status: true,
        last_login: '2024-07-22T16:05:00Z',
        avatar: 'https://picsum.photos/seed/302/40/40',
    },
    {
        id: 'user-3',
        name: 'Luisa Fernández',
        email: 'luisa.fernandez@sol-cielo.com',
        role: 'Administrador',
        sede: 'Montería',
        status: true,
        last_login: '2024-07-22T10:15:00Z',
        avatar: 'https://picsum.photos/seed/303/40/40',
    },
    {
        id: 'user-4',
        name: 'Jorge Arias',
        email: 'jorge.arias@sol-cielo.com',
        role: 'Comercial',
        sede: 'Otros',
        status: false,
        last_login: '2024-06-15T11:00:00Z',
        avatar: 'https://picsum.photos/seed/304/40/40',
    },
     {
        id: 'user-5',
        name: 'Maria Rodriguez',
        email: 'maria.rodriguez@sol-cielo.com',
        role: 'Contabilidad',
        sede: 'Sincelejo',
        status: true,
        last_login: '2024-07-21T09:00:00Z',
        avatar: 'https://picsum.photos/seed/305/40/40',
    },
];

type User = typeof usersData[0];

const roleColors: { [key: string]: string } = {
  Comercial: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  Supervisor: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  Administrador: 'bg-primary-500/10 text-primary-700 border-primary-500/20',
  Contabilidad: 'bg-green-500/10 text-green-700 border-green-500/20',
  Operaciones: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
};


const UserDetailPanel = ({ user, onClose }: { user: User | null, onClose: () => void }) => {
    if (!user) {
        return (
            <Card className="hidden lg:flex h-full items-center justify-center">
                <CardContent className="text-center text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <p className="font-semibold">Selecciona un usuario</p>
                    <p className="text-sm">Elige un usuario de la tabla para ver sus detalles.</p>
                </CardContent>
            </Card>
        );
    }
    
    return (
        <Card className="h-full flex flex-col relative">
           <Button variant="ghost" size="icon" className="lg:hidden absolute top-2 right-2 z-10" onClick={onClose}><UserPlus className="h-4 w-4"/></Button>
           <CardHeader className="text-center items-center gap-4">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </CardHeader>
             <CardContent className="flex-1 overflow-hidden p-0">
                <Tabs defaultValue="perfil" className="h-full flex flex-col">
                    <TabsList className="mx-4 mt-2">
                        <TabsTrigger value="perfil">Perfil</TabsTrigger>
                        <TabsTrigger value="actividad">Actividad</TabsTrigger>
                        <TabsTrigger value="config">Configuración</TabsTrigger>
                    </TabsList>
                    <div className='overflow-y-auto flex-1 p-4 text-sm space-y-4'>
                        <TabsContent value="perfil">
                            <div className="space-y-3">
                                <div className="flex justify-between"><strong>Rol:</strong> <Badge variant="secondary" className={roleColors[user.role]}>{user.role}</Badge></div>
                                <div className="flex justify-between"><strong>Sede:</strong> <span>{user.sede}</span></div>
                                <div className="flex justify-between items-center"><strong>Estado:</strong> <Badge variant={user.status ? 'default' : 'destructive'} className={user.status ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-700'}>{user.status ? 'Activo' : 'Inactivo'}</Badge></div>
                                <div className="flex justify-between"><strong>Último acceso:</strong> <span>{new Date(user.last_login).toLocaleDateString()}</span></div>
                            </div>
                            <Separator className="my-4" />
                            <h4 className="font-semibold mb-2">Permisos</h4>
                             <div className="space-y-2 text-muted-foreground">
                                <p>✓ Acceso a Gestión de Leads</p>
                                <p>✓ Acceso a Gestión de Usuarios</p>
                                <p>✕ Acceso a Reportes y Análisis</p>
                            </div>
                        </TabsContent>
                         <TabsContent value="actividad">
                            <div className="space-y-4 text-xs">
                                <div className="flex items-start gap-3">
                                    <div className="bg-muted p-2 rounded-full mt-1"><Contact className="h-3 w-3" /></div>
                                    <p><span className="font-semibold">Creó el lead 'Constructora S.A.S'</span><br/><span className="text-muted-foreground">Hace 2 horas</span></p>
                                </div>
                                 <div className="flex items-start gap-3">
                                    <div className="bg-muted p-2 rounded-full mt-1"><FileText className="h-3 w-3" /></div>
                                    <p><span className="font-semibold">Actualizó la cotización de 'Inversiones XYZ'</span><br/><span className="text-muted-foreground">Ayer</span></p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="config">
                             <div className="space-y-3">
                                 <Button variant="outline" className="w-full justify-start">Resetear contraseña</Button>
                                 <Button variant="outline" className="w-full justify-start">Cambiar rol</Button>
                                 <Button variant="destructive" className="w-full justify-start">Desactivar cuenta</Button>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}

const UserModalForm = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full max-w-md">
                <SheetHeader>
                    <SheetTitle>Crear Nuevo Usuario</SheetTitle>
                    <SheetDescription>
                        Completa los datos para registrar un nuevo miembro en el equipo.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                    <div>
                        <Label htmlFor="fullName">Nombre completo</Label>
                        <Input id="fullName" placeholder="Ej: Juanita Pérez" />
                    </div>
                    <div>
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" placeholder="ejemplo@sol-cielo.com" />
                    </div>
                    <div>
                        <Label htmlFor="role">Rol</Label>
                        <Select>
                            <SelectTrigger id="role"><SelectValue placeholder="Seleccionar rol..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="comercial">Comercial</SelectItem>
                                <SelectItem value="supervisor">Supervisor</SelectItem>
                                <SelectItem value="administrador">Administrador</SelectItem>
                                <SelectItem value="contabilidad">Contabilidad</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="sede">Sede</Label>
                        <Select>
                            <SelectTrigger id="sede"><SelectValue placeholder="Seleccionar sede..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="monteria">Montería</SelectItem>
                                <SelectItem value="sincelejo">Sincelejo</SelectItem>
                                <SelectItem value="otros">Otros</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label htmlFor="status-switch">Estado inicial</Label>
                            <p className="text-xs text-muted-foreground">Define si el usuario podrá iniciar sesión.</p>
                        </div>
                        <Switch id="status-switch" defaultChecked />
                    </div>
                </div>
                 <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button>Guardar Usuario</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};


export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(usersData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    if(isMobile){
        setIsModalOpen(true);
    }
  }

  const handleCloseDetail = () => {
    setSelectedUser(null);
    if(isMobile){
        setIsModalOpen(false);
    }
  }


  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/80">
        <SidebarHeader className="flex items-center gap-2.5 p-4">
          <SolYCieloLogo className="h-8 w-8" />
          <h2 className="text-xl font-semibold tracking-tight font-headline group-data-[collapsible=icon]:hidden">
            Sol & Cielo
          </h2>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton>
                  <LayoutDashboard />
                  <span className="truncate">Home General</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/leads">
                <SidebarMenuButton>
                  <Contact />
                  <span className="truncate">Gestión de Leads</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/users">
                <SidebarMenuButton isActive>
                  <Users />
                  <span className="truncate">Gestión de Usuarios</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FileText />
                <span className="truncate">Gestión de Facturas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BarChart />
                <span className="truncate">Reportes y Análisis</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                <span className="truncate">Configuración</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
           <div className="hidden md:flex text-sm items-center gap-2 text-muted-foreground">
             <Link href="/" className="hover:text-foreground">Home</Link>
             <ChevronRight className="h-4 w-4"/>
             <span className="font-semibold text-foreground">Gestión de Usuarios</span>
           </div>
          <div className="ml-auto flex items-center gap-2 md:gap-4">
            <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Buscar usuario..."
                className="w-full rounded-lg bg-background pl-10 h-10"
                />
            </div>
             <Button size="sm" className="gap-1.5" onClick={() => setIsModalOpen(true)}>
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Nuevo Usuario</span>
              </Button>
          </div>
        </header>

        <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:p-6 bg-muted/40 overflow-hidden">
            {/* Main Column: User Table */}
            <div className="lg:col-span-2 flex flex-col gap-4">
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                    <h2 className='text-lg font-semibold'>Usuarios del Sistema ({users.length})</h2>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select>
                            <SelectTrigger className="w-full sm:w-[120px]"><SelectValue placeholder="Rol" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los roles</SelectItem>
                                <SelectItem value="comercial">Comercial</SelectItem>
                                <SelectItem value="supervisor">Supervisor</SelectItem>
                                <SelectItem value="administrador">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select>
                            <SelectTrigger className="w-full sm:w-[120px]"><SelectValue placeholder="Estado" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Cualquier estado</SelectItem>
                                <SelectItem value="active">Activo</SelectItem>
                                <SelectItem value="inactive">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="hidden sm:flex gap-2">
                            <Upload className="h-4 w-4"/> Exportar
                        </Button>
                    </div>
                </div>
                
                 <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Usuario</TableHead>
                                <TableHead className="hidden md:table-cell">Rol</TableHead>
                                <TableHead className="hidden lg:table-cell">Sede</TableHead>
                                <TableHead className="hidden md:table-cell">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {users.length > 0 ? users.map((user) => (
                                <TableRow key={user.id} onClick={() => handleSelectUser(user)} className="cursor-pointer">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-xs text-muted-foreground hidden sm:block">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge variant="secondary" className={roleColors[user.role]}>{user.role}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">{user.sede}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className='flex items-center gap-2'>
                                            <Switch checked={user.status} readOnly className="pointer-events-none" />
                                            <span>{user.status ? 'Activo' : 'Inactivo'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleSelectUser(user)}>Ver detalles</DropdownMenuItem>
                                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive">Desactivar</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                         <div className="text-center text-muted-foreground py-10">
                                            <Users className="h-12 w-12 mx-auto mb-4" />
                                            <p className="font-medium">No hay usuarios registrados.</p>
                                            <p className="text-sm mb-4">Crea el primero para comenzar a gestionar tu equipo.</p>
                                            <Button size="sm" onClick={() => setIsModalOpen(true)}>
                                                <UserPlus className="mr-2 h-4 w-4" />
                                                Crear Usuario
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
            
            {/* Right Column: User Detail */}
            <div className="hidden lg:block">
                <UserDetailPanel user={selectedUser} onClose={handleCloseDetail} />
            </div>

            {/* Modal for new/edit user */}
            <UserModalForm open={isModalOpen && !isMobile} onOpenChange={setIsModalOpen} />
            
            {/* Sheet for mobile detail view */}
            {isMobile && (
                <Sheet open={isModalOpen} onOpenChange={(open) => {if(!open) handleCloseDetail()}}>
                    <SheetContent className="p-0 sm:max-w-lg w-full">
                        <UserDetailPanel user={selectedUser} onClose={handleCloseDetail} />
                    </SheetContent>
                </Sheet>
            )}

        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
