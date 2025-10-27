
'use client';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import { Button } from '@/components/ui/button';
import type { User } from '@/lib/data/users-data';

export const UserModalForm = ({ open, onOpenChange, user }: { open: boolean, onOpenChange: (open: boolean) => void, user?: User | null }) => {
    const title = user ? "Editar Usuario" : "Crear Nuevo Usuario";
    const description = user ? "Actualiza los datos del miembro del equipo." : "Completa los datos para registrar un nuevo miembro en el equipo.";
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full max-w-md">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                    <div>
                        <Label htmlFor="fullName">Nombre completo</Label>
                        <Input id="fullName" placeholder="Ej: Juanita Pérez" defaultValue={user?.name}/>
                    </div>
                    <div>
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" placeholder="ejemplo@sol-cielo.com" defaultValue={user?.email} />
                    </div>
                    <div>
                        <Label htmlFor="role">Rol</Label>
                        <Select defaultValue={user?.role}>
                            <SelectTrigger id="role"><SelectValue placeholder="Seleccionar rol..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Comercial">Comercial</SelectItem>
                                <SelectItem value="Supervisor">Supervisor</SelectItem>
                                <SelectItem value="Administrador">Administrador</SelectItem>
                                <SelectItem value="Contabilidad">Contabilidad</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="sede">Sede</Label>
                        <Select defaultValue={user?.sede}>
                            <SelectTrigger id="sede"><SelectValue placeholder="Seleccionar sede..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Montería">Montería</SelectItem>
                                <SelectItem value="Sincelejo">Sincelejo</SelectItem>
                                <SelectItem value="Otros">Otros</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label htmlFor="status-switch">Usuario Activo</Label>
                            <p className="text-xs text-muted-foreground">Define si el usuario podrá iniciar sesión.</p>
                        </div>
                        <Switch id="status-switch" defaultChecked={user ? user.status : true} />
                    </div>
                </div>
                 <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button>Guardar Cambios</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};
