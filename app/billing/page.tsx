import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id) return <div className="card">Login required.</div>;
  const [plans, subscription, trial] = await Promise.all([
    prisma.plan.findMany({ orderBy: { priceMonthly: "asc" } }),
    prisma.subscription.findFirst({ where: { userId: session.user.id }, include: { plan: true }, orderBy: { createdAt: "desc" } }),
    prisma.trial.findFirst({ where: { userId: session.user.id, active: true } })
  ]);
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Billing & Settings</h1>
      <div className="card">Current plan: {subscription?.plan.name || "Trial"} | Trial end: {trial?.endDate.toDateString() || "N/A"}</div>
      <div className="grid gap-4 md:grid-cols-3">{plans.map((p) => <form key={p.id} action="/api/billing/checkout" method="post" className="card"><h2 className="text-xl">{p.name}</h2><p>${(p.priceMonthly/100).toFixed(0)}/mo</p><input type="hidden" name="planId" value={p.id} /><button className="mt-3 rounded bg-indigo-600 px-3 py-2">Choose plan</button></form>)}</div>
    </div>
  );
}
