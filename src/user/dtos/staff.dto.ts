import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, IsDateString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto {
    e_id: number;

    @IsNumber()
    store_id: number;

    @ApiProperty({
        description: 'Last name of the employee',
        example: 'Nguyen',
    })
    @IsString()
    last_name: string;

    @ApiProperty({
        description: 'First name of the employee',
        example: 'Minh',
    })
    @IsString()
    first_name: string;

    @ApiProperty({
        description: 'Ward of the employee',
        example: 'Phường 1',
    })
    @IsOptional()
    @IsString()
    ward?: string;

    @ApiProperty({
        description: 'District of the employee',
        example: 'District 1',
    })
    @IsOptional()
    @IsString()
    district?: string;

    @ApiProperty({
        description: 'City of the employee',
        example: 'Ho Chi Minh City',
    })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiProperty({
        description: 'Phone number of the employee',
        example: '0123456789',
    })
    @IsOptional()
    @IsString()
    phone_no?: string;

    @ApiProperty({
        description: 'Year of birth of the employee',
        example: 1990,
    })
    @IsNumber()
    @Min(1900)
    @Max(2024)
    yob: number;

    @ApiProperty({
        description: 'Username for the employee login',
        example: 'test',
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'Password for the employee login',
        example: 'password123',
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'Position of the employee',
        example: 'salesman',
    })
    @IsString()
    e_position: string;
}
