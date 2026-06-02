# Feature: Job Posting Management (Admin Panel)

**Docx ref:** §3 (admin panel path — Google Sheets excluded)  
**Phase:** 4  
**Repos:** datt-ai-frontend, datt-ai-backend

---

## Objective

HR team posts and manages job openings via an admin panel. Active jobs automatically appear on the Careers page.

## User Stories

- As **HR**, I want to create job postings so they appear on the Careers page.
- As **HR**, I want to activate/deactivate jobs without deleting them.
- As **HR**, I want to set application deadlines for each job.

## Functional Requirements

### Admin Job Form Fields

| Field | Required |
|-------|----------|
| Job Title | Yes |
| Department | Yes |
| Location | Yes |
| Employment Type | Yes (Full-time / Part-time / Contract) |
| Experience | Yes |
| Skills | Yes |
| Job Description | Yes |
| Salary | No |
| Status | Yes (Active / Inactive) |
| Application Deadline | Yes |

### Admin Job List (`/admin/jobs`)

- List all jobs (active and inactive)
- Search by title, department, location
- Filter by status
- Actions: Create, Edit, Activate/Deactivate

## Acceptance Criteria

- [ ] HR can create a job with all required fields
- [ ] HR can edit existing jobs
- [ ] HR can set status Active/Inactive
- [ ] Active jobs appear on public Careers page immediately
- [ ] Inactive jobs do not appear publicly
- [ ] Only authenticated HR/ADMIN can access job management
- [ ] Validation errors shown on invalid input

## API

| Method | Path | Role |
|--------|------|------|
| GET | `/admin/jobs` | HR, ADMIN |
| POST | `/admin/jobs` | HR, ADMIN |
| GET | `/admin/jobs/:id` | HR, ADMIN |
| PUT | `/admin/jobs/:id` | HR, ADMIN |
| PATCH | `/admin/jobs/:id/status` | HR, ADMIN |

## Backend Files

- `src/job/job.controller.ts` — admin endpoints
- `src/job/job.dto.ts` — CreateJobDto, UpdateJobDto
- `src/job/job.service.ts`
- `src/job/job.repository.ts`

## Frontend Files

- `src/admin/pages/JobsPage.tsx`
- `src/admin/pages/JobFormPage.tsx`
- `src/admin/api/useGetAdminJobs.ts`
- `src/admin/api/useCreateJob.ts`
- `src/admin/api/useUpdateJob.ts`

## Edge Cases

- Deactivating a job with pending applications — job hidden but applications retained
- Deadline in the past on create — warn HR but allow save as Inactive

## Out of Scope

- Google Form / Google Sheets integration
