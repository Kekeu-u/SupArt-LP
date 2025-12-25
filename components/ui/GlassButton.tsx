import React from 'react';
import styles from './GlassButton.module.css';
import { cn } from '@/lib/utils';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    href?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ children, className, href, ...props }) => {
    const ButtonContent = (
        <div className={styles.buttonWrap}>
            <button className={cn(styles.glassButton, className)} {...props}>
                <span className={styles.buttonText}>{children}</span>
                <div className={styles.buttonShine} />
            </button>
            <div className={styles.buttonShadow} />
        </div>
    );

    if (href) {
        return (
            <a href={href} className="inline-block bg-transparent no-underline">
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
