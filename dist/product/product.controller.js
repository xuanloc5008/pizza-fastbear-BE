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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_dto_1 = require("./dtos/product.dto");
const swagger_1 = require("@nestjs/swagger");
const addProduct_dto_1 = require("./dtos/addProduct.dto");
const discardProduct_dto_1 = require("./dtos/discardProduct.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async addProduct(product) {
        return this.productService.addProduct(product);
    }
    async addProductNumber(remaining, id) {
        return this.productService.importProduct(id, remaining);
    }
    async discardProduct(product, id) {
        return this.productService.discardProduct(id, product.discarded);
    }
    async deleteProduct(id) {
        return this.productService.deleteProduct(id);
    }
    async updateProduct(product, id) {
        return this.productService.updateProductInfo(product, id);
    }
    async getAllProduct() {
        return this.productService.getAllproduct();
    }
    async getProductById(id) {
        return this.productService.getProductById(id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)('add-product'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new product' }),
    (0, swagger_1.ApiBody)({ type: product_dto_1.ProductDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product added successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Put)('add-product-number'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new product number' }),
    (0, swagger_1.ApiBody)({ type: addProduct_dto_1.AddProductNumberDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product number added successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addProduct_dto_1.AddProductNumberDto, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProductNumber", null);
__decorate([
    (0, common_1.Put)('discard-product'),
    (0, swagger_1.ApiOperation)({ summary: 'Discard a product' }),
    (0, swagger_1.ApiBody)({ type: discardProduct_dto_1.DiscardProductDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product discarded successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discardProduct_dto_1.DiscardProductDto, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "discardProduct", null);
__decorate([
    (0, common_1.Delete)('delete-product'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product deleted successfully' }),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Put)('update-product'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product' }),
    (0, swagger_1.ApiBody)({ type: product_dto_1.ProductDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product updated successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Get)('get-all-product'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all product' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product fetched successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProduct", null);
__decorate([
    (0, common_1.Get)('get-product-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a product by id' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product fetched successfully' }),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map