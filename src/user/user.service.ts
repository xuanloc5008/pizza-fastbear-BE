import { Injectable } from '@nestjs/common';
import { ClientDto } from './dtos/client.dto';
import * as sql from 'mssql';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly dbService: DatabaseService) {}

    async register(body: ClientDto) {
        const hashedPassword = await bcrypt.hash(body.password, 10);
    
        try {
            const result = await this.dbService.query(
                'INSERT INTO Customer (id, phone_no, C_username, C_password, ward, city, name) VALUES (NEWID(), @p1, @p2, @p3, @p4, @p5, @p6)',
                [
                    { name: 'p1', value: body.phone_number },
                    { name: 'p2', value: body.username },
                    { name: 'p3', value: hashedPassword },
                    { name: 'p4', value: body.ward },
                    { name: 'p5', value: body.city },
                    { name: 'p6', value: body.name },
                ]
            );
    
            console.log('Query Result:', result);

    
            return { message: 'User registered successfully.' };
        } catch (error) {
            console.error('Error registering user:', error);
            throw new Error('Registration failed.');
        }
    }
    
}
