import { Injectable } from '@nestjs/common';
import {
  Application,
  ApplicationStatus,
  Prisma,
} from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

export type ApplicationWithJob = Application & {
  job: { title: string; id: string };
};

@Injectable()
export class ApplicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ApplicationCreateInput): Promise<Application> {
    return this.prisma.application.create({ data });
  }

  async findById(id: string): Promise<Application | null> {
    return this.prisma.application.findUnique({
      where: { id },
      include: { job: true },
    });
  }

  async findAll(filters?: {
    jobId?: string;
    status?: ApplicationStatus;
    search?: string;
  }): Promise<ApplicationWithJob[]> {
    const where: Prisma.ApplicationWhereInput = {};

    if (filters?.jobId) {
      where.jobId = filters.jobId;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.search) {
      where.OR = [
        { fullName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { skills: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.application.findMany({
      where,
      include: { job: true },
      orderBy: { appliedAt: 'desc' },
    }) as Promise<ApplicationWithJob[]>;
  }

  async updateStatus(
    id: string,
    status: ApplicationStatus,
  ): Promise<Application> {
    return this.prisma.application.update({
      where: { id },
      data: { status },
      include: { job: true },
    });
  }
}

