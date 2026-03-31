"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Generation = Record<string, any>;

export default function CreateStorePage() {
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [externalImageUrl, setExternalImageUrl] = useState("");
  const [details, setDetails] = useState("");
  const [gen, setGen] = useState<Generation | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  async function upload(file: File) {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    setImageUrl(data.url);
    setUploading(false);
  }

  async function generate(regenerate = false) {
    setGenerating(true);
    setError("");
    const sourceImageUrl = externalImageUrl || imageUrl;
    if (!sourceImageUrl) {
      setError("Please upload a product image or provide an image URL.");
      setGenerating(false);
      return;
    }
    const res = await fetch("/api/retailer/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: sourceImageUrl.startsWith("http") ? sourceImageUrl : `${location.origin}${sourceImageUrl}`,
        details,
        regenerate
      })
    });
    if (!res.ok) {
      setError("AI generation failed. Try adding more product details.");
      setGenerating(false);
      return;
    }
    setGen(await res.json());
    setGenerating(false);
  }

  async function createStore() {
    if (!gen) return;
    const payload = {
      product: {
        title: gen.productName,
        description: gen.productDescription,
        shortDescription: gen.shortDescription,
        pricingSuggestion: Number(gen.pricingSuggestion || 0),
        compareAtPrice: Number(gen.compareAtPrice || 0),
        targetAudience: gen.targetAudience || "",
        benefits: gen.benefits || [],
        adHeadlines: gen.adHeadlines || [],
        adPrimaryText: gen.adPrimaryText || [],
        socialCaptions: gen.socialCaptions || [],
        mockupConcepts: gen.mockupConcepts || []
      },
      store: {
        name: gen.productName || "Untitled Store",
        heroSectionCopy: gen.heroSectionCopy || "",
        valueProposition: gen.valueProposition || "",
        trustCopy: gen.trustCopy || "",
        testimonialsPlaceholders: gen.testimonialsPlaceholders || [],
        faq: gen.faq || [],
        ctaCopy: gen.ctaCopy || "Shop now",
        storeThemeSuggestion: gen.storeThemeSuggestion || "",
        brandColorSuggestion: gen.brandColorSuggestion || ""
      }
    };

    const res = await fetch("/api/stores", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const created = await res.json();
    router.push(`/store-editor/${created.id}`);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">AI Store Generator</h1>
      <div className="card space-y-3">
        <p className="text-sm text-slate-300">Add a product image either by direct upload or by pasting a hosted image URL.</p>
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        <input
          type="url"
          value={externalImageUrl}
          onChange={(e) => setExternalImageUrl(e.target.value)}
          placeholder="https://example.com/product-image.jpg"
          className="w-full rounded border border-slate-700 bg-slate-950 p-2"
        />
        {uploading && <p>Uploading image...</p>}
        {!externalImageUrl && imageUrl && <img src={imageUrl} alt="product" className="max-h-64 rounded" />}
        {externalImageUrl && <p className="text-xs text-slate-400">Using external image URL for AI analysis.</p>}
        <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Optional details (material, category, price range)" className="h-24 w-full rounded border border-slate-700 bg-slate-950 p-2" />
        <div className="flex gap-3">
          <button disabled={(!imageUrl && !externalImageUrl) || generating} onClick={() => generate(false)} className="rounded bg-indigo-600 px-4 py-2">{generating ? "Generating..." : "Generate store pack"}</button>
          <button disabled={!gen || generating} onClick={() => generate(true)} className="rounded border border-slate-700 px-4 py-2">Retry / Regenerate</button>
        </div>
        {error && <p className="text-red-400">{error}</p>}
      </div>

      {gen && (
        <div className="card space-y-2">
          <h2 className="text-2xl font-semibold">Generated output</h2>
          <pre className="overflow-auto rounded bg-slate-950 p-3 text-xs text-slate-300">{JSON.stringify(gen, null, 2)}</pre>
          <button onClick={createStore} className="rounded bg-emerald-600 px-4 py-2">Create store from this generation</button>
        </div>
      )}
    </div>
  );
}
