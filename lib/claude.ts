import Anthropic from "@anthropic-ai/sdk";
import templates from "./workflow-templates.json";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// The 3 supported automation cases — Claude picks the best fit and customizes it
const TEMPLATE_CONTEXT = `
## AVAILABLE WORKFLOW TEMPLATES

You have exactly 3 workflow templates to choose from. Pick the best match for the business and customize it for their specific situation. Do not invent new node types.

### Template 1: Email Follow-up Automation
${templates.emailFollowup.description}

### Template 2: Social Media Caption Generator
${templates.captionGenerator.description}

### Template 3: Weekly Report Generator
${templates.weeklyReport.description}

When generating the workflow JSON for opportunity #1, use the structure of the best-matching template above, and customize the node names, parameters, and logic to fit this specific business. Keep the same node types and connection pattern.
`;

const SYSTEM_PROMPT = `You are AutoFlow, an expert business automation architect specializing in n8n workflow design and small business process optimization. Your role is to analyze a business profile, identify the highest-impact automation opportunities, and generate a production-ready n8n workflow JSON for the top opportunity.

## YOUR TASK

Given a business profile, you will:
1. Analyze the business for automation opportunities
2. Rank the top 3 opportunities by impact (time saved × feasibility)
3. Generate a complete, valid n8n workflow JSON for opportunity #1
4. Return a single, parseable JSON object — nothing else

## ANALYSIS FRAMEWORK

When evaluating automation opportunities, score each on:
- TIME IMPACT: Hours/week saved (from the form input)
- FEASIBILITY: How well it maps to available n8n integrations
- RELIABILITY: Whether it can run at 70%+ automation without human error risk
- TOOL FIT: Whether the business already uses tools n8n integrates with natively

Prioritize automations that are: repetitive, rule-based, triggered by a clear event, involve data moving between 2+ tools the business already uses.

## N8N WORKFLOW JSON RULES

1. Every node MUST have: "id" (unique string), "name", "type", "typeVersion", "position", "parameters"
2. Connections map source node names to targets: { "Source Node Name": { "main": [[{ "node": "Target", "type": "main", "index": 0 }]] } }
3. Node names in connections must match node name fields exactly
4. Position nodes left-to-right with ~250px horizontal spacing, starting at [250, 300]
5. Keep workflow to 4-6 nodes
6. Leave credentials as empty objects {}
7. Include "settings": { "executionOrder": "v1" }

${TEMPLATE_CONTEXT}

## OUTPUT FORMAT

Return ONLY this JSON object. No explanation, no markdown fences, no commentary.

{
  "opportunities": [
    {
      "rank": 1,
      "title": "Short automation name",
      "description": "One sentence: what gets automated and how",
      "tools_required": ["tool1", "tool2"],
      "estimated_hours_saved_per_week": <number>,
      "feasibility": "high|medium|low",
      "trigger": "What event starts this automation"
    },
    { "rank": 2, "title": "...", "description": "...", "tools_required": [], "estimated_hours_saved_per_week": <number>, "feasibility": "high|medium|low", "trigger": "..." },
    { "rank": 3, "title": "...", "description": "...", "tools_required": [], "estimated_hours_saved_per_week": <number>, "feasibility": "high|medium|low", "trigger": "..." }
  ],
  "workflow": {
    "name": "AutoFlow: [Opportunity #1 Title]",
    "nodes": [...],
    "connections": {...},
    "settings": { "executionOrder": "v1" }
  },
  "summary": "2-3 sentence plain-English explanation of what the workflow does, how it's triggered, and what the business owner will experience after deployment."
}

<example>
INPUT:
{ "business_name": "Bright Dental Clinic", "description": "Single-location dental practice", "industry": "Healthcare", "business_model": "B2C", "team_size": "2–5", "tools": ["Gmail", "Google Sheets"], "manual_tasks": ["Sending follow-up emails"], "other_manual_tasks": "Sending appointment reminders", "hours_per_week": "2–5 hrs", "biggest_frustration": "We forget to send reminders and patients no-show" }

OUTPUT:
{"opportunities":[{"rank":1,"title":"Automated Appointment Reminder Emails","description":"Read tomorrow's appointments from Google Sheets daily and auto-send personalized reminder emails via Gmail","tools_required":["Google Sheets","Gmail"],"estimated_hours_saved_per_week":4,"feasibility":"high","trigger":"Daily schedule at 9am"},{"rank":2,"title":"No-Show Follow-Up Email","description":"Detect missed appointments and automatically send a rebooking email","tools_required":["Google Sheets","Gmail"],"estimated_hours_saved_per_week":1,"feasibility":"medium","trigger":"Google Sheets row updated with no-show status"},{"rank":3,"title":"New Patient Welcome Email","description":"When a new patient is added to Sheets, send a welcome email with clinic info","tools_required":["Google Sheets","Gmail"],"estimated_hours_saved_per_week":1,"feasibility":"high","trigger":"New row added to Patient sheet"}],"workflow":{"name":"AutoFlow: Automated Appointment Reminder Emails","nodes":[{"id":"node-1","name":"Daily Trigger","type":"n8n-nodes-base.scheduleTrigger","typeVersion":1,"position":[250,300],"parameters":{"rule":{"interval":[{"field":"hours","hoursInterval":24}]}}},{"id":"node-2","name":"Get Appointments","type":"n8n-nodes-base.googleSheets","typeVersion":4,"position":[500,300],"parameters":{"operation":"read","documentId":"YOUR_SHEET_ID","sheetName":"Appointments","options":{}},"credentials":{}},{"id":"node-3","name":"Filter Tomorrow","type":"n8n-nodes-base.code","typeVersion":2,"position":[750,300],"parameters":{"mode":"runOnceForAllItems","jsCode":"const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1); const tDate = tomorrow.toISOString().split('T')[0]; return items.filter(i=>i.json.appointment_date===tDate);"}},{"id":"node-4","name":"Send Reminder Email","type":"n8n-nodes-base.gmail","typeVersion":2,"position":[1000,300],"parameters":{"operation":"send","toList":"={{ $json.patient_email }}","subject":"Reminder: Your appointment tomorrow","message":"Hi {{ $json.patient_name }}, this is a reminder of your appointment tomorrow. Please reply to confirm or call to reschedule.","options":{}},"credentials":{}}],"connections":{"Daily Trigger":{"main":[[{"node":"Get Appointments","type":"main","index":0}]]},"Get Appointments":{"main":[[{"node":"Filter Tomorrow","type":"main","index":0}]]},"Filter Tomorrow":{"main":[[{"node":"Send Reminder Email","type":"main","index":0}]]}}},"settings":{"executionOrder":"v1"}},"summary":"Every morning at 9am this workflow reads tomorrow's appointments from your Google Sheet, filters for the correct date, and sends each patient a personalized reminder email automatically. You will no longer need to manually send reminders — the workflow runs silently in the background."}
</example>

Now analyze the following business profile and return the JSON output:`;

