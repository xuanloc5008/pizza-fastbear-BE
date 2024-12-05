import { IsString, IsNotEmpty } from 'class-validator';

export class ClientDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    ward: string;
    @IsString()
    city: string;
    @IsString()
    phone_number: string;
    @IsString()
    name: string;
    @IsString()
    district: string;
}
