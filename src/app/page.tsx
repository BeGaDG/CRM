import {
  Activity,
  BarChart3,
  CheckSquare,
  ClipboardList,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  Search,
  Settings,
  Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { OrangeFlowLogo } from '@/components/icons';
import { SalesChart } from '@/components/dashboard/sales-chart';

export default function Dashboard() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

  const recentSales = [
    { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00', fallback: 'OM' },
    { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00', fallback: 'JL' },
    { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00', fallback: 'IN' },
    { name: 'William Kim', email: 'will@email.com', amount: '+$99.00', fallback: 'WK' },
    { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00', fallback: 'SD' },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-border/80">
        <SidebarHeader className="flex items-center gap-2.5">
          <OrangeFlowLogo className="h-6 w-6" />
          <h2 className="text-lg font-semibold tracking-tight font-headline group-data-[collapsible=icon]:hidden">
            OrangeFlow
          </h2>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutDashboard />
                <span className="truncate">Panel de Inicio</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Users />
                <span className="truncate">Clientes</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <DollarSign />
                <span className="truncate">Ventas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <CheckSquare />
                <span className="truncate">Tareas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BarChart3 />
                <span className="truncate">Informes</span>
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
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Avatar" data-ai-hint={userAvatar.imageHint} />}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuItem>Soporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl font-headline">Panel de Inicio</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interacción Cliente</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">+180.1% desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rendimiento Ventas</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">+19% desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">57</div>
                <p className="text-xs text-muted-foreground">3 nuevas tareas</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <SalesChart />
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Ventas Recientes</CardTitle>
                <CardDescription>Has realizado 265 ventas este mes.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarFallback>{sale.fallback}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">{sale.name}</p>
                      <p className="text-sm text-muted-foreground">{sale.email}</p>
                    </div>
                    <div className="ml-auto font-medium">{sale.amount}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
