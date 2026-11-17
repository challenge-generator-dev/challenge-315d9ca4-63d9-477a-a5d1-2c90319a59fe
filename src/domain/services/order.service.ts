// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../models/order.model';
import { OrderRepository } from '../ports/order.repository';
import { ClientService } from '../ports/client.service';
import { NotificationService } from '../ports/notification.service';
import { OrderStateValidator } from './order-state.validator';

export interface OrderData {
  clientId: string;
  description: string;
  status?: OrderStatus;
}

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly clientService: ClientService,
    private readonly notificationService: NotificationService,
    private readonly orderStateValidator: OrderStateValidator,
  ) {}

  async register(orderData: OrderData): Promise<Order> {
    throw new Error('TODO(reto): register');
  }

  validateOrderData(orderData: OrderData): void {
    throw new Error('TODO(reto): validateOrderData');
  }

  private isValidStatus(status: OrderStatus): boolean {
    return Object.values(OrderStatus).includes(status);
  }

  async transition(orderId: string, newState: string): Promise<Order> {
    throw new Error('TODO(reto): transition');
  }

  validateTransition(orderId: string, newState: string): void {
    throw new Error('TODO(reto): validateTransition');
  }

  private stringToStatus(status: string): OrderStatus {
    const statusMap: Record<string, OrderStatus> = {
      pendiente: OrderStatus.PENDING,
      procesando: OrderStatus.PROCESSING,
      enviado: OrderStatus.SHIPPED,
      entregado: OrderStatus.DELIVERED,
    };
    return statusMap[status.toLowerCase()] || OrderStatus.PENDING;
  }

  private generateId(): string {
    return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}