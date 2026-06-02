import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrderItemService } from './orderItem.service';

import { Order, OrderItem } from '@prisma/client';
import { createOrderItemDto, updateOrderItemDto } from './orderItem.dto';

@Controller('orderItem')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  async createOrderItem(
    @Body() orderItem: createOrderItemDto,
  ): Promise<OrderItem> {
    return await this.orderItemService.createOrderItem(orderItem);
  }

  @Get('/:_id')
  async getOrder(@Param('_id') orderId: string): Promise<OrderItem> {
    return await this.orderItemService.getOrderItemById(orderId);
  }

  @Delete('/:_id')
  async deleteOrder(@Param('_id') orderId: string): Promise<Order | string> {
    return await this.orderItemService.deleteOrderItem(orderId);
  }

  @Put('/:_id')
  async updateOrder(
    @Param('_id') orderId: string,
    @Body() updateDto: updateOrderItemDto,
  ): Promise<OrderItem> {
    return await this.orderItemService.updateOrderItemById(orderId, updateDto);
  }
}
