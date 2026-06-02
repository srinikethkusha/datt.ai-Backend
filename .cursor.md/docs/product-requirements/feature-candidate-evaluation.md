# Feature: Candidate Evaluation & Offer Process

**Docx ref:** §7, §8  
**Phase:** 5  
**Repos:** datt-ai-frontend, datt-ai-backend

---

## Objective

HR and technical team evaluate candidates through a defined pipeline. Selected candidates receive interview and offer letter emails.

## Hiring Pipeline Stages

1. Application Received
2. HR Screening
3. Technical Evaluation
4. Interview Scheduled
5. Final Review
6. Offer Letter Sent
7. Rejected / Closed

## Functional Requirements

### Status Tracking

- HR/TECH can update candidate status via admin UI
- Status history visible on application detail page

### Interview Email

- HR can send interview email to candidate from admin UI
- Editable subject and body template
- Triggered manually after evaluation

### Offer Letter

- HR can upload PDF offer letter and send to candidate
- Editable email template
- Manual send (automatic send optional)
- Timeline note: offer typically within 1 week after interview (HR reminder in UI, not enforced)

## Acceptance Criteria

- [ ] All 7 pipeline stages available in status dropdown
- [ ] Status change reflected immediately in applications list
- [ ] Interview email sends to candidate email on file
- [ ] Offer letter email sends with PDF attachment
- [ ] Only HR/ADMIN can send interview and offer emails
- [ ] TECH role can view and update status but not send offer

## API

| Method | Path | Role |
|--------|------|------|
| PATCH | `/admin/applications/:id/status` | HR, TECH, ADMIN |
| POST | `/admin/applications/:id/send-interview` | HR, ADMIN |
| POST | `/admin/applications/:id/send-offer` | HR, ADMIN |

## Backend Files

- `src/application/application.service.ts` — status updates
- `src/email/email.service.ts` — interview + offer templates

## Frontend Files

- `src/admin/pages/ApplicationDetailPage.tsx`
- `src/admin/components/StatusStepper.tsx`
- `src/admin/components/InterviewEmailModal.tsx`
- `src/admin/components/OfferLetterModal.tsx`

## Edge Cases

- Status regression (e.g. Offer Sent → HR Screening) — allow with confirmation
- Offer PDF too large — validate before send
- Candidate email invalid — block send, show error
