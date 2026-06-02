import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderItem } from '@prisma/client';
import { createOrderItemDto } from './orderItem.dto';
@Injectable()
export class OrderItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(orderItem: createOrderItemDto): Promise<OrderItem> {
    return await this.prisma.orderItem.create({
      data: orderItem,
      include: {
        product: true,
      },
    });
  }

  async findOrderItem(orderItemId: string): Promise<OrderItem | null> {
    return await this.prisma.orderItem.findUnique({
      where: { id: orderItemId },
      include: {
        product: true,
      },
    });
  }

  async deleteOrderItemById(orderId: string): Promise<OrderItem> {
    return await this.prisma.orderItem.delete({
      where: { id: orderId },
    });
  }

  async updateOrderItem(
    orderItemId: string,
    orderItem: Partial<Omit<OrderItem, 'id'>>,
  ): Promise<OrderItem> {
    return await this.prisma.orderItem.update({
      where: { id: orderItemId },
      data: orderItem,
    });
  }
}
