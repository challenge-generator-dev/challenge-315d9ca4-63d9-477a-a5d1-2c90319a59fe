import { OrderService } from '../domain/services/order.service';
import { OrderRepository } from '../domain/ports/order.repository';
import { ClientService } from '../domain/ports/client.service';
import { NotificationService } from '../domain/ports/notification.service';
import { OrderStateValidator } from '../domain/services/order-state.validator';
import { Order, OrderStatus } from '../domain/models/order.model';

describe('OrderService - Transición de estados (f2)', () => {
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

  describe('Transición exitosa de estado', () => {
    it('debe actualizar el estado del pedido y emitir una notificación', async () => {
      const existingOrder = new Order(
        'ORD-123',
        OrderStatus.PENDING,
        'client-123',
        'Pedido de prueba',
      );

      const updatedOrder = new Order(
        'ORD-123',
        OrderStatus.PROCESSING,
        'client-123',
        'Pedido de prueba',
      );

      mockOrderRepository.findById.mockResolvedValue(existingOrder);
      mockOrderStateValidator.getValidTransitions.mockReturnValue(['procesando', 'enviado']);
      mockOrderRepository.update.mockResolvedValue(updatedOrder);
      mockNotificationService.notify.mockResolvedValue();

      const result = await orderService.transition('ORD-123', 'procesando');

      expect(mockOrderRepository.findById).toHaveBeenCalledWith('ORD-123');
      expect(mockOrderStateValidator.getValidTransitions).toHaveBeenCalledWith(OrderStatus.PENDING);
      expect(mockOrderRepository.update).toHaveBeenCalled();
      expect(mockNotificationService.notify).toHaveBeenCalledWith(
        updatedOrder,
        'El pedido ha cambiado a estado: procesando',
      );
      expect(result.status).toBe(OrderStatus.PROCESSING);
    });
  });

  describe('Error por transición inválida', () => {
    it('debe devolver un error indicando que la transición es inválida', async () => {
      const existingOrder = new Order(
        'ORD-123',
        OrderStatus.DELIVERED,
        'client-123',
        'Pedido de prueba',
      );

      mockOrderRepository.findById.mockResolvedValue(existingOrder);
      mockOrderStateValidator.getValidTransitions.mockReturnValue([]);

      await expect(orderService.transition('ORD-123', 'pendiente')).rejects.toThrow(
        'La transición de estado es inválida',
      );
    });
  });

  describe('Error por pedido inexistente', () => {
    it('debe devolver un error indicando que el pedido no existe', async () => {
      mockOrderRepository.findById.mockResolvedValue(null);

      await expect(orderService.transition('ORD-inexistente', 'procesando')).rejects.toThrow(
        'El pedido no existe',
      );
    });
  });

  describe('Error al emitir notificación', () => {
    it('debe devolver un error indicando que no se pudo emitir la notificación', async () => {
      const existingOrder = new Order(
        'ORD-123',
        OrderStatus.PENDING,
        'client-123',
        'Pedido de prueba',
      );

      const updatedOrder = new Order(
        'ORD-123',
        OrderStatus.PROCESSING,
        'client-123',
        'Pedido de prueba',
      );

      mockOrderRepository.findById.mockResolvedValue(existingOrder);
      mockOrderStateValidator.getValidTransitions.mockReturnValue(['procesando', 'enviado']);
      mockOrderRepository.update.mockResolvedValue(updatedOrder);
      mockNotificationService.notify.mockRejectedValue(new Error('Error de notificación'));

      await expect(orderService.transition('ORD-123', 'procesando')).rejects.toThrow(
        'No se pudo emitir la notificación',
      );
    });
  });
});

describe('OrderController - Transición de estados (f2)', () => {
  let orderController: any;
  let mockOrderService: any;
  let mockResponse: any;

  beforeEach(() => {
    mockOrderService = {
      register: jest.fn(),
      transition: jest.fn(),
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const { OrderController } = require('../infrastructure/controllers/order.controller');
    orderController = new OrderController(mockOrderService);
  });

  describe('Respuesta exitosa para transición de estado', () => {
    it('debe devolver una respuesta HTTP 200 con el pedido actualizado', async () => {
      const updatedOrder = new Order(
        'ORD-123',
        OrderStatus.PROCESSING,
        'client-123',
        'Pedido de prueba',
      );

      mockOrderService.transition.mockResolvedValue(updatedOrder);

      await orderController.transition('ORD-123', { newState: 'procesando' }, mockResponse);

      expect(mockOrderService.transition).toHaveBeenCalledWith('ORD-123', 'procesando');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedOrder);
    });
  });

  describe('Respuesta de error para transición inválida', () => {
    it('debe devolver una respuesta HTTP 400 con mensaje de error', async () => {
      mockOrderService.transition.mockRejectedValue(new Error('La transición de estado es inválida'));

      await orderController.transition('ORD-123', { newState: 'invalid' }, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'La transición de estado es inválida' });
    });
  });

  describe('Respuesta de error para pedido inexistente', () => {
    it('debe devolver una respuesta HTTP 404 con mensaje de error', async () => {
      mockOrderService.transition.mockRejectedValue(new Error('El pedido no existe'));

      await orderController.transition('ORD-inexistente', { newState: 'procesando' }, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'El pedido no existe' });
    });
  });
});