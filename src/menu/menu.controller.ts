import { Body, Controller, Post, Get, Query, Delete, Put, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { menuDTO } from './dtos/menu.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../user/guards/jwt.guards';
import { Role, Roles } from 'src/user/decorators/roles.decorator';

@Controller('menu')
@ApiTags('Menu')
@UseGuards(JwtGuard)
@Roles(Role.ADMIN, Role.CLIENT, Role.EMPLOYEE)
@ApiBearerAuth('JWT Auth')
export class MenuController {
    constructor(private readonly menu: MenuService) {}

    @ApiBearerAuth('JWT Auth')
    @ApiOperation({ summary: 'Add a new dish' })
    @ApiResponse({
        status: 201,
        description: 'The dish has been successfully created.',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid request payload.',
    })
    @Post('add')
    async addDishes(@Body() body: menuDTO) {
        return this.menu.addDishes(body);
    }

    @Get('viewDishes')
    @ApiOperation({ summary: 'View all dishes' })
    @ApiResponse({
        status: 200,
        description: 'List of dishes retrieved successfully.',
    })
    async viewDishes() {
        return this.menu.viewDishes();
    }

    @Get('viewDishesbyID')
    @ApiOperation({ summary: 'View a dish by ID' })
    @ApiQuery({
        name: 'd_id',
        description: 'ID of the dish to retrieve.',
        required: true,
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'Dish retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description: 'Dish not found.',
    })
    async viewDishesID(@Query('d_id') id: string) {
        return this.menu.viewDishesbyID(id);
    }

    @Put('update')
    @ApiOperation({ summary: 'Update an existing dish' })
    @ApiQuery({
        name: 'd_id',
        description: 'ID of the dish to update.',
        required: true,
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'Dish updated successfully.',
    })
    @ApiResponse({
        status: 404,
        description: 'Dish not found.',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid request payload.',
    })
    async updateDish(@Query('d_id') id: string, @Body() body: menuDTO) {
        return this.menu.updateDishesbyID(id, body);
    }

    @Delete('delete')
    @ApiOperation({ summary: 'Delete a dish by ID' })
    @ApiQuery({
        name: 'd_id',
        description: 'ID of the dish to delete.',
        required: true,
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'Dish deleted successfully.',
    })
    @ApiResponse({
        status: 404,
        description: 'Dish not found.',
    })
    async deleteDish(@Query('d_id') id: string) {
        return this.menu.deleteDish(id);
    }

    @Get('search')
    @ApiOperation({ summary: 'Search dishes by name or description' })
    @ApiQuery({
        name: 'query',
        description: 'Search term to look for in dish names or descriptions.',
        required: true,
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'Search results retrieved successfully.',
    })
    async searchDishes(@Query('query') query: string) {
        return this.menu.searchDishes(query);
    }
}
