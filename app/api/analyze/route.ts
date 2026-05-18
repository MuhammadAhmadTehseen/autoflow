import { NextRequest, NextResponse } from "next/server";
import { analyzeBusinessProfile } from "@/lib/claude";
import { deployWorkflow } from "@/lib/n8n";
import { sendResultEmail } from "@/lib/email";

// Extended to 120s — Claude + 20-node workflow generation needs ~50-65s
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    if (!formData.businessName || !formData.businessDescription) {
      return NextResponse.json(
        { error: "Business name and description are required." },
        { status: 400 }
      );
    }

    // Step 1: Map form fields to Claude's expected shape
    const profile = {
      business_name: formData.businessName,
      website: formData.website || "",
      description: formData.businessDescription,
      industry: formData.industry || "Not specified",
      business_model: formData.businessModel || "Not specified",
      revenue_model: formData.revenueModel || "Not specified",
      target_customers: formData.targetCustomers || "",
      team_size: formData.teamSize || "Not specified",
      tools: [...(formData.tools as string[] || []), ...(formData.otherTools ? [formData.otherTools as string] : [])],
      manual_tasks: formData.manualTasks || [],
      other_manual_tasks: formData.otherManualTasks || "",
      hours_per_week: formData.hoursPerWeek || "Not specified",
      biggest_frustration: formData.biggestFrustration || "",
      automation_goals: formData.automationGoals || [],
      specific_wish: formData.specificWish || "",
      additional_context: formData.additionalContext || "",
      requested_opportunity: formData.requested_opportunity || null,
    };

    // Step 2: Analyze with Claude → get opportunities + workflow JSON
    const analysis = await analyzeBusinessProfile(profile);

    // Steps 3 + 4: Deploy workflow AND send email in parallel (saves 5-8s vs sequential)
    const [deployResult] = await Promise.allSettled([
      deployWorkflow(analysis.workflow as Record<string, unknown>),
      sendResultEmail({
        clientName: formData.name as string || "there",
        clientEmail: formData.email as string || process.env.NOTIFY_EMAIL!,
        businessName: formData.businessName as string,
        summary: analysis.summary,
        opportunities: analysis.opportunities,
        workflowName: (analysis.workflow as { name?: string }).name ?? null,
        workflowUrl: null, // url not known yet at this point
      }),
    ]);

    const deployed = deployResult.status === "fulfilled" ? deployResult.value : null;

    return NextResponse.json({
      opportunities: analysis.opportunities,
      summary: analysis.summary,
      workflow: {
        name: (analysis.workflow as { name?: string }).name ?? "AutoFlow Workflow",
        deployed: deployed !== null,
        id: deployed?.workflowId ?? null,
        url: deployed?.workflowUrl ?? null,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Analysis error:", message);
    return NextResponse.json(
      { error: `Analysis failed: ${message}` },
      { status: 500 }
    );
  }
}
