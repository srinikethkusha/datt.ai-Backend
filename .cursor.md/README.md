# Datt.ai Backend

NestJS REST API for the Datt.ai Job Posting & Candidate Application platform.

## Related Repos

| Repo | Purpose |
|------|---------|
| **datt-ai-frontend** | React careers + admin UI |
| **datt-ai-backend** (this repo) | API, database, email, file upload |

## Tech Stack

- NestJS 10
- Prisma + PostgreSQL
- Supabase JWT validation (admin routes)
- SendGrid or SMTP (email)
- Multer (resume upload)

## Prerequisites

- Node.js 20+
- PostgreSQL
- Supabase project (admin auth)

## Setup

```bash
npm install
cp .env.example .env
# Fill in DATABASE_URL, Supabase secrets, email config

npm run db:generate-schema
npm run db:migrate
npm run start:dev
```

API runs at `http://localhost:3000` by default.

## Environment Variables

See `.env.example` for all required variables.

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Module layout and patterns |
| [docs/API.md](docs/API.md) | REST endpoint contract |
| [docs/SUPABASE-AUTH.md](docs/SUPABASE-AUTH.md) | Admin JWT validation |
| [docs/product-requirements/](docs/product-requirements/) | PRDs — read before coding |

## Development Rules

1. Read the relevant PRD in `docs/product-requirements/` before implementing a feature.
2. Follow existing NestJS patterns: `module → controller → service → repository → DTO`.
3. Use `class-validator` on all DTOs.
4. Public routes: no auth. Admin routes: Supabase JWT + role guard.

## Source Template

Scaffolded from `database-cons` (NestJS + Prisma). E-commerce demo modules (User/Product/Order) will be replaced with job posting domain in Phase 1.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Dev server with watch |
| `npm run build` | Production build |
| `npm run test` | Unit tests |
| `npm run test:e2e` | E2E tests |
| `npm run db:migrate` | Run Prisma migrations |
