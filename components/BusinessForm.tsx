"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 6;

const industries = [
  "E-commerce", "Consulting", "Marketing Agency", "SaaS / Tech",
  "Healthcare", "Education", "Real Estate", "Finance",
  "Legal", "Logistics & Supply Chain", "Recruitment / HR",
  "Media & Publishing", "Non-profit", "Restaurant & Food",
  "Construction", "Manufacturing", "Travel & Hospitality", "Other",
];

const revenueModels = [
  "Subscription / Retainer", "One-time / Project-based",
  "Hourly / Daily rate", "Commission / Revenue share",
  "Product sales", "Freemium", "Mixed",
];

const toolOptions = [
  // Communication
  "Gmail", "Outlook", "Slack", "WhatsApp", "Telegram", "Discord", "Zoom", "Google Meet",
  // Docs & Storage
  "Google Drive", "Google Docs", "Google Sheets", "Notion", "OneDrive", "Dropbox", "Airtable",
  // CRM & Sales
  "HubSpot", "Salesforce", "Pipedrive", "Close CRM", "Zoho CRM",
  // Project Management
  "Trello", "Asana", "ClickUp", "Monday.com", "Jira", "Basecamp",
  // Marketing
  "Mailchimp", "ActiveCampaign", "ConvertKit", "LinkedIn", "Instagram", "Facebook Ads", "Google Ads",
  // E-commerce & Payments
  "Shopify", "WooCommerce", "Stripe", "PayPal", "QuickBooks", "Xero",
  // Design & Content
  "Canva", "Figma", "WordPress", "Webflow",
  // Research & Data
  "Google Analytics", "Semrush", "Typeform", "Calendly", "Zapier",
];

const manualTaskOptions = [
  // Content & Writing
  "Writing social media captions",
  "Writing blog posts or articles",
  "Writing proposals or quotes",
  "Translating or summarizing documents",
  "SEO content writing",
  // Customer & Sales
  "Replying to customer inquiries",
  "Sending follow-up emails",
  "Onboarding new clients",
  "Managing customer feedback",
  "Lead research & outreach",
  // Operations
  "Creating reports or summaries",
  "Scheduling meetings",
  "Updating spreadsheets",
  "Data entry",
  "Invoicing & payments",
  "Tracking KPIs and metrics",
  // Research
  "Researching competitors",
  "Monitoring news & trends",
  "Compiling market research",
  "Scraping data from websites",
];

const automationGoals = [
  "Save time on repetitive work",
  "Reduce human errors",
  "Scale without hiring more staff",
  "Cut operational costs",
  "Improve customer experience",
  "Get better data & reporting",
  "Respond faster to clients/leads",
];

type FormData = {
  name: string;
  email: string;
  businessName: string;
  website: string;
  businessDescription: string;
  industry: string;
  businessModel: string;
  revenueModel: string;
  targetCustomers: string;
  teamSize: string;
  tools: string[];
  otherTools: string;
  manualTasks: string[];
  otherManualTasks: string;
  hoursPerWeek: string;
  biggestFrustration: string;
  automationGoals: string[];
  specificWish: string;
  additionalContext: string;
};

const initialData: FormData = {
  name: "",
  email: "",
  businessName: "",
  website: "",
  businessDescription: "",
  industry: "",
  businessModel: "",
  revenueModel: "",
  targetCustomers: "",
  teamSize: "",
  tools: [],
  otherTools: "",
  manualTasks: [],
  otherManualTasks: "",
  hoursPerWeek: "",
  biggestFrustration: "",
  automationGoals: [],
  specificWish: "",
  additionalContext: "",
};

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8 flex-wrap">
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
            <div className={`h-0.5 w-6 sm:w-12 rounded ${i + 1 < current ? "bg-indigo-600" : "bg-gray-100"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function ToggleChip({
  label, selected, onClick,
}: {
  label: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
        selected
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
      }`}
    >
      {label}
    </button>
  );
}

function inputClass() {
  return "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
}

function textareaClass() {
  return `${inputClass()} resize-none`;
}

function Label({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}
      {optional && <span className="text-gray-400 font-normal ml-1">(optional)</span>}
    </label>
  );
}

