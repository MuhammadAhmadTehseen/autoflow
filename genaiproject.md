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
  → /result page: show automation plan + workflow link
```

---

## Phases

### Phase 1 — Frontend UI ✅ DONE
- [x] Landing page (hero, how-it-works, use cases, CTA)
- [x] 5-step business form (basic info, overview, tools, pain points, review)
- [x] Result page (loading animation + mock results UI)
- [x] Pushed to GitHub: `MuhammadAhmadTehseen/autoflow`
- [ ] Deploy to Vercel

---

### Phase 2 — Claude Integration
Goal: Send form data to Claude, get back analysis + n8n workflow JSON

**Tasks:**
- [ ] Create `/app/api/analyze/route.ts`
- [ ] Design Claude prompt (few-shot with example n8n JSON)
- [ ] Parse Claude response: extract analysis + workflow JSON
- [ ] Validate workflow JSON structure before passing to n8n
- [ ] Return structured response to frontend

**Env vars needed:**
- `ANTHROPIC_API_KEY`

---

### Phase 3 — n8n Workflow Deployment
Goal: Take Claude's workflow JSON → deploy it live on n8n

**Tasks:**
- [ ] `lib/n8n.ts` — POST to create workflow, then activate it
- [ ] Handle n8n API errors gracefully
- [ ] Return workflow URL back to API route

**Env vars needed:**
- `N8N_API_KEY`
- `N8N_BASE_URL`

---

### Phase 4 — Email Notification
Goal: Email the client their automation plan + workflow link

**Tasks:**
- [ ] Set up Resend account + get API key
- [ ] `lib/email.ts` — send email with client name, top 3 opportunities, n8n link
- [ ] Design email template (HTML)

**Env vars needed:**
- `RESEND_API_KEY`
- `NOTIFY_EMAIL` (team email to CC)

---

### Phase 5 — Polish & Presentation
Goal: Make it demo-ready for course submission

**Tasks:**
- [ ] Replace mock result data with real Claude output
- [ ] Add error states (form validation, API failures)
- [ ] Add loading skeleton on result page
- [ ] Test end-to-end with a real business example
- [ ] Record demo video

---

## Environment Variables (all phases)

| Variable | Used in | Status |
|---|---|---|
| `ANTHROPIC_API_KEY` | Phase 2 | In `.env` |
| `N8N_API_KEY` | Phase 3 | In `.env` |
| `N8N_BASE_URL` | Phase 3 | In `.env` |
| `RESEND_API_KEY` | Phase 4 | Not yet |
| `NOTIFY_EMAIL` | Phase 4 | Not yet |

---

## Notes
- n8n instance: `https://n8n.devplusops.com` (personal)
- Claude prompt must include 1-2 example n8n workflow JSONs as reference
- Workflow generation is the highest-risk step — validate JSON before deploying
- Result page currently shows mock data — will be replaced in Phase 5
