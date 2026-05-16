"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const loadingSteps = [
  { label: "Reading your business profile...", duration: 1800 },
  { label: "Identifying automation opportunities...", duration: 2200 },
  { label: "Generating n8n workflow...", duration: 2500 },
  { label: "Deploying workflow to n8n...", duration: 1500 },
  { label: "Sending you a confirmation email...", duration: 1000 },
];

const mockOpportunities = [
  {
    rank: 1,
    title: "Automated Email Follow-up Sequence",
    impact: "High",
    hours: "~5 hrs/week saved",
    description:
      "Automatically send personalized follow-up emails to leads after they fill out your contact form — no manual intervention needed.",
    nodes: ["Webhook", "Gmail", "Google Sheets"],
  },
  {
    rank: 2,
    title: "Social Media Caption Generator",
    impact: "Medium",
    hours: "~3 hrs/week saved",
    description:
      "Trigger a Claude AI node whenever you add a new product or topic to a Google Sheet — get a ready-to-post caption in seconds.",
    nodes: ["Google Sheets", "Claude AI", "Slack"],
  },
  {
    rank: 3,
    title: "Weekly Performance Report",
    impact: "Medium",
    hours: "~2 hrs/week saved",
    description:
      "Every Monday, automatically pull data from your tools, summarize it with AI, and email a clean report to your team.",
    nodes: ["Schedule", "HTTP Request", "Claude AI", "Gmail"],
  },
];

export default function ResultPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let accumulated = 0;

    loadingSteps.forEach((step, i) => {
      accumulated += step.duration;
      timeout = setTimeout(() => {
        setCurrentStep(i + 1);
        if (i === loadingSteps.length - 1) {
          setTimeout(() => setDone(true), 400);
        }
      }, accumulated);
    });

    return () => clearTimeout(timeout);
  }, []);

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
            <p className="text-gray-500 mb-12">This takes about 10 seconds. Please don&apos;t close this tab.</p>

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
                  <span
                    className={`text-sm ${
                      i < currentStep
                        ? "text-gray-400 line-through"
                        : i === currentStep
                        ? "text-gray-900 font-medium"
                        : "text-gray-300"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Results */
          <div>
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-3">Your Automation Plan is Ready</h1>
              <p className="text-gray-500 max-w-lg mx-auto">
                We&apos;ve identified 3 automation opportunities and deployed your first workflow to n8n.
                Check your email for the workflow link.
              </p>
            </div>

            {/* Email notice */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex gap-4 mb-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-indigo-900 text-sm">Workflow deployed successfully</p>
                <p className="text-indigo-700 text-sm mt-0.5">
                  A confirmation email with your live n8n workflow link has been sent to your inbox.
                </p>
              </div>
            </div>

            {/* Opportunities */}
            <h2 className="text-xl font-bold mb-5">Your Top Automation Opportunities</h2>
            <div className="space-y-4 mb-10">
              {mockOpportunities.map((opp) => (
                <div key={opp.rank} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                        {opp.rank}
                      </div>
                      <h3 className="font-semibold text-gray-900">{opp.title}</h3>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          opp.impact === "High"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {opp.impact} Impact
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{opp.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {opp.nodes.map((node) => (
                        <span key={node} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium">
                          {node}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-green-700 font-medium bg-green-50 px-2.5 py-1 rounded-lg">
                      {opp.hours}
                    </span>
                  </div>
                </div>
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
