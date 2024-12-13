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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const swagger_1 = require("@nestjs/swagger");
const updateorder_dto_1 = require("./dtos/updateorder.dto");
const Dishes_dto_1 = require("./dtos/Dishes.dto");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getOrders(e_id) {
        return await this.orderService.getOrders(e_id);
    }
    async getAllOrders(e_id) {
        return await this.orderService.getAllOrders(e_id);
    }
    async deleteOrder(id) {
        return await this.orderService.deleteOrder(id);
    }
    async updateOrder(id, body) {
        return await this.orderService.updateOrder(id, body);
    }
    async order(order_id, customer_id, body) {
        return await this.orderService.order(order_id, customer_id, body);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)('get-order-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve orders for a specific salesman' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Orders retrieved successfully',
    }),
    __param(0, (0, common_1.Query)('e_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)('get-orders'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all orders in the system' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Orders retrieved successfully',
    }),
    __param(0, (0, common_1.Query)('e_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Delete)('delete-order-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an order by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Orders deleted successfully',
    }),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
__decorate([
    (0, common_1.Put)('update-order-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an order by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Orders updated successfully',
    }),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateorder_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Post)('order'),
    (0, swagger_1.ApiOperation)({ summary: 'Order a dish' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dish ordered successfully',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'order_id',
        description: 'Order ID',
        required: true,
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'customer_id',
        description: 'Customer ID',
        required: true,
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __param(0, (0, common_1.Query)('order_id')),
    __param(1, (0, common_1.Query)('customer_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Dishes_dto_1.AddDishesToOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "order", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, swagger_1.ApiTags)('Order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map