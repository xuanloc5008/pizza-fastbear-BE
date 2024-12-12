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
const jwt_guards_1 = require("./guards/jwt.guards");
const roles_decorator_1 = require("./decorators/roles.decorator");
const role_guards_1 = require("./guards/role.guards");
const evaluating_dto_1 = require("./dtos/evaluating.dto");
let UserController = class UserController {
    constructor(userService, database) {
        this.userService = userService;
        this.database = database;
        database.onApplicationShutdown();
    }
    async registerClient(body) {
        try {
            console.log(body);
            return await this.userService.register(body);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to register client', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async registerStaff(body, storeId) {
        try {
            return await this.userService.staffRegister(body, storeId);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to register staff', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(body) {
        try {
            return await this.userService.login(body);
        }
        catch (error) {
            throw new common_1.HttpException('Login failed', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async deleteClient(clientId) {
        try {
            return await this.userService.deleteClientbyID(clientId);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to delete client', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteStaff(employeeId) {
        try {
            return await this.userService.deleteStaff(employeeId);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to delete staff', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateClient(clientId, body) {
        try {
            return await this.userService.updateClient(clientId, body);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to update client', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateStaff(employeeId, body) {
        try {
            return await this.userService.updateStaff(employeeId, body);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to update staff', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getClientbyID(customerID) {
        return this.userService.getClientbyID(customerID);
    }
    async getallClient() {
        return this.userService.getAllClient();
    }
    async getAllStaff(store_id) {
        return this.userService.getAllEmployee(store_id);
    }
    async getAdmin(store_id) {
        return this.userService.getAdmin(store_id);
    }
    async evaluate(e_id, body) {
        return this.userService.evaluating(e_id, body);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('client/register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new client' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Client successfully registered',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error while registering client',
    }),
    (0, swagger_1.ApiBody)({
        type: client_dto_1.ClientDto,
        description: 'Client registration details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.ClientDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerClient", null);
__decorate([
    (0, common_1.Post)('staff/register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new staff member' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Staff successfully registered',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error while registering staff',
    }),
    (0, swagger_1.ApiBody)({
        type: staff_dto_1.EmployeeDto,
        description: 'Staff registration details',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_dto_1.EmployeeDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerStaff", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'User login' }),
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
        description: 'Login details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.loginDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Delete)('client/delete'),
    (0, common_1.UseGuards)(role_guards_1.RolesGuard, jwt_guards_1.JwtGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.CLIENT),
    (0, swagger_1.ApiBearerAuth)('JWT Auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a client' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Client successfully deleted',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed to delete client',
    }),
    __param(0, (0, common_1.Query)('c_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteClient", null);
__decorate([
    (0, common_1.Delete)('staff/delete'),
    (0, common_1.UseGuards)(role_guards_1.RolesGuard, jwt_guards_1.JwtGuard),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard, role_guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT Auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a staff member' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Staff successfully deleted',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed to delete staff',
    }),
    __param(0, (0, common_1.Query)('e_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteStaff", null);
__decorate([
    (0, common_1.Put)('client/update'),
    (0, swagger_1.ApiBearerAuth)('JWT Auth'),
    (0, common_1.UseGuards)(role_guards_1.RolesGuard, jwt_guards_1.JwtGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Update a client by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Client updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed to update client',
    }),
    __param(0, (0, common_1.Query)('c_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_dto_1.ClientDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateClient", null);
__decorate([
    (0, common_1.Put)('staff/update'),
    (0, swagger_1.ApiBearerAuth)('JWT Auth'),
    (0, common_1.UseGuards)(role_guards_1.RolesGuard, jwt_guards_1.JwtGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.EMPLOYEE, roles_decorator_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update a staff member by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Staff updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed to update staff',
    }),
    __param(0, (0, common_1.Query)('e_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, staff_dto_1.EmployeeDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateStaff", null);
__decorate([
    (0, common_1.Get)('client/getInfo'),
    (0, swagger_1.ApiBearerAuth)('JWT Auth'),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard, role_guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.CLIENT),
    (0, swagger_1.ApiOperation)({ summary: 'Get user information by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed',
    }),
    __param(0, (0, common_1.Query)('c_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getClientbyID", null);
__decorate([
    (0, common_1.Get)('staff/getClientInfo'),
    (0, swagger_1.ApiBearerAuth)('JWT Auth'),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard, role_guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.EMPLOYEE, roles_decorator_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get user information' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getallClient", null);
__decorate([
    (0, common_1.Get)('staff/getInfo'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all staffs' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed',
    }),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllStaff", null);
__decorate([
    (0, common_1.Get)('staff/admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get admin' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed',
    }),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Post)('staff/evaluate'),
    (0, swagger_1.ApiOperation)({ summary: 'Evaluating' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Seccessfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed',
    }),
    __param(0, (0, common_1.Query)('e_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, evaluating_dto_1.evaluating]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "evaluate", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        database_service_1.DatabaseService])
], UserController);
//# sourceMappingURL=user.controller.js.map