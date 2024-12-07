import { DatabaseService } from 'src/database/database.service';
import { menuDTO } from './dtos/menu.dto';
export declare class MenuService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    addDishes(body: menuDTO): Promise<{
        message: string;
    }>;
    viewDishes(): Promise<unknown>;
    viewDishesbyID(id: string): Promise<unknown>;
    updateDishesbyID(id: string): Promise<void>;
}
