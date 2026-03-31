import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(["RETAILER", "SUPPLIER"]).default("RETAILER")
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return NextResponse.json({ error: "Email already used" }, { status: 409 });

  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      role: parsed.data.role,
      passwordHash: await hashPassword(parsed.data.password),
      retailerProfile: parsed.data.role === "RETAILER" ? { create: {} } : undefined,
      supplierProfile: parsed.data.role === "SUPPLIER" ? { create: { businessName: parsed.data.name } } : undefined,
      trials: { create: { endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 4) } }
    }
  });

  return NextResponse.json({ id: user.id, email: user.email, role: user.role });
}
