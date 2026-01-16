'use client';

import { motion } from 'framer-motion';

interface SelectionOption {
    value: string;
    label: string;
    icon?: string;
    description?: string;
}

interface SelectionCardsProps {
    options: SelectionOption[];
    value: string;
    onChange: (value: string) => void;
    columns?: 2 | 3 | 4;
}

export function SelectionCards({ options, value, onChange, columns = 2 }: SelectionCardsProps) {
    const gridCols = {
        2: 'grid-cols-2',
        3: 'grid-cols-2 md:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-4',
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-3`}>
            {options.map((option) => {
                const isSelected = value === option.value;
                return (
                    <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                            relative p-4 rounded-xl text-left transition-all duration-200
                            border-2 cursor-pointer
                            ${isSelected
                                ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500 shadow-lg shadow-purple-500/20'
                                : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                            }
                        `}
                    >
                        {/* Checkmark */}
                        {isSelected && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
                            >
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                        )}

                        {/* Icon */}
                        {option.icon && (
                            <span className="text-2xl mb-2 block">{option.icon}</span>
                        )}

                        {/* Label */}
                        <span className={`font-medium block ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                            {option.label}
                        </span>

                        {/* Description */}
                        {option.description && (
                            <span className="text-xs text-gray-400 mt-1 block">
                                {option.description}
                            </span>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
