import { Controller, Param, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Post, Body } from '@nestjs/common';
import { OrderDto } from './dtos/order.dto';
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    @Post('place-order')
    async placeOrder(
        @Body() body: OrderDto,
        @Query('c_id') c_id: string
    ) {
        console.log(c_id);
        return await this.orderService.placeOrder(body, c_id);
    }
}
