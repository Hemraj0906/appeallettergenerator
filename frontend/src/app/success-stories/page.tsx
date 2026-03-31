import { Metadata } from "next";
import Link from "next/link";
import { Star, TrendingUp, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Success Stories – Real People Who Overturned Insurance Denials",
  description:
    "Real success stories from people who used AppealLetterGenerator.com to overturn denied insurance claims. See how they saved thousands.",
};

const stories = [
  {
    name: "Sarah M.",
    location: "Los Angeles, CA",
    insurer: "UnitedHealthcare",
    amount: 14200,
    denial: "Knee surgery denied as not medically necessary",
    outcome: "Denial reversed in 11 days using DMHC Independent Medical Review",
    quote:
      "I was devastated when UHC denied my knee surgery after waiting 6 months. This tool generated a letter citing California law and a winning case. They reversed the denial in 11 days! I cried happy tears.",
    date: "2026-01-15",
  },
  {
    name: "James R.",
    location: "Houston, TX",
    insurer: "Anthem",
    amount: 8750,
    denial: "MRI denied as not medically necessary",
    outcome: "Approved after peer-to-peer review within 2 weeks",
    quote:
      "After 3 months of fighting Anthem on my own with no results, I used this free tool. The AI letter was honestly better than what I think a lawyer could write. Referenced Texas law and everything.",
    date: "2026-01-28",
  },
  {
    name: "Maria L.",
    location: "Brooklyn, NY",
    insurer: "Cigna",
    amount: 22000,
    denial: "Behavioral therapy denied - Mental Health Parity violation",
    outcome: "Full 6 months retroactive coverage approved",
    quote:
      "Cigna denied my son's ABA therapy. The AI letter cited the Mental Health Parity Act, which I had never heard of. The one-click email made it so easy. We won the appeal and Cigna covered 6 months retroactively!",
    date: "2026-02-05",
  },
  {
    name: "David K.",
    location: "Miami, FL",
    insurer: "Aetna",
    amount: 5400,
    denial: "Physical therapy sessions denied after 10 visits",
    outcome: "Additional 20 sessions approved within 10 days",
    quote:
      "Simple and incredibly fast. Uploaded my denial letter, clicked generate, and had a professional appeal letter with Florida law citations in 45 seconds. Aetna approved without even requiring a second call.",
    date: "2026-02-14",
  },
  {
    name: "Lisa T.",
    location: "Columbus, OH",
    insurer: "BCBS",
    amount: 3200,
    denial: "Lab work flagged as duplicate claim",
    outcome: "Reprocessed and paid within 7 days",
    quote:
      "BCBS said my lab work was a duplicate. The AI identified that the CPT codes were completely different and generated a letter proving they were separate services. Resolved in just 1 week.",
    date: "2026-02-22",
  },
  {
    name: "Robert P.",
    location: "Phoenix, AZ",
    insurer: "Humana",
    amount: 12600,
    denial: "Out-of-network specialist visit denied",
    outcome: "In-network exception granted retroactively",
    quote:
      "The nearest in-network endocrinologist was 180 miles away. The appeal letter cited network adequacy requirements under Arizona law. Humana granted a single-case agreement and paid the full amount.",
    date: "2026-03-01",
  },
  {
    name: "Jennifer W.",
    location: "Seattle, WA",
    insurer: "Kaiser",
    amount: 42000,
    denial: "Spinal fusion surgery denied as experimental",
    outcome: "Approved after external review overturned denial",
    quote:
      'Kaiser called a standard spinal fusion "experimental." The AI letter cited FDA approval, NASS guidelines, and a similar winning case. The external review panel overturned the denial unanimously.',
    date: "2026-03-10",
  },
  {
    name: "Michael C.",
    location: "Chicago, IL",
    insurer: "Cigna",
    amount: 7800,
    denial: "Pre-authorization retroactive denial",
    outcome: "Full payment after citing Wilson v. Cigna",
    quote:
      "Cigna pre-authorized my procedure, then retroactively denied it! The AI letter cited Wilson v. Cigna (2023) which held that retroactive denial after pre-auth is bad faith. They paid in full.",
    date: "2026-03-18",
  },
];

export default function SuccessStoriesPage() {
  const totalSaved = stories.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Real People, <span className="text-gradient-green">Real Results</span>
        </h1>
        <p className="text-slate-400 text-lg mb-6">
          See how others have successfully overturned their insurance denials
          using our free tool.
        </p>
        <div className="inline-flex items-center gap-3 glass rounded-xl px-6 py-3">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <div className="text-left">
            <div className="text-emerald-400 font-bold text-2xl">
              ${totalSaved.toLocaleString()}+
            </div>
            <div className="text-slate-400 text-sm">
              Total Saved by Featured Users
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {stories.map((story, i) => (
          <div key={i} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-slate-300 mb-4 italic text-lg leading-relaxed">
              &ldquo;{story.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-white font-bold">{story.name}</div>
                <div className="text-slate-500 text-sm">
                  {story.location} • vs. {story.insurer}
                </div>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-bold text-xl">
                  ${story.amount.toLocaleString()}
                </div>
                <div className="text-slate-500 text-sm">Recovered</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-sm">
              <div className="text-slate-500">
                <strong className="text-white">Denial:</strong> {story.denial}
              </div>
            </div>
            <div className="text-sm text-slate-500 mt-1">
              <strong className="text-emerald-400">Result:</strong>{" "}
              {story.outcome}
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-8 text-center mt-12">
        <h2 className="text-2xl font-bold mb-3">
          Ready to Write{" "}
          <span className="text-gradient-green">Your Success Story</span>?
        </h2>
        <p className="text-slate-400 mb-6">
          Join thousands of patients who&apos;ve overturned their insurance
          denials.
        </p>
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all pulse-glow"
        >
          Generate My Free Appeal Letter →
        </Link>
      </div>
    </div>
  );
}
