import { NextRequest, NextResponse } from "next/server";
import { analyzeBusinessProfile } from "@/lib/claude";
import { deployWorkflow } from "@/lib/n8n";

// Extend Vercel function timeout to 60s (default is 10s — not enough for Claude + n8n)
export const maxDuration = 60;

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
      description: formData.businessDescription,
      industry: formData.industry || "Not specified",
      business_model: formData.businessModel || "Not specified",
      team_size: formData.teamSize || "Not specified",
      tools: formData.tools || [],
      manual_tasks: formData.manualTasks || [],
      other_manual_tasks: formData.otherManualTasks || "",
      hours_per_week: formData.hoursPerWeek || "Not specified",
      biggest_frustration: formData.biggestFrustration || "",
    };

    // Step 2: Analyze with Claude → get opportunities + workflow JSON
    const analysis = await analyzeBusinessProfile(profile);

    // Step 3: Deploy the generated workflow to n8n
    let deployResult = null;
    try {
      deployResult = await deployWorkflow(
        analysis.workflow as Record<string, unknown>
      );
    } catch (deployError) {
      // Non-fatal: still return analysis even if n8n deploy fails
      console.error("n8n deploy error:", deployError);
    }

    return NextResponse.json({
      opportunities: analysis.opportunities,
      summary: analysis.summary,
      workflow: {
        name: (analysis.workflow as { name?: string }).name ?? "AutoFlow Workflow",
        deployed: deployResult !== null,
        id: deployResult?.workflowId ?? null,
        url: deployResult?.workflowUrl ?? null,
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
