import { Injectable } from '@nestjs/common';
import { ApplicationStatus, JobStatus } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminStatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const [activeJobs, totalApplications, statusGroups] = await Promise.all([
      this.prisma.jobPosting.count({
        where: {
          status: JobStatus.ACTIVE,
          deadline: { gte: new Date() },
        },
      }),
      this.prisma.application.count(),
      this.prisma.application.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    const applicationsByStatus = Object.values(ApplicationStatus).reduce(
      (acc, status) => {
        acc[status] = 0;
        return acc;
      },
      {} as Record<ApplicationStatus, number>,
    );

    for (const group of statusGroups) {
      applicationsByStatus[group.status] = group._count.status;
    }

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const newApplicationsThisWeek = await this.prisma.application.count({
      where: { appliedAt: { gte: weekAgo } },
    });

    return {
      activeJobs,
      totalApplications,
      newApplicationsThisWeek,
      applicationsByStatus,
    };
  }
}
