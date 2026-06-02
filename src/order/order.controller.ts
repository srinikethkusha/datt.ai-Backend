import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Get,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';

import { Order } from '@prisma/client';
import { createOrderDto, updateOrderDto } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() order: createOrderDto): Promise<Order> {
    return await this.orderService.createOrder(order);
  }
  @Delete('/:_id')
  async deleteOrder(@Param('_id') orderId: string): Promise<Order | string> {
    return await this.orderService.deleteOrder(orderId);
  }

  @Get('/:_id')
  async getOrder(@Param('_id') orderId: string): Promise<Order> {
    return await this.orderService.getOrderById(orderId);
  }

  @Put('/:_id')
  async updateOrder(
    @Param('_id') orderId: string,
    @Body() updateDto: updateOrderDto,
  ): Promise<Order> {
    return await this.orderService.updateOrderById(orderId, updateDto);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }
}
