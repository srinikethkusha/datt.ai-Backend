# API Contract

Base URL: `http://localhost:3000` (dev)

All admin routes require `Authorization: Bearer <supabase_access_token>`.

---

## Public Endpoints

### Jobs

| Method | Path | Description |
|--------|------|-------------|
| GET | `/jobs` | List active jobs (status=ACTIVE, not past deadline) |
| GET | `/jobs/:id` | Job detail |

### Applications

| Method | Path | Description |
|--------|------|-------------|
| POST | `/applications` | Submit application (multipart: form + resume) |

**POST /applications body (multipart/form-data):**

| Field | Type | Required |
|-------|------|----------|
| jobId | string | Yes |
| fullName | string | Yes |
| email | string | Yes |
| phone | string | Yes |
| location | string | Yes |
| yearsOfExperience | number | Yes |
| skills | string | Yes |
| linkedIn | string | No |
| portfolio | string | No |
| coverLetter | string | No |
| resume | file | Yes (PDF/DOC/DOCX, max 5MB) |
| captchaToken | string | Yes |

---

## Admin Endpoints

### Jobs

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/admin/jobs` | HR, ADMIN | List all jobs (with filters) |
| POST | `/admin/jobs` | HR, ADMIN | Create job |
| GET | `/admin/jobs/:id` | HR, ADMIN | Job detail |
| PUT | `/admin/jobs/:id` | HR, ADMIN | Update job |
| PATCH | `/admin/jobs/:id/status` | HR, ADMIN | Activate/deactivate |

### Applications

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/admin/applications` | HR, TECH, ADMIN | List/filter applications |
| GET | `/admin/applications/:id` | HR, TECH, ADMIN | Application detail |
| PATCH | `/admin/applications/:id/status` | HR, TECH, ADMIN | Update pipeline stage |
| GET | `/admin/applications/:id/resume` | HR, TECH, ADMIN | Download resume |
| POST | `/admin/applications/:id/send-interview` | HR, ADMIN | Send interview email |
| POST | `/admin/applications/:id/send-offer` | HR, ADMIN | Send offer letter + PDF |

---

## Response Conventions

- `200` — Success
- `201` — Created
- `400` — Validation error
- `401` — Missing/invalid token
- `403` — Insufficient role
- `404` — Not found
- `413` — File too large
- `500` — Server error

## CORS

Allowed origin: `FRONTEND_URL` env variable.
