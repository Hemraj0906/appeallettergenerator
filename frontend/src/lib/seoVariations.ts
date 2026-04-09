import { Insurer } from "./insurerDB";
import { DenialReason } from "./types";
import { denialReasons } from "./denialReasons";

// Simple deterministic seeded random number generator
function seededRandom(seed: number) {
  let t = seed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function hashString(str: string) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

export function generateSeoContent(insurer: Insurer) {
  const seed = hashString(insurer.slug);
  const rand = () => seededRandom(seed + Math.floor(Math.random() * 10000)); // We use a steady hash to pick components, but wait! Nextjs requires consistency between SSR and hydration, so we must rely purely on seed. 
  
  // A consistent random function based *only* on the seed, mutating a local state
  let currentSeed = seed;
  const consistentRand = () => {
    currentSeed = (currentSeed * 16807) % 2147483647;
    return (currentSeed - 1) / 2147483646;
  };

  const pick = <T>(arr: T[]): T => arr[Math.floor(consistentRand() * arr.length)];
  const pickMulti = <T>(arr: T[], count: number): T[] => {
    const copy = [...arr];
    const result: T[] = [];
    for (let i = 0; i < count && copy.length > 0; i++) {
      const idx = Math.floor(consistentRand() * copy.length);
      result.push(copy.splice(idx, 1)[0]);
    }
    return result;
  };

  // Content blocks
  const introHooks = [
    `If you have recently opened a letter from ${insurer.name} only to find that your essential medical claim has been denied, you are likely feeling a mix of frustration and anxiety. You are not alone.`,
    `Receiving a claim denial from an insurance giant like ${insurer.name} can be incredibly overwhelming. However, a denial is not the end of the road—it is merely the beginning of the negotiation process.`,
    `When ${insurer.name} decides not to cover your medical procedures, it can disrupt your financial stability and your peace of mind. But taking immediate action through a strategic appeal can reverse their decision.`,
    `Navigating the complex bureaucracy of ${insurer.parentCompany} after receiving a claim denial requires patience and strategy. Overturning a ${insurer.shortName} denial is entirely possible if you understand your rights.`
  ];

  const introBodies = [
    `Every year, thousands of patients successfully overturn their ${insurer.shortName} denials. Insurance companies often rely on automated algorithms and generalized review processes that miss the critical nuances of your individual case. By systematically addressing the specific reasons they provided for refusing coverage, you can assert your rights and demand the benefits you pay for.`,
    `While ${insurer.shortName} operates as a massive entity managing millions of claims, the law states they must evaluate your specific medical necessity. The appeals process exists exactly for this reason. By gathering the right evidence, utilizing case law, and submitting a legally sound letter, you dramatically increase your chances of forcing them to pay your claim.`,
    `Many policyholders mistakenly believe that ${insurer.shortName}'s initial "no" is final. In reality, a large percentage of initial adjudications are overturned on appeal. Being an informed patient—and having a meticulous strategy detailing your medical necessity—is the ultimate weapon against large insurance carriers looking to minimize their payouts.`
  ];

  const meanings = [
    `A denial from ${insurer.shortName} simply signifies that the claim did not meet their internal, often highly conservative, criteria for coverage on the first pass. This could be due to a strict interpretation of "medical necessity," an alleged out-of-network provider usage, or a temporary pre-authorization hurdle. It does not mean your requested treatment is wrong or legally un-coverable.`,
    `When ${insurer.shortName} issues a denial, they are indicating a lack of sufficient documentation or a clash with their specific, proprietary clinical policy bulletins. Insurers like ${insurer.name} have robust teams dedicated to cost containment. Your job during the appeal is to introduce undeniable clinical facts that override these initial corporate cost-containment algorithms.`,
    `In practice, a denied claim by ${insurer.shortName} means that the initial automated review or first-level human reviewer found a discrepancy between the billed code and your policy's immediate inclusion list. It is an invitation for you to provide comprehensive evidence—such as letters from your physician and peer-reviewed literature—to compel a favorable secondary review.`
  ];

  const genericMistakes = [
    { title: "Missing the Filing Deadline", desc: `Missing the strict ${insurer.filingDeadlineDays}-day window for submitting your appeal to ${insurer.shortName} acts as a permanent forfeiture of your rights. Always document the exact date and send via certified mail or verified email.` },
    { title: "Using Emotion Over Evidence", desc: `Writing an emotional plea rather than a factual, evidence-based argument is a fatal flaw. Reviewers at ${insurer.parentCompany} only respond to clinical data and policy language, not personal hardship stories.` },
    { title: "Failing to Address the Exact Denial Reason", desc: `If ${insurer.shortName} denied the claim for "not medically necessary", arguing about how long you've been a loyal customer won't help. You must directly attack the specific diagnostic code and policy language they cited.` },
    { title: "Submitting the Exact Same Information", desc: `A common error is just resubmitting the original claim. You must introduce new evidence, such as independent medical literature, an expanded physician letter of necessity, or FDA approval documents.` },
    { title: "Not Requesting a Peer-to-Peer", desc: `Allowing an administrative worker to deny a complex claim without demanding that your treating physician speak directly to the ${insurer.shortName} Medical Director is a missed opportunity for advocacy.` }
  ];

  const ctaVariations = [
    `Instead of spending hours writing this from scratch, our AI uses the exact legal frameworks that force insurers to comply.`,
    `If you want to ensure your letter follows the exact legal structure needed to win, let our system build it in 60 seconds.`,
    `Avoid the guesswork and potential mistakes. Generate a legally compelling, formatted letter tailored to your exact situation.`
  ];

  const selectedMistakes = pickMulti(genericMistakes, 3);
  
  // Grab reasons metadata
  const reasonsData = insurer.commonDenialReasons.map(slug => denialReasons.find(r => r.slug === slug)).filter(Boolean) as DenialReason[];
  
  // Link anchors mapping
  const internalLinks = [
    { text: "learn more about appealing out-of-network bills", url: "/reason/out-of-network" },
    { text: "understanding medical necessity requirements", url: "/reason/not-medically-necessary" },
    { text: "prior authorization denial appeals", url: "/reason/pre-authorization" },
    { text: "experimental treatment coverage", url: "/reason/experimental" },
    { text: "coding and billing errors", url: "/reason/coding-error" }
  ];

  const selectedLinks = pickMulti(internalLinks, 2);

  // Generate a realistic sample letter
  const samplePatient = ["John D.", "Sarah M.", "Michael T.", "Emily R."];
  const sampleTreatment = ["MRI of the Lumbar Spine", "Physical Therapy (12 Sessions)", "Biologic Medication Infusion", "Inpatient Rehabilitation"];
  const selectedPatient = pick(samplePatient);
  const selectedTreatment = pick(sampleTreatment);
  
  const sampleLetter = `
[Your Name]
[Your Address]
[City, State, Zip]
[Your Email]
[Your Phone Number]

Date: [Current Date]

${insurer.name} Appeals Department
${insurer.appealAddress}

RE: Appeal for Denied Claim
Patient Name: ${selectedPatient}
Policy Number: [Your Policy Number]
Claim Number: [Your Claim Number]
Date of Service: [Date]

Dear Appeals Reviewer,

I am writing to formally appeal your decision to deny coverage for ${selectedTreatment}. In the Explanation of Benefits (EOB) dated [Date], ${insurer.shortName} stated that the service was denied due to [Denial Reason]. I fundamentally disagree with this assessment.

As established by the enclosed medical records and the detailed Letter of Medical Necessity from my treating physician, Dr. [Doctor's Last Name], this treatment is standard of care and absolutely critical to preventing further deterioration of my condition. Your own clinical policy guidelines stipulate that coverage is warranted when conservative measures have failed, which my records clearly demonstrate over the last six months.

Furthermore, I am attaching two peer-reviewed clinical studies that support the efficacy of this precise protocol for my diagnosis. I request that a specialized physician with credentials matching my treating provider review this file, as required by ERISA regulations and state insurance laws.

Please overturn this denial immediately and process the claim for payment. Should this appeal be denied, I will not hesitate to escalate this matter to the State Insurance Commissioner and pursue an external independent medical review.

I look forward to your prompt response within the legally mandated timeframe.

Sincerely,

${selectedPatient}
  `.trim();

  // FAQs
  const baseFaqs = [
    { 
      q: `How long do I have to appeal a decision with ${insurer.shortName}?`, 
      a: `Typically, you have ${insurer.filingDeadlineDays} days from the date you received the initial adverse benefit determination letter. However, you should file as quickly as possible. Ensure you send your appeal via certified mail or verifiable fax.`
    },
    { 
      q: `What is the best way to contact the ${insurer.shortName} appeals department?`, 
      a: `The most direct methods are via fax at ${insurer.appealFax} or by mailing your comprehensive packet to ${insurer.appealAddress}. You can also follow up by calling ${insurer.appealPhone}. Always keep a paper trail of every interaction.`
    },
    { 
      q: `Can I appeal if ${insurer.name} says my treatment is "experimental"?`, 
      a: `Absolutely. Many insurers initially flag cutting-edge treatments as experimental to contain costs. You can win this appeal by providing recent peer-reviewed medical studies, documentation of FDA approval, or letters showing it is the accepted standard of care in the broader medical community.`
    },
    { 
      q: `Do I need a lawyer to appeal a ${insurer.shortName} denial?`, 
      a: `No, you do not need a lawyer to begin the internal appeals process. You can use strong, structured templates and evidence provided by your doctor. If you exhaust your internal and external appeals and still face denial on a high-value claim, consulting an ERISA attorney may then be beneficial.`
    },
    { 
      q: `What happens if ${insurer.shortName} ignores my appeal?`, 
      a: `By law, insurance companies must respond to pre-service appeals within 30 days and post-service appeals within 60 days. If ${insurer.shortName} fails to respond within this timeframe, they may be in violation of state laws or federal ERISA laws. You can immediately file a grievance with your State Department of Insurance.`
    }
  ];

  return {
    introduction: pick(introHooks) + " " + pick(introBodies),
    meaning: pick(meanings),
    mistakes: selectedMistakes,
    reasonsData,
    sampleLetter,
    faqs: baseFaqs,
    ctaText: pick(ctaVariations),
    internalLinks: selectedLinks
  };
}
