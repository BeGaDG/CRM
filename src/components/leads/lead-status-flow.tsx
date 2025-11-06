'use client';

import { cn } from "@/lib/utils";
import type { Stage } from "@/lib/data/leads-data";

interface LeadStatusFlowProps {
    stages: Stage[];
    currentStageName: string;
}

const stageColors = [
    '#6b7280', // 1. Nuevo (Gris)
    '#f59e0b', // 2. Por Contactar (Ámbar)
    '#f97316', // 3. Por Visitar (Naranja)
    '#3b82f6', // 4. Por Cotizar (Azul)
    '#8b5cf6', // 5. Por Presentar (Violeta)
    '#a855f7', // 6. Ajustar (Púrpura)
    '#84cc16', // 7. Seguimiento (Lima)
    '#16a34a', // 8. Por Contratar (Verde)
    '#10b981', // 9. Finalizado (Esmeralda)
];


export const LeadStatusFlow: React.FC<LeadStatusFlowProps> = ({ stages, currentStageName }) => {
    const currentStageIndex = stages.findIndex(s => s.name === currentStageName);

    return (
        <div className="space-y-4">
            {stages.map((stage, index) => {
                const isCompleted = index < currentStageIndex;
                const isCurrent = index === currentStageIndex;
                const isPending = index > currentStageIndex;
                const stepNumber = index + 1;
                
                const stageColor = stageColors[index % stageColors.length];

                return (
                    <div key={stage.name} className="flex flex-col">
                        <div className="flex items-center">
                            {stages.map((_, i) => (
                                <div key={`dot-${i}`} className="flex items-center w-full">
                                    <div 
                                        className={cn("w-4 h-4 rounded-full transition-all duration-300", {
                                            "bg-gray-600": i < index,
                                            [stage.color]: i === index,
                                            "bg-gray-300 dark:bg-gray-700": i > index,
                                        })}
                                        style={{ backgroundColor: i < index ? stageColors[i] : isCurrent ? stageColor : (isCompleted ? stageColors[i] : 'hsl(var(--muted))') }}
                                    ></div>
                                    {i < stages.length - 1 && (
                                        <div
                                            className={cn("h-0.5 w-full transition-all duration-300", {
                                                "bg-gray-300 dark:bg-gray-700": i >= currentStageIndex,
                                            })}
                                            style={{ backgroundColor: i < currentStageIndex ? stageColors[i] : 'hsl(var(--muted))' }}
                                        ></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 text-xs font-medium">
                            <span className={cn({ "text-foreground font-bold": isCurrent, "text-muted-foreground": !isCurrent })}>
                                {stage.name} ({stepNumber} de {stages.length})
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};
