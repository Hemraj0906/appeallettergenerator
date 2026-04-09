import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { insurers, getInsurer } from '@/lib/insurerDB';
import { findCasesByInsurer } from '@/lib/caseLawDB';
import { denialReasons } from '@/lib/denialReasons';
import { generateSeoContent } from '@/lib/seoVariations';

export async function generateStaticParams() {
    return insurers.map(i => ({ insurer: i.slug }));
}

export async function generateMetadata({ params }: { params: { insurer: string } }): Promise<Metadata> {
    const ins = getInsurer(params.insurer);
    if (!ins) return {};
    return {
        title: `How to Appeal a Denied ${ins.name} Claim (2026 Guide & Samples)`,
        description: `Was your ${ins.name} health insurance claim denied? Read our expert step-by-step guide on overturning denials, common mistakes, winning tips, and free sample appeal letters.`,
        alternates: {
            canonical: `/appeal/${params.insurer}`,
        },
        openGraph: { title: `Free Appeal for ${ins.name} Denied Claims`, description: `Overturn your ${ins.shortName} denial in 60 seconds with our free AI appeal generator.` },
    };
}

export default function InsurerPage({ params }: { params: { insurer: string } }) {
    const ins = getInsurer(params.insurer);
    if (!ins) notFound();
    const cases = findCasesByInsurer(params.insurer);
    const seoContent = generateSeoContent(ins);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": seoContent.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to Appeal a Denied ${ins.name} Claim`,
        "step": ins.tips.map((tip, i) => ({ "@type": "HowToStep", "position": i + 1, "text": tip }))
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
            {/* Breadcrumb */}
            <nav className="text-sm text-slate-500 mb-6">
                <Link href="/" className="hover:text-white">Home</Link> / <Link href="/generate" className="hover:text-white">Appeal</Link> / <span className="text-white">{ins.name}</span>
            </nav>

            <header className="mb-10">
                <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight">
                    Expert Guide: Appealing a Denied <br className="hidden sm:block"/>
                    <span className="text-gradient">{ins.name}</span> Claim
                </h1>
                <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
                    {seoContent.introduction}
                </p>
            </header>

            {/* Quick Action */}
            <div className="glass rounded-2xl p-6 sm:p-8 mb-12 border border-emerald-500/20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="text-emerald-400 font-black text-4xl mb-1">{ins.successRate}%</div>
                        <div className="text-slate-300 uppercase tracking-wide text-sm font-semibold">Average Appeal Success Rate</div>
                    </div>
                    <Link href={`/generate?insurer=${ins.slug}`} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all text-center pulse-glow whitespace-nowrap">
                        Generate Free Letter Now →
                    </Link>
                </div>
            </div>

            <article className="prose prose-invert prose-lg max-w-none">
                
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What Does a {ins.shortName} Denial Actually Mean?</h2>
                <p className="text-slate-300 leading-relaxed mb-8">{seoContent.meaning}</p>

                <div className="grid sm:grid-cols-2 gap-6 my-10">
                    <div className="glass rounded-xl p-6 border-l-4 border-l-red-500">
                        <h3 className="text-xl font-bold text-white mt-0 mb-3">Don't Give Up</h3>
                        <p className="text-slate-400 mb-0 text-base">Less than 1% of patients actually appeal their denial letters. Insurance companies rely on this statistic. By fighting back, you inherently set yourself apart from the norm.</p>
                    </div>
                    <div className="glass rounded-xl p-6 border-l-4 border-l-emerald-500">
                        <h3 className="text-xl font-bold text-white mt-0 mb-3">You Have Rights</h3>
                        <p className="text-slate-400 mb-0 text-base">Under the ACA and ERISA, you are guaranteed a full and fair review. They must provide you precisely the internal guidelines used to deny your specific coverage.</p>
                    </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Top Reasons {ins.name} Denies Claims</h2>
                <p className="text-slate-300 mb-6">Based on aggregated national data, when {ins.shortName} refuses to pay for medical care, they typically cite one of the following rationales:</p>
                <div className="space-y-4 mb-10">
                    {seoContent.reasonsData.map(reason => (
                        <div key={reason.slug} className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                            <h3 className="text-xl font-semibold text-white mt-0 mb-2">{reason.name}</h3>
                            <p className="text-slate-400 text-base m-0 mb-3">{reason.description}</p>
                            <Link href={`/reason/${reason.slug}`} className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold flex items-center gap-1">
                                Strategy to beat this denial <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">The Step-by-Step Appeal Process</h2>
                <p className="text-slate-300 mb-6">Winning an appeal against a company matching {ins.parentCompany}'s scale requires rigorous adherence to their administrative procedures. Follow these steps meticulously:</p>
                
                <div className="space-y-6 mb-10">
                    {[
                        { title: "Review the EOB Thoroughly", desc: "Locate exactly the billing codes and the brief, often cryptic reason code printed on your Explanation of Benefits." },
                        { title: "Gather Clinical Data", desc: "Obtain the precise clinic notes, peer-reviewed literature, and your physician's letter of medical necessity." },
                        ...ins.tips.map(t => ({ title: "Apply Plan-Specific Strategy", desc: t })),
                        { title: "Submit Before Deadline", desc: `You MUST mail or fax your packet to ${ins.appealAddress} or ${ins.appealFax} before the strict ${ins.filingDeadlineDays}-day window closes.` }
                    ].map((step, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                                {i + 1}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mt-0 mb-1">{step.title}</h3>
                                <p className="text-slate-400 m-0 text-base">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="glass rounded-xl p-6 mb-10 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-white mt-0 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        Fatal Appeal Mistakes
                    </h3>
                    <ul className="space-y-4 m-0 p-0 list-none">
                        {seoContent.mistakes.map((mistake, i) => (
                            <li key={i} className="text-slate-300 text-base">
                                <strong className="text-white block mb-1">{mistake.title}</strong>
                                {mistake.desc}
                            </li>
                        ))}
                    </ul>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Sample Appeal Letter for {ins.shortName}</h2>
                <p className="text-slate-300 mb-6">Here is an example of what a successful, structurally sound appeal looks like. Notice how it eschews emotion in favor of clinical facts and policy demands. You can also {seoContent.internalLinks.map((link, idx) => (
                    <span key={idx}>
                        <Link href={link.url} className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">{link.text}</Link>
                        {idx < seoContent.internalLinks.length - 1 ? " or " : "."}
                    </span>
                 ))}</p>
                
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-12 overflow-x-auto">
                    <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap">{seoContent.sampleLetter}</pre>
                </div>

                {cases.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Real Legal Precedent Against {ins.parentCompany}</h2>
                        <p className="text-slate-300 mb-6">Courts frequently force massive insurers to pay. By citing binding legal precedent and case law in your letter, you demonstrate you are prepared to escalate the matter:</p>
                        <div className="grid gap-4">
                            {cases.map(c => (
                                <div key={c.id} className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
                                    <div className="text-white font-bold mb-2 text-lg">{c.caseName} ({c.year})</div>
                                    <div className="text-slate-400 text-xs font-mono mb-3 bg-slate-900/50 inline-block px-2 py-1 rounded">{c.citation}</div>
                                    <div className="text-slate-300 text-base">{c.keyHolding}</div>
                                    <div className="text-emerald-400 font-semibold mt-3">Court Awarded: ${c.amountAwarded.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6 mb-12">
                    {seoContent.faqs.map((faq, i) => (
                        <div key={i} className="border-b border-slate-700/50 pb-6 last:border-0 last:pb-0">
                            <h3 className="text-xl font-bold text-white mt-0 mb-2">{faq.q}</h3>
                            <p className="text-slate-400 m-0 text-base leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>

            </article>

            {/* CTA */}
            <div className="glass rounded-2xl p-8 sm:p-12 text-center border border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl sm:text-4xl font-black mb-4">Let AI Draft Your Perfect Response</h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">{seoContent.ctaText}</p>
                    <Link href={`/generate?insurer=${ins.slug}`} className="inline-flex px-10 py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] transform hover:-translate-y-1">
                        Use the Free AI Appeal Generator →
                    </Link>
                </div>
            </div>

            {/* Schemas */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </div>
    );
}
