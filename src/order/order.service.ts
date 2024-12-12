import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { OrderDto } from './dtos/order.dto';
import { UpdateOrderDto } from './dtos/updateorder.dto';

@Injectable()
export class OrderService {
    constructor(private readonly dbService: DatabaseService) {}

    async placeOrder(body: OrderDto, c_id: string) {
        try {
            await this.dbService.query(
                `EXEC InsertOrder @customer_id = @p1, @store_id = @p2`,
                [
                { name: 'p1', value: c_id },
                { name: 'p2', value: body.store_id }
            ]
        );
        return { message: 'Order placed successfully.' };
    } catch (error) {
        return { message: 'Failed to place order.' };
    }
    }
    async getOrders(e_id: string, order_id: string) {
        try {
            return await this.dbService.query(`EXEC GetOrders @e_id = @p1, @order_id = @p2`, [{name: 'p1', value: e_id}, {name: 'p2', value: order_id}]);
        } catch (error) {
            return { message: 'Failed to get orders.' };
        }   
    }
    async getAllOrders(e_id: string){
        try {
            return await this.dbService.query(`EXEC GetAllOrders @e_id = @p1`, [{name: 'p1', value: e_id}]);
        } catch (error) {
            return { message: 'Failed to get orders.' };
        }
    }
    async deleteOrder(id: string){
        try {
            await this.dbService.query(`EXEC DeleteOrder @order_id = @p1`, [{name: 'p1', value: id}]);
            return { message: 'Order deleted successfully.' };
        } catch (error) {
            return { message: 'Failed to delete order.' };
        }
    }
    async updateOrder(id: string, body: UpdateOrderDto) {
        const query = `
            EXEC UpdateOrder 
                @order_id = @p1, 
                @salesman_id = @p2, 
                @shipper_id = @p3, 
                @store_id = @p4, 
                @price = @p5, 
                @complete = @p6, 
                @createAt = @p7;
        `;
        const parameters = [
            { name: 'p1', value: id },
            { name: 'p2', value: body.salesman_id },
            { name: 'p3', value: body.shipper_id },
            { name: 'p4', value: body.store_id },
            { name: 'p5', value: body.price },
            { name: 'p6', value: body.complete },
            { name: 'p7', value: body.createAt },
        ];
    
        try {
            return await this.dbService.query(query, parameters);
        } catch (error) {
            console.error('Error updating order:', error.message);
            throw new Error('Failed to update the order.');
        }
    }    
}
