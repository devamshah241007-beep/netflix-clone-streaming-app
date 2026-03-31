import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";

export default async function GenerationsPage() {
  const session = await auth();
  if (!session?.user?.id) return <div className="card">Login required.</div>;
  const rows = await prisma.aIGeneration.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, take: 20 });
  return <div className="space-y-3"><h1 className="text-3xl font-semibold">AI Generations</h1>{rows.map((g) => <div key={g.id} className="card text-sm">{g.generationType} · {new Date(g.createdAt).toLocaleString()}</div>)}</div>;
}
