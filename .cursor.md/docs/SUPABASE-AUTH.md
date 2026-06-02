# Supabase Auth — Backend

Admin authentication is handled by Supabase. The backend only **validates JWTs** — it does not manage passwords.

## Setup

1. Create a Supabase project.
2. Enable **Email** auth provider.
3. Disable public signups (invite-only admins).
4. Create admin users in Supabase Dashboard.
5. Set role in user metadata:

```json
{
  "role": "HR"
}
```

Roles: `HR`, `TECH`, `ADMIN`.

## Environment

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_JWT_SECRET=your-jwt-secret
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

`SUPABASE_JWT_SECRET` is found in Supabase → Settings → API → JWT Secret.

## Guard Implementation (Phase 1)

```text
Request → SupabaseAuthGuard → RolesGuard → Controller
```

1. Extract `Authorization: Bearer <token>` header.
2. Verify JWT signature with `SUPABASE_JWT_SECRET`.
3. Attach `user.id`, `user.email`, `user.role` to request.
4. `RolesGuard` checks `@Roles('HR', 'ADMIN')` decorator.

## Role Permissions

| Action | HR | TECH | ADMIN |
|--------|----|------|-------|
| Manage jobs | Yes | No | Yes |
| View applications | Yes | Yes | Yes |
| Update status | Yes | Yes | Yes |
| Send interview email | Yes | No | Yes |
| Send offer letter | Yes | No | Yes |

## Public Routes (no auth)

- `GET /jobs`, `GET /jobs/:id`
- `POST /applications`

## Security Notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to frontend.
- Validate token on every admin request.
- Log admin actions on sensitive operations (status change, offer sent).
