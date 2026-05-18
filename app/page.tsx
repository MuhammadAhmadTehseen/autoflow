import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Describe Your Business",
    description:
      "Tell us what you do, your team size, the tools you use, and where you spend the most time manually.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Identifies Gaps",
    description:
      "Claude analyzes your profile, pinpoints your top 3 automation opportunities ranked by time saved and feasibility.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Live Workflow Deployed",
    description:
      "A real n8n workflow is generated and published to your account automatically. You get the link instantly.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const useCases = [
  {
    label: "Email Follow-ups",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Report Generation",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Lead Notifications",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    label: "Scheduling & CRM",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Social Media Posts",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    label: "Customer Support",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    label: "Data Sync & Entry",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    label: "Invoice & Finance",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    initials: "SR",
    name: "Sarah Rahman",
    role: "Founder, BrightEdge Consulting",
    color: "bg-violet-500",
    quote:
      "AutoFlow identified that we were wasting 9 hours a week on manual lead follow-ups. The workflow it built now handles all of it. Genuinely shocked at how fast this worked.",
    stars: 5,
  },
  {
    initials: "MK",
    name: "Marcus Klein",
    role: "Operations Manager, Novu Agency",
    color: "bg-blue-500",
    quote:
      "I filled out the form expecting generic advice. Instead I got a live n8n workflow deployed and ready to connect. The time savings estimate was pretty much spot on.",
    stars: 5,
  },
  {
    initials: "FA",
    name: "Fatima Al-Amin",
    role: "CEO, Calla Healthcare",
    color: "bg-emerald-500",
    quote:
      "We were sending appointment reminders manually every day. AutoFlow built the entire reminder automation in minutes. That's 5 hours a week back for our team.",
    stars: 5,
  },
];

const stats = [
  { value: "~$18K", label: "avg saved per year" },
  { value: "3 min", label: "to get your plan" },
  { value: "500+", label: "workflows deployed" },
  { value: "60–95%", label: "task automation rate" },
];

const poweredBy = [
  { name: "Anthropic Claude", accent: "#D97706" },
  { name: "n8n Workflows", accent: "#EA4B71" },
  { name: "Vercel", accent: "#000000" },
  { name: "Resend", accent: "#4f46e5" },
];

// ─── Mock product screenshot (inline SVG) ─────────────────────────────────────

