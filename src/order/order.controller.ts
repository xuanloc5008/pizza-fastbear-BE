import { Controller, Param, Query, Get, Post, Body, Delete, Put, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dtos/order.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../user/guards/jwt.guards';
import { Role, Roles } from 'src/user/decorators/roles.decorator';
import { RolesGuard } from 'src/user/guards/role.guards';
import { UpdateOrderDto } from './dtos/updateorder.dto';
import { AddDishesToOrderDto } from './dtos/Dishes.dto';
@Controller('order')
@ApiTags('Order')
// @UseGuards(JwtGuard, RolesGuard)
// @Roles(Role.CLIENT, Role.EMPLOYEE, Role.ADMIN)
// @ApiBearerAuth('JWT Auth')
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
        name: 'store_id',
        description: 'store ID',
        required: true,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiQuery({
        name: 'c_id',
        description: 'Customer ID',
        required: true,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    async placeOrder(
        @Query('store_id') store_id: string,
        @Query('c_id') c_id: string
    ) {
        console.log(c_id);
        return await this.orderService.placeOrder(store_id, c_id);
    }

    @Get('get-order-by-id')
    @ApiOperation({ summary: 'Retrieve orders for a specific salesman' })
    @ApiResponse({
        status: 200,
        description: 'Orders retrieved successfully',
    })
    async getOrders(@Query('e_id') e_id: number) {
        return await this.orderService.getOrders(e_id);
    }

    @Get('get-orders')
    @ApiOperation({ summary: 'Retrieve all orders in the system' })
    @ApiResponse({
        status: 200,
        description: 'Orders retrieved successfully',
    })
    async getAllOrders(@Query('e_id') e_id: string) {
        return await this.orderService.getAllOrders(e_id);
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
    async updateOrder(@Query('id') id: string, @Body() body: UpdateOrderDto) {
        return await this.orderService.updateOrder(id, body);
    }
    @Get('get-salesman')
    @ApiOperation({ summary: 'Retrieve salesman ID by store ID' })
    @ApiResponse({
        status: 200,
        description: 'Salesman ID retrieved successfully',
    })
    async getSalesman(@Query('store_id') store_id: number) {
        return await this.orderService.getSalesman(store_id);
    }
    @Get('get-shipper')
    @ApiOperation({ summary: 'Retrieve shipper ID by store ID' })
    @ApiResponse({
        status: 200,
        description: 'Shipper ID retrieved successfully',
    })
        async getShipper(@Query('store_id') store_id: number) {
        return await this.orderService.getShipper(store_id);
    }
    @Post('add-salesman-and-shipper')
    @ApiOperation({ summary: 'Add a salesman and shipper to an order' })
    @ApiResponse({
        status: 200,
        description: 'Salesman and shipper added to order successfully',
    })
    async addSalesmanAndShipper(@Query('order_id') order_id: number, @Query('salesman_id') salesman_id: number, @Query('shipper_id') shipper_id: number) {
        return await this.orderService.addSalesmanandShipper(order_id, salesman_id, shipper_id);
    }
    @Post('add-dish-to-order-contain')
    @ApiOperation({ summary: 'Add a dish to an order' })
    @ApiResponse({
        status: 200,
        description: 'Dish added to order successfully',
    })
    async addDishToOrderContain(@Query('order_id') order_id: number, @Body() body: AddDishesToOrderDto) {
        return await this.orderService.addDishesToOrderContain(order_id, body);
    }
}
