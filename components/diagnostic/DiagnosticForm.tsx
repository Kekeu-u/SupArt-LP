'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiagnosticProgress } from './DiagnosticProgress';
import { StepIdentification } from './steps/StepIdentification';
import { StepCurrentSituation } from './steps/StepCurrentSituation';
import { StepObjectives } from './steps/StepObjectives';
import { StepBudget } from './steps/StepBudget';
import { StepPriorities } from './steps/StepPriorities';
import { DiagnosticSuccess } from './DiagnosticSuccess';
import type { DiagnosticFormData } from '@/lib/types/diagnostic';

const STEP_TITLES = [
    'Identificação',
    'Situação Atual',
    'Objetivos & Dores',
    'Orçamento & Timeline',
    'Prioridades',
];

const STEP_SUBTITLES = [
    'Antes de começar, me conta um pouco sobre você',
    'Como está sua presença digital hoje?',
    'O que você sonha alcançar e o que te trava hoje?',
    'Vamos falar de números (sem compromisso)',
    'Se pudesse escolher apenas 3 prioridades, quais seriam?',
];

interface DiagnosticFormProps {
    onComplete?: (data: DiagnosticFormData) => void;
}

export function DiagnosticForm({ onComplete }: DiagnosticFormProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Partial<DiagnosticFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [result, setResult] = useState<{
        urgency_score: number;
        recommended_products: string[];
        ai_analysis: unknown;
    } | null>(null);

    const totalSteps = 5;

    // Merge data from each step
    const updateFormData = useCallback((stepData: Partial<DiagnosticFormData>) => {
        setFormData(prev => ({ ...prev, ...stepData }));
    }, []);

    // Navigate to next step
    const handleNext = useCallback((stepData: Partial<DiagnosticFormData>) => {
        updateFormData(stepData);

        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep, updateFormData]);

    // Navigate to previous step
    const handleBack = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    }, [currentStep]);

    // Submit form
    const handleSubmit = useCallback(async (stepData: Partial<DiagnosticFormData>) => {
        const finalData = { ...formData, ...stepData } as DiagnosticFormData;
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/diagnostic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao enviar diagnóstico');
            }

            setResult(data);
            setIsComplete(true);
            onComplete?.(finalData);
        } catch (error) {
            console.error('Erro ao enviar:', error);
            alert('Erro ao enviar o diagnóstico. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, onComplete]);

    // Animation variants
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    // Render success screen
    if (isComplete && result) {
        return <DiagnosticSuccess result={result} />;
    }

    // Render step component
    const renderStep = () => {
        const commonProps = {
            data: formData,
            onNext: currentStep === totalSteps - 1 ? handleSubmit : handleNext,
            onBack: handleBack,
            isFirst: currentStep === 0,
            isLast: currentStep === totalSteps - 1,
            isSubmitting,
        };

        switch (currentStep) {
            case 0:
                return <StepIdentification {...commonProps} />;
            case 1:
                return <StepCurrentSituation {...commonProps} />;
            case 2:
                return <StepObjectives {...commonProps} />;
            case 3:
                return <StepBudget {...commonProps} />;
            case 4:
                return <StepPriorities {...commonProps} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-6">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Diagnóstico Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Gratuito</span>
            </h1>
            <p className="text-gray-400">
                Descubra oportunidades ocultas para sua presença digital
            </p>

            {/* Progress Bar */}
            <DiagnosticProgress
                currentStep={currentStep}
                totalSteps={totalSteps}
                stepTitles={STEP_TITLES}
            />

            {/* Step Title */}
            <div className="text-center mt-8 mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                    {STEP_TITLES[currentStep]}
                </h2>
                <p className="text-gray-400 mt-1">
                    {STEP_SUBTITLES[currentStep]}
                </p>
            </div>

            {/* Form Container */}
            <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" custom={currentStep}>
                    <motion.div
                        key={currentStep}
                        custom={currentStep}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Step Counter */}
            <div className="text-center mt-4 text-gray-500 text-sm">
                Etapa {currentStep + 1} de {totalSteps}
            </div>
        </div>
    );
}

