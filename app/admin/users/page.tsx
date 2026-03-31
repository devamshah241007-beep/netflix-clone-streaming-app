import { prisma } from "@/lib/db/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ take: 50, orderBy: { createdAt: "desc" } });
  return <div className="space-y-3"><h1 className="text-3xl font-semibold">Admin: Users</h1>{users.map((u) => <div className="card" key={u.id}>{u.email} · {u.role} · {u.isActive ? "Active" : "Disabled"}</div>)}</div>;
}
