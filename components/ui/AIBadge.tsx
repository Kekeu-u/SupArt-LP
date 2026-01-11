import React from 'react';
import { cn } from '@/lib/utils';

interface AIBadgeProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'static';
}

export function AIBadge({
    className,
    size = 'md',
    position = 'static'
}: AIBadgeProps) {

    const sizeClasses = {
        sm: 'text-[10px] gap-1.5',
        md: 'text-xs gap-2',
        lg: 'text-sm gap-2.5',
    };

    const boxSizeClasses = {
        sm: 'px-1 py-0.5 rounded-[3px]',
        md: 'px-1.5 py-0.5 rounded-[4px]',
        lg: 'px-2 py-1 rounded-[5px]',
    };

    const positionClasses = {
        'static': '',
        'bottom-left': 'absolute bottom-4 left-4 z-10',
        'bottom-right': 'absolute bottom-4 right-4 z-10',
        'top-left': 'absolute top-4 left-4 z-10',
        'top-right': 'absolute top-4 right-4 z-10',
    };

    return (
        <div
            className={cn(
                "flex items-center font-sans select-none",
                "text-white/70 font-medium tracking-wider uppercase",
                sizeClasses[size],
                positionClasses[position],
                className
            )}
        >
            <span>Criado com</span>
            <span
                className={cn(
                    "bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold shadow-sm",
                    "flex items-center justify-center",
                    boxSizeClasses[size]
                )}
            >
                IA
            </span>
        </div>
    );
}
