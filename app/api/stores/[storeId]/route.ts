import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/guards/auth";

export async function GET(_: Request, { params }: { params: { storeId: string } }) {
  try {
    const user = await requireUser();
    const store = await prisma.store.findFirst({ where: { id: params.storeId, userId: user.id }, include: { product: true } });
    if (!store) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(store);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const user = await requireUser();
    const body = await req.json();

    const existing = await prisma.store.findFirst({
      where: { id: params.storeId, userId: user.id },
      select: { id: true }
    });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const store = await prisma.store.update({ where: { id: existing.id }, data: body });
    return NextResponse.json(store);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
