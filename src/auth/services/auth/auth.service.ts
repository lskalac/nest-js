import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {        
    }

    async validateUser(username: string, password: string){
        const user = await this.userService.findByUsername(username);
        if(user && user.password === password)
            return user;

        return null;
    }
}
