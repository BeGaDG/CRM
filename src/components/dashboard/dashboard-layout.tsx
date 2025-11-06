'use client';
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  BarChart,
  Bell,
  Contact,
  FileText,
  LayoutDashboard,
  TrendingUp,
  Settings,
  Users,
  Grid,
  File,
  MessageSquare,
  Calendar,
  XCircle,
  Briefcase
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SolarPanelIcon } from '@/components/icons';
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
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Search } from 'lucide-react';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/leads', icon: Contact, label: 'Leads' },
  { href: '/users', icon: Users, label: 'Usuarios' },
  { href: '/invoices', icon: FileText, label: 'Facturas' },
  { href: '/reportes', icon: BarChart, label: 'Reportes' },
  { href: '/indicadores', icon: TrendingUp, label: 'Indicadores' },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/80 bg-sidebar text-sidebar-foreground">
        <SidebarHeader className="flex flex-col items-start gap-2 p-4 h-auto">
          <div className="flex items-center gap-3">
              <Image src="/Icono.png" width={40} height={40} alt="Logo Sol & Cielo" />
              <div>
                  <h2 className="text-base font-semibold tracking-tight font-headline group-data-[collapsible=icon]:hidden">
                    Panel Administrativo
                  </h2>
                  <p className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">Sol y Cielo</p>
              </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
            <SidebarGroup>
                <SidebarGroupLabel>Plataforma Web</SidebarGroupLabel>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href="/">
                            <SidebarMenuButton isActive={pathname === '/'}>
                                <Grid />
                                <span className="truncate">Inicio</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="#">
                            <SidebarMenuButton>
                                <File />
                                <span className="truncate">Solicitudes Web</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="#">
                            <SidebarMenuButton>
                                <MessageSquare />
                                <span className="truncate">PQRS</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <Link href="#">
                            <SidebarMenuButton>
                                <SolarPanelIcon />
                                <span className="truncate">Proyectos solares</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>

             <SidebarGroup>
                <SidebarGroupLabel>CRM</SidebarGroupLabel>
                <SidebarMenu>
                     <SidebarMenuItem>
                        <Link href="/leads">
                            <SidebarMenuButton isActive={pathname.startsWith('/leads')}>
                                <Contact />
                                <span className="truncate">Leads</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="#">
                            <SidebarMenuButton>
                                <Calendar />
                                <span className="truncate">Actividades</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <Link href="#">
                            <SidebarMenuButton>
                                <XCircle />
                                <span className="truncate">No interesados</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <Link href="/indicadores">
                            <SidebarMenuButton isActive={pathname.startsWith('/indicadores')}>
                                <TrendingUp />
                                <span className="truncate">Indicadores</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
                 <SidebarGroupLabel>Gestión</SidebarGroupLabel>
                 <SidebarMenu>
                     <SidebarMenuItem>
                        <Link href="/users">
                            <SidebarMenuButton isActive={pathname.startsWith('/users')}>
                                <Users />
                                <span className="truncate">Clientes</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <Link href="/invoices">
                            <SidebarMenuButton isActive={pathname.startsWith('/invoices')}>
                                <FileText />
                                <span className="truncate">Facturas</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                <span className="truncate">Ajustes</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col bg-muted/40">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar en todo el CRM..."
                className="w-full rounded-md bg-muted pl-9 md:w-[200px] lg:w-[320px] h-9"
              />
          </div>
          <div className="ml-auto flex items-center gap-2">
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                  <Avatar className="h-9 w-9">
                    {userAvatar && (
                      <AvatarImage
                        src={userAvatar.imageUrl}
                        alt="Avatar de usuario"
                        data-ai-hint={userAvatar.imageHint}
                      />
                    )}
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Menú de usuario</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
