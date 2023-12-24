import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { Order } from '../entities/Order';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  private orders: Record<string, Order> = {}
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) { }


  async find(): Promise<Order[]> {
    console.log('looking for cart')
    const orders = await this.orderRepository.find();
    console.log('orders', orders);
    return orders;
  }

  findById(orderId: string): Order {
    return this.orders[orderId];
  }

  create(data: any) {
    const id = v4()
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };

    this.orders[id] = order;

    return order;
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[orderId] = {
      ...data,
      id: orderId,
    }
  }
}
