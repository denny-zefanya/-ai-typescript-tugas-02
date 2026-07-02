import { createCompletion } from "@anvia/core";
import { getClient } from "../../utils/openai-config.js";

export async function generateStockPerspective(
  context: string,
  instructions: string,
) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required to generate stock research");
  }

  const client = getClient({ apiKey: OPENAI_API_KEY });
  const model = client.completionModel("gpt-5.4-nano-2026-03-17");
  const response = await createCompletion(model, {
    instructions,
    input: context,
    maxTokens: 2500,
  });

  return response.text;
}
