import { ProductService } from './product.service';
import { ProductDto } from './dtos/product.dto';
import { AddProductNumberDto } from './dtos/addProduct.dto';
import { DiscardProductDto } from './dtos/discardProduct.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    addProduct(product: ProductDto): Promise<{
        message: string;
    }>;
    addProductNumber(remaining: AddProductNumberDto, id: string): Promise<{
        message: string;
    }>;
    discardProduct(product: DiscardProductDto, id: string): Promise<{
        message: string;
    }>;
    deleteProduct(id: string): Promise<unknown>;
    updateProduct(product: ProductDto, id: string): Promise<{
        message: string;
    }>;
}
