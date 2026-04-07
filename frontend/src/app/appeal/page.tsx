import { Metadata } from 'next';
import Link from 'next/link';
import { insurers } from '@/lib/insurerDB';

export const metadata: Metadata = {
    title: 'Insurance Appeal Guides by Company | Free Appeal Templates',
    description: 'Find your insurance company to get specific appeal guides, contact info, and free AI-powered appeal letter templates for UnitedHealthcare, Anthem, Aetna, Cigna, and more.',
    alternates: {
        canonical: '/appeal',
    },
};

export default function AppealIndexPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                    Insurance <span className="text-gradient">Appeal Guides</span> by Company
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Select your insurance provider to access company-specific appeal instructions, winning case laws, and our free AI appeal generator.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {insurers.map((ins) => (
                    <Link
                        key={ins.slug}
                        href={`/appeal/${ins.slug}`}
                        className="block glass rounded-2xl p-6 hover:bg-white/10 transition-all group"
                    >
                        <div className="text-white font-bold text-lg mb-2 group-hover:text-emerald-400 transition-colors">
                            {ins.name}
                        </div>
                        <div className="text-emerald-400 font-bold mb-4">{ins.successRate}% Success Rate</div>
                        <div className="text-slate-500 text-sm">View Appeal Guide →</div>
                    </Link>
                ))}
            </div>

            <div className="mt-20 glass rounded-3xl p-12 text-center bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                <h2 className="text-3xl font-bold mb-4">Don&apos;t See Your Insurer?</h2>
                <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                    Our AI generator works for every insurance company. Simply enter your company name manually in our generator to get a tailored appeal letter.
                </p>
                <Link href="/generate" className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all pulse-glow">
                    Generate My Free Appeal Now →
                </Link>
            </div>
        </div>
    );
}
