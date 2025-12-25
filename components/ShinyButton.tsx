import React from 'react';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({ text, className = "", ...props }) => {
    return (
        <div className={`inline-block bg-transparent ${className}`}>
            <button className="shiny-cta focus:outline-none" {...props}>
                <span>{text}</span>
            </button>
        </div>
    );
};
