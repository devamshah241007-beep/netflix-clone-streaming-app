"use client";

import { useEffect, useState } from "react";

export default function StoreEditorPage({ params }: { params: Promise<{ storeId: string }> }) {
  const [storeId, setStoreId] = useState("");
  const [data, setData] = useState<any>(null);

  useEffect(() => { params.then((p) => setStoreId(p.storeId)); }, [params]);
  useEffect(() => {
    if (!storeId) return;
    fetch(`/api/stores/${storeId}`).then((r) => r.json()).then(setData);
  }, [storeId]);

  async function save() {
    await fetch(`/api/stores/${storeId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    alert("Saved");
  }

  async function publish() {
    await fetch(`/api/stores/${storeId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "PUBLISHED" }) });
    alert("Published");
  }

  if (!data) return <div className="card">Loading editor...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Store Editor</h1>
      <div className="card space-y-2">
        <label>Store name</label>
        <input value={data.name || ""} onChange={(e) => setData({ ...data, name: e.target.value })} className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
        <label>Hero copy</label>
        <textarea value={data.heroCopy || ""} onChange={(e) => setData({ ...data, heroCopy: e.target.value })} className="h-24 w-full rounded border border-slate-700 bg-slate-950 p-2" />
        <label>CTA</label>
        <input value={data.cta || ""} onChange={(e) => setData({ ...data, cta: e.target.value })} className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
        <div className="flex gap-3">
          <button onClick={save} className="rounded bg-indigo-600 px-4 py-2">Save</button>
          <button onClick={publish} className="rounded bg-emerald-600 px-4 py-2">Publish</button>
        </div>
      </div>
    </div>
  );
}
