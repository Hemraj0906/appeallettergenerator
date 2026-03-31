import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { denialReasons, getDenialReason, getAllDenialReasonSlugs } from '@/lib/denialReasons';
import { caseLaws } from '@/lib/caseLawDB';

export async function generateStaticParams() {
    return getAllDenialReasonSlugs().map(reason => ({ reason }));
}

export async function generateMetadata({ params }: { params: { reason: string } }): Promise<Metadata> {
    const reason = getDenialReason(params.reason);
    if (!reason) return {};
    return {
        title: `Free Appeal for "${reason.name}" Denials – 2026 AI Generator`,
        description: `How to appeal "${reason.name}" insurance denials for free. ${reason.successRate}% success rate. AI-generated letter with legal citations. No login.`,
    };
}

export default function ReasonPage({ params }: { params: { reason: string } }) {
    const reason = getDenialReason(params.reason);
    if (!reason) notFound();

    const relatedCases = caseLaws.filter(c => reason.relatedCases.includes(c.id));

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <nav className="text-sm text-slate-500 mb-6">
                <Link href="/" className="hover:text-white">Home</Link> / <Link href="/generate" className="hover:text-white">Appeal</Link> / <span className="text-white">{reason.name}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Free Appeal for <span className="text-gradient">&ldquo;{reason.name}&rdquo;</span> Denials
            </h1>
            <p className="text-slate-400 text-lg mb-8">{reason.description}</p>

            <div className="glass rounded-2xl p-6 mb-8 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="text-emerald-400 font-bold text-2xl">{reason.successRate}%</div>
                    <div className="text-slate-400 text-sm">Appeal Success Rate</div>
                </div>
                <Link href={`/generate?reason=${reason.slug}`} className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all">
                    Generate Free Appeal →
                </Link>
            </div>

            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">How to Appeal &ldquo;{reason.name}&rdquo; Denials</h2>
                <p className="text-slate-300 mb-4">When your insurer denies a claim as &ldquo;{reason.name.toLowerCase()},&rdquo; it means {reason.description.toLowerCase()} Here are proven strategies to overturn this type of denial:</p>

                <div className="space-y-3 mb-6">
                    {reason.appealStrategy.map((strategy, i) => (
                        <div key={i} className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4">
                            <span className="text-sky-400 font-bold">{i + 1}.</span>
                            <span className="text-slate-300">{strategy}</span>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">AMA / Clinical Guidelines</h2>
                <div className="glass rounded-xl p-4 mb-6">
                    <p className="text-slate-300">{reason.amaGuideline}</p>
                </div>

                {reason.commonCPTCodes.length > 0 && (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-4">Commonly Denied CPT Codes</h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {reason.commonCPTCodes.map(code => (
                                <span key={code} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-sm font-mono">{code}</span>
                            ))}
                        </div>
                    </>
                )}

                {relatedCases.length > 0 && (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-4">Winning Cases for &ldquo;{reason.name}&rdquo;</h2>
                        <div className="space-y-3 mb-6">
                            {relatedCases.map(c => (
                                <div key={c.id} className="bg-slate-800/50 rounded-xl p-4">
                                    <div className="text-white font-semibold">{c.caseName} ({c.year})</div>
                                    <div className="text-slate-500 text-sm">{c.citation}</div>
                                    <div className="text-slate-300 text-sm mt-1">{c.keyHolding}</div>
                                    <div className="text-emerald-400 text-sm mt-1">Outcome: Won — ${c.amountAwarded.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {reason.relatedStatutes.length > 0 && (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-4">Relevant Statutes</h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {reason.relatedStatutes.map(s => (
                                <span key={s} className="px-3 py-1.5 rounded-lg glass text-slate-300 text-sm">{s}</span>
                            ))}
                        </div>
                    </>
                )}

                <h2 className="text-2xl font-bold text-white mb-4">Other Denial Types</h2>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {denialReasons.filter(r => r.slug !== reason.slug).map(r => (
                        <Link key={r.slug} href={`/reason/${r.slug}`} className="glass rounded-xl p-4 hover:bg-white/10 transition-all">
                            <div className="text-white font-medium">{r.name}</div>
                            <div className="text-emerald-400 text-sm">{r.successRate}% success rate</div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-3">Appeal Your &ldquo;{reason.name}&rdquo; Denial</h2>
                <p className="text-slate-400 mb-6">Generate a free AI-powered appeal letter specific to this denial type.</p>
                <Link href={`/generate?reason=${reason.slug}`} className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all pulse-glow">
                    Generate Free Appeal Letter →
                </Link>
            </div>
        </div>
    );
}
