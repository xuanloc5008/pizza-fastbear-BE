import { UserService } from './user.service';
import { ClientDto } from './dtos/client.dto';
import { DatabaseService } from 'src/database/database.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService, database: DatabaseService);
    register(body: ClientDto): Promise<{
        message: string;
    }>;
}
