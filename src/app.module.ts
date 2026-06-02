import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderItemModule } from './orderItem/orderItem.module';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { EmailModule } from './email/email.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    OrderModule,
    PrismaModule,
    OrderItemModule,
    AuthModule,
    JobModule,
    ApplicationModule,
    EmailModule,
    FileUploadModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
