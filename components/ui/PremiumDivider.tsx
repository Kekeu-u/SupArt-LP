import React from 'react';
import styles from './PremiumDivider.module.css';
import { cn } from '@/lib/utils';

interface PremiumDividerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const PremiumDivider: React.FC<PremiumDividerProps> = ({ className, ...props }) => {
    return (
        <div
            className={cn(styles.divider, className)}
            {...props}
        />
    );
};
