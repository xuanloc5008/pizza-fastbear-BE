import { IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class DishComponentDto {
    @ApiProperty({ description: 'Dish ID', example: 1 })
    dish_id: number;

    @ApiProperty({ description: 'Quantity', example: 100 })
    quantity: number;
}

export class AddDishesToOrderDto {
    @ApiProperty({
        description: 'Array of dish components',
        example: [
            { dish_id: 1, quantity: 100 }
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DishComponentDto)
    component: DishComponentDto[];
}
