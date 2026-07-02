import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { stockResearchRouter } from "./modules/stock-research/router.js";

const app = new Hono().route("/stock-research", stockResearchRouter);

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
