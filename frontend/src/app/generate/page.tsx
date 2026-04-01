'use client';

import { useState, useCallback } from 'react';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Zap, Mail, CheckCircle, ArrowRight, ArrowLeft, Copy, Download, AlertCircle, Loader2, Send, Shield, Building2, Pencil } from 'lucide-react';
import { insurers } from '@/lib/insurerDB';
import { stateLaws } from '@/lib/stateLawDB';
import { denialReasons } from '@/lib/denialReasons';
import type { AppealRequest, AppealResponse } from '@/types';

const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0 }),
};

//'http://localhost:8787/api'; 
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.appeallettergenerator.com/api";

function InputField({ label, name, type = 'text', placeholder, required, value, onChange }: { label: string; name: keyof AppealRequest; type?: string; placeholder: string; required?: boolean; value: string | number; onChange: (val: string | number) => void }) {
    return (
        <div>
            <label className="block text-sm text-slate-300 mb-1.5">{label}{required && <span className="text-red-400">*</span>}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(type === 'number' ? Number(e.target.value) || 0 : e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
            />
        </div>
    );
}

export default function GeneratePage() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [copied, setCopied] = useState('');
    const [result, setResult] = useState<AppealResponse | null>(null);
    const [form, setForm] = useState<AppealRequest>({
        insurer: '', customInsurerName: '', state: '', customStateName: '', reason: '', customReasonName: '', amount: 0, policyNumber: '', claimNumber: '',
        dateOfService: '', dateOfDenial: '', procedureDescription: '', patientName: '', additionalDetails: '',
    });
    const [isEditingAppeal, setIsEditingAppeal] = useState(false);
    const [isEditingBank, setIsEditingBank] = useState(false);
    const [editedAppeal, setEditedAppeal] = useState('');
    const [editedBank, setEditedBank] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const updateForm = (name: keyof AppealRequest, val: string | number) => {
        setForm(p => ({ ...p, [name]: val }));
    };

    const goTo = (s: number) => { setDirection(s > step ? 1 : -1); setStep(s); };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/draft`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
            const data = await res.json();
            if (res.ok) {
                setResult(data);
                setEditedAppeal(data.appealLetter);
                setEditedBank(data.bankDisputeLetter);
                goTo(3);
            }
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleSendEmail = async () => {
        if (!result) return;
        setSending(true);
        try {
            await fetch(`${API_BASE_URL}/send-email`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to: result.insurerEmail, subject: `FORMAL APPEAL - Claim #${form.claimNumber}`, body: editedAppeal, patientName: form.patientName }),
            });
            setSent(true);
        } catch (e) { console.error(e); } finally { setSending(false); }
    };

    const copyText = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(''), 2000);
    };

    const downloadTxt = (text: string, filename: string) => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
        URL.revokeObjectURL(url);
    };

    const downloadPDF = (text: string, filename: string) => {
        // Use window.jspdf if available from CDN
        if (typeof window !== 'undefined' && (window as any).jspdf) {
            const { jsPDF } = (window as any).jspdf;
            const doc = new jsPDF();

            // Add title
            doc.setFontSize(16);
            doc.text("Insurance Appeal Letter", 20, 20);

            // Add content with word wrap
            doc.setFontSize(11);
            const splitContent = doc.splitTextToSize(text, 170);
            doc.text(splitContent, 20, 30);

            doc.save(filename.replace('.txt', '.pdf'));
        } else {
            // Fallback to txt if PDF lib failed to load
            downloadTxt(text, filename);
        }
    };

    const usStates = stateLaws.filter(s => s.country === 'US');
    const intlStates = stateLaws.filter(s => s.country !== 'US');

    return (
        <div className="relative min-h-screen overflow-hidden">
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
                strategy="lazyOnload"
            />
            <div className="absolute inset-0 pointer-events-none"><div className="orb orb-1" /><div className="orb orb-2" /></div>

            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                        <span className="text-gradient">Free AI Appeal Letter Generator</span>
                    </h1>
                    <p className="text-slate-400">How to appeal denied health insurance claim free — takes less than 60 seconds</p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    {[1, 2, 3].map(s => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-gradient-to-r from-sky-500 to-violet-500 text-white glow-blue' : 'bg-slate-800 text-slate-500 border border-white/10'}`}>{s}</div>
                            {s < 3 && <div className={`w-12 sm:w-20 h-0.5 rounded ${step > s ? 'bg-gradient-to-r from-sky-500 to-violet-500' : 'bg-slate-700'}`} />}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                    {/* Step 1: Input */}
                    {step === 1 && (
                        <motion.div key="step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="glass rounded-2xl p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center"><FileText className="w-5 h-5 text-white" /></div>
                                <div><h2 className="text-xl font-bold text-white">Enter Denial Details</h2><p className="text-slate-400 text-sm">Fill in the information from your denial letter</p></div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1.5">Insurance Company<span className="text-red-400">*</span></label>
                                    <select value={form.insurer} onChange={e => setForm(p => ({ ...p, insurer: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-sky-500 transition-all">
                                        <option value="">Select insurer...</option>
                                        {insurers.map(i => <option key={i.slug} value={i.slug}>{i.name}</option>)}
                                        <option value="other">Other (Please specify)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1.5">State / Country<span className="text-red-400">*</span></label>
                                    <select value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-sky-500 transition-all">
                                        <option value="">Select state...</option>
                                        <optgroup label="United States">
                                            {usStates.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                                        </optgroup>
                                        <optgroup label="International">
                                            {intlStates.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                                        </optgroup>
                                        <option value="other">Other (Please specify)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm text-slate-300 mb-1.5">Denial Reason<span className="text-red-400">*</span></label>
                                <select value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-sky-500 transition-all">
                                    <option value="">Select denial reason...</option>
                                    {denialReasons.map(r => <option key={r.slug} value={r.slug}>{r.name}</option>)}
                                    <option value="other">Other (Please specify)</option>
                                </select>
                            </div>

                            {(form.insurer === 'other' || form.state === 'other' || form.reason === 'other') && (
                                <div className="grid sm:grid-cols-1 gap-4 mb-6 relative pl-4 border-l-2 border-slate-700/50">
                                    {form.insurer === 'other' && <InputField label="Insurance Company Name" name="customInsurerName" placeholder="e.g. Local Health Plan" required value={form.customInsurerName || ''} onChange={v => updateForm('customInsurerName', v)} />}
                                    {form.state === 'other' && <InputField label="State or Country Name" name="customStateName" placeholder="e.g. New York, India" required value={form.customStateName || ''} onChange={v => updateForm('customStateName', v)} />}
                                    {form.reason === 'other' && <InputField label="Specific Denial Reason" name="customReasonName" placeholder="e.g. Missing Records, Out of Network" required value={form.customReasonName || ''} onChange={v => updateForm('customReasonName', v)} />}
                                </div>
                            )}

                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                <InputField label="Claim Amount ($)" name="amount" type="number" placeholder="5000" required value={form.amount} onChange={v => updateForm('amount', v)} />
                                <InputField label="Policy Number" name="policyNumber" placeholder="POL-123456" value={form.policyNumber || ''} onChange={v => updateForm('policyNumber', v)} />
                                <InputField label="Claim Number" name="claimNumber" placeholder="CLM-789012" value={form.claimNumber || ''} onChange={v => updateForm('claimNumber', v)} />
                                <InputField label="Patient Name" name="patientName" placeholder="John Doe" required value={form.patientName} onChange={v => updateForm('patientName', v)} />
                                <InputField label="Date of Service" name="dateOfService" type="date" placeholder="" value={form.dateOfService || ''} onChange={v => updateForm('dateOfService', v)} />
                                <InputField label="Date of Denial" name="dateOfDenial" type="date" placeholder="" value={form.dateOfDenial || ''} onChange={v => updateForm('dateOfDenial', v)} />
                            </div>

                            <InputField label="Procedure / Service Description" name="procedureDescription" placeholder="e.g., MRI of left knee, physical therapy sessions" value={form.procedureDescription || ''} onChange={v => updateForm('procedureDescription', v)} />

                            <div className="mt-4">
                                <label className="block text-sm text-slate-300 mb-1.5">Additional Details (Optional)</label>
                                <textarea rows={3} placeholder="Any additional information about your case..." value={form.additionalDetails} onChange={e => setForm(p => ({ ...p, additionalDetails: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-all resize-none" />
                            </div>

                            <button onClick={() => goTo(2)} disabled={!form.insurer || (form.insurer === 'other' && !form.customInsurerName) || !form.state || (form.state === 'other' && !form.customStateName) || !form.reason || (form.reason === 'other' && !form.customReasonName)}
                                className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 text-white font-bold text-lg hover:from-sky-400 hover:to-violet-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                Review & Generate <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {/* Step 2: Review & Generate */}
                    {step === 2 && (
                        <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="glass rounded-2xl p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
                                <div><h2 className="text-xl font-bold text-white">Review AI Strategy</h2><p className="text-slate-400 text-sm">Confirm your details before generating</p></div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                {[
                                    { label: 'Insurer', value: form.insurer === 'other' ? form.customInsurerName : (insurers.find(i => i.slug === form.insurer)?.name || form.insurer), icon: Building2 },
                                    { label: 'State', value: form.state === 'other' ? form.customStateName : (stateLaws.find(s => s.code === form.state)?.name || form.state), icon: Shield },
                                    { label: 'Reason', value: form.reason === 'other' ? form.customReasonName : (denialReasons.find(r => r.slug === form.reason)?.name || form.reason), icon: AlertCircle },
                                    { label: 'Amount', value: `$${form.amount?.toLocaleString() || '0'}`, icon: FileText },
                                ].map(item => (
                                    <div key={item.label} className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
                                        <item.icon className="w-5 h-5 text-sky-400 flex-shrink-0" />
                                        <div><div className="text-xs text-slate-500">{item.label}</div><div className="text-white font-medium">{item.value}</div></div>
                                    </div>
                                ))}
                            </div>

                            {/* AI Preview */}
                            <div className="bg-slate-800/30 rounded-xl p-4 mb-6 border border-sky-500/20">
                                <div className="flex items-center gap-2 mb-2"><Zap className="w-4 h-4 text-sky-400" /><span className="text-sm font-medium text-sky-400">AI Strategy Preview</span></div>
                                <p className="text-slate-300 text-sm">Your appeal will include: <strong className="text-white">{stateLaws.find(s => s.code === form.state)?.statuteCitation || 'applicable state law'}</strong> citation, relevant case precedents, and a 14-day demand deadline with regulatory action warning.</p>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => goTo(1)} className="px-6 py-4 rounded-xl glass text-slate-300 font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                                    <ArrowLeft className="w-5 h-5" /> Back
                                </button>
                                <button onClick={handleGenerate} disabled={loading}
                                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg hover:from-emerald-400 hover:to-cyan-400 transition-all disabled:opacity-60 flex items-center justify-center gap-2 pulse-glow">
                                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</> : <><Zap className="w-5 h-5" /> Generate Appeal Letter</>}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Results */}
                    {step === 3 && result && (
                        <motion.div key="step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                            {/* Confidence Badge */}
                            <div className="glass rounded-2xl p-4 mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${result.confidence >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{result.confidence}%</div>
                                    <div><div className="text-white font-semibold">Appeal Confidence Score</div><div className="text-slate-400 text-xs">Based on state law match and case precedents</div></div>
                                </div>
                                <div className="text-right">
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-white/5 shadow-inner transition-all hover:bg-slate-800">
                                            <div className="text-right">
                                                <span className="text-slate-500 uppercase font-bold text-[9px] block leading-none mb-0.5">Filing Deadline</span>
                                                <span className="text-sky-400 font-bold text-xs">{result.deadline} <span className="text-[10px] font-medium text-slate-500">({result.stateLaw?.filingDeadlineDays || 180} days)</span></span>
                                            </div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                                        </div>
                                        <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 shadow-inner transition-all hover:bg-emerald-500/20">
                                            <div className="text-right">
                                                <span className="text-slate-500 uppercase font-bold text-[9px] block leading-none mb-0.5">Response Deadline</span>
                                                <span className="text-emerald-400 font-bold text-xs">{result.responseDeadline} <span className="text-[10px] font-medium text-slate-500 leading-none">(14 days)</span></span>
                                            </div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Appeal Letter */}
                            <div className="glass rounded-2xl p-6 sm:p-8 mb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2"><FileText className="w-5 h-5 text-sky-400" /> Appeal Letter</h2>
                                    <div className="flex gap-2">
                                        <button onClick={() => setIsEditingAppeal(!isEditingAppeal)} className="px-3 py-1.5 rounded-lg bg-slate-700 text-sm text-slate-300 hover:bg-slate-600 flex items-center gap-1">
                                            {isEditingAppeal ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Pencil className="w-4 h-4" />} {isEditingAppeal ? 'Done' : 'Edit'}
                                        </button>
                                        <button onClick={() => copyText(editedAppeal, 'letter')} className="px-3 py-1.5 rounded-lg bg-slate-700 text-sm text-slate-300 hover:bg-slate-600 flex items-center gap-1">
                                            {copied === 'letter' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />} {copied === 'letter' ? 'Copied!' : 'Copy'}
                                        </button>
                                        <button onClick={() => downloadPDF(editedAppeal, `appeal-letter-${form.claimNumber || 'draft'}.pdf`)} className="px-3 py-1.5 rounded-lg bg-slate-700 text-sm text-slate-300 hover:bg-slate-600 flex items-center gap-1">
                                            <Download className="w-4 h-4" /> Download PDF
                                        </button>
                                    </div>
                                </div>
                                {isEditingAppeal ? (
                                    <textarea
                                        value={editedAppeal}
                                        onChange={(e) => setEditedAppeal(e.target.value)}
                                        className="w-full h-96 whitespace-pre-wrap text-sm text-slate-300 bg-slate-800/50 rounded-xl p-4 font-mono leading-relaxed border border-sky-500/30 focus:outline-none focus:border-sky-500 transition-all resize-none"
                                    />
                                ) : (
                                    <pre className="whitespace-pre-wrap text-sm text-slate-300 bg-slate-800/50 rounded-xl p-4 max-h-96 overflow-y-auto font-mono leading-relaxed">{editedAppeal}</pre>
                                )}
                            </div>

                            {/* One-Click Send */}
                            <div className="glass rounded-2xl p-6 mb-4">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Mail className="w-5 h-5 text-emerald-400" /> One-Click Send to {result.insurerName}</h3>
                                <p className="text-slate-400 text-sm mb-4">Send your appeal directly to <strong className="text-white">{result.insurerEmail || 'the insurer'}</strong> via email.</p>
                                <button
                                    onClick={handleSendEmail}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    disabled={sending || sent || !result.insurerEmail || isHovered}
                                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${sent ? 'bg-emerald-500 text-white' : !result.insurerEmail ? 'bg-slate-700 text-slate-400' : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 pulse-glow'} disabled:opacity-80`}>
                                    {sent ? <><CheckCircle className="w-5 h-5" /> Email Sent Successfully!</>
                                        : !result.insurerEmail ? <><Mail className="w-5 h-5" /> Email Not Available for Custom Insurer</>
                                            : sending ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending to {result.insurerName}...</>
                                                : <><Send className="w-5 h-5" /> Send Appeal Email Now</>}
                                </button>
                            </div>

                            {/* Bank Dispute */}
                            <div className="glass rounded-2xl p-6 mb-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><Shield className="w-5 h-5 text-amber-400" /> Bank Chargeback Letter</h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => setIsEditingBank(!isEditingBank)} className="px-3 py-1.5 rounded-lg bg-slate-700 text-sm text-slate-300 hover:bg-slate-600 flex items-center gap-1">
                                            {isEditingBank ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Pencil className="w-4 h-4" />} {isEditingBank ? 'Done' : 'Edit'}
                                        </button>
                                        <button onClick={() => copyText(editedBank, 'bank')} className="px-3 py-1.5 rounded-lg bg-slate-700 text-sm text-slate-300 hover:bg-slate-600 flex items-center gap-1">
                                            {copied === 'bank' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />} {copied === 'bank' ? 'Copied!' : 'Copy'}
                                        </button>
                                        <button onClick={() => downloadPDF(editedBank, `chargeback-letter-${form.claimNumber || 'draft'}.pdf`)} className="px-3 py-1.5 rounded-lg bg-slate-700 text-sm text-slate-300 hover:bg-slate-600 flex items-center gap-1">
                                            <Download className="w-4 h-4" /> Download PDF
                                        </button>
                                    </div>
                                </div>
                                {isEditingBank ? (
                                    <textarea
                                        value={editedBank}
                                        onChange={(e) => setEditedBank(e.target.value)}
                                        className="w-full h-48 whitespace-pre-wrap text-sm text-slate-300 bg-slate-800/50 rounded-xl p-4 font-mono border border-sky-500/30 focus:outline-none focus:border-sky-500 transition-all resize-none"
                                    />
                                ) : (
                                    <pre className="whitespace-pre-wrap text-sm text-slate-300 bg-slate-800/50 rounded-xl p-4 max-h-48 overflow-y-auto font-mono">{editedBank}</pre>
                                )}
                            </div>

                            {/* Start Over */}
                            <div className="text-center">
                                <button onClick={() => { setStep(1); setResult(null); setSent(false); setDirection(-1); }} className="px-6 py-3 rounded-xl glass text-slate-300 font-semibold hover:bg-white/10 transition-all">
                                    ← Generate Another Appeal
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
