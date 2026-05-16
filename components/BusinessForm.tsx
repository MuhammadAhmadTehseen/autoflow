"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 5;

const industries = [
  "E-commerce", "Consulting", "Marketing Agency", "SaaS / Tech",
  "Healthcare", "Education", "Real Estate", "Finance", "Other",
];

const toolOptions = [
  "Gmail", "Google Sheets", "Google Drive", "Notion", "Slack",
  "WhatsApp", "Trello", "Airtable", "HubSpot", "Shopify",
  "WordPress", "LinkedIn", "Instagram", "Canva", "Zapier",
];

const manualTaskOptions = [
  "Writing social media captions",
  "Replying to customer inquiries",
  "Creating reports or summaries",
  "Sending follow-up emails",
  "Scheduling meetings",
  "Updating spreadsheets",
  "SEO content writing",
  "Lead research & outreach",
  "Invoicing & payments",
  "Data entry",
];

type FormData = {
  name: string;
  email: string;
  businessName: string;
  businessDescription: string;
  industry: string;
  businessModel: string;
  teamSize: string;
  tools: string[];
  manualTasks: string[];
  otherManualTasks: string;
  hoursPerWeek: string;
  biggestFrustration: string;
};

const initialData: FormData = {
  name: "",
  email: "",
  businessName: "",
  businessDescription: "",
  industry: "",
  businessModel: "",
  teamSize: "",
  tools: [],
  manualTasks: [],
  otherManualTasks: "",
  hoursPerWeek: "",
  biggestFrustration: "",
};

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              i + 1 < current
                ? "bg-indigo-600 text-white"
                : i + 1 === current
                ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {i + 1 < current ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < total - 1 && (
            <div className={`h-0.5 w-8 sm:w-16 rounded ${i + 1 < current ? "bg-indigo-600" : "bg-gray-100"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function ToggleChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
        selected
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
      }`}
    >
      {label}
    </button>
  );
}

export default function BusinessForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const update = (field: keyof FormData, value: string | string[]) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const toggleArray = (field: "tools" | "manualTasks", value: string) => {
    setData((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Analysis failed");
      }

      const result = await response.json();
      sessionStorage.setItem("autoflow_result", JSON.stringify(result));
      router.push("/result");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const stepTitles = [
    "Basic Info",
    "About Your Business",
    "Tools & Team",
    "Pain Points",
    "Review & Submit",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator current={step} total={TOTAL_STEPS} />

      <div className="mb-2 text-sm font-medium text-indigo-600">
        Step {step} of {TOTAL_STEPS}
      </div>
      <h2 className="text-2xl font-bold mb-6">{stepTitles[step - 1]}</h2>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Your name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Ahmad Tehseen"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Business name</label>
            <input
              type="text"
              value={data.businessName}
              onChange={(e) => update("businessName", e.target.value)}
              placeholder="Acme Inc."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Step 2: Business Overview */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              What does your business do?
            </label>
            <textarea
              value={data.businessDescription}
              onChange={(e) => update("businessDescription", e.target.value)}
              placeholder="We help small businesses grow their social media presence by creating and scheduling content..."
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Industry</label>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <ToggleChip
                  key={ind}
                  label={ind}
                  selected={data.industry === ind}
                  onClick={() => update("industry", ind)}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Business model</label>
            <div className="flex flex-wrap gap-2">
              {["B2B", "B2C", "Both"].map((model) => (
                <ToggleChip
                  key={model}
                  label={model}
                  selected={data.businessModel === model}
                  onClick={() => update("businessModel", model)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Tools & Team */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Team size</label>
            <div className="flex flex-wrap gap-2">
              {["Just me", "2–5", "6–15", "16–50", "50+"].map((size) => (
                <ToggleChip
                  key={size}
                  label={size}
                  selected={data.teamSize === size}
                  onClick={() => update("teamSize", size)}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tools your team currently uses{" "}
              <span className="text-gray-400 font-normal">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {toolOptions.map((tool) => (
                <ToggleChip
                  key={tool}
                  label={tool}
                  selected={data.tools.includes(tool)}
                  onClick={() => toggleArray("tools", tool)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Pain Points */}
      {step === 4 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              What tasks do you currently do manually?{" "}
              <span className="text-gray-400 font-normal">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {manualTaskOptions.map((task) => (
                <ToggleChip
                  key={task}
                  label={task}
                  selected={data.manualTasks.includes(task)}
                  onClick={() => toggleArray("manualTasks", task)}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Anything else? <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={data.otherManualTasks}
              onChange={(e) => update("otherManualTasks", e.target.value)}
              placeholder="e.g. manually tracking orders in a spreadsheet..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Hours per week spent on manual tasks
            </label>
            <div className="flex flex-wrap gap-2">
              {["Less than 2", "2–5 hrs", "5–10 hrs", "10–20 hrs", "20+ hrs"].map((h) => (
                <ToggleChip
                  key={h}
                  label={h}
                  selected={data.hoursPerWeek === h}
                  onClick={() => update("hoursPerWeek", h)}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              What is your biggest operational frustration?
            </label>
            <textarea
              value={data.biggestFrustration}
              onChange={(e) => update("biggestFrustration", e.target.value)}
              placeholder="We spend hours every week writing the same types of emails..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div className="space-y-4">
          <p className="text-gray-500 text-sm mb-6">
            Review your information before we analyze and build your automation plan.
          </p>
          {[
            { label: "Name", value: data.name },
            { label: "Email", value: data.email },
            { label: "Business", value: data.businessName },
            { label: "Industry", value: data.industry },
            { label: "Model", value: data.businessModel },
            { label: "Team size", value: data.teamSize },
            { label: "Tools", value: data.tools.join(", ") || "—" },
            {
              label: "Manual tasks",
              value:
                [...data.manualTasks, data.otherManualTasks].filter(Boolean).join(", ") || "—",
            },
            { label: "Hours/week", value: data.hoursPerWeek },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-500 w-32 shrink-0">{label}</span>
              <span className="text-sm text-gray-900">{value || "—"}</span>
            </div>
          ))}
          {data.biggestFrustration && (
            <div className="flex gap-4 py-3">
              <span className="text-sm font-medium text-gray-500 w-32 shrink-0">Frustration</span>
              <span className="text-sm text-gray-900">{data.biggestFrustration}</span>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-10">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={next}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors"
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Analyzing...
              </>
            ) : (
              "Build My Automation Plan →"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