function ProductMockup() {
  return (
    <div className="w-full max-w-3xl mx-auto mt-16 px-4">
      {/* Browser chrome */}
      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-indigo-100 border border-gray-200">
        {/* Title bar */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 font-mono">
            autoflow-dusky.vercel.app/result
          </div>
        </div>

        {/* Mocked result page content */}
        <div className="bg-gray-50 p-6 space-y-4">
          {/* Success header */}
          <div className="text-center pb-2">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="h-4 bg-gray-800 rounded w-56 mx-auto mb-2" />
            <div className="h-3 bg-gray-300 rounded w-72 mx-auto" />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "3", label: "Opportunities", color: "text-indigo-600" },
              { val: "~11", label: "hrs saved/wk", color: "text-green-600" },
              { val: "$28K", label: "est. annual savings", color: "text-orange-500" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-sm">
                <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Opportunity card */}
          <div className="bg-white rounded-xl border border-indigo-200 ring-1 ring-indigo-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">1</div>
              <div>
                <div className="h-3 bg-gray-800 rounded w-44" />
                <div className="h-2 bg-gray-300 rounded w-32 mt-1" />
              </div>
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">High</span>
            </div>
            <div className="h-2 bg-gray-200 rounded w-full mb-1.5" />
            <div className="h-2 bg-gray-200 rounded w-5/6" />
            <div className="flex gap-2 mt-3">
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">Gmail</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">Google Sheets</span>
              <span className="ml-auto text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-md font-medium">~5 hrs/wk</span>
            </div>
          </div>

          {/* Mini bar chart */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="h-3 bg-gray-800 rounded w-40 mb-1" />
            <div className="h-2 bg-gray-300 rounded w-56 mb-4" />
            <div className="flex items-end gap-3 h-20 px-2">
              {[
                { before: "100%", after: "15%", label: "Email Follow-up" },
                { before: "80%", after: "12%", label: "Reporting" },
                { before: "65%", after: "10%", label: "Data Sync" },
              ].map((b) => (
                <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-1 h-16">
                    <div className="flex-1 bg-indigo-100 rounded-t-sm" style={{ height: b.before }} />
                    <div className="flex-1 bg-indigo-600 rounded-t-sm" style={{ height: b.after }} />
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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
          <div className="flex items-center gap-4">
            <a href="#pricing" className="text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors hidden sm:block">Pricing</a>
            <a href="#contact" className="text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors hidden sm:block">Contact</a>
            <Link
              href="/form"
              className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Analyze My Business
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-36 pb-8 px-6">
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
            Fill out a 3-minute form. Our AI analyzes your processes, identifies
            your biggest automation wins, and deploys a live workflow — instantly.
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
          <p className="text-sm text-gray-400 mt-5">No signup required · Takes 3 minutes · Free</p>
        </div>

        {/* Product mockup */}
        <ProductMockup />
      </section>

      {/* ── Stats strip ── */}
      <section className="py-14 px-6 border-y border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Powered by ── */}
      <section className="py-10 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-gray-400 text-center uppercase tracking-widest font-medium mb-6">
            Built on world-class infrastructure
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {poweredBy.map((p) => (
              <div key={p.name}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                <div className="w-2 h-2 rounded-full" style={{ background: p.accent }} />
                <span className="text-sm font-semibold text-gray-700">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-gray-500 text-lg">Three steps from form to live automation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Step {step.number}</div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section className="py-24 px-6 bg-gray-50">
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
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-sm transition-all cursor-default group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100 group-hover:text-indigo-700 flex items-center justify-center transition-colors">
                  {uc.icon}
                </div>
                <span className="font-medium text-gray-700 text-sm text-center">{uc.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What business owners say</h2>
            <p className="text-gray-500 text-lg">Real results from real teams</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md hover:border-indigo-100 transition-all">
                <Stars count={t.stars} />
                <p className="text-gray-600 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                  <div className={`w-9 h-9 rounded-full ${t.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-500 text-lg">In Pakistani Rupees · Cancel anytime · No hidden fees</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col shadow-sm hover:shadow-md transition-all">
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Starter</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-gray-900">Rs 14,000</span>
                  <span className="text-gray-400 text-sm mb-1">/mo</span>
                </div>
                <p className="text-xs text-gray-400">approx $50 USD</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["1 active workflow", "Up to 5 automations", "Gmail + Sheets integrations", "Email support (48h response)", "Free setup and onboarding", "Monthly usage report"].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <a href="/form" className="block text-center border border-indigo-600 text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors text-sm">Get Started</a>
            </div>
            <div className="bg-indigo-600 rounded-2xl p-8 flex flex-col shadow-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-indigo-200 uppercase tracking-widest mb-2">Growth</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-white">Rs 35,000</span>
                  <span className="text-indigo-300 text-sm mb-1">/mo</span>
                </div>
                <p className="text-xs text-indigo-300">approx $125 USD</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["5 active workflows", "Unlimited automations", "Slack, HubSpot, CRM integrations", "Priority support (12h response)", "Custom workflow builds", "Weekly performance reports", "Apify scraping included"].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-indigo-100">
                    <svg className="w-4 h-4 text-indigo-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <a href="/form" className="block text-center bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors text-sm">Get Started</a>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col shadow-sm hover:shadow-md transition-all">
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Scale</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-gray-900">Rs 85,000</span>
                  <span className="text-gray-400 text-sm mb-1">/mo</span>
                </div>
                <p className="text-xs text-gray-400">approx $300 USD</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Unlimited workflows", "Dedicated account manager", "Custom AI model training", "24h SLA guarantee", "White-label reports", "On-call debugging support", "Quarterly automation audit"].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <a href="mailto:sales@autoflow.io" className="block text-center border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">Contact Sales</a>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">All plans include a 7-day free trial. Payments accepted via bank transfer or JazzCash.</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
            <p className="text-gray-500 text-lg">Have a question or want a custom plan? We respond within 24 hours.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">General</h3>
              <a href="mailto:hello@autoflow.io" className="text-indigo-600 text-sm font-medium hover:underline">hello@autoflow.io</a>
              <p className="text-xs text-gray-400 mt-1">Enquiries and partnerships</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Support</h3>
              <a href="mailto:support@autoflow.io" className="text-indigo-600 text-sm font-medium hover:underline">support@autoflow.io</a>
              <p className="text-xs text-gray-400 mt-1">Technical issues and workflow help</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Sales</h3>
              <a href="mailto:sales@autoflow.io" className="text-indigo-600 text-sm font-medium hover:underline">sales@autoflow.io</a>
              <p className="text-xs text-gray-400 mt-1">Pricing and enterprise plans</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
          <div className="relative">
            <h2 className="text-3xl font-bold mb-4">Ready to automate your business?</h2>
            <p className="text-indigo-200 text-lg mb-3">
              Get your custom automation plan and a live workflow in minutes.
            </p>
            <p className="text-indigo-300 text-sm mb-8">No signup · No credit card · Free</p>
            <Link
              href="/form"
              className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors inline-block text-lg"
            >
              Start Free Analysis →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold text-sm">AutoFlow</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#pricing" className="hover:text-gray-600 transition-colors">Pricing</a>
            <span>·</span>
            <a href="mailto:hello@autoflow.io" className="hover:text-gray-600 transition-colors">hello@autoflow.io</a>
            <span>·</span>
            <span>Powered by Claude + n8n</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
