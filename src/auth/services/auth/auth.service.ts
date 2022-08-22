import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {        
    }

    async validateUser(username: string, password: string){
        const user = await this.userService.findByUsername(username);
        if(user){
            const matched = comparePassword(password, user.password);
            if(matched)
                return user;
        }

        return null;
    }
}
