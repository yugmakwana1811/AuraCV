# AuraCV Platform

Production-ready monorepo implementation of AuraCV: AI SaaS resume analyzer with JWT auth, resume upload + parsing, ATS scoring, AI suggestions, job matching, Stripe subscriptions, admin analytics, Redis caching, S3 storage, premium Next.js UI, and Dockerized infrastructure.

## Folder Structure

```text
.
├── apps
│   ├── api                      # NestJS + Prisma + PostgreSQL backend
│   │   ├── prisma
│   │   │   └── schema.prisma
│   │   ├── src
│   │   │   ├── auth
│   │   │   ├── resume
│   │   │   ├── analysis
│   │   │   ├── billing
│   │   │   ├── dashboard
│   │   │   ├── admin
│   │   │   ├── prisma
│   │   │   ├── storage
│   │   │   └── common
│   │   └── Dockerfile
│   └── web                      # Next.js 14+ TypeScript frontend
│       ├── src
│       │   ├── app
│       │   │   ├── auth
│       │   │   ├── dashboard
│       │   │   ├── pricing
│       │   │   └── admin
│       │   ├── components
│       │   └── lib
│       └── Dockerfile
├── .github/workflows/ci.yml
├── docker-compose.yml
├── package.json
└── .env.example
```

## Setup Guide

1. Install dependencies:

```bash
npm ci
```

2. Configure env files:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

3. Start backend dependencies (Postgres, Redis, MinIO) + apps:

```bash
docker compose up --build
```

4. Run Prisma migrations in API container shell (first boot):

```bash
docker compose exec api npm run prisma:migrate
```

5. Open apps:

- Web: `http://localhost:3000`
- API: `http://localhost:4000/api`
- MinIO Console: `http://localhost:9001`

## Local Dev (Without Docker Build)

Run infra only:

```bash
docker compose up postgres redis minio minio-setup
```

Then run services:

```bash
npm run dev:api
npm run dev:web
```

## Feature Coverage

- Auth system: signup/login/JWT/me/protected routes
- Resume upload: PDF/DOCX validation (<5MB), text extraction, S3 upload, DB persistence
- ATS scoring: score 0-100 + skills/experience/education + suggestions
- AI engine: OpenAI response with deterministic fallback and <5s timeout
- Job matching: score 0-100 + missing keywords list
- Subscriptions: Stripe checkout + webhook updates
- Dashboard: resume history + analytics + Redis cache
- Admin: users, analytics, payment visibility (role-protected)
- 3D UI: lazy-loaded R3F hero scene, dynamic lighting, motion-enabled interface

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) executes:

1. Install dependencies
2. Prisma client generation
3. Monorepo build (`api` + `web`)
4. API e2e test suite

## Deployment Steps

1. Set production secrets in your deployment platform:
   `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, DB credentials, JWT secret, S3 keys.
2. Deploy API service (`apps/api`) and run:
   `npm run prisma:generate && npm run prisma:migrate && npm run start:prod`
3. Deploy web service (`apps/web`) with:
   `NEXT_PUBLIC_API_URL=https://<api-domain>/api`
4. Configure Stripe webhook endpoint:
   `POST https://<api-domain>/api/billing/webhook`
5. Confirm health:
   `GET https://<api-domain>/api/health`
