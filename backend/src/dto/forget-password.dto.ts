import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class ForgetPasswordDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly email: string;
}