import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { JobAdminController } from './job-admin.controller';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';
import { JobService } from './job.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [JobController, JobAdminController],
  providers: [JobService, JobRepository],
  exports: [JobService],
})
export class JobModule {}
