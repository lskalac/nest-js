import { ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, UseInterceptors } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types/User';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){

    }

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

        throw new HttpException(`User with username ${username} not found`, HttpStatus.NOT_FOUND);
        
    }
}
