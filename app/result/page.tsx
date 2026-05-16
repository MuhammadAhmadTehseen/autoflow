"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AutomationOpportunity } from "@/lib/claude";

type WorkflowInfo = {
  name: string;
  deployed: boolean;
  id: string | null;
  url: string | null;
};

type AnalysisResult = {
  opportunities: AutomationOpportunity[];
  summary: string;
  workflow: WorkflowInfo;
};

const loadingSteps = [
  { label: "Reading your business profile...", duration: 1000 },
  { label: "Identifying automation opportunities...", duration: 1500 },
  { label: "Generating n8n workflow...", duration: 2000 },
  { label: "Finalizing your plan...", duration: 800 },
];

function ImpactBadge({ feasibility }: { feasibility: string }) {
  const styles: Record<string, string> = {
    high: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${styles[feasibility] || styles.medium}`}>
      {feasibility} feasibility
    </span>
  );
}

function OpportunityCard({ opp, isTop }: { opp: AutomationOpportunity; isTop: boolean }) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-6 ${isTop ? "border-indigo-200 ring-1 ring-indigo-100" : "border-gray-100"}`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg text-white text-sm font-bold flex items-center justify-center shrink-0 ${isTop ? "bg-indigo-600" : "bg-gray-400"}`}>
            {opp.rank}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{opp.title}</h3>
            <p className="text-xs text-gray-400 mt-0.5">Trigger: {opp.trigger}</p>
          </div>
        </div>
        <ImpactBadge feasibility={opp.feasibility} />
      </div>

      <p className="text-gray-500 text-sm mb-4 leading-relaxed">{opp.description}</p>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          {opp.tools_required.map((tool) => (
            <span key={tool} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium">
              {tool}
            </span>
          ))}
        </div>
        <span className="text-xs text-green-700 font-medium bg-green-50 px-2.5 py-1 rounded-lg">
          ~{opp.estimated_hours_saved_per_week} hrs/week saved
        </span>
      </div>

      {isTop && (
        <div className="mt-4 pt-4 border-t border-indigo-100">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
            Workflow built for this opportunity
          </span>
        </div>
      )}
    </div>
  );
}

export default function ResultPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Load real result from sessionStorage (set by BusinessForm after API call)
    const stored = sessionStorage.getItem("autoflow_result");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
    }

    // Run loading animation
    let accumulated = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    loadingSteps.forEach((step, i) => {
      accumulated += step.duration;
      const t = setTimeout(() => {
        setCurrentStep(i + 1);
        if (i === loadingSteps.length - 1) {
          setTimeout(() => setDone(true), 300);
        }
      }, accumulated);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const totalHours = result?.opportunities.reduce(
    (sum, o) => sum + o.estimated_hours_saved_per_week,
    0
  ) ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight">AutoFlow</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {!done ? (
          /* Loading State */
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-8 animate-pulse">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Building your automation plan...</h1>
            <p className="text-gray-500 mb-12">Claude AI is analyzing your business. This takes a few seconds.</p>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-left max-w-md mx-auto">
              {loadingSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-4 py-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                    {i < currentStep ? (
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : i === currentStep ? (
                      <svg className="animate-spin w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                    )}
                  </div>
                  <span className={`text-sm ${i < currentStep ? "text-gray-400 line-through" : i === currentStep ? "text-gray-900 font-medium" : "text-gray-300"}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Results */
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-3">Your Automation Plan is Ready</h1>
              <p className="text-gray-500 max-w-lg mx-auto">
                {result
                  ? result.summary
                  : "We've identified your top automation opportunities."}
              </p>
            </div>

            {/* Stats bar */}
            {result && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600">{result.opportunities.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Opportunities found</div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">~{totalHours}</div>
                  <div className="text-xs text-gray-500 mt-1">Hours saved / week</div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">1</div>
                  <div className="text-xs text-gray-500 mt-1">Workflow built</div>
                </div>
              </div>
            )}

            {/* Workflow deployment status */}
            {result?.workflow?.deployed && result.workflow.url ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-green-900 text-sm">Live workflow deployed on n8n</p>
                  <p className="text-green-700 text-sm mt-0.5 mb-2">{result.workflow.name}</p>
                  <a
                    href={result.workflow.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 underline underline-offset-2 hover:text-green-900 break-all"
                  >
                    {result.workflow.url}
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-yellow-900 text-sm">Workflow analysis complete</p>
                  <p className="text-yellow-700 text-sm mt-0.5">
                    n8n deployment is pending. Your automation plan is ready below.
                  </p>
                </div>
              </div>
            )}

            {/* Opportunities */}
            <h2 className="text-xl font-bold mb-5">Your Top Automation Opportunities</h2>
            <div className="space-y-4 mb-10">
              {(result?.opportunities ?? []).map((opp) => (
                <OpportunityCard key={opp.rank} opp={opp} isTop={opp.rank === 1} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/form"
                className="flex-1 text-center px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Analyze Another Business
              </Link>
              <Link
                href="/"
                className="flex-1 text-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
