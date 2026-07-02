import { Worker } from "bullmq";
import { STOCK_RESEARCH_QUEUE_NAME, connection } from "./utils/queue-config.js";
import "dotenv/config";
import { prisma } from "./utils/prisma.js";
import { mkdir } from "node:fs/promises";
import { writeMarkdownPdf } from "./utils/markdown-pdf.js";
import {
  getStockEvaluatorPrompt,
  getStockRiskPrompt,
  getStockSummaryPrompt,
} from "./modules/stock-research/prompts.js";
import { generateStockPerspective } from "./modules/stock-research/services.js";

export const stockWorker = new Worker(
  STOCK_RESEARCH_QUEUE_NAME,
  async (job) => {
    const context = `
Stock Symbols: ${job.data.symbols}
Market: ${job.data.market}
Budget: ${job.data.budget ?? "-"}
Risk Profile: ${job.data.riskProfile}
Investment Horizon: ${job.data.investmentHorizon}
Additional Info: ${job.data.additionalInfo ?? "-"}
`;

    const currentDate = new Date().toISOString();
    const summary = await generateStockPerspective(
      context,
      getStockSummaryPrompt(currentDate),
    );
    const riskReview = await generateStockPerspective(
      context,
      getStockRiskPrompt(currentDate),
    );
    const finalReport = `${summary}\n\n${riskReview}`;
    const evaluatorResult = await generateStockPerspective(
      finalReport,
      getStockEvaluatorPrompt(currentDate),
    );

    await mkdir("reports/stocks", { recursive: true });
    const filePath = `reports/stocks/${job.data.id}.pdf`;

    try {
      await writeMarkdownPdf(`${finalReport}\n\n${evaluatorResult}`, filePath);
      await prisma.stockResearch.update({
        where: {
          id: job.data.id,
        },
        data: {
          resultMarkdown: finalReport,
          evaluatorResult,
          reportPath: filePath,
          isDone: true,
        },
      });
      console.log(`Stock report generated at ${filePath}`);
    } catch (error) {
      console.error(`Failed to generate stock report at ${filePath}`, error);
      throw error;
    }
  },
  {
    connection,
  },
);

stockWorker.on("completed", (job) => {
  console.log(`Stock job ${job.id} completed`);
});

stockWorker.on("failed", (job, error) => {
  console.error(`Stock job ${job?.id ?? "unknown"} failed`, error);
});

stockWorker.on("error", (error) => {
  console.error("Stock worker error", error);
});
