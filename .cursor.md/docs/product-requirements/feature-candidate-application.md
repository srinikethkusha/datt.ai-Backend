# Feature: Candidate Application

**Docx ref:** §4, §5  
**Phase:** 2–3  
**Repos:** datt-ai-frontend, datt-ai-backend

---

## Objective

Candidates apply directly from the website by filling a form and uploading a resume.

## User Flow

1. Candidate visits Careers page
2. Opens job details
3. Clicks **Apply Now**
4. Fills application form
5. Uploads resume
6. Submits application

## Form Fields

| Field | Required |
|-------|----------|
| Full Name | Yes |
| Email Address | Yes |
| Phone Number | Yes |
| Current Location | Yes |
| Years of Experience | Yes |
| Skills | Yes |
| LinkedIn Profile | No |
| Portfolio / GitHub | No |
| Cover Letter | No |
| Resume Upload | Yes (PDF / DOC / DOCX) |

## Acceptance Criteria

- [ ] All required fields validated before submit
- [ ] Resume accepts only PDF, DOC, DOCX
- [ ] Max file size enforced (5 MB)
- [ ] reCAPTCHA required before submit
- [ ] Application saved to database linked to job
- [ ] Success screen shown after submit
- [ ] Cannot apply to inactive or expired jobs
- [ ] No login required for candidates

## API

| Method | Path | Auth |
|--------|------|------|
| POST | `/applications` | Public + Captcha |

## Backend Files

- `src/application/application.controller.ts`
- `src/application/application.service.ts`
- `src/application/application.repository.ts`
- `src/application/application.dto.ts`
- `src/file-upload/` — resume storage

## Frontend Files

- `src/careers/pages/ApplyPage.tsx`
- `src/careers/pages/ApplySuccessPage.tsx`
- `src/careers/components/ApplicationForm.tsx`
- `src/careers/components/ResumeUpload.tsx`
- `src/careers/api/useSubmitApplication.ts`

## Security

- Validate MIME type and extension server-side
- Enforce file size limit
- Sanitize text inputs
- Verify reCAPTCHA token server-side

## Edge Cases

- Upload fails mid-submit — show error, retain form data
- Duplicate application same email + job — allow or warn (default: allow)
- Network timeout — retry prompt
