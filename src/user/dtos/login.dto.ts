import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class loginDTO {
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
}
