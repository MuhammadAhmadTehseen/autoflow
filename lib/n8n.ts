const N8N_BASE_URL = process.env.N8N_BASE_URL!;
const N8N_API_KEY = process.env.N8N_API_KEY!;

const headers = {
  "X-N8N-API-KEY": N8N_API_KEY,
  "Content-Type": "application/json",
};

export type DeployResult = {
  workflowId: string;
  workflowUrl: string;
  workflowName: string;
};

export async function deployWorkflow(
  workflowJson: Record<string, unknown>
): Promise<DeployResult> {
  // 1. Create the workflow
  const createRes = await fetch(`${N8N_BASE_URL}/api/v1/workflows`, {
    method: "POST",
    headers,
    body: JSON.stringify(workflowJson),
  });

  if (!createRes.ok) {
    const errorBody = await createRes.text();
    throw new Error(`n8n create failed (${createRes.status}): ${errorBody}`);
  }

  const created = await createRes.json();
  const workflowId: string = created.id;

  // 2. Activate the workflow
  const activateRes = await fetch(
    `${N8N_BASE_URL}/api/v1/workflows/${workflowId}/activate`,
    {
      method: "POST",
      headers,
    }
  );

  if (!activateRes.ok) {
    // Non-fatal: workflow created but not activated (some workflows have no trigger)
    console.warn(`n8n activate warning (${activateRes.status}): workflow created but not activated`);
  }

  return {
    workflowId,
    workflowUrl: `${N8N_BASE_URL}/workflow/${workflowId}`,
    workflowName: (workflowJson.name as string) ?? "AutoFlow Workflow",
  };
}
