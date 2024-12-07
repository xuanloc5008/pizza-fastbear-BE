import { UserService } from './user.service';
import { ClientDto } from './dtos/client.dto';
import { DatabaseService } from 'src/database/database.service';
import { EmployeeDto } from './dtos/staff.dto';
import { loginDTO } from './dtos/login.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService, database: DatabaseService);
    register(body: ClientDto): Promise<{
        message: string;
    }>;
    registerStaff(body: EmployeeDto, id: string): Promise<{
        message: string;
    }>;
    login(body: loginDTO): Promise<{
        message: string;
        access_token?: undefined;
    } | {
        message: string;
        access_token: string;
    }>;
    deleteClient(id: string): Promise<any>;
    deleteStaff(id: string): Promise<any>;
}
