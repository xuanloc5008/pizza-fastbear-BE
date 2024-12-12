import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddProductNumberDto {
    @IsInt()
    @IsPositive()
    @ApiProperty({ description: 'The remaining number of the product' })
    remaining: number;
}
