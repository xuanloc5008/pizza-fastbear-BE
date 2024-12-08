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
exports.menuDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class menuDTO {
}
exports.menuDTO = menuDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: 'Price',
        example: 10000,
        required: true
    }),
    __metadata("design:type", Number)
], menuDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Dish description',
        example: "seasonal",
        required: true
    }),
    __metadata("design:type", String)
], menuDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Name of the dish',
        example: "mouse-pizza",
        required: true
    }),
    __metadata("design:type", String)
], menuDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Recipies',
        example: "Ratatoullie",
        required: true
    }),
    __metadata("design:type", String)
], menuDTO.prototype, "recipes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'image link',
        example: "https://th.bing.com/th/id/R.70b387cca17bf279da5909c3fcfe51b3?rik=I06xNoqSmyhvqg&riu=http%3a%2f%2fimages1.fanpop.com%2fimages%2fimage_uploads%2fRatatouille-ratatouille-847440_1280_1024.jpg&ehk=24ULC8KcOa1hdiUQ8Zj8MLpgD3ZnZvD8A60hoE6VMc0%3d&risl=&pid=ImgRaw&r=0",
        required: true
    }),
    __metadata("design:type", String)
], menuDTO.prototype, "images", void 0);
//# sourceMappingURL=menu.dto.js.map