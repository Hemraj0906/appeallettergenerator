import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – AppealLetterGenerator.com",
  description:
    "Privacy policy for AppealLetterGenerator.com. We delete all data within 24 hours. No login required. No data sold.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
        <p className="text-slate-400">Last updated: March 28, 2026</p>

        <section>
          <h2 className="text-xl font-bold text-white">1. Overview</h2>
          <p>
            AppealLetterGenerator.com (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and safeguard your
            information when you use our free insurance appeal letter generator.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">
            2. Information We Collect
          </h2>
          <p>
            <strong>No Account Required.</strong> We do not require
            registration, login, or any account creation.
          </p>
          <p>
            <strong>Appeal Form Data:</strong> When you use our generator, we
            temporarily process the information you enter (insurer name, state,
            denial reason, etc.) to generate your appeal letter. This data is
            processed in-memory and is not permanently stored.
          </p>
          <p>
            <strong>Uploaded Documents:</strong> If you upload a denial letter,
            it is processed temporarily for text extraction and deleted within
            24 hours.
          </p>
          <p>
            <strong>Analytics:</strong> We use privacy-respecting analytics to
            understand site usage. No personally identifiable information is
            tracked.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">3. Data Retention</h2>
          <p>
            <strong>24-Hour Deletion:</strong> All uploaded documents and form
            data are automatically deleted within 24 hours of processing. We do
            not maintain any database of user submissions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">4. Data Sharing</h2>
          <p>
            We do not sell, trade, or share your personal information with any
            third parties. Period.
          </p>
          <p>
            If you use the one-click email feature, your appeal letter is sent
            directly to the insurer&apos;s email address via our email service
            provider (Resend). We do not retain copies of sent emails.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">5. Advertising</h2>
          <p>
            We display advertisements through Google AdSense to support our free
            service. Google may use cookies to serve ads based on your prior
            visits. You can opt out of personalized advertising at{" "}
            {/* <a
              href="https://www.google.com/settings/ads"
              className="text-sky-400 hover:text-sky-300"
            >
              Google Ad Settings
            </a> */}
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">6. Security</h2>
          <p>
            All data transmission is encrypted using SSL/TLS (HTTPS). Our
            servers are hosted on Vercel&apos;s secure infrastructure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">7. Disclaimer</h2>
          <p>
            AppealLetterGenerator.com is not a law firm and does not provide
            legal advice. The appeal letters generated are templates and should
            be reviewed before submission. We are not affiliated with any
            insurance company. Consult with a licensed attorney for specific
            legal guidance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">8. Contact</h2>
          <p>
            For privacy inquiries, contact us at:
            appeallettergenerator@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}
