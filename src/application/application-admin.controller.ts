import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';

import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';

import {
  SendInterviewEmailDto,
  SendOfferLetterDto,
  UpdateApplicationStatusDto,
} from './application.dto';
import { ApplicationService } from './application.service';

@Controller('admin/applications')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles('HR', 'TECH', 'ADMIN')
export class ApplicationAdminController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  async findAll(
    @Query('jobId') jobId?: string,
    @Query('status') status?: ApplicationStatus,
    @Query('search') search?: string,
  ) {
    return this.applicationService.getApplications(jobId, status, search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.applicationService.getApplication(id);
  }

  @Get(':id/resume')
  async downloadResume(@Param('id') id: string): Promise<StreamableFile> {
    return this.applicationService.getResumeFile(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    return this.applicationService.updateStatus(id, dto);
  }

  @Post(':id/send-interview')
  @Roles('HR', 'ADMIN')
  async sendInterview(
    @Param('id') id: string,
    @Body() dto: SendInterviewEmailDto,
  ) {
    return this.applicationService.sendInterviewEmail(id, dto);
  }

  @Post(':id/send-offer')
  @Roles('HR', 'ADMIN')
  async sendOffer(
    @Param('id') id: string,
    @Body() dto: SendOfferLetterDto,
  ) {
    return this.applicationService.sendOfferLetter(id, dto);
  }
}
