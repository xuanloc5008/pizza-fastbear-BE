import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientDto } from './dtos/client.dto';
import { DatabaseService } from 'src/database/database.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, database: DatabaseService) {
        database.onApplicationShutdown();
    }

    @Post('client/register')
    async register(@Body() body: ClientDto) {
        try {
            console.log(body);
            return await this.userService.register(body);
        } catch (error) {
            throw new HttpException(
                'Failed to register user',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    @Post('client/login')
    async login(@Body() body: ClientDto) {
        return await this.userService.login(body);
    }
}
