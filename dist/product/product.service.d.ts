import { DatabaseService } from 'src/database/database.service';
import { ProductDto } from './dtos/product.dto';
import { AddProductNumberDto } from './dtos/addProduct.dto';
export declare class ProductService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    addProduct(product: ProductDto): Promise<{
        message: string;
    }>;
    importProduct(productId: string, remaining: AddProductNumberDto): Promise<{
        message: string;
    }>;
    discardProduct(productId: string, remaining: number): Promise<{
        message: string;
    }>;
    deleteProduct(productId: string): Promise<unknown>;
    updateProductInfo(product: ProductDto, id: string): Promise<{
        message: string;
    }>;
    getAllproduct(): Promise<unknown>;
    getProductById(id: string): Promise<unknown>;
}
