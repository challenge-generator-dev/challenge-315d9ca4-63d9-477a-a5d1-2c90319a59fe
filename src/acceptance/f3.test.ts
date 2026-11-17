import { OrderStateValidator } from '../domain/services/order-state.validator';
import { OrderStatus } from '../domain/models/order.model';

describe('Fase 3 - Validación de transiciones de estado', () => {
  let validator: OrderStateValidator;

  beforeEach(() => {
    validator = new OrderStateValidator();
  });

  describe('Transición válida', () => {
    it('debe devolver true para transición de pendiente a procesando', () => {
      const result = validator.validate(OrderStatus.PENDING, OrderStatus.PROCESSING);
      expect(result).toBe(true);
    });

    it('debe devolver true para transición de procesando a enviado', () => {
      const result = validator.validate(OrderStatus.PROCESSING, OrderStatus.SHIPPED);
      expect(result).toBe(true);
    });

    it('debe devolver true para transición de enviado a entregado', () => {
      const result = validator.validate(OrderStatus.SHIPPED, OrderStatus.DELIVERED);
      expect(result).toBe(true);
    });
  });

  describe('Transición inválida', () => {
    it('debe devolver false para transición de pendiente a enviado', () => {
      const result = validator.validate(OrderStatus.PENDING, OrderStatus.SHIPPED);
      expect(result).toBe(false);
    });

    it('debe devolver false para transición de pendiente a entregado', () => {
      const result = validator.validate(OrderStatus.PENDING, OrderStatus.DELIVERED);
      expect(result).toBe(false);
    });

    it('debe devolver false para transición de procesando a entregado', () => {
      const result = validator.validate(OrderStatus.PROCESSING, OrderStatus.DELIVERED);
      expect(result).toBe(false);
    });

    it('debe devolver false para transición de enviado a pendiente', () => {
      const result = validator.validate(OrderStatus.SHIPPED, OrderStatus.PENDING);
      expect(result).toBe(false);
    });

    it('debe devolver false para estado actual desconocido', () => {
      const result = validator.validate('estado-desconocido', OrderStatus.PROCESSING);
      expect(result).toBe(false);
    });
  });

  describe('Transición a mismo estado', () => {
    it('debe devolver false cuando el estado actual y nuevo son pendiente', () => {
      const result = validator.validate(OrderStatus.PENDING, OrderStatus.PENDING);
      expect(result).toBe(false);
    });

    it('debe devolver false cuando el estado actual y nuevo son procesando', () => {
      const result = validator.validate(OrderStatus.PROCESSING, OrderStatus.PROCESSING);
      expect(result).toBe(false);
    });

    it('debe devolver false cuando el estado actual y nuevo son enviado', () => {
      const result = validator.validate(OrderStatus.SHIPPED, OrderStatus.SHIPPED);
      expect(result).toBe(false);
    });

    it('debe devolver false cuando el estado actual y nuevo son entregado', () => {
      const result = validator.validate(OrderStatus.DELIVERED, OrderStatus.DELIVERED);
      expect(result).toBe(false);
    });
  });
});