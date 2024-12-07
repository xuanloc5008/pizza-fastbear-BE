import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { menuDTO } from './dtos/menu.dto';

@Injectable()
export class MenuService {
    constructor(private readonly dbService: DatabaseService){}
    async addDishes(body : menuDTO){
        let nameDishes = body.name;
        const checkDishes = await this.dbService.query<any>(
            'SELECT * FROM Dishes WHERE name = @p1', [{name: 'p1', value: body.name}]
        );
        const isValid = checkDishes.length > 0;
        if(isValid) {
            return {message: 'Dish already exists'};
        }
        await this.dbService.query(
            'INSERT INTO Dishes (id, price, description, name, recipes) VALUES (NEWID(), @p1, @p2, @p3, @p4)',
            [
                {name: 'p1', value: body.price},
                {name: 'p2', value: body.description},
                {name: 'p3', value: body.name},
                {name: 'p4', value: body.recipes}
            ]
        )
        return {message: 'add successfull'};
    }
    async viewDishes(){
        return await this.dbService.query(
            'SELECT * FROM Dishes'
        );
    }
    async viewDishesbyID(id: string){
        return await this.dbService.query(
            'SELECT * FROM Dishes WHERE id = @p1',[{name: 'p1', value: id}]
        );
    }
    async updateDishesbyID(id: string, body: menuDTO){
        const update = this.dbService.query(
            'UPDATE Dishes SET (price, description, name, recipes) WHERE id = @p1', 
            [
                {name: 'p1', value: id},
                {name: 'p2', value: body.price},
                {name: 'p3', value: body.description},
                {name: 'p4', value: body.name},
                {name: 'p5', value: body.recipes}
            ]
        );
    }
    async deleteDish(id: string){
        return await this.dbService.query(
            'DELETE FROM Dishes WHERE id = @p1', [{name: 'p1', value: id}]
        );
    }
    async searchDishes(query: string){
        return await this.dbService.query(
            'SELECT * FROM Dishes WHERE name LIKE @p1 OR description LIKE @p2', [{name: 'p1', value: query}, {name: 'p2', value: query}]
        );
    }
}
