# AutoFlow — Generative AI Course Project

## Overview
A web app where business owners describe their operations via a form. Claude AI analyzes their processes, identifies automation gaps, generates a live n8n workflow, deploys it, and emails the client a link.

**Stack:** Next.js (Vercel) · Claude API · n8n REST API · Resend (email) · GitHub

---

## Architecture

```
User fills form (Next.js)
  → /api/analyze (Next.js API route)
    → Claude API: analyze business + generate n8n workflow JSON
    → n8n API: POST /workflows (create) + POST /workflows/:id/activate
    → Resend: send email with workflow URL to client + team
  → /result page: show real automation plan + workflow link
```

---

## Phases

### Phase 1 — Frontend UI ✅ DONE
- [x] Landing page (hero, how-it-works, use cases, CTA)
- [x] 5-step business form (basic info, overview, tools, pain points, review)
- [x] Result page (loading animation + mock results UI)
- [x] Pushed to GitHub: `MuhammadAhmadTehseen/autoflow`
- [x] Deployed to Vercel (all env vars set)

---

### Phase 2 — Claude Integration ✅ DONE
Goal: Send form data to Claude, get back structured analysis + n8n workflow JSON

**Tasks:**
- [x] Create `lib/claude.ts` — Claude API call with researched prompt
- [x] Create `/app/api/analyze/route.ts` — main API endpoint
- [x] Load workflow-templates.json as few-shot examples in prompt
- [x] Parse + validate Claude JSON response (with retry on bad JSON)
- [x] Return structured `{ opportunities, workflow, summary }` to frontend
- [x] BusinessForm now POSTs to `/api/analyze` on submit
- [x] Result page shows real Claude output (opportunities + summary)

**Research done:**
- [x] Best Claude prompt designed (XML-wrapped, few-shot, temperature: 0)
- [x] Automatable vs non-automatable tasks documented
- [x] Top 10 automation patterns mapped to n8n nodes
- [x] 3 n8n workflow JSON templates built (`lib/workflow-templates.json`)

**Env vars needed:** `ANTHROPIC_API_KEY` ✅ set on Vercel

---

### Phase 3 — n8n Workflow Deployment ✅ DONE
Goal: Take Claude's workflow JSON → deploy it live on n8n

**Tasks:**
- [x] `lib/n8n.ts` — POST to create workflow, then activate it
- [x] Non-fatal error handling (analysis still returns if n8n deploy fails)
- [x] Workflow URL returned in API response
- [x] Result page shows live n8n link (green banner) or fallback (yellow banner)

**Env vars needed:** `N8N_API_KEY` ✅, `N8N_BASE_URL` ✅ (both set on Vercel)

---

### Phase 4 — Email Notification ✅ DONE
Goal: Email the client their automation plan + workflow link

**Tasks:**
- [x] `lib/email.ts` — Resend SDK, HTML email with stats, opportunities, n8n link
- [x] Designed rich HTML email template (stats bar, opportunity cards, green/yellow workflow banner)
- [x] Integrated into `/api/analyze` route (non-fatal, always sends to `NOTIFY_EMAIL`)
- [x] Subject includes client email for identification in sandbox mode

**Env vars needed:** `RESEND_API_KEY` ✅, `NOTIFY_EMAIL` ✅ (imurtaza544@gmail.com)

---

### Phase 5 — Connect Frontend to Real Data ✅ DONE
Goal: Replace mock data with real Claude output on result page

**Tasks:**
- [x] `BusinessForm.tsx` POSTs to `/api/analyze` on submit
- [x] `result/page.tsx` displays real opportunities, summary, workflow link
- [x] Error states handled (alert on API failure)
- [x] End-to-end tested with dental clinic + research agency cases
- [x] Expanded form: 6 steps, 40+ tools, 20 task options, free-text fields, goals step

---

### Phase 6 — Polish & Presentation ✅ DONE
Goal: Make it demo-ready for course submission

**Tasks:**
- [x] Expanded BusinessForm to 6 steps with richer fields (revenue model, target customers, specific wish, additional context)
- [x] Added 18 industries, 5 business models, 7 revenue models, 40+ tools, 20+ manual tasks
- [x] Fixed JSON extraction bug (brace-depth parser replacing lastIndexOf)
- [x] Fixed n8n deployment bug (settings field injection)
- [x] Tested with 2 different business types: healthcare (dental) + B2B research agency
- [x] All 3 phases of pipeline confirmed working end-to-end on production

---

### Phase 7 — Impact Charts ✅ DONE (2026-05-17)
Goal: Add data visualisation to result page so output feels professional and credible

**Tasks:**
- [x] Installed `recharts` via npm
- [x] Built `ImpactCharts` component with 3 charts driven by real Claude output data:
  - **Bar chart** — Time saved before vs. after per automation (hrs/wk)
  - **Donut + key numbers panel** — Annual cost breakdown: manual cost today / after automation / $ savings
  - **Line chart** — Cumulative hours saved over 12-month projection
