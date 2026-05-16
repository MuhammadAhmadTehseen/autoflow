import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Describe Your Business",
    description:
      "Tell us what you do, your team size, tools you use, and where you spend the most time manually.",
  },
  {
    number: "02",
    title: "AI Identifies Gaps",
    description:
      "Claude analyzes your responses and pinpoints your top automation opportunities — ranked by impact.",
  },
  {
    number: "03",
    title: "Live Workflow Deployed",
    description:
      "A real n8n workflow is generated and published automatically. You get the link via email within minutes.",
  },
];

const useCases = [
  { icon: "✍️", label: "Marketing Captions" },
  { icon: "📊", label: "SEO Pipelines" },
  { icon: "📧", label: "Email Follow-ups" },
  { icon: "📅", label: "Scheduling & CRM" },
  { icon: "📄", label: "Report Generation" },
  { icon: "🔔", label: "Lead Notifications" },
  { icon: "📁", label: "File Organization" },
  { icon: "💬", label: "Customer Support" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight">AutoFlow</span>
          </div>
          <Link
            href="/form"
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Analyze My Business
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Powered by Claude AI + n8n
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-6">
            Discover What Your{" "}
            <span className="text-indigo-600">Business Can Automate</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Fill out a short form. Our AI analyzes your processes, identifies
            automation gaps, and builds you a live workflow — instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/form"
              className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200 text-lg"
            >
              Start Free Analysis →
            </Link>
            <a
              href="#how-it-works"
              className="text-gray-600 font-medium px-8 py-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-lg"
            >
              How it works
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-6">No signup required · Takes 3 minutes</p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-gray-500 text-lg">Three steps from form to live automation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="text-4xl font-bold text-indigo-100 mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What we can automate</h2>
            <p className="text-gray-500 text-lg">
              From marketing to operations — if it&apos;s repetitive, it can be automated
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {useCases.map((uc) => (
              <div
                key={uc.label}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all cursor-default"
              >
                <span className="text-3xl">{uc.icon}</span>
                <span className="font-medium text-gray-700 text-sm text-center">{uc.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-indigo-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to automate your business?</h2>
          <p className="text-indigo-200 text-lg mb-8">
            Get your custom automation plan and a live workflow in minutes.
          </p>
          <Link
            href="/form"
            className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors inline-block text-lg"
          >
            Start Free Analysis →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold text-sm">AutoFlow</span>
          </div>
          <p className="text-sm text-gray-400">Built for Generative AI course · Powered by Claude + n8n</p>
        </div>
      </footer>
    </div>
  );
}
