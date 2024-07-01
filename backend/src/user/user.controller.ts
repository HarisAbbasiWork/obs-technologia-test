
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Patch, Req, Res, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from 'src/dto/login-user.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                newUser,
            })
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: 500,
                message: 'Error: User not created!',
                error: 'Bad Request'
            })
        }
    }
    @Post('/login')
    async loginUser(@Res() response, @Body() loginUserDto: LoginUserDto) {
        try {
            const loginUserResponse = await this.userService.login(loginUserDto)
            console.log("loginUserResponse ", loginUserResponse)
            return response.status(HttpStatus.CREATED).json(loginUserResponse)
        } catch (err) {
            console.log("err ", err)
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: 500,
                message: 'Error: Internal Server Error!',
                error: 'Bad Request'
            })
        }
    }
    @Patch('/:userId')
    async updateUser(@Param('userId') userId: string, @Res() response, @Body() updateUserDto: UpdateUserDto) {
        try {
            const updatedUser = await this.userService.updateUser(userId, updateUserDto);
            if (!updatedUser) {
                return response.status(HttpStatus.NOT_FOUND).json({
                    message: 'User not found',
                });
            }
            return response.status(HttpStatus.OK).json({
                message: 'User updated successfully',
                updatedUser,
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: 500,
                message: 'Error: Could not update user',
                error: 'Bad Request'
            });
        }
    }

    @Get('/')
    async getAllUsers(@Query('page') page: number, @Query('limit') limit: number, @Query('search') search: string, @Res() response) {
        try {
            const result = await this.userService.findAllUsers(page, limit, search);
            return response.status(HttpStatus.OK).json(result);
        } catch (err) {
            console.log("err ",err)
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: 500,
                message: 'Error: Could not retrieve users',
                error: 'Bad Request'
            });
        }
    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: string, @Res() response) {
        try {
            const user = await this.userService.findUserById(userId);
            if (!user) {
                return response.status(HttpStatus.NOT_FOUND).json({
                    message: 'User not found',
                });
            }
            return response.status(HttpStatus.OK).json(user);
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: 500,
                message: 'Error: Could not retrieve user',
                error: 'Bad Request'
            });
        }
    }

    @Delete('/:userId')
    async deleteUser(@Param('userId') userId: string, @Req() request, @Res() response) {
        if (request.user !== userId) {
            return response.status(HttpStatus.FORBIDDEN).json({
                statusCode: 403,
                message: 'Error: Unauthorized deletion attempt',
            });
        }
        try {
            const deleted = await this.userService.deleteUser(userId);
            if (!deleted) {
                return response.status(HttpStatus.NOT_FOUND).json({
                    message: 'User not found',
                });
            }
            return response.status(HttpStatus.OK).json({
                message: 'User deleted successfully',
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: 500,
                message: 'Error: Could not delete user',
                error: 'Bad Request'
            });
        }
    }
}
