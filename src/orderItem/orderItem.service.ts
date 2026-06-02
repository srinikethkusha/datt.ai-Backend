import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
import { OrderItemRepository } from './orderItem.repository';
import { createOrderItemDto, updateOrderItemDto } from './orderItem.dto';

@Injectable()
export class OrderItemService {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}
  async createOrderItem(order: createOrderItemDto): Promise<OrderItem> {
    return await this.orderItemRepository.create(order);
  }

  async getOrderItemById(orderId: string): Promise<OrderItem> {
    return await this.orderItemRepository.findOrderItem(orderId);
  }

  async deleteOrderItem(orderId: string): Promise<string> {
    const order = await this.orderItemRepository.deleteOrderItemById(orderId);
    if (!order) {
      throw new NotFoundException('Orderitem with id not found');
    }
    return 'orderitem deleted successfully!';
  }

  async updateOrderItemById(
    orderId: string,
    order: updateOrderItemDto,
  ): Promise<OrderItem> {
    return await this.orderItemRepository.updateOrderItem(orderId, order);
  }
}
