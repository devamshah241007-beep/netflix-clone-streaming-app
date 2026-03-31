import Link from "next/link";

const sections = [
  "Problem: launching stores is slow and expensive",
  "Solution: one product photo becomes a live storefront",
  "How it works: upload → AI generate → edit → publish",
  "AI features: image understanding, pricing, ads, mockups",
  "Supplier ecosystem: onboarding + catalog sync",
  "Pricing teaser: Basic / Normal / Advance",
  "Testimonials placeholder",
  "FAQ",
  "CTA footer"
];

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="card bg-gradient-to-br from-indigo-900/30 to-slate-900">
        <p className="text-sm uppercase tracking-wider text-indigo-300">AI-first ecommerce</p>
        <h1 className="mt-2 text-4xl font-bold">From one product photo to a complete store in minutes.</h1>
        <p className="mt-3 max-w-2xl text-slate-300">Diverse automates product copy, pricing, landing pages, and ad creatives so retailers launch faster than Shopify-style manual workflows.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/signup" className="rounded-lg bg-indigo-600 px-4 py-2">Start 4-month trial</Link>
          <Link href="/create-store" className="rounded-lg border border-slate-700 px-4 py-2">Generate my store</Link>
        </div>
      </section>
      <section className="grid gap-3 md:grid-cols-2">
        {sections.map((s) => (
          <div key={s} className="card text-slate-300">{s}</div>
        ))}
      </section>
    </div>
  );
}
