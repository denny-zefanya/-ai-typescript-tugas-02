CREATE TABLE "StockResearch" (
    "id" SERIAL NOT NULL,
    "symbols" TEXT NOT NULL,
    "market" TEXT NOT NULL,
    "budget" TEXT,
    "riskProfile" TEXT NOT NULL,
    "investmentHorizon" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "resultMarkdown" TEXT,
    "evaluatorResult" TEXT,
    "reportPath" TEXT,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockResearch_pkey" PRIMARY KEY ("id")
);
