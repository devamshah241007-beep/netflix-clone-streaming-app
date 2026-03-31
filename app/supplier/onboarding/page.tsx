"use client";

import { useState } from "react";

export default function SupplierOnboardingPage() {
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch("/api/supplier/onboarding", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setMessage(res.ok ? "Onboarding saved" : "Failed");
  }

  return (
    <form action={onSubmit} className="card space-y-2 max-w-2xl">
      <h1 className="text-3xl font-semibold">Supplier Onboarding</h1>
      <input name="businessName" required placeholder="Business name" className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
      <textarea name="shippingInfo" placeholder="Shipping info" className="h-20 w-full rounded border border-slate-700 bg-slate-950 p-2" />
      <input name="deliveryZones" placeholder="Delivery zones" className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
      <input name="payoutMethod" placeholder="Payout method" className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
      <button className="rounded bg-indigo-600 px-4 py-2">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}
