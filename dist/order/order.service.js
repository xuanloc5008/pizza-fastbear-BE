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
    async placeOrder(body, c_id) {
        try {
            await this.dbService.query(`EXEC InsertOrder @customer_id = @p1, @store_id = @p2`, [
                { name: 'p1', value: c_id },
                { name: 'p2', value: body.store_id }
            ]);
            return { message: 'Order placed successfully.' };
        }
        catch (error) {
            return { message: 'Failed to place order.' };
        }
    }
    async getOrders(c_id) {
        try {
            await this.dbService.query(`EXEC GetOrders @order_id = @p1`, [{ name: 'p1', value: c_id }]);
            return { message: 'Orders fetched successfully.' };
        }
        catch (error) {
            return { message: 'Failed to get orders.' };
        }
    }
    async getAllOrders() {
        try {
            await this.dbService.query(`EXEC GetAllOrders`);
            return { message: 'Orders fetched successfully.' };
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
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], OrderService);
//# sourceMappingURL=order.service.js.map