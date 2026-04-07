import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Insurance Appeal Letter Generator | Appeal a Denied Claim',
    description: 'Use our free AI appeal letter generator to overturn your denied health insurance claim in 60 seconds. High success rate, 100% free, no login required.',
    alternates: {
        canonical: '/generate',
    },
};

export default function GenerateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
