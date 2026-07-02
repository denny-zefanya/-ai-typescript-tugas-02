# Stock Research Endpoint

Simple API untuk membuat analisis saham potensial dibeli menggunakan Hono, Prisma, BullMQ, Redis, dan AI worker.

## Setup

Copy `.env.example` menjadi `.env`, lalu isi `OPENAI_API_KEY`.

```
pnpm install
docker compose up -d
pnpm exec prisma migrate deploy
pnpm dev
```

Run worker di terminal kedua:

```
pnpm worker:dev
```

## API

Create stock research job:

```
POST http://localhost:8000/stock-research
Content-Type: application/json

{
  "symbols": ["BBCA", "BMRI", "TLKM"],
  "market": "Indonesia",
  "budget": "Rp10.000.000",
  "riskProfile": "moderate",
  "investmentHorizon": "6-12 months",
  "additionalInfo": "Cari saham blue chip yang masih menarik untuk dibeli bertahap"
}
```

Check results:

```
GET http://localhost:8000/stock-research
GET http://localhost:8000/stock-research/1
```
