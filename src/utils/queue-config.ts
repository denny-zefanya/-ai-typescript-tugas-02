import type { ConnectionOptions } from "bullmq";

export const STOCK_RESEARCH_QUEUE_NAME = "stock-research";

export const connection: ConnectionOptions = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  db: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB) : 0,
};
