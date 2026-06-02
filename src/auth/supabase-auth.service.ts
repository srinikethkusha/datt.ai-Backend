import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';
import * as jwt from 'jsonwebtoken';

import { AuthenticatedUser } from './supabase-auth.guard';

interface SupabaseJwtPayload {
  sub: string;
  email?: string;
  user_metadata?: { role?: string };
  app_metadata?: { role?: string };
}

function normalizeRole(role?: string): string {
  return role?.trim().toUpperCase() ?? 'ADMIN';
}

@Injectable()
export class SupabaseAuthService {
  private readonly adminClient: SupabaseClient | null;

  constructor() {
     try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const ws = require('ws');
      if (ws && typeof (globalThis as any).WebSocket === 'undefined') {
        (globalThis as any).WebSocket = ws;
      }
    } catch (e) {
       }

    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && serviceKey && !serviceKey.includes('your-service-role-key')) {
      this.adminClient = createClient(url, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
    } else {
      this.adminClient = null;
    }
  }

  async validateToken(token: string): Promise<AuthenticatedUser> {
    if (this.adminClient) {
      const { data, error } = await this.adminClient.auth.getUser(token);
      if (!error && data.user) {
        return this.mapSupabaseUser(data.user);
      }
    }

    const secret = process.env.SUPABASE_JWT_SECRET;
    if (secret && !secret.includes('your-jwt-secret')) {
      try {
        const payload = jwt.verify(token, secret) as SupabaseJwtPayload;
        return {
          id: payload.sub,
          email: payload.email,
          role: normalizeRole(
            payload.user_metadata?.role ?? payload.app_metadata?.role,
          ),
        };
      } catch {
        // fall through
      }
    }

    throw new UnauthorizedException(
      'Invalid or expired token. Check SUPABASE_SERVICE_ROLE_KEY or SUPABASE_JWT_SECRET in backend .env',
    );
  }

  private mapSupabaseUser(user: User): AuthenticatedUser {
    const metadata = user.user_metadata as { role?: string } | undefined;
    const appMetadata = user.app_metadata as { role?: string } | undefined;

    return {
      id: user.id,
      email: user.email,
      role: normalizeRole(metadata?.role ?? appMetadata?.role),
    };
  }
}
