import { Module } from '@nestjs/common';

import { RolesGuard } from './roles.guard';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { SupabaseAuthService } from './supabase-auth.service';

@Module({
  providers: [SupabaseAuthService, SupabaseAuthGuard, RolesGuard],
  exports: [SupabaseAuthService, SupabaseAuthGuard, RolesGuard],
})
export class AuthModule {}
