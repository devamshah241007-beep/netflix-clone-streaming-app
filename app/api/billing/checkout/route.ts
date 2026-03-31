import { NextResponse } from "next/server";
import { requireUser } from "@/lib/guards/auth";
import { prisma } from "@/lib/db/prisma";
import { stripe } from "@/lib/billing/stripe";

export async function POST(req: Request) {
  const user = await requireUser();

  const contentType = req.headers.get("content-type") || "";
  let planId = "";
  if (contentType.includes("application/json")) {
    const body = await req.json();
    planId = body.planId;
  } else {
    const form = await req.formData();
    planId = String(form.get("planId") || "");
  }

  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan?.stripePriceId) return NextResponse.json({ error: "Plan not configured for billing" }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email || undefined,
    line_items: [{ price: plan.stripePriceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?status=cancel`
  });

  if (contentType.includes("application/json")) return NextResponse.json({ url: session.url });
  return NextResponse.redirect(session.url || `${process.env.NEXT_PUBLIC_APP_URL}/billing`);
}
