import { Logger } from '@nestjs/common';

const logger = new Logger('SupabaseConfig');

export function warnIfSupabaseMisconfigured(): void {
  const url = process.env.SUPABASE_URL;
  const jwtSecret = process.env.SUPABASE_JWT_SECRET;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const placeholders = [
    'your-project.supabase.co',
    'your-jwt-secret',
    'your-service-role-key',
    'REPLACE_WITH',
  ];

  const misconfigured = [url, jwtSecret, serviceKey].some(
    (value) =>
      !value || placeholders.some((placeholder) => value.includes(placeholder)),
  );

  if (misconfigured) {
    logger.error(
      'Supabase is not configured. Set SUPABASE_URL, SUPABASE_JWT_SECRET, and SUPABASE_SERVICE_ROLE_KEY in datt.ai-BE/.env (Dashboard → Settings → API). Admin API routes will return 401.',
    );
  }
}
