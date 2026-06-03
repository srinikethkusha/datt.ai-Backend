import { Injectable } from '@nestjs/common';
import { JobPosting, JobStatus, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveJobs(): Promise<JobPosting[]> {
    return this.prisma.jobPosting.findMany({
      where: {
        status: JobStatus.ACTIVE,
        deadline: { gte: new Date() },
      },
      orderBy: { postedAt: 'desc' },
    });
  }

  async findActiveById(id: string): Promise<JobPosting | null> {
    return this.prisma.jobPosting.findFirst({
      where: {
        id,
        status: JobStatus.ACTIVE,
        deadline: { gte: new Date() },
      },
    });
  }

  async findAll(filters?: {
    status?: JobStatus;
    search?: string;
  }): Promise<JobPosting[]> {
    const where: Prisma.JobPostingWhereInput = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { department: { contains: filters.search, mode: 'insensitive' } },
        { location: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.jobPosting.findMany({
      where,
      orderBy: { postedAt: 'desc' },
    });
  }

  async findById(id: string): Promise<JobPosting | null> {
    return this.prisma.jobPosting.findUnique({ where: { id } });
  }

  async create(data: Prisma.JobPostingCreateInput): Promise<JobPosting> {
    return this.prisma.jobPosting.create({ data });
  }

  async update(
    id: string,
    data: Prisma.JobPostingUpdateInput,
  ): Promise<JobPosting> {
    return this.prisma.jobPosting.update({ where: { id }, data });
  }

  async delete(id: string): Promise<JobPosting> {
    return this.prisma.jobPosting.delete({ where: { id } });
  }
}
