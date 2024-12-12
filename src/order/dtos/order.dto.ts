import { IsString, IsNumber, IsOptional, IsDecimal, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Store ID',
        example: "123e4567-e89b-12d3-a456-426614174000",
        required: true
    })
    store_id: string;
}