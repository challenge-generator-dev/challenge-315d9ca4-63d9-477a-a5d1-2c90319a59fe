// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Controller, Post, Put, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { OrderService, OrderData } from '../../domain/services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async register(@Body() body: OrderData, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Post');
  }

  @Put(':id/transition')
  async transition(
    @Param('id') orderId: string,
    @Body() body: { newState: string },
    @Res() res: Response,
  ): Promise<void> {
    throw new Error('TODO(reto): Res');
  }
}