'use client';

import { motion } from 'framer-motion';

interface DiagnosticProgressProps {
    currentStep: number;
    totalSteps: number;
    stepTitles: string[];
}

export function DiagnosticProgress({
    currentStep,
    totalSteps,
    stepTitles
}: DiagnosticProgressProps) {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="w-full">
            {/* Progress Bar Container */}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-500 via-pink-500 to-gray-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mt-4">
                {stepTitles.map((title, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center"
                        >
                            {/* Circle Indicator */}
                            <motion.div
                                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  transition-colors duration-300
                  ${isCompleted
                                        ? 'bg-gradient-to-r from-gray-500 to-pink-500 text-white'
                                        : isActive
                                            ? 'bg-white/20 text-white border-2 border-gray-500'
                                            : 'bg-white/10 text-gray-500'
                                    }
                `}
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {isCompleted ? (
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </motion.div>

                            {/* Step Title (hidden on mobile) */}
                            <span
                                className={`
                  hidden md:block mt-2 text-xs text-center max-w-[80px]
                  ${isActive ? 'text-white font-medium' : 'text-gray-500'}
                `}
                            >
                                {title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
