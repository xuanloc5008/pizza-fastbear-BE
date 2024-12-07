import { Controller, Param, Query, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dtos/order.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';

@Controller('order')
@ApiTags('Order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('place-order')
    @ApiOperation({ summary: 'Place a new order for a customer' })
    @ApiResponse({
        status: 201,
        description: 'Order placed successfully',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input data',
    })
    @ApiQuery({
        name: 'c_id',
        description: 'Customer ID',
        required: true,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiBody({
        type: OrderDto,
        description: 'Order details',
    })
    async placeOrder(
        @Body() body: OrderDto,
        @Query('c_id') c_id: string
    ) {
        console.log(c_id);
        return await this.orderService.placeOrder(body, c_id);
    }

    @Get('get-order-by-id')
    @ApiOperation({ summary: 'Retrieve orders for a specific customer' })
    @ApiResponse({
        status: 200,
        description: 'Orders retrieved successfully',
    })
    @ApiResponse({
        status: 404,
        description: 'Customer not found',
    })
    @ApiQuery({
        name: 'c_id',
        description: 'Customer ID to fetch orders for',
        required: true,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    async getOrders(@Query('c_id') c_id: string) {
        return await this.orderService.getOrders(c_id);
    }

    @Get('get-orders')
    @ApiOperation({ summary: 'Retrieve all orders in the system' })
    @ApiResponse({
        status: 200,
        description: 'Orders retrieved successfully',
    })
    async getAllOrders() {
        return await this.orderService.getAllOrders();
    }

    @Delete('delete-order-by-id')
    @ApiOperation({ summary: 'Delete an order by ID' })
    @ApiResponse({
        status: 200,
        description: 'Orders deleted successfully',
    })
    async deleteOrder(@Query('id') id: string) {
        return await this.orderService.deleteOrder(id);
    }
    @Put('update-order-by-id')
    @ApiOperation({ summary: 'Update an order by ID' })
    @ApiResponse({
        status: 200,
        description: 'Orders updated successfully',
    })
    async updateOrder(@Query('id') id: string, @Body() body: OrderDto) {
        return await this.orderService.updateOrder(id, body);
    }
}
