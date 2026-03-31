import { NextResponse } from "next/server";
import { requireUser } from "@/lib/guards/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const user = await requireUser();
  const body = await req.json();
  const profile = await prisma.supplierProfile.upsert({
    where: { userId: user.id },
    update: { ...body, onboardingDone: true },
    create: { userId: user.id, businessName: body.businessName, ...body, onboardingDone: true }
  });
  return NextResponse.json(profile);
}
