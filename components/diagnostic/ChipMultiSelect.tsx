'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

interface ChipOption {
    value: string;
    label: { en: string; pt: string } | string;
    icon?: string;
}

interface ChipMultiSelectProps {
    options: readonly ChipOption[] | ChipOption[];
    selected: string[];
    onChange: (selected: string[]) => void;
    maxItems?: number;
    columns?: 1 | 2;
}

/**
 * ChipMultiSelect - Componente otimizado para mobile
 * 
 * - Touch targets mínimos de 44px (iOS/Android guidelines)
 * - Grid responsivo: 1 coluna mobile, 2 desktop (configurável)
 * - Suporte a i18n com labels bilíngues
 */
export function ChipMultiSelect({
    options,
    selected,
    onChange,
    maxItems,
    columns = 2
}: ChipMultiSelectProps) {
    const { locale } = useI18n();

    const handleToggle = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter(v => v !== value));
        } else if (!maxItems || selected.length < maxItems) {
            onChange([...selected, value]);
        }
    };

    const getLabel = (label: { en: string; pt: string } | string): string => {
        if (typeof label === 'string') return label;
        return locale === 'en' ? label.en : label.pt;
    };

    const gridClass = columns === 1
        ? 'grid-cols-1'
        : 'grid-cols-1 sm:grid-cols-2';

    return (
        <div className={`grid ${gridClass} gap-2 sm:gap-3`}>
            {options.map((option) => {
                const isSelected = selected.includes(option.value);
                const isDisabled = maxItems ? !isSelected && selected.length >= maxItems : false;

                return (
                    <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => !isDisabled && handleToggle(option.value)}
                        disabled={isDisabled}
                        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
                        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
                        className={`
                            relative flex items-center gap-2 sm:gap-3 
                            px-3 sm:px-4 py-3 min-h-[44px]
                            rounded-xl text-left transition-all duration-200
                            border-2 cursor-pointer
                            ${isSelected
                                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500 shadow-lg shadow-purple-500/10'
                                : isDisabled
                                    ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                            }
                        `}
                    >
                        {/* Checkbox Visual */}
                        <div className={`
                            w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors
                            ${isSelected ? 'bg-purple-500 text-white' : 'bg-white/10'}
                        `}>
                            {isSelected && (
                                <motion.svg
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-3 h-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </motion.svg>
                            )}
                        </div>

                        {/* Icon (optional) */}
                        {option.icon && (
                            <span className="text-lg shrink-0">{option.icon}</span>
                        )}

                        {/* Label */}
                        <span className={`text-sm sm:text-base font-medium ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                            {getLabel(option.label)}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
}
