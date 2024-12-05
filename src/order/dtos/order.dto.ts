import { IsString, IsNumber, IsOptional, IsDecimal, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderDto {
    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '2' })
    @Type(() => Number)
    @Min(0)
    @Max(99999999.99)
    price: number;

    @IsOptional()
    @IsString()
    components?: string;
}
