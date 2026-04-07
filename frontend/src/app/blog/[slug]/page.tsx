import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getAllBlogSlugs } from "@/lib/blogContent";
import { Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.updateDate,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();
  const related = blogPosts.filter((p) => post.relatedSlugs.includes(p.slug));

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("### "))
        return (
          <h3 key={i} className="text-xl font-bold text-white mt-6 mb-3">
            {line.slice(4)}
          </h3>
        );
      if (line.startsWith("## "))
        return (
          <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">
            {line.slice(3)}
          </h2>
        );
      if (line.startsWith("- **")) {
        const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
        if (match)
          return (
            <div key={i} className="flex items-start gap-2 ml-4 mb-2">
              <span className="text-sky-400 mt-1">•</span>
              <span className="text-slate-300">
                <strong className="text-white">{match[1]}</strong>
                {match[2] ? `: ${match[2]}` : ""}
              </span>
            </div>
          );
      }
      if (line.startsWith("- [ ]"))
        return (
          <div key={i} className="flex items-start gap-2 ml-4 mb-1">
            <span className="text-slate-500">☐</span>
            <span className="text-slate-300">{line.slice(6)}</span>
          </div>
        );
      if (line.startsWith("- "))
        return (
          <div key={i} className="flex items-start gap-2 ml-4 mb-2">
            <span className="text-sky-400 mt-1">•</span>
            <span className="text-slate-300">{line.slice(2)}</span>
          </div>
        );
      if (line.match(/^\d+\.\s/))
        return (
          <div key={i} className="flex items-start gap-2 ml-4 mb-2">
            <span className="text-sky-400 font-bold">
              {line.match(/^(\d+)\./)?.[1]}.
            </span>
            <span className="text-slate-300">
              {line.replace(/^\d+\.\s/, "")}
            </span>
          </div>
        );
      if (line.startsWith("**") && line.endsWith("**"))
        return (
          <p key={i} className="text-white font-semibold my-2">
            {line.slice(2, -2)}
          </p>
        );
      if (line.trim() === "") return <div key={i} className="h-2" />;
      // Handle inline links
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex)
          parts.push(line.slice(lastIndex, match.index));
        parts.push(
          <Link
            key={`${i}-${match.index}`}
            href={match[2]}
            className="text-sky-400 hover:text-sky-300 underline"
          >
            {match[1]}
          </Link>,
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) parts.push(line.slice(lastIndex));
      return (
        <p key={i} className="text-slate-300 mb-3 leading-relaxed">
          {parts.length > 0 ? parts : line}
        </p>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-white">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:text-white">
          Blog
        </Link>{" "}
        / <span className="text-white line-clamp-1">{post.title}</span>
      </nav>

      <article>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-8">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.updateDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime} min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          {renderContent(post.content)}
        </div>
      </article>

      {/* CTA */}
      <div className="glass rounded-2xl p-8 text-center mt-12">
        <h2 className="text-2xl font-bold mb-3">
          Ready to{" "}
          <span className="text-gradient-green">Appeal Your Denial</span>?
        </h2>
        <p className="text-slate-400 mb-6">
          Generate a free AI-powered appeal letter in less than 60 seconds.
        </p>
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all pulse-glow"
        >
          Generate Free Appeal Letter <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="glass rounded-xl p-4 hover:bg-white/10 transition-all"
              >
                <div className="text-white font-medium mb-1">{r.title}</div>
                <div className="text-slate-500 text-sm">
                  {r.readTime} min read
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.publishDate,
            dateModified: post.updateDate,
            author: {
              "@type": "Organization",
              name: "AppealLetterGenerator.com",
            },
          }),
        }}
      />
    </div>
  );
}
