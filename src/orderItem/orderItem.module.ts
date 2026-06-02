import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { OrderItemRepository } from './orderItem.repository';
import { OrderItemController } from './orderItem.controller';
import { OrderItemService } from './orderItem.service';
// import { Order, OrderSchema } from './order.schema';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepository],
})
export class OrderItemModule {}
