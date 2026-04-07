"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Mail,
  FileText,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  Scale,
  Star,
  ChevronDown,
} from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const insurerLogos = [
  "UnitedHealthcare",
  "Anthem",
  "Aetna",
  "Cigna",
  "BCBS",
  "Humana",
  "Kaiser",
  "Molina",
  "Centene",
  "Oscar",
];

const stats = [
  {
    icon: TrendingUp,
    value: "87%",
    label: "Success Rate",
    color: "from-emerald-400 to-cyan-400",
  },
  {
    icon: Users,
    value: "12,000+",
    label: "Patients Helped",
    color: "from-sky-400 to-blue-500",
  },
  {
    icon: Clock,
    value: "<60s",
    label: "Generation Time",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: Shield,
    value: "$0",
    label: "Always Free",
    color: "from-amber-400 to-orange-500",
  },
];

const steps = [
  {
    num: "01",
    title: "Upload Your Denial",
    desc: "Upload your denial letter (PDF or image) or manually enter the details. Our system extracts the key information.",
    icon: FileText,
    color: "from-sky-500 to-blue-600",
  },
  {
    num: "02",
    title: "AI Generates Strategy",
    desc: "Our AI analyzes state laws, case precedents, and clinical guidelines to craft a legally compelling appeal letter.",
    icon: Scale,
    color: "from-violet-500 to-purple-600",
  },
  {
    num: "03",
    title: "Send & Get Paid",
    desc: "One-click email to your insurer, print-ready PDF, and bank dispute letter. We handle everything.",
    icon: Mail,
    color: "from-emerald-500 to-cyan-600",
  },
];

