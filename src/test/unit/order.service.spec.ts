import { OrderService, OrderData } from '../../domain/services/order.service';
import { OrderRepository } from '../../domain/ports/order.repository';
import { ClientService } from '../../domain/ports/client.service';
import { NotificationService } from '../../domain/ports/notification.service';
import { OrderStateValidator } from '../../domain/services/order-state.validator';
import { Order, OrderStatus } from '../../domain/models/order.model';

describe('OrderService - Registro de pedidos (f1)', () => {
  let orderService: OrderService;
  let mockOrderRepository: jest.Mocked<OrderRepository>;
  let mockClientService: jest.Mocked<ClientService>;
  let mockNotificationService: jest.Mocked<NotificationService>;
  let mockOrderStateValidator: jest.Mocked<OrderStateValidator>;

  beforeEach(() => {
    mockOrderRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    mockClientService = {
      exists: jest.fn(),
    };

    mockNotificationService = {
      notify: jest.fn(),
    };

    mockOrderStateValidator = {
      getValidTransitions: jest.fn(),
    };

    orderService = new OrderService(
      mockOrderRepository,
      mockClientService,
      mockNotificationService,
      mockOrderStateValidator,
    );
  });

  describe('Registro exitoso de pedido', () => {
    it('debe registrar un pedido y devolver el pedido creado', async () => {
      const orderData: OrderData = {
        clientId: 'client-123',
        description: 'Pedido de prueba',
        status: OrderStatus.PENDING,
      };

      const expectedOrder = new Order(
        'ORD-123',
        OrderStatus.PENDING,
        'client-123',
        'Pedido de prueba',
      );

      mockClientService.exists.mockResolvedValue(true);
      mockOrderRepository.save.mockResolvedValue(expectedOrder);

      const result = await orderService.register(orderData);

      expect(mockClientService.exists).toHaveBeenCalledWith('client-123');
      expect(mockOrderRepository.save).toHaveBeenCalled();
      expect(result).toEqual(expectedOrder);
    });
  });

  describe('Error por estado inválido', () => {
    it('debe devolver un error indicando que el estado es inválido', async () => {
      const orderData: OrderData = {
        clientId: 'client-123',
        description: 'Pedido de prueba',
        status: 'INVALID_STATUS' as any,
      };

      await expect(orderService.register(orderData)).rejects.toThrow(
        'El estado del pedido es inválido',
      );
    });
  });

  describe('Error por cliente inexistente', () => {
    it('debe devolver un error indicando que el cliente no existe', async () => {
      const orderData: OrderData = {
        clientId: 'client-inexistente',
        description: 'Pedido de prueba',
      };

      mockClientService.exists.mockResolvedValue(false);

      await expect(orderService.register(orderData)).rejects.toThrow(
        'El cliente no existe',
      );
    });
  });

  describe('Error por datos incompletos', () => {
    it('debe devolver un error indicando que los datos son incompletos', async () => {
      const orderData: OrderData = {
        clientId: '',
        description: '',
      };

      await expect(orderService.register(orderData)).rejects.toThrow(
        'Los datos del pedido están incompletos',
      );
    });
  });
});