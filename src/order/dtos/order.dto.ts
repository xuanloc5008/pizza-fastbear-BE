import { IsString, IsNumber, IsOptional, IsDecimal, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '2' })
    @Type(() => Number)
    @Min(0)
    @Max(99999999.99)
    @ApiProperty({
        description: 'Price',
        example: 10000,
        required: true
    })
    price: number;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Components',
        example: "Ratatoullie",
        required: true
    })
    components?: string;
}
