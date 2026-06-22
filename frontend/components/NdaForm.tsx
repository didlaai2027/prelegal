"use client";

import { NdaData } from "@/types/nda";

interface NdaFormProps {
  data: NdaData;
  onChange: (data: NdaData) => void;
  onDownload: () => void;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

export default function NdaForm({ data, onChange, onDownload }: NdaFormProps) {
  const set = (field: keyof NdaData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => onChange({ ...data, [field]: e.target.value });

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Agreement Details</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the information below to generate your Mutual NDA.
        </p>
      </div>

      <div>
        <label htmlFor="party1Name" className={labelClass}>Party 1 — Full Legal Name</label>
        <input
          id="party1Name"
          type="text"
          className={inputClass}
          placeholder="e.g. Acme Corp. or Jane Smith"
          value={data.party1Name}
          onChange={set("party1Name")}
        />
      </div>

      <div>
        <label htmlFor="party2Name" className={labelClass}>Party 2 — Full Legal Name</label>
        <input
          id="party2Name"
          type="text"
          className={inputClass}
          placeholder="e.g. Beta LLC or John Doe"
          value={data.party2Name}
          onChange={set("party2Name")}
        />
      </div>

      <div>
        <label htmlFor="effectiveDate" className={labelClass}>Effective Date</label>
        <input
          id="effectiveDate"
          type="date"
          className={inputClass}
          value={data.effectiveDate}
          onChange={set("effectiveDate")}
        />
      </div>

      <div>
        <label htmlFor="governingState" className={labelClass}>Governing State</label>
        <select id="governingState" className={inputClass} value={data.governingState} onChange={set("governingState")}>
          <option value="">Select a state…</option>
          {US_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="durationYears" className={labelClass}>Confidentiality Duration (years)</label>
        <select id="durationYears" className={inputClass} value={data.durationYears} onChange={set("durationYears")}>
          {["1", "2", "3", "4", "5"].map((y) => (
            <option key={y} value={y}>{y} year{y !== "1" ? "s" : ""}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="purpose" className={labelClass}>Purpose of Disclosure</label>
        <textarea
          id="purpose"
          className={`${inputClass} resize-none`}
          rows={3}
          placeholder="e.g. evaluating a potential joint venture between the parties"
          value={data.purpose}
          onChange={set("purpose")}
        />
      </div>

      <button
        onClick={onDownload}
        className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 active:bg-indigo-700 transition-colors"
      >
        Download PDF
      </button>
    </div>
  );
}
