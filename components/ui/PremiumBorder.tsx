import React from 'react';
import styles from './PremiumBorder.module.css';
import { cn } from '@/lib/utils';

interface PremiumBorderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export const PremiumBorder: React.FC<PremiumBorderProps> = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(styles.borderWrapper, className)}
            {...props}
        >
            {children}
        </div>
    );
};
