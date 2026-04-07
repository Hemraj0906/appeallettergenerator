import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AppealLetterGenerator.com",
  description:
    "Learn about AppealLetterGenerator.com and our mission to help consumers overturn denied insurance claims with AI-powered appeal letters.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Our Mission
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          We believe no one should be denied life-saving medical care because of
          a bureaucratic error or a corporate algorithm.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Why We Started</h2>
          <div className="space-y-4 text-slate-400">
            <p>
              Every year, millions of insurance claims are denied. Research
              shows that over 50% of these denials could be overturned on
              appeal, yet only 1% of patients actually fight back.
            </p>
            <p>
              The process is intentionally complicated. Insurers send long,
              confusing letters and set strict deadlines, hoping you'll give up.
              We built <strong>AppealLetterGenerator.com</strong> to level the
              playing field.
            </p>
          </div>
        </div>
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/10 glass">
          <div className="text-4xl font-bold text-emerald-400 mb-2">99%</div>
          <p className="text-slate-300">
            of denials go un-appealed by patients.
          </p>
          <div className="h-px bg-white/10 my-6"></div>
          <div className="text-4xl font-bold text-sky-400 mb-2">60 sec</div>
          <p className="text-slate-300">
            is all it takes to generate a professional appeal with our tool.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-12 rounded-3xl border border-indigo-500/20 mb-20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          How It Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-white font-semibold mb-2">Data Extraction</h3>
            <p className="text-sm text-slate-400">
              Our AI scans your denial letter to find the exact legal codes and
              clinical reasons used.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-white font-semibold mb-2">
              Legal Benchmarking
            </h3>
            <p className="text-sm text-slate-400">
              We cross-reference your case with state-specific insurance laws
              and previous success stories.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center text-pink-400 font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-white font-semibold mb-2">Letter Generation</h3>
            <p className="text-sm text-slate-400">
              You receive a customized, 3-page appeal letter ready to be mailed
              or emailed instantly.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Transparent and Free
        </h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          We are supported by advertising and donations. We never sell your
          data, we never charge for appeal letters, and we never store your
          private medical information for more than 24 hours.
        </p>
        <a
          href="mailto:appeallettergenerator@gmail.com"
          className="text-sky-400 hover:text-sky-300 underline font-medium"
        >
          Get in touch with us
        </a>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About AppealLetterGenerator.com",
            description:
              "Learn about our mission to help consumers overturn denied insurance claims with AI-powered appeal letters.",
            mainEntity: {
              "@type": "Organization",
              name: "AppealLetterGenerator.com",
              description:
                "Free AI-powered insurance denial appeal letter generator",
              url: "https://appeallettergenerator.com",
            },
          }),
        }}
      />
    </div>
  );
}
