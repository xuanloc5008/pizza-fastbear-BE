import { IsUUID, IsString, IsDecimal, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  

export class UpdateOrderDto {
    @IsUUID()
    @ApiProperty({
        description: 'Customer ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true
    })
    customer_id: string; 

    @IsString()
    @ApiProperty({
        description: 'Salesman ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true
    })
    salesman_id: string; 

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Optional Shipper ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false
    })
    shipper_id?: string;

    @IsUUID()
    @ApiProperty({
        description: 'Store ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true
    })
    store_id: string; 

    @IsDecimal()
    @ApiProperty({
        description: 'Price of the order',
        example: 100,
        required: true
    })
    price: number; 

    @IsOptional()
    @ApiProperty({
        description: 'Completion time (optional)',
        example: '2024-01-01T00:00:00Z',
        required: false
    })
    complete?: string; 

    @IsOptional()   
    @ApiProperty({
        description: 'Creation time (optional)',
        example: '2024-01-01T00:00:00Z',
        required: false
    })
    createAt?: string; 
}
