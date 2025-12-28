import React from 'react';
import styles from './styles.module.css';
import { cn } from '@/lib/utils';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    href?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({ children, className, href, ...props }) => {
    const ButtonContent = (
        <button className={cn(styles.shinyCta, className)} {...props}>
            <span>{children}</span>
        </button>
    );

    if (href) {
        return (
            <a href={href} className="inline-block bg-transparent">
                {ButtonContent}
            </a>
        );
    }

    return (
        <div className="inline-block bg-transparent">
            {ButtonContent}
        </div>
    );
};
