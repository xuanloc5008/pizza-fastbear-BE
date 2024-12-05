import { UserService } from './user.service';
import { ClientDto } from './dtos/client.dto';
import { DatabaseService } from 'src/database/database.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService, database: DatabaseService);
    register(body: ClientDto): Promise<{
        message: string;
    }>;
    login(body: ClientDto): Promise<{
        message: string;
        access_token?: undefined;
    } | {
        message: string;
        access_token: string;
    }>;
}
