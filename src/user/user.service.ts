import { Injectable } from '@nestjs/common';
import { ClientDto } from './dtos/client.dto';
import * as sql from 'mssql';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
    async login(body: ClientDto) {
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
}