- [x] Stats bar updated: 3rd stat now shows estimated annual savings ($) instead of "1 workflow built"
- [x] Charts use $50/hr × 52 wks benchmark for cost calculations
- [x] Charts only render when real opportunity data exists (no empty state crash)
- [x] All TypeScript types pass — clean build, pushed to GitHub, auto-deployed to Vercel

**Commit:** `feat: add 3 impact charts to result page (Recharts)`

---

---

### Phase 8 — Landing Page Visual Upgrade ✅ DONE (2026-05-17)
Goal: Make the landing page look like a real SaaS product, not a student project

**Tasks:**
- [x] **Product mockup** — inline mock browser window in hero showing result page UI (stats bar, opportunity card, mini bar chart) — no image files needed, pure JSX
- [x] **Stats strip** — ~$18K avg saved/yr · 3 min to complete · 500+ workflows deployed · 60-95% automation rate
- [x] **Powered-by bar** — Anthropic Claude, n8n Workflows, Vercel, Resend (styled pill badges)
- [x] **Testimonials section** — 3 cards with initials avatars (colour-coded), star ratings, realistic quotes
- [x] **Use cases** — SVG Heroicons replacing emojis, white card style, indigo hover state
- [x] **How it works** — SVG icons in indigo pill, "Step XX" label, card hover effects
- [x] **CTA banner** — dot-grid radial background overlay for visual depth
- [x] TypeScript clean build, pushed to GitHub, auto-deployed to Vercel

**Commit:** `feat: Phase 8 — full landing page visual upgrade`

---

---

### Phase 9 — Technical Fixes ✅ DONE (2026-05-17)
Goal: Fix core technical issues and make the pipeline more robust and accurate

**Result persistence & real loading:**
- [x] API call moved from `BusinessForm.tsx` to `result/page.tsx` — form just stores data + navigates
- [x] Loading steps now driven by real API response: ticks at 2s / 6s / 12s, then snaps to done when API returns
- [x] Result survives page interactions (no longer lost if API is slow)

**Error handling:**
- [x] Replaced `alert()` in BusinessForm with inline error banner (red, dismissible)
- [x] Result page: proper "Session expired" screen if sessionStorage has no form data
- [x] Result page: proper "Analysis failed" error screen with Try Again + Edit Form buttons (Try Again reuses saved form data — no re-fill needed)

**Hourly rate for real cost calculations:**
- [x] Added hourly rate picker to Step 4 of form: $25 / $50 / $75 / $100 / $150 / $200+/hr
- [x] Rate passed via URL param (`/result?rate=75`) from form to result page
- [x] Charts now use the user's actual rate instead of hardcoded $50 benchmark

**Workflow templates expanded: 3 → 8:**
- [x] Appointment Reminder Automation (daily schedule → Sheets filter → Gmail)
- [x] Lead Enrichment & Qualification (Webhook → Claude score → IF → Slack/Sheets)
- [x] Customer Support Email Triage (Gmail trigger → Claude classify → IF → Slack/auto-reply)
- [x] Client Onboarding Sequence (Webhook → Gmail welcome → Sheets → Slack notify)
- [x] Invoice Generation & Delivery (Sheets trigger → IF status=complete → Code → Gmail)
- [x] Claude prompt updated to reference all 8 templates

**Commit:** `feat: Phase 9 — technical fixes + 5 new workflow templates`

---

### Upcoming Improvements (Backlog)
- [ ] **Phase 10** — Resend production domain (so clients actually get the email, not just NOTIFY_EMAIL)

---

## Environment Variables

| Variable | Used in | Status |
|---|---|---|
| `ANTHROPIC_API_KEY` | Phase 2 | Set on Vercel ✅ |
| `N8N_API_KEY` | Phase 3 | Set on Vercel ✅ |
| `N8N_BASE_URL` | Phase 3 | Set on Vercel ✅ |
| `RESEND_API_KEY` | Phase 4 | Set on Vercel ✅ |
| `NOTIFY_EMAIL` | Phase 4 | Set on Vercel ✅ |

---

## Key Files

| File | Purpose |
|---|---|
| `app/page.tsx` | Landing page |
| `app/form/page.tsx` | Form page wrapper |
| `app/result/page.tsx` | Results page (currently mock) |
| `components/BusinessForm.tsx` | 5-step form component |
| `lib/workflow-templates.json` | 3 n8n JSON templates for Claude few-shot |
| `lib/claude.ts` | Claude API call (Phase 2) |
| `lib/n8n.ts` | n8n deploy function (Phase 3) |
| `lib/email.ts` | Resend email (Phase 4) |
| `app/api/analyze/route.ts` | Main backend endpoint (Phase 2) |

---

## Notes
- n8n instance: `https://n8n.devplusops.com` (personal)
- Claude prompt: XML-wrapped, temperature: 0, assistant prefill `{`, retry on bad JSON
- Workflow generation is highest-risk — validate JSON before posting to n8n
- Result page shows mock data until Phase 5 connects it to real API
