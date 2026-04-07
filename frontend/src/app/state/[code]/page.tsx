import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stateLaws, getStateLaw, getAllStateCodes } from '@/lib/stateLawDB';
import { insurers } from '@/lib/insurerDB';

export async function generateStaticParams() {
    return getAllStateCodes().map(code => ({ code }));
}

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
    const law = getStateLaw(params.code);
    if (!law) return {};
    return {
        title: `Free Appeal for Denied Claims in ${law.name} – 2026 Insurance Law Guide`,
        description: `${law.name} insurance appeal laws and rights. File a free appeal under ${law.statuteCitation}. AI-generated appeal letter with ${law.name} law citations.`,
        alternates: {
            canonical: `/state/${params.code}`,
        },
    };
}

export default function StatePage({ params }: { params: { code: string } }) {
    const law = getStateLaw(params.code);
    if (!law) notFound();

    const stateInsurers = insurers.filter(i => i.statesOperating.includes('ALL') || i.statesOperating.includes(law.code));

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <nav className="text-sm text-slate-500 mb-6">
                <Link href="/" className="hover:text-white">Home</Link> / <Link href="/generate" className="hover:text-white">Appeal</Link> / <span className="text-white">{law.name}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Free Appeal for Denied Claims in <span className="text-gradient">{law.name}</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8">
                Complete guide to {law.name} insurance appeal laws, rights, and free AI-powered appeal letter generator with {law.name} law citations.
            </p>

            <div className="glass rounded-2xl p-6 mb-8">
                <Link href={`/generate?state=${law.code}`} className="w-full block text-center px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg hover:from-emerald-400 hover:to-cyan-400 transition-all pulse-glow">
                    Generate Free {law.name} Appeal Letter →
                </Link>
            </div>

            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">{law.name} Insurance Appeal Law</h2>
                <div className="glass rounded-xl p-6 mb-6">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div><span className="text-slate-500">Governing Statute:</span><br /><span className="text-white font-medium">{law.statuteCitation}</span></div>
                        <div><span className="text-slate-500">Filing Deadline:</span><br /><span className="text-white font-medium">{law.filingDeadlineDays} days</span></div>
                        <div><span className="text-slate-500">External Review:</span><br /><span className={law.externalReviewAvailable ? 'text-emerald-400' : 'text-red-400'}>{law.externalReviewAvailable ? 'Available ✓' : 'Not Available ✗'}</span></div>
                        <div><span className="text-slate-500">Department of Insurance:</span><br /><span className="text-white font-medium">{law.departmentOfInsurance}</span></div>
                        <div><span className="text-slate-500">Phone:</span><br /><span className="text-white font-medium">{law.departmentPhone}</span></div>
                        <div><span className="text-slate-500">Website:</span><br /><a href={law.departmentUrl} className="text-sky-400 hover:text-sky-300" target="_blank" rel="noopener noreferrer">{law.departmentUrl}</a></div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">Key Provisions Under {law.statuteCitation}</h2>
                <p className="text-slate-300 mb-4">Under {law.statute} ({law.statuteCitation}), {law.name} provides the following protections for insurance policyholders:</p>
                <div className="space-y-2 mb-6">
                    {law.keyProvisions.map((p, i) => (
                        <div key={i} className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4">
                            <span className="text-emerald-400 mt-0.5">✓</span>
                            <span className="text-slate-300">{p}</span>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">Penalties for Insurer Non-Compliance</h2>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
                    <p className="text-amber-200">{law.penaltyForNonCompliance}</p>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">How to File an Insurance Appeal in {law.name}</h2>
                <div className="space-y-3 mb-6">
                    {[
                        `Review your denial letter carefully for the specific reason and your appeal rights under ${law.statuteCitation}.`,
                        `Gather all supporting documentation including medical records, treating physician letters, and clinical guidelines.`,
                        `Use our free AI generator to create a legally compelling appeal letter citing ${law.name} law.`,
                        `Submit your appeal within ${law.filingDeadlineDays} days of the denial date via certified mail and email.`,
                        law.externalReviewAvailable ? `If internal appeal is denied, request an external review through the ${law.departmentOfInsurance}.` : `If denied, contact the ${law.departmentOfInsurance} to file a complaint.`,
                    ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4">
                            <span className="text-sky-400 font-bold">{i + 1}.</span>
                            <span className="text-slate-300">{step}</span>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">Insurers Operating in {law.name}</h2>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {stateInsurers.slice(0, 8).map(i => (
                        <Link key={i.slug} href={`/appeal/${i.slug}`} className="glass rounded-xl p-4 hover:bg-white/10 transition-all">
                            <div className="text-white font-medium">{i.name}</div>
                            <div className="text-slate-400 text-sm">Appeal deadline: {i.filingDeadlineDays} days</div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-3">Appeal Your Denial Under {law.name} Law</h2>
                <p className="text-slate-400 mb-6">Generate a free AI-powered appeal letter citing {law.statuteCitation}.</p>
                <Link href={`/generate?state=${law.code}`} className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all pulse-glow">
                    Generate Free Appeal Letter →
                </Link>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org", "@type": "HowTo", "name": `How to Appeal a Denied Insurance Claim in ${law.name}`,
                    "description": `Step-by-step guide to appealing denied insurance claims in ${law.name} under ${law.statuteCitation}.`,
                    "step": [
                        { "@type": "HowToStep", "position": 1, "text": "Review your denial letter and identify the reason for denial" },
                        { "@type": "HowToStep", "position": 2, "text": "Gather supporting medical documentation and clinical guidelines" },
                        { "@type": "HowToStep", "position": 3, "text": `Generate an AI appeal letter citing ${law.statuteCitation}` },
                        { "@type": "HowToStep", "position": 4, "text": `Submit within ${law.filingDeadlineDays} days via certified mail` },
                    ]
                })
            }} />
        </div>
    );
}
