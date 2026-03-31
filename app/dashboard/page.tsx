import Link from "next/link";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return <div className="card">Please login.</div>;

  const [stores, products, metrics, sub, trial] = await Promise.all([
    prisma.store.count({ where: { userId: session.user.id } }),
    prisma.product.count({ where: { userId: session.user.id } }),
    prisma.usageMetrics.findFirst({ where: { userId: session.user.id }, orderBy: { month: "desc" } }),
    prisma.subscription.findFirst({ where: { userId: session.user.id }, include: { plan: true }, orderBy: { createdAt: "desc" } }),
    prisma.trial.findFirst({ where: { userId: session.user.id, active: true }, orderBy: { startDate: "desc" } })
  ]);

  const trialDaysLeft = trial ? Math.max(0, Math.ceil((trial.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Retailer Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="card">Stores created: {stores}</div>
        <div className="card">Products: {products}</div>
        <div className="card">AI generations used: {metrics?.aiGenerations || 0}</div>
        <div className="card">Plan: {sub?.plan.name || "Trial"} ({trialDaysLeft} days left)</div>
      </div>
      <div className="flex gap-3">
        <Link href="/create-store" className="rounded bg-indigo-600 px-4 py-2">Create AI Store</Link>
        <Link href="/my-stores" className="rounded border border-slate-700 px-4 py-2">My Stores</Link>
      </div>
    </div>
  );
}
