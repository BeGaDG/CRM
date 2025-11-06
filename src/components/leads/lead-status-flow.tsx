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

    if (currentStageIndex === -1) {
        return (
            <div className="flex flex-col items-start mt-2">
                 <div className="flex items-center w-full">
                    {stages.map((stage, i) => (
                        <div key={`dot-${i}`} className="flex items-center w-full">
                            <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                            {i < stages.length - 1 && (
                                <div className="h-0.5 w-full bg-gray-300 dark:bg-gray-700"></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-2 text-xs font-medium text-muted-foreground">
                    <span>{currentStageName}</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col items-start mt-2">
            <div className="flex items-center w-full">
                {stages.map((stage, index) => {
                    const isCompleted = index < currentStageIndex;
                    const isCurrent = index === currentStageIndex;
                    const stageColor = stageColors[index % stageColors.length];

                    return (
                         <div key={`dot-${index}`} className="flex items-center w-full">
                            <div 
                                className={cn("w-3 h-3 rounded-full transition-all duration-300", {
                                    "bg-gray-300 dark:bg-gray-700": !isCompleted && !isCurrent
                                })}
                                style={{ 
                                    backgroundColor: isCurrent ? stageColor : (isCompleted ? stageColors[index] : 'hsl(var(--muted))')
                                }}
                            ></div>
                            {index < stages.length - 1 && (
                                <div
                                    className={cn("h-0.5 w-full transition-all duration-300", {
                                        "bg-gray-300 dark:bg-gray-700": index >= currentStageIndex,
                                    })}
                                     style={{ 
                                        backgroundColor: index < currentStageIndex ? stageColors[index] : 'hsl(var(--muted))'
                                    }}
                                ></div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="mt-2 text-xs font-medium">
                <span className={cn("text-muted-foreground")}>
                    {stages[currentStageIndex].name} ({currentStageIndex + 1} de {stages.length})
                </span>
            </div>
        </div>
    );
};
