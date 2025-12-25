import React from 'react';
import styles from './PremiumCard.module.css';
import { cn } from '@/lib/utils';

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    variant?: 'default' | 'transparent';
}

export const PremiumCard: React.FC<PremiumCardProps> = ({ children, className, hoverEffect = true, variant = 'default', ...props }) => {
    return (
        <div
            className={cn(
                styles.card,
                variant === 'transparent' && styles.transparent,
                className,
                { 'hover:translate-y-0': !hoverEffect }
            )}
            {...props}
        >
            <div className={styles.shine} />
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};
