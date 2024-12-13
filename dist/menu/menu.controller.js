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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const menu_service_1 = require("./menu.service");
const menu_dto_1 = require("./dtos/menu.dto");
const swagger_1 = require("@nestjs/swagger");
let MenuController = class MenuController {
    constructor(menu) {
        this.menu = menu;
    }
    async addDishes(body) {
        return this.menu.addDishes(body);
    }
    async viewDishes() {
        return this.menu.viewDishes();
    }
    async viewDishesID(id) {
        return this.menu.viewDishesbyID(id);
    }
    async updateDish(id, body) {
        return this.menu.updateDishesbyID(id, body);
    }
    async deleteDish(id) {
        return this.menu.deleteDish(id);
    }
    async searchDishes(query) {
        return this.menu.searchDishes(query);
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT Auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new dish' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The dish has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request payload.',
    }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.menuDTO]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "addDishes", null);
__decorate([
    (0, common_1.Get)('viewDishes'),
    (0, swagger_1.ApiOperation)({ summary: 'View all dishes' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of dishes retrieved successfully.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "viewDishes", null);
__decorate([
    (0, common_1.Get)('viewDishesbyID'),
    (0, swagger_1.ApiOperation)({ summary: 'View a dish by ID' }),
    (0, swagger_1.ApiQuery)({
        name: 'd_id',
        description: 'ID of the dish to retrieve.',
        required: true,
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dish retrieved successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Dish not found.',
    }),
    __param(0, (0, common_1.Query)('d_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "viewDishesID", null);
__decorate([
    (0, common_1.Put)('update'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing dish' }),
    (0, swagger_1.ApiQuery)({
        name: 'd_id',
        description: 'ID of the dish to update.',
        required: true,
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dish updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Dish not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request payload.',
    }),
    __param(0, (0, common_1.Query)('d_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, menu_dto_1.menuDTO]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "updateDish", null);
__decorate([
    (0, common_1.Delete)('delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a dish by ID' }),
    (0, swagger_1.ApiQuery)({
        name: 'd_id',
        description: 'ID of the dish to delete.',
        required: true,
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dish deleted successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Dish not found.',
    }),
    __param(0, (0, common_1.Query)('d_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "deleteDish", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search dishes by name or description' }),
    (0, swagger_1.ApiQuery)({
        name: 'query',
        description: 'Search term to look for in dish names or descriptions.',
        required: true,
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Search results retrieved successfully.',
    }),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "searchDishes", null);
exports.MenuController = MenuController = __decorate([
    (0, common_1.Controller)('menu'),
    (0, swagger_1.ApiTags)('Menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map