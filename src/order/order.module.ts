import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
// import { Order, OrderSchema } from './order.schema';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
