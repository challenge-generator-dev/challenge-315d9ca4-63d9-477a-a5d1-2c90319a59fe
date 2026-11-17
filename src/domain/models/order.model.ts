import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export enum OrderStatus {
  PENDING = 'pendiente',
  PROCESSING = 'procesando',
  SHIPPED = 'enviado',
  DELIVERED = 'entregado',
}

export class Order {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(id: string, status: OrderStatus, clientId: string, description: string) {
    this.id = id;
    this.status = status;
    this.clientId = clientId;
    this.description = description;
  }

  changeStatus(newStatus: OrderStatus): void {
    if (!Object.values(OrderStatus).includes(newStatus)) {
      throw new Error(`Estado no válido: ${newStatus}`);
    }
    this.status = newStatus;
  }
}