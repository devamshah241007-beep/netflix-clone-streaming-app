import OpenAI from "openai";
import { fallbackGeneration, generationPrompt, systemPrompt } from "@/lib/ai/prompts";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateStorePack(input: { imageUrl: string; details?: string; language?: string }) {
  const language = input.language || "English";

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: systemPrompt }]
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: generationPrompt(language) },
            { type: "input_text", text: `Retailer extra details: ${input.details || "Not provided"}` },
            { type: "input_image", image_url: input.imageUrl }
          ]
        }
      ],
      text: { format: { type: "json_object" } }
    });

    const raw = response.output_text;
    return JSON.parse(raw);
  } catch {
    return { ...fallbackGeneration, missingInfoQuestions: ["Please confirm material, size, and shipping origin."] };
  }
}
