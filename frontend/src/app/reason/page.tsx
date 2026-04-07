import { Metadata } from 'next';
import Link from 'next/link';
import { denialReasons } from '@/lib/denialReasons';

export const metadata: Metadata = {
    title: 'Insurance Denial Reasons & Appeal Strategies | Free AI Help',
    description: 'Learn how to appeal common insurance denial reasons like Not Medically Necessary, Pre-Authorization Required, and more. Free AI appeal generator with high success rates.',
    alternates: {
        canonical: '/reason',
    },
};

export default function ReasonIndexPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                    Insurance <span className="text-gradient">Denial Reasons</span> & Strategies
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Understand why your claim was denied and find the proven legal strategy to overturn it. Select your denial reason to view specific appeal guides.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {denialReasons.map((reason) => (
                    <Link
                        key={reason.slug}
                        href={`/reason/${reason.slug}`}
                        className="block glass rounded-2xl p-6 hover:bg-white/10 transition-all group border border-white/5"
                    >
                        <div className="text-white font-bold text-lg mb-2 group-hover:text-sky-400 transition-colors">
                            {reason.name}
                        </div>
                        <div className="text-sky-400 font-bold mb-3">{reason.successRate}% Success Rate</div>
                        <p className="text-slate-500 text-sm line-clamp-3 mb-4">
                            {reason.description}
                        </p>
                        <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                            View Strategy →
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
