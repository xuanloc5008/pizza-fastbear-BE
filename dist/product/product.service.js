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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ProductService = class ProductService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async addProduct(product) {
        try {
            const query = `
                EXEC addProduct 
                    @name = @p1, 
                    @price = @p2, 
                    @mfg_date = @p3, 
                    @exp_date = @p4, 
                @remaining = @p5;
        `;
            const parameters = [
                { name: 'p1', value: product.name },
                { name: 'p2', value: product.price },
                { name: 'p3', value: product.mfg_date },
                { name: 'p4', value: product.exp_date },
                { name: 'p5', value: product.remaining },
            ];
            await this.dbService.query(query, parameters);
            return { message: 'Product added successfully.' };
        }
        catch (error) {
            console.error('Error executing stored procedure:', error.message);
            throw new Error('Failed to execute addProduct procedure.');
        }
    }
    async importProduct(productId, remaining) {
        const query = `
            EXEC importProduct 
                @product_id = @p1, 
                @remaining = @p2;
        `;
        const parameters = [
            { name: 'p1', value: productId },
            { name: 'p2', value: remaining.remaining },
        ];
        try {
            await this.dbService.query(query, parameters);
            return { message: 'Product imported successfully.' };
        }
        catch (error) {
            console.error('Error executing stored procedure:', error.message);
            throw new Error('Failed to execute importProduct procedure.');
        }
    }
    async discardProduct(productId, remaining) {
        const query = `
            EXEC DiscardProduct 
                @product_id = @p1, 
                @remaining = @p2;
        `;
        const parameters = [
            { name: 'p1', value: productId },
            { name: 'p2', value: remaining },
        ];
        try {
            await this.dbService.query(query, parameters);
            return { message: 'Product discarded successfully.' };
        }
        catch (error) {
            console.error('Error executing stored procedure:', error.message);
            throw new Error('Failed to execute DiscardProduct procedure.');
        }
    }
    async deleteProduct(productId) {
        const query = `
            EXEC DeleteProduct 
                @product_id = @p1;
        `;
        const parameters = [
            { name: 'p1', value: productId },
        ];
        try {
            return await this.dbService.query(query, parameters);
        }
        catch (error) {
            console.error('Error executing stored procedure:', error.message);
            throw new Error('Failed to execute DeleteProduct procedure.');
        }
    }
    async updateProductInfo(product, id) {
        const query = `
            EXEC udpateProductInfo 
                @id = @p1, 
                @name = @p2, 
                @price = @p3, 
                @mfg_date = @p4, 
                @exp_date = @p5;
        `;
        const parameters = [
            { name: 'p1', value: id },
            { name: 'p2', value: product.name },
            { name: 'p3', value: product.price },
            { name: 'p4', value: product.mfg_date },
            { name: 'p5', value: product.exp_date },
        ];
        try {
            await this.dbService.query(query, parameters);
            return { message: 'Product updated successfully.' };
        }
        catch (error) {
            console.error('Error executing stored procedure:', error.message);
            throw new Error('Failed to execute udpateProductInfo procedure.');
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ProductService);
//# sourceMappingURL=product.service.js.map