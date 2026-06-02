# Backend Architecture

## Overview

NestJS REST API serving the Datt.ai careers platform. Public endpoints for job listings and applications; protected admin endpoints validated via Supabase JWT.

## Module Structure

```text
src/
├── main.ts
├── app.module.ts
├── prisma/              # PrismaService (global)
├── auth/                # Supabase JWT guard, role decorator
├── job/                 # Job posting CRUD + public listing
├── application/         # Candidate applications
├── file-upload/         # Resume storage
├── email/               # HR + candidate notifications
└── common/              # Shared filters, pipes, exceptions
```

Each domain module follows:

```text
job/
├── job.module.ts
├── job.controller.ts
├── job.service.ts
├── job.repository.ts
└── job.dto.ts
```

## Database Models (Phase 1)

```text
JobPosting
  id, title, department, location, employmentType, experience,
  skills, description, salary, status, deadline, postedAt, updatedAt

Application
  id, jobId, fullName, email, phone, location, yearsOfExperience,
  skills, linkedIn, portfolio, coverLetter, resumePath,
  status, appliedAt, updatedAt
```

### Application Status Enum

```text
RECEIVED → HR_SCREENING → TECH_EVAL → INTERVIEW →
FINAL_REVIEW → OFFER_SENT → REJECTED → CLOSED
```

## Auth Flow

- **Public routes:** No authentication.
- **Admin routes:** `Authorization: Bearer <supabase_access_token>`
- Guard validates JWT with `SUPABASE_JWT_SECRET`.
- Role from `user_metadata.role`: `HR`, `TECH`, `ADMIN`.

## Patterns to Reuse

From existing `database-cons` scaffold:

- Prisma module + repository pattern
- DTO validation with `class-validator`
- Controller → Service → Repository layering

## Removed (Phase 1)

Demo e-commerce modules: `User`, `Product`, `Order`, `OrderItem`.

## External Services

| Service | Usage |
|---------|-------|
| PostgreSQL | Primary data store |
| Supabase Auth | Admin identity only |
| SendGrid / SMTP | Transactional email |
| Local / S3 storage | Resume files |
