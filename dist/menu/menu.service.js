"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let MenuService = class MenuService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async addDishes(body) {
        let nameDishes = body.name;
        const checkDishes = await this.dbService.query('SELECT * FROM Dishes WHERE name = @p1', [{ name: 'p1', value: body.name }]);
        const isValid = checkDishes.length > 0;
        if (isValid) {
            return { message: 'Dish already exists' };
        }
        await this.dbService.query('INSERT INTO Dishes (id, price, description, name, recipes, images) VALUES (NEWID(), @p1, @p2, @p3, @p4, @p5)', [
            { name: 'p1', value: body.price },
            { name: 'p2', value: body.description },
            { name: 'p3', value: body.name },
            { name: 'p4', value: body.recipes },
            { name: 'p5', value: body.images }
        ]);
        return { message: 'add successfull' };
    }
    async viewDishes() {
        return await this.dbService.query('SELECT * FROM Dishes');
    }
    async viewDishesbyID(id) {
        return await this.dbService.query('SELECT * FROM Dishes WHERE id = @p1', [{ name: 'p1', value: id }]);
    }
    async updateDishesbyID(id, body) {
        return await this.dbService.query('UPDATE Dishes SET (price, description, name, recipes) WHERE id = @p1', [
            { name: 'p1', value: id },
            { name: 'p2', value: body.price },
            { name: 'p3', value: body.description },
            { name: 'p4', value: body.name },
            { name: 'p5', value: body.recipes }
        ]);
    }
    async deleteDish(id) {
        return await this.dbService.query('DELETE FROM Dishes WHERE id = @p1', [{ name: 'p1', value: id }]);
    }
    async searchDishes(query) {
        return await this.dbService.query('SELECT * FROM Dishes WHERE name LIKE @p1 OR description LIKE @p2', [{ name: 'p1', value: query }, { name: 'p2', value: query }]);
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], MenuService);
//# sourceMappingURL=menu.service.js.map