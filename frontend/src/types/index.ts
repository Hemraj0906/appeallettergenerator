// ============================================================
// AppealLetterGenerator.com - Core Type Definitions
// ============================================================

export interface StateLaw {
  code: string;
  name: string;
  country: "US" | "UK" | "CA" | "AU";
  statute: string;
  statuteCitation: string;
  filingDeadlineDays: number;
  externalReviewAvailable: boolean;
  departmentOfInsurance: string;
  departmentPhone: string;
  departmentUrl: string;
  keyProvisions: string[];
  penaltyForNonCompliance: string;
}

export interface CaseLaw {
  id: string;
  caseName: string;
  year: number;
  court: string;
  insurer: string;
  denialReason: string;
  outcome: "won" | "lost" | "settled";
  citation: string;
  keyHolding: string;
  amountDisputed: number;
  amountAwarded: number;
  relevantStatutes: string[];
  tags: string[];
}

export interface Insurer {
  slug: string;
  name: string;
  shortName: string;
  appealEmail: string;
  appealAddress: string;
  appealPhone: string;
  appealFax: string;
  filingDeadlineDays: number;
  website: string;
  tips: string[];
  commonDenialReasons: string[];
  successRate: number;
  statesOperating: string[];
  parentCompany: string;
}

export interface DenialReason {
  slug: string;
  name: string;
  description: string;
  commonCPTCodes: string[];
  amaGuideline: string;
  appealStrategy: string[];
  successRate: number;
  relatedCases: string[];
  relatedStatutes: string[];
}

export interface AppealRequest {
  insurer: string;
  customInsurerName?: string;
  state: string;
  customStateName?: string;
  reason: string;
  customReasonName?: string;
  amount: number;
  policyNumber: string;
  claimNumber: string;
  dateOfService: string;
  dateOfDenial: string;
  procedureDescription: string;
  patientName: string;
  additionalDetails: string;
}

export interface AppealResponse {
  appealLetter: string;
  emailBody: string;
  bankDisputeLetter: string;
  insurerEmail: string;
  insurerName: string;
  stateLaw: StateLaw | null;
  relevantCases: CaseLaw[];
  deadline: string;
  responseDeadline: string;
  confidence: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  publishDate: string;
  updateDate: string;
  author: string;
  readTime: number;
  tags: string[];
  content: string;
  relatedSlugs: string[];
}

export interface UploadResult {
  text: string;
  denialReason: string;
  insurer: string;
  amount: number;
  claimNumber: string;
  dateOfDenial: string;
  confidence: number;
}

export interface AdSlot {
  id: string;
  position: "header" | "in-flow" | "sidebar";
  size: string;
  targetCategory: string;
}
