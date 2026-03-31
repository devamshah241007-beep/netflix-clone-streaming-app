import { prisma } from "@/lib/db/prisma";

export default async function PricingPage() {
  const plans = await prisma.plan.findMany({ orderBy: { priceMonthly: "asc" } });

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-semibold">Simple plans for every growth stage</h1>
        <p className="mt-2 text-slate-300">All plans include a 4-month free trial for first-time retailers.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.id} className="card">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-3xl font-bold">${(plan.priceMonthly / 100).toFixed(0)}<span className="text-sm text-slate-400">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>Stores: {plan.storesLimit}</li>
              <li>Products: {plan.productsLimit}</li>
              <li>AI generations: {plan.generationsLimit}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
