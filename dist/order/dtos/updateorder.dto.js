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
exports.UpdateOrderDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateOrderDto {
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: 'Customer ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true
    }),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "customer_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Salesman ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true
    }),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "salesman_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Optional Shipper ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false
    }),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "shipper_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: 'Store ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true
    }),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "store_id", void 0);
__decorate([
    (0, class_validator_1.IsDecimal)(),
    (0, swagger_1.ApiProperty)({
        description: 'Price of the order',
        example: 100,
        required: true
    }),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Completion time (optional)',
        example: '2024-01-01T00:00:00Z',
        required: false
    }),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "complete", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Creation time (optional)',
        example: '2024-01-01T00:00:00Z',
        required: false
    }),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "createAt", void 0);
//# sourceMappingURL=updateorder.dto.js.map