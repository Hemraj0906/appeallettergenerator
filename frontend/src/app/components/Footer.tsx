"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                FA
              </div>
              <span className="text-lg font-bold text-gradient">
                Appeal Letter Generator
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              The #1 free tool to overturn denied insurance claims. AI-powered
              appeal letters in 60 seconds.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Top Insurer Appeals</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/appeal/unitedhealthcare" className="hover:text-white transition-colors">UnitedHealthcare</Link></li>
              <li><Link href="/appeal/anthem" className="hover:text-white transition-colors">Anthem BCBS</Link></li>
              <li><Link href="/appeal/aetna" className="hover:text-white transition-colors">Aetna</Link></li>
              <li><Link href="/appeal/cigna" className="hover:text-white transition-colors">Cigna</Link></li>
              <li><Link href="/appeal/bcbs" className="hover:text-white transition-colors">Blue Cross Blue Shield</Link></li>
              <li><Link href="/appeal/humana" className="hover:text-white transition-colors">Humana</Link></li>
              <li><Link href="/appeal/kaiser" className="hover:text-white transition-colors">Kaiser Permanente</Link></li>
              <li><Link href="/appeal/auto-insurance" className="hover:text-white transition-colors">Auto Insurance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">State Law Guides</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400">
              <li><Link href="/state/CA" className="hover:text-white transition-colors">California</Link></li>
              <li><Link href="/state/NY" className="hover:text-white transition-colors">New York</Link></li>
              <li><Link href="/state/TX" className="hover:text-white transition-colors">Texas</Link></li>
              <li><Link href="/state/FL" className="hover:text-white transition-colors">Florida</Link></li>
              <li><Link href="/state/IL" className="hover:text-white transition-colors">Illinois</Link></li>
              <li><Link href="/state/PA" className="hover:text-white transition-colors">Pennsylvania</Link></li>
              <li><Link href="/state/OH" className="hover:text-white transition-colors">Ohio</Link></li>
              <li><Link href="/state/GA" className="hover:text-white transition-colors">Georgia</Link></li>
              <li><Link href="/state/NC" className="hover:text-white transition-colors">North Carolina</Link></li>
              <li><Link href="/state/MI" className="hover:text-white transition-colors">Michigan</Link></li>
              <li><Link href="/state/NJ" className="hover:text-white transition-colors">New Jersey</Link></li>
              <li><Link href="/state/VA" className="hover:text-white transition-colors">Virginia</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Resources & Support</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/blog" className="hover:text-white transition-colors">All Blog Articles</Link></li>
              <li><Link href="/success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About the Tool</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li className="text-xs text-slate-500 mt-4">
                Not affiliated with any insurance company. Not medical or legal advice. Verified for 2026 guidelines.
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 AppealLetterGenerator.com. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            We delete your data within 24 hours
          </div>
        </div>
      </div>
    </footer>
  );
}
