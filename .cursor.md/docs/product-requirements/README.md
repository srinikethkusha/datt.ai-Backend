# Product Requirements

PRDs for the Datt.ai Job Posting platform. Source: `DattAI_Job_Posting_Requirements.docx`.

**Read the relevant PRD before coding any feature.**

## Decisions

- **Job posting:** Admin panel only (no Google Sheets)
- **Auth:** Supabase for admin/HR/tech; candidates apply without login
- **Repos:** Separate frontend and backend repositories

## PRD Index

| PRD | Phase | Repo |
|-----|-------|------|
| [feature-careers-page.md](feature-careers-page.md) | 2 | Frontend + Backend |
| [feature-job-posting-management.md](feature-job-posting-management.md) | 4 | Frontend + Backend |
| [feature-candidate-application.md](feature-candidate-application.md) | 2–3 | Frontend + Backend |
| [feature-email-notifications.md](feature-email-notifications.md) | 3 | Backend |
| [feature-candidate-evaluation.md](feature-candidate-evaluation.md) | 5 | Frontend + Backend |
| [feature-admin-dashboard.md](feature-admin-dashboard.md) | 4–5 | Frontend + Backend |
| [feature-security-auth.md](feature-security-auth.md) | 1 | Frontend + Backend |

## Workflow

1. Read PRD
2. Write requirement summary + impact analysis
3. Implement backend → frontend
4. Verify acceptance criteria

## Out of Scope (v1)

- Google Sheets / Google Forms integration
- Candidate portal login
- ATS, AI resume screening
- Interview scheduling calendar
- WhatsApp/SMS notifications
