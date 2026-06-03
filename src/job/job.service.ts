import { Injectable, NotFoundException } from '@nestjs/common';
import { JobPosting, JobStatus } from '@prisma/client';

import { CreateJobDto, UpdateJobDto, UpdateJobStatusDto } from './job.dto';
import { JobRepository } from './job.repository';

@Injectable()
export class JobService {
  constructor(private readonly jobRepository: JobRepository) {}

  async getActiveJobs(): Promise<JobPosting[]> {
    return this.jobRepository.findActiveJobs();
  }

  async getActiveJob(id: string): Promise<JobPosting> {
    const job = await this.jobRepository.findActiveById(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async getAdminJobs(status?: JobStatus, search?: string): Promise<JobPosting[]> {
    return this.jobRepository.findAll({ status, search });
  }

  async getAdminJob(id: string): Promise<JobPosting> {
    const job = await this.jobRepository.findById(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async createJob(dto: CreateJobDto): Promise<JobPosting> {
    return this.jobRepository.create({
      title: dto.title,
      department: dto.department,
      location: dto.location,
      employmentType: dto.employmentType,
      experience: dto.experience,
      skills: dto.skills,
      description: dto.description,
      salary: dto.salary,
      status: dto.status ?? JobStatus.ACTIVE,
      deadline: new Date(dto.deadline),
    });
  }

  async updateJob(id: string, dto: UpdateJobDto): Promise<JobPosting> {
    await this.getAdminJob(id);

    return this.jobRepository.update(id, {
      ...dto,
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
    });
  }

  async updateJobStatus(
    id: string,
    dto: UpdateJobStatusDto,
  ): Promise<JobPosting> {
    await this.getAdminJob(id);
    return this.jobRepository.update(id, { status: dto.status });
  }

  async deleteJob(id: string): Promise<JobPosting> {
    await this.getAdminJob(id);
    return this.jobRepository.delete(id);
  }
}
