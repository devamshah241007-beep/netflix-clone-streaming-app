import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/guards/auth";
import { generateStorePack } from "@/lib/ai/generate";
import { prisma } from "@/lib/db/prisma";

const schema = z.object({ imageUrl: z.string().url(), details: z.string().optional(), regenerate: z.boolean().optional() });

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = schema.parse(await req.json());

    const payload = await generateStorePack({ imageUrl: body.imageUrl, details: body.details });

    await prisma.aIGeneration.create({
      data: {
        userId: user.id,
        inputImageUrl: body.imageUrl,
        promptVersion: "v1",
        generationType: body.regenerate ? "store_pack_regenerate" : "store_pack_initial",
        payload
      }
    });

    const usageMonth = new Date().toISOString().slice(0, 7);
    await prisma.usageMetrics.upsert({
      where: { userId_month: { userId: user.id, month: usageMonth } },
      update: { aiGenerations: { increment: 1 } },
      create: { userId: user.id, month: usageMonth, aiGenerations: 1 }
    });

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: "Generation failed", detail: `${error}` }, { status: 400 });
  }
}
