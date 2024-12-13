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
    async placeOrder(store_id, c_id) {
        console.log(c_id);
        return await this.orderService.placeOrder(store_id, c_id);
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
    async getSalesman(store_id) {
        return await this.orderService.getSalesman(store_id);
    }
    async getShipper(store_id) {
        return await this.orderService.getShipper(store_id);
    }
    async addSalesmanAndShipper(order_id, salesman_id, shipper_id) {
        return await this.orderService.addSalesmanandShipper(order_id, salesman_id, shipper_id);
    }
    async addDishToOrderContain(order_id, body) {
        return await this.orderService.addDishesToOrderContain(order_id, body);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('place-order'),
    (0, swagger_1.ApiOperation)({ summary: 'Place a new order for a customer' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Order placed successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid input data',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'store_id',
        description: 'store ID',
        required: true,
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'c_id',
        description: 'Customer ID',
        required: true,
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __param(0, (0, common_1.Query)('store_id')),
    __param(1, (0, common_1.Query)('c_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "placeOrder", null);
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
    (0, common_1.Get)('get-salesman'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve salesman ID by store ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Salesman ID retrieved successfully',
    }),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getSalesman", null);
__decorate([
    (0, common_1.Get)('get-shipper'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve shipper ID by store ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Shipper ID retrieved successfully',
    }),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getShipper", null);
__decorate([
    (0, common_1.Post)('add-salesman-and-shipper'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a salesman and shipper to an order' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Salesman and shipper added to order successfully',
    }),
    __param(0, (0, common_1.Query)('order_id')),
    __param(1, (0, common_1.Query)('salesman_id')),
    __param(2, (0, common_1.Query)('shipper_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addSalesmanAndShipper", null);
__decorate([
    (0, common_1.Post)('add-dish-to-order-contain'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a dish to an order' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dish added to order successfully',
    }),
    __param(0, (0, common_1.Query)('order_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Dishes_dto_1.AddDishesToOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addDishToOrderContain", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, swagger_1.ApiTags)('Order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map