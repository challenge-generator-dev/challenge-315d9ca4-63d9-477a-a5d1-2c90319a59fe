import { Order } from '../models/order.model';

export interface NotificationService {
  notify(order: Order, message: string): Promise<void>;
}