import { Module } from '@nestjs/common';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../../domain/services/order.service';
import { InMemoryOrderRepository } from '../repositories/order.repository';
import { ClientService } from '../../domain/ports/client.service';
import { NotificationService } from '../../domain/ports/notification.service';
import { OrderStateValidator } from '../../domain/services/order-state.validator';

export const CLIENT_SERVICE_TOKEN = 'ClientService';
export const NOTIFICATION_SERVICE_TOKEN = 'NotificationService';

class MockClientService implements ClientService {
  private readonly validClients: Set<string> = new Set(['client-1', 'client-2', 'client-3']);

  async exists(clientId: string): Promise<boolean> {
    return this.validClients.has(clientId);
  }
}

class MockNotificationService implements NotificationService {
  private readonly notifications: Array<{ orderId: string; message: string }> = [];

  async notify(order: any, message: string): Promise<void> {
    this.notifications.push({ orderId: order.id, message });
    console.log(`Notification sent for order ${order.id}: ${message}`);
  }

  getNotifications(): Array<{ orderId: string; message: string }> {
    return this.notifications;
  }
}

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    InMemoryOrderRepository,
    OrderStateValidator,
    {
      provide: CLIENT_SERVICE_TOKEN,
      useClass: MockClientService,
    },
    {
      provide: NOTIFICATION_SERVICE_TOKEN,
      useClass: MockNotificationService,
    },
  ],
  exports: [
    CLIENT_SERVICE_TOKEN,
    NOTIFICATION_SERVICE_TOKEN,
  ],
})
export class AppModule {}