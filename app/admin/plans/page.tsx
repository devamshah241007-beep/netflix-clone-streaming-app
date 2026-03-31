import { prisma } from "@/lib/db/prisma";

export default async function AdminPlansPage() {
  const plans = await prisma.plan.findMany({ orderBy: { priceMonthly: "asc" } });
  return <div className="space-y-3"><h1 className="text-3xl font-semibold">Admin: Plans & AI limits</h1>{plans.map((p) => <div className="card" key={p.id}>{p.name} · AI limit {p.generationsLimit}/mo · stores {p.storesLimit}</div>)}</div>;
}