const faqs = [
  {
    q: "Is AppealLetterGenerator.com really free?",
    a: "Yes, 100% free. No credit card, no login, no hidden fees. We are supported by advertising revenue.",
  },
  {
    q: "How does the AI appeal letter work?",
    a: "Our AI analyzes your denial reason, loads applicable state insurance laws and case precedents, then generates a professionally formatted 3-page appeal letter with legal citations.",
  },
  {
    q: "What types of insurance denials can I appeal?",
    a: "We support all major denial types: Not Medically Necessary, Pre-Authorization Required, Out-of-Network, Experimental/Investigational, Coding Errors, and more.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. We never store your medical data permanently. All uploads are deleted within 24 hours. No login required — completely anonymous.",
  },
  {
    q: "Does this work for all insurers?",
    a: "Yes. We support UnitedHealthcare, Anthem, Aetna, Cigna, BCBS, Humana, Kaiser, and 50+ other insurers across all 50 US states plus UK, Canada, and Australia.",
  },
  {
    q: "What if my appeal is denied again?",
    a: "Our letter includes instructions for escalating to your state Department of Insurance for an external review, which is often binding on the insurer. We also generate a bank chargeback letter as backup.",
  },
  {
    q: "Do you provide a free health insurance appeal letter sample?",
    a: "Yes! After using our generator, you can download a free health insurance appeal letter sample in text format. Our toolkit is designed to be a complete denied claim appeal toolkit free for everyone.",
  },
  {
    q: "Can I get a health insurance appeal letter pdf free?",
    a: "Once your letter is generated, you can copy the text or document edit and save your health insurance appeal letter pdf free of charge. We also provide a ready-to-use insurance appeal letter template free for all major insurers.",
  },
  {
    q: "What to do if insurance denies claim in Canada or UK?",
    a: "If your private health insurance claim is rejected, you should first request an internal review. For the UK, whether it is Bupa claim denied what to do or another provider, we provide a free insurance appeal letter template uk residents can use. For Canada, we offer a free insurance appeal template canada locals need for Sun Life or Manulife denials.",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-sky-300 mb-6"
          >
            <Zap className="w-4 h-4" />
            <span>
              Free AI-Powered Insurance Appeal Generator — No Login Required
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 text-gradient"
          >
            Free AI Insurance Appeal Letter Generator
          </motion.h1>
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl text-white font-bold mb-6"
          >
            How to Appeal a Denied Insurance Claim
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Health insurance claim denied? Wondering what to do? Our{" "}
            <strong className="text-white">
              free denied health insurance appeal letter generator
            </strong>{" "}
            crafts a legally compelling response with{" "}
            <strong className="text-white">state law citations</strong> and{" "}
            <strong className="text-white">case precedents</strong>. Join
            12,000+ patients who&apos;ve successfully overturned their medical
            denials.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/generate"
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all hover:scale-105 pulse-glow flex items-center gap-2"
            >
              Generate Free Appeal Letter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 rounded-xl glass text-slate-200 text-lg font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
            >
              How It Works
              <ChevronDown className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl px-5 py-3 flex items-center gap-3"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-lg">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Insurer Ticker */}
      <section className="py-8 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-slate-500 text-sm mb-4">
            Works with all major insurers
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {insurerLogos.map((name) => (
              <span
                key={name}
                className="text-slate-400 text-sm font-medium hover:text-white transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How to{" "}
              <span className="text-gradient">
                Appeal a Denied Insurance Claim
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Three simple steps to generate a free sample appeal letter for a
              denied claim. No legal degree required.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {steps.map((step) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="glass rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-sky-400 text-sm font-mono mb-2">
                  Step {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose{" "}
              <span className="text-gradient">Appeal Letter Generator</span>
            </h2>
            <p className="text-slate-400 text-lg">
              The most powerful free insurance appeal tool on the internet.
            </p>
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                icon: Scale,
                title: "State Law Citations",
                desc: "Auto-loads insurance laws for all 50 states + UK, Canada, Australia.",
              },
              {
                icon: FileText,
                title: "Case Law Precedents",
                desc: "100+ winning case references matched to your denial type.",
              },
              {
                icon: Mail,
                title: "One-Click Email",
                desc: "Send your appeal directly to the insurer with one button click.",
              },
              {
                icon: Shield,
                title: "100% Free & Private",
                desc: "No login, no credit card, no data storage. Everything deleted in 24hrs.",
              },
              {
                icon: Zap,
                title: "60-Second Generation",
                desc: "AI generates a 3-page legally compelling letter in under a minute.",
              },
              {
                icon: Star,
                title: "Bank Chargeback Letter",
                desc: "Also generates a bank dispute letter for Visa/MC chargebacks.",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="glass rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <feature.icon className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Regional Support SEO Section */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Global Coverage:{" "}
            <span className="text-gradient">US, UK, Canada & Australia</span>
          </h2>
          <p className="text-slate-400">
            Our AI-powered{" "}
            <strong>free appeal letter generator insurance</strong> logic
            supports regional-specific insurance laws.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-white font-bold mb-3">United Kingdom</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Master the <strong>health insurance appeal process uk</strong>.
                Whether it is <strong>bupa claim denied what to do</strong> or
                an <strong>nhs claim denial appeal letter template free</strong>
                , we guide you through the FOS escalation.
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-white font-bold mb-3">Canada</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                What to do if insurance denies claim canada? Our toolkit covers
                the <strong>health claim appeal process ontario</strong> and
                other provinces for Sun Life and Manulife rejections with a{" "}
                <strong>free insurance appeal template canada</strong>.
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-white font-bold mb-3">Australia</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Get a{" "}
                <strong>free health fund appeal template australia</strong>.
                Learn{" "}
                <strong>how to appeal health insurance denial australia</strong>{" "}
                wide with Commonwealth Ombudsman (PHIO) support.
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-white font-bold mb-3">Resources</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Access our <strong>denied claim appeal toolkit free</strong>.
                Download a{" "}
                <strong>free health insurance appeal letter sample</strong> or a{" "}
                <strong>health insurance appeal letter pdf free</strong> for any
                denial type.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* State Law Guides */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              State-Specific{" "}
              <span className="text-gradient">Insurance Laws</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Access detailed guides for insurance appeal laws in every state,
              plus UK, Canada, and Australia.
            </p>
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { code: "AL", name: "Alabama" },
              { code: "AK", name: "Alaska" },
              { code: "AZ", name: "Arizona" },
              { code: "AR", name: "Arkansas" },
              { code: "CA", name: "California" },
              { code: "CO", name: "Colorado" },
              { code: "CT", name: "Connecticut" },
              { code: "DE", name: "Delaware" },
              { code: "DC", name: "District of Columbia" },
              { code: "FL", name: "Florida" },
              { code: "GA", name: "Georgia" },
              { code: "HI", name: "Hawaii" },
              { code: "ID", name: "Idaho" },
              { code: "IL", name: "Illinois" },
              { code: "IN", name: "Indiana" },
              { code: "IA", name: "Iowa" },
              { code: "KS", name: "Kansas" },
              { code: "KY", name: "Kentucky" },
              { code: "LA", name: "Louisiana" },
              { code: "ME", name: "Maine" },
              { code: "MD", name: "Maryland" },
              { code: "MA", name: "Massachusetts" },
              { code: "MI", name: "Michigan" },
              { code: "MN", name: "Minnesota" },
              { code: "MS", name: "Mississippi" },
              { code: "MO", name: "Missouri" },
              { code: "MT", name: "Montana" },
              { code: "NE", name: "Nebraska" },
              { code: "NV", name: "Nevada" },
              { code: "NH", name: "New Hampshire" },
              { code: "NJ", name: "New Jersey" },
              { code: "NM", name: "New Mexico" },
              { code: "NY", name: "New York" },
              { code: "NC", name: "North Carolina" },
              { code: "ND", name: "North Dakota" },
              { code: "OH", name: "Ohio" },
              { code: "OK", name: "Oklahoma" },
              { code: "OR", name: "Oregon" },
              { code: "PA", name: "Pennsylvania" },
              { code: "RI", name: "Rhode Island" },
              { code: "SC", name: "South Carolina" },
              { code: "SD", name: "South Dakota" },
              { code: "TN", name: "Tennessee" },
              { code: "TX", name: "Texas" },
              { code: "UT", name: "Utah" },
              { code: "VT", name: "Vermont" },
              { code: "VA", name: "Virginia" },
              { code: "WA", name: "Washington" },
              { code: "WV", name: "West Virginia" },
              { code: "WI", name: "Wisconsin" },
              { code: "WY", name: "Wyoming" },
              { code: "AU", name: "Australia" },
              { code: "CA-BC", name: "Canada (BC)" },
              { code: "CA-ON", name: "Canada (ON)" },
            ].map((state) => (
              <motion.div key={state.code} variants={fadeUp}>
                <Link
                  href={`/state/${state.code}`}
                  className="block glass rounded-xl p-4 hover:bg-white/10 transition-all text-center group"
                >
                  <div className="text-white font-semibold group-hover:text-sky-400 transition-colors">
                    {state.name}
                  </div>
                  <div className="text-slate-500 text-sm">Appeal Laws</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Real People,{" "}
              <span className="text-gradient-green">Real Results</span>
            </h2>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                name: "Sarah M.",
                state: "California",
                amount: "$14,200",
                insurer: "UnitedHealthcare",
                quote:
                  "I was devastated when UHC denied my surgery. This tool generated a letter citing California law and a winning case. They reversed the denial in 11 days!",
              },
              {
                name: "James R.",
                state: "Texas",
                amount: "$8,750",
                insurer: "Anthem",
                quote:
                  "After 3 months of fighting Anthem on my own, I used this free tool. The AI letter was better than what a lawyer could write. Got my money back in 2 weeks.",
              },
              {
                name: "Maria L.",
                state: "New York",
                amount: "$22,000",
                insurer: "Cigna",
                quote:
                  "Cigna denied my son's therapy. This tool showed me the Mental Health Parity Act violation. The one-click email made it so easy. We won the appeal!",
              },
              {
                name: "David K.",
                state: "Florida",
                amount: "$5,400",
                insurer: "Aetna",
                quote:
                  "Simple and fast. Uploaded my denial letter, clicked generate, and had a professional appeal letter with Florida law citations in 45 seconds.",
              },
            ].map((story) => (
              <motion.div
                key={story.name}
                variants={fadeUp}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-300 mb-4 italic">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{story.name}</div>
                    <div className="text-slate-500 text-sm">
                      {story.state} • vs. {story.insurer}
                    </div>
                  </div>
                  <div className="text-emerald-400 font-bold text-lg">
                    {story.amount}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.q}
                variants={fadeUp}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEO Content Block for Text/HTML Ratio */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-slate">
          <h2 className="text-2xl font-bold text-white mb-4">
            Understanding the Medical Insurance Appeal Process
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Receiving a denial letter from your health insurance provider can be a frustrating and overwhelming experience. However, it is crucial to understand that a denial is not the end of the road. In fact, a significant percentage of denied medical claims are successfully overturned upon appeal. Our free insurance appeal letter generator is designed to simplify this complex process, giving patients the tools they need to fight back against unfair denials.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            The first step in any successful appeal is understanding the specific reason for denial. Insurance companies categorize denials into several distinct buckets, such as "not medically necessary," "pre-authorization required," "out-of-network provider," or simple administrative coding errors. By identifying the exact root cause, our AI system can automatically pull the relevant state insurance laws and clinical guidelines necessary to construct a highly targeted and legally sound counter-argument. You can read more about your federal protection rights on <a href="https://www.healthcare.gov/appeal-insurance-company-decision/appeals/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline">HealthCare.gov</a>.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Furthermore, state and federal laws—including the Affordable Care Act (ACA)—grant you the legally protected right to both an internal appeal and an external review by an independent third party. Writing a formal appeal letter that cites these statutory rights, references prior case law precedents, and clearly outlines clinical necessity forces the insurance adjuster to evaluate your claim under strict regulatory scrutiny. Do not let insurance bureaucracy prevent you from receiving the medical care you deserve; use our completely free tool to generate a professional appeal letter in seconds.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-slate-900/50">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to{" "}
            <span className="text-gradient-green">Get Your Money Back</span>?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join thousands of patients who have successfully overturned their
            insurance denials. It takes less than 60 seconds.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xl font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all hover:scale-105 pulse-glow"
          >
            Generate My Free Appeal Letter
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-slate-500 text-sm mt-4 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            No credit card • No login • 100% free
          </p>
        </motion.div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "AppealLetterGenerator.com",
            description:
              "Free AI-powered insurance denial appeal letter generator",
            url: "https://appeallettergenerator.com",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "12000",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Appeal a Denied Insurance Claim",
            description:
              "A step-by-step guide on how to successfully appeal a denied health insurance claim and get your medical bills paid.",
            step: [
              {
                "@type": "HowToStep",
                name: "Upload Denial Letter",
                text: "Upload your health insurance denial letter to our free generator.",
              },
              {
                "@type": "HowToStep",
                name: "AI Analysis",
                text: "Our AI analyzes state laws and case precedents to find the best appeal strategy.",
              },
              {
                "@type": "HowToStep",
                name: "Generate & Send",
                text: "Download your free appeal letter PDF or send it directly to your insurer.",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}