export default function BusinessForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const update = (field: keyof FormData, value: string | string[]) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const toggleArray = (field: "tools" | "manualTasks" | "automationGoals", value: string) => {
    setData((prev) => {
      const arr = prev[field] as string[];
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
    "Goals & Preferences",
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
            <Label>Your name</Label>
            <input type="text" value={data.name} onChange={(e) => update("name", e.target.value)}
              placeholder="Ahmad Tehseen" className={inputClass()} />
          </div>
          <div>
            <Label>Email address</Label>
            <input type="email" value={data.email} onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com" className={inputClass()} />
          </div>
          <div>
            <Label>Business name</Label>
            <input type="text" value={data.businessName} onChange={(e) => update("businessName", e.target.value)}
              placeholder="Acme Inc." className={inputClass()} />
          </div>
          <div>
            <Label optional>Website URL</Label>
            <input type="url" value={data.website} onChange={(e) => update("website", e.target.value)}
              placeholder="https://yourwebsite.com" className={inputClass()} />
          </div>
        </div>
      )}

      {/* Step 2: Business Overview */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <Label>What does your business do?</Label>
            <textarea value={data.businessDescription} onChange={(e) => update("businessDescription", e.target.value)}
              placeholder="Describe your business, what you sell or offer, how you deliver value to customers, and how you currently operate day-to-day..."
              rows={5} className={textareaClass()} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Industry</label>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <ToggleChip key={ind} label={ind} selected={data.industry === ind} onClick={() => update("industry", ind)} />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Business model</label>
            <div className="flex flex-wrap gap-2">
              {["B2B", "B2C", "B2B2C", "Marketplace", "D2C"].map((model) => (
                <ToggleChip key={model} label={model} selected={data.businessModel === model} onClick={() => update("businessModel", model)} />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Revenue model</label>
            <div className="flex flex-wrap gap-2">
              {revenueModels.map((r) => (
                <ToggleChip key={r} label={r} selected={data.revenueModel === r} onClick={() => update("revenueModel", r)} />
              ))}
            </div>
          </div>
          <div>
            <Label optional>Who are your target customers?</Label>
            <input type="text" value={data.targetCustomers} onChange={(e) => update("targetCustomers", e.target.value)}
              placeholder="e.g. Small business owners in Pakistan, SaaS founders, dental clinics..."
              className={inputClass()} />
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
                <ToggleChip key={size} label={size} selected={data.teamSize === size} onClick={() => update("teamSize", size)} />
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
                <ToggleChip key={tool} label={tool} selected={data.tools.includes(tool)} onClick={() => toggleArray("tools", tool)} />
              ))}
            </div>
          </div>
          <div>
            <Label optional>Any other tools not listed above?</Label>
            <input type="text" value={data.otherTools} onChange={(e) => update("otherTools", e.target.value)}
              placeholder="e.g. Custom CRM, internal dashboards, industry-specific software..."
              className={inputClass()} />
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
                <ToggleChip key={task} label={task} selected={data.manualTasks.includes(task)} onClick={() => toggleArray("manualTasks", task)} />
              ))}
            </div>
          </div>
          <div>
            <Label optional>Describe any other manual tasks in detail</Label>
            <textarea value={data.otherManualTasks} onChange={(e) => update("otherManualTasks", e.target.value)}
              placeholder="e.g. Every Monday I manually pull data from 3 sources, paste into a spreadsheet, write a summary, and email it to 5 people. Takes 3 hours..."
              rows={3} className={textareaClass()} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Hours per week spent on manual tasks
            </label>
            <div className="flex flex-wrap gap-2">
              {["Less than 2", "2–5 hrs", "5–10 hrs", "10–20 hrs", "20+ hrs"].map((h) => (
                <ToggleChip key={h} label={h} selected={data.hoursPerWeek === h} onClick={() => update("hoursPerWeek", h)} />
              ))}
            </div>
          </div>
          <div>
            <Label>What is your biggest operational frustration?</Label>
            <textarea value={data.biggestFrustration} onChange={(e) => update("biggestFrustration", e.target.value)}
              placeholder="Describe the most painful, time-consuming, or error-prone part of your workflow. Be specific — the more detail, the better the automation plan..."
              rows={4} className={textareaClass()} />
          </div>
        </div>
      )}

      {/* Step 5: Goals & Preferences */}
      {step === 5 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              What are your goals for automation?{" "}
              <span className="text-gray-400 font-normal">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {automationGoals.map((goal) => (
                <ToggleChip key={goal} label={goal} selected={data.automationGoals.includes(goal)} onClick={() => toggleArray("automationGoals", goal)} />
              ))}
            </div>
          </div>
          <div>
            <Label optional>Is there a specific workflow you want automated?</Label>
            <textarea value={data.specificWish} onChange={(e) => update("specificWish", e.target.value)}
              placeholder="e.g. I want to automatically pull competitor pricing from their websites every week and get a summary in my Slack channel. Or: when a lead fills my Typeform, add to HubSpot and send a follow-up email..."
              rows={4} className={textareaClass()} />
          </div>
          <div>
            <Label optional>Anything else Claude should know?</Label>
            <textarea value={data.additionalContext} onChange={(e) => update("additionalContext", e.target.value)}
              placeholder="Budget constraints, technical limitations, past automation attempts, preferred tools, specific integrations you need, compliance requirements..."
              rows={3} className={textareaClass()} />
          </div>
        </div>
      )}

      {/* Step 6: Review */}
      {step === 6 && (
        <div className="space-y-1">
          <p className="text-gray-500 text-sm mb-6">
            Review your information before we analyze and build your automation plan.
          </p>
          {[
            { label: "Name", value: data.name },
            { label: "Email", value: data.email },
            { label: "Business", value: data.businessName },
            { label: "Website", value: data.website },
            { label: "Industry", value: data.industry },
            { label: "Model", value: [data.businessModel, data.revenueModel].filter(Boolean).join(" · ") },
            { label: "Target customers", value: data.targetCustomers },
            { label: "Team size", value: data.teamSize },
            { label: "Tools", value: [...data.tools, data.otherTools].filter(Boolean).join(", ") || "—" },
            {
              label: "Manual tasks",
              value: [...data.manualTasks, data.otherManualTasks].filter(Boolean).join(", ") || "—",
            },
            { label: "Hours/week", value: data.hoursPerWeek },
            { label: "Goals", value: data.automationGoals.join(", ") || "—" },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-500 w-36 shrink-0">{label}</span>
              <span className="text-sm text-gray-900">{value || "—"}</span>
            </div>
          ))}
          {data.biggestFrustration && (
            <div className="flex gap-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-500 w-36 shrink-0">Frustration</span>
              <span className="text-sm text-gray-900">{data.biggestFrustration}</span>
            </div>
          )}
          {data.specificWish && (
            <div className="flex gap-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-500 w-36 shrink-0">Specific wish</span>
              <span className="text-sm text-gray-900">{data.specificWish}</span>
            </div>
          )}
          {data.additionalContext && (
            <div className="flex gap-4 py-3">
              <span className="text-sm font-medium text-gray-500 w-36 shrink-0">Extra context</span>
              <span className="text-sm text-gray-900">{data.additionalContext}</span>
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
