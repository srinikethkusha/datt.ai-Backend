import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { createOrderDto, updateOrderDto } from './order.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(order: createOrderDto): Promise<Order> {
    return await this.orderRepository.create(order);
  }

  async deleteOrder(orderId: string): Promise<string> {
    const order = await this.orderRepository.delete(orderId);
    if (!order) {
      throw new NotFoundException('User with id not found');
    }
    return 'order deleted successfully!';
  }

  async getOrderById(orderId: string): Promise<Order> {
    return await this.orderRepository.findOrder(orderId);
  }

  async updateOrderById(
    orderId: string,
    order: updateOrderDto,
  ): Promise<Order> {
    return await this.orderRepository.updateOrder(orderId, order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
