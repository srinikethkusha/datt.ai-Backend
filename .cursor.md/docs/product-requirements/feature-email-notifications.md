# Feature: Email Notifications

**Docx ref:** §6  
**Phase:** 3  
**Repo:** datt-ai-backend (triggered by frontend submit)

---

## Objective

Automated emails on application submission: notify HR and confirm to candidate.

## HR Notification Email

**Trigger:** Candidate submits application

**Content:**
- Candidate details (name, email, phone, location, experience, skills)
- Applied job title
- Resume attachment
- Application timestamp

**Recipient:** `HR_EMAIL` env variable (or configurable per job)

## Candidate Confirmation Email

**Trigger:** Candidate submits application

**Subject:** `Application Submitted Successfully — Datt.ai`

**Body:**
> Thank you for applying at Datt.ai. Your application has been received successfully. Our HR and technical team will review your profile and contact you regarding next steps.

**Recipient:** Candidate email from application form

## Acceptance Criteria

- [ ] HR receives email within 1 minute of submission
- [ ] HR email includes resume as attachment
- [ ] Candidate receives confirmation email
- [ ] Email failure does not block application save (log error, retry optional)
- [ ] Email templates configurable via env or template files

## Backend Files

- `src/email/email.module.ts`
- `src/email/email.service.ts`
- `src/email/templates/hr-notification.hbs`
- `src/email/templates/candidate-confirmation.hbs`

## Environment

```env
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=
HR_EMAIL=hr@datt.ai
EMAIL_FROM=noreply@datt.ai
```

## Edge Cases

- Invalid candidate email — still save application, skip candidate email, log warning
- Large resume attachment — ensure within email provider limits
- Email provider down — application saved, error logged for manual follow-up

## Out of Scope (v1)

- Interview and offer emails covered in [feature-candidate-evaluation.md](feature-candidate-evaluation.md)
