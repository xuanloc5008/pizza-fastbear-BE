import { Injectable } from '@nestjs/common';
import { ClientDto } from './dtos/client.dto';
import * as sql from 'mssql';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmployeeDto } from './dtos/staff.dto';
import { loginDTO } from './dtos/login.dto';
import { console } from 'inspector';
import { evaluating } from './dtos/evaluating.dto';
@Injectable()
export class UserService {
    constructor(
        private readonly dbService: DatabaseService,
        private readonly jwtService: JwtService
    ) {}
    async register(body: ClientDto) {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        try {
            const valid = await this.dbService.query<any>(
                'SELECT * FROM Customer WHERE C_username = @p1', 
                [{ name: 'p1', value: body.username }]
            );
            
            const isValid = valid.length > 0;
            if (isValid) {
                return { message: 'Username already exists.' };
            }
            const result = await this.dbService.query(
                `EXEC AddCustomer 
                    @C_username=@p2, 
                    @C_password=@p3, 
                    @name=@p6, 
                    @ward=@p4, 
                    @district=@p7, 
                    @city=@p5, 
                    @phone_no=@p1`, 
                [
                    { name: 'p1', value: body.phone_number },
                    { name: 'p2', value: body.username },
                    { name: 'p3', value: hashedPassword },
                    { name: 'p4', value: body.ward },
                    { name: 'p5', value: body.city },
                    { name: 'p6', value: body.name },
                    { name: 'p7', value: body.district },
                ]
            );
            
    
            console.log('Query Result:', result);
    
            return { message: 'User registered successfully.' };
        } catch (error) {
            console.error('Error registering user:', error);
            throw new Error('Registration failed.');
        }
    }
    async staffRegister(body: EmployeeDto, store_id: string) {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        
        const check = await this.dbService.query<any>(
            'SELECT * FROM Employee WHERE e_id = @p1',
            [{ name: 'p1', value: body.e_id }]
        );
        
        console.log(check);
    
        if (check.length > 0) {
            return { message: 'Employee has already been registered.' };
        }
    
        try {
            await this.dbService.query<any>(
                `INSERT INTO Employee (e_id, last_name, first_name, ward, district, city, phone_no, yob, username, password)
                 VALUES (@p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8, @p9, @p10)`,
                [
                    { name: 'p1', value: body.e_id },
                    { name: 'p2', value: body.last_name },
                    { name: 'p3', value: body.first_name },
                    { name: 'p4', value: body.ward },
                    { name: 'p5', value: body.district },
                    { name: 'p6', value: body.city },
                    { name: 'p7', value: body.phone_no },
                    { name: 'p8', value: body.yob },
                    { name: 'p9', value: body.username },
                    { name: 'p10', value: hashedPassword }
                ]
            );
    
            return { message: 'Successfully created.' };
        } catch (error) {
            console.error('Error creating employee:', error);
            return { message: 'Error occurred while creating the employee.', error: error.message };
        }
    }
    
    async login(body: loginDTO) {
        const user = await this.dbService.query(
            'SELECT * FROM dbo.LoginCustomer(@p1, @p2)',
            [{ name: 'p1', value: body.username }, { name: 'p2', value: body.password }]
        );

        // const isMatch = await bcrypt.compare(body.password, user[0].password);
        // if (!isMatch) {
        //     return { message: 'Invalid credentials.' };
        // }
        let role = user[0].role;
        role = role.trim()
        const payload = { 
            id: user[0].id, 
            role: role,
        };
        
        const token = await this.jwtService.signAsync(payload);

        return {
            message: 'Login successful.',
            access_token: token,
            role: role
        };
    }
    async loginStaff(body: loginDTO) {
        const user = await this.dbService.query(
            'SELECT * FROM dbo.LoginEmployee(@p1, @p2)',
            [{ name: 'p1', value: body.username }, { name: 'p2', value: body.password }]
        );
        let role = user[0].role;
        role = role.trim()
        const payload = { 
            id: user[0].id, 
            role: role,
        };
        
        const token = await this.jwtService.signAsync(payload);

        return {
            message: 'Login successful.',
            access_token: token,
            role: role
        };
    }
    async deleteClientbyID(id : string){
        return await this.dbService.query<any>(
            'DELETE FROM Customer WHERE id = @p1',
            [{ name: 'p1', value: id }]
        );        
    }
    async deleteStaff(id: string){
        return await this.dbService.query<any>(
            'DELETE FROM Employee WHERE e_id = @p1',
            [{name: 'p1', value: id}]
        )
    }
    async updateClient(id: string, body: ClientDto){
        return await this.dbService.query('UPDATE Customer SET (phone_no, C_username, C_password, ward, city, name, district) WHERE id = @p1', [{name: 'p1', value: id}, {name: 'p2', value: body.phone_number}, {name: 'p3', value: body.username}, {name: 'p4', value: body.ward}, {name: 'p5', value: body.city}, {name: 'p6', value: body.name}, {name: 'p7', value: body.district}]);
    }
    async updateStaff(id: string, body: EmployeeDto){
        return await this.dbService.query('UPDATE Employee SET (last_name, first_name, ward, district, city, phone_no, store_id) WHERE e_id = @p1', [{name: 'p1', value: id}, {name: 'p2', value: body.last_name}, {name: 'p3', value: body.first_name}, {name: 'p4', value: body.ward}, {name: 'p5', value: body.district}, {name: 'p6', value: body.city}, {name: 'p7', value: body.phone_no}, {name: 'p8', value: body.store_id}]);
    }
    async getClientbyID(id: string) {
        
        const result = await this.dbService.query(
            'EXEC getCustomer @id = @p1',
            [{name: 'p1', value: id}]
        );
        return result;
    }
    async getAllClient() {
        const result = await this.dbService.query(
            'EXEC getAllCustomer'
        );
        return result;
    }
    async getAllEmployee(store_id: string) {
        const result = await this.dbService.query(
            'SELECT * FROM getAllEmployee(@p1)',
            [{ name: 'p1', value: store_id }]
        );
        return result;
    }
    
    async getAdmin(store_id: string) {
        const result = await this.dbService.query(
            'EXEC findAdminEmployeesInStore @store_id = @p1',
            [{name: 'p1', value: store_id}]
        )
        return result
    }
    async evaluating(e_id: string, body: evaluating){
        const result = await this.dbService.query(
            'EXEC EvalEmployee @e_id = @p1, @score = @p2, @feedbacks = @p3',
            [{name: 'p1', value: e_id},
                {name: 'p2', value: body.score},
                {name: 'p3', value: body.feedbacks}
            ]
        )
        return result;
    }
}
