import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { OrderDto } from './dtos/order.dto';
import { UpdateOrderDto } from './dtos/updateorder.dto';
import { AddDishesToOrderDto } from './dtos/Dishes.dto';

@Injectable()
export class OrderService {
    constructor(private readonly dbService: DatabaseService) { }

    async placeOrder(store_id: string, c_id: string) {
        try {
            const currentTime = new Date();
            const laterTime = new Date(currentTime.getTime() + 30 * 60 * 1000);
            const currentTimeFormatted = currentTime.toTimeString().split(' ')[0]; 
            const laterTimeFormatted = laterTime.toTimeString().split(' ')[0]; 
            const result = await this.dbService.query(
                `EXEC InsertOrder @customer_id = @p1, @store_id = @p2, @createAt = @p3, @completeAt = @p4`,
                [
                    { name: 'p1', value: c_id },
                    { name: 'p2', value: store_id },
                    { name: 'p3', value: currentTimeFormatted},
                    { name: 'p4', value: laterTimeFormatted}
                ]
            );
            const final = result[0].id;
            return final;
        } catch (error) {
            return { message: 'Failed to place order.' };
        }
    }
    async getOrders(salesman_id: number) {
        try {
            return await this.dbService.query(`EXEC GetOrders @salesman_id = @p1`, [{ name: 'p1', value: salesman_id }]);
        } catch (error) {
            console.error('Error fetching orders:', error);
            return { message: 'Failed to get orders.' };
        }
    }
    
    async getAllOrders(e_id: string) {
        try {
            return await this.dbService.query(`EXEC GetAllOrders @e_id = @p1`, [{ name: 'p1', value: e_id }]);
        } catch (error) {
            return { message: 'Failed to get orders.' };
        }
    }
    async deleteOrder(id: string) {
        try {
            await this.dbService.query(`EXEC DeleteOrder @order_id = @p1`, [{ name: 'p1', value: id }]);
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
    async getSalesman(strore_id : number){
        try{
            let result = await this.dbService.query<any>(
                'SELECT * FROM dbo.GetSalesmanID(@p1)',
                [{ name: 'p1', value: strore_id }]
            )
            if (result.length === 1) {
                return {message: 'Salesman retrieved successfully.', salesman_id: result[0] };
            }
            const randomIndex = Math.floor(Math.random() * result.length);
            const salesman_id = result[randomIndex];
            const sale = salesman_id.e_id;
            return sale;
        }catch(error){
            return { message: 'Failed to get salesman.' };
        }
    }
    async getShipper(store_id : number){
        try{
            let result = await this.dbService.query<any>(
                'SELECT * FROM dbo.GetShipperID(@p1)',
                [{ name: 'p1', value: store_id }]
            )
            if (result.length === 1) {
                return {message: 'Shipper retrieved successfully.', shipper_id: result[0] };
            }
            const randomIndex = Math.floor(Math.random() * result.length);
            const shipper_id = result[randomIndex].e_id;
            return shipper_id;
        }catch(error){
            return { message: 'Failed to get shipper.' };
        }
    }

    async addSalesmanandShipper(order_id: number, salesman_id: number, shipper_id: number){
        try{
            await this.dbService.query(
                'EXEC addSalesmanOrder @order_id = @p1, @salesman_id = @p2',
                [{ name: 'p1', value: order_id }, { name: 'p2', value: salesman_id }]
            )
            await this.dbService.query(
                'EXEC addShipperOrder @order_id = @p1, @shipper_id = @p2',
                [{ name: 'p1', value: order_id }, { name: 'p2', value: shipper_id }]
            )
            return {message: 'Salesman and shipper added successfully.' };
        }catch(error){
            return { message: 'Failed to add salesman and shipper.' };
        }
    }
    async addDishesToOrderContain(order_id: number, dto: AddDishesToOrderDto) {
        const { component } = dto;

        try {
            for (const el of component) {
                await this.dbService.query(
                    `EXEC addDishestoOrderContain @order_id = @p1, @dishes_id = @p2, @quantity = @p3`,
                    [
                        { name: 'p1', value: order_id },
                        { name: 'p2', value: el.dish_id }, // Match procedure's parameter name
                        { name: 'p3', value: el.quantity },
                    ]
                );
            }
            return { message: 'All dishes added to the order successfully.' };
        } catch (error) {
            return { message: 'Failed to add some or all dishes to the order.', error };
        }
    }
    async order(store_id: string, customer_id: string, dto: AddDishesToOrderDto) {
        try {
            const oid = await this.placeOrder(store_id, customer_id);
            const storeID = Number(store_id) 
            const salesman_id = await this.getSalesman(storeID); 
    
            const shipper_id = await this.getShipper(storeID); 
    
    
            await this.addSalesmanandShipper(oid, salesman_id, shipper_id);
    
            await this.addDishesToOrderContain(oid, dto);
    
            return { message: 'Order placed successfully.' };
        } catch (error) {
            console.error('Error:', error);
            return { message: 'Failed to place the order.', error: error.message };
        }
    }
    
}
