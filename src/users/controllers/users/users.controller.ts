import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { session } from 'passport';
import { AuthenicateGuard } from 'src/auth/utils/LocalAuthGuard';
import { CreateUserDto } from 'src/users/dto/User.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFoundException.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types/User';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){

    }

    @UseGuards(AuthenicateGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getUser(){
        // we can use this instead of new SerializedUser approach but nest recommend using
        // classSerializerInterceptor with mapping with new instance of class
        //return (this.userService.getUsers()).map(x => plainToClass(SerializedUser, x));
        return (this.userService.getUsers()).map(x => new SerializedUser(x));
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:username')
    getUserByUsername(@Param('username') username: string){
        const user = this.userService.getByUsername(username);
        if(user)
            return new SerializedUser(user);

        // nest handles error by himself - it has layer that takes care of that
        throw new HttpException(`User with username ${username} not found`, HttpStatus.NOT_FOUND);
        
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Get('/by-id/:id')
    getUserById(@Param('id', ParseIntPipe) id: number){
        const user = this.userService.getUserById(id);
        if(user)
            return new SerializedUser(user);
        
        // custom exception
        throw new UserNotFoundException();

        // there are a lot of built in exceptions, like not found below
        // throw new NotFoundException('User not found');
    }

    
    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() user: CreateUserDto){
        return this.userService.createUser(user);
    }
}
