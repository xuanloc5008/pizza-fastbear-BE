import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, IsDateString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto {
    @ApiProperty({
        description: 'Employee ID',
        example: '2234312',
    })
    @IsOptional()
    @IsUUID()
    e_id?: string;

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
        description: 'Store ID associated with the employee',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsOptional()
    @IsUUID()
    store_id?: string;

    // @ApiProperty({
    //     description: 'Supervisor ID of the employee',
    //     example: '123e4567-e89b-12d3-a456-426614174002',
    // })
    @IsOptional()
    @IsUUID()
    supervisor_id?: string;

    @ApiProperty({
        description: 'Year of birth of the employee',
        example: 1990,
    })
    @IsNumber()
    @Min(1900)
    @Max(2024)
    yob: number;

    // @ApiProperty({
    //     description: 'Work status of the employee (1 for active, 0 for inactive)',
    //     example: true,
    // })
    @IsOptional()
    @IsBoolean()
    work_status?: boolean;

    // @ApiProperty({
    //     description: 'Hourly salary of the employee',
    //     example: 15.50,
    // })
    @IsOptional()
    @IsNumber()
    @Min(0)
    salary_hourly?: number;

    // @ApiProperty({
    //     description: 'Monthly salary of the employee',
    //     example: 3000.00,
    // })
    @IsOptional()
    @IsNumber()
    @Min(0)
    salary_monthly?: number;

    // @ApiProperty({
    //     description: 'Insurance status of the employee (1 for yes, 0 for no)',
    //     example: true,
    // })
    @IsOptional()
    @IsBoolean()
    insurance?: boolean;

    // @ApiProperty({
    //     description: 'Shift of the employee',
    //     example: 'Morning',
    // })
    @IsOptional()
    @IsString()
    shift?: string;

    // @ApiProperty({
    //     description: 'Evaluation cycle of the employee',
    //     example: 'Quarterly',
    // })
    @IsOptional()
    @IsString()
    evaluation_cycle?: string;

    // @ApiProperty({
    //     description: 'Ranking of the employee',
    //     example: 1,
    // })
    @IsOptional()
    @IsNumber()
    @Min(1)
    ranking?: number;

    // @ApiProperty({
    //     description: 'Evaluation ID associated with the employee',
    //     example: '123e4567-e89b-12d3-a456-426614174003',
    // })
    @IsOptional()
    @IsUUID()
    evaluate_ID?: string;

    // @ApiProperty({
    //     description: 'Evaluation date of the employee',
    //     example: '2024-01-15',
    // })
    @IsOptional()
    @IsDateString()
    evaluation_date?: string;

    // @ApiProperty({
    //     description: 'Evaluation score of the employee',
    //     example: 95,
    // })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    score?: number;

    // @ApiProperty({
    //     description: 'Feedback for the employee',
    //     example: 'Great team player',
    // })
    @IsOptional()
    @IsString()
    feedbacks?: string;

    @IsString()
    @ApiProperty({
        description: 'Username',
        example: 'test',
    })
    username?: string;
    @IsString()
    @ApiProperty({
        description: "Password",
        example: 'test',
    })
    password?: string
}
