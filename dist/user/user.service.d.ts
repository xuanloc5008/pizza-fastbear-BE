import { ClientDto } from './dtos/client.dto';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { EmployeeDto } from './dtos/staff.dto';
import { loginDTO } from './dtos/login.dto';
export declare class UserService {
    private readonly dbService;
    private readonly jwtService;
    constructor(dbService: DatabaseService, jwtService: JwtService);
    register(body: ClientDto): Promise<{
        message: string;
    }>;
    staffRegister(body: EmployeeDto, store_id: string): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    login(body: loginDTO): Promise<{
        message: string;
        access_token?: undefined;
    } | {
        message: string;
        access_token: string;
    }>;
    deleteClientbyID(id: string): Promise<any>;
    deleteStaff(id: string): Promise<any>;
    updateClient(id: string, body: ClientDto): Promise<unknown>;
    updateStaff(id: string, body: EmployeeDto): Promise<unknown>;
    getClientbyID(id: string): Promise<unknown>;
    getAllClient(): Promise<unknown>;
}
