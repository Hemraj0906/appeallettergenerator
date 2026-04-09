import { DenialReason } from "@/types";

export const denialReasons: DenialReason[] = [
  {
    slug: "not-medically-necessary",
    name: "Not Medically Necessary",
    description:
      "The insurer determined that the treatment, service, or procedure is not medically necessary for your condition. This is the most common denial reason and is often overturned on appeal.",
    commonCPTCodes: ["99213", "99214", "70553", "27447", "29881", "43239"],
    amaGuideline:
      "AMA CPT Guidelines state that medical necessity is determined by the treating physician based on clinical evidence and patient-specific factors.",
    appealStrategy: [
      "Obtain a detailed letter from your treating physician explaining medical necessity",
      "Include peer-reviewed medical literature supporting the treatment",
      "Reference clinical guidelines (AMA, NCCN, ACR) that support the service",
      "Request peer-to-peer review between your doctor and the insurer medical director",
      "Cite relevant state law requiring individualized medical necessity determinations",
    ],
    successRate: 62,
    relatedCases: ["cl-001", "cl-002", "cl-007", "cl-008"],
    relatedStatutes: ["Cal. Ins. Code § 790.03(h)(5)", "N.Y. Ins. Law § 4914"],
  },
  {
    slug: "pre-authorization",
    name: "Pre-Authorization / Prior Authorization Required",
    description:
      "The insurer denied the claim because prior authorization was not obtained before the service was rendered. However, many situations have exceptions to pre-auth requirements.",
    commonCPTCodes: ["99281", "99282", "99283", "99284", "99285"],
    amaGuideline:
      "AMA Resolution 108 opposes prior authorization requirements that delay necessary care. Emergency services are exempt from prior auth under federal law.",
    appealStrategy: [
      "Verify if the service truly required pre-authorization under your specific plan",
      "Emergency services cannot be denied for lack of pre-auth under ACA § 2719A",
      "Check if your provider submitted pre-auth that was lost or misprocessed",
      "Request retroactive authorization with supporting documentation",
      "Cite prudent layperson standard for emergency situations",
    ],
    successRate: 58,
    relatedCases: ["cl-003", "cl-010"],
    relatedStatutes: ["ACA § 2719A", "42 U.S.C. § 300gg-19a"],
  },
  {
    slug: "out-of-network",
    name: "Out-of-Network Provider",
    description:
      "The claim was denied because the provider was out of the insurer's network. Federal and state surprise billing protections may apply.",
    commonCPTCodes: ["99281", "99282", "99283", "99284", "99285"],
    amaGuideline:
      "Patients should not be held liable for out-of-network charges in emergency situations or when no in-network alternative is reasonably available.",
    appealStrategy: [
      "Cite the No Surprises Act for emergency and ancillary services",
      "Show no in-network specialist was available within reasonable distance",
      "Request network adequacy exception if in-network access is insufficient",
      "For emergency services, cite federal prudent layperson standard",
      "Request gap exception or single-case agreement for specialty care",
    ],
    successRate: 55,
    relatedCases: ["cl-006", "cl-018"],
    relatedStatutes: ["No Surprises Act", "N.Y. Financial Services Law § 603"],
  },
  {
    slug: "experimental",
    name: "Experimental or Investigational",
    description:
      "The insurer classified the treatment as experimental or investigational and therefore not covered. Treatments with FDA approval or inclusion in clinical guidelines are generally not experimental.",
    commonCPTCodes: ["36516", "38241", "77523", "0394T"],
    amaGuideline:
      "AMA policy supports coverage of treatments that have demonstrated efficacy in peer-reviewed literature, FDA-approved indications, and major clinical guidelines.",
    appealStrategy: [
      "Show FDA approval or clearance for the treatment",
      "Reference inclusion in NCCN, ACR, or other major clinical guidelines",
      "Provide peer-reviewed studies supporting efficacy",
      "Show the treatment is widely accepted in the medical community",
      "Cite state laws that restrict what can be classified as experimental",
    ],
    successRate: 45,
    relatedCases: ["cl-004", "cl-013"],
    relatedStatutes: ["215 ILCS 5/154.6", "Ohio Rev. Code § 3922.01"],
  },
  {
    slug: "coding-error",
    name: "Coding or Billing Error",
    description:
      "The claim was denied due to incorrect CPT, ICD-10, or other billing codes. This is a provider-side issue that should not be the patient's financial responsibility.",
    commonCPTCodes: ["99201-99215", "99281-99285"],
    amaGuideline:
      "Patients are not responsible for billing errors made by providers or insurers. Correct coding should be resubmitted.",
    appealStrategy: [
      "Contact your provider billing department to verify correct codes",
      "Request an itemized bill and compare with EOB denial codes",
      "Ask provider to resubmit with corrected CPT/ICD-10 codes",
      "If insurer miscoded, request correction and reprocessing",
      "Document the coding error for your appeal letter",
    ],
    successRate: 72,
    relatedCases: ["cl-005", "cl-016"],
    relatedStatutes: ["Tex. Ins. Code § 4201.359"],
  },
  {
    slug: "not-covered",
    name: "Service Not Covered Under Plan",
    description:
      "The insurer states the service is excluded from your plan benefits. However, essential health benefits under the ACA and state mandated benefits may override plan exclusions.",
    commonCPTCodes: [],
    amaGuideline:
      "ACA requires coverage of 10 essential health benefit categories. State-mandated benefits may provide additional required coverage.",
    appealStrategy: [
      "Verify the exclusion in your actual plan document (SPD)",
      "Check if the service is an ACA Essential Health Benefit",
      "Look for state-mandated benefit laws that may require coverage",
      "If policy language is ambiguous, cite contra proferentem doctrine",
      "Request specific plan provision and page number for the exclusion",
    ],
    successRate: 40,
    relatedCases: ["cl-009", "cl-017"],
    relatedStatutes: ["ACA § 1302(b)", "42 U.S.C. § 18022"],
  },
  {
    slug: "timely-filing",
    name: "Timely Filing Deadline Exceeded",
    description:
      "The insurer denied the claim because it was submitted after the filing deadline. If you can prove timely submission, this denial can be overturned.",
    commonCPTCodes: [],
    amaGuideline:
      "Providers have a duty to submit claims timely. Patients should not be balance-billed for provider filing errors.",
    appealStrategy: [
      "Obtain proof of original submission (tracking number, confirmation)",
      "Show the claim was timely filed but lost or misprocessed by insurer",
      "Check if state prompt-pay laws extend filing deadlines",
      "Request equitable exception if delay was beyond your control",
      "If provider filed late, request provider hold you harmless",
    ],
    successRate: 35,
    relatedCases: ["cl-019"],
    relatedStatutes: ["Ky. Rev. Stat. § 304.17A-600"],
  },
  {
    slug: "duplicate-claim",
    name: "Duplicate Claim",
    description:
      "The insurer flagged the claim as a duplicate of a previously processed claim. Separate services on the same date are NOT duplicates.",
    commonCPTCodes: [],
    amaGuideline:
      "Different services rendered on the same date with different CPT codes are distinct claims, not duplicates.",
    appealStrategy: [
      "Verify with provider that each claim has unique CPT codes",
      "Provide documentation showing distinct services were rendered",
      "Request claim-by-claim comparison from insurer",
      "If truly a processing error, request reprocessing with corrected data",
    ],
    successRate: 68,
    relatedCases: ["cl-016"],
    relatedStatutes: ["Mich. Comp. Laws § 500.2006"],
  },
  {
    slug: "policy-lapse",
    name: "Policy Lapse / Not in Effect",
    description:
      "The insurer claims your auto policy was not active at the time of the incident. Premium payments may have been missed or the policy was cancelled.",
    commonCPTCodes: [],
    amaGuideline:
      "Auto insurance policies must be properly maintained. However, insurers must provide proper notice of cancellation and premium due dates.",
    appealStrategy: [
      "Verify payment history and confirm premiums were paid",
      "Check if insurer provided proper notice of cancellation",
      "Show proof of continuous coverage (receipts, bank statements)",
      "Request reinstatement if lapse was due to insurer error",
      "Cite state insurance laws requiring proper cancellation notice",
    ],
    successRate: 55,
    relatedCases: [],
    relatedStatutes: ["Most states require 10-30 days notice for cancellation"],
  },
  {
    slug: "excluded-driver",
    name: "Excluded Driver",
    description:
      "The driver involved in the accident was not listed on your policy or was specifically excluded from coverage.",
    commonCPTCodes: [],
    amaGuideline:
      "Named insured and listed drivers must be properly documented. However, permissive use exceptions may apply.",
    appealStrategy: [
      "Verify the driver was properly listed on your policy",
      "Check if permissive use clause applies (family members, occasional drivers)",
      "Show the vehicle was being used with permission",
      "Request policy amendment if driver should have been added",
      "Cite state laws regarding permissive use and family member coverage",
    ],
    successRate: 48,
    relatedCases: [],
    relatedStatutes: ["State-specific permissive use laws"],
  },
  {
    slug: "coverage-exclusion",
    name: "Coverage Exclusion / Not Covered",
    description:
      "The type of damage or incident is excluded from your policy coverage (e.g., intentional damage, racing, off-road use).",
    commonCPTCodes: [],
    amaGuideline:
      "Policy exclusions must be clearly stated in the policy. Ambiguous exclusions are interpreted in favor of the insured.",
    appealStrategy: [
      "Review your policy for specific exclusion language",
      "Show the incident does not fall within the exclusion",
      "Request clarification of ambiguous exclusion terms",
      "Cite state laws requiring clear and conspicuous exclusions",
      "If exclusion is invalid, request coverage under other policy sections",
    ],
    successRate: 35,
    relatedCases: [],
    relatedStatutes: ["State unfair claims practices acts"],
  },
  {
    slug: "timely-reporting",
    name: "Failure to Report Timely",
    description:
      "The claim was not reported to the insurer within the required time frame (usually 24-48 hours for accidents).",
    commonCPTCodes: [],
    amaGuideline:
      "Insurers must show prejudice from late reporting. Reasonable delays due to injury or unavailability should be excused.",
    appealStrategy: [
      "Document reasons for any delay in reporting",
      "Show the delay was reasonable given circumstances",
      "Provide evidence insurer was not prejudiced by delay",
      "Cite state laws requiring reasonable reporting periods",
      "Request waiver of late reporting requirement",
    ],
    successRate: 42,
    relatedCases: [],
    relatedStatutes: ["State-specific notice requirements"],
  },
  {
    slug: "disputed-liability",
    name: "Disputed Liability / At-Fault",
    description:
      "The insurer disputes who was at fault for the accident, claiming you or your driver caused the incident.",
    commonCPTCodes: [],
    amaGuideline:
      "Liability should be determined by police report, witness statements, and physical evidence. Insurer conclusions are not binding.",
    appealStrategy: [
      "Provide police report showing fault determination",
      "Include witness statements and accident reconstruction",
      "Show insurer's liability assessment was incorrect",
      "Request independent liability evaluation",
      "Cite state no-fault or comparative negligence laws",
    ],
    successRate: 50,
    relatedCases: [],
    relatedStatutes: ["State no-fault and liability laws"],
  },
];

export function getDenialReason(slug: string): DenialReason | undefined {
  return denialReasons.find((r) => r.slug === slug);
}

export function getAllDenialReasonSlugs(): string[] {
  return denialReasons.map((r) => r.slug);
}
