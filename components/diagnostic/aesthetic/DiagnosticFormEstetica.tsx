'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import confetti from 'canvas-confetti';
import {
    clinicDiagnosticSchema,
    type ClinicDiagnosticData,
    type ClinicAnalysisResult
} from '@/lib/types/diagnostic-clinica';

// Steps Import (Placeholders for now)
import { BlockStructure } from './steps/BlockStructure';
import { BlockVolume } from './steps/BlockVolume';
import { BlockProblems } from './steps/BlockProblems';
import { BlockInfra } from './steps/BlockInfra';
import { BlockExpectations } from './steps/BlockExpectations';
import { ClinicAnalysisView } from './ClinicAnalysisView';

const STEP_TITLES = [
    'Estrutura',
    'Volume Digital',
    'Dores Atuais',
    'Tecnologia',
    'Expectativas',
];

export function DiagnosticFormEstetica() {
    const { t } = useI18n();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Partial<ClinicDiagnosticData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [analysis, setAnalysis] = useState<ClinicAnalysisResult | null>(null);

    const totalSteps = 5;

    const updateFormData = useCallback((stepData: Partial<ClinicDiagnosticData>) => {
        setFormData(prev => ({ ...prev, ...stepData }));
    }, []);

    const handleNext = useCallback(async (stepData: Partial<ClinicDiagnosticData>) => {
        const newData = { ...formData, ...stepData };
        updateFormData(stepData);

        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Submit
            setIsSubmitting(true);
            try {
                const response = await fetch('/api/diagnostic-clinica', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData),
                });
                const result = await response.json();

                if (result.success && result.analysis) {
                    setAnalysis(result.analysis);
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                } else {
                    // Handle error gracefully
                    console.error("Analysis failed", result);
                }

            } catch (error) {
                console.error('Submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    }, [currentStep, formData, totalSteps, updateFormData]);

    const handleBack = useCallback(() => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    }, [currentStep]);

    // Render Steps
    const renderStep = () => {
        const commonProps = {
            data: formData,
            onNext: handleNext,
            onBack: handleBack,
            isSubmitting
        };

        switch (currentStep) {
            case 0: return <BlockStructure {...commonProps} />;
            case 1: return <BlockVolume {...commonProps} />;
            case 2: return <BlockProblems {...commonProps} />;
            case 3: return <BlockInfra {...commonProps} />;
            case 4: return <BlockExpectations {...commonProps} />;
            default: return null;
        }
    };

    if (analysis) {
        return <ClinicAnalysisView analysis={analysis} />;
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Progress Header */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Etapa {currentStep + 1} de {totalSteps}</span>
                    <span>{STEP_TITLES[currentStep]}</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Form Area */}
            <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
