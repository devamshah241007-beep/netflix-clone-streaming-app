import { prisma } from "@/lib/db/prisma";

export default async function AdminSuppliersPage() {
  const suppliers = await prisma.supplierProfile.findMany({ include: { user: true } });
  return <div className="space-y-3"><h1 className="text-3xl font-semibold">Admin: Suppliers</h1>{suppliers.map((s) => <div className="card" key={s.id}>{s.businessName} · {s.kycStatus} · {s.user.email}</div>)}</div>;
}
