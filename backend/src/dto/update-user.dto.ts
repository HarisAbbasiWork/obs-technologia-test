import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly firstName?: string;

    @IsString()
    @IsOptional()
    readonly middleName?: string;

    @IsString()
    @IsOptional()
    readonly lastName?: string;

    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsString()
    @IsOptional()
    @MinLength(8)
    password: string;

    @IsString()
    @IsOptional()
    readonly phoneNumber?: string;
}
