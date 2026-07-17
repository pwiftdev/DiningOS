import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  restaurant?: string;
  locations?: string;
  email?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const restaurant = body.restaurant?.trim();
  const email = body.email?.trim();

  if (!name || !restaurant || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid fields." },
      { status: 422 }
    );
  }

  // TODO: wire this to a real destination — CRM (HubSpot/Salesforce),
  // a transactional email (Resend/Postmark), or a Slack webhook.
  // For now we just log the lead server-side and return success.
  console.log("[lead] new demo request", {
    name,
    restaurant,
    locations: body.locations ?? "",
    email,
    message: body.message?.trim() ?? "",
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
