export const systemPrompt = `You are Diverse AI, an ecommerce launch strategist. Return strict JSON only.`;

export function generationPrompt(language: string) {
  return `Generate ecommerce launch pack in ${language}. Return JSON with keys: productName, productDescription, shortDescription, pricingSuggestion, compareAtPrice, targetAudience, benefits, storeThemeSuggestion, brandColorSuggestion, ctaCopy, heroSectionCopy, faq, adHeadlines, adPrimaryText, socialCaptions, mockupConcepts, valueProposition, trustCopy, testimonialsPlaceholders.`;
}

export const fallbackGeneration = {
  productName: "Premium Lifestyle Product",
  productDescription: "A high-converting product crafted for daily use.",
  shortDescription: "Designed for performance and comfort.",
  pricingSuggestion: 49,
  compareAtPrice: 79,
  targetAudience: "Young professionals",
  benefits: ["Durable", "Stylish", "Easy to use"],
  storeThemeSuggestion: "Minimal modern",
  brandColorSuggestion: "#4F46E5",
  ctaCopy: "Shop Now",
  heroSectionCopy: "Upgrade your everyday with one smart product.",
  faq: [
    { q: "How long is shipping?", a: "5-8 business days." },
    { q: "Is there a guarantee?", a: "30-day satisfaction guarantee." }
  ],
  adHeadlines: ["Your next bestseller", "Launch in minutes"],
  adPrimaryText: ["AI-built store from one photo.", "Start selling today with Diverse."],
  socialCaptions: ["From photo to profitable store in minutes."],
  mockupConcepts: ["Clean product-on-desk hero image with soft daylight"],
  valueProposition: "Fastest path from product idea to revenue.",
  trustCopy: "Trusted checkout, secure payments, fast support.",
  testimonialsPlaceholders: ["\"Sales grew 38% in week one\" — Early user"]
};
