import { AppealRequest, AppealResponse } from "@/types";
import { getStateLaw } from "./stateLawDB";
import { findRelevantCases } from "./caseLawDB";
import { getInsurer } from "./insurerDB";
import { getDenialReason } from "./denialReasons";

function generateTemplateAppealLetter(req: AppealRequest): string {
  const stateLaw = getStateLaw(req.state);
  const insurer = getInsurer(req.insurer);
  const reason = getDenialReason(req.reason);
  const cases = findRelevantCases(req.insurer, req.reason);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const deadlineDate = new Date();
  deadlineDate.setDate(deadlineDate.getDate() + 14);
  const deadline = deadlineDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const caseReferences = cases
    .slice(0, 3)
    .map(
      (c) =>
        `In ${c.caseName} (${c.citation}), the court held: "${c.keyHolding}"`,
    )
    .join("\n\n");

  const stateLawRef = stateLaw
    ? `Pursuant to ${stateLaw.statuteCitation}, ${stateLaw.name} law requires insurers to ${stateLaw.keyProvisions[0]?.toLowerCase() || "handle claims in good faith"}. ${stateLaw.keyProvisions.slice(1, 3).join(". ")}.`
    : "Under applicable state insurance law, insurers are required to handle claims in good faith and provide a fair and timely review of all appeals.";

  const reasonStrategy = reason
    ? reason.appealStrategy
        .slice(0, 3)
        .map((s, i) => `${i + 1}. ${s}`)
        .join("\n")
    : "1. Review your denial letter carefully for specific reasons\n2. Gather supporting medical documentation\n3. Submit a timely written appeal";

  return `${today}

${insurer?.name || "Insurance Company"} Appeals Department
${insurer?.appealAddress || "[Insurer Address]"}

RE: FORMAL APPEAL OF DENIED CLAIM
Policy Number: ${req.policyNumber || "[Policy Number]"}
Claim Number: ${req.claimNumber || "[Claim Number]"}
Date of Service: ${req.dateOfService || "[Date of Service]"}
Date of Denial: ${req.dateOfDenial || "[Date of Denial]"}
Patient: ${req.patientName || "[Patient Name]"}
Amount in Dispute: $${req.amount?.toLocaleString() || "[Amount]"}

Dear Appeals Committee,

I am writing to formally appeal the denial of my insurance claim for ${req.procedureDescription || "[medical service/procedure]"}, which was denied on ${req.dateOfDenial || "[date]"} for the stated reason of "${reason?.name || "the reason cited in the denial letter"}."

I respectfully request that you reverse this denial and authorize full payment of $${req.amount?.toLocaleString() || "[amount]"} for the following reasons:

LEGAL BASIS FOR APPEAL:

${stateLawRef}

${caseReferences ? `SUPPORTING CASE LAW:\n\n${caseReferences}\n\n` : ""}CLINICAL AND FACTUAL BASIS:

The denial of coverage for ${req.procedureDescription || "the prescribed treatment"} is not supported by the clinical evidence. My treating physician, who has directly examined me and reviewed my complete medical history, has determined that this treatment is medically necessary based on the following:

${req.additionalDetails || "- Clinical evidence and medical records support the necessity of this treatment\n- Conservative treatment alternatives have been exhausted or are not appropriate\n- The prescribed treatment follows established clinical guidelines and standards of care"}

APPEAL STRATEGY BASED ON DENIAL TYPE (${reason?.name || "General"}):

${reasonStrategy}

DEMAND:

I formally demand that ${insurer?.name || "your company"}:

1. Reverse the denial of Claim #${req.claimNumber || "[Claim Number]"} immediately.
2. Process payment of $${req.amount?.toLocaleString() || "[Amount]"} within 14 business days.
3. Provide a written explanation if this appeal is denied, including the specific clinical criteria and policy provisions upon which the denial is based.

WARNING — REGULATORY ACTION:

Please be advised that if this appeal is not resolved satisfactorily within 14 business days (by ${deadline}), I intend to:

${stateLaw ? `1. File a formal complaint with the ${stateLaw.departmentOfInsurance} (${stateLaw.departmentPhone}).` : "1. File a formal complaint with my state Department of Insurance."}
2. Request an Independent External Review as permitted by ${stateLaw?.statuteCitation || "applicable state law"}.
3. Initiate a chargeback/dispute with my bank for all out-of-pocket payments related to this denied claim.
${stateLaw?.externalReviewAvailable ? `4. Exercise my right to external review under ${stateLaw.statuteCitation}.` : "4. Pursue all additional legal remedies available to me."}

I expect a written response within 14 business days of receipt of this appeal.

Sincerely,

${req.patientName || "[YOUR NAME]"}
[YOUR ADDRESS]
[YOUR PHONE NUMBER]
[YOUR EMAIL]

Enclosures:
- Copy of Denial Letter (dated ${req.dateOfDenial || "[date]"})
- Medical Records and Clinical Documentation
- Treating Physician Letter of Medical Necessity
- Relevant Clinical Guidelines and Literature

cc: ${stateLaw?.departmentOfInsurance || "State Department of Insurance"}

---
DISCLAIMER: This letter was generated by AppealLetterGenerator.com as a template to assist with your insurance appeal. This is not legal advice. Consult with a licensed attorney or insurance professional for specific legal guidance regarding your situation.`;
}

