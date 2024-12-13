import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';    
import { ProductDto } from './dtos/product.dto';
import { AddProductNumberDto } from './dtos/addProduct.dto';
@Injectable()
export class ProductService {
    constructor(private readonly dbService: DatabaseService) {}
    async addProduct(product: ProductDto) {
        try {
            const query = `
                EXEC addProduct 
                    @name = @p1, 
                    @price = @p2, 
                    @mfg_date = @p3, 
                    @exp_date = @p4,
                    @supplier_id = @p5,
                    @quantity = @p6;
        `;
    
        const parameters = [
            { name: 'p1', value: product.name },
            { name: 'p2', value: product.price },
            { name: 'p3', value: product.mfg_date },
            { name: 'p4', value: product.exp_date },
            { name: 'p5', value: product.supplier_id},
            { name: 'p6', value: product.quantity},
        ];
            await this.dbService.query(query, parameters);
            return { message: 'Product added successfully.' };
        } catch (error) {
            console.error('Error executing stored procedure:', error.message);
            throw new Error('Failed to execute addProduct procedure.');
        }
    }
    async importProduct(productId: string, remaining: AddProductNumberDto) {
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
        } catch (error) {
            console.error('Error executing stored procedure:', error.message);
            throw new Error('Failed to execute importProduct procedure.');
        }
    }
    async discardProduct(productId: string, remaining: number) {
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
        } catch (error) {
            console.error('Error executing stored procedure:', error.message);
            throw new Error('Failed to execute DiscardProduct procedure.');
        }
    }
    async deleteProduct(productId: string) {
        const query = `
            EXEC DeleteProduct 
                @product_id = @p1;
        `;
        const parameters = [
            { name: 'p1', value: productId },
        ];

        try {
            return await this.dbService.query(query, parameters);
        } catch (error) {
            console.error('Error executing stored procedure:', error.message);
            throw new Error('Failed to execute DeleteProduct procedure.');
        }
    }
    async updateProductInfo(product: ProductDto, id: string) {
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
        } catch (error) {
            console.error('Error executing stored procedure:', error.message);
            throw new Error('Failed to execute udpateProductInfo procedure.');
        }
    }
    async getAllproduct() {
        const query = `
            EXEC getAllproduct;
        `;
        return await this.dbService.query(query);
    }
    async getProductById(id: string) {
        const query = `
            EXEC getProductbyID @product_id = @p1;
        `;
        const parameters = [
            { name: 'p1', value: id },
        ];
        return await this.dbService.query(query, parameters);
    }
}
