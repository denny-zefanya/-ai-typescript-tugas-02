import z from "zod";

export const StockResearchRequestSchema = z.object({
  symbols: z.array(z.string().min(1)).min(1),
  market: z.string().min(1).default("Indonesia"),
  budget: z.string().optional(),
  riskProfile: z.string().min(1).default("moderate"),
  investmentHorizon: z.string().min(1).default("6-12 months"),
  additionalInfo: z.string().optional(),
});
