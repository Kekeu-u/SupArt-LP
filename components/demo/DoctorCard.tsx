'use client';

import { motion } from 'framer-motion';
import { Professional } from '@/lib/demo/flowData';

interface DoctorCardProps {
    doctor: Professional;
    isVisible: boolean;
    isExpanded: boolean;
    isHighlighted?: boolean;
    isSelected?: boolean;
    isClickable?: boolean;
    onExpand: () => void;
    delay?: number;
}

export const DoctorCard = ({
    doctor,
    isVisible,
    isExpanded,
    isHighlighted = false,
    isSelected = false,
    isClickable = true,
    onExpand,
    delay = 0
}: DoctorCardProps) => {
    return (
        <motion.div
            className="doctor-card relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.4, delay }}
        >
            <motion.div
                className={`
          relative p-5 rounded-2xl bg-[#0d0d0d]/90 backdrop-blur-xl overflow-hidden transition-all duration-300
          ${isClickable ? 'cursor-pointer' : 'cursor-default'}
          ${isSelected
                        ? 'border-2 border-purple-500 shadow-[0_0_30px_rgba(107,70,193,0.4)]'
                        : isHighlighted
                            ? 'border border-purple-500/50 ring-2 ring-purple-500/20'
                            : 'border border-white/10'
                    }
          ${isClickable ? 'group' : ''}
        `}
                whileHover={isClickable ? { scale: 1.03, boxShadow: '0 8px 40px rgba(107, 70, 193, 0.3)' } : {}}
                whileTap={isClickable ? { scale: 0.98 } : {}}
                onClick={isClickable ? onExpand : undefined}
            >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5 transition-opacity duration-300 ${isClickable ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`} />

                {/* Selected/Highlighted indicator */}
                {isHighlighted && !isSelected && (
                    <motion.div
                        className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        <span className="text-purple-300 text-[10px] font-medium">Recomendado</span>
                    </motion.div>
                )}

                {isSelected && (
                    <motion.div
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>
                )}

                {/* Header: Avatar + Info */}
                <div className="flex items-center gap-4 relative z-10">
                    {/* Avatar */}
                    <div className={`
            w-12 h-12 rounded-full flex items-center justify-center shadow-lg ring-2
            ${isSelected
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 ring-purple-400/50'
                            : 'bg-gradient-to-br from-purple-600 to-pink-500 ring-white/10'
                        }
          `}>
                        <span className="text-white font-bold text-lg">
                            {doctor.name.split(' ')[0].charAt(0)}{doctor.name.split(' ')[1]?.charAt(0) || ''}
                        </span>
                    </div>

                    {/* Name & Specialty */}
                    <div className="flex-1">
                        <h4 className="text-white font-semibold text-sm">{doctor.name}</h4>
                        <p className="text-purple-400 text-xs">{doctor.specialty}</p>
                    </div>
                </div>

                {/* Procedures List */}
                <div className="mt-3 flex flex-wrap gap-1.5 relative z-10">
                    {doctor.procedures.slice(0, 3).map((proc, idx) => (
                        <span
                            key={idx}
                            className={`
                px-2 py-0.5 text-[10px] rounded-full transition-colors
                ${isHighlighted && proc.toLowerCase().includes('lipo')
                                    ? 'bg-purple-500/30 border border-purple-500/40 text-purple-200'
                                    : 'bg-white/5 border border-white/10 text-gray-400'
                                }
              `}
                        >
                            {proc}
                        </span>
                    ))}
                    {doctor.procedures.length > 3 && (
                        <span className="px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded-full text-gray-500">
                            +{doctor.procedures.length - 3}
                        </span>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};
