# Feature: Admin Dashboard

**Docx ref:** §9  
**Phase:** 4–5  
**Repos:** datt-ai-frontend, datt-ai-backend

---

## Objective

Admin dashboard for HR to manage jobs, view applications, evaluate candidates, and send communications.

## User Stories

- As **HR**, I want a dashboard overview of hiring activity.
- As **HR**, I want to search and filter all applications.
- As **HR**, I want to download candidate resumes.
- As **HR**, I want to update candidate status and send emails.

## Admin Features

| Feature | Route |
|---------|-------|
| Dashboard overview | `/admin/dashboard` |
| Job management | `/admin/jobs` |
| Applications list | `/admin/applications` |
| Application detail | `/admin/applications/:id` |
| Admin login | `/admin/login` |

### Dashboard Widgets

- Count of active jobs
- New applications (today / this week)
- Applications by pipeline stage

### Applications List

- View all applications
- Search by name, email, skills
- Filter by job, status, date range
- Sort by application date

### Application Detail

- All candidate form fields
- Resume preview/download
- Status update
- Send interview email
- Send offer letter

## Acceptance Criteria

- [ ] Unauthenticated users redirected to `/admin/login`
- [ ] Dashboard shows accurate counts from API
- [ ] Search and filters work on applications list
- [ ] Resume downloadable by authorized admin
- [ ] Status updates persist and reflect in list
- [ ] Job CRUD accessible from admin menu
- [ ] Responsive admin layout on tablet/desktop

## Auth

Supabase session required for all `/admin/*` routes except login.

## Frontend Files

- `src/admin/pages/DashboardPage.tsx`
- `src/admin/pages/ApplicationsPage.tsx`
- `src/admin/pages/ApplicationDetailPage.tsx`
- `src/admin/pages/AdminLogin.tsx`
- `src/routes/PrivateRoutes.tsx`

## Backend Files

- Admin endpoints under `/admin/*` (see [API.md](../API.md))
- `src/auth/` — Supabase JWT guard + roles

## Edge Cases

- Empty dashboard (no jobs/applications) — show onboarding hints
- Session expired mid-action — redirect to login, preserve intent if possible
