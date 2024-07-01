
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { IUser, LoginUser, SignupUser, ForgetPassword, ChangePassword, UpdateProfile } from 'src/interface/user.interface';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { LoginUserDto } from 'src/dto//login-user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<IUser>) { }
    async login(loginUserDto: LoginUserDto): Promise<LoginUser> {
        console.log("loginUserDto ", loginUserDto)
        const { email, password } = loginUserDto
        const foundUser = await this.userModel.findOne({ email: email });
        console.log("foundUser ", foundUser)
        if (!foundUser) {
            return {
                success: false,
                message: "User doesn't exists"
            }
        } else {
            const { _id } = foundUser
            console.log('bycrypt ', await bcrypt.compare(password, foundUser.password));
            console.log("process.env.JWT_SECRET ", process.env.JWT_SECRET, " _id ", _id)
            if (await bcrypt.compare(password, foundUser.password)) {
                const accessToken = jwt.sign({ _id }, process.env.JWT_SECRET, {
                    expiresIn: '1.5h',
                });
                const refreshToken = jwt.sign({ _id }, process.env.JWT_SECRET, {
                    expiresIn: '30d',
                });
                return {
                    success: true,
                    message: "User logged in successfully.",
                    accessToken,
                    refreshToken,
                    user: foundUser
                }
            } else {
                return {
                    success: true,
                    message: "Email and password doesn't match."
                }
            }
        }
    }
    async createUser(createUserDto: CreateUserDto): Promise<SignupUser> {
        console.log("createUserDto ", createUserDto)
        const { email, password } = createUserDto
        const foundUser = await this.userModel.findOne({ email: email });
        if (foundUser) {
            return {
                success: false,
                message: "User already exists."
            }
        }
        console.log("password, saltRounds ", password, process.env.SALTROUNDS)
        const encryptedPassword = await bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS));
        //saving user to DB
        console.log('encryptedPassword', encryptedPassword);
        createUserDto.password = encryptedPassword;
        const newUser = await new this.userModel(createUserDto).save();
        return {
            success: true,
            message: "User has been created successfully",
            user: newUser
        }
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<any> {
        // Check if the update object contains a password
        if (updateUserDto.password) {
            console.log("password, saltRounds ", updateUserDto.password, process.env.SALTROUNDS);
            const encryptedPassword = await bcrypt.hash(updateUserDto.password, parseInt(process.env.SALTROUNDS));
            updateUserDto.password = encryptedPassword;
            console.log('encryptedPassword', encryptedPassword);
        }

        const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).select('-password');
        if (!updatedUser) {
            throw new NotFoundException(`User with ID "${userId}" not found.`);
        }
        return updatedUser;
    }

    async findAllUsers(page: number, limit: number, search: string): Promise<any> {
        console.log("search ", search)
        let query={}
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                ]
            };
        }

        const users = await this.userModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .select('-password')
            .exec();
        return {
            total: await this.userModel.countDocuments(query),
            users
        };
    }

    async findUserById(userId: string): Promise<any> {
        return await this.userModel.findById(userId).select('-password');
    }

    async deleteUser(userId: string): Promise<any> {
        return await this.userModel.findByIdAndDelete(userId);
    }
}
