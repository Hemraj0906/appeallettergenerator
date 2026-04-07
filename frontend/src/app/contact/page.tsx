import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | AppealLetterGenerator.com",
  description:
    "Get in touch with the AppealLetterGenerator.com team for support, feedback, or legal inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
      <p className="text-xl text-slate-300 mb-12 max-w-xl mx-auto">
        Have questions? Need help with the generator? We&apos;re here to support
        you in your fight against insurance denials.
      </p>

      <div className="grid sm:grid-cols-2 gap-8 mb-16">
        <div className="p-8 rounded-2xl bg-slate-800/50 border border-white/10 glass hover:border-sky-500/50 transition-colors">
          <div className="text-3xl mb-4">📧</div>
          <h2 className="text-xl font-bold text-white mb-2">General Support</h2>
          <p className="text-slate-400 text-sm mb-4">
            For help using the tool or general inquiries.
          </p>
          <a
            href="mailto:appeallettergenerator@gmail.com"
            className="text-sky-400 font-bold hover:underline"
          >
            appeallettergenerator@gmail.com
          </a>
        </div>
        <div className="p-8 rounded-2xl bg-slate-800/50 border border-white/10 glass hover:border-purple-500/50 transition-colors">
          <div className="text-3xl mb-4">⚖️</div>
          <h2 className="text-xl font-bold text-white mb-2">Legal/Privacy</h2>
          <p className="text-slate-400 text-sm mb-4">
            For GDPR, data deletion, or legal questions gmail us.
          </p>
          {/* <a
                href="mailto:legal@appeallettergenerator.com"
                className="text-purple-400 font-bold hover:underline"
            >
                legal@appeallettergenerator.com
            </a> */}
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-2xl p-8 border border-white/5 max-w-2xl mx-auto">
        <h3 className="text-white font-semibold mb-4">Response Time</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          We are a small, mission-driven team. While we try to respond to every
          email within <strong>48 hours</strong>, please understand that we
          cannot provide personal medical or legal advice. If you are
          experiencing a medical emergency, please call 911 (or your local
          emergency number) immediately.
        </p>
      </div>

      <div className="mt-16 text-slate-500 text-sm">
        <p>AppealLetterGenerator.com | Mission-Driven AI for the People</p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Us - AppealLetterGenerator.com",
            description:
              "Get in touch with the AppealLetterGenerator.com team for support, feedback, or legal inquiries.",
            mainEntity: {
              "@type": "Organization",
              name: "AppealLetterGenerator.com",
              email: "appeallettergenerator@gmail.com",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "appeallettergenerator@gmail.com",
              },
            },
          }),
        }}
      />
    </div>
  );
}
