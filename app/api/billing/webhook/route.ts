import { headers } from "next/headers";
import { stripe } from "@/lib/billing/stripe";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const signature = (await headers()).get("stripe-signature");
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) return new Response("Missing signature", { status: 400 });

  const raw = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;
    if (customerEmail) {
      const user = await prisma.user.findUnique({ where: { email: customerEmail } });
      if (user) {
        const basicPlan = await prisma.plan.findFirst({ where: { name: "Basic" } });
        if (basicPlan) {
          await prisma.subscription.upsert({
            where: { stripeSubscriptionId: (session.subscription as string) || "" },
            update: { status: "ACTIVE", planId: basicPlan.id, userId: user.id },
            create: {
              userId: user.id,
              planId: basicPlan.id,
              stripeCustomerId: (session.customer as string) || undefined,
              stripeSubscriptionId: (session.subscription as string) || undefined,
              status: "ACTIVE"
            }
          });
        }
      }
    }
  }

  return new Response("ok");
}
