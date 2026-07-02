import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { StockResearchRequestSchema } from "./schema.js";
import { aiStockResearchQueue } from "../../utils/queue.js";
import { prisma } from "../../utils/prisma.js";

export const stockResearchRouter = new Hono()
  .get("/", async (c) => {
    const researches = await prisma.stockResearch.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.json(researches);
  })
  .get("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const research = await prisma.stockResearch.findUnique({
      where: {
        id,
      },
    });

    if (!research) {
      return c.json({ message: "Stock research not found" }, 404);
    }

    return c.json(research);
  })
  .post("/", zValidator("json", StockResearchRequestSchema), async (c) => {
    const body = c.req.valid("json");

    const newResearch = await prisma.stockResearch.create({
      data: {
        symbols: body.symbols.join(", "),
        market: body.market,
        budget: body.budget,
        riskProfile: body.riskProfile,
        investmentHorizon: body.investmentHorizon,
        additionalInfo: body.additionalInfo,
      },
    });

    await aiStockResearchQueue.add("stock-research", newResearch);

    return c.json({
      message: "Stock research is on queue",
      researchId: newResearch.id,
    });
  });
