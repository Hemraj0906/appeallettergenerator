import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { insurers, getInsurer } from '@/lib/insurerDB';
import { findCasesByInsurer } from '@/lib/caseLawDB';
import { denialReasons } from '@/lib/denialReasons';

export async function generateStaticParams() {
    return insurers.map(i => ({ insurer: i.slug }));
}

export async function generateMetadata({ params }: { params: { insurer: string } }): Promise<Metadata> {
    const ins = getInsurer(params.insurer);
    if (!ins) return {};
    return {
        title: `Free Appeal for ${ins.name} Denied Claims – 2026 AI Generator`,
        description: `How to appeal a denied ${ins.name} claim for free. AI-generated appeal letter with legal citations. ${ins.successRate}% success rate. No login required.`,
        openGraph: { title: `Free Appeal for ${ins.name} Denied Claims`, description: `Overturn your ${ins.shortName} denial in 60 seconds with our free AI appeal generator.` },
    };
}

export default function InsurerPage({ params }: { params: { insurer: string } }) {
    const ins = getInsurer(params.insurer);
    if (!ins) notFound();
    const cases = findCasesByInsurer(params.insurer);

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            {/* Breadcrumb */}
            <nav className="text-sm text-slate-500 mb-6">
                <Link href="/" className="hover:text-white">Home</Link> / <Link href="/generate" className="hover:text-white">Appeal</Link> / <span className="text-white">{ins.name}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                How to Appeal a Denied <span className="text-gradient">{ins.name}</span> Claim for Free
            </h1>
            <p className="text-slate-400 text-lg mb-8">
                Free AI-powered appeal letter generator for {ins.shortName} denied claims. Our tool generates legally compelling letters with case law citations in under 60 seconds.
            </p>

            {/* Quick Action */}
            <div className="glass rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="text-emerald-400 font-bold text-2xl">{ins.successRate}%</div>
                        <div className="text-slate-400 text-sm">Appeal Success Rate</div>
                    </div>
                    <Link href={`/generate?insurer=${ins.slug}`} className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all">
                        Generate Free {ins.shortName} Appeal →
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">About {ins.name} Insurance Denials</h2>
                <p className="text-slate-300 mb-4">{ins.name} ({ins.shortName}), a subsidiary of {ins.parentCompany}, is one of the largest health insurers in the United States. While they provide coverage to millions, claim denials are unfortunately common. If {ins.shortName} has denied your claim, you have the legal right to appeal.</p>
                <p className="text-slate-300 mb-6">The most common reasons {ins.shortName} denies claims include: {ins.commonDenialReasons.map(r => denialReasons.find(d => d.slug === r)?.name).filter(Boolean).join(', ')}. Each of these denials can be successfully appealed with the right approach and documentation.</p>

                <h2 className="text-2xl font-bold text-white mb-4">How to Appeal a {ins.shortName} Denial</h2>
                <div className="space-y-3 mb-6">
                    {ins.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4">
                            <span className="text-sky-400 font-bold">{i + 1}.</span>
                            <span className="text-slate-300">{tip}</span>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">{ins.shortName} Appeal Contact Information</h2>
                <div className="glass rounded-xl p-6 mb-6 grid sm:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500">Appeal Email:</span> <span className="text-white">{ins.appealEmail}</span></div>
                    <div><span className="text-slate-500">Appeal Phone:</span> <span className="text-white">{ins.appealPhone}</span></div>
                    <div><span className="text-slate-500">Appeal Fax:</span> <span className="text-white">{ins.appealFax}</span></div>
                    <div><span className="text-slate-500">Filing Deadline:</span> <span className="text-white">{ins.filingDeadlineDays} days</span></div>
                    <div className="sm:col-span-2"><span className="text-slate-500">Appeal Address:</span> <span className="text-white">{ins.appealAddress}</span></div>
                </div>

                {cases.length > 0 && (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-4">Winning Cases Against {ins.shortName}</h2>
                        <div className="space-y-3 mb-6">
                            {cases.map(c => (
                                <div key={c.id} className="bg-slate-800/50 rounded-xl p-4">
                                    <div className="text-white font-semibold mb-1">{c.caseName} ({c.year})</div>
                                    <div className="text-slate-400 text-sm mb-2">{c.citation}</div>
                                    <div className="text-slate-300 text-sm">{c.keyHolding}</div>
                                    <div className="text-emerald-400 text-sm mt-1">Awarded: ${c.amountAwarded.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <h2 className="text-2xl font-bold text-white mb-4">Common {ins.shortName} Denial Reasons</h2>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {ins.commonDenialReasons.map(r => {
                        const reason = denialReasons.find(d => d.slug === r);
                        return reason ? (
                            <Link key={r} href={`/reason/${r}`} className="glass rounded-xl p-4 hover:bg-white/10 transition-all">
                                <div className="text-white font-medium">{reason.name}</div>
                                <div className="text-emerald-400 text-sm">{reason.successRate}% success rate</div>
                            </Link>
                        ) : null;
                    })}
                </div>
            </div>

            {/* CTA */}
            <div className="glass rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-3">Ready to Appeal Your {ins.shortName} Denial?</h2>
                <p className="text-slate-400 mb-6">Generate a free AI-powered appeal letter in less than 60 seconds.</p>
                <Link href={`/generate?insurer=${ins.slug}`} className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all pulse-glow">
                    Generate Free Appeal Letter →
                </Link>
            </div>

            {/* Schema */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org", "@type": "HowTo", "name": `How to Appeal a Denied ${ins.name} Claim`,
                    "step": ins.tips.map((tip, i) => ({ "@type": "HowToStep", "position": i + 1, "text": tip }))
                })
            }} />
        </div>
    );
}
