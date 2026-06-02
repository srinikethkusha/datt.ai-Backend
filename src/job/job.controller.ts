import { Controller, Get, Param } from '@nestjs/common';
import { JobPosting } from '@prisma/client';

import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async findActiveJobs(): Promise<JobPosting[]> {
    return this.jobService.getActiveJobs();
  }

  @Get(':id')
  async findActiveJob(@Param('id') id: string): Promise<JobPosting> {
    return this.jobService.getActiveJob(id);
  }
}
