# Feature: Security & Authentication

**Docx ref:** §10, §11  
**Phase:** 1  
**Repos:** datt-ai-frontend, datt-ai-backend

---

## Objective

Secure the platform: protect candidate data, validate uploads, and restrict admin access via Supabase Auth.

## Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| Secure resume upload | Server-side type + size validation, stored outside public web root |
| Validate file types | PDF, DOC, DOCX only |
| Validate file size | Max 5 MB |
| Protect candidate data | Admin-only access to applications and resumes |
| Admin authentication | Supabase Auth (email/password, invite-only) |
| Spam protection | reCAPTCHA on application form |
| CORS | Backend allows only `FRONTEND_URL` |

## Auth Architecture

```text
Candidate → Public routes (no auth)
Admin → Supabase login → JWT → Backend validates on /admin/*
```

### Supabase Setup

- Disable public signups
- Create admin users manually
- Roles in user metadata: `HR`, `TECH`, `ADMIN`

### Backend

- `SupabaseAuthGuard` on all `/admin/*` routes
- `RolesGuard` for role-specific actions
- Never expose service role key to frontend

### Frontend

- `@supabase/supabase-js` for admin login/session
- Attach `access_token` to admin API requests
- Redirect unauthenticated users from `/admin/*`

## Role Permissions

| Action | HR | TECH | ADMIN |
|--------|----|------|-------|
| Manage jobs | Yes | No | Yes |
| View applications | Yes | Yes | Yes |
| Update status | Yes | Yes | Yes |
| Download resume | Yes | Yes | Yes |
| Send interview email | Yes | No | Yes |
| Send offer letter | Yes | No | Yes |

## Acceptance Criteria

- [ ] Public cannot access `/admin/*` API without valid JWT
- [ ] Invalid/expired token returns 401
- [ ] Wrong role returns 403
- [ ] Resume upload rejects invalid types and oversized files
- [ ] reCAPTCHA verified server-side
- [ ] CORS blocks unknown origins

## Backend Files

- `src/auth/supabase-auth.guard.ts`
- `src/auth/roles.guard.ts`
- `src/auth/roles.decorator.ts`
- `src/file-upload/file-validation.pipe.ts`

## Frontend Files

- `src/auth/supabaseClient.ts`
- `src/auth/useSupabaseAuth.ts`
- `src/auth/AdminAuthGuard.tsx`

## Environment

**Backend:** `SUPABASE_URL`, `SUPABASE_JWT_SECRET`, `RECAPTCHA_SECRET_KEY`  
**Frontend:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_RECAPTCHA_SITE_KEY`

## Edge Cases

- Token refresh during long admin session — Supabase auto-refresh handled by client
- Brute force login — rely on Supabase rate limiting
- Direct URL access to resume file — must go through authenticated API
