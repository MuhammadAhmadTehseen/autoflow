import { Resend } from "resend";
import type { AutomationOpportunity } from "./claude";

const resend = new Resend(process.env.RESEND_API_KEY);

const FEASIBILITY_COLOR: Record<string, string> = {
  high: "#16a34a",
  medium: "#d97706",
  low: "#dc2626",
};

function buildHtml({
  clientName,
  businessName,
  summary,
  opportunities,
  workflowName,
  workflowUrl,
}: {
  clientName: string;
  businessName: string;
  summary: string;
  opportunities: AutomationOpportunity[];
  workflowName: string | null;
  workflowUrl: string | null;
}): string {
  const opportunityRows = opportunities
    .map(
      (opp) => `
      <div style="border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-bottom:16px;background:#fff;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
          <div style="width:28px;height:28px;border-radius:8px;background:${opp.rank === 1 ? "#4f46e5" : "#9ca3af"};color:#fff;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            ${opp.rank}
          </div>
          <div>
            <div style="font-weight:600;color:#111827;font-size:15px;">${opp.title}</div>
            <div style="font-size:12px;color:#9ca3af;margin-top:2px;">Trigger: ${opp.trigger}</div>
          </div>
          <span style="margin-left:auto;font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;background:${FEASIBILITY_COLOR[opp.feasibility] ?? "#d97706"}20;color:${FEASIBILITY_COLOR[opp.feasibility] ?? "#d97706"};">
            ${opp.feasibility.charAt(0).toUpperCase() + opp.feasibility.slice(1)} feasibility
          </span>
        </div>
        <p style="color:#6b7280;font-size:14px;margin:0 0 12px 0;line-height:1.5;">${opp.description}</p>
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${opp.tools_required.map((t) => `<span style="font-size:12px;background:#f3f4f6;color:#374151;padding:3px 10px;border-radius:6px;font-weight:500;">${t}</span>`).join("")}
          </div>
          <span style="font-size:12px;color:#16a34a;font-weight:600;background:#f0fdf4;padding:3px 10px;border-radius:6px;">~${opp.estimated_hours_saved_per_week} hrs/week saved</span>
        </div>
        ${opp.rank === 1 ? `<div style="margin-top:12px;padding-top:12px;border-top:1px solid #e0e7ff;font-size:11px;font-weight:700;color:#4f46e5;letter-spacing:0.05em;">WORKFLOW BUILT FOR THIS OPPORTUNITY</div>` : ""}
      </div>`
    )
    .join("");

  const workflowSection = workflowUrl
    ? `
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;">
        <div style="font-weight:600;color:#15803d;font-size:14px;margin-bottom:4px;">Live workflow deployed on n8n</div>
        <div style="color:#16a34a;font-size:13px;margin-bottom:12px;">${workflowName}</div>
        <a href="${workflowUrl}" style="display:inline-block;background:#16a34a;color:#fff;font-weight:600;font-size:13px;padding:10px 20px;border-radius:8px;text-decoration:none;">Open Workflow in n8n →</a>
      </div>`
    : `
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:20px;margin-bottom:24px;">
        <div style="font-weight:600;color:#92400e;font-size:14px;">Workflow analysis complete</div>
        <div style="color:#b45309;font-size:13px;margin-top:4px;">n8n deployment is pending. Your automation plan is ready above.</div>
      </div>`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#f9fafb;padding:0 16px 40px;">

    <!-- Header -->
    <div style="text-align:center;padding:32px 0 24px;">
      <div style="display:inline-flex;align-items:center;gap:10px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:10px 20px;">
        <div style="width:32px;height:32px;border-radius:8px;background:#4f46e5;display:flex;align-items:center;justify-content:center;">
          <span style="color:#fff;font-size:16px;font-weight:900;">⚡</span>
        </div>
        <span style="font-weight:700;font-size:18px;color:#111827;">AutoFlow</span>
      </div>
    </div>

    <!-- Main card -->
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;margin-bottom:16px;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="width:56px;height:56px;border-radius:16px;background:#dcfce7;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
          <span style="font-size:24px;">✅</span>
        </div>
        <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">Your Automation Plan is Ready</h1>
        <p style="margin:0;color:#6b7280;font-size:14px;">Hi ${clientName}, here's what we built for <strong>${businessName}</strong>.</p>
      </div>

      <!-- Stats -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px;">
        <div style="text-align:center;border:1px solid #e5e7eb;border-radius:10px;padding:14px;">
          <div style="font-size:22px;font-weight:700;color:#4f46e5;">${opportunities.length}</div>
          <div style="font-size:11px;color:#9ca3af;margin-top:2px;">Opportunities</div>
        </div>
        <div style="text-align:center;border:1px solid #e5e7eb;border-radius:10px;padding:14px;">
          <div style="font-size:22px;font-weight:700;color:#16a34a;">~${opportunities.reduce((s, o) => s + o.estimated_hours_saved_per_week, 0)}</div>
          <div style="font-size:11px;color:#9ca3af;margin-top:2px;">Hours saved/wk</div>
        </div>
        <div style="text-align:center;border:1px solid #e5e7eb;border-radius:10px;padding:14px;">
          <div style="font-size:22px;font-weight:700;color:#f97316;">1</div>
          <div style="font-size:11px;color:#9ca3af;margin-top:2px;">Workflow built</div>
        </div>
      </div>

      <!-- Summary -->
      <p style="color:#374151;font-size:14px;line-height:1.7;background:#f9fafb;border-radius:10px;padding:16px;margin:0 0 24px;">${summary}</p>

      <!-- Workflow status -->
      ${workflowSection}

      <!-- Opportunities -->
      <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 16px;">Top Automation Opportunities</h2>
      ${opportunityRows}
    </div>

    <!-- Footer -->
    <p style="text-align:center;font-size:12px;color:#9ca3af;margin:0;">
      Generated by AutoFlow · Powered by Claude AI &amp; n8n
    </p>
  </div>
</body>
</html>`;
}

export async function sendResultEmail({
  clientName,
  clientEmail,
  businessName,
  summary,
  opportunities,
  workflowName,
  workflowUrl,
}: {
  clientName: string;
  clientEmail: string;
  businessName: string;
  summary: string;
  opportunities: AutomationOpportunity[];
  workflowName: string | null;
  workflowUrl: string | null;
}): Promise<void> {
  const notifyEmail = process.env.NOTIFY_EMAIL;
  const to = [clientEmail];
  if (notifyEmail && notifyEmail !== clientEmail) to.push(notifyEmail);

  const html = buildHtml({ clientName, businessName, summary, opportunities, workflowName, workflowUrl });

  await resend.emails.send({
    from: "AutoFlow <onboarding@resend.dev>",
    to,
    subject: `Your Automation Plan is Ready — ${businessName}`,
    html,
  });
}
