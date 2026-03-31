import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogContent';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Insurance Appeal Guides & Blog – Free Expert Resources',
    description: 'Free guides on how to appeal denied insurance claims. Expert articles on UHC, Anthem, Aetna, Cigna denials, state laws, and appeal strategies.',
};

export default function BlogPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                    <span className="text-gradient">Insurance Appeal</span> Guides & Resources
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">Expert guides on how to appeal denied health insurance claims for free. Updated for 2026.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map(post => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="glass rounded-2xl p-6 hover:bg-white/10 transition-all group">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-xs">{tag}</span>
                            ))}
                        </div>
                        <h2 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors mb-2 line-clamp-2">{post.title}</h2>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.metaDescription}</p>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                            <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min read</div>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-sky-400" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
