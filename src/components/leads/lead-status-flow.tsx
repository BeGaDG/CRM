
'use client';

import { cn } from "@/lib/utils";
import type { Stage } from "@/lib/data/leads-data";
import { stages as allStages } from "@/lib/data/leads-data";

interface LeadStatusFlowProps {
    stages: Stage[];
    currentStageName: string;
}


export const LeadStatusFlow: React.FC<LeadStatusFlowProps> = ({ stages, currentStageName }) => {
    const currentStageIndex = stages.findIndex(s => s.name === currentStageName);

    if (currentStageIndex === -1) {
        // Find the stage in the main list to get its color
        const fallbackStage = allStages.find(s => s.name === currentStageName);
        const color = fallbackStage?.colorHex || '#6b7280'; // Default gray
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
                <div className="mt-2 text-xs font-medium">
                     <span style={{ color: color }}>{currentStageName}</span>
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
                    const stageColor = stage.colorHex;

                    return (
                         <div key={`dot-${index}`} className="flex items-center w-full">
                            <div 
                                className={cn("w-3 h-3 rounded-full transition-all duration-300")}
                                style={{ 
                                    backgroundColor: isCurrent ? stageColor : (isCompleted ? stage.colorHex : 'hsl(var(--muted))')
                                }}
                            ></div>
                            {index < stages.length - 1 && (
                                <div
                                    className={cn("h-0.5 w-full transition-all duration-300")}
                                     style={{ 
                                        backgroundColor: index < currentStageIndex ? stage.colorHex : 'hsl(var(--muted))'
                                    }}
                                ></div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="mt-2 text-xs font-medium">
                <span className={cn("text-muted-foreground")}>
                    <span style={{ color: stages[currentStageIndex].colorHex }}>{stages[currentStageIndex].name}</span> ({currentStageIndex + 1} de {stages.length})
                </span>
            </div>
        </div>
    );
};
