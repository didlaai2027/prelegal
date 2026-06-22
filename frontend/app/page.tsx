"use client";

import { useState } from "react";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import { NdaData, EMPTY_NDA } from "@/types/nda";

export default function Home() {
  const [ndaData, setNdaData] = useState<NdaData>(EMPTY_NDA);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    setDownloadError(null);
    try {
      const { generateNdaPdf } = await import("@/lib/generatePdf");
      generateNdaPdf(ndaData);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setDownloadError("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Glassmorphism header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
            Prelegal
          </span>
          <span className="text-white/20">|</span>
          <span className="text-white/60 text-sm font-medium tracking-wide">Mutual NDA Creator</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10 lg:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Mutual Non-Disclosure Agreement
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Enter the details on the left — the document updates live on the right.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form panel — light card */}
          <div className="rounded-2xl bg-white shadow-2xl shadow-black/30 p-6">
            <NdaForm data={ndaData} onChange={setNdaData} onDownload={handleDownload} />
            {downloadError && (
              <p className="mt-3 text-sm text-red-400">{downloadError}</p>
            )}
          </div>

          {/* Preview panel */}
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-sm font-medium text-white/60 uppercase tracking-wider">
                Document Preview
              </span>
              <button
                onClick={handleDownload}
                className="text-xs text-violet-300 hover:text-violet-200 font-medium transition-colors"
              >
                Download PDF ↓
              </button>
            </div>
            {/* Subtle glow ring around preview */}
            <div className="rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-violet-900/20">
              <NdaPreview data={ndaData} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-5 mt-8">
        <p className="text-center text-xs text-white/30">
          Prelegal — Draft common legal agreements in seconds. Not a substitute for legal advice.
        </p>
      </footer>
    </div>
  );
}
