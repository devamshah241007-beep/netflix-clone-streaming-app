"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch("/api/auth/register", { method: "POST", body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } });
    if (!res.ok) {
      setError("Failed to sign up.");
      setLoading(false);
      return;
    }
    router.push("/login");
  }

  return (
    <form action={onSubmit} className="card mx-auto max-w-md space-y-3">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <input name="name" required placeholder="Name" className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
      <input name="email" type="email" required placeholder="Email" className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
      <input name="password" type="password" required placeholder="Password" className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
      <select name="role" className="w-full rounded border border-slate-700 bg-slate-950 p-2"><option value="RETAILER">Retailer</option><option value="SUPPLIER">Supplier</option></select>
      {error && <p className="text-red-400">{error}</p>}
      <button disabled={loading} className="rounded bg-indigo-600 px-4 py-2">{loading ? "Creating..." : "Sign up"}</button>
    </form>
  );
}
