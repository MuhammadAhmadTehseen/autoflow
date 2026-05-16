import { NextRequest, NextResponse } from "next/server";
import { analyzeBusinessProfile } from "@/lib/claude";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    if (!formData.businessName || !formData.businessDescription) {
      return NextResponse.json(
        { error: "Business name and description are required." },
        { status: 400 }
      );
    }

    // Map frontend form fields to the shape Claude expects
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

    const result = await analyzeBusinessProfile(profile);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze business profile. Please try again." },
      { status: 500 }
    );
  }
}
