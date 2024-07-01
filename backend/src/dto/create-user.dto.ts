import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly firstName: string;

    @IsString()
    @IsOptional()
    readonly middleName?: string;

    @IsString()
    readonly lastName: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @IsOptional()
    readonly phoneNumber?: string;
}
