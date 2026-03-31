import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/guards/auth";

const schema = z.object({
  product: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    pricingSuggestion: z.number(),
    compareAtPrice: z.number(),
    targetAudience: z.string(),
    benefits: z.array(z.string()),
    adHeadlines: z.array(z.string()),
    adPrimaryText: z.array(z.string()),
    socialCaptions: z.array(z.string()),
    mockupConcepts: z.array(z.string())
  }),
  store: z.object({
    name: z.string(),
    heroSectionCopy: z.string(),
    valueProposition: z.string(),
    trustCopy: z.string(),
    testimonialsPlaceholders: z.array(z.string()),
    faq: z.any(),
    ctaCopy: z.string(),
    storeThemeSuggestion: z.string(),
    brandColorSuggestion: z.string()
  })
});

export async function GET() {
  const user = await requireUser();
  const stores = await prisma.store.findMany({ where: { userId: user.id }, include: { product: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(stores);
}

export async function POST(req: Request) {
  const user = await requireUser();
  const data = schema.parse(await req.json());
  const slug = `${data.store.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`;

  const created = await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        userId: user.id,
        title: data.product.title,
        description: data.product.description,
        shortDescription: data.product.shortDescription,
        targetAudience: data.product.targetAudience,
        benefits: data.product.benefits,
        pricingSuggestion: data.product.pricingSuggestion,
        compareAtPrice: data.product.compareAtPrice,
        adHeadlines: data.product.adHeadlines,
        adPrimaryText: data.product.adPrimaryText,
        socialCaptions: data.product.socialCaptions,
        mockupPrompts: data.product.mockupConcepts
      }
    });

    const store = await tx.store.create({
      data: {
        userId: user.id,
        productId: product.id,
        name: data.store.name,
        slug,
        heroCopy: data.store.heroSectionCopy,
        valueProposition: data.store.valueProposition,
        trustCopy: data.store.trustCopy,
        testimonials: data.store.testimonialsPlaceholders,
        faq: data.store.faq,
        cta: data.store.ctaCopy,
        themeSuggestion: data.store.storeThemeSuggestion,
        brandColors: data.store.brandColorSuggestion
      }
    });

    await tx.usageMetrics.upsert({
      where: { userId_month: { userId: user.id, month: new Date().toISOString().slice(0, 7) } },
      update: { storesCreated: { increment: 1 }, productsCreated: { increment: 1 } },
      create: { userId: user.id, month: new Date().toISOString().slice(0, 7), storesCreated: 1, productsCreated: 1 }
    });

    return store;
  });

  return NextResponse.json(created);
}
