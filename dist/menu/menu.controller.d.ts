import { MenuService } from './menu.service';
import { menuDTO } from './dtos/menu.dto';
export declare class MenuController {
    private readonly menu;
    constructor(menu: MenuService);
    viewDishes(): Promise<unknown>;
    viewDishesID(id: string): Promise<unknown>;
    updateDish(id: string, body: menuDTO): Promise<unknown>;
    deleteDish(id: string): Promise<unknown>;
    searchDishes(query: string): Promise<unknown>;
}
