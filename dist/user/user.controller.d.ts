import { UserService } from './user.service';
import { ClientDto } from './dtos/client.dto';
import { DatabaseService } from 'src/database/database.service';
import { EmployeeDto } from './dtos/staff.dto';
import { loginDTO } from './dtos/login.dto';
import { evaluating } from './dtos/evaluating.dto';
export declare class UserController {
    private readonly userService;
    private readonly database;
    constructor(userService: UserService, database: DatabaseService);
    registerClient(body: ClientDto): Promise<{
        message: string;
    }>;
    registerStaff(body: EmployeeDto, storeId: string): Promise<{
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
    deleteClient(clientId: string): Promise<any>;
    deleteStaff(employeeId: string): Promise<any>;
    updateClient(clientId: string, body: ClientDto): Promise<unknown>;
    updateStaff(employeeId: string, body: EmployeeDto): Promise<unknown>;
    getClientbyID(customerID: string): Promise<unknown>;
    getallClient(): Promise<unknown>;
    getAllStaff(store_id: string): Promise<unknown>;
    getAdmin(store_id: string): Promise<unknown>;
    evaluate(e_id: string, body: evaluating): Promise<unknown>;
}
