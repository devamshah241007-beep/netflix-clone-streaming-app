import { prisma } from "@/lib/db/prisma";

export default async function AdminDashboardPage() {
  const [users, suppliers, stores, plans] = await Promise.all([
    prisma.user.count(), prisma.supplierProfile.count(), prisma.store.count(), prisma.plan.count()
  ]);
  return <div className="space-y-4"><h1 className="text-3xl font-semibold">Admin Dashboard</h1><div className="grid md:grid-cols-4 gap-3"><div className="card">Users: {users}</div><div className="card">Suppliers: {suppliers}</div><div className="card">Stores: {stores}</div><div className="card">Plans: {plans}</div></div></div>;
}
