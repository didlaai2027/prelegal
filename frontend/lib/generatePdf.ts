import { jsPDF } from "jspdf";
import { NdaData } from "@/types/nda";
import { buildNdaSections } from "./ndaTemplate";

export function generateNdaPdf(data: NdaData): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 20;
  const contentWidth = pageWidth - marginX * 2;
  let y = 20;

  const lineHeightFor = (fontSize: number) => fontSize * 0.352778 * 1.4;

  const addWrappedText = (
    text: string,
    fontSize: number,
    fontStyle: "normal" | "bold",
    spaceBefore = 0,
    spaceAfter = 4
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle);
    const lines = doc.splitTextToSize(text, contentWidth) as string[];
    const lineHeight = lineHeightFor(fontSize);
    y += spaceBefore;
    for (const line of lines) {
      if (y + lineHeight > pageHeight - 20) {
        doc.addPage();
        y = 20;
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", fontStyle);
      }
      doc.text(line, marginX, y);
      y += lineHeight;
    }
    y += spaceAfter;
  };

  const sections = buildNdaSections(data);

  // Title
  addWrappedText(sections[0].body, 14, "bold", 0, 8);

  // Preamble
  addWrappedText(sections[1].body, 10, "normal", 0, 6);

  // Numbered sections
  for (let i = 2; i < sections.length - 1; i++) {
    const section = sections[i];
    if (section.heading) {
      addWrappedText(section.heading, 10, "bold", 4, 2);
    }
    addWrappedText(section.body, 10, "normal", 0, 4);
  }

  // Signatures section
  const sigSection = sections[sections.length - 1];
  if (sigSection.heading) {
    addWrappedText(sigSection.heading, 10, "bold", 8, 4);
  }
  const lineHeight10 = lineHeightFor(10);
  const sigLines = sigSection.body.split("\n");
  for (const line of sigLines) {
    if (y + lineHeight10 > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(line, marginX, y);
    y += lineHeight10;
  }

  const p1 = data.party1Name || "mutual-nda";
  const filename = `mutual-nda-${p1.replace(/\s+/g, "-").toLowerCase()}.pdf`;
  doc.save(filename);
}
