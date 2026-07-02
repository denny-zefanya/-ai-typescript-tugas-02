import { Queue } from "bullmq";
import { connection, STOCK_RESEARCH_QUEUE_NAME } from "./queue-config.js";

export const aiStockResearchQueue = new Queue(STOCK_RESEARCH_QUEUE_NAME, {
  connection,
});
