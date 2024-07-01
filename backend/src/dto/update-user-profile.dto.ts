// update-user-profile.dto.ts
import { IsOptional, IsString, IsDateString, IsArray } from 'class-validator';

export class UpdateUserProfileDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    dateOfBirth?: string;

    @IsOptional()
    @IsArray()
    categories?: string[];
}
