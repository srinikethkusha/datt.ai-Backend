import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { AdminStatsController } from './admin-stats.controller';
import { AdminStatsService } from './admin-stats.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AdminStatsController],
  providers: [AdminStatsService],
})
export class AdminModule {}
