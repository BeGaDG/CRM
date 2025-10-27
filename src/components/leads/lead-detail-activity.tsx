
'use client';
import { TabsContent } from '@/components/ui/tabs';
import { Contact } from 'lucide-react';

export const LeadDetailActivity = () => {
    return (
        <TabsContent value="actividad" className="p-4 space-y-4 text-xs">
            <div className="flex items-start gap-3">
                <div className="bg-muted p-2 rounded-full mt-1">
                    <Contact className="h-3 w-3" />
                </div>
                <p><span className="font-semibold">Lead creado</span> por 'Admin'. Asignado a 'Carlos Ruiz'. <span className="text-muted-foreground">Hace 3h</span></p>
            </div>
        </TabsContent>
    );
};
