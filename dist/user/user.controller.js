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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const client_dto_1 = require("./dtos/client.dto");
const database_service_1 = require("../database/database.service");
const swagger_1 = require("@nestjs/swagger");
const staff_dto_1 = require("./dtos/staff.dto");
const login_dto_1 = require("./dtos/login.dto");
let UserController = class UserController {
    constructor(userService, database) {
        this.userService = userService;
        database.onApplicationShutdown();
    }
    async register(body) {
        try {
            console.log(body);
            return await this.userService.register(body);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to register user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async registerStaff(body, id) {
        try {
            console.log(body);
            return await this.userService.staffRegister(body, id);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to register staff', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(body) {
        return await this.userService.login(body);
    }
    async deleteClient(id) {
        return this.userService.deleteClientbyID(id);
    }
    async deleteStaff(id) {
        return this.userService.deleteStaff(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('client/register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new client' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User successfully registered',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error while registering user',
    }),
    (0, swagger_1.ApiBody)({
        type: client_dto_1.ClientDto,
        description: 'Client registration details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.ClientDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('staff/register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new staff' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User successfully registered',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error while registering user',
    }),
    (0, swagger_1.ApiBody)({
        type: client_dto_1.ClientDto,
        description: 'Client registration details',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('e_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_dto_1.EmployeeDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerStaff", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login a client' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User successfully logged in',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid login credentials',
    }),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.loginDTO,
        description: 'Client login details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.loginDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Delete)('client/deleteClient'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a client' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Cannot delete'
    }),
    __param(0, (0, common_1.Query)('c_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteClient", null);
__decorate([
    (0, common_1.Delete)('staff/delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a staff' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Cannot delete'
    }),
    __param(0, (0, common_1.Query)('e_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteStaff", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService, database_service_1.DatabaseService])
], UserController);
//# sourceMappingURL=user.controller.js.map