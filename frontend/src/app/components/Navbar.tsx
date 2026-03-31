"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
              FA
            </div>
            <span className="text-lg font-bold text-gradient hidden sm:inline">
              Appeal Letter Generator
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/generate"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Generate Appeal
            </Link>
            <Link
              href="/blog"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/success-stories"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Success Stories
            </Link>
          </div>
          <Link
            href="/generate"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold hover:from-emerald-400 hover:to-cyan-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            Free Appeal →
          </Link>
        </div>
      </div>
    </nav>
  );
}
