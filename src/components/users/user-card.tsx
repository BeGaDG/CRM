'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Edit, Mail, MoreVertical } from 'lucide-react';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
    status: boolean;
};

type UserCardProps = {
    user: User;
    roleColors: { [key: string]: string };
    onSelect: () => void;
    onEdit: () => void;
};

export const UserCard = ({ user, roleColors, onSelect, onEdit }: UserCardProps) => {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-4 border-background ring-2 ring-muted">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                     <span className={cn(
                        "absolute bottom-1 right-1 block h-4 w-4 rounded-full border-2 border-background",
                        user.status ? "bg-green-500" : "bg-gray-400"
                    )} title={user.status ? 'Activo' : 'Inactivo'}></span>
                </div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{user.role}</p>
                <Badge variant="secondary" className={cn('font-normal mb-4', roleColors[user.role])}>{user.role}</Badge>
                
                <div className="flex w-full gap-2 mt-auto">
                    <Button variant="outline" size="sm" className="flex-1" onClick={onSelect}>
                        Ver Perfil
                    </Button>
                    <Button variant="default" size="sm" className="flex-1" onClick={onEdit}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
