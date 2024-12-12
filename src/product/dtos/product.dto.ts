import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ProductDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ 
        description: 'The name of the product',
        example: 'Coca-Cola',
        required: true
    })
    name: string;
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ 
        description: 'The price of the product',
        example: 100000,
        required: true
    })
    price: number;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ 
        description: 'The manufacturing date of the product',
        example: '2024-12-12',
        required: true
    })
    mfg_date: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ 
        description: 'The expiry date of the product',
        example: '2024-12-12',
        required: true
    })
    exp_date: string;
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ 
        description: 'The remaining number of the product',
        example: 100,
        required: true
    })
    remaining: number;
}
