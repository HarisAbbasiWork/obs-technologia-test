import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly name: string;

    readonly email: string;

    readonly password: string;

    resetPasswordOtp: number;
}
export interface LoginUser {
    readonly success: boolean;

    readonly message: string;

    readonly user?: IUser;
    readonly accessToken?: string;
    readonly refreshToken?: string;
}
export interface SignupUser {
    readonly success: boolean;

    readonly message: string;

    readonly user?: IUser;
    readonly accessToken?: string;
    readonly refreshToken?: string;
}
export interface ForgetPassword {
    readonly success: boolean;

    readonly message: string;
}
export interface ChangePassword {
    readonly success: boolean;
    readonly message: string;
    readonly user?: IUser;
}
export interface UpdateProfile {
    readonly success: boolean;
    readonly message: string;
    readonly user?: IUser;
}