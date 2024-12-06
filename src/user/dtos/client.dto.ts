import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ClientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'username',
        example: "Khanhtat",
        required: true
    })
    username: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'password',
        example: "mamamasadthu",
        required: true
    })
    password: string;
    @IsString()
    @ApiProperty({
        description: 'ward',
        example: "ward 4",
        required: true
    })
    ward: string;
    @IsString()
    @ApiProperty({
        description: 'city',
        example: "Thread city",
        required: true
    })
    city: string;
    @IsString()
    @ApiProperty({
        description: 'Phone No.',
        example: "0978236476",
        required: true
    })
    phone_number: string;
    @IsString()
    @ApiProperty({
        description: 'name',
        example: "Nam Khánh",
        required: true
    })
    name: string;
    @IsString()
    @ApiProperty({
        description: 'district',
        example: "district 7",
        required: true
    })
    district: string;
}
