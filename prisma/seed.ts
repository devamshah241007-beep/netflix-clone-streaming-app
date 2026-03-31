import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const plans = [
    {
      name: "Basic",
      description: "Entry plan for solo retailers",
      priceMonthly: 2900,
      storesLimit: 3,
      productsLimit: 30,
      generationsLimit: 80,
      features: ["AI product generation", "Basic editor", "Email support"]
    },
    {
      name: "Normal",
      description: "Growth plan for scaling retailers",
      priceMonthly: 7900,
      storesLimit: 15,
      productsLimit: 300,
      generationsLimit: 500,
      features: ["Advanced generation", "Brand kit", "Priority support"]
    },
    {
      name: "Advance",
      description: "Premium plan with max automation",
      priceMonthly: 19900,
      storesLimit: 100,
      productsLimit: 5000,
      generationsLimit: 5000,
      features: ["Unlimited creative packs", "Team seats", "Premium AI limits"]
    }
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: plan,
      create: plan
    });
  }

  console.log("Seeded plans");
}

main().finally(async () => prisma.$disconnect());
