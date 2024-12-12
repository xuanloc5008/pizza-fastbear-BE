import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class DiscardProductDto {
    @IsInt()
    @IsPositive()
    @ApiProperty({ description: 'The discarded number of the product' })
    discarded: number;
}
