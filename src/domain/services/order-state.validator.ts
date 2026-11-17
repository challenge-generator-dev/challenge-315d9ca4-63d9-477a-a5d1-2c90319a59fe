// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { OrderStatus } from '../models/order.model';

@Injectable()
export class OrderStateValidator {
  private readonly validTransitions: Map<string, string[]> = new Map([
    [OrderStatus.PENDING, [OrderStatus.PROCESSING]],
    [OrderStatus.PROCESSING, [OrderStatus.SHIPPED]],
    [OrderStatus.SHIPPED, [OrderStatus.DELIVERED]],
    [OrderStatus.DELIVERED, []],
  ]);

  validate(currentState: string, newState: string): boolean {
    throw new Error('TODO(reto): validate');
  }
}