import { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';
import styles from './styles.module.css';

export const metadata: Metadata = {
    title: 'AI-Powered Patient Communication | Skin Vitality Medical Clinic',
    description: 'Exclusive proposal for Skin Vitality Medical Clinic - AI automation for patient communication, scheduling, and reminders.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function SkinVitalityPage() {
    return (
        <>
            <main className={`${styles.presentationBody} pb-24`}>
                {/* Hero */}
                <section className={`pt-40 pb-20 px-6 text-center max-w-4xl mx-auto ${styles.fadeIn}`}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[11px] font-bold tracking-wide text-purple-700 uppercase bg-purple-50 rounded-full border border-purple-100">
                        <i className="fas fa-robot"></i>
                        AI-Powered Automation
                    </span>
                    <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight ${styles.heroText}`}>
                        Never Miss a<br />
                        <span className={styles.accentText}>Patient Inquiry</span> Again
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
                        Hello <span className="text-gray-900 font-semibold">Skin Vitality Team</span>! This exclusive proposal shows how
                        AI can handle <span className="text-gray-900 font-semibold">FAQ, intake forms, scheduling &amp; reminders</span> —
                        24/7, even when your front desk is busy.
                    </p>
                </section>

                {/* Overview Stats */}
                <section className="px-6 pb-24 max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className={`${styles.glassCard} p-6 rounded-2xl text-center group hover:scale-105 transition-transform`}>
                            <div className="text-3xl text-purple-500 mb-3"><i className="fas fa-bolt"></i></div>
                            <div className="text-xs text-gray-400 uppercase font-bold mb-2">Response Time</div>
                            <div className={`font-bold text-2xl text-gray-800 ${styles.statNumber}`}>&lt;30s</div>
                        </div>
                        <div className={`${styles.glassCard} p-6 rounded-2xl text-center group hover:scale-105 transition-transform`}>
                            <div className="text-3xl text-purple-500 mb-3"><i className="fas fa-clock"></i></div>
                            <div className="text-xs text-gray-400 uppercase font-bold mb-2">Availability</div>
                            <div className={`font-bold text-2xl text-gray-800 ${styles.statNumber}`}>24/7</div>
                        </div>
                        <div className={`${styles.glassCard} p-6 rounded-2xl text-center group hover:scale-105 transition-transform`}>
                            <div className="text-3xl text-purple-500 mb-3"><i className="fas fa-calendar-check"></i></div>
                            <div className="text-xs text-gray-400 uppercase font-bold mb-2">Setup Time</div>
                            <div className={`font-bold text-2xl text-gray-800 ${styles.statNumber}`}>2 weeks</div>
                        </div>
                        <div className={`${styles.glassCard} p-6 rounded-2xl text-center border-purple-200 bg-purple-50/50 group hover:scale-105 transition-transform`}>
                            <div className="text-3xl text-purple-500 mb-3"><i className="fas fa-chart-line"></i></div>
                            <div className="text-xs text-purple-600 uppercase font-bold mb-2">Expected ROI</div>
                            <div className={`font-bold text-2xl text-gray-900 ${styles.statNumber}`}>3-5x</div>
                        </div>
                    </div>
                </section>

                {/* The Problem */}
                <section className="px-6 py-24 bg-gradient-to-b from-gray-50 to-white rounded-[40px] mx-4 border border-gray-100">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-bold tracking-wide text-red-600 uppercase bg-red-50 rounded-full border border-red-100">
                                <i className="fas fa-exclamation-triangle mr-2"></i>The Challenge
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Clinics Lose Patients</h2>
                            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Common pain points we solve for medical spas in 2026</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-8 rounded-3xl bg-white border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
                                <div className="text-5xl font-black text-red-500/20 mb-4">21×</div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">Slow First Response</h3>
                                <p className="text-sm text-gray-500">Leads contacted within 5 minutes are <strong>21× more likely to convert</strong>. Avg. healthcare response: <strong>2+ hours</strong>.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
                                <div className="text-5xl font-black text-red-500/20 mb-4">73%</div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">Missed After-Hours Leads</h3>
                                <p className="text-sm text-gray-500">Only 27% of healthcare leads ever receive contact. <strong>Your phone works 24/7</strong> — your team doesn&apos;t.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
                                <div className="text-5xl font-black text-red-500/20 mb-4">20-30%</div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">No-Shows &amp; Cancellations</h3>
                                <p className="text-sm text-gray-500">Typical no-show rate without automated reminders. <strong>Fully automatable process</strong>.</p>
                            </div>
                        </div>

                        <div className="mt-12 p-8 rounded-3xl bg-purple-50 border border-purple-100">
                            <h3 className="text-lg font-bold text-purple-900 mb-4"><i className="fas fa-lightbulb mr-2 text-purple-500"></i>Sound Familiar?</h3>
                            <ul className="grid md:grid-cols-2 gap-4 text-sm text-purple-800">
                                <li className="flex items-start gap-2"><i className="fas fa-check-circle text-purple-500 mt-1"></i> Lost opportunities when calls/DMs arrive while staff is busy</li>
                                <li className="flex items-start gap-2"><i className="fas fa-check-circle text-purple-500 mt-1"></i> Time wasted answering repetitive questions (services, prices, hours)</li>
                                <li className="flex items-start gap-2"><i className="fas fa-check-circle text-purple-500 mt-1"></i> &quot;Do you accept my insurance?&quot; asked 50+ times/week</li>
                                <li className="flex items-start gap-2"><i className="fas fa-check-circle text-purple-500 mt-1"></i> No-shows from lack of automated reminders &amp; follow-up</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* The Solution */}
                <section className="px-6 py-24 max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-bold tracking-wide text-purple-600 uppercase bg-purple-50 rounded-full border border-purple-100">
                            <i className="fas fa-magic mr-2"></i>The Solution
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">AI That Works While You Sleep</h2>
                        <p className="text-gray-500 text-lg">From zero to automated patient communication in 2 weeks</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className={`${styles.phaseCard} p-8 rounded-3xl bg-white border border-gray-100 relative overflow-hidden group`}>
                            <div className="absolute top-0 right-0 bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-bl-xl">WEEK 1</div>
                            <div className="text-4xl mb-4 opacity-10 font-black text-gray-900">01</div>
                            <div className="text-purple-500 text-2xl mb-3"><i className="fas fa-search-plus"></i></div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">Discovery</h3>
                            <p className="text-sm text-gray-500 mb-4">Map your current workflow, pain points, and automation opportunities.</p>
                            <div className="h-1 w-12 bg-gray-200 rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>
                        <div className={`${styles.phaseCard} p-8 rounded-3xl bg-white border border-gray-100 relative overflow-hidden group`}>
                            <div className="absolute top-0 right-0 bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-bl-xl">WEEK 1</div>
                            <div className="text-4xl mb-4 opacity-10 font-black text-gray-900">02</div>
                            <div className="text-purple-500 text-2xl mb-3"><i className="fas fa-cogs"></i></div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">Configuration</h3>
                            <p className="text-sm text-gray-500 mb-4">Train the AI with Skin Vitality&apos;s services, pricing, FAQs &amp; tone of voice.</p>
                            <div className="h-1 w-12 bg-gray-200 rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>
                        <div className={`${styles.phaseCard} p-8 rounded-3xl bg-gray-900 text-white relative overflow-hidden group shadow-xl transform md:-translate-y-4 border border-gray-800`}>
                            <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">WEEK 2</div>
                            <div className="text-4xl mb-4 opacity-20 font-black text-white">03</div>
                            <div className="text-purple-400 text-2xl mb-3"><i className="fas fa-plug"></i></div>
                            <h3 className="text-xl font-bold mb-2">Integration</h3>
                            <p className="text-sm text-gray-400 mb-4">Connect Website Chat + SMS + Calendar. Everything synced automatically.</p>
                            <div className="h-1 w-12 bg-purple-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>
                        <div className={`${styles.phaseCard} p-8 rounded-3xl bg-white border border-gray-100 relative overflow-hidden group`}>
                            <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">GO-LIVE</div>
                            <div className="text-4xl mb-4 opacity-10 font-black text-gray-900">04</div>
                            <div className="text-green-500 text-2xl mb-3"><i className="fas fa-rocket"></i></div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">Launch</h3>
                            <p className="text-sm text-gray-500 mb-4">Gradual rollout, monitoring, and fine-tuning for maximum performance.</p>
                            <div className="h-1 w-12 bg-green-400 rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>
                    </div>
                </section>

                {/* Flow Visual */}
                <section className="px-6 py-16 max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
                        <p className="text-gray-500 text-lg">End-to-end automated patient journey</p>
                    </div>

                    <div className="relative">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
                            <div className={`${styles.glassCard} p-6 rounded-2xl text-center min-w-[160px]`}>
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <i className="fas fa-globe text-white text-xl"></i>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1">Lead Arrives</h4>
                                <p className="text-xs text-gray-500">Website/SMS/DM</p>
                            </div>

                            <div className="text-3xl text-gray-300 hidden md:block">→</div>
                            <div className="text-3xl text-gray-300 md:hidden">↓</div>

                            <div className={`${styles.glassCard} p-6 rounded-2xl text-center min-w-[160px]`}>
                                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <i className="fas fa-robot text-white text-xl"></i>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1">AI Responds</h4>
                                <p className="text-xs text-gray-500">&lt;30 seconds</p>
                            </div>

                            <div className="text-3xl text-gray-300 hidden md:block">→</div>
                            <div className="text-3xl text-gray-300 md:hidden">↓</div>

                            <div className={`${styles.glassCard} p-6 rounded-2xl text-center min-w-[160px]`}>
                                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <i className="fas fa-clipboard-list text-white text-xl"></i>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1">Intake Form</h4>
                                <p className="text-xs text-gray-500">Auto-collected</p>
                            </div>

                            <div className="text-3xl text-gray-300 hidden md:block">→</div>
                            <div className="text-3xl text-gray-300 md:hidden">↓</div>

                            <div className={`${styles.glassCard} p-6 rounded-2xl text-center min-w-[160px]`}>
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <i className="fas fa-calendar-alt text-white text-xl"></i>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1">Booked</h4>
                                <p className="text-xs text-gray-500">+ Reminders</p>
                            </div>

                            <div className="text-3xl text-gray-300 hidden md:block">→</div>
                            <div className="text-3xl text-gray-300 md:hidden">↓</div>

                            <div className={`${styles.glassCard} p-6 rounded-2xl text-center min-w-[160px] border-2 border-green-500`}>
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <i className="fas fa-user-check text-white text-xl"></i>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1">Patient!</h4>
                                <p className="text-xs text-gray-500">Shows up</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What's Included */}
                <section className="px-6 py-24 bg-gray-900 text-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Skin Vitality Gets</h2>
                            <p className="text-gray-400 text-lg">Complete AI automation system</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
                                <div className="text-purple-500 text-3xl mb-4"><i className="fas fa-robot"></i></div>
                                <h3 className="font-bold text-xl mb-4">Custom AI Assistant</h3>
                                <ul className="text-sm text-gray-400 space-y-3">
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>Trained on your services (Botox, fillers, laser, etc.)</span></li>
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>FAQ handling: pricing, insurance, hours, locations</span></li>
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>Professional, HIPAA-compliant responses</span></li>
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>Smart handoff to staff when needed</span></li>
                                </ul>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
                                <div className="text-green-500 text-3xl mb-4"><i className="fas fa-comments"></i></div>
                                <h3 className="font-bold text-xl mb-4">Multi-Channel Support</h3>
                                <ul className="text-sm text-gray-400 space-y-3">
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>Website live chat widget</span></li>
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>SMS/Text messaging integration</span></li>
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>Instagram/Facebook DM ready</span></li>
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>24/7 response, no breaks</span></li>
                                </ul>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
                                <div className="text-blue-500 text-3xl mb-4"><i className="fas fa-calendar-check"></i></div>
                                <h3 className="font-bold text-xl mb-4">Scheduling &amp; Reminders</h3>
                                <ul className="text-sm text-gray-400 space-y-3">
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>Direct calendar integration</span></li>
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>Automated appointment reminders</span></li>
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>No-show follow-up sequences</span></li>
                                    <li className="flex items-start gap-2"><i className="fas fa-check text-green-500 mt-1"></i><span>Easy rescheduling via chat</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ROI */}
                <section className="px-6 py-24 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-purple-600 to-purple-900 text-white rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400/20 to-transparent"></div>
                            <div className="relative z-10">
                                <span className="inline-block px-4 py-1.5 mb-6 text-[11px] font-bold tracking-wide text-purple-100 uppercase bg-purple-500/30 rounded-full border border-purple-400/30">
                                    <i className="fas fa-chart-line mr-2"></i>Projected ROI
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold mb-12">Expected Results for Skin Vitality</h2>
                                <div className="grid md:grid-cols-4 gap-8 mb-12">
                                    <div>
                                        <div className={`text-4xl md:text-5xl font-bold text-purple-200 mb-2 ${styles.statNumber}`}>+40%</div>
                                        <div className="text-sm text-purple-200 uppercase tracking-wide">Lead Conversion</div>
                                    </div>
                                    <div>
                                        <div className={`text-4xl md:text-5xl font-bold text-purple-200 mb-2 ${styles.statNumber}`}>-70%</div>
                                        <div className="text-sm text-purple-200 uppercase tracking-wide">No-Show Rate</div>
                                    </div>
                                    <div>
                                        <div className={`text-4xl md:text-5xl font-bold text-purple-200 mb-2 ${styles.statNumber}`}>0</div>
                                        <div className="text-sm text-purple-200 uppercase tracking-wide">Missed Night Leads</div>
                                    </div>
                                    <div>
                                        <div className={`text-4xl md:text-5xl font-bold text-purple-200 mb-2 ${styles.statNumber}`}>5h+</div>
                                        <div className="text-sm text-purple-200 uppercase tracking-wide">Staff Time Saved/Day</div>
                                    </div>
                                </div>
                                <p className="text-purple-200 text-sm max-w-2xl mx-auto">
                                    *Based on real case studies with medical spas. Results may vary.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-24 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                            Ready to <span className={styles.accentText}>Automate</span>?
                        </h2>
                        <p className="text-gray-500 text-lg mb-10">
                            Let&apos;s schedule a quick 10-minute call to see how this fits Skin Vitality&apos;s needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:hello@supart.com.br?subject=Skin%20Vitality%20-%20AI%20Automation%20Interest&body=Hi%20SupArt%20team,%0A%0AI'd%20like%20to%20learn%20more%20about%20the%20AI%20automation%20solution%20for%20Skin%20Vitality.%0A%0ABest%20regards"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
                            >
                                <i className="fas fa-calendar-alt"></i>
                                Schedule a 10-min Call
                            </a>
                            <a
                                href="tel:+1416969XXXX"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-purple-500 transition-all hover:scale-105"
                            >
                                <i className="fas fa-phone text-green-500"></i>
                                Call Us Directly
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
