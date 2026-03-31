import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireUser } from "@/lib/guards/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const user = await requireUser();
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), buffer);

  const url = `/uploads/${fileName}`;
  await prisma.uploadedAsset.create({ data: { userId: user.id, type: "product_image", url, mimeType: file.type, size: file.size } });

  return NextResponse.json({ url });
}
