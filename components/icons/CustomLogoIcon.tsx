import React from 'react';
import IconPath from './IconLogoPath';

interface CustomIconProps {
    /**
     * Tamanho do ícone em pixels.
     * @default 24
     */
    size?: number;
    /**
     * Cor do ícone. Use classes do Tailwind (ex: text-red-500) ou códigos hex.
     * Se não informado, herda a cor do texto (currentColor).
     */
    color?: string;
    /**
     * Classes CSS adicionais.
     */
    className?: string;
    /**
     * Se true, preenche o ícone (fill). Se false, usa contorno (stroke).
     * @default false (stroke)
     */
    filled?: boolean;
}

export default function CustomIcon({
    size = 24,
    color = 'currentColor',
    className = '',
    filled = false,
}: CustomIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? color : 'none'}
            stroke={filled ? 'none' : color}
            strokeWidth={filled ? 0 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <IconPath />
        </svg>
    );
}
