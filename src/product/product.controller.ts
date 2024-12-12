import { Controller, Post, Put, Body, Query, Delete, RequestMapping } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dtos/product.dto';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';  
import { AddProductNumberDto } from './dtos/addProduct.dto';
import { DiscardProductDto } from './dtos/discardProduct.dto';
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {} 

    @Post('add-product')
    @ApiOperation({ summary: 'Add a new product' })
    @ApiBody({ type: ProductDto })
    @ApiResponse({ status: 201, description: 'Product added successfully' })
    async addProduct(@Body() product: ProductDto) {
        return this.productService.addProduct(product);
    }
    @Put('add-product-number')
    @ApiOperation({ summary: 'Add a new product number' })
    @ApiBody({ type: AddProductNumberDto })
    @ApiResponse({ status: 201, description: 'Product number added successfully' })
    async addProductNumber(@Body() remaining: AddProductNumberDto, @Query('id') id: string) {
        return this.productService.importProduct(id, remaining);
    }
    @Put('discard-product')
    @ApiOperation({ summary: 'Discard a product' })
    @ApiBody({ type: DiscardProductDto })
    @ApiResponse({ status: 201, description: 'Product discarded successfully' })
    async discardProduct(@Body() product: DiscardProductDto, @Query('id') id: string) {
        return this.productService.discardProduct(id, product.discarded);
    }
    @Delete('delete-product')
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({ status: 201, description: 'Product deleted successfully' })
    async deleteProduct(@Query('id') id: string) {
        return this.productService.deleteProduct(id);
    }
    @Put('update-product')
    @ApiOperation({ summary: 'Update a product' })
    @ApiBody({ type: ProductDto })
    @ApiResponse({ status: 201, description: 'Product updated successfully' })
    async updateProduct(@Body() product: ProductDto, @Query('id') id: string) {
        return this.productService.updateProductInfo(product, id);
    }
}
