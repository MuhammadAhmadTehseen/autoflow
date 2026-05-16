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

### Phase 2 — Claude Integration 🔄 IN PROGRESS
Goal: Send form data to Claude, get back structured analysis + n8n workflow JSON

**Tasks:**
- [ ] Create `lib/claude.ts` — Claude API call with researched prompt
- [ ] Create `/app/api/analyze/route.ts` — main API endpoint
- [ ] Load workflow-templates.json as few-shot examples in prompt
- [ ] Parse + validate Claude JSON response
- [ ] Return structured `{ opportunities, workflow, summary }` to frontend

**Research done:**
- [x] Best Claude prompt designed (XML-wrapped, few-shot, temperature: 0)
- [x] Automatable vs non-automatable tasks documented
- [x] Top 10 automation patterns mapped to n8n nodes
- [x] 3 n8n workflow JSON templates built (`lib/workflow-templates.json`)

**Env vars needed:** `ANTHROPIC_API_KEY` ✅ set on Vercel

---

### Phase 3 — n8n Workflow Deployment ⏳ PENDING
Goal: Take Claude's workflow JSON → deploy it live on n8n

**Tasks:**
- [ ] `lib/n8n.ts` — POST to create workflow, then activate it
- [ ] Handle n8n API errors gracefully
- [ ] Return workflow URL back to API route

**Env vars needed:** `N8N_API_KEY` ✅, `N8N_BASE_URL` ✅ (both set on Vercel)

---

### Phase 4 — Email Notification ⏳ PENDING
Goal: Email the client their automation plan + workflow link

**Tasks:**
- [ ] `lib/email.ts` — send email with client name, top 3 opportunities, n8n link
- [ ] Design HTML email template

**Env vars needed:** `RESEND_API_KEY` ✅, `NOTIFY_EMAIL` ✅ (both set on Vercel)

---

### Phase 5 — Connect Frontend to Real Data ⏳ PENDING
Goal: Replace mock data with real Claude output on result page

**Tasks:**
- [ ] Update `BusinessForm.tsx` to POST to `/api/analyze` on submit
- [ ] Update `result/page.tsx` to display real opportunities + workflow link
- [ ] Add form validation (required fields)
- [ ] Add error states (API failures, build failures)
- [ ] Test end-to-end with a real business example

---

### Phase 6 — Polish & Presentation ⏳ PENDING
Goal: Make it demo-ready for course submission

**Tasks:**
- [ ] UI/UX refinements based on feedback
- [ ] Test with 2-3 different business types
- [ ] Record demo video

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
