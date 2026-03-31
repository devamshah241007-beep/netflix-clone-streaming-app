"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const response = await signIn("credentials", { email, password, redirect: false });
    if (response?.error) return setError("Invalid credentials");
    router.push("/dashboard");
  }

  return (
    <form action={onSubmit} className="card mx-auto max-w-md space-y-3">
      <h1 className="text-2xl font-semibold">Login</h1>
      <input name="email" type="email" required placeholder="Email" className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
      <input name="password" type="password" required placeholder="Password" className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
      {error && <p className="text-red-400">{error}</p>}
      <button className="rounded bg-indigo-600 px-4 py-2">Login</button>
    </form>
  );
}
