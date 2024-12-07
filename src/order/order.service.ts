import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { OrderDto } from './dtos/order.dto';

@Injectable()
export class OrderService {
    constructor(private readonly dbService: DatabaseService) {}

    async placeOrder(body: OrderDto, c_id: string) {
        return await this.dbService.query(
            'INSERT INTO Orders (id, customer_id, components, price) VALUES (NEWID(), @p1, @p2, @p3)',
            [
                { name: 'p1', value: c_id },      
                { name: 'p2', value: body.components }, 
                { name: 'p3', value: body.price }       
            ]
        );
    }
    async getOrders(c_id: string) {
        return await this.dbService.query('SELECT * FROM Orders WHERE customer_id = @p1', [{ name: 'p1', value: c_id }]);
    }
    async getAllOrders(){
        return await this.dbService.query('SELECT * FROM Orders');
    }
}
