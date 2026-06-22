"use client";

import { NdaData } from "@/types/nda";
import { buildNdaSections } from "@/lib/ndaTemplate";

interface NdaPreviewProps {
  data: NdaData;
}

export default function NdaPreview({ data }: NdaPreviewProps) {
  const sections = buildNdaSections(data);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 font-serif text-sm leading-relaxed text-gray-800 min-h-[600px]">
      {/* Title */}
      <p className="text-center font-bold text-base tracking-wide mb-6">
        {sections[0].body}
      </p>

      {/* Preamble */}
      <p className="mb-4">{sections[1].body}</p>

      {/* Numbered sections */}
      {sections.slice(2, sections.length - 1).map((section, i) => (
        <div key={i} className="mb-4">
          {section.heading && (
            <p className="font-bold mb-1">{section.heading}</p>
          )}
          <p className="whitespace-pre-wrap">{section.body}</p>
        </div>
      ))}

      {/* Signatures */}
      {(() => {
        const sig = sections[sections.length - 1];
        return (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="font-bold mb-4">{sig.heading}</p>
            <pre className="font-serif text-sm whitespace-pre-wrap">{sig.body}</pre>
          </div>
        );
      })()}
    </div>
  );
}
