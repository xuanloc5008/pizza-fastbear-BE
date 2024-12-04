import { ClientDto } from './dtos/client.dto';
import { DatabaseService } from '../database/database.service';
export declare class UserService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    register(body: ClientDto): Promise<{
        message: string;
    }>;
}
