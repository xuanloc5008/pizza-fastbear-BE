import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class menuDTO{
    @IsNumber()
    @ApiProperty({
        description: 'Price',
        example: 10000,
        required: true
    })
    price: number;
    @IsString()
    @ApiProperty({
        description: 'Dish description',
        example: "seasonal",
        required: true
    })
    description: string;
    @IsString()
    @ApiProperty({
        description: 'Name of the dish',
        example: "mouse-pizza",
        required: true
    })
    name: string;
    @IsString()
    @ApiProperty({
        description: 'Recipies',
        example: "Ratatoullie",
        required: true
    })
    recipes: string;
}