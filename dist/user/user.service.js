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
const inspector_1 = require("inspector");
let UserService = class UserService {
    constructor(dbService, jwtService) {
        this.dbService = dbService;
        this.jwtService = jwtService;
    }
    async register(body) {
        try {
            const valid = await this.dbService.query('SELECT * FROM Customer WHERE username = @p1', [{ name: 'p1', value: body.username }]);
            const isValid = valid.length > 0;
            if (isValid) {
                return { message: 'Username already exists.' };
            }
            const result = await this.dbService.query(`EXEC AddCustomer 
                    @C_username=@p2, 
                    @C_password=@p3, 
                    @name=@p6, 
                    @ward=@p4, 
                    @district=@p7, 
                    @city=@p5, 
                    @phone_no=@p1`, [
                { name: 'p1', value: body.phone_number },
                { name: 'p2', value: body.username },
                { name: 'p3', value: body.password },
                { name: 'p4', value: body.ward },
                { name: 'p5', value: body.city },
                { name: 'p6', value: body.name },
                { name: 'p7', value: body.district },
            ]);
            inspector_1.console.log('Query Result:', result);
            return { message: 'User registered successfully.' };
        }
        catch (error) {
            inspector_1.console.error('Error registering user:', error);
            throw new Error('Registration failed.');
        }
    }
    async staffRegister(body, store_id) {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const check = await this.dbService.query('SELECT * FROM Employee WHERE username = @p1', [{ name: 'p1', value: body.e_id }]);
        if (check.length > 0) {
            return { message: 'Employee has already been registered.' };
        }
        try {
            await this.dbService.query(`EXEC InsertEmployee 
                    @store_id=@p1,
                    @last_name=@p2, 
                    @first_name=@p3, 
                    @ward=@p4, 
                    @district=@p5, 
                    @city=@p6, 
                    @phone_no=@p7, 
                    @yob=@p8, 
                    @username=@p9, 
                    @password=@p10,
                    @e_position=@p11`, [
                { name: 'p1', value: store_id },
                { name: 'p2', value: body.last_name },
                { name: 'p3', value: body.first_name },
                { name: 'p4', value: body.ward },
                { name: 'p5', value: body.district },
                { name: 'p6', value: body.city },
                { name: 'p7', value: body.phone_no },
                { name: 'p8', value: body.yob },
                { name: 'p9', value: body.username },
                { name: 'p10', value: body.password },
                { name: 'p11', value: body.e_position }
            ]);
            return { message: 'Successfully created.' };
        }
        catch (error) {
            inspector_1.console.error('Error creating employee:', error);
            return { message: 'Error occurred while creating the employee.', error: error.message };
        }
    }
    async login(body) {
        const user = await this.dbService.query('SELECT * FROM dbo.LoginCustomer(@p1, @p2)', [{ name: 'p1', value: body.username }, { name: 'p2', value: body.password }]);
        let role = user[0].role;
        role = role.trim();
        let id = user[0].id;
        const payload = {
            id: user[0].id,
            role: role,
        };
        const token = await this.jwtService.signAsync(payload);
        return {
            message: 'Login successful.',
            access_token: token,
            role: role,
            id: id
        };
    }
    async loginStaff(body) {
        const user = await this.dbService.query('SELECT * FROM dbo.LoginEmployee(@p1, @p2)', [{ name: 'p1', value: body.username }, { name: 'p2', value: body.password }]);
        let role = user[0].role;
        role = role.trim();
        let id = user[0].id;
        const payload = {
            id: user[0].id,
            role: role,
        };
        const token = await this.jwtService.signAsync(payload);
        return {
            message: 'Login successful.',
            access_token: token,
            role: role,
            id: id
        };
    }
    async deleteClientbyID(id) {
        return await this.dbService.query('DELETE FROM Customer WHERE id = @p1', [{ name: 'p1', value: id }]);
    }
    async deleteStaff(id) {
        return await this.dbService.query('DELETE FROM Employee WHERE e_id = @p1', [{ name: 'p1', value: id }]);
    }
    async updateClient(id, body) {
        return await this.dbService.query('UPDATE Customer SET (phone_no, C_username, C_password, ward, city, name, district) WHERE id = @p1', [{ name: 'p1', value: id }, { name: 'p2', value: body.phone_number }, { name: 'p3', value: body.username }, { name: 'p4', value: body.ward }, { name: 'p5', value: body.city }, { name: 'p6', value: body.name }, { name: 'p7', value: body.district }]);
    }
    async updateStaff(id, body) {
        return await this.dbService.query('UPDATE Employee SET (last_name, first_name, ward, district, city, phone_no) WHERE e_id = @p1', [{ name: 'p1', value: id }, { name: 'p2', value: body.last_name }, { name: 'p3', value: body.first_name }, { name: 'p4', value: body.ward }, { name: 'p5', value: body.district }, { name: 'p6', value: body.city }, { name: 'p7', value: body.phone_no }]);
    }
    async getClientbyID(id) {
        const result = await this.dbService.query('EXEC getCustomer @id = @p1', [{ name: 'p1', value: id }]);
        return result;
    }
    async getAllClient() {
        const result = await this.dbService.query('EXEC getAllCustomer');
        return result;
    }
    async getAllEmployee(store_id) {
        const result = await this.dbService.query('SELECT * FROM getAllEmployee(@p1)', [{ name: 'p1', value: store_id }]);
        return result;
    }
    async getAdmin(store_id) {
        const result = await this.dbService.query('EXEC findAdminEmployeesInStore @store_id = @p1', [{ name: 'p1', value: store_id }]);
        return result;
    }
    async evaluating(e_id, body) {
        const result = await this.dbService.query('EXEC EvalEmployee @e_id = @p1, @score = @p2, @feedbacks = @p3', [{ name: 'p1', value: e_id },
            { name: 'p2', value: body.score },
            { name: 'p3', value: body.feedbacks }
        ]);
        return result;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map