function generateEmailBody(req: AppealRequest): string {
  const insurer = getInsurer(req.insurer);
  const reason = getDenialReason(req.reason);
  return `Subject: FORMAL APPEAL - Claim #${req.claimNumber || "[Claim Number]"} - Policy #${req.policyNumber || "[Policy Number]"}

Dear ${insurer?.name || "Insurance Company"} Appeals Department,

I am formally appealing the denial of my claim #${req.claimNumber || "[Claim Number]"} dated ${req.dateOfDenial || "[Date]"} for ${req.procedureDescription || "[medical service]"}, denied as "${reason?.name || "[reason]"}."

Amount in dispute: $${req.amount?.toLocaleString() || "[Amount]"}

This denial is not supported by clinical evidence or applicable law. My treating physician has confirmed the medical necessity of this treatment. I demand reversal within 14 business days.

If unresolved, I will file complaints with my state Department of Insurance and request an Independent External Review.

Please see the attached formal appeal letter for complete legal citations and supporting documentation.

${req.patientName || "[YOUR NAME]"}
Policy #${req.policyNumber || "[Policy Number]"}`;
}

function generateBankDisputeLetter(req: AppealRequest): string {
  const insurer = getInsurer(req.insurer);
  return `[YOUR NAME]
[YOUR ADDRESS]
[DATE]

Dispute Resolution Department
[YOUR BANK NAME]
[BANK ADDRESS]

RE: CHARGEBACK REQUEST - Insurance Claim Dispute
Transaction Amount: $${req.amount?.toLocaleString() || "[Amount]"}
Transaction Date: ${req.dateOfService || "[Date]"}
Merchant: ${insurer?.name || "[Insurance Company]"}

Dear Dispute Resolution Team,

I am requesting a chargeback for the above transaction under Visa/Mastercard Reason Code 13.1 (Merchandise/Services Not Received) or Reason Code 13.3 (Not as Described).

FACTS:
1. I paid $${req.amount?.toLocaleString() || "[Amount]"} for ${req.procedureDescription || "medical services"} that should have been covered by my insurance policy #${req.policyNumber || "[Number]"} with ${insurer?.name || "[Insurer]"}.
2. My insurance claim #${req.claimNumber || "[Number]"} was denied on ${req.dateOfDenial || "[Date]"}.
3. I have formally appealed this denial (appeal attached).
4. The denial is not supported by clinical evidence or applicable insurance law.

I am disputing this charge because I should not have been required to pay out-of-pocket for a service that is covered under my insurance plan.

Enclosed: Insurance denial letter, formal appeal letter, medical records.

Sincerely,
${req.patientName || "[YOUR NAME]"}`;
}

export async function generateAppeal(
  req: AppealRequest,
): Promise<AppealResponse> {
  const stateLaw = getStateLaw(req.state) || null;
  const insurer = getInsurer(req.insurer);
  const cases = findRelevantCases(req.insurer, req.reason);
  const deadlineDate = new Date();
  deadlineDate.setDate(
    deadlineDate.getDate() + (stateLaw?.filingDeadlineDays || 180),
  );

  // Try OpenAI if key available, otherwise use template
  const useAI = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "";
  let appealLetter: string;

  if (useAI) {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You are an expert insurance appeal letter writer. Generate a formal, legally compelling 3-page appeal letter. Include specific state law citations, case law references, and clinical arguments. State law: ${JSON.stringify(stateLaw)}. Relevant cases: ${JSON.stringify(cases.slice(0, 3))}. Be firm but professional. Include a 14-day demand deadline and regulatory action warning.`,
              },
              {
                role: "user",
                content: `Generate a formal appeal letter for: Insurer: ${insurer?.name}, State: ${stateLaw?.name}, Denial Reason: ${req.reason}, Amount: $${req.amount}, Policy: ${req.policyNumber}, Claim: ${req.claimNumber}, Service: ${req.procedureDescription}, Patient: ${req.patientName}, Date of denial: ${req.dateOfDenial}, Additional details: ${req.additionalDetails}`,
              },
            ],
            max_tokens: 3000,
            temperature: 0.7,
          }),
        },
      );
      const data = await response.json();
      appealLetter =
        data.choices?.[0]?.message?.content ||
        generateTemplateAppealLetter(req);
    } catch {
      appealLetter = generateTemplateAppealLetter(req);
    }
  } else {
    appealLetter = generateTemplateAppealLetter(req);
  }

  return {
    appealLetter,
    emailBody: generateEmailBody(req),
    bankDisputeLetter: generateBankDisputeLetter(req),
    insurerEmail: insurer?.appealEmail || "",
    insurerName: insurer?.name || "",
    stateLaw,
    relevantCases: cases,
    deadline: deadlineDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    confidence:
      cases.length > 0 && stateLaw
        ? 85
        : cases.length > 0
          ? 70
          : stateLaw
            ? 65
            : 50,
  };
}
