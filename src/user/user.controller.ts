import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
    Delete,
    Query,
    Put,
    UseGuards,
    Get,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { ClientDto } from './dtos/client.dto';
  import { DatabaseService } from 'src/database/database.service';
  import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
  import { EmployeeDto } from './dtos/staff.dto';
  import { loginDTO } from './dtos/login.dto';
  import { JwtGuard } from './guards/jwt.guards';
  import { Roles, Role } from './decorators/roles.decorator';
  import { RolesGuard } from './guards/role.guards';
import { evaluating } from './dtos/evaluating.dto';
  @Controller('user')
  @ApiTags('User')
  export class UserController {
    constructor(
      private readonly userService: UserService,
      private readonly database: DatabaseService,
    ) {
      database.onApplicationShutdown();
    }
  
    @Post('client/register')
    @ApiOperation({ summary: 'Register a new client' })
    @ApiResponse({
      status: 201,
      description: 'Client successfully registered',
    })
    @ApiResponse({
      status: 500,
      description: 'Internal server error while registering client',
    })
    @ApiBody({
      type: ClientDto,
      description: 'Client registration details',
    })
    async registerClient(@Body() body: ClientDto) {
      try {
        console.log(body);
        return await this.userService.register(body);
      } catch (error) {
        throw new HttpException(
          'Failed to register client',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Post('staff/register')
    // @ApiBearerAuth('JWT Auth')
    // @UseGuards(JwtGuard, RolesGuard) 
    // @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Register a new staff member' })
    @ApiResponse({
      status: 201,
      description: 'Staff successfully registered',
    })
    @ApiResponse({
      status: 500,
      description: 'Internal server error while registering staff',
    })
    @ApiBody({
      type: EmployeeDto,
      description: 'Staff registration details',
    })
    async registerStaff(
      @Body() body: EmployeeDto,
      @Query('store_id') storeId: string,
    ) {
      try {
        return await this.userService.staffRegister(body, storeId);
      } catch (error) {
        throw new HttpException(
          'Failed to register staff',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Post('login')
    @ApiOperation({ summary: 'User login' })
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
      description: 'Login details',
    })
    async login(@Body() body: loginDTO) {
      try {
        return await this.userService.login(body);
      } catch (error) {
        throw new HttpException(
          'Login failed',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  
    @Delete('client/delete')
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(Role.ADMIN, Role.CLIENT)
    @ApiBearerAuth('JWT Auth')
    @ApiOperation({ summary: 'Delete a client' })
    @ApiResponse({
      status: 200,
      description: 'Client successfully deleted',
    })
    @ApiResponse({
      status: 400,
      description: 'Failed to delete client',
    })
    async deleteClient(@Query('c_id') clientId: string): Promise<any> {
      try {
        return await this.userService.deleteClientbyID(clientId);
      } catch (error) {
        throw new HttpException(
          'Failed to delete client',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    @Delete('staff/delete')
    @UseGuards(RolesGuard, JwtGuard)
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT Auth')
    @ApiOperation({ summary: 'Delete a staff member' })
    @ApiResponse({
      status: 200,
      description: 'Staff successfully deleted',
    })
    @ApiResponse({
      status: 400,
      description: 'Failed to delete staff',
    })
    async deleteStaff(@Query('e_id') employeeId: string) {
      try {
        return await this.userService.deleteStaff(employeeId);
      } catch (error) {
        throw new HttpException(
          'Failed to delete staff',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    @Put('client/update')
    @ApiBearerAuth('JWT Auth')
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @ApiOperation({ summary: 'Update a client by ID' })
    @ApiResponse({
      status: 200,
      description: 'Client updated successfully',
    })
    @ApiResponse({
      status: 400,
      description: 'Failed to update client',
    })
    async updateClient(
      @Query('c_id') clientId: string,
      @Body() body: ClientDto,
    ) {
      try {
        return await this.userService.updateClient(clientId, body);
      } catch (error) {
        throw new HttpException(
          'Failed to update client',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    @Put('staff/update')
    @ApiBearerAuth('JWT Auth')
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(Role.EMPLOYEE, Role.ADMIN)
    @ApiOperation({ summary: 'Update a staff member by ID' })
    @ApiResponse({
      status: 200,
      description: 'Staff updated successfully',
    })
    @ApiResponse({
      status: 400,
      description: 'Failed to update staff',
    })
    async updateStaff(
      @Query('e_id') employeeId: string,
      @Body() body: EmployeeDto,
    ) {
      try {
        return await this.userService.updateStaff(employeeId, body);
      } catch (error) {
        throw new HttpException(
          'Failed to update staff',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    
    @Get('client/getInfo')
    @ApiBearerAuth('JWT Auth')
    @UseGuards(JwtGuard, RolesGuard) 
    @Roles(Role.CLIENT)
    @ApiOperation({ summary: 'Get user information by ID' })
    @ApiResponse({
      status: 200,
      description: 'Successfully',
    })
    @ApiResponse({
      status: 400,
      description: 'Failed',
    })
    async getClientbyID(@Query('c_id') customerID : string){
        return this.userService.getClientbyID(customerID)
    }
    @Get('staff/getClientInfo')
    @ApiBearerAuth('JWT Auth')
    @UseGuards(JwtGuard, RolesGuard) 
    @Roles(Role.EMPLOYEE, Role.ADMIN)
    @ApiOperation({ summary: 'Get user information' })
    @ApiResponse({
      status: 200,
      description: 'Successfully',
    })
    @ApiResponse({
      status: 400,
      description: 'Failed',
    })
    async getallClient(){
        return this.userService.getAllClient();
    }

    @Get('staff/getInfo')
    @ApiOperation({ summary: 'Get all staffs' })
    @ApiResponse({
      status: 200,
      description: 'Successfully',
    })
    @ApiResponse({
      status: 400,
      description: 'Failed',
    })
    async getAllStaff(@Query('store_id') store_id : string){
        return this.userService.getAllEmployee(store_id);
    }
    @Get('staff/admin')
    @ApiOperation({ summary: 'Get admin' })
    @ApiResponse({
      status: 200,
      description: 'Successfully',
    })
    @ApiResponse({
      status: 400,
      description: 'Failed',
    })
    async getAdmin(@Query('store_id') store_id : string){
        return this.userService.getAdmin(store_id);
    }

    @Post('staff/evaluate')
    @ApiOperation({ summary: 'Evaluating'})
    @ApiResponse({
      status: 200,
      description: 'Seccessfully',
    })
    @ApiResponse({
      status: 400,
      description: 'Failed',
    })
    async evaluate(@Query('e_id') e_id : string, @Body() body: evaluating){
      return this.userService.evaluating(e_id, body);
    }
  }
  
