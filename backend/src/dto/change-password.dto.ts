import { IsNumber,IsString,IsNotEmpty,MaxLength } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly password: string;
}