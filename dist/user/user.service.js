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
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(dbService, jwtService) {
        this.dbService = dbService;
        this.jwtService = jwtService;
    }
    async register(body) {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        try {
            const valid = await this.dbService.query('SELECT * FROM Customer WHERE C_username = @p1', [{ name: 'p1', value: body.username }]);
            const isValid = valid.length > 0;
            if (isValid) {
                return { message: 'Username already exists.' };
            }
            const result = await this.dbService.query('INSERT INTO Customer (id, phone_no, C_username, C_password, ward, city, name, district ) VALUES (NEWID(), @p1, @p2, @p3, @p4, @p5, @p6, @p7)', [
                { name: 'p1', value: body.phone_number },
                { name: 'p2', value: body.username },
                { name: 'p3', value: hashedPassword },
                { name: 'p4', value: body.ward },
                { name: 'p5', value: body.city },
                { name: 'p6', value: body.name },
                { name: 'p7', value: body.district },
            ]);
            console.log('Query Result:', result);
            return { message: 'User registered successfully.' };
        }
        catch (error) {
            console.error('Error registering user:', error);
            throw new Error('Registration failed.');
        }
    }
    async staffRegister(body, store_id) {
        const check = await this.dbService.query('SELECT *  FROM Employee WHERE e_id = @p1', [{ name: 'p1', value: body.e_id }]);
        try {
            const isvalid = check.length > 0;
            return { message: 'Employee has been existed' };
        }
        catch (error) {
            await this.dbService.query('INSERT INTO Employee (e_id, last_name, first_name, ward, district, city, phone_no, store_id) VALUE (@p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8)', [
                { name: 'p1', value: body.e_id },
                { name: 'p2', value: body.last_name },
                { name: 'p3', value: body.first_name },
                { name: 'p4', value: body.ward },
                { name: 'p5', value: body.district },
                { name: 'p6', value: body.city },
                { name: 'p7', value: body.phone_no },
                { name: 'p8', value: store_id }
            ]);
            return { message: 'Sucessfully created' };
        }
    }
    async login(body) {
        const user = await this.dbService.query('SELECT * FROM Customer WHERE C_username = @p1', [{ name: 'p1', value: body.username }]);
        if (user.length === 0) {
            return { message: 'User not found.' };
        }
        const isMatch = await bcrypt.compare(body.password, user[0].C_password);
        if (!isMatch) {
            return { message: 'Invalid credentials.' };
        }
        const payload = {
            username: user[0].C_username,
            sub: user[0].id,
            password: user[0].C_password
        };
        const token = await this.jwtService.signAsync(payload);
        return {
            message: 'Login successful.',
            access_token: token
        };
    }
    async deleteClientbyID(id) {
        return await this.dbService.query('DELETE FROM Customer WHERE id = @p1', [{ name: 'p1', value: id }]);
    }
    async deleteStaff(id) {
        return await this.dbService.query('DELETE FROM Employee WHERE e_id = @p1', [{ name: 'p1', value: id }]);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map