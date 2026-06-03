import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobPosting, JobStatus } from '@prisma/client';

import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';

import {
  CreateJobDto,
  UpdateJobDto,
  UpdateJobStatusDto,
} from './job.dto';
import { JobService } from './job.service';

@Controller('admin/jobs')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles('HR', 'ADMIN')
export class JobAdminController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async findAll(
    @Query('status') status?: JobStatus,
    @Query('search') search?: string,
  ): Promise<JobPosting[]> {
    return this.jobService.getAdminJobs(status, search);
  }

  @Post()
  async create(@Body() dto: CreateJobDto): Promise<JobPosting> {
    return this.jobService.createJob(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JobPosting> {
    return this.jobService.getAdminJob(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateJobDto,
  ): Promise<JobPosting> {
    return this.jobService.updateJob(id, dto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateJobStatusDto,
  ): Promise<JobPosting> {
    return this.jobService.updateJobStatus(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<JobPosting> {
    return this.jobService.deleteJob(id);
  }
}
