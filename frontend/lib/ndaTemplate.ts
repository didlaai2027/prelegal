import { NdaData } from "@/types/nda";

function formatDate(dateStr: string): string {
  if (!dateStr) return "[DATE]";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export interface NdaSection {
  heading?: string;
  body: string;
}

const ALLOWED_DURATIONS = new Set(["1", "2", "3", "4", "5"]);

function sanitize(value: string): string {
  return value.replace(/[\x00-\x1F\x7F]/g, " ").trim();
}

export function buildNdaSections(data: NdaData): NdaSection[] {
  const p1 = sanitize(data.party1Name) || "[PARTY 1 NAME]";
  const p2 = sanitize(data.party2Name) || "[PARTY 2 NAME]";
  const date = formatDate(data.effectiveDate);
  const state = data.governingState || "[STATE]";
  const duration = ALLOWED_DURATIONS.has(data.durationYears) ? data.durationYears : "2";
  const purpose = sanitize(data.purpose) || "[PURPOSE OF DISCLOSURE]";

  return [
    {
      body: `MUTUAL NON-DISCLOSURE AGREEMENT`,
    },
    {
      body: `This Mutual Non-Disclosure Agreement (this "Agreement") is entered into as of ${date}, by and between ${p1} ("Party 1") and ${p2} ("Party 2") (each a "Party," and collectively the "Parties").`,
    },
    {
      heading: "1. PURPOSE",
      body: `The Parties wish to explore a potential business relationship in connection with ${purpose} (the "Purpose"). In connection with the Purpose, each Party may disclose to the other Party certain confidential and proprietary information.`,
    },
    {
      heading: "2. CONFIDENTIAL INFORMATION",
      body: `"Confidential Information" means any information disclosed by either Party to the other Party, either directly or indirectly, in writing, orally, or by inspection of tangible objects, that is designated as "Confidential," "Proprietary," or some similar designation, or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure. Confidential Information does not include information that: (i) is or becomes publicly known through no breach of this Agreement; (ii) was rightfully in the receiving Party's possession before disclosure; (iii) is independently developed by the receiving Party without use of the Confidential Information; or (iv) is required to be disclosed by law or court order.`,
    },
    {
      heading: "3. OBLIGATIONS",
      body: `Each Party agrees to: (i) hold the other Party's Confidential Information in strict confidence using at least the same degree of care it uses to protect its own confidential information, but no less than reasonable care; (ii) not disclose such Confidential Information to any third parties without the prior written consent of the disclosing Party; and (iii) use the Confidential Information solely for the Purpose.`,
    },
    {
      heading: "4. TERM",
      body: `This Agreement shall commence on ${date} and shall remain in effect for ${duration} year${Number(duration) !== 1 ? "s" : ""} from such date, unless earlier terminated by either Party upon thirty (30) days' written notice to the other Party. The confidentiality obligations with respect to Confidential Information disclosed prior to termination shall survive for a period of ${duration} year${Number(duration) !== 1 ? "s" : ""} after termination.`,
    },
    {
      heading: "5. RETURN OF INFORMATION",
      body: `Upon the written request of the disclosing Party, the receiving Party shall promptly return or destroy all Confidential Information in its possession or control, including all copies, extracts, and summaries thereof.`,
    },
    {
      heading: "6. NO LICENSE",
      body: `Nothing in this Agreement grants either Party any rights in or to the other Party's Confidential Information except as expressly set forth herein. All Confidential Information remains the sole property of the disclosing Party.`,
    },
    {
      heading: "7. GOVERNING LAW",
      body: `This Agreement shall be governed by and construed in accordance with the laws of the State of ${state}, without regard to its conflict of law provisions. Any disputes arising under this Agreement shall be resolved in the state or federal courts located in ${state}.`,
    },
    {
      heading: "8. ENTIRE AGREEMENT",
      body: `This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior and contemporaneous agreements, representations, and understandings of the Parties. This Agreement may not be amended except by a written instrument signed by both Parties.`,
    },
    {
      heading: "SIGNATURES",
      body: `IN WITNESS WHEREOF, the Parties have executed this Mutual Non-Disclosure Agreement as of the date first written above.\n\n${p1}                          ${p2}\n\nSignature: ___________________     Signature: ___________________\n\nName: _______________________      Name: _______________________\n\nTitle: ________________________    Title: ________________________\n\nDate: ________________________     Date: ________________________`,
    },
  ];
}
