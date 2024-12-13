import { ClientDto } from './dtos/client.dto';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { EmployeeDto } from './dtos/staff.dto';
import { loginDTO } from './dtos/login.dto';
import { evaluating } from './dtos/evaluating.dto';
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
        access_token: string;
        role: any;
    }>;
    loginStaff(body: loginDTO): Promise<{
        message: string;
        access_token: string;
        role: any;
    }>;
    deleteClientbyID(id: string): Promise<any>;
    deleteStaff(id: string): Promise<any>;
    updateClient(id: string, body: ClientDto): Promise<unknown>;
    updateStaff(id: string, body: EmployeeDto): Promise<unknown>;
    getClientbyID(id: string): Promise<unknown>;
    getAllClient(): Promise<unknown>;
    getAllEmployee(store_id: string): Promise<unknown>;
    getAdmin(store_id: string): Promise<unknown>;
    evaluating(e_id: string, body: evaluating): Promise<unknown>;
}
