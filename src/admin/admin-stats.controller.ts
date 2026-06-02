import { Controller, Get, UseGuards } from '@nestjs/common';

import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';

import { AdminStatsService } from './admin-stats.service';

@Controller('admin/stats')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles('HR', 'TECH', 'ADMIN')
export class AdminStatsController {
  constructor(private readonly adminStatsService: AdminStatsService) {}

  @Get()
  getStats() {
    return this.adminStatsService.getStats();
  }
}
