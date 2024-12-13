"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let OrderService = class OrderService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async placeOrder(store_id, c_id) {
        try {
            const result = await this.dbService.query(`EXEC InsertOrder @customer_id = @p1, @store_id = @p2, @createAt = @p3, @completeAt = @p4`, [
                { name: 'p1', value: c_id },
                { name: 'p2', value: store_id },
                { name: 'p3', value: new Date().toTimeString().split(' ')[0] },
                { name: 'p4', value: new Date().toTimeString().split(' ')[0] }
            ]);
            return { result, message: 'Order placed successfully.' };
        }
        catch (error) {
            return { message: 'Failed to place order.' };
        }
    }
    async getOrders(salesman_id) {
        try {
            return await this.dbService.query(`EXEC GetOrders @salesman_id = @p1`, [{ name: 'p1', value: salesman_id }]);
        }
        catch (error) {
            console.error('Error fetching orders:', error);
            return { message: 'Failed to get orders.' };
        }
    }
    async getAllOrders(e_id) {
        try {
            return await this.dbService.query(`EXEC GetAllOrders @e_id = @p1`, [{ name: 'p1', value: e_id }]);
        }
        catch (error) {
            return { message: 'Failed to get orders.' };
        }
    }
    async deleteOrder(id) {
        try {
            await this.dbService.query(`EXEC DeleteOrder @order_id = @p1`, [{ name: 'p1', value: id }]);
            return { message: 'Order deleted successfully.' };
        }
        catch (error) {
            return { message: 'Failed to delete order.' };
        }
    }
    async updateOrder(id, body) {
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
        }
        catch (error) {
            console.error('Error updating order:', error.message);
            throw new Error('Failed to update the order.');
        }
    }
    async getSalesman(strore_id) {
        try {
            let result = await this.dbService.query('SELECT * FROM dbo.GetSalesmanID(@p1)', [{ name: 'p1', value: strore_id }]);
            if (result.length === 1) {
                return { message: 'Salesman retrieved successfully.', salesman_id: result[0] };
            }
            const randomIndex = Math.floor(Math.random() * result.length);
            console.log(randomIndex);
            const salesman_id = result[randomIndex];
            console.log(salesman_id);
            return { message: 'Salesman retrieved successfully.', salesman_id: salesman_id };
        }
        catch (error) {
            return { message: 'Failed to get salesman.' };
        }
    }
    async getShipper(store_id) {
        try {
            let result = await this.dbService.query('SELECT * FROM dbo.GetShipperID(@p1)', [{ name: 'p1', value: store_id }]);
            if (result.length === 1) {
                return { message: 'Shipper retrieved successfully.', shipper_id: result[0] };
            }
            const randomIndex = Math.floor(Math.random() * result.length);
            const shipper_id = result[randomIndex];
            return { message: 'Shipper retrieved successfully.', shipper_id: shipper_id };
        }
        catch (error) {
            return { message: 'Failed to get shipper.' };
        }
    }
    async addSalesmanandShipper(order_id, salesman_id, shipper_id) {
        try {
            await this.dbService.query('EXEC addSalesmanOrder @order_id = @p1, @salesman_id = @p2', [{ name: 'p1', value: order_id }, { name: 'p2', value: salesman_id }]);
            await this.dbService.query('EXEC addShipperOrder @order_id = @p1, @shipper_id = @p2', [{ name: 'p1', value: order_id }, { name: 'p2', value: shipper_id }]);
            return { message: 'Salesman and shipper added successfully.' };
        }
        catch (error) {
            return { message: 'Failed to add salesman and shipper.' };
        }
    }
    async addDishesToOrderContain(order_id, dto) {
        const { component } = dto;
        try {
            for (const el of component) {
                await this.dbService.query(`EXEC addDishestoOrderContain @order_id = @p1, @dishes_id = @p2, @quantity = @p3`, [
                    { name: 'p1', value: order_id },
                    { name: 'p2', value: el.dish_id },
                    { name: 'p3', value: el.quantity },
                ]);
            }
            return { message: 'All dishes added to the order successfully.' };
        }
        catch (error) {
            return { message: 'Failed to add some or all dishes to the order.', error };
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], OrderService);
//# sourceMappingURL=order.service.js.map