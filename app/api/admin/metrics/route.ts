import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const [users, suppliers, stores, generations] = await Promise.all([
    prisma.user.count(),
    prisma.supplierProfile.count(),
    prisma.store.count(),
    prisma.aIGeneration.count()
  ]);
  return NextResponse.json({ users, suppliers, stores, generations });
}