export type AutomationOpportunity = {
  rank: number;
  title: string;
  description: string;
  tools_required: string[];
  estimated_hours_saved_per_week: number;
  feasibility: "high" | "medium" | "low";
  trigger: string;
};

export type AnalysisResult = {
  opportunities: AutomationOpportunity[];
  workflow: Record<string, unknown>;
  summary: string;
};

export async function analyzeBusinessProfile(formData: Record<string, unknown>): Promise<AnalysisResult> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    temperature: 0,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: JSON.stringify(formData),
      },
    ],
  });

  const rawText = (response.content[0] as { text: string }).text.trim();

  // Extract just the JSON object — find first { and last }
  const jsonStart = rawText.indexOf("{");
  const jsonEnd = rawText.lastIndexOf("}");
  const cleaned = jsonStart !== -1 && jsonEnd !== -1
    ? rawText.slice(jsonStart, jsonEnd + 1)
    : rawText;

  try {
    return JSON.parse(cleaned) as AnalysisResult;
  } catch {
    // Retry: ask Claude to return clean JSON
    const retryResponse = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      temperature: 0,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: JSON.stringify(formData) },
        { role: "assistant", content: rawText },
        {
          role: "user",
          content:
            "Your previous response was not valid JSON. Return only the raw JSON object starting with { and ending with }. No markdown fences, no explanation.",
        },
      ],
    });
    const retryRaw = (retryResponse.content[0] as { text: string }).text.trim();
    const retryStart = retryRaw.indexOf("{");
    const retryEnd = retryRaw.lastIndexOf("}");
    const retryCleaned = retryStart !== -1 && retryEnd !== -1
      ? retryRaw.slice(retryStart, retryEnd + 1)
      : retryRaw;
    return JSON.parse(retryCleaned) as AnalysisResult;
  }
}
