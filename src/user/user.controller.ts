import { Controller, Post, Body, HttpException, HttpStatus, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientDto } from './dtos/client.dto';
import { DatabaseService } from 'src/database/database.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EmployeeDto } from './dtos/staff.dto';
import { loginDTO } from './dtos/login.dto';
// import { JwtGuard } from './guards/jwt.guards';
// import { RoleGuard } from './guards/role.guards';
// import { Roles } from './decorators/roles.decorator';
@Controller('user')
@ApiTags('User')
// @UseGuards(JwtGuard)
export class UserController {
    constructor(private readonly userService: UserService, database: DatabaseService) {
        database.onApplicationShutdown();
    }
    @Post('client/register')
    // @UseGuards(JwtGuard, RoleGuard)
    // @Roles('admin')
    @ApiOperation({ summary: 'Register a new client' })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error while registering user',
    })
    @ApiBody({
        type: ClientDto,
        description: 'Client registration details',
    })
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
    @Post('staff/register')
    // @UseGuards(JwtGuard, RoleGuard)
    // @Roles('admin')
    @ApiOperation({ summary: 'Register a new staff' })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error while registering user',
    })
    @ApiBody({
        type: ClientDto,
        description: 'Client registration details',
    })
    async registerStaff(
        @Body() body: EmployeeDto,
        @Query('e_id') id: string
    ) {
        try {
            console.log(body);
            return await this.userService.staffRegister(body, id);
        } catch (error) {
            throw new HttpException(
                'Failed to register staff',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    @Post('login')
    @ApiOperation({ summary: 'Login a client' })
    @ApiResponse({
        status: 200,
        description: 'User successfully logged in',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid login credentials',
    })
    @ApiBody({
        type: loginDTO,
        description: 'Client login details',
    })
    async login(@Body() body: loginDTO) {
        return await this.userService.login(body);
    }
    @Delete('client/deleteClient')
    // @UseGuards(JwtGuard, RoleGuard)
    // @Roles('admin')
    @ApiOperation({summary: 'Delete a client'})
    @ApiResponse({
        status: 200,
        description: 'Delete successfully',
    })
    @ApiResponse({
        status: 400, 
        description: 'Cannot delete'
    })
    async deleteClient(
        @Query('c_id') id: string
    ){
        return this.userService.deleteClientbyID(id);
    }
    @Delete('staff/delete')
    // @UseGuards(JwtGuard, RoleGuard)
    // @Roles('admin')
    @ApiOperation({summary: 'Delete a staff'})
    @ApiResponse({
        status: 200,
        description: 'Delete successfully',
    })
    @ApiResponse({
        status: 400, 
        description: 'Cannot delete'
    })
    async deleteStaff(
        @Query('e_id') id: string
    ){
        return this.userService.deleteStaff(id);
    }
    @Put('update-client-by-id')
    // @UseGuards(JwtGuard, RoleGuard)
    // @Roles('admin')
    @ApiOperation({ summary: 'Update a client by ID' })
    @ApiResponse({
        status: 200,
        description: 'Client updated successfully',
    })
    async updateClient(@Query('c_id') id: string, @Body() body: ClientDto){
        return await this.userService.updateClient(id, body);
    }
    @Put('update-staff-by-id')
    // @UseGuards(JwtGuard, RoleGuard)
    // @Roles('admin')
    @ApiOperation({ summary: 'Update a staff by ID' })
    @ApiResponse({
        status: 200,
        description: 'Staff updated successfully',
    })  
    async updateStaff(@Query('e_id') id: string, @Body() body: EmployeeDto){
        return await this.userService.updateStaff(id, body);
    }
}
