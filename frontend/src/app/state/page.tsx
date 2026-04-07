import { Metadata } from 'next';
import Link from 'next/link';
import { stateLaws } from '@/lib/stateLawDB';

export const metadata: Metadata = {
    title: 'Insurance Appeal Laws by State | Free Regional Guides',
    description: 'Browse insurance appeal laws, filing deadlines, and department of insurance contacts for all 50 US states, UK, Canada, and Australia.',
    alternates: {
        canonical: '/state',
    },
};

export default function StateIndexPage() {
    const usStates = stateLaws.filter(s => s.country === 'US');
    const intlStates = stateLaws.filter(s => s.country !== 'US');

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                    Insurance Appeal <span className="text-gradient">Laws by State</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Select your state or country to view specific insurance laws, appeal deadlines, and contact information for your Department of Insurance.
                </p>
            </div>

            <h2 className="text-2xl font-bold text-white mb-8">United States</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
                {usStates.map((state) => (
                    <Link
                        key={state.code}
                        href={`/state/${state.code}`}
                        className="block glass rounded-xl p-4 hover:bg-white/10 transition-all group"
                    >
                        <div className="text-white font-semibold group-hover:text-sky-400 transition-colors">
                            {state.name}
                        </div>
                        <div className="text-slate-500 text-sm">Appeal Laws & Deadlines</div>
                    </Link>
                ))}
            </div>

            <h2 className="text-2xl font-bold text-white mb-8">International</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {intlStates.map((state) => (
                    <Link
                        key={state.code}
                        href={`/state/${state.code}`}
                        className="block glass rounded-xl p-4 hover:bg-white/10 transition-all group"
                    >
                        <div className="text-white font-semibold group-hover:text-sky-400 transition-colors">
                            {state.name}
                        </div>
                        <div className="text-slate-500 text-sm">Regional Appeal Process</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
