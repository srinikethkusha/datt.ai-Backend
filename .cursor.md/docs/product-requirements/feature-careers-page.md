# Feature: Careers Page

**Docx ref:** §2  
**Phase:** 2  
**Repos:** datt-ai-frontend, datt-ai-backend

---

## Objective

Dedicated Careers page on the Datt.ai website displaying all active job openings.

## User Stories

- As a **candidate**, I want to browse open positions so I can find relevant roles.
- As a **candidate**, I want to see job details so I can decide whether to apply.

## Functional Requirements

### Careers List (`/careers`)

- Display all **active** job openings (status = Active, not past deadline).
- Each job card includes:
  - Job Title
  - Location
  - Employment Type (Full-time / Part-time / Contract)
  - Experience Required
  - Skills Required
  - Job Description (truncated on list)
  - Salary Range (optional — hide if empty)
  - Posted Date
  - Apply Button

### Job Detail (`/careers/:id`)

- Show all fields in full.
- **Apply Now** button → application form.

## Acceptance Criteria

- [ ] Only active, non-expired jobs appear on Careers page
- [ ] All required fields render on job card and detail page
- [ ] Apply button navigates to application form
- [ ] Empty state when no active jobs
- [ ] Responsive on mobile and desktop
- [ ] Loading and error states handled

## API

| Method | Path | Auth |
|--------|------|------|
| GET | `/jobs` | Public |
| GET | `/jobs/:id` | Public |

## Backend Files (Phase 2)

- `src/job/job.controller.ts` — public GET endpoints
- `src/job/job.service.ts` — filter active jobs
- `src/job/job.repository.ts`

## Frontend Files (Phase 2)

- `src/careers/pages/CareersPage.tsx`
- `src/careers/pages/JobDetailsPage.tsx`
- `src/careers/components/JobCard.tsx`
- `src/careers/api/useGetJobs.ts`
- `src/careers/api/useGetJob.ts`

## Edge Cases

- Job deactivated while user is viewing → show message on apply attempt
- Past application deadline → disable Apply button
- Optional salary field empty → omit from UI
