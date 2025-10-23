'use client';
import { Button } from '@/components/ui/button';
import { FileSearch } from 'lucide-react';

type EmptyStateProps = {
    title: string;
    description: string;
    onRetry?: () => void;
    retryText?: string;
}

export const EmptyState = ({ title, description, onRetry, retryText = "Reintentar" }: EmptyStateProps) => {
  return (
    <div className="text-center py-20 px-6 bg-card border border-dashed rounded-lg">
        <FileSearch className="h-16 w-16 mx-auto mb-4 opacity-30 text-primary" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
        {onRetry && (
            <Button onClick={onRetry}>{retryText}</Button>
        )}
    </div>
  );
};
