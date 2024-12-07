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
        return await this.dbService.query('INSERT INTO Orders (id, customer_id, components, price) VALUES (NEWID(), @p1, @p2, @p3)', [
            { name: 'p1', value: c_id },
            { name: 'p2', value: body.components },
            { name: 'p3', value: body.price }
        ]);
    }
    async getOrders(c_id) {
        return await this.dbService.query('SELECT * FROM Orders WHERE customer_id = @p1', [{ name: 'p1', value: c_id }]);
    }
    async getAllOrders() {
        return await this.dbService.query('SELECT * FROM Orders');
    }
    async deleteOrder(id) {
        return await this.dbService.query('DELETE FROM Orders WHERE id = @p1', [{ name: 'p1', value: id }]);
    }
    async updateOrder(id, body) {
        return await this.dbService.query('UPDATE Orders SET (components, price) WHERE id = @p1', [{ name: 'p1', value: id }, { name: 'p2', value: body.components }, { name: 'p3', value: body.price }]);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], OrderService);
//# sourceMappingURL=order.service.js.map