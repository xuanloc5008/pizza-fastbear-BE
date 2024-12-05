import { ClientDto } from './dtos/client.dto';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly dbService;
    private readonly jwtService;
    constructor(dbService: DatabaseService, jwtService: JwtService);
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
