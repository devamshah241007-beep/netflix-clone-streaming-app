import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";

export default async function MyStoresPage() {
  const session = await auth();
  if (!session?.user?.id) return <div className="card">Login required.</div>;

  const stores = await prisma.store.findMany({ where: { userId: session.user.id }, include: { product: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">My Stores</h1>
      {stores.length === 0 ? <div className="card">No stores yet.</div> : stores.map((s) => (
        <Link key={s.id} href={`/store-editor/${s.id}`} className="card block">
          <h2 className="text-xl">{s.name}</h2>
          <p className="text-slate-300">{s.product?.shortDescription}</p>
          <p className="text-xs">Status: {s.status}</p>
        </Link>
      ))}
    </div>
  );
}
