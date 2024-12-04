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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async register(body) {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        try {
            const result = await this.dbService.query('INSERT INTO Customer (id, phone_no, C_username, C_password, ward, city, name) VALUES (NEWID(), @p1, @p2, @p3, @p4, @p5, @p6)', [
                { name: 'p1', value: body.phone_number },
                { name: 'p2', value: body.username },
                { name: 'p3', value: hashedPassword },
                { name: 'p4', value: body.ward },
                { name: 'p5', value: body.city },
                { name: 'p6', value: body.name },
            ]);
            console.log('Query Result:', result);
            return { message: 'User registered successfully.' };
        }
        catch (error) {
            console.error('Error registering user:', error);
            throw new Error('Registration failed.');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UserService);
//# sourceMappingURL=user.service.js.map