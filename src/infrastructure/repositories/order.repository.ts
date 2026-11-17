import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/ports/order.repository';

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders: Map<string, Order> = new Map();

  async save(order: Order): Promise<Order> {
    this.orders.set(order.id, order);
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.get(id) || null;
  }

  async update(order: Order): Promise<Order> {
    if (!this.orders.has(order.id)) {
      throw new Error(`Order with id ${order.id} not found`);
    }
    this.orders.set(order.id, order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async findByClientId(clientId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.clientId === clientId,
    );
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.status === status,
    );
  }

  async delete(id: string): Promise<boolean> {
    return this.orders.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.orders.has(id);
  }
}