import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/guards/auth";

export async function GET(_: Request, { params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params;
  const user = await requireUser();
  const store = await prisma.store.findFirst({ where: { id: storeId, userId: user.id }, include: { product: true } });
  if (!store) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(store);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params;
  const user = await requireUser();
  const body = await req.json();
  const store = await prisma.store.update({ where: { id: storeId, userId: user.id }, data: body });
  return NextResponse.json(store);
}
