'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { PatientMessage } from './PatientMessage';
import { BotMessage } from './BotMessage';
import { OrchestratorNode } from './OrchestratorNode';
import { DoctorCard } from './DoctorCard';
import { SuccessCard } from './SuccessCard';
import { NicheSelector } from './NicheSelector';
import { CrmKanban } from './CrmKanban';
import { niches, Niche, Professional, getMatchingProfessionals } from '@/lib/demo/flowData';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { useI18n } from '@/lib/i18n';

type FlowState =
    | 'niche_select'
    | 'message'
    | 'processing'
    | 'doctor_select'
    | 'time_select'
    | 'crm_modal'
    | 'success';

export const InteractiveAgentFlow = () => {
    const { t } = useI18n();
    const [flowState, setFlowState] = useState<FlowState>('niche_select');
    const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Professional | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [matchingDoctors, setMatchingDoctors] = useState<Professional[]>([]);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const successRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle niche selection
    const handleNicheSelect = useCallback((nicheId: string) => {
        const niche = niches[nicheId];
        if (!niche) return;

        setSelectedNiche(niche);
        setMatchingDoctors(getMatchingProfessionals(niche));

        // Start the flow
        setFlowState('message');

        // After a delay, show orchestrator processing
        setTimeout(() => setFlowState('processing'), 1500);

        // After processing, reveal doctors for selection
        setTimeout(() => setFlowState('doctor_select'), 3000);
    }, []);

    // Handle doctor selection - now goes to time_select instead of crm_modal
    const handleDoctorSelect = useCallback((doctor: Professional) => {
        setSelectedDoctor(doctor);
        setFlowState('time_select');
    }, []);

    // Handle time selection - now goes to CRM
    const handleTimeSelect = useCallback((time: string) => {
        setSelectedTime(time);
        setFlowState('crm_modal');
    }, []);

    // Handle CRM completion - goes directly to success with scroll
    const handleCrmComplete = useCallback(() => {
        setFlowState('success');
        // Scroll to success card after user sees CRM animation fully
        setTimeout(() => {
            successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 800);
    }, []);

    // Reset flow
    const resetFlow = useCallback(() => {
        if (timelineRef.current) {
            timelineRef.current.kill();
        }
        setFlowState('niche_select');
        setSelectedNiche(null);
        setSelectedDoctor(null);
        setSelectedTime(null);
        setMatchingDoctors([]);
    }, []);

    // Derived state
    const isMessageVisible = flowState !== 'niche_select';
    const isOrchestratorActive = flowState !== 'niche_select' && flowState !== 'message';
    const isOrchestratorProcessing = flowState === 'processing';
    const isDoctorSelectVisible = flowState === 'doctor_select' || flowState === 'time_select' || flowState === 'crm_modal' || flowState === 'success';
    const isSuccessVisible = flowState === 'success';

    // Stats based on selected niche
    const stats = [
        { label: 'Profissionais', value: selectedNiche?.professionals.length.toString() || '3' },
        { label: 'Integração CRM', value: 'Airtable' },
        { label: 'Tempo Resposta', value: '<3s' },
        { label: 'Taxa Sucesso', value: '98.5%' },
    ];

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen pt-28 pb-16 px-4 md:px-8 lg:px-16"
        >
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px]" />
            </div>

            {/* Header */}
            <div className="text-center mb-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-4">
                        Demo Interativo
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Sistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Multi-Agente</span>
                    </h1>
                    {flowState !== 'niche_select' && (
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Veja como automatizamos {selectedNiche?.name || 'seu negócio'} em tempo real
                        </p>
                    )}
                </motion.div>
            </div>

            {/* Niche Selector - Only visible at start */}
            <AnimatePresence>
                {flowState === 'niche_select' && (
                    <motion.div
                        key="niche-selector"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative z-10"
                    >
                        <NicheSelector onSelect={handleNicheSelect} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Flow - After niche selection */}
            <AnimatePresence>
                {flowState !== 'niche_select' && (
                    <motion.div
                        key="main-flow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10"
                    >
                        {/* Stats Bar */}
                        <motion.div
                            className="grid grid-cols-2 lg:flex lg:flex-nowrap justify-center gap-2 md:gap-4 mb-12 max-w-4xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {stats.map((stat, idx) => (
                                <div key={idx} className="text-center px-2 py-1.5 md:px-4 md:py-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                    <p className="text-base md:text-lg font-bold text-white leading-tight">{stat.value}</p>
                                    <p className="text-[10px] md:text-xs text-gray-500">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Flow Layout */}
                        <div className="max-w-6xl mx-auto">
                            {/* Vertical Flow for all screens */}
                            <div className="flex flex-col items-center gap-8">

                                {/* Patient Message */}
                                {selectedNiche && (
                                    <PatientMessage
                                        text={selectedNiche.message.text}
                                        sender={selectedNiche.message.sender}
                                        time={selectedNiche.message.time}
                                        isVisible={isMessageVisible}
                                    />
                                )}

                                {/* Bot Response */}
                                {selectedNiche && isOrchestratorActive && (
                                    <BotMessage
                                        text={selectedNiche.botResponse}
                                        isVisible={isOrchestratorActive}
                                        delay={0.3}
                                    />
                                )}

                                {/* Arrow Down */}
                                {isOrchestratorActive && (
                                    <motion.div
                                        className="w-0.5 h-12 bg-gradient-to-b from-purple-500 to-transparent"
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ duration: 0.3, delay: 0.5 }}
                                    />
                                )}

                                {/* Orchestrator */}
                                <OrchestratorNode
                                    isActive={isOrchestratorActive}
                                    isProcessing={isOrchestratorProcessing}
                                />

                                {/* Arrow Down */}
                                {isOrchestratorActive && (
                                    <motion.div
                                        className="w-0.5 h-12 bg-gradient-to-b from-cyan-500 to-transparent"
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                {/* Doctor Selection Prompt */}
                                {flowState === 'doctor_select' && (
                                    <motion.div
                                        className="text-center mb-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <p className="text-purple-300 text-sm font-medium">
                                            👆 Escolha um profissional para continuar
                                        </p>
                                    </motion.div>
                                )}

                                {/* Doctors Grid */}
                                <AnimatePresence>
                                    {isDoctorSelectVisible && (
                                        <motion.div
                                            key="doctors"
                                            className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4"
                                            exit={{ opacity: 0, y: 20 }}
                                        >
                                            {(selectedNiche?.professionals || []).map((doctor, idx) => {
                                                const isMatching = matchingDoctors.some(d => d.id === doctor.id);
                                                const isSelected = selectedDoctor?.id === doctor.id;

                                                return (
                                                    <motion.div
                                                        key={doctor.id}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                    >
                                                        <DoctorCard
                                                            doctor={doctor}
                                                            isVisible={true}
                                                            isExpanded={false}
                                                            isHighlighted={isMatching}
                                                            isSelected={isSelected}
                                                            isClickable={flowState === 'doctor_select'}
                                                            onExpand={() => {
                                                                if (flowState === 'doctor_select') {
                                                                    handleDoctorSelect(doctor);
                                                                }
                                                            }}
                                                        />
                                                    </motion.div>
                                                );
                                            })}
                                        </motion.div>
                                    )}

                                    {/* Time Selection - Inline below doctors after selection */}
                                    {((flowState === 'time_select') || ((flowState === 'crm_modal' || flowState === 'success') && selectedTime)) && selectedNiche && selectedDoctor && (
                                        <motion.div
                                            key="time-select"
                                            className="w-full max-w-xl"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {/* Bot response with time slots */}
                                            <div className="flex items-start gap-3">
                                                {/* Bot Avatar */}
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-purple-400/30">
                                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                                    </svg>
                                                </div>

                                                {/* Message with time slots */}
                                                <div className="flex-1">
                                                    <div className="bg-gradient-to-br from-purple-600/90 to-indigo-600/90 border border-purple-400/20 rounded-2xl rounded-tl-none p-4 backdrop-blur-xl">
                                                        <p className="text-white text-sm mb-3">
                                                            Ótima escolha! {selectedDoctor.name} tem os seguintes horários disponíveis:
                                                        </p>

                                                        {/* Time slots grid */}
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedNiche.timeSlots.map((slot, idx) => (
                                                                <motion.button
                                                                    key={slot.time}
                                                                    onClick={() => slot.available && flowState === 'time_select' && handleTimeSelect(slot.time)}
                                                                    disabled={!slot.available || flowState !== 'time_select'}
                                                                    className={`
                                                                        px-4 py-2 rounded-lg font-medium text-sm transition-all
                                                                        ${selectedTime === slot.time
                                                                            ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                                                                            : slot.available
                                                                                ? 'bg-white/20 text-white hover:bg-white/30 cursor-pointer'
                                                                                : 'bg-white/5 text-white/30 line-through cursor-not-allowed'
                                                                        }
                                                                    `}
                                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ delay: 0.3 + idx * 0.05 }}
                                                                    whileHover={slot.available && flowState === 'time_select' ? { scale: 1.05 } : {}}
                                                                    whileTap={slot.available && flowState === 'time_select' ? { scale: 0.95 } : {}}
                                                                >
                                                                    {slot.time}
                                                                </motion.button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* CRM Kanban - appears after time selection, BEFORE success */}
                                    {(flowState === 'crm_modal' || flowState === 'success') && selectedNiche && selectedDoctor && selectedTime && (
                                        <motion.div
                                            key="crm-kanban-inline"
                                            className="w-full max-w-3xl"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <CrmKanban
                                                isVisible={true}
                                                onComplete={handleCrmComplete}
                                                nicheType={selectedNiche.id as 'clinic' | 'automotive' | 'dental' | 'realestate'}
                                                leadData={{
                                                    name: selectedNiche.message.sender,
                                                    professional: selectedDoctor.name,
                                                    time: selectedTime,
                                                    procedure: selectedNiche.message.targetProcedure
                                                }}
                                            />
                                        </motion.div>
                                    )}

                                    {/* Success Card - LAST element in flow */}
                                    {isSuccessVisible && selectedNiche && selectedDoctor && (
                                        <motion.div
                                            ref={successRef}
                                            key="success-wrapper"
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                                        >
                                            <SuccessCard
                                                isVisible={isSuccessVisible}
                                                nicheType={selectedNiche.id as 'clinic' | 'automotive' | 'dental' | 'realestate'}
                                                data={{
                                                    procedure: selectedNiche.message.targetProcedure,
                                                    doctor: selectedDoctor.name,
                                                    date: 'Hoje',
                                                    time: selectedTime || '14:00',
                                                    patientName: selectedNiche.message.sender
                                                }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Replay Button - After success */}
                        {flowState === 'success' && (
                            <motion.div
                                className="flex items-center justify-center gap-4 mt-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <button
                                    onClick={resetFlow}
                                    className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/10 text-gray-300 hover:bg-white/20 hover:border-purple-500/30 transition-all duration-300"
                                >
                                    <svg className="w-4 h-4 group-hover:rotate-[-360deg] transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Testar Outro Nicho
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA Section - Always visible */}
            <motion.div
                className="text-center mt-20 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/10 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {t("Want this for your business?", "Quer implementar isso no seu negócio?")}
                    </h2>
                    <p className="text-gray-400 mb-6">
                        {t(
                            "We build custom AI agent systems for clinics, agencies, and businesses.",
                            "Construímos sistemas de agentes IA personalizados para qualquer segmento."
                        )}
                    </p>
                    <ShinyButton href="/diagnostico" className="px-8 py-4">
                        {t("Talk to a Specialist", "Falar com Especialista")}
                    </ShinyButton>
                </div>
            </motion.div>
        </div>
    );
};
