import { Injectable } from '@nestjs/common';
import { ClientDto } from './dtos/client.dto';
import * as sql from 'mssql';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmployeeDto } from './dtos/staff.dto';
import { loginDTO } from './dtos/login.dto';

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
                'INSERT INTO Customer (id, phone_no, C_username, C_password, ward, city, name, district ) VALUES (NEWID(), @p1, @p2, @p3, @p4, @p5, @p6, @p7)',
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
    async staffRegister(body: EmployeeDto, store_id: string){
        const check = await this.dbService.query<any>(
            'SELECT *  FROM Employee WHERE e_id = @p1',
            [{name: 'p1', value: body.e_id}]
        );
        try{
            const isvalid = check.length > 0;
            return {message: 'Employee has been existed'};
        }
        catch(error){
            await this.dbService.query<any>(
                'INSERT INTO Employee (e_id, last_name, first_name, ward, district, city, phone_no, store_id) VALUE (@p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8)',
                [
                    { name: 'p1', value: body.e_id },   
                    { name: 'p2', value: body.last_name },  
                    { name: 'p3', value: body.first_name }, 
                    { name: 'p4', value: body.ward }, 
                    { name: 'p5', value: body.district }, 
                    { name: 'p6', value: body.city }, 
                    { name: 'p7', value: body.phone_no }, 
                    { name: 'p8', value: store_id } 
                ]
            ) 
            return {message : 'Sucessfully created'}
        }
    }
    async login(body: loginDTO) {
        const user = await this.dbService.query<any>('SELECT * FROM Customer WHERE C_username = @p1', [{ name: 'p1', value: body.username }]);
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
}
