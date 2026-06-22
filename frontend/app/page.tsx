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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="text-2xl font-bold text-indigo-600">Prelegal</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600 text-sm font-medium">Mutual NDA Creator</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 lg:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mutual Non-Disclosure Agreement</h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter the details on the left. The document updates live on the right.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form panel */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <NdaForm data={ndaData} onChange={setNdaData} onDownload={handleDownload} />
            {downloadError && (
              <p className="mt-3 text-sm text-red-600">{downloadError}</p>
            )}
          </div>

          {/* Preview panel */}
          <div className="lg:sticky lg:top-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Document Preview</span>
              <button
                onClick={handleDownload}
                className="text-xs text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Download PDF &darr;
              </button>
            </div>
            <NdaPreview data={ndaData} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-6 py-4 mt-8">
        <p className="text-center text-xs text-gray-400">
          Prelegal — Draft common legal agreements in seconds. Not a substitute for legal advice.
        </p>
      </footer>
    </div>
  );
}
