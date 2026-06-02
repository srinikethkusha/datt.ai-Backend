import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { JobModule } from 'src/job/job.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { ApplicationAdminController } from './application-admin.controller';
import { ApplicationController } from './application.controller';
import { ApplicationRepository } from './application.repository';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    JobModule,
    FileUploadModule,
    EmailModule,
  ],
  controllers: [ApplicationController, ApplicationAdminController],
  providers: [ApplicationService, ApplicationRepository],
})
export class ApplicationModule {}